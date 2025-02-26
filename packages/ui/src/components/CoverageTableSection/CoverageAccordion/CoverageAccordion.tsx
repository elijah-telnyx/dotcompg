import { scrollIntoView } from '../../../utils/scrollIntoView';
import Paragraph from '../../Typography/Paragraph';
import { filterHeight, tabsHeight } from '../CoverageTableSection.styled';
import {
  NotFoundMessage,
  useCoverageData,
  type BodyData,
  type CoverageData,
} from '../useCoverageData';
import * as css from './CoverageAccordion.styled';

type Types = BodyData['types'];

export interface CoverageAccordionProps {
  excludedKeys?: string[];
  renderTypeHeading?: (type: string) => string;
  renderCountryDescription?: (bodyData: BodyData) => React.ReactNode;
}

const CoverageAccordion = () => {
  const { data, header, accordionProps, isServices } = useCoverageData();

  if (data.length === 0) {
    return <NotFoundMessage />;
  }

  return (
    <div>
      <css.Accordion
        id='accordion'
        type='single'
        defaultValue={data[0].country.alpha2}
        collapsible
        onValueChange={(value) => {
          if (!value) return;
          const element = document.querySelector(`[data-scroll-to=${value}]`);
          // wait for another accordion item to close
          setTimeout(() => {
            scrollIntoView(element, {
              offset: filterHeight.xs + tabsHeight.xs,
            });
          }, 400);
        }}
      >
        {data.map((it) => {
          const { country, ...body } = it;
          const value = `country-alpha2-${country.alpha2}`;

          return (
            <css.AccordionItem key={value} value={value}>
              {it.url && (
                <css.HiddenLink aria-hidden='true' href={it.url}>
                  {country.name}
                </css.HiddenLink>
              )}
              <css.AccordionTrigger data-scroll-to={value}>
                {country.name} <css.PlusIcon />
              </css.AccordionTrigger>
              <css.AccordionContent>
                {accordionProps?.renderCountryDescription?.(it)}
                {isServices ? (
                  <Services {...body} accordionProps={accordionProps} />
                ) : (
                  <NumberTypes {...body} header={header} />
                )}
              </css.AccordionContent>
            </css.AccordionItem>
          );
        })}
      </css.Accordion>
    </div>
  );
};

interface NumberTypesProps {
  types: Types;
  header: CoverageData['header'];
}

export const NumberTypes = ({ types, header }: NumberTypesProps) => {
  const availableTypes = Object.keys(types);

  return (
    <css.ServiceItem as='div'>
      <css.ServicesList>
        {header.map((type) => {
          const heading = type;

          return (
            <css.CoverageListItem key={type}>
              {availableTypes.includes(type) ? (
                <css.CheckMarkIcon />
              ) : (
                <css.CrossIcon />
              )}
              <Paragraph>{heading}</Paragraph>
            </css.CoverageListItem>
          );
        })}
      </css.ServicesList>
    </css.ServiceItem>
  );
};

interface ServicesProps {
  types: Types;
  accordionProps?: CoverageAccordionProps;
}

export const Services = ({ types, accordionProps = {} }: ServicesProps) => {
  const availableTypes = Object.keys(types);
  const {
    /*
     * Hardcoded defaults to avoid having
     * to refactor the Global Coverage table
     */
    renderTypeHeading = (type: string) => `Services for ${type} Number:`,
    excludedKeys = [],
  } = accordionProps;

  return (
    <css.ServicesList>
      {availableTypes.map((type) => {
        const heading = renderTypeHeading(type);
        const typeData = types[type];

        const hasNoAvailableService = Object.entries(typeData).every(
          ([, service]) => {
            return typeof service === 'boolean' && service === false;
          }
        );

        if (hasNoAvailableService) {
          return (
            <css.ServiceItem key={type}>
              <css.ServiceHeading>{heading}</css.ServiceHeading>

              <css.CoverageListItem hasCover={false}>
                <css.CrossIcon />
                <Paragraph>No services available</Paragraph>
              </css.CoverageListItem>
            </css.ServiceItem>
          );
        }

        return (
          <css.ServiceItem key={type}>
            <css.ServiceHeading>{heading}</css.ServiceHeading>
            <css.CoverageList>
              {Object.entries(typeData).map(([key, value]) => {
                const hasCover = typeof value === 'boolean' && value === true;
                const comingSoon = typeof value === 'string';

                if (excludedKeys.includes(key)) {
                  return null;
                }

                return (
                  <css.CoverageListItem key={key + value} hasCover={hasCover}>
                    {hasCover ? <css.CheckMarkIcon /> : <css.CrossIcon />}
                    <Paragraph>
                      {key}{' '}
                      <css.ComingSoonText>
                        {comingSoon ? '- Coming Soon' : ''}
                      </css.ComingSoonText>
                    </Paragraph>
                  </css.CoverageListItem>
                );
              })}
            </css.CoverageList>
          </css.ServiceItem>
        );
      })}
    </css.ServicesList>
  );
};

export default CoverageAccordion;
