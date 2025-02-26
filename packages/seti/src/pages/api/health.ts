// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiHandler } from "next";

export type HealthResponse = {
  status: string;
  environment: string;
};

const handler: NextApiHandler<HealthResponse> = (_req, res) => {
  res.status(200).json({
    status: "ok",
    environment: String(process.env.NEXT_PUBLIC_RUNTIME_ENV),
  });
};
export default handler;
