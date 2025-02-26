import { Entry, EntrySkeletonType } from "contentful";
import type { NextApiHandler } from "next";
import {
  STATUS_BAD_REQUEST,
  STATUS_SUCCESSFUL,
} from "../../../../constants/ApiStatus";
import { getEntry } from "../../../../lib/delivery/content/DeliveryMethods";

interface SuccessfulResponse {
  status: (typeof STATUS_SUCCESSFUL)["status"];
  data: Entry<EntrySkeletonType, undefined, string>;
}

interface ErrorResponse {
  status: (typeof STATUS_BAD_REQUEST)["status"];
  message: string;
}

export type EntryResponse = SuccessfulResponse | ErrorResponse;

const handler: NextApiHandler<EntryResponse> = async (req, res) => {
  const { id, preview = "false" } = req.query;

  if (typeof id === "string") {
    const data = await getEntry(id, { preview: preview === "true" });
    return res
      .status(STATUS_SUCCESSFUL.code)
      .json({ status: STATUS_SUCCESSFUL.status, data });
  }

  if (!id)
    return res
      .status(STATUS_BAD_REQUEST.code)
      .json({ status: STATUS_BAD_REQUEST.status, message: "No id provided" });
  return res
    .status(STATUS_BAD_REQUEST.code)
    .json({ status: STATUS_BAD_REQUEST.status, message: "Invalid id" });
};
export default handler;
