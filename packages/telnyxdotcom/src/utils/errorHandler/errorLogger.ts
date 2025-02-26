import Bugsnag from 'lib/Bugsnag';

type ErrorParams = {
  error: Error;
  url?: string;
  statusCode?: number;
  data?: any;
  severity?: 'info' | 'error' | 'warning';
};

export type Event = {
  severity: 'info' | 'error' | 'warning';
  addMetadata: (section: string, values: { [key: string]: any }) => void;
};

const errorCallBack =
  (data: ErrorParams['data'], severity: ErrorParams['severity'] = 'error') =>
  (event: Event) => {
    if (data) {
      event.severity = severity;
      event.addMetadata('data', data);
    }
  };

export const errorLogger = ({ error, data, url, statusCode, severity }: ErrorParams) => {
  console.error(JSON.stringify(error, null, 2), url, statusCode);
  if (url && statusCode) {
    Bugsnag.notify({ name: url as string, message: String(statusCode) }, errorCallBack(data, severity));
  }
  Bugsnag.notify(error, errorCallBack(data));
};
