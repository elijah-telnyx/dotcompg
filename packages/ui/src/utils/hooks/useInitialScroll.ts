import useBrowserLayoutEffect from './useBrowserLayoutEffect';

const useInitialScroll = (
  onInitialScrollCallback: () => void,
  deps: unknown[] = []
) => {
  useBrowserLayoutEffect(function onInitialPageScroll() {
    window.addEventListener('scroll', onInitialScrollCallback, { once: true });
    return () => {
      window.removeEventListener('scroll', onInitialScrollCallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useInitialScroll;
