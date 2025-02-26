import constants from 'constants/env';
import { errorLogger } from 'utils/errorHandler/errorLogger';

type PayloadProps = {
  contacts: {
    email: string;
  }[];
  list_ids: string[];
};

export type SendGridSubscribeResponse = {
  status: number;
  data?: {
    job_id: string;
  };
};

/**
 * PUT form to sendgrid
 */
const submitForm = async (email: string, sendGridList: string[]): Promise<SendGridSubscribeResponse> => {
  const endpoint = constants.sendgrid.BASE_URL;
  const payload: PayloadProps = {
    contacts: [
      {
        email,
      },
    ],
    list_ids: sendGridList,
  };
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${process.env.SENDGRID_CONTACTS_API_KEY}`);
  try {
    const tmp = await fetch(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    });
    return {
      status: tmp.status,
      data: await tmp.json(),
    };
  } catch (e) {
    errorLogger({ error: new Error('Failed to submit form'), data: JSON.stringify(e) });
    console.log('Failed to submit form');
  }
  // for all other error cases
  return {
    status: 500,
  };
};

export default submitForm;
