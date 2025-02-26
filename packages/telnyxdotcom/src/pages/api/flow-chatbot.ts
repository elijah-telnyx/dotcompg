import type { NextApiRequest, NextApiResponse } from 'next';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { getFlowChatbotResponse } from 'services/telnyxApiService';

/**
 * https://github.com/vercel/next.js/discussions/48427#discussioncomment-9683722
 * This API is a passthrough to the Telnyx Flow Chatbot API.
 * Since the Next.js middleware cannot handle streaming responses, we need fetch the Telnyx API and handle the streaming response again here.
 * While fetching the Telnyx API, we need to set the headers to allow CORS for other services within telnyx.com.
 * We also need to set the content encoding and content type headers to allow the browser to keep the connection alive.
 * The response is streamed to the client via multiple res.write calls as it is received from the Telnyx API.
 */
const flowChatbot = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Accept, Authorization, Cache-Control, Connection, Content-Encoding, Content-Type'
    );
    res.setHeader('Allow', 'GET, OPTIONS');
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.setHeader('Content-Length', 0);
    res.status(200);
    res.end('');
    return;
  }

  const service = req.query.service?.toString();
  const question = req.query.question?.toString();
  const userId = req.query.userId?.toString();
  const sessionId = req.query.sessionId?.toString();
  const company_name = req.query.companyName?.toString();
  const company_domain = req.query.companyDomain?.toString();
  const company_confidence = req.query.companyConfidence?.toString();

  if ((service !== 'devdocs' && service !== 'dotcom') || !question || !userId || !sessionId) {
    res.status(400).json({ error: 'Bad Request' });
    return;
  }

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Authorization, Cache-Control, Connection, Content-Encoding, Content-Type',
    Connection: 'keep-alive',
    'Content-Encoding': 'none',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream;charset=utf-8',
  });

  try {
    const flowChatbotResponse = await getFlowChatbotResponse({
      service,
      question,
      userId,
      sessionId,
      company_name: company_name,
      company_domain: company_domain,
      company_confidence: company_confidence,
    });

    if (!flowChatbotResponse.body) {
      throw new Error('Chatbot - No response body');
    }

    const reader = flowChatbotResponse.body.pipeThrough(new TextDecoderStream()).getReader();

    let streamDone = false;

    while (!streamDone) {
      // read streaming response
      const { value, done } = await reader.read();

      if (done) {
        streamDone = true;
        res.end('');
        return;
      }

      await res.write(value);
    }
  } catch (error: any) {
    errorLogger({ error });

    res.write('Chatbot - An error occurred during chatbot processing. Please try again later.');
    res.end('');
  }
};

export default flowChatbot;
