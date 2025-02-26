import useBrowserLayoutEffect from './useBrowserLayoutEffect';

const CSS_VAR_NAME = '--scrollY';
const UNIT = 'px';

/**
 * set a css variable over html tag element
 */
const setGlobalCSSVariable = () => {
  document.documentElement.style.setProperty(
    CSS_VAR_NAME,
    String(window.scrollY) + UNIT
  );
};

type UseScrollReturn = {
  /**
   * css variable with the window scroll position
   * @default 0px
   */
  Y: string;
};

const useScroll = (): UseScrollReturn => {
  useBrowserLayoutEffect(() => {
    if (window) {
      window.addEventListener('scroll', setGlobalCSSVariable);
      return () => {
        window.removeEventListener('scroll', setGlobalCSSVariable);
      };
    }
  }, []);

  return { Y: `var(${CSS_VAR_NAME}, 0${UNIT})` };
};

export default useScroll;
