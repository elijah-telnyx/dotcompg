import {
  BlogDeliveryClient,
  BlogDeliveryClientOptions,
} from "./BlogDeliveryClient";

export const getEntry = async (
  id: string,
  options: BlogDeliveryClientOptions
) => {
  return BlogDeliveryClient(options).getEntry(id);
};
