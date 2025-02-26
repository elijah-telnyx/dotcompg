import { RCSSubmissionFormService } from 'components/RCSSubmissionForm/service';
import type { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await RCSSubmissionFormService.sendToZapier(req.body);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit request' });
  }
}

export default handler;
