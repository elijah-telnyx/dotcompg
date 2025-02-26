import { createClient } from "contentful";
import {
  DELIVERY_TOKEN,
  DELIVERY_TOKEN_PREVIEW,
  PREVIEW_HOST,
} from "../../../constants/envs";
import { REBRAND_SPACE } from "../../../constants/spaces";

const clientDefault = createClient({
  accessToken: DELIVERY_TOKEN,
  space: REBRAND_SPACE,
});

const clientPreview = createClient({
  accessToken: DELIVERY_TOKEN_PREVIEW,
  space: REBRAND_SPACE,
  host: PREVIEW_HOST,
});

export const DeliveryClient = ({ preview }: DeliveryClientOptions = {}) => {
  if (preview) return clientPreview;
  return clientDefault;
};

export interface DeliveryClientOptions {
  preview?: boolean;
}
