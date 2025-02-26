import fetchRetryWrapper, { type RequestInitWithRetry } from "fetch-retry";
import { generateURLWithSearchParams } from "ui/utils/route/generateURLWithSearchParams";

interface Options {
  baseUrl: string;
}

interface GetOptions {
  queryParams?: Record<string, unknown>;
  retry?: RequestInitWithRetry;
  queryFormat?: Parameters<typeof generateURLWithSearchParams>[0]["options"];
  includeV2AuthHeader?: boolean;
  abortOnTimeout?: boolean;
}

interface PostOptions {
  redirect?: boolean;
  includeV2AuthHeader?: boolean;
}

const ABORT_SIGNAL_TIMEOUT_DEFAULT_MS = 20000;

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/fetch
 */
async function fetchRequest(
  ...args: Parameters<typeof fetch>
): Promise<Response> {
  return fetch(...args).then((response) => {
    // status not in the range 200-299
    if (!response.ok) {
      return response
        .json() // parse API JSON Error
        .catch(() => {
          // Error parsing API Error - needs to come first to not catch API JSON Error thrown down the chain
          throw new Error("Fetch Request Internal Server Error");
        })
        .then((error) => {
          // 4xx and 5xx responses that are not network errors.
          // It needs `throw` because `fetch` only rejects when a network error is encountered
          throw error;
        });
    }

    // successful response - 2xx
    return response;
  });
}

function GET<T = unknown>(url: string, options: GetOptions = {}): Promise<T> {
  const { queryParams, retry, queryFormat, abortOnTimeout } = options;
  const headers = new Headers();
  let signal: AbortSignal | undefined = undefined;
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  if (abortOnTimeout) {
    // https://github.com/whatwg/fetch/issues/951#issuecomment-1139487844
    signal = AbortSignal.timeout(ABORT_SIGNAL_TIMEOUT_DEFAULT_MS);
  }

  if (retry) {
    const fetchRetry = fetchRetryWrapper(fetchRequest);
    let newUrl = url;

    if (queryParams) {
      newUrl = generateURLWithSearchParams({
        url,
        params: queryParams,
        options: queryFormat,
      });
    }

    return fetchRetry(newUrl, {
      ...retry,
      headers,
      signal,
    }).then((response) => response.json());
  }

  if (queryParams) {
    return fetchRequest(
      generateURLWithSearchParams({
        url,
        params: queryParams,
        options: queryFormat,
      }),
      { headers, signal }
    ).then((data) => data.json());
  }

  /**
   * @todo logic to add body params
   */
  return fetchRequest(url, {
    headers,
    signal,
  }).then((data) => data.json());
}

/**
 * Simplified GET request that passes headers and has no explicit returned Content-Type
 */
function GET_RAW(
  url: string,
  headers: Headers = new Headers()
): Promise<Response> {
  return fetchRequest(url, {
    headers,
  });
}

function POST<T = unknown>(
  url: string,
  data: unknown,
  init?: Omit<RequestInit, "body" | "method">,
  options: PostOptions = {}
): Promise<T> {
  const { headers, ...requestOptions } = init || {};
  const computedHeaders = new Headers(headers);

  if (!computedHeaders.has("Content-Type")) {
    computedHeaders.append("Content-Type", "application/json");
  }

  return fetchRequest(url, {
    method: "POST",
    headers: computedHeaders,
    body: JSON.stringify(data),
    ...requestOptions,
  }).then((data) => (options.redirect ? data : data.json()));
}
class Api {
  baseUrl: string;
  constructor(options: Options) {
    this.baseUrl = options.baseUrl;
  }
  get<T = unknown>(...args: Parameters<typeof GET>): Promise<T> {
    const [url, ...restArgs] = args;
    return GET(this.baseUrl + url, ...restArgs);
  }
  getRaw(...args: Parameters<typeof GET_RAW>): Promise<Response> {
    const [url, ...restArgs] = args;
    return GET_RAW(this.baseUrl + url, ...restArgs);
  }
  post<T = unknown>(...args: Parameters<typeof POST>): Promise<T> {
    const [url, ...restArgs] = args;
    return POST(this.baseUrl + url, ...restArgs);
  }
  static create(options: Options) {
    return new Api(options);
  }
  static all<T extends readonly unknown[] | []>(promises: T) {
    return Promise.all(promises);
  }
}

const api: typeof GET & {
  get: typeof GET;
  getRaw: typeof GET_RAW;
  post: typeof POST;
  create: typeof Api.create;
  all: typeof Api.all;
} = (...args: Parameters<typeof GET>) => GET(...args);

api.get = GET;
api.getRaw = GET_RAW;
api.post = POST;
api.create = Api.create;
api.all = Api.all;

export default api;
