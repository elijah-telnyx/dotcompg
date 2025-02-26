import { useState } from 'react';
import { isDarkBackgroundColor } from 'ui/styles/constants/backgroundColorOptions';
import Grid from 'ui/components/Grid';
import Tagline from 'ui/components/Tagline';
import * as css from './NumberLookupHero.styled';
import NumberLookupSearch from '../NumberLookupSearch';
import CopyButton from 'ui/components/CopyButton';
import Markdown from 'ui/components/Markdown';

import type { SectionProps } from 'ui/components/Section';
import type { NumberLookup } from 'pages/api/number-lookup';

export interface NumberLookupHeroProps extends SectionProps {
  tagLine?: string;
  heading: string;
  copy?: string;
  ctaCopy?: string;
  boxDefault?: string;
}

const NumberLookupHero = ({
  tagLine,
  heading,
  copy,
  ctaCopy,
  boxDefault,
  children,
  ...props
}: NumberLookupHeroProps) => {
  const dark = isDarkBackgroundColor(props.backgroundColor);
  const [numbersData, updateData] = useState<NumberLookup | undefined>();
  let numbersDataString,
    mobileShow = 'none !important';

  if (numbersData) {
    numbersDataString = JSON.stringify(numbersData, null, 2);
    mobileShow = 'block';
  }

  return (
    <css.SectionWrapper {...props} hasOverflow>
      <Grid.Container>
        <Grid.FullWidthItem>
          {tagLine && (
            <css.TaglineWrapper>
              <Tagline isDark={dark}>{tagLine}</Tagline>
            </css.TaglineWrapper>
          )}
          <css.HeadingOne level={1} dark={dark}>
            {heading}
          </css.HeadingOne>
          {copy && (
            <css.WrapperCopy>
              <Markdown dark={dark} lead={true}>
                {copy}
              </Markdown>
            </css.WrapperCopy>
          )}
        </Grid.FullWidthItem>

        <Grid.Item xs={4} small={5} medium={6}>
          <NumberLookupSearch ctaCopy={ctaCopy} updateData={updateData} />
        </Grid.Item>
        <Grid.Item
          xs={4}
          small={3}
          medium={6}
          css={{
            width: '100%',
            '@lessThanSmall': { display: mobileShow, width: '100%' },
          }}
        >
          {numbersData && numbersDataString ? (
            <css.ResponseWrapper>
              <css.CopyButtonWrapper>
                <CopyButton copy={numbersDataString} isDark />
              </css.CopyButtonWrapper>
              <css.CodeMarkdown dark>{`\`\`\`json\n ${numbersDataString} \`\`\``}</css.CodeMarkdown>
            </css.ResponseWrapper>
          ) : (
            <css.DefaultResponseWrapper>
              <css.CodeMarkdown dark>{boxDefault || 'Search A Valid US Phone Number To Start'}</css.CodeMarkdown>
            </css.DefaultResponseWrapper>
          )}
        </Grid.Item>
      </Grid.Container>
    </css.SectionWrapper>
  );
};

export default NumberLookupHero;
