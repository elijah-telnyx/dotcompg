export interface rate {
  id: string;
  name: string;
  calc: ({ storage, egress }: { storage: number; egress: number }) => number;
}

/**
 * calc input range is in TiB while pricing is in GiB
 * 1 TiB = 1024 GiB
 */

export const ToGiB = (TiB: number) => TiB * 1024;

const fixedRatePrices = {
  telnyx: { storage: 0.006, egress: 0 },
  azure: { storage: 0.01933, egress: 0.0107 },
  digitalOcean: { storage: 0.02, egress: 0.01 },
  wasabi: { storage: 0.0073, egress: 0.4295 },
  bb: { storage: 0.00644, egress: 0.0107 },
  gcs: { storage: 0.1611, egress: 0 },
};

const telnyx: rate = {
  id: 'telnyx',
  name: 'Telnyx',
  calc: ({ storage, egress }) => {
    return storage * fixedRatePrices.telnyx.storage + egress * fixedRatePrices.telnyx.egress;
  },
};

const aws: rate = {
  id: 'aws',
  name: 'Amazon Web Services',
  calc: ({ storage, egress }) => {
    let totalPrice = 0;
    let remainingStorage = storage;
    let remainingEgress = egress;

    // https://docs.google.com/spreadsheets/d/14BSP8DhIU_LOtmIerPSJHd0GsZW7KMm-45E9TmbnW8o/edit#gid=0
    const storageTiers = [
      { min: 0, max: ToGiB(50), rate: 0.023 },
      { min: ToGiB(51), max: ToGiB(450), rate: 0.022 },
      { min: ToGiB(451), max: null, rate: 0.021 },
    ];
    const egressTiers = [
      { min: 0, max: ToGiB(10), rate: 0.09 },
      { min: ToGiB(11), max: ToGiB(50), rate: 0.085 },
      { min: ToGiB(51), max: ToGiB(150), rate: 0.07 },
      { min: ToGiB(151), max: null, rate: 0.05 },
    ];

    for (const tier of storageTiers) {
      if (tier.max !== null && storage > tier.max) {
        const tierUsage = tier.max - (tier.min || 0);
        remainingStorage -= tierUsage;
        totalPrice += tierUsage * tier.rate;
      } else {
        totalPrice += remainingStorage * tier.rate;
        break;
      }
    }

    for (const tier of egressTiers) {
      if (tier.max !== null && egress > tier.max) {
        const tierUsage = tier.max - (tier.min || 0);
        remainingEgress -= tierUsage;
        totalPrice += tierUsage * tier.rate;
      } else {
        totalPrice += remainingEgress * tier.rate;
        break;
      }
    }
    return totalPrice;
  },
};

const azure: rate = {
  id: 'azure',
  name: 'Microsoft Azure',
  calc: ({ storage, egress }) => {
    return storage * fixedRatePrices.azure.storage + egress * fixedRatePrices.azure.egress;
  },
};

const digitalOcean: rate = {
  id: 'digitalocean',
  name: 'Digital Ocean',
  calc: ({ storage, egress }) => {
    return storage * fixedRatePrices.digitalOcean.storage + egress * fixedRatePrices.digitalOcean.egress;
  },
};

const wasabi: rate = {
  id: 'wasabi',
  name: 'Wasabi',
  calc: ({ storage, egress }) => {
    return storage * fixedRatePrices.wasabi.storage + egress * fixedRatePrices.wasabi.egress;
  },
};

const bb: rate = {
  id: 'backblaze',
  name: 'Backblaze',
  calc: ({ storage, egress }) => {
    if (egress > storage * 3) {
      // backblaze offers free egress up to storage amount * 3, then starts charging at rate
      return storage * fixedRatePrices.bb.storage + (egress - storage * 3) * fixedRatePrices.bb.egress;
    }
    return storage * fixedRatePrices.bb.storage;
  },
};

const gcs: rate = {
  id: 'gcs',
  name: 'Google Cloud',
  calc: ({ storage, egress }) => {
    return storage * fixedRatePrices.gcs.storage + egress * fixedRatePrices.gcs.egress;
  },
};

const rates: rate[] = [telnyx, aws, azure, digitalOcean, wasabi, bb, gcs];

export default rates;
