import { useContext, useEffect } from 'react';
import { GlobalContext } from 'pages/_app';
import { loadCampaign } from './lifecycleMethods';

export const Campaign = () => {
  const { setCampaign } = useContext(GlobalContext);

  useEffect(() => {
    async function load() {
      const campaign = await loadCampaign();

      if (campaign) {
        setCampaign(campaign);
      }
    }

    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // load just once on mount

  return <></>;
};

export default Campaign;
