import featureFlippers from 'constants/featureFlippers';

interface VideoAsset {
  video: string;
  poster: string;
  mobile?: string;
  alt?: string;
}

export const assets = {
  flow: {
    video:
      'https://videos.ctfassets.net/2vm221913gep/43z89lmO4ImrCehXaucEAg/5f0b7f4ad60126bbed6a89774944d597/flow-video.mp4',
    poster:
      'https://images.ctfassets.net/2vm221913gep/6R2eKnoNUxr7xxHyS715mI/e554b051db735a21568f00a6c8c36d2b/flow-poster.jpg',
    mobile:
      'https://videos.ctfassets.net/2vm221913gep/2K5JwgmAOAaFv1waWpOAvR/0d96194b6c17704bef57f8b645df74ac/flow-mobile.webm',
    alt: 'Telnyx Flow - AI Workflow tool',
  },
  compute: {
    video:
      'https://videos.ctfassets.net/2vm221913gep/7DgntZPKZnCD07DjSOU6yT/127c1d5661b1c6698ce8aee661e1c69f/1-compute.webm',
    poster:
      'https://images.ctfassets.net/2vm221913gep/1acWH8OaqEeJb3wYaCF2ml/641d8ceb401fbc110a60d00cb2118cbf/1-Compute.jpg',
    mobile:
      'https://images.ctfassets.net/2vm221913gep/4UJqdBhRWbE6OSvb86cY18/71693bf34d4f17441d2648bf7147cfa0/1-compute-mobile.gif',
    alt: 'A mobile device displaying a computing process in progress.',
  },
  iot: {
    video:
      'https://videos.ctfassets.net/2vm221913gep/3T0UstdyVNfYzVdLz6utK0/524759462eb0b941c0860472b4e4dc57/2-iot.webm',
    poster:
      'https://images.ctfassets.net/2vm221913gep/1Z5rWUOHQNTu53Rpq7YtmQ/ba73dbf4aa5ba0b7cba1ec76f2c895b7/2-iot.jpg',
    mobile:
      'https://images.ctfassets.net/2vm221913gep/6eZAUdxsVtL3KDkLsr27Ar/edaaf8aedb6c7ce714ec1845b26d1e91/2-iot-mobile.webp',
    alt: 'A person using a mobile device to control IoT devices.',
  },
  communication: {
    video:
      'https://videos.ctfassets.net/2vm221913gep/409MDufP61WcL2qA015QA0/9c0e1e52ac0a3b4c10b7c2797962cd7d/3-CommsGettingStarted.webm',
    poster:
      'https://images.ctfassets.net/2vm221913gep/7egELnm12rV5kyKOdTOSZN/ed2e37fa3d56daa4d1701c87370299cc/3-CommsGettingStarted.jpg',
    mobile:
      'https://images.ctfassets.net/2vm221913gep/43PMKKM3gbGl3FgPa3K5zJ/593a67ce15eb46caab29b61010f36fbe/3-Comms-mobile.webp',
    alt: 'A mobile phone displaying communication icons.',
  },
  communication2: {
    video:
      'https://videos.ctfassets.net/2vm221913gep/4SPiSv5mQ6RstCF7uShajX/7292762368e42c88462466be41b7fa6a/4-CommsApp.webm',
    poster:
      'https://images.ctfassets.net/2vm221913gep/3a1KP4UW7pDV0ROEr9fofF/8b25cd33e4d0fd2b7b42817154691fd4/4-CommsApp.jpg',
  },
  networking: {
    video:
      'https://videos.ctfassets.net/2vm221913gep/3prFvNgy6Y8u2JT1TYCDyb/cadd1b3e99b814381fdf20e34f5e18ff/5-Networking.webm',
    poster:
      'https://images.ctfassets.net/2vm221913gep/70nm3x6IaENO8hs3w3vZ9H/a3f23dab1b828bbb4029a4d3aeb6d0a7/5-Networking.jpg',
    mobile:
      'https://images.ctfassets.net/2vm221913gep/4vHn1as0rxIPmHty9Jufgp/898007da812d8cb13117aa13e551443b/4-Networking-mobile.webp',
    alt: 'A mobile phone displaying a networking interface with various network nodes connected by lines.',
  },
  background: {
    video:
      'https://videos.ctfassets.net/2vm221913gep/4n6LJ4ArppaAXSzh1PZJZE/2682a0f8369113f083a4e3679e3b9c0c/background_grey.webm',
    poster:
      'https://images.ctfassets.net/2vm221913gep/1SokgQSUxL6U5xyarTvGen/a94778f67520f7240876016c1e271f32/background_grey.jpg',
  },
};

