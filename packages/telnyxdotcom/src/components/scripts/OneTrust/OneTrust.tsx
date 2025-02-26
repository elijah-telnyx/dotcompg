import { useContext, useEffect } from 'react';
import Cookie, {
  ONE_TRUST_CATEGORIES_STATUS,
  ONE_TRUST_ACTIVE_GROUPS,
  ONE_TRUST_CLOSED,
  COOKIE_POLICY,
} from 'lib/Cookie';
import Segment, { setAnonymousId } from 'components/scripts/Segment';
import useSessionStorage from 'hooks/useSessionStorage';
import { GlobalContext } from 'pages/_app';
import { MUNCHKIN_SCRIPT_ID, initMunchkin, isMunchkinActive } from '../Munchkin';
import { SIFT_SCRIPT_ID, initSift } from '../Sift';
import NRich from '../NRich';

const { COOKIE_STATUS } = COOKIE_POLICY;

/**
 * this is necessary to track because OneTrust SDK is only defined when alert popup is undefined at browser load and at onetrust script load
 * watching if `onetrust-consent-sdk` is defined is the only way to guarantee that global OneTrust and OptanonActiveGroups are defined
 */
const ONE_TRUST_CONSENT_SDK_ID = 'onetrust-consent-sdk';

type OptanonActiveGroupsList = (keyof typeof ONE_TRUST_CATEGORIES_STATUS)[];
declare global {
  // https://github.com/typescript-eslint/typescript-eslint/issues/3617
  // eslint-disable-next-line no-var
  var OptanonActiveGroups: string | undefined | null;
  // eslint-disable-next-line no-var
  var OneTrust: {
    IsAlertBoxClosed: () => boolean;
    OnConsentChanged: (callback: (event: { detail: OptanonActiveGroupsList; type: string }) => void) => void;
    initializeCookiePolicyHtml: () => void;
  };
}

function getOneTrustActiveGroupsList(optanonActiveGroups: string | undefined | null) {
  return (optanonActiveGroups || '').split(',').filter(Boolean) as OptanonActiveGroupsList;
}

function isScriptInOptanonActiveGroup(script: HTMLElement, optanonActiveGroupsList: OptanonActiveGroupsList) {
  // if script has no className, no group, it loads by default
  if (!script.className) return true;

  return optanonActiveGroupsList.some((group) => {
    // OneTrust store Optanon Groups in script classnames
    return script.className.includes(group);
  });
}

export interface InteractiveScriptsProps {
  optanonActiveGroupsList: OptanonActiveGroupsList;
  isAlertBoxClosed?: boolean;
}

const InteractiveScripts = ({ isAlertBoxClosed, optanonActiveGroupsList }: InteractiveScriptsProps) => {
  if (isAlertBoxClosed) {
    // only strictly necessary ones
    if (optanonActiveGroupsList.length === 1) {
      return (
        <>
          <Segment />
          <NRich cookieless />
        </>
      );
    }

    return (
      <>
        <Segment acceptedCookies />
        <NRich cookieless={false} />
      </>
    );
  }

  return (
    <>
      <NRich cookieless />
    </>
  );
};

export const OneTrust = () => {
  const { cookieStatus, setCookieStatus } = useContext(GlobalContext);
  const [cookieActiveGroups, setCookieActiveGroups] = useSessionStorage<(keyof typeof ONE_TRUST_CATEGORIES_STATUS)[]>(
    ONE_TRUST_ACTIVE_GROUPS,
    []
  );

  const hasBodyNode = Boolean(document.querySelector('body'));
  const isAlertBoxClosed = Boolean(Cookie.get(ONE_TRUST_CLOSED)) || cookieStatus === COOKIE_STATUS.accepted;
  /**
   * for this effect, we just want to trigger when `body` is defined
   * whether `body` has changed its properties or its content is not relevant to trigger the useEffect again
   * the effect is already observing Mutations through `MutationObserver`
   * */
  useEffect(() => {
    if (isAlertBoxClosed) {
      setCookieStatus(COOKIE_STATUS.accepted);
    }

    if (!hasBodyNode) return;

    const bodyNode = document.querySelector('body');

    let hasLoadedMunchkinScript = false;
    let hasLoadedSiftScript = false;
    let hasLoadedOneTrustConsentSDK = false;

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver((_mutationList) => {
      // always refer to `window.OptanonActiveGroups` instead of a `const` to always get the updated list
      const oneTrustConsentSDKElement = document.getElementById(ONE_TRUST_CONSENT_SDK_ID);
      const marketoScriptElement = document.getElementById(MUNCHKIN_SCRIPT_ID);
      const siftScriptElement = document.getElementById(SIFT_SCRIPT_ID);

      // one trust sdk wrapper (div) first injected into the dom
      if (!hasLoadedOneTrustConsentSDK && oneTrustConsentSDKElement) {
        setCookieActiveGroups(getOneTrustActiveGroupsList(window.OptanonActiveGroups));

        window.OneTrust.OnConsentChanged(() => {
          setCookieActiveGroups(getOneTrustActiveGroupsList(window.OptanonActiveGroups));
          // propagate session data status-translated to global context for components to be updated
          // always "accepted" as to use the website the user is already loading required cookies
          setCookieStatus(COOKIE_STATUS.accepted);
        });

        // always "accepted" as to use the website the user is already loading required cookies
        if (isAlertBoxClosed) {
          setCookieStatus(COOKIE_STATUS.accepted);
        } else {
          setAnonymousId();
        }
        hasLoadedOneTrustConsentSDK = true;
      }

      // marketo script first injected into the dom
      if (
        !hasLoadedMunchkinScript &&
        marketoScriptElement &&
        isScriptInOptanonActiveGroup(marketoScriptElement, getOneTrustActiveGroupsList(window.OptanonActiveGroups))
      ) {
        if (isMunchkinActive()) {
          initMunchkin();
        } else {
          // when marketo script element loads before init
          marketoScriptElement.onload = function () {
            initMunchkin();
          };
        }
        hasLoadedMunchkinScript = true;
      }

      // sift script first injected into the dom
      if (
        !hasLoadedSiftScript &&
        siftScriptElement &&
        isScriptInOptanonActiveGroup(siftScriptElement, getOneTrustActiveGroupsList(window.OptanonActiveGroups))
      ) {
        initSift();
        hasLoadedSiftScript = true;
      }
    });

    // Start observing the target node for inserted divs (oneTrust alertbox)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    observer.observe(bodyNode!, { childList: true });

    // Later, you can stop observing
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBodyNode, isAlertBoxClosed]); // `setCookieStatus` and `setCookieActiveGroups` are both `useState`

  return <InteractiveScripts isAlertBoxClosed={isAlertBoxClosed} optanonActiveGroupsList={cookieActiveGroups} />;
};

export default OneTrust;
