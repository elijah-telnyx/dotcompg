import type { NextApiHandler } from "next";

export type HealthResponse = {
  status: string;
  environment: string;
  version: string;
};

const handler: NextApiHandler<HealthResponse> = (_req, res) => {
  const payload = {
    status: "ready",
    environment: String(process.env.NEXT_PUBLIC_RUNTIME_ENV),
    version: String(
      process.env.SERVICE_VERSION ||
        process.env.NEXT_PUBLIC_BUILD_NUMBER ||
        "0000.00.00.00.00.HEAD"
    ),
  };

  res.status(200).json(payload);
};
export default handler;
