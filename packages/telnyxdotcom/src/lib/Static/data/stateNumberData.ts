export interface state {
  readonly slug: string;
  readonly name: string;
  readonly alpha2: string;
  readonly areaCodes: string[];
  readonly demonym: string;
  readonly topCities: string[];
  readonly available: string;
  readonly imgUrl: string;
  readonly metro?: { localCode: number; region: string; count: string; countDisplay?: string | undefined }[];
}

const stateNumberData: state[] = [
  {
    slug: 'alabama',
    name: 'Alabama',
    alpha2: 'AL',
    areaCodes: ['205', '251', '256', '334', '659', '938'],
    demonym: 'Alabaman',
    topCities: ['Birmingham', 'Montgomery', 'Mobile'],
    available: '42259',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3QuBAi7dIAeaP9Je5gEge7/364b27153a0f4bc05a9c9b60158a960a/alabama-phone-numbers.svg',
    metro: [
      {
        localCode: 334,
        region: 'OAKLAND',
        count: '1,503',
      },
      {
        localCode: 205,
        region: 'CARBON HILL',
        count: '1,256',
      },
      {
        localCode: 205,
        region: 'BIRMINGHAM',
        count: '1,232',
      },
      {
        localCode: 205,
        region: 'REFORM',
        count: '1,183',
      },
      {
        localCode: 334,
        region: 'MAPLESVILLE',
        count: '1,089',
      },
    ],
  },
  {
    slug: 'alaska',
    name: 'Alaska',
    alpha2: 'AK',
    areaCodes: ['907'],
    demonym: 'Alaskan',
    topCities: ['Anchorage', 'Fairbanks', 'Juneau'],
    available: '0',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1ItvzNBF11AU8SidvNamqG/20a577923e21b9d4d1c8dd82507a3621/alaska-phone-numbers.svg',
    metro: [
      {
        localCode: 907,
        region: 'ANCHORAGE',
        count: '3,760',
      },
    ],
  },
  {
    slug: 'arizona',
    name: 'Arizona',
    alpha2: 'AZ',
    areaCodes: ['480', '520', '602', '623', '928'],
    demonym: 'Arizonan',
    topCities: ['Phoenix', 'Tucson', 'Mesa'],
    available: '33490',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/7rA3Lq24VFLiEGtzCFx7rD/855e093efe305e9930cebda74d7fb2a5/arizona-phone-numbers.svg',
    metro: [
      {
        localCode: 520,
        region: 'NOGALES',
        count: '1,831',
      },
      {
        localCode: 520,
        region: 'TUCSON',
        count: '2,066',
      },
      {
        localCode: 480,
        region: 'PHOENIX',
        count: '4,844',
      },
      {
        localCode: 623,
        region: 'PHOENIX',
        count: '5,535',
      },
      {
        localCode: 602,
        region: 'PHOENIX',
        count: '6,903',
      },
    ],
  },
  {
    slug: 'arkansas',
    name: 'Arkansas',
    alpha2: 'AR',
    areaCodes: ['479', '501', '870'],
    demonym: 'Arkansan',
    topCities: ['Little Rock', 'Fort Smith', 'Fayetteville'],
    available: '20673',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/45zZI7WjloN2n6CLhIBIcc/04a1e57134f228309644ec7968a89c88/arkansas-phone-numbers.svg',
    metro: [
      {
        localCode: 479,
        region: 'MENA',
        count: '2,774',
      },
      {
        localCode: 870,
        region: 'PARAGOULD',
        count: '1,201',
      },
      {
        localCode: 479,
        region: 'ROGERS',
        count: '1,127',
      },
      {
        localCode: 870,
        region: 'HELENA',
        count: '833',
      },
      {
        localCode: 870,
        region: 'GRUBBS',
        count: '809',
      },
    ],
  },
  {
    slug: 'california',
    name: 'California',
    alpha2: 'CA',
    areaCodes: [
      '209',
      '213',
      '279',
      '310',
      '323',
      '341',
      '350',
      '408',
      '415',
      '424',
      '442',
      '510',
      '530',
      '559',
      '562',
      '619',
      '626',
      '628',
      '650',
      '657',
      '661',
      '669',
      '707',
      '714',
      '747',
      '760',
      '805',
      '818',
      '820',
      '831',
      '840',
      '858',
      '909',
      '916',
      '925',
      '949',
      '951',
    ],
    demonym: 'Californian',
    topCities: ['Los Angeles', 'San Diego', 'San Jose'],
    available: '180571',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/7uFeLFM63IbGQcsTJ8wxHl/b0ea31f680a486a7dc29efd249ba644a/california-phone-numbers.png',
    metro: [
      {
        localCode: 213,
        region: 'LOS ANGELES',
        count: '4,260',
      },
      {
        localCode: 510,
        region: 'OAKLAND',
        count: '4,023',
      },
      {
        localCode: 951,
        region: 'RIVERSIDE',
        count: '3,176',
      },
      {
        localCode: 341,
        region: 'FREMONT',
        count: '2,182',
      },
      {
        localCode: 925,
        region: 'PITTSBURG WEST',
        count: '2,155',
      },
    ],
  },
  {
    slug: 'colorado',
    name: 'Colorado',
    alpha2: 'CO',
    areaCodes: ['303', '719', '720', '970', '983'],
    demonym: 'Coloradan',
    topCities: ['Denver', 'Colorado Springs', 'Aurora'],
    available: '20740',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3uSYWmlJQf2OrW9Vehvlz6/7f7c52cd39c5e4c33f3a31d5dccaea1e/colorado-phone-numbers.svg',
    metro: [
      {
        localCode: 720,
        region: 'DENVER',
        count: '2,114',
      },
      {
        localCode: 719,
        region: 'COLORADO SPRINGS',
        count: '1,966',
      },
      {
        localCode: 303,
        region: 'DENVER',
        count: '1,916',
      },
      {
        localCode: 720,
        region: 'ALLENSPARK-LYONS',
        count: '1,639',
      },
      {
        localCode: 720,
        region: 'LONGMONT',
        count: '1,621',
      },
    ],
  },
  {
    slug: 'connecticut',
    name: 'Connecticut',
    alpha2: 'CT',
    areaCodes: ['203', '475', '860', '959'],
    demonym: 'Connecticuter',
    topCities: ['Bridgeport', 'New Haven', 'Stamford'],
    available: '24360',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4SHmTb8LUB8b9m5c9cEfFo/14c06136e9bfc6a9984f2aba19bf07c1/connecticut-phone-numbers.svg',
    metro: [
      {
        localCode: 860,
        region: 'MOODUS',
        count: '720',
      },
      {
        localCode: 475,
        region: 'RIDGEFIELD',
        count: '890',
      },
      {
        localCode: 860,
        region: 'CANAAN',
        count: '828',
      },
      {
        localCode: 959,
        region: 'NEW BRITAIN',
        count: '1,011',
      },
      {
        localCode: 475,
        region: 'WOODBURY',
        count: '942',
      },
    ],
  },
  {
    slug: 'delaware',
    name: 'Delaware',
    alpha2: 'DE',
    areaCodes: ['302'],
    demonym: 'Delawarean',
    topCities: ['Wilmington', 'Dover', 'Newark'],
    available: '7141',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3vgg65vNN5bpXJdY73plhO/f2ca3dca5f0f80eff0fed9e97e4e7345/delaware-phone-numbers.svg',
    metro: [
      {
        localCode: 302,
        region: 'HARRINGTON',
        count: '942',
      },
      {
        localCode: 302,
        region: 'LEWES',
        count: '2,794',
      },
      {
        localCode: 302,
        region: 'NEW CASTLE',
        count: '1,505',
      },
      {
        localCode: 302,
        region: 'WILMINGTON',
        count: '1,177',
      },
      {
        localCode: 302,
        region: 'HOLLY OAK',
        count: '1,077',
      },
    ],
  },
  {
    slug: 'florida',
    name: 'Florida',
    alpha2: 'FL',
    areaCodes: [
      '239',
      '305',
      '321',
      '352',
      '386',
      '407',
      '448',
      '561',
      '656',
      '689',
      '727',
      '754',
      '772',
      '786',
      '813',
      '850',
      '863',
      '904',
      '941',
      '954',
    ],
    demonym: 'Floridian',
    topCities: ['Jacksonville', 'Miami', 'Tampa'],
    available: '62421',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4OX7IDrxEzX8OREBxE73Du/e6c73ffad9435de13afaea6cac3c2935/florida-phone-numbers.png',
    metro: [
      {
        localCode: 813,
        region: 'TAMPA',
        count: '3,101',
      },
      {
        localCode: 656,
        region: 'TAMPA',
        count: '2,058',
      },
      {
        localCode: 904,
        region: 'JACKSONVILLE BEACH',
        count: '2,032',
      },
      {
        localCode: 754,
        region: 'HOLLYWOOD',
        count: '1,942',
      },
      {
        localCode: 689,
        region: 'ORLANDO',
        count: '1,698',
      },
    ],
  },
  {
    slug: 'georgia',
    name: 'Georgia',
    alpha2: 'GA',
    areaCodes: ['229', '404', '470', '478', '678', '706', '762', '770', '912', '943'],
    demonym: 'Georgian',
    topCities: ['Atlanta', 'Augusta', 'Columbus'],
    available: '89661',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2DfalOOwBgqtU4CyX4KbcJ/5531050746902cc4f10e692fc51362f3/georgia-phone-numbers.png',
    metro: [
      {
        localCode: 470,
        region: 'BOWDON',
        count: '2,058',
      },
      {
        localCode: 470,
        region: 'CARTERSVILLE',
        count: '1,602',
      },
      {
        localCode: 470,
        region: 'GRIFFIN',
        count: '1,647',
      },
      {
        localCode: 470,
        region: 'ATLANTA',
        count: '2,085',
      },
      {
        localCode: 912,
        region: 'SAVANNAH',
        count: '1,900',
      },
    ],
  },
  {
    slug: 'hawaii',
    name: 'Hawaii',
    alpha2: 'HI',
    areaCodes: ['808'],
    demonym: 'Hawaiian',
    topCities: ['Honolulu', 'Pearl City', 'Hilo'],
    available: '1642',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6wB9ldTr7xVVfonrESmfnm/f463d2db27e804a54e1e1d2b33405069/hawaii-phone-numbers.svg',
    metro: [
      {
        localCode: 808,
        region: 'HONOLULU',
        count: '599',
      },
      {
        localCode: 808,
        region: 'HILO',
        count: '425',
      },
      {
        localCode: 808,
        region: 'WAILUKU',
        count: '229',
      },
      {
        localCode: 808,
        region: 'LIHUE',
        count: '213',
      },
      {
        localCode: 808,
        region: 'LANAI CITY',
        count: '175',
      },
    ],
  },
  {
    slug: 'idaho',
    name: 'Idaho',
    alpha2: 'ID',
    areaCodes: ['208', '986'],
    demonym: 'Idahoan',
    topCities: ['Boise', 'Meridian', 'Nampa'],
    available: '22794',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6uBRQzAsaAg6RZXsSRphVT/c5cff25b1a32e14eb982619bcfcba244/idaho-phone-numbers.svg',
    metro: [
      {
        localCode: 208,
        region: 'BRUNEAU',
        count: '1,054',
      },
      {
        localCode: 208,
        region: 'ALBENI',
        count: '1,108',
      },
      {
        localCode: 986,
        region: 'BOISE',
        count: '1,006',
      },
      {
        localCode: 208,
        region: "COEUR D'ALENE",
        count: '2,411',
      },
      {
        localCode: 208,
        region: 'BOISE',
        count: '1,929',
      },
    ],
  },
  {
    slug: 'illinois',
    name: 'Illinois',
    alpha2: 'IL',
    areaCodes: [
      '217',
      '224',
      '309',
      '312',
      '331',
      '447',
      '464',
      '618',
      '630',
      '708',
      '773',
      '779',
      '815',
      '847',
      '872',
    ],
    demonym: 'Illinoisan',
    topCities: ['Chicago', 'Aurora', 'Naperville'],
    available: '130624',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/3yXrTeqIARFmcdxA2CeTzL/250e71d87b3f6ec130a520de42a36138/illinois-phone-numbers.svg',
    metro: [
      {
        localCode: 872,
        region: 'CHICAGO',
        count: '11,843',
      },
      {
        localCode: 618,
        region: 'WOOD RIVER',
        count: '1,591',
      },
      {
        localCode: 708,
        region: 'CHICAGO',
        count: '1,573',
      },
      {
        localCode: 217,
        region: 'ROBERTS',
        count: '1,478',
      },
      {
        localCode: 708,
        region: 'RIVERSIDE',
        count: '1,427',
      },
    ],
  },
  {
    slug: 'indiana',
    name: 'Indiana',
    alpha2: 'IN',
    areaCodes: ['219', '260', '317', '463', '574', '765', '812', '930'],
    demonym: 'Hoosier',
    topCities: ['Indianapolis', 'Fort Wayne', 'Evansville'],
    available: '73631',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4Svz74cdx9o3NcexyKpQE3/6bb404d331e0a4fa435520b7786231ef/indiana-phone-numbers.svg',
    metro: [
      {
        localCode: 317,
        region: 'INDIANAPOLIS',
        count: '2,081',
      },
      {
        localCode: 219,
        region: 'CEDAR LAKE',
        count: '1,933',
      },
      {
        localCode: 219,
        region: 'HAMMOND',
        count: '1,651',
      },
      {
        localCode: 463,
        region: 'INDIANAPOLIS',
        count: '1,553',
      },
      {
        localCode: 765,
        region: 'YORKTOWN',
        count: '1,207',
      },
    ],
  },
  {
    slug: 'iowa',
    name: 'Iowa',
    alpha2: 'IA',
    areaCodes: ['319', '515', '563', '641', '712'],
    demonym: 'Iowan',
    topCities: ['Des Moines', 'Cedar Rapids', 'Davenport'],
    available: '27149',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6fY6Ey1NGfXVzeqaryUSa6/0cf1d1af5271ec97e9de8445e8b64628/iowa-phone-numbers.svg',
    metro: [
      {
        localCode: 563,
        region: 'DUBUQUE',
        count: '1,594',
      },
      {
        localCode: 712,
        region: 'COUNCIL BLUFFS',
        count: '1,794',
      },
      {
        localCode: 319,
        region: 'BURLINGTON',
        count: '1,653',
      },
      {
        localCode: 515,
        region: 'DES MOINES',
        count: '1,610',
      },
      {
        localCode: 319,
        region: 'CEDAR RAPIDS',
        count: '1,492',
      },
    ],
  },
  {
    slug: 'kansas',
    name: 'Kansas',
    alpha2: 'KS',
    areaCodes: ['316', '620', '785', '913'],
    demonym: 'Kansan',
    topCities: ['Wichita', 'Overland Park', 'Kansas City'],
    available: '41635',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5NuOBGfHPkv78wW1dSrjQv/c36a95c5bffff86e090e940279f88770/kansas-phone-numbers.svg',
    metro: [
      {
        localCode: 620,
        region: 'INDEPENDENCE',
        count: '1,308',
      },
      {
        localCode: 620,
        region: 'CEDAR VALE',
        count: '1,389',
      },
      {
        localCode: 316,
        region: 'TOWANDA',
        count: '1,826',
      },
      {
        localCode: 316,
        region: 'WICHITA',
        count: '2,289',
      },
      {
        localCode: 913,
        region: 'PAOLA',
        count: '2,326',
      },
    ],
  },
  {
    slug: 'kentucky',
    name: 'Kentucky',
    alpha2: 'KY',
    areaCodes: ['270', '364', '502', '606', '859'],
    demonym: 'Kentuckian',
    topCities: ['Louisville', 'Lexington', 'Bowling Green'],
    available: '74353',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5502E5Icqi0D4FvVko1cIn/92b71c0e0e8ff100797f0e13acf9a8da/kentucky-phone-numbers.svg',
    metro: [
      {
        localCode: 270,
        region: 'UNIONTOWN',
        count: '2,716',
      },
      {
        localCode: 364,
        region: 'MAYFIELD',
        count: '2,520',
      },
      {
        localCode: 606,
        region: 'WHITESBURG',
        count: '2,138',
      },
      {
        localCode: 502,
        region: 'GHENT',
        count: '1,903',
      },
      {
        localCode: 364,
        region: 'BEE SPRING',
        count: '1,459',
      },
    ],
  },
  {
    slug: 'louisiana',
    name: 'Louisiana',
    alpha2: 'LA',
    areaCodes: ['225', '318', '337', '504', '985'],
    demonym: 'Louisianian',
    topCities: ['New Orleans', 'Baton Rouge', 'Shreveport'],
    available: '6079',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/7rZVFtJnHse01Wp74tPCxz/0e95a0fbb459f4f99a52159c4fcf4828/louisiana-phone-numbers.png',
    metro: [
      {
        localCode: 337,
        region: 'LAFAYETTE',
        count: '2,465',
      },
      {
        localCode: 318,
        region: 'SHREVEPORT',
        count: '2,347',
      },
      {
        localCode: 318,
        region: 'MONROE',
        count: '2,312',
      },
      {
        localCode: 225,
        region: 'DENHAM SPRINGS',
        count: '2,292',
      },
      {
        localCode: 985,
        region: 'HOUMA',
        count: '1,464',
      },
    ],
  },
  {
    slug: 'maine',
    name: 'Maine',
    alpha2: 'ME',
    areaCodes: ['207'],
    demonym: 'Mainer',
    topCities: ['Portland', 'Lewiston', 'Bangor'],
    available: '575',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5wC3GNitWeh7foh3oofTkg/ec2d8f25ec0e869a4b9e8cadf422d40f/maine-phone-numbers.png',
    metro: [
      {
        localCode: 207,
        region: 'PORTLAND',
        count: '307',
      },
      {
        localCode: 207,
        region: 'BRUNSWICK',
        count: '195',
      },
      {
        localCode: 207,
        region: 'LEWISTON',
        count: '14',
      },
      {
        localCode: 207,
        region: 'KITTERY',
        count: '8',
      },
      {
        localCode: 207,
        region: 'AUGUSTA',
        count: '1',
      },
    ],
  },
  {
    slug: 'maryland',
    name: 'Maryland',
    alpha2: 'MD',
    areaCodes: ['240', '301', '410', '443', '667'],
    demonym: 'Marylander',
    topCities: ['Baltimore', 'Frederick', 'Rockville'],
    available: '44575',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4sVRKjnNkwbAn6JMIWuHwZ/3367d8986825c8ea055b8236ded9f7aa/maryland-phone-numbers.svg',
    metro: [
      {
        localCode: 240,
        region: 'RIDGE (LIVINGSTON)',
        count: '1,834',
      },
      {
        localCode: 443,
        region: 'EASTON',
        count: '1,126',
      },
      {
        localCode: 410,
        region: 'OXFORD',
        count: '1,055',
      },
      {
        localCode: 301,
        region: 'WASHINGTON ZONE 10',
        count: '906',
      },
      {
        localCode: 667,
        region: 'BALTIMORE',
        count: '831',
      },
    ],
  },
  {
    slug: 'massachusetts',
    name: 'Massachusetts',
    alpha2: 'MA',
    areaCodes: ['339', '351', '413', '508', '617', '774', '781', '857', '978'],
    demonym: 'Massachusettsan',
    topCities: ['Boston', 'Worcester', 'Springfield'],
    available: '66555',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/63XoZoAputeb0UUsR8PRPQ/f89ad78ff7fd4e368c3648fb116437da/massachsetts-phone-numbers.svg',
    metro: [
      {
        localCode: 617,
        region: 'CAMBRIDGE',
        count: '1,079',
      },
      {
        localCode: 339,
        region: 'SAUGUS',
        count: '1,091',
      },
      {
        localCode: 857,
        region: 'WINTHROP',
        count: '1,059',
      },
      {
        localCode: 351,
        region: 'ASHBY',
        count: '1,261',
      },
      {
        localCode: 351,
        region: 'HARVARD',
        count: '1,102',
      },
    ],
  },
  {
    slug: 'michigan',
    name: 'Michigan',
    alpha2: 'MI',
    areaCodes: ['231', '248', '269', '313', '517', '586', '616', '734', '810', '906', '947', '989'],
    demonym: 'Michiganian',
    topCities: ['Detroit', 'Grand Rapids', 'Warren'],
    available: '0',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5iKsxnh8idsB1eJqTdTIgt/fe8d1fe6a3c2b72b5006c9ade1c092fb/michigan-phone-numbers.svg',
    metro: [
      {
        localCode: 517,
        region: 'LANSING',
        count: '1,130',
      },
      {
        localCode: 313,
        region: 'DETROIT',
        count: '1,254',
      },
      {
        localCode: 947,
        region: 'ROYAL OAK',
        count: '1,102',
      },
      {
        localCode: 810,
        region: 'FLINT',
        count: '3,299',
      },
      {
        localCode: 616,
        region: 'GRAND RAPIDS',
        count: '2,357',
      },
    ],
  },
  {
    slug: 'minnesota',
    name: 'Minnesota',
    alpha2: 'MN',
    areaCodes: ['218', '320', '507', '612', '651', '763', '952'],
    demonym: 'Minnesotan',
    topCities: ['Minneapolis', 'Saint Paul', 'Rochester'],
    available: '105294',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6YfX3nkkLzC1LndD13JNYH/7e9b858a830c4d6f7bb4ee4f4ce29edf/minnesota-phone-numbers.svg',
    metro: [
      {
        localCode: 612,
        region: 'MINNEAPOLIS',
        count: '2,961',
      },
      {
        localCode: 651,
        region: 'NORTH BRANCH',
        count: '1,824',
      },
      {
        localCode: 507,
        region: 'BYRON',
        count: '1,782',
      },
      {
        localCode: 507,
        region: 'WASECA',
        count: '1,676',
      },
      {
        localCode: 763,
        region: 'PRINCETON',
        count: '1,591',
      },
    ],
  },
  {
    slug: 'mississippi',
    name: 'Mississippi',
    alpha2: 'MS',
    areaCodes: ['228', '601', '662', '769'],
    demonym: 'Mississippian',
    topCities: ['Jackson', 'Gulfport', 'Southaven'],
    available: '38121',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/402BEWoH8lwFqBqyrty0gS/f4b4c051785de94d424066faa3ad9b67/mississippi-phone-numbers.svg',
    metro: [
      {
        localCode: 228,
        region: 'BAY SAINT LOUIS',
        count: '1,047',
      },
      {
        localCode: 228,
        region: 'GULFPORT',
        count: '1,012',
      },
      {
        localCode: 228,
        region: 'BILOXI',
        count: '991',
      },
      {
        localCode: 662,
        region: 'PONTOTOC',
        count: '989',
      },
      {
        localCode: 769,
        region: 'MORTON',
        count: '934',
      },
    ],
  },
  {
    slug: 'missouri',
    name: 'Missouri',
    alpha2: 'MO',
    areaCodes: ['314', '417', '557', '573', '636', '660', '816'],
    demonym: 'Missourian',
    topCities: ['Kansas City', 'St. Louis', 'Springfield'],
    available: '107040',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/15YD0XABT1joc05ggNEmRi/579c6089a993c661adb091ace940d8e5/missouri-phone-numbers.svg',
    metro: [
      {
        localCode: 816,
        region: 'KANSAS CITY',
        count: '1,532',
      },
      {
        localCode: 573,
        region: 'BEAUFORT',
        count: '1,539',
      },
      {
        localCode: 417,
        region: 'GALENA',
        count: '1,625',
      },
      {
        localCode: 816,
        region: 'LEAVENWORTH LANSING',
        count: '1,878',
      },
      {
        localCode: 573,
        region: 'GREENVILLE',
        count: '1,875',
      },
    ],
  },
  {
    slug: 'montana',
    name: 'Montana',
    alpha2: 'MT',
    areaCodes: ['406'],
    demonym: 'Montanan',
    topCities: ['Billings', 'Missoula', 'Great Falls'],
    available: '13500',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4w16kJwZj46WlHkwhnrIsK/e836b23c9fee58fe3a25eeaf8e01dd40/montana-phone-numbers.svg',
    metro: [
      {
        localCode: 406,
        region: 'BUTTE',
        count: '779',
      },
      {
        localCode: 406,
        region: 'GREAT FALLS',
        count: '980',
      },
      {
        localCode: 406,
        region: 'COLUMBUS',
        count: '1,903',
      },
      {
        localCode: 406,
        region: 'MANHATTAN',
        count: '1,133',
      },
      {
        localCode: 406,
        region: 'WOLF CREEK',
        count: '1,005',
      },
    ],
  },
  {
    slug: 'nebraska',
    name: 'Nebraska',
    alpha2: 'NE',
    areaCodes: ['308', '402', '531'],
    demonym: 'Nebraskan',
    topCities: ['Omaha', 'Lincoln', 'Bellevue'],
    available: '9986',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/sX3USHuBhSvKqkrR51uZ8/70f4f1d671fc59e0cd15566414af5073/nebraska-phone-numbers.svg',
    metro: [
      {
        localCode: 402,
        region: 'TEKAMAH',
        count: '871',
      },
      {
        localCode: 402,
        region: 'NORFOLK',
        count: '919',
      },
      {
        localCode: 308,
        region: 'NORTH JULESBURG',
        count: '2,300',
      },
      {
        localCode: 531,
        region: 'OAKLAND',
        count: '2,152',
      },
      {
        localCode: 308,
        region: 'GRAND ISLAND',
        count: '1,566',
      },
    ],
  },
  {
    slug: 'nevada',
    name: 'Nevada',
    alpha2: 'NV',
    areaCodes: ['702', '725', '775'],
    demonym: 'Nevadan',
    topCities: ['Las Vegas', 'Henderson', 'Reno'],
    available: '7742',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/1lXvgv7UII1cZAYJa9AyXJ/cb676c9d702dd9d528190f93e897b4cc/nevada-phone-numbers.svg',
    metro: [
      {
        localCode: 775,
        region: 'RENO',
        count: '2,700',
      },
      {
        localCode: 725,
        region: 'LAS VEGAS',
        count: '2,531',
      },
      {
        localCode: 775,
        region: 'SILVER SPRINGS',
        count: '1,596',
      },
      {
        localCode: 725,
        region: 'LAUGHLIN',
        count: '1,573',
      },
      {
        localCode: 725,
        region: 'NELSON',
        count: '1,390',
      },
    ],
  },
  {
    slug: 'new-hampshire',
    name: 'New Hampshire',
    alpha2: 'NH',
    areaCodes: ['603'],
    demonym: 'New Hampshirite',
    topCities: ['Manchester', 'Nashua', 'Concord'],
    available: '5648',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5nFJx0is9IrY6PIpoQqkqO/eb2173343975346cdf7d66dc8d4b7014/new-hampshire-phone-numbers.svg',
    metro: [
      {
        localCode: 603,
        region: 'KEENE',
        count: '1,112',
      },
      {
        localCode: 603,
        region: 'NASHUA',
        count: '1,082',
      },
      {
        localCode: 603,
        region: 'LACONIA',
        count: '974',
      },
      {
        localCode: 603,
        region: 'CONCORD',
        count: '941',
      },
      {
        localCode: 603,
        region: 'DOVER',
        count: '903',
      },
    ],
  },
  {
    slug: 'new-jersey',
    name: 'New Jersey',
    alpha2: 'NJ',
    areaCodes: ['201', '551', '609', '640', '732', '848', '856', '862', '908', '973'],
    demonym: 'New Jerseyan',
    topCities: ['Newark', 'Jersey City', 'Paterson'],
    available: '49551',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/61tiBS4G60KLB9wwtXPRwH/86557f8365786486aadc63cda01243c1/new-jersey-phone-numbers.png',
    metro: [
      {
        localCode: 908,
        region: 'STROUDSBURG',
        count: '1,735',
      },
      {
        localCode: 856,
        region: 'BLACKWOOD',
        count: '1,722',
      },
      {
        localCode: 862,
        region: 'NEWARK',
        count: '1,486',
      },
      {
        localCode: 609,
        region: 'TRENTON',
        count: '1,466',
      },
      {
        localCode: 551,
        region: 'JERSEY CITY',
        count: '1,428',
      },
    ],
  },
  {
    slug: 'new-mexico',
    name: 'New Mexico',
    alpha2: 'NM',
    areaCodes: ['505', '575'],
    demonym: 'New Mexican',
    topCities: ['Albuquerque', 'Las Cruces', 'Rio Rancho'],
    available: '12893',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5lQB0rX0c0O8jJs6EtW9Gx/f571c3fce3ffaa9accb3f11798b4ea28/new-mexico-phone-numbers.svg',
    metro: [
      {
        localCode: 505,
        region: 'GALLUP',
        count: '1,141',
      },
      {
        localCode: 575,
        region: 'CHAPARRAL',
        count: '907',
      },
      {
        localCode: 505,
        region: 'ALBUQUERQUE',
        count: '1,179',
      },
      {
        localCode: 505,
        region: 'GRANTS',
        count: '1,505',
      },
      {
        localCode: 505,
        region: 'LAS VEGAS',
        count: '1,389',
      },
    ],
  },
  {
    slug: 'new-york',
    name: 'New York',
    alpha2: 'NY',
    areaCodes: [
      '212',
      '315',
      '332',
      '347',
      '363',
      '516',
      '518',
      '585',
      '607',
      '631',
      '646',
      '680',
      '716',
      '718',
      '838',
      '845',
      '914',
      '917',
      '929',
      '934',
    ],
    demonym: 'New Yorker',
    topCities: ['New York City', 'Buffalo', 'Rochester'],
    available: '171809',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5hv9lEpod4178fncAPO6Kd/f7d67a920c995a18f113bb8a4e82aeae/new-york-phone-numbers.png',
    metro: [
      {
        localCode: 929,
        region: 'NEW YORK CITY',
        count: '13,863',
      },
      {
        localCode: 332,
        region: 'NEW YORK CITY',
        count: '3,610',
      },
      {
        localCode: 845,
        region: 'ELIZAVILLE',
        count: '2,005',
      },
      {
        localCode: 680,
        region: 'LAFAYETTE',
        count: '1,975',
      },
      {
        localCode: 838,
        region: 'CLAVERACK',
        count: '1,892',
      },
    ],
  },
  {
    slug: 'north-carolina',
    name: 'North Carolina',
    alpha2: 'NC',
    areaCodes: ['252', '336', '472', '704', '743', '828', '910', '919', '980', '984'],
    demonym: 'North Carolinian',
    topCities: ['Charlotte', 'Raleigh', 'Greensboro'],
    available: '119948',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6qmRpIlpYD81ZYE1mFTBg3/0cb07d58890e0bf0a3460aa72f77ea0d/north-carolina-phone-numbers.png',
    metro: [
      {
        localCode: 252,
        region: 'KNOTTS ISLAND',
        count: '2,347',
      },
      {
        localCode: 704,
        region: 'CHARLOTTE',
        count: '2,089',
      },
      {
        localCode: 984,
        region: 'RALEIGH',
        count: '1,636',
      },
      {
        localCode: 980,
        region: 'CHARLOTTE',
        count: '1,622',
      },
      {
        localCode: 984,
        region: 'DURHAM',
        count: '1,443',
      },
    ],
  },
  {
    slug: 'north-dakota',
    name: 'North Dakota',
    alpha2: 'ND',
    areaCodes: ['701'],
    demonym: 'North Dakotan',
    topCities: ['Fargo', 'Bismarck', 'Grand Forks'],
    available: '7471',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/Rsi6xmwL93DCj2SlPWyxh/18626de3cae854f118b9042b22625d77/north-dakota-phone-numbers.svg',
    metro: [
      {
        localCode: 701,
        region: 'BISMARCK',
        count: '1,633',
      },
      {
        localCode: 701,
        region: 'BELFIELD',
        count: '1,134',
      },
      {
        localCode: 701,
        region: 'WASHBURN',
        count: '1,095',
      },
      {
        localCode: 701,
        region: 'DICKINSON',
        count: '1,089',
      },
      {
        localCode: 701,
        region: 'JAMESTOWN',
        count: '1,027',
      },
    ],
  },
  {
    slug: 'ohio',
    name: 'Ohio',
    alpha2: 'OH',
    areaCodes: ['216', '220', '234', '326', '330', '380', '419', '440', '513', '567', '614', '740', '937'],
    demonym: 'Ohioan',
    topCities: ['Columbus', 'Cleveland', 'Cincinnati'],
    available: '126910',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5yBKaS0jv4xJUTuS1w7KAh/2c6f832b72a26f65e3b8c0473a211cd8/ohio-phone-numbers.svg',
    metro: [
      {
        localCode: 216,
        region: 'INDEPENDENCE',
        count: '1,820',
      },
      {
        localCode: 440,
        region: 'KIRTLAND',
        count: '2,016',
      },
      {
        localCode: 216,
        region: 'CLEVELAND',
        count: '2,295',
      },
      {
        localCode: 216,
        region: 'MONTROSE (CUYAHOGA)',
        count: '2,787',
      },
      {
        localCode: 567,
        region: 'TOLEDO',
        count: '2,563',
      },
    ],
  },
  {
    slug: 'oklahoma',
    name: 'Oklahoma',
    alpha2: 'OK',
    areaCodes: ['405', '539', '572', '580', '918'],
    demonym: 'Oklahoman',
    topCities: ['Oklahoma City', 'Tulsa', 'Norman'],
    available: '51057',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/48ciHwwScm84oS1wqBBpch/07d31eb4e33c16d758ab9a95efc827ca/oklahoma-phone-numbers.svg',
    metro: [
      {
        localCode: 539,
        region: 'TULSA',
        count: '1,928',
      },
      {
        localCode: 580,
        region: 'INDIAHOMA',
        count: '1,501',
      },
      {
        localCode: 580,
        region: 'MARIETTA',
        count: '1,384',
      },
      {
        localCode: 539,
        region: 'OWASSO',
        count: '1,308',
      },
      {
        localCode: 580,
        region: 'KREMLIN',
        count: '1,273',
      },
    ],
  },
  {
    slug: 'oregon',
    name: 'Oregon',
    alpha2: 'OR',
    areaCodes: ['458', '503', '541', '971'],
    demonym: 'Oregonian',
    topCities: ['Portland', 'Salem', 'Eugene'],
    available: '30540',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/28RxvSKognhJRvooBmdRa2/6537aa9346bb92ebbd07a49d8b2dcf89/oregon-phone-numbers.svg',
    metro: [
      {
        localCode: 971,
        region: 'DALLAS',
        count: '2,238',
      },
      {
        localCode: 971,
        region: 'PORTLAND',
        count: '1,727',
      },
      {
        localCode: 971,
        region: 'SALEM',
        count: '1,276',
      },
      {
        localCode: 541,
        region: 'LAKEVIEW',
        count: '1,145',
      },
      {
        localCode: 971,
        region: 'CLACKAMAS',
        count: '1,029',
      },
    ],
  },
  {
    slug: 'pennsylvania',
    name: 'Pennsylvania',
    alpha2: 'PA',
    areaCodes: [
      '215',
      '223',
      '267',
      '272',
      '412',
      '445',
      '484',
      '570',
      '582',
      '610',
      '717',
      '724',
      '814',
      '835',
      '878',
    ],
    demonym: 'Pennsylvanian',
    topCities: ['Philadelphia', 'Pittsburgh', 'Allentown'],
    available: '154644',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6PDrrbNg3wRmYrOGNpvC5e/c9902c769b997220980a7376c5e0b3e5/pennsylvania-phone-numbers.svg',
    metro: [
      {
        localCode: 814,
        region: 'TIMBLIN',
        count: '1,189',
      },
      {
        localCode: 267,
        region: 'PLUMSTEADVILLE',
        count: '1,383',
      },
      {
        localCode: 267,
        region: 'LANSDALE',
        count: '1,200',
      },
      {
        localCode: 412,
        region: 'PITTSBURGH',
        count: '5,629',
      },
      {
        localCode: 267,
        region: 'PHILADELPHIA',
        count: '2,141',
      },
    ],
  },
  {
    slug: 'rhode-island',
    name: 'Rhode Island',
    alpha2: 'RI',
    areaCodes: ['401'],
    demonym: 'Rhode Islander',
    topCities: ['Providence', 'Warwick', 'Cranston'],
    available: '7454',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6Kb0bYLDt2tRvvKZBFQ8BE/a3094b4afc97796313e066a0108cacc2/rhode-island-phone-numbers.svg',
    metro: [
      {
        localCode: 401,
        region: 'WARREN',
        count: '1,888',
      },
      {
        localCode: 401,
        region: 'PROVIDENCE',
        count: '1,116',
      },
      {
        localCode: 401,
        region: 'PAWTUCKET',
        count: '1,036',
      },
      {
        localCode: 401,
        region: 'COVENTRY',
        count: '676',
      },
      {
        localCode: 401,
        region: 'WEST WARWICK',
        count: '653',
      },
    ],
  },
  {
    slug: 'south-carolina',
    name: 'South Carolina',
    alpha2: 'SC',
    areaCodes: ['803', '839', '843', '854', '864'],
    demonym: 'South Carolinian',
    topCities: ['Charleston', 'Columbia', 'North Charleston'],
    available: '25553',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2eqqD7INCc5AOb6UVmkmCH/874a5971f601376f735a206876b91654/south-carolina-phone-numbers.svg',
    metro: [
      {
        localCode: 864,
        region: 'GREENVILLE',
        count: '2,605',
      },
      {
        localCode: 854,
        region: 'FLORENCE',
        count: '1,775',
      },
      {
        localCode: 854,
        region: 'SUMMERVILLE',
        count: '1,630',
      },
      {
        localCode: 864,
        region: 'LYMAN',
        count: '1,471',
      },
      {
        localCode: 839,
        region: 'ROCK HILL',
        count: '1,217',
      },
    ],
  },
  {
    slug: 'south-dakota',
    name: 'South Dakota',
    alpha2: 'SD',
    areaCodes: ['605'],
    demonym: 'South Dakotan',
    topCities: ['Sioux Falls', 'Rapid City', 'Aberdeen'],
    available: '7022',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5xwWp0MFTVPOu35lEpxy64/32d9e791ef66964f51e61e42ea9f062e/south-dakota-phone-numbers.svg',
    metro: [
      {
        localCode: 605,
        region: 'PIERRE',
        count: '711',
      },
      {
        localCode: 605,
        region: 'ELK POINT',
        count: '713',
      },
      {
        localCode: 605,
        region: 'NORTH VALENTINE',
        count: '743',
      },
      {
        localCode: 605,
        region: 'MADISON',
        count: '1,212',
      },
      {
        localCode: 605,
        region: 'BELLE FOURCHE',
        count: '832',
      },
    ],
  },
  {
    slug: 'tennessee',
    name: 'Tennessee',
    alpha2: 'TN',
    areaCodes: ['423', '615', '629', '731', '865', '901', '931'],
    demonym: 'Tennessean',
    topCities: ['Nashville', 'Memphis', 'Knoxville'],
    available: '56405',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6S4Sb4EQss9ZXW9tBfW03z/ffe326b3da31f29c4c769df0737635b8/tennessee-phone-numbers.svg',
    metro: [
      {
        localCode: 615,
        region: 'NASHVILLE',
        count: '1,955',
      },
      {
        localCode: 731,
        region: 'BELLS',
        count: '1,732',
      },
      {
        localCode: 901,
        region: 'MEMPHIS',
        count: '1,729',
      },
      {
        localCode: 423,
        region: 'BULLS GAP',
        count: '1,578',
      },
      {
        localCode: 423,
        region: 'CHARLESTON',
        count: '1,494',
      },
    ],
  },
  {
    slug: 'texas',
    name: 'Texas',
    alpha2: 'TX',
    areaCodes: [
      '210',
      '214',
      '254',
      '281',
      '325',
      '346',
      '361',
      '409',
      '430',
      '432',
      '469',
      '512',
      '682',
      '713',
      '726',
      '737',
      '806',
      '817',
      '830',
      '832',
      '903',
      '915',
      '936',
      '940',
      '945',
      '956',
      '972',
      '979',
    ],
    demonym: 'Texan',
    topCities: ['Houston', 'San Antonio', 'Dallas'],
    available: '205027',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/dkJOvjuhMJC9riNgQZ6tg/f8e901566dffb288bc988d35d8ab2b32/texas-phone-numbers.png',
    metro: [
      {
        localCode: 956,
        region: 'LAREDO',
        count: '2,503',
      },
      {
        localCode: 682,
        region: 'ARLINGTON',
        count: '2,294',
      },
      {
        localCode: 726,
        region: 'SAN ANTONIO',
        count: '2,223',
      },
      {
        localCode: 830,
        region: 'PIPE CREEK',
        count: '2,222',
      },
      {
        localCode: 361,
        region: 'CORPUS CHRISTI',
        count: '2,150',
      },
    ],
  },
  {
    slug: 'utah',
    name: 'Utah',
    alpha2: 'UT',
    areaCodes: ['385', '435', '801'],
    demonym: 'Utahn',
    topCities: ['Salt Lake City', 'West Valley City', 'Provo'],
    available: '13116',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/7c5sskrBu9pdiqZsadI8WE/c3175b4ebc9f539a220d335442f013f9/utah-phone-numbers.svg',
    metro: [
      {
        localCode: 435,
        region: 'GLEN CANYON CITY',
        count: '885',
      },
      {
        localCode: 385,
        region: 'MIDVALE',
        count: '1,194',
      },
      {
        localCode: 385,
        region: 'OGDEN',
        count: '917',
      },
      {
        localCode: 435,
        region: 'TOOELE',
        count: '1,786',
      },
      {
        localCode: 435,
        region: 'RICHFIELD',
        count: '1,246',
      },
    ],
  },
  {
    slug: 'vermont',
    name: 'Vermont',
    alpha2: 'VT',
    areaCodes: ['802'],
    demonym: 'Vermonter',
    topCities: ['Burlington', 'South Burlington', 'Rutland'],
    available: '0',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/5fFya6skNnXm46ktheCrcs/45cd2780d34053f244770280921ab4b1/vermont-phone-numbers.svg',
    metro: [
      {
        localCode: 802,
        region: 'CONCORD',
        count: '1,744',
      },
      {
        localCode: 802,
        region: 'WELLS',
        count: '1,715',
      },
      {
        localCode: 802,
        region: 'UNDERHILL',
        count: '1,693',
      },
      {
        localCode: 802,
        region: 'DANVILLE',
        count: '1,542',
      },
      {
        localCode: 802,
        region: 'NEWFANE',
        count: '1,460',
      },
    ],
  },
  {
    slug: 'virginia',
    name: 'Virginia',
    alpha2: 'VA',
    areaCodes: ['276', '434', '540', '571', '703', '757', '804', '826', '948'],
    demonym: 'Virginian',
    topCities: ['Virginia Beach', 'Norfolk', 'Chesapeake'],
    available: '61570',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/kB6qiO678323JsPm1tPtC/6c4ea24432086fcb4db40d6c44f73a41/virginia-phone-numbers.png',
    metro: [
      {
        localCode: 804,
        region: 'DELTAVILLE',
        count: '2,020',
      },
      {
        localCode: 757,
        region: 'NORFOLK',
        count: '1,813',
      },
      {
        localCode: 804,
        region: 'RICHMOND',
        count: '1,728',
      },
      {
        localCode: 571,
        region: 'WASHINGTON ZONE 19',
        count: '1,482',
      },
      {
        localCode: 571,
        region: 'WASHINGTON ZONE 8',
        count: '1,459',
      },
    ],
  },
  {
    slug: 'washington',
    name: 'Washington',
    alpha2: 'WA',
    areaCodes: ['206', '253', '360', '425', '509', '564'],
    demonym: 'Washingtonian',
    topCities: ['Seattle', 'Spokane', 'Tacoma'],
    available: '10600',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/4604rcNtmcCz1GRiwnssR3/79bba41a0a5f02d13abd17b47a9c8721/washington-phone-numbers.png',
    metro: [
      {
        localCode: 253,
        region: 'TACOMA',
        count: '1,572',
      },
      {
        localCode: 509,
        region: 'SPOKANE',
        count: '2,427',
      },
      {
        localCode: 360,
        region: 'WHATCOM CITY',
        count: '2,131',
      },
      {
        localCode: 206,
        region: 'SEATTLE',
        count: '4,024',
      },
      {
        localCode: 253,
        region: 'AUBURN',
        count: '3,717',
      },
    ],
  },
  {
    slug: 'west-virginia',
    name: 'West Virginia',
    alpha2: 'WV',
    areaCodes: ['304', '681'],
    demonym: 'West Virginian',
    topCities: ['Charleston', 'Huntington', 'Morgantown'],
    available: '25778',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6e4PdzcnULDY77ZyPilvpT/bc56569c70fac5997961c466fd0f1f08/west-virginia-phone-numbers.svg',
    metro: [
      {
        localCode: 681,
        region: 'ELKINS',
        count: '1,051',
      },
      {
        localCode: 304,
        region: 'MORGANTOWN',
        count: '1,081',
      },
      {
        localCode: 681,
        region: 'GLENVILLE',
        count: '1,304',
      },
      {
        localCode: 681,
        region: 'MARTINSBURG',
        count: '1,632',
      },
      {
        localCode: 681,
        region: 'SALEM',
        count: '1,269',
      },
    ],
  },
  {
    slug: 'wisconsin',
    name: 'Wisconsin',
    alpha2: 'WI',
    areaCodes: ['262', '414', '534', '608', '715', '920'],
    demonym: 'Wisconsinite',
    topCities: ['Milwaukee', 'Madison', 'Green Bay'],
    available: '16126',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/6oKjnI4qWSlZEXNZTu2Kcf/37f997a3f7c6e472913ef10d2e27c848/wisconsin-phone-numbers.png',
    metro: [
      {
        localCode: 262,
        region: 'RACINE',
        count: '3,130',
      },
      {
        localCode: 414,
        region: 'MILWAUKEE',
        count: '2,366',
      },
      {
        localCode: 262,
        region: 'KENOSHA',
        count: '1,862',
      },
      {
        localCode: 920,
        region: 'GREEN BAY',
        count: '1,558',
      },
      {
        localCode: 262,
        region: 'WAUKESHA',
        count: '950',
      },
    ],
  },
  {
    slug: 'wyoming',
    name: 'Wyoming',
    alpha2: 'WY',
    areaCodes: ['307'],
    demonym: 'Wyomingite',
    topCities: ['Cheyenne', 'Casper', 'Laramie'],
    available: '3572',
    imgUrl:
      'https://images.ctfassets.net/2vm221913gep/2LmvnysdbDZPOklVClmjB0/1ab29a35ff0fa04185c7c75b431ad8bb/wyoming-phone-numbers.svg',
    metro: [
      {
        localCode: 307,
        region: 'LAKE',
        count: '611',
      },
      {
        localCode: 307,
        region: 'POWELL',
        count: '901',
      },
      {
        localCode: 307,
        region: 'LUSK',
        count: '806',
      },
      {
        localCode: 307,
        region: 'ROCK SPRINGS',
        count: '645',
      },
      {
        localCode: 307,
        region: 'LANDER',
        count: '598',
      },
    ],
  },
];

export const BLOGARTICLECONSTANTS = [
  'types-of-phone-numbers',
  'porting-phone-numbers-take-long',
  'iccid-number',
  'voip-number',
  'sms-numbers-traffic-types',
  'what-is-a-toll-free-number',
  'how-to-port-phone-number',
  'number-porting-problems',
  'telnyx-understanding-sms-number-types',
];

export default stateNumberData;
