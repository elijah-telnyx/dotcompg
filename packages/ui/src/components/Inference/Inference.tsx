import type { ReactNode } from 'react';
import * as css from './Inference.styled';

export interface InferenceProps {
  children?: ReactNode;
}

const Inference = ({ children = 'Inference' }: InferenceProps) => {
  return <css.Wrapper>{children}</css.Wrapper>;
};

export default Inference;
