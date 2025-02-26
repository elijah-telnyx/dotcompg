import Script from 'next/script';
import { onMunchkinError } from './lifecycleMethods';

export const MUNCHKIN_SCRIPT = 'https://munchkin.marketo.net/munchkin.js';
export const MUNCHKIN_SCRIPT_ID = 'marketo-munchkin-script';

declare global {
  interface Window {
    Munchkin: {
      init: (id: string) => void;
      munchkinFunction: (eventName: string, properties: object) => void;
    };
  }
}

const Munchkin = () => {
  return <Script id={MUNCHKIN_SCRIPT_ID} strategy='afterInteractive' src={MUNCHKIN_SCRIPT} onError={onMunchkinError} />;
};

export default Munchkin;
