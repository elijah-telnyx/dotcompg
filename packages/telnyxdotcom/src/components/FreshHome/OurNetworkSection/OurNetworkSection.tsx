import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { type SectionProps } from 'ui/components/Section';
import { type NetworkMapSectionProps } from 'ui/components/NetworkMapSection';
// import { useIntersectionObserver } from 'ui/utils/hooks/useIntersectionObserver';
import SectionHeader from 'ui/components/Section/SectionHeader';
import Grid from 'ui/components/Grid';
import CtaButton, { type CTAButtonProps } from 'ui/components/CtaButton';
import Spinner from 'ui/components/Spinner';

import useAsync from 'utils/hooks/useAsync';
import { config } from 'ui/styles';
import { getOurNetwork } from 'services/publicApiService';
import * as css from './OurNetworkSection.styled';

const NetworkMapLoading = () => (
  <css.ContentWrapper>
    <css.Loading>
      <Spinner title='Loading Our Network' background='light' size='big' />
    </css.Loading>
  </css.ContentWrapper>
);

const NetworkMap = dynamic(() => import('./NetworkMap'), {
  ssr: false,
  loading: NetworkMapLoading,
});

const NetworkMapInline = dynamic(() => import('./NetworkMap/NetworkMapInline'), {
  ssr: false,
  loading: NetworkMapLoading,
});

export interface OurNetworkSectionProps extends SectionProps {
  tagline: string;
  heading: string;
  copy: string;
  ctaButtons: CTAButtonProps[];
}

const OurNetworkSection = ({ tagline, heading, copy, ctaButtons, ...props }: OurNetworkSectionProps) => {
  const { data: networkMap, run, status, error } = useAsync<NetworkMapSectionProps>();
  const [inline, setInline] = useState<boolean>(true);

  useEffect(
    function onVisibleLoading() {
      async function init() {
        run(getOurNetwork());
      }

      function toggleInline() {
        setInline(!window.matchMedia(config.media.xl).matches);
      }

      // once visible, always loaded. Do not run async data load twice
      if (status === 'idle' || status === 'rejected') {
        init();
      }

      if (status === 'resolved') {
        // safe to use window here as this is an async callback block
        toggleInline();
        window.addEventListener('resize', toggleInline, false);
      }

      return () => {
        window.removeEventListener('resize', toggleInline);
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status] // run is a useCallback
  );

  return (
    <css.SectionWrapper {...props}>
      <Grid.Container>
        <Grid.FullWidthItem>
          <SectionHeader heading={heading} tagline={tagline} copy={copy} variant='center' css={{ marginBottom: 0 }} />
        </Grid.FullWidthItem>
        <Grid.FullWidthItem>
          <css.Caption>Explore the interactive map below</css.Caption>
        </Grid.FullWidthItem>
      </Grid.Container>
      {(status == 'idle' || status == 'pending') && (
        <css.ContentWrapper>
          <css.Loading>
            <Spinner title='Loading Inference' background='dark' size='big' />
          </css.Loading>
        </css.ContentWrapper>
      )}
      {status === 'resolved' && networkMap && (
        <css.NetworkMapWrapper>
          {inline ? <NetworkMapInline {...networkMap} /> : <NetworkMap {...networkMap} />}
        </css.NetworkMapWrapper>
      )}
      {status === 'rejected' && (
        <Grid.FullWidthItem xs={4} small={8} medium={12}>
          <css.Error>{error ? JSON.stringify(error) : 'Unexpected error ocurred. Please try again later'}</css.Error>
        </Grid.FullWidthItem>
      )}
      <css.ButtonWrapper>
        {ctaButtons.map((i, k) => (
          <CtaButton key={k} {...i} />
        ))}
      </css.ButtonWrapper>
    </css.SectionWrapper>
  );
};

export default OurNetworkSection;
