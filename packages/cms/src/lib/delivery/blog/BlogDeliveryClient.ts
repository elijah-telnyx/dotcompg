import { createClient } from "contentful";
import {
  BLOG_DELIVERY_TOKEN,
  BLOG_DELIVERY_TOKEN_PREVIEW,
  PREVIEW_HOST,
} from "../../../constants/envs";
import { BLOG_SPACE } from "../../../constants/spaces";

const clientDefault = createClient({
  accessToken: BLOG_DELIVERY_TOKEN,
  space: BLOG_SPACE,
});
const clientPreview = createClient({
  accessToken: BLOG_DELIVERY_TOKEN_PREVIEW,
  space: BLOG_SPACE,
  host: PREVIEW_HOST,
});

export const BlogDeliveryClient = ({
  preview,
}: BlogDeliveryClientOptions = {}) => {
  if (preview) return clientPreview;
  return clientDefault;
};

export interface BlogDeliveryClientOptions {
  preview?: boolean;
}
