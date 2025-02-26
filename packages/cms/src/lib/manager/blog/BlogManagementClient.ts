import { createClient } from "contentful-management";
import { ENVIRONMENT, MANAGEMENT_TOKEN } from "../../../constants/envs";
import { BLOG_SPACE } from "../../../constants/spaces";

export const BlogManagementClient = createClient(
  {
    accessToken: MANAGEMENT_TOKEN,
  },
  {
    type: "plain",
    defaults: { spaceId: BLOG_SPACE, environmentId: ENVIRONMENT },
  }
);
