import { DeliveryClient, DeliveryClientOptions } from "./DeliveryClient";

export const getEntry = async (id: string, options: DeliveryClientOptions) => {
  return DeliveryClient(options).getEntry(id);
};

export const getAssetsFromTag = async (
  tag: string,
  options: DeliveryClientOptions
) => {
  return DeliveryClient(options).getAssets({
    "metadata.tags.sys.id[in]": [tag],
  });
};
