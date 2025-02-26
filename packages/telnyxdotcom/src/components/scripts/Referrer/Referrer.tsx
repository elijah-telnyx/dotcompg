import { useContext, useEffect } from 'react';
import { GlobalContext } from 'pages/_app';
import { loadReferrer } from './lifecycleMethods';

export const Referrer = () => {
  const { setReferrer } = useContext(GlobalContext);

  useEffect(() => {
    async function load() {
      const referrer = await loadReferrer();

      if (referrer) {
        setReferrer(referrer);
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load just once on mount

  return <></>;
};

export default Referrer;
