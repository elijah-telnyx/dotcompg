import Codes, { type CodesProps } from 'ui/components/Codes';
import * as css from './InteractiveCode.styled';

export interface InteractiveCodeProps {
  items: CodesProps['items'];
  tagline: CodesProps['tagline'];
}

export const InteractiveCode = (props: InteractiveCodeProps) => {
  return (
    <css.Wrapper>
      <Codes {...props} alt embed />
    </css.Wrapper>
  );
};

export default InteractiveCode;
