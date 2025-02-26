export type Country = {
  name: string;
  alpha2: string;
  metatagAlpha2?: string;
  googleName: string;
  alpha3: string | null;
  numeric: string | null;
  region: number | string | null;
  dialCode: string | null;
  slug?: string;
};
