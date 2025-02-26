import type { ReportAbuseFormValues } from 'components/ReportAbuseForm';
import { SENDGRID_API_KEY } from 'env';
import { sanitize } from 'isomorphic-dompurify';
import type { NextApiRequest, NextApiResponse } from 'next';

import SendGridMail, { ResponseError } from '@sendgrid/mail';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import { logger } from 'utils/logger';

const Template = (data: FormData) => {
  const emailLabels: FormData = {
    shortDescription: 'Subject',
    abusivePhoneNumber: 'Phone Number (Abusive)',
    abusedPhoneNumber: 'Phone Number (Received Abuse)',
    dateTime: 'Date & Time of Abuse',
    serviceAbusedVoice: 'Services Receiving Abuse (Voice)',
    serviceAbusedSms: 'Services Receiving Abuse (SMS)',
    reporterName: 'Full Name',
    reporterEmail: 'Email',
    longDescription: 'Additional Details',
  } as const;

  const Label = (copy: string) => `<b style="line-height: 2rem">${copy}:</b>`;
  const Value = (copy: string) => `${copy}`;

  const contentList = (Object.keys(data) as Array<keyof FormData>)
    .map((key) => {
      const label = Label(emailLabels[key]);
      const value = Value(data[key]);

      return `<li>${label} ${value};</li>`;
    })
    .join('');

  return sanitize(`
  <!DOCTYPE html>
  <html lang="en">
    <ul>${contentList}</ul>
  </html>`);
};

const sendEmail = async (req: Request, res: NextApiResponse) => {
  SendGridMail.setApiKey(SENDGRID_API_KEY);

  const formData = req.body.form;

  const sendGridMessage = {
    // https://support.sendgrid.com/hc/en-us/articles/360041356934-Troubleshooting-Email-Delivery-Failures-due-to-DMARC
    from: 'dotcom.squad@telnyx.com',
    reply_to: formData.reporterEmail || 'abuse-reports@telnyx.com',
    html: Template(formData),
    subject: 'Report Abuse',
    to: 'support@telnyx.com',
  };

  try {
    const response = await SendGridMail.send(sendGridMessage);
    logger('Report abuse submitted successfuly', {
      data: {
        requestBody: sendGridMessage,
        ...response,
      },
      severity: 'info',
    });

    return res.status(200).json({
      success: true,
      data: 'Email sent',
    });
  } catch (error) {
    const responseError = error as ResponseError;
    if (responseError instanceof Error) {
      responseError.name = 'Report Abuse Verify SendGrid Error';
      errorLogger({ error: responseError, url: '/api/report-abuse' });
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to submit Abuse Report',
    });
  }
};

export default sendEmail;

interface Request extends NextApiRequest {
  body: {
    form: Record<keyof ReportAbuseFormValues, string>;
  };
}

type FormData = Request['body']['form'];
