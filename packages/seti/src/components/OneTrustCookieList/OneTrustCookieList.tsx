import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "ui/components/Icons/Loading";
import * as css from "./OneTrustCookieList.styled";

const ONE_TRUST_COOKIE_POLICY_ID = "ot-sdk-cookie-policy";

declare global {
  // https://github.com/typescript-eslint/typescript-eslint/issues/3617
  // eslint-disable-next-line no-var
  var OneTrust: {
    initializeCookiePolicyHtml: () => void;
  };
}

const OneTrustCookieList = () => {
  const { isReady } = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isReady) {
      try {
        window.OneTrust.initializeCookiePolicyHtml();
      } catch (e) {
        console.error("Failed to initialize cookie policy");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
  }, [isReady]);

  return (
    <css.Container>
      {/* This div is required to correctly render content inside GridItem */}
      <css.CookiePolicyItem
        id={ONE_TRUST_COOKIE_POLICY_ID}
        xs={4}
        small={8}
        medium={12}
      />
      {isLoading && (
        <css.LoadingItem>
          <Loading spin />
        </css.LoadingItem>
      )}
    </css.Container>
  );
};

export default OneTrustCookieList;
