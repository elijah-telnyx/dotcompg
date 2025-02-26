import type { ThemedCSS } from '../../stitches.config';

type typographyCSSProps = Pick<
  ThemedCSS,
  | 'fontFamily'
  | 'fontWeight'
  | 'fontSize'
  | 'lineHeight'
  | 'fontStyle'
  | 'letterSpacing'
  | 'textTransform'
  | 'textDecoration'
>;

const Typography = (props: typographyCSSProps): ThemedCSS => props;

const baseHeading = Typography({
  fontFamily: '$formula',
  fontWeight: '$extrabold',
});

const baseRegular = Typography({
  fontFamily: '$inter',
  fontStyle: 'normal',
  fontWeight: '$regular',
});

const baseP = {
  ...baseRegular,
  letterSpacing: '$small',
};

const baseQuote = Typography({
  fontFamily: '$inter',
  fontStyle: 'italic',
  fontWeight: '$light',
  letterSpacing: '$small',
});

const baseCode = Typography({
  fontFamily: 'Courier',
  fontStyle: 'normal',
  fontWeight: '$regular',
  letterSpacing: '$medium',
});

const h1 = {
  $h1: Typography({
    ...baseHeading,
    fontSize: '$xh',
    lineHeight: '$xh',
  }),
  '$h1.mobile': Typography({
    ...baseHeading,
    fontSize: '$xl',
    lineHeight: '$xl',
  }),
  '$h1.alt': Typography({
    ...baseHeading,
    fontSize: '$xxl',
    lineHeight: '$xxl',
  }),
  '$h1.alt.mobile': Typography({
    ...baseHeading,
    fontSize: '32px',
    lineHeight: '40px',
  }),
  '$h1.dashboard': Typography({
    ...baseHeading,
    fontSize: '$large',
    lineHeight: '$large',
    letterSpacing: '$medium',
  }),
};

const h2 = {
  $h2: Typography({
    ...baseHeading,
    fontSize: '$xxl',
    lineHeight: '$xxl',
  }),
  '$h2.mobile': Typography({
    ...baseHeading,
    fontSize: '$large',
    lineHeight: '$large',
  }),
  '$h2.category': Typography({
    ...baseHeading,
    fontSize: '$small',
    lineHeight: '$xs',
    letterSpacing: '$medium',
    textTransform: 'uppercase',
  }),
  '$h2.category.mobile': Typography({
    ...baseHeading,
    fontSize: '$xxs',
    lineHeight: '$xxs',
    letterSpacing: '$medium',
    textTransform: 'uppercase',
  }),
  '$h2.alt': Typography({
    ...baseHeading,
    fontSize: '56px',
    lineHeight: '64px',
    letterSpacing: '0',
  }),
  '$h2.alt.mobile': Typography({
    ...baseHeading,
    fontSize: '$large',
    lineHeight: '$large',
    letterSpacing: 0,
  }),
  '$h2.dashboard': Typography({
    fontFamily: '$inter',
    fontWeight: '$semibold',
    fontSize: '$small',
    lineHeight: '$small',
    letterSpacing: '$medium',
  }),
};

const h3 = {
  $h3: Typography({
    ...baseHeading,
    fontSize: '$large',
    lineHeight: '$large',
  }),
  '$h3.mobile': Typography({
    ...baseHeading,
    fontSize: '$medium',
    lineHeight: '$medium',
  }),
  '$h3.alt': Typography({
    ...baseHeading,
    fontSize: '32px',
    lineHeight: '40px',
    letterSpacing: '0',
  }),
  '$h3.alt.mobile': Typography({
    ...baseHeading,
    fontSize: '$large',
    lineHeight: '$large',
    letterSpacing: 0,
  }),
  '$h3.dashboard': Typography({
    fontFamily: '$inter',
    fontWeight: '$semibold',
    fontSize: '$xs',
    lineHeight: '$xs',
    letterSpacing: '$medium',
  }),
};

