/* eslint-disable prettier/prettier */
import { PAGE_GROUPED_PANELS } from "./panels";

const {
  overview,
  missionControl,
  cloudStorage,
  messaging,
  voice,
  sipTrunking,
  webrtc,
  porting,
  network,
  inventory,
} = PAGE_GROUPED_PANELS;

export const PAGES = {
  overview: {
    hero: {
      heading: "Overview",
      copy: "See overall status of our businesses",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
      displayTimeRange: {
        minutes: 15,
      },
      timeRangeSelectOnly: true,
    },
    sections: Object.values(overview),
  },
  "mission-control": {
    hero: {
      heading: "Mission Control",
      copy: "Monitor critical service health metrics",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(missionControl),
  },
  "cloud-storage": {
    hero: {
      heading: "Cloud Storage",
      copy: "See Cloud Storage data",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(cloudStorage),
  },
  messaging: {
    hero: {
      heading: "Messaging",
      copy: "See Messaging data",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(messaging),
  },
  voice: {
    hero: {
      heading: "Programmable Voice",
      copy: "See Programmable Voice data",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(voice),
  },
  "sip-trunking": {
    hero: {
      heading: "SIP Trunking",
      copy: "See SIP Trunking data",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(sipTrunking),
  },
  webrtc: {
    hero: {
      heading: "WebRTC",
      copy: "See WebRTC data",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(webrtc),
  },
  porting: {
    hero: {
      heading: "Porting",
      copy: "Metrics for health and reliability of our porting related services.",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(porting),
  },
  network: {
    hero: {
      heading: "Network",
      copy: "See Network data",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(network),
  },
  inventory: {
    hero: {
      heading: "Inventory",
      copy: "Metrics for health and reliability of our inventory related services.",
      backgroundColor: "black",
      spacingTop: "continuous",
      spacingBottom: "continuous",
    },
    sections: Object.values(inventory),
  },
};
