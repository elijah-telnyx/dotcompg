import Api from "lib/Api";
import type { DashboardsParams, DashboardsResponse } from "utils/dashboards";
import { BASE_URL } from "env";

const api = Api.create({ baseUrl: `${BASE_URL}/api` });

const getDashboardParams = (params: DashboardsParams): URLSearchParams => {
  const urlParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    const value = params[key as keyof DashboardsParams];

    if (value) {
      urlParams.append(key, value);
    }
  });

  return urlParams;
};

export const getDashboards = ({
  code,
  start,
  end,
  partial_response,
}: DashboardsParams) => {
  const params = getDashboardParams({ code, start, end, partial_response });

  const query = params.toString();
  const url = `/dashboards${query ? `?${query}` : ""}`;

  return api.get<DashboardsResponse>(url);
};
