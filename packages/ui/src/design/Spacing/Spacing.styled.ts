import { styled } from '../../styles';

const BaseSpacing = styled('div', {
  margin: '0 0 $large',
  padding: 0,
  backgroundColor: '#FFBAFC',
  textAlign: 'center',
});

export const XXS = styled(BaseSpacing, {
  padding: '$xxs',
});

export const XS = styled(BaseSpacing, {
  padding: '$xs',
});

export const Small = styled(BaseSpacing, {
  padding: '$small',
});

export const Medium = styled(BaseSpacing, {
  padding: '$medium',
});

export const Large = styled(BaseSpacing, {
  padding: '$large',
});

export const XL = styled(BaseSpacing, {
  padding: '$xl',
});

export const XXL = styled(BaseSpacing, {
  padding: '$xl',
});

export const Huge = styled(BaseSpacing, {
  padding: '$huge',
});

export const XH = styled(BaseSpacing, {
  padding: '$xh',
});
