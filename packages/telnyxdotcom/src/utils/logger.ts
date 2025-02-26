import type { NotifiableError, OnErrorCallback } from '@bugsnag/js';
import Bugsnag from 'lib/Bugsnag';

type Params = {
  data?: any;
  severity?: OnErrorCallback['arguments'][0];
};

const callBack =
  (data: Params['data'], severity: Params['severity'] = 'info'): OnErrorCallback =>
  (event) => {
    if (data) {
      event.severity = severity;
      event.addMetadata('data', data);
    }
  };

export const logger = (info: NotifiableError, { data, severity }: Params | undefined = {}) => {
  console.log(info);
  Bugsnag.notify(info, callBack(data, severity));
};
