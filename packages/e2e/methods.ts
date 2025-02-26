import qs from "qs";
const TEST_NUMBER = "+14582471776"; // dotcom squad owned number
const SESSIONS_URL = "https://api.telnyx.com/v2/application_sessions";
const EVENTS_URL = "https://api.telnyx.com/v2/application_events";

const GetVoiceSessions = async (params: any) => {
  const query = qs.stringify({
    ...params,
    "filter[to]": TEST_NUMBER,
    "filter[product]": "call_control",
  });
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append(
    "Authorization",
    `Bearer ${process.env.E2E_PORTAL_V2_API_KEY_PROD}`
  );

  try {
    console.log("Fetching Voice API sessions...");
    return await fetch(`${SESSIONS_URL}?${query}`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error fetching Voice API sessions");
    console.error(error);
  }
};

const GetSessionEvents = async (appSessionId: string) => {
  const query = qs.stringify({
    "filter[application_session_id]": appSessionId,
  });

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");
  headers.append(
    "Authorization",
    `Bearer ${process.env.E2E_PORTAL_V2_API_KEY_PROD}`
  );

  try {
    console.log("Fetching session events...");
    return await fetch(`${EVENTS_URL}?${query}`, {
      method: "GET",
      headers,
    }).then((res) => res.json());
  } catch (error) {
    console.error("Error fetching events");
    console.error(error);
  }
};

const methods = { GetVoiceSessions, GetSessionEvents };

export default methods;
