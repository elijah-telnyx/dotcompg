export interface ReCAPTCHA {
  token: string;
  version: '3';
}

export interface GoogleReCAPTCHA {
  execute: (key: string, { action }: { action?: string }) => Promise<string>;
  ready: (cb: () => Promise<void>) => Promise<void>;
}

export type WindowWithRecaptcha = Window & typeof globalThis & { grecaptcha?: GoogleReCAPTCHA };

export type OnVerify = ({
  hasLoaded,
  isValid,
  token,
  version,
}: {
  hasLoaded?: boolean;
  isValid: boolean;
} & Partial<ReCAPTCHA>) => void | Promise<void>;
