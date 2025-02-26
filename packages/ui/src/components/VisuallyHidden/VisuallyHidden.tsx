import type { ReactNode } from 'react';

export interface VisuallyHiddenProps {
  children: ReactNode;
}

/**
 * renders `children` in page source with `aria-hidden=true`
 * @param dynamic content that should be included in page source
 */
const VisuallyHidden = ({ children }: VisuallyHiddenProps) => {
  return (
    <div hidden aria-hidden='true'>
      {children}
    </div>
  );
};

export default VisuallyHidden;
