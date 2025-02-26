import type { SectionProps } from '../Section';
import Grid from '../Grid';
import * as css from './TextCallout.styled';

export interface TextCalloutProps extends SectionProps {
  copy: string;
  animated?: boolean;
}

const TextCallout = ({
  copy,
  backgroundColor,
  animated = true,
  ...props
}: TextCalloutProps) => (
  <css.SectionWrapper {...props}>
    <css.Container>
      <Grid.Item medium={8} small={6} xs={4}>
        <css.CopyContainer
          animated={animated}
          css={{ backgroundColor: `$${backgroundColor}` || 'unset' }}
        >
          <css.Copy level={2} htmlAs='p'>
            {copy}
          </css.Copy>
        </css.CopyContainer>
      </Grid.Item>
    </css.Container>
  </css.SectionWrapper>
);

export default TextCallout;
