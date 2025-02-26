export type CampaignParams = {
  name?: string;
  source?: string;
  medium?: string;
  content?: string;
};

/**
 * Fetches the current utm campaign query params
 * Priority:
 * - query string `utm_campaign` `utm_source` `utm_medium` `utm_content
 * - cached utm campaign params
 */
export async function loadCampaign() {
  if (typeof window === 'undefined') return {};
  const cachedCampaign = getStoredCampaign();
  const queryCompaign = await getQueryCompaign();

  const campaign = {
    name: queryCompaign.name || cachedCampaign.name,
    source: queryCompaign.source || cachedCampaign.source,
    medium: queryCompaign.medium || cachedCampaign.medium,
    content: queryCompaign.content || cachedCampaign.content,
  };
  setStoredCampaign(campaign);
  return campaign;
}

async function getQueryCompaign() {
  const campaignParams = {
    name: null,
    source: null,
    medium: null,
    content: null,
  };

  // If no query string - return early
  const { search } = window.location;
  if (!search.includes('?')) {
    return campaignParams;
  }

  // Native query string getter
  const params = new URLSearchParams(search);
  return {
    name: params.get('utm_campaign'),
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    content: params.get('utm_content'),
  };
}

function getStoredCampaign() {
  try {
    const campaign = window.localStorage.getItem('campaign');
    return JSON.parse(campaign || '') || {};
  } catch (err) {
    return {};
  }
}
function setStoredCampaign(campaign: CampaignParams) {
  try {
    window.localStorage.setItem('campaign', JSON.stringify(campaign));
  } catch (err) {
    /** ignore */
  }
}
