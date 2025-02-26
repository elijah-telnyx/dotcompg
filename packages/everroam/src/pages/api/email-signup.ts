/**
 * @description next API endpoint for handling email sign ups
 */

import type { NextApiHandler } from "next";
import { v4 as uuidv4 } from "uuid";
import { addRow } from "services/gSheetsService";

// nextjs config https://nextjs.org/docs/pages/building-your-application/routing/api-routes
export const config = {
  api: {
    externalResolver: true,
  },
};

const handler: NextApiHandler = async (req: any, res: any) => {
  const { method } = req;
  if (method !== "POST") {
    throw new Error("Method Not Allowed");
  }

  try {
    const reference_id = uuidv4();
    const date = new Date().toISOString();
    const values = {
      ...req.body,
      reference_id,
      date,
    };
    const rowData = await addRow(values);
    return res.status(200).json(rowData);
  } catch (e) {
    return res.status(500).json({ success: false, e });
  }
};

export default handler;
