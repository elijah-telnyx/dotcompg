import { theme } from '../styles';

/**
 * @link https://gist.github.com/lopspower/03fb1cc0ac9f32ef38f4
 */
export const addOpacityToHex =
  (opacity: number) =>
  (hex: string): string => {
    let opacityHex = Math.round(opacity * 255)
      .toString(16)
      .toUpperCase();

    if (opacityHex === '0') {
      opacityHex = '00';
    }

    return hex + opacityHex;
  };

export const getColor = (color: keyof typeof theme.colors) =>
  theme.colors[color].value;

export const interactiveElements = [
  'button',
  'a',
  'input',
  'select',
  'textarea',
  'label',
];

export const interactiveElementsSelector = interactiveElements
  .map((el) => `${el}&, ${el} > &`)
  .join(', ');
