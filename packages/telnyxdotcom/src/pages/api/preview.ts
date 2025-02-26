import type { NextApiHandler } from 'next';
import { IS_PRODUCTION } from 'env';

const handler: NextApiHandler = (req, res) => {
  if (!IS_PRODUCTION) {
    res.setPreviewData({});
    res.redirect(req.query.slug?.toString() || '/');
    return;
  }

  res.status(404);
};
export default handler;
