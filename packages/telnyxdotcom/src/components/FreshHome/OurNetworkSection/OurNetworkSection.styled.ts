import { styled, theme } from 'ui/styles';
import Section from 'ui/components/Section';
import CaptionComponent from 'ui/components/Typography/Caption';
import { VISIBILITY_ANIMATION_MS } from 'ui/components/NetworkGlobe/utils';
import { height as headerHeight } from 'ui/components/Header/constants';

export const ANIMATE_TRANFORM_EASE = 'transform .75s ease-in-out';
export const ANIMATE_OPACITY_EASE = 'opacity .25s ease-in-out';
export const ANIMATE_SCALE_EASE = 'scale .5s ease-out';
export const ANIMATE_HEIGHT_EASE = 'height .5s ease-in-out';
export const ANIMATE_WIDTH_EASE = 'width .5s ease-in-out';
export const ANIMATE_VISIBILITY_EASE = `visibility 0s ease-in-out ${VISIBILITY_ANIMATION_MS}ms`;

export const SectionWrapper = styled(Section, {
  position: 'relative',
});

export const Caption = styled(CaptionComponent, {
  textAlign: 'center',
  marginTop: '$medium',
  marginBottom: '$xxl',
});

export const ButtonWrapper = styled('div', {
  marginTop: '$xl',
  textAlign: 'center',

  '@small': {
    marginTop: '$xxxl',
  },
});

// network map needs to be visible to give feedback to the user on loading state and also populate the page with content
// this is to have a fallback when js fails or is slow to load
export const ContentWrapper = styled('div', {
  width: '100vw',
  height: `calc(60vh - ${headerHeight.xs}px)`, // this is due to header size

  '@small': {
    height: `calc(70vh - ${headerHeight.xs}px)`, // this is due to header size
    width: '$gridMaxWidth$small',
  },

  '@medium': {
    width: '$gridMaxWidth$medium',
  },

  '@large': {
    height: `calc(100vh - ${headerHeight.large}px)`, // this is due to header size
    width: 'calc(100% - 192px)',
  },

  '@xl': {
    width: 'calc(100% - 288px)',
  },
});

export const Loading = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
  textAlign: 'center',
});

export const NetworkMapWrapper = styled(ContentWrapper, {
  background: `linear-gradient(135deg, ${theme.colors.blue.value}AA 0%, $blue 30%, $blue 70%, ${theme.colors.blue.value}AA 100%)`,
  backgroundColor: '$black',
  margin: '0 auto',

  '@small': {
    borderRadius: '$semilarge',
  },
});

export const Error = styled('p', {
  color: '$redAlt',
  fontSize: '$small',
  marginTop: '$xxs',
  textWrap: 'pretty',
});
