import { styled } from 'ui/styles';

export const Menu = styled('div', {
  position: 'fixed',
  paddingInline: '$medium',
  bottom: 140,
  left: 'calc((100% - 32px))',
  zIndex: 9999999,
  transition: 'transform 0.2s linear',
  width: 'max-content',
  transform: 'translateX(0)',
  '&:hover': {
    transform: 'translateX(calc(-100% + 32px))',
  },
  display: 'grid',
  gap: '$small',
});

export const Button = styled('button', {
  cursor: 'pointer',
  display: 'block',
  color: '$cream',
  padding: '$small $medium',
  backgroundColor: 'hotpink',
  fontSize: '0.9rem',
  borderRadius: '$xs',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.14)',
});
