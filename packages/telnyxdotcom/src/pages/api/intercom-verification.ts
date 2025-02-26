import type { NextApiHandler } from 'next';
import { INTERCOM_SECRET_KEY } from 'env';
import SegmentService from 'services/Segment/SegmentService';
import { encryptText } from 'utils/crypto';

const INTERCOM_USER_HASH_ALGORITHM = { name: 'HMAC', hash: 'SHA-256' };

interface ErrorResponse {
  status: 'error';
  message: string;
}

// https://www.intercom.com/help/en/articles/183-set-up-identity-verification-for-web-and-mobile
export type IntercomVerificationResponse = {
  status: string;
  user_hash: string | undefined;
};

const handler: NextApiHandler<IntercomVerificationResponse | ErrorResponse> = async (req, res) => {
  try {
    const { user_id } = req.query;

    // gets `user_id` or `anonymous_id`
    const userId = user_id?.toString() || SegmentService.userId;

    if (!userId) {
      throw new Error('Intercom failed to get user hash', { cause: 'empty "user_id" and "anonymous_id"' });
    }

    // using the same lib used across client-side and server-side code for consistency
    const userHash = await encryptText(INTERCOM_SECRET_KEY, userId, INTERCOM_USER_HASH_ALGORITHM);

    return res.status(200).json({
      status: 'ok',
      user_hash: userHash,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).json({
      status: 'error',
      message: (e as Error).message,
    });
  }
};
export default handler;
