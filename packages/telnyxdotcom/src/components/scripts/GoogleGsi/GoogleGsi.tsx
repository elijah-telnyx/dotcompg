import Script, { type ScriptProps } from 'next/script';

const GOOGLE_API_URL = 'https://accounts.google.com/gsi/client?hl=en';

export interface GoogleGsiProps {
  onLoad?: ScriptProps['onLoad'];
}

export const GoogleGsi = ({ onLoad }: GoogleGsiProps) => {
  return <Script id='google-gsi-script' onLoad={onLoad} src={GOOGLE_API_URL} strategy='afterInteractive' />;
};

export default GoogleGsi;
