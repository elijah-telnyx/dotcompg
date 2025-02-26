import * as AccordionPrimitive from '@radix-ui/react-accordion';
import type { AvailableNumbers } from 'pages/api/available-numbers';
import Button from 'ui/components/Button/Button';
import External from 'ui/components/Icons/External';
import Plus from 'ui/components/Icons/Plus';
import Heading from 'ui/components/Typography/Heading/Heading';
import { keyframes, styled } from 'ui/styles';
import { formatCurrency, formatNumType, getFormattedNumber, getLocationFromRegion } from '../utils';
import AvailableNumbersIcons from './AvailableNumbersIcons';

export default function AvailableNumbersAccordion({ data }: Readonly<AvailableNumbers>) {
  return (
    <Container>
      <Heading level={2} category>
        Phone Number
      </Heading>
      <AccordionWrapper type='multiple' defaultValue={[data[0].phone_number]}>
        {data.map(({ phone_number, region_information, phone_number_type, features, cost_information }) => (
          <AccordionItem value={phone_number} key={phone_number}>
            <AccordionTrigger>
              {getFormattedNumber(phone_number, region_information[0].region_name)} <Plus />
            </AccordionTrigger>
            <AccordionContent>
              <Table>
                <tr>
                  <th>Region</th>
                  <td>{getLocationFromRegion(region_information)}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  <td>{formatNumType(phone_number_type)}</td>
                </tr>
                <tr>
                  <th>Features</th>
                  <td>
                    {features.map((feature) => (
                      <AvailableNumbersIcons key={feature.name} name={feature.name} />
                    ))}
                  </td>
                </tr>
                <th>Upfront Cost</th>
                <td>${formatCurrency(cost_information.upfront_cost)}</td>

                <th>Monthly Cost</th>
                <td>${formatCurrency(cost_information.monthly_cost)}</td>
              </Table>
              <PurchaseButton
                htmlAs='a'
                href='https://portal.telnyx.com/#/numbers/search-numbers'
                rel='nofollow'
                kind='secondary'
                background='dark'
              >
                Purchase <External width={16} height={16} />
              </PurchaseButton>
            </AccordionContent>
          </AccordionItem>
        ))}
      </AccordionWrapper>
    </Container>
  );
}

const Container = styled('div', {
  width: '100%',
  backgroundColor: '$grayEmbed',
  color: '$cream',
  borderRadius: '$medium',
  padding: '$large',
  paddingBottom: '$xs',
});
const AccordionWrapper = styled(AccordionPrimitive.Root, {
  width: '100%',
  marginTop: '$xl',
});

const AccordionItem = styled(AccordionPrimitive.Item, {
  width: '100%',
  borderBlock: '1px solid $grayStroke',
  fontFamily: '$inter',
  fontSize: '$xxs',
  fontWeight: '$regular',
  lineHeight: '$xxxs',
});

const ANIMATION_DURATION = '300ms';
const ANIMATION_TRANSITION = 'ease-in-out';
const ICON_SIZE = 20;

const AccordionTrigger = styled(AccordionPrimitive.Trigger, {
  width: '100%',
  paddingBlock: '$medium',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '$small',
  '& svg': {
    width: ICON_SIZE,
    height: ICON_SIZE,
    transition: `ease-out ${ANIMATION_DURATION} rotate`,
  },
  '&[data-state="open"]': {
    '& svg': {
      rotate: '45deg',
    },
  },
});

const slideDown = keyframes({
  from: { height: 0, opacity: 0 },
  to: { height: 'var(--radix-accordion-content-height)', opacity: 1 },
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0, opacity: 0 },
});

const AccordionContent = styled(AccordionPrimitive.Content, {
  width: '100%',
  paddingTop: '$xs',
  paddingBottom: '$medium',
  '&[data-state="open"]': {
    animation: `${slideDown} ${ANIMATION_DURATION} ${ANIMATION_TRANSITION}`,
  },
  '&[data-state="closed"]': {
    animation: `${slideUp} ${ANIMATION_DURATION} ${ANIMATION_TRANSITION}`,
  },
});

const Table = styled('table', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$xs',
  textAlign: 'left',
  '& tr > *': {
    display: 'block',
  },
  '& tr': {
    gridColumn: '1 / -1',
    display: 'grid',
    gridTemplateColumns: 'subgrid',
  },
  th: {
    fontWeight: 'inherit',
    opacity: 0.5,
  },
  td: {
    textAlign: 'right',
  },
});

const PurchaseButton = styled(Button, {
  display: 'flex',
  alignItems: 'center',
  marginInline: 'auto',
  width: 'fit-content',
  lineHeight: '$xs',
  paddingInline: '$xs',
  marginTop: '$medium',
});
