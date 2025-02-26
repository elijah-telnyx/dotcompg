import { NextRequest, NextResponse } from "next/server";
import constants from "constants/env";
import { RUNTIME_ENV } from "env";

type GenericFunction = (response: NextResponse) => NextResponse;

export const appendToResponse = (...args: GenericFunction[]) => {
  return args.reduce(
    (currentResponse, func) => func(currentResponse),
    NextResponse.next()
  );
};

export const whiteListCookieBot =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    if (req.nextUrl.pathname === "/") {
      const normalizeString = (str: string): string => str?.toLocaleLowerCase();
      const cookieBotUserAgent = "Cookiebot";
      const cookieBotVerifier = "isCookieBot";

      const userAgent = req.headers.get("user-agent");
      console.log(userAgent);
      if (
        userAgent &&
        normalizeString(userAgent)?.includes(
          normalizeString(cookieBotUserAgent)
        ) &&
        !req.cookies.get(cookieBotVerifier)
      ) {
        console.info(`Setting ${cookieBotVerifier} cookie`);
        response.cookies.set(cookieBotVerifier, "true");
      }
    }

    return response;
  };

export const blockStagingPagesOnProduction =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    const isStagingPage = req.nextUrl.pathname.startsWith("/staging");
    if (!isStagingPage) return response;

    if (
      process.env.NEXT_PUBLIC_RUNTIME_ENV === "dev" ||
      process.env.NEXT_PUBLIC_RUNTIME_ENV === "staging" ||
      process.env.NEXT_PUBLIC_RUNTIME_ENV === "test"
    ) {
      return response;
    }

    return NextResponse.rewrite(new URL("/404", req.url));
  };

export const handleCaseInsensitivePaths =
  ({ req }: { req: NextRequest }) =>
  (response: NextResponse): NextResponse => {
    if (req.nextUrl.pathname === req.nextUrl.pathname.toLowerCase()) {
      return response;
    }

    return NextResponse.redirect(new URL(req.url.toLowerCase()));
  };
