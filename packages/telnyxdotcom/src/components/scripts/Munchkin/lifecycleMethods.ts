import constants from 'constants/env';
import { errorLogger } from 'utils/errorHandler/errorLogger';

const defaultMunchkinId = constants.Marketo.defaultMunchkinId;

export function initMunchkin() {
  try {
    // Add class to all links to prevent extra Munchkin events
    // https://nation.marketo.com/t5/product-discussions/disable-clicklink-functionality-from-munchkin/m-p/158297
    const links = document.querySelectorAll('a:not(.mchNoDecorate)');
    for (const link of links) {
      link.classList.add('mchNoDecorate');
    }

    // marketo loads a secondary versioned script (/<version>/<script>.js) on init
    window.Munchkin.init(defaultMunchkinId);
    console.log('Munchkin Script initiated');
  } catch (e: unknown) {
    onMunchkinError(e);
  }
}

export function isMunchkinActive() {
  return !!window.Munchkin;
}

export function onMunchkinError(e: unknown) {
  errorLogger({ error: new Error('Marketo Munchkin failed to load'), data: JSON.stringify(e) });
}
