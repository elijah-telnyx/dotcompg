// push the element up to make up for font bottom spacing
export const fontOffset = (font?: 'paragraph' | 'cta' | 'h2.category') => {
  switch (font) {
    case 'paragraph':
    case 'cta':
    case 'h2.category':
      return { transform: 'translateY(-2px)' };

    default:
      return {};
  }
};