interface TimeStamp {
  start: number;
  end: number;
  label: string;
}

interface TimestampData {
  copy?: string;
  timestamps: TimeStamp[];
}

export interface Data {
  asset: VideoAsset | VideoAsset[];
  timestampsData: TimestampData[];
  exploreHref: string;
}

export interface Tab {
  label: string;
  id: string;
  data: Data;
  backgroundColor: 'tan' | 'citron' | 'green' | 'blue';
}

export const flow: Data = {
  asset: assets.flow,
  timestampsData: [
    {
      timestamps: [
        { start: 0, end: 29, label: '1/ Create chatbot' },
        { start: 29, end: 46, label: '2/ Upload and embed content' },
        { start: 46, end: 74, label: '3/ Update chatbot context' },
      ],
    },
  ],
  exploreHref: '/flow',
};

export const compute: Data = {
  asset: assets.compute,
  timestampsData: [
    {
      timestamps: [
        { start: 0, end: 13, label: '1/ Store and embed data' },
        { start: 13, end: 26, label: '2/ Query via OS model' },
        { start: 26, end: 36, label: '3/ Integrate inference into app' },
      ],
    },
  ],
  exploreHref: '/products#compute',
};

export const iot: Data = {
  asset: assets.iot,
  timestampsData: [
    {
      timestamps: [
        { start: 0, end: 7, label: '1/ Purchase a SIM' },
        { start: 7, end: 14, label: '2/ Monitor SIM fleet' },
        { start: 14, end: 27, label: '3/ Add SIM to Private Wireless Gateway' },
      ],
    },
  ],
  exploreHref: '/products#iot',
};

export const communication: Data = {
  asset: [assets.communication, assets.communication2],
  timestampsData: [
    {
      copy: 'Getting started',
      timestamps: [
        { start: 0, end: 11, label: '1/ Buy a number' },
        { start: 11, end: 19, label: '2/ Set up a SIP connection' },
        { start: 19, end: 28, label: '3/ Enterprise Integrations' },
      ],
    },
    {
      copy: 'Powering applications',
      timestamps: [
        { start: 0, end: 5, label: '4/ Send a text via API' },
        { start: 5, end: 15, label: '5/ Build a call flow' },
        { start: 15, end: 24, label: '6/ Embed WebRTC into app' },
      ],
    },
  ],
  exploreHref: '/products#communication',
};

export const networking: Data = {
  asset: assets.networking,
  timestampsData: [
    {
      timestamps: [
        { start: 0, end: 11, label: '1/ Create a VPN interface' },
        { start: 11, end: 19, label: '2/ Assign a Peer' },
        { start: 19, end: 33, label: '3/ Connect a global IP' },
      ],
    },
  ],
  exploreHref: '/products#networking',
};

export const tabs: Tab[] = [
  {
    label: 'Communication',
    id: 'communication',
    data: communication,
    backgroundColor: 'green',
  },
  { label: 'IoT', id: 'iot', data: iot, backgroundColor: 'citron' },
  { label: 'Compute', id: 'compute', data: compute, backgroundColor: 'tan' },
  featureFlippers.DOTCOM_2583_HOME_HERO_FLOW && {
    label: 'Flow',
    id: 'flow',
    data: flow,
    backgroundColor: 'blue',
  },
  !featureFlippers.DOTCOM_2583_HOME_HERO_FLOW && {
    label: 'Networking',
    id: 'networking',
    data: networking,
    backgroundColor: 'blue',
  },
].filter(Boolean) as Tab[];

export const transitionProps = {
  transitionProperty: 'all',
  transitionTimingFunction: 'cubic-bezier(0.72, 0, 0.12, 1)',
  transitionDuration: '0.8s',
  transitionDelay: '0ms',
};
