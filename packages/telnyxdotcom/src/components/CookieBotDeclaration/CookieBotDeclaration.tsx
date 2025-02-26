import Script from 'next/script';
import Grid from 'ui/components/Grid';

const COOKIEBOT_ID = '2987628c-776c-4fd0-8b6d-59e9fb1e4f60';
const COOKIEBOT_CONTENT_ID = 'cookie-bot-content';

const CookieBotContent = () => {
  return (
    <Grid.Container>
      <Grid.Item id={COOKIEBOT_CONTENT_ID} xs={4} small={8}>
        {/* This div is required to correctly render content inside GridItem */}
      </Grid.Item>
      <Script id='CookieBotDeclaration' strategy='lazyOnload'>
        {`
          (function (contentId, cookieBotId) {
            // Get the element by the ID provided
            const cookieDeclarationContent = document.getElementById(contentId);

            // Create script element
            const scriptElement = document.createElement("script");

            // Set the type, ID, and source of the script element
            scriptElement.type = "text/javascript";
            scriptElement.id = "CookieDeclaration";
            scriptElement.src = "https://consent.cookiebot.com/" + cookieBotId + "/cd.js";

            // Append the script to the element with the ID provided.
            // The script will render the content inside the element
            // that it was appended to.
            cookieDeclarationContent.appendChild(scriptElement);
          })("${COOKIEBOT_CONTENT_ID}", "${COOKIEBOT_ID}");
        `}
      </Script>
    </Grid.Container>
  );
};

export default CookieBotContent;
