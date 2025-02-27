const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        formula: ['Formula', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        cream: 'var(--colors-cream)',
        black: 'var(--colors-black)',
        green: 'var(--colors-green)',
        'gray-hover-light': 'var(--colors-grayHoverLightBackground)',
        'gray-hover-dark': 'var(--colors-grayHoverDarkBackground)',
      },
      spacing: {
        xxs: 'var(--space-xxs)',
        xs: 'var(--space-xs)',
        small: 'var(--space-small)',
        medium: 'var(--space-medium)',
      },
      fontSize: {
        xs: 'var(--fontSizes-xs)',
        small: 'var(--fontSizes-small)',
        medium: 'var(--fontSizes-medium)',
      },
      lineHeight: {
        xs: 'var(--lineHeights-xs)',
        small: 'var(--lineHeights-small)',
        medium: 'var(--lineHeights-medium)',
      },
      fontWeight: {
        medium: '500',
        semibold: '600',
        extrabold: '800',
      },
      borderRadius: {
        xs: 'var(--radii-xs)',
        xxxl: 'var(--radii-xxxl)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};