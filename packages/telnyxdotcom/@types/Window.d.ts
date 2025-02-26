/**
 * @link https://developers.intercom.com/installing-intercom/web/methods/#intercomshow
 */
type IntercomCommands =
  | 'boot'
  | 'shutdown'
  | 'update'
  | 'hide'
  | 'show'
  | 'showSpace'
  | 'showMessages'
  | 'showNewMessage'
  | 'onHide'
  | 'onShow'
  | 'onUnreadCountChange'
  | 'trackEvent'
  | 'getVisitorId'
  | 'startTour'
  | 'showArticle'
  | 'showNews'
  | 'startSurvey'
  | 'startChecklist'
  | 'showTicket'
  | 'onUserEmailSupplied';

interface Window {
  Intercom?: (command: IntercomCommands, ...params: any[]) => void;
  recaptcha?: unknown;
}
