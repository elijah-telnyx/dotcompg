/**
 * @link https://docs.google.com/spreadsheets/d/18v1osneqUAnnTub9SpUhyKwOwURgKVEp/edit#gid=1643174791
 **/
export const APAC_extensions = [
  60, 61, 62, 63, 64, 65, 66, 81, 82, 84, 86, 91, 93, 94, 95, 98, 374, 670, 672, 673, 674, 675, 676, 677, 678, 679, 680,
  681, 682, 683, 685, 686, 687, 688, 689, 690, 691, 692, 850, 852, 855, 856, 880, 886, 960, 963, 968, 970, 975, 976,
  977, 992, 993, 994, 996, 998, 1670, 1671, 1684,
];

// add aus and nz to EMEA -> DOTCOM-3314
const excludeList = [61, 64];
export const APAC_ext_with_overrides = APAC_extensions.filter((i) => !excludeList.includes(i));
