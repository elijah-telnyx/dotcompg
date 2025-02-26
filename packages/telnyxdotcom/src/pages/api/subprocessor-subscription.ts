import type { NextApiHandler } from 'next';
import submitForm from 'services/sendGridSubService';
import { errorLogger } from 'utils/errorHandler/errorLogger';
import constants from 'constants/env';

const handler: NextApiHandler = async (req, res) => {
  const { email } = req.body;
  const { status, data } = await submitForm(email, [constants.sendgrid.subprocessorListUid]);
  try {
    return res.status(status).json(data);
  } catch (e) {
    errorLogger({ error: new Error('Failed to submit form'), data: JSON.stringify(e), url: '/legal/subprocessors' });
    return res.status(status).json(e);
  }
};
export default handler;