const p = {
  $p: Typography({
    ...baseP,
    fontSize: '$medium',
    lineHeight: '$medium',
  }),
  '$p.mobile': Typography({
    ...baseP,
    fontSize: '$small',
    lineHeight: '$small',
  }),
  '$p.lead': Typography({
    ...baseP,
    fontSize: '$large',
    lineHeight: '$large',
  }),
  '$p.lead.mobile': Typography({
    ...baseP,
    fontSize: '$medium',
    lineHeight: '$medium',
  }),
  '$p.caption': Typography({
    ...baseP,
    fontStyle: 'italic',
    fontSize: '$small',
    lineHeight: '$xs',
  }),
  '$p.caption.mobile': Typography({
    ...baseP,
    fontStyle: 'italic',
    fontSize: '$xs',
    lineHeight: '$xs',
  }),
  '$p.caption.dashboard': Typography({
    ...baseP,
    fontStyle: 'normal',
    fontSize: '$xxs',
    lineHeight: '$xxs',
    letterSpacing: '0.01em',
  }),
  '$p.statistic': Typography({
    ...baseHeading,
    fontSize: '$huge',
    lineHeight: '$huge',
  }),
  '$p.statistic.mobile': Typography({
    ...baseHeading,
    fontSize: '$large',
    lineHeight: '$large',
  }),
  '$p.statistic.major': Typography({
    ...baseHeading,
    fontSize: '$xxh',
    lineHeight: '$xxh',
  }),
  '$p.statistic.major.mobile': Typography({
    ...baseHeading,
    fontSize: '$xxxl',
    lineHeight: '$xxxl',
  }),
  '$p.dashboard': Typography({
    ...baseP,
    fontSize: '$xs',
    lineHeight: '$xs',
    letterSpacing: '0.01em',
  }),
};

const quote = {
  $quote: Typography({
    ...baseQuote,
    fontSize: '$xxl',
    lineHeight: '$xxl',
  }),
  '$quote.mobile': Typography({
    ...baseQuote,
    fontSize: '$large',
    lineHeight: '$large',
  }),
};

const cta = {
  $cta: Typography({
    ...baseHeading,
    fontSize: '$medium',
    lineHeight: '$medium',
  }),
  '$cta.mobile': Typography({
    ...baseHeading,
    fontSize: '$small',
    lineHeight: '$small',
  }),
  $link: Typography({
    ...baseRegular,
    fontSize: '$medium',
    lineHeight: '$medium',
    textDecoration: 'underline',
  }),
  '$link.mobile': Typography({
    ...baseRegular,
    fontSize: '$small',
    lineHeight: '$small',
    textDecoration: 'underline',
  }),
  '$link.lead': Typography({
    ...baseRegular,
    fontSize: '$large',
    lineHeight: '$large',
    textDecoration: 'underline',
  }),
  '$link.lead.mobile': Typography({
    ...baseRegular,
    fontSize: '$medium',
    lineHeight: '$medium',
    textDecoration: 'underline',
  }),
};

const code = {
  $code: Typography({
    ...baseCode,
    fontSize: '$medium',
    lineHeight: '$medium',
  }),
  '$code.mobile': Typography({
    ...baseCode,
    fontSize: '$xxxs',
    lineHeight: '$xxxs',
  }),
};

const label = {
  $label: Typography({
    ...baseP,
    fontSize: '$xs',
    lineHeight: '$xxs',
  }),
  '$label.mobile': Typography({
    ...baseP,
    fontSize: '$xxxs',
    lineHeight: '$xxs',
  }),
};

const error = {
  $error: Typography({
    ...baseP,
    fontSize: '$xs',
    lineHeight: '$xxs',
    fontWeight: '$medium',
    fontStyle: 'normal',
  }),
};

export const typographyMap = {
  ...h1,
  ...h2,
  ...h3,
  ...p,
  ...quote,
  ...cta,
  ...code,
  ...label,
  ...error,
} as const;
