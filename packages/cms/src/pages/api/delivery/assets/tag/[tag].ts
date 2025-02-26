import { AssetCollection } from "contentful";
import type { NextApiHandler } from "next";
import {
  STATUS_BAD_REQUEST,
  STATUS_SUCCESSFUL,
} from "../../../../../constants/ApiStatus";

import { getAssetsFromTag } from "../../../../../lib/delivery/content/DeliveryMethods";

interface SuccessfulResponse {
  status: (typeof STATUS_SUCCESSFUL)["status"];
  data: AssetCollection<undefined, string>;
}

interface ErrorResponse {
  status: (typeof STATUS_BAD_REQUEST)["status"];
  message: string;
}

export type EntryResponse = SuccessfulResponse | ErrorResponse;

const handler: NextApiHandler<EntryResponse> = async (req, res) => {
  const { tag, preview = "false" } = req.query;

  if (typeof tag === "string") {
    const data = await getAssetsFromTag(tag, { preview: preview === "true" });
    return res
      .status(STATUS_SUCCESSFUL.code)
      .json({ status: STATUS_SUCCESSFUL.status, data });
  }

  if (!tag)
    return res
      .status(STATUS_BAD_REQUEST.code)
      .json({ status: STATUS_BAD_REQUEST.status, message: "No tag provided" });
  return res
    .status(STATUS_BAD_REQUEST.code)
    .json({ status: STATUS_BAD_REQUEST.status, message: "Invalid tag" });
};
export default handler;
