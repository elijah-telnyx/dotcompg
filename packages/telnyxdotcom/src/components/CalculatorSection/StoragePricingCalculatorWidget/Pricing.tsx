import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import * as css from './Pricing.styled';
import rates, { ToGiB } from './utils';

export interface PricingProps {
  ctas?: CTAButtonProps[];
  storage: number;
  egress: number;
}

const Pricing = ({ storage, egress, ctas }: PricingProps) => {
  const storageInGiB = ToGiB(storage);
  const egressInGiB = ToGiB(egress);
  const data = rates.map((rate) => {
    return {
      id: rate.id,
      name: rate.name,
      price: rate.calc({ storage: storageInGiB, egress: egressInGiB }),
    };
  });

  // find max value and pad 5% so bar isn't completely filled
  const maxPrice = Math.max(...data.map(({ price }) => price * 1.05));

  return (
    <css.Root>
      <css.CompareProgressWrapper>
        {data.map(({ id, name, price }) => {
          const formattedPrice = price.toFixed(2);
          return (
            <css.CompareProgressRow
              fullWidth
              key={id}
              color={id === 'telnyx' ? '$green' : '$blue'}
              label={name}
              max={maxPrice}
              value={formattedPrice as unknown as number}
              valuePrefix='$'
            />
          );
        })}
      </css.CompareProgressWrapper>
      {ctas && (
        <css.ButtonRow>
          {ctas.map((cta) => (
            <CtaButton {...cta} key={cta.href} />
          ))}
        </css.ButtonRow>
      )}
    </css.Root>
  );
};

export default Pricing;
