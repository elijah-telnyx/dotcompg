import { styled } from '../../styles';
import type { A11ySVGProps } from './A11ySVG';
import Plus from './Plus';

const OpenClose = (props: A11ySVGProps) => <Plus {...props} />;

const OpenCloseStyled = styled(OpenClose, {
  transition: `ease-out 300ms rotate`,
  [`[data-state="open"] &`]: {
    rotate: '45deg',
  },
});

export default OpenCloseStyled;
