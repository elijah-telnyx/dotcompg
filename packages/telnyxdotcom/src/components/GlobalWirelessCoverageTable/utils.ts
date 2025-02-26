import type { BodyData } from 'ui/components/CoverageTableSection/useCoverageData';

export interface Filter {
  country: string[];
  filterBy: string[];
}

export const filterByOptions = [
  {
    name: 'Zone',
    value: 'zone',
    items: new Array(9).fill(0).map((_, index) => ({
      name: `Zone ${index + 1}`,
      value: `zone__${index + 1}`,
    })),
  },
  {
    name: 'Technology',
    value: 'technology',
    // @TODO: get these from constants in lib/pricing
    items: ['5G', '4G (LTE)', '3G', 'LTE-M', 'NB-IoT'].map((technology) => ({
      name: technology,
      value: `technology__${technology}`,
    })),
  },
];

function getItemZone(item: BodyData) {
  return Object.values(item.types)[0]['Pricing Zone'] as string;
}

export function createBodyFilter({ country, filterBy }: Filter) {
  const { zone = [], technology = [] } = filterBy.reduce((acc, it) => {
    const [type, value] = it.split('__');
    return { ...acc, [type]: [...(acc[type] || []), value] };
  }, {} as Record<string, string[]>);

  return (body: BodyData[]) => {
    return body
      .filter((it) => {
        const validCountry = !country.length || country.includes(it.country.name);

        if (!validCountry) {
          return false;
        }

        const validZone = !zone.length || zone.includes(getItemZone(it));

        if (!validZone) {
          return false;
        }

        const validTech =
          !technology.length || Object.values(it.types).some((type) => technology.some((tech) => type[tech]));

        if (!validTech) {
          return false;
        }

        return true;
      })
      .map((data) => {
        if (!technology.length) return data;

        const types = Object.values(data.types);
        const index = types.findIndex((type) => {
          // find the technology that we have support for that country
          return technology.findIndex((tech) => type[tech]) !== -1;
        });

        // has found a value
        if (index !== -1) {
          return { ...data, selectedTypeIndex: index };
        }
        return data;
      });
  };
}
