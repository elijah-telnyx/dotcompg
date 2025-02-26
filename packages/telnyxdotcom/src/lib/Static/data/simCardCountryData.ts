import type { ParsedMobileNetworkOperator } from 'services/iotCoverageService';

export interface country {
  readonly slug: string;
  readonly name: string;
  readonly country_code: string;
  readonly zone: string;
  readonly imgUrl: string;
  readonly lowestPrice?: string;
  readonly topNetworks?: string;
  readonly availableNetworks?: ParsedMobileNetworkOperator[];
}

export const IoTTier5Pricing = [0.0125, 0.0325, 0.0625, 0.125, 0.325, 0.62, 1.25, 3.25, 6.25];

const simCardCountryData: country[] = [
  {
    slug: 'ireland',
    name: 'Ireland',
    country_code: 'IE',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5mMZrcMXpgJ0sz57EFn4S/2ee2b0787667bac39dbb34057e05d786/ireland-sim-card-hero.png',
  },
  {
    slug: 'australia',
    name: 'Australia',
    country_code: 'AU',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1XLf4CtKtlR2YgptHyney3/b72c3aef453edaf305bbbd3cc5632d98/australia-sim-card-hero.png',
  },
  {
    slug: 'austria',
    name: 'Austria',
    country_code: 'AT',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3C0tHiGCilCFUf0VHjj33I/3489e4c3c2feea94171d5ed57d87abad/austria-sim-card-hero.png',
  },
  {
    slug: 'belgium',
    name: 'Belgium',
    country_code: 'BE',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6CP1vsbMwCwR8RznTo38IR/fe4195154d3bdadbbf8fb702a89269cf/belgium-sim-card-hero.png',
  },
  {
    slug: 'costa-rica',
    name: 'Costa Rica',
    country_code: 'CR',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/AGGG7ecZCVYOUf4xo6Yrw/57af4efb8d8a0a43f27ac47718b41ce6/costa-rica-sim-card-hero.png',
  },
  {
    slug: 'denmark',
    name: 'Denmark',
    country_code: 'DK',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2YaIpk4oUm7TYQyEvHz9qt/88dd6c35d55371e554d5b254b9373a95/denmark-sim-card-hero.png',
  },
  {
    slug: 'egypt',
    name: 'Egypt',
    country_code: 'EG',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2maDsGImhbWCoOdTbC5f2X/b516c05ca4c0d2452437c59a099752b2/egypt-sim-card-hero.png',
  },
  {
    slug: 'finland',
    name: 'Finland',
    country_code: 'FI',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2Pz8ph93hbsOFr07FrFAup/2f30cbfb3f18d2512cc851d1de86dbcb/finland-sim-card-hero.png',
  },
  {
    slug: 'france',
    name: 'France',
    country_code: 'FR',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5ufXD3WNwCvksHX3B71fxt/8fc8ff432ce5dea286c57b7867a1d6c9/france-sim-card-hero.png',
  },
  {
    slug: 'germany',
    name: 'Germany',
    country_code: 'DE',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4csG1k6xasLiNUICGLQ5Qh/82fc6574538ab155928c6b8564953e0c/germany-sim-card-hero.png',
  },
  {
    slug: 'greece',
    name: 'Greece',
    country_code: 'GR',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6g6jnphZZHlMh4JuyytCI3/e1972539497a655088cfcb505242e634/greece-sim-card-hero.png',
  },
  {
    slug: 'hungary',
    name: 'Hungary',
    country_code: 'HU',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2bscFO1VN57pyziaond92d/51bb2515829104b24df598e8ebcf2c51/hungary-sim-card-hero.png',
  },
  {
    slug: 'iran',
    name: 'Iran',
    country_code: 'IR',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2nv0T2Y716zXtmS3sCEkVR/0bc6384c40642d71319972f2b43306a5/iran-sim-card-hero.png',
  },
  {
    slug: 'israel',
    name: 'Israel',
    country_code: 'IS',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2oMhKn2ngcGVHIZlUV9iOo/a474820d0ba51f8be607eecb0f8e798c/israel-sim-card-hero.png',
  },
  {
    slug: 'italy',
    name: 'Italy',
    country_code: 'IT',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/jCfBWVScGnfACSWQhkTvh/f52ec36b8d89be095f027d34ea9aaedc/italy-sim-card-hero.png',
  },
  {
    slug: 'japan',
    name: 'Japan',
    country_code: 'JP',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3XhIE5Dn0x2RL755hTwMf5/944e1b6009bcdce58ccccb424e831c2a/japan-sim-card-hero.png',
  },
  {
    slug: 'latvia',
    name: 'Latvia',
    country_code: 'LV',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/796xeGDBg39s0iUN6MNHlm/959a94ad637d3fba0c4e31a242d824ab/latvia-sim-card-hero.png',
  },
  {
    slug: 'lithuania',
    name: 'Lithuania',
    country_code: 'LT',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5FRqBHVjl6xa3NLszOuQOB/4bb2d172faa0e6ee79db8aaef70460aa/lithuania-sim-card-hero.png',
  },
  {
    slug: 'luxembourg',
    name: 'Luxembourg',
    country_code: 'LU',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/IbVbCgIf1TB1yP1F9Qtod/22fa30abf25528d44a1660311f85cd5d/luxembourg-sim-card-hero.png',
  },
  {
    slug: 'malaysia',
    name: 'Malaysia',
    country_code: 'MY',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1rg1c5LR1uybo6cveYrE97/eaae2d117d56a7107edef752f4bea0a3/malaysia-sim-card-hero.png',
  },
  {
    slug: 'morocco',
    name: 'Morocco',
    country_code: 'MA',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/jewnyzfRWQvAW9vKVRr79/c17178a854fe6d986e331fcb188e752c/morocco-sim-card-hero.png',
  },
  {
    slug: 'nepal',
    name: 'Nepal',
    country_code: 'NP',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/22hyDOIlDUSFbeAPGKnW6l/536dccdd2bc396d91cd0b3ce39a1147d/nepal-sim-card-hero.png',
  },
  {
    slug: 'netherlands',
    name: 'the Netherlands',
    country_code: 'NL',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5rkJq1hvkhbfbgrMMPlKat/7f3a7d7cb95a018db3f70461011f8c5b/netherlands-sim-card-hero.png',
  },
  {
    slug: 'new-zealand',
    name: 'New Zealand',
    country_code: 'NZ',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4bWDzOW9xGY6rjhJYnXwtJ/e42878db0a917b9a7151a28fa8d5716a/new-zealand-sim-card-hero.png',
  },
  {
    slug: 'nigeria',
    name: 'Nigeria',
    country_code: 'NG',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1nTLf65EKKsu5rG7FV21Mp/2b19b277eae11b77303433bb5b8a28d0/nigeria-sim-card-hero.png',
  },
  {
    slug: 'norway',
    name: 'Norway',
    country_code: 'NO',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3EPyPFGfhjg4IivRBxPtQv/62f9e40ff3d3c5b88f282581a3dd5371/norway-sim-card-hero.png',
  },
  {
    slug: 'pakistan',
    name: 'Pakistan',
    country_code: 'PK',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2oy8DIfkNogKenHxAbpBPj/f6ee84124afe589d8f51d3b3e7481c6b/pakistan-sim-card-hero.png',
  },
  {
    slug: 'peru',
    name: 'Peru',
    country_code: 'PE',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3mUeh3nBPNP9IsuQqdEyD3/e3509a79aec9ae8c53a6a40413b0cf95/peru-sim-card-hero.png',
  },
  {
    slug: 'poland',
    name: 'Poland',
    country_code: 'PL',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/bVayBLUq8jnsMphWdWBVs/e5315992ac6d3c4e142beee2973c246d/poland-sim-card-hero.png',
  },
  {
    slug: 'portugal',
    name: 'Portugal',
    country_code: 'PT',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2LNOlV7d197t5nP4Zok42G/df786b09ce0c58bd5f663a53c5c1f3db/portugal-sim-card-hero.png',
  },
  {
    slug: 'romania',
    name: 'Romania',
    country_code: 'RO',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1SBasFR92RVmOBy1hmW7pW/106af54bed6bb835a5c9f4d2ef288d5f/romania-sim-card-hero.png',
  },
  {
    slug: 'russia',
    name: 'Russia',
    country_code: 'RU',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1xjO1GYMMz5q23tW27pmJa/916900841eab4a9acc476a7134efdf40/russia-sim-card-hero.png',
  },
  {
    slug: 'slovenia',
    name: 'Slovenia',
    country_code: 'SI',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5jUyncLCwvVGqFITeqfOXS/dc61d838c14b85149138a7b75f811295/slovenia-sim-card-hero.png',
  },
  {
    slug: 'south-africa',
    name: 'South Africa',
    country_code: 'ZA',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1pt0QcQbWLmFyD3Z07kAGj/f8571fe555ba98625c571b8a8665c9c9/south-africa-sim-card-hero.png',
  },
  {
    slug: 'south-korea',
    name: 'South Korea',
    country_code: 'KR',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5kUHiQO4l13MA8o44nqUqz/9e183348beb20c16086864f2ee495464/south-korea-sim-card-hero.png',
  },
  {
    slug: 'spain',
    name: 'Spain',
    country_code: 'SP',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/7HvK6sFIBA1AdQpECRbcYB/c9926a26f1efec20452ce46a49d91282/spain-sim-card-hero.png',
  },
  {
    slug: 'sudan',
    name: 'Sudan',
    country_code: 'SD',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/50sB3PG54hyFu9I2qWVJNM/7b3a249d77294d0213998a1d0191ab53/sudan-sim-card-hero.png',
  },
  {
    slug: 'sweden',
    name: 'Sweden',
    country_code: 'SE',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/7EfxKMOe8LxQY9uBPuZDz9/ec401f5a96c811a362d81a6f3b400092/sweden-sim-card-hero.png',
  },
  {
    slug: 'switzerland',
    name: 'Switzerland',
    country_code: 'CH',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1nNPdFNoOADqFXuY220ore/ea783c62fd8dfd7c3ea73a3abf2b26f1/switzerland-sim-card-hero.png',
  },
  {
    slug: 'taiwan',
    name: 'Taiwan',
    country_code: 'TW',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5KzmnMiA7EuARFZEDqeNu3/853d8b9ca2ebfa43fd9f3d85fcda8e52/taiwan-sim-card-hero.png',
  },
  {
    slug: 'thailand',
    name: 'Thailand',
    country_code: 'TH',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/28yKV09ivwA4t5AqUvZFs7/a410415b104572e1bf3934c32f00862f/thailand-sim-card-hero.png',
  },
  {
    slug: 'turkey',
    name: 'Turkey',
    country_code: 'TR',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/26qpdTDIqHgVSDJeaUq1zq/5baa487d1f75090863e2d78f28adbe1c/turkey-sim-card-hero.png',
  },
  {
    slug: 'uganda',
    name: 'Uganda',
    country_code: 'UG',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/OODDxT8Rbj20qikZMAVwM/562e35af2f4f76c4ed943288072f73c8/uganda-sim-card-hero.png',
  },
  {
    slug: 'united-kingdom',
    name: 'the United Kingdom',
    country_code: 'GB',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4Kdi0dvqt2RpTOVKPvtrVs/da8f542a4d517b2bf4fc3dfadf63408e/united-kindgdom-sim-card-hero.png',
  },
  {
    slug: 'united-states',
    name: 'the United States',
    country_code: 'US',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1K5d1HqR8Ci8tXqwNR9sFJ/689e88c59f7b7baab5b1f3f13a80e278/united-states-sim-card-hero.png',
  },
  {
    slug: 'canada',
    name: 'Canada',
    country_code: 'CA',
    zone: '1',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/Em5rdnCquJZFEVy8eQWEz/2fce14e8a5a8692a9473ca8a5246e523/canada-sim-card-hero.png',
  },
  {
    slug: 'china',
    name: 'China',
    country_code: 'CN',
    zone: '2',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5jAKcC59ysoKqT6XeiVtUi/7bd3ce2dd80af435b3b49e00e247e2f5/china-sim-card-hero.png',
  },
  {
    slug: 'colombia',
    name: 'Colombia',
    country_code: 'CO',
    zone: '3',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/7F14rT05zhxuGaoaMbQvnK/13be1eef2a61502b602d8a744cc2724e/colombia-sim-card-hero.png',
  },
];

export default simCardCountryData;
