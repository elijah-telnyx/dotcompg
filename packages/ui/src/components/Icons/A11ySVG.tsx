import {
  forwardRef,
  type ReactNode,
  type SVGProps,
  type ForwardedRef,
} from 'react';
/**
 * @refs
 * @link https://a11y-101.com/development/svg
 * @link https://css-tricks.com/accessible-svg-icons/
 */

export interface A11ySVGProps extends SVGProps<SVGSVGElement> {
  title?: string;
  description?: string;
  children?: ReactNode;
}

const replaceSpaceCharacter = (str: string, char = '-') =>
  str.replace(/\s/g, char).toLowerCase();

const generateAriaDescribedBy = ({ title = '', description = '' }) => {
  const titleId = replaceSpaceCharacter(title);
  const descriptionId = replaceSpaceCharacter(description);
  let describedBy = titleId;
  if (descriptionId) describedBy += ` ${descriptionId}`;

  return { 'aria-describedby': describedBy.trim() };
};

const generateA11yProps = ({ title, description, ...props }: A11ySVGProps) => {
  if (props['aria-describedby']) return { ...props, role: 'img' };

  if (title || description) {
    return { ...generateAriaDescribedBy({ title, description }), role: 'img' };
  }

  return { 'aria-hidden': true };
};

const A11ySVGWithRef = (
  { title, description, children, ...props }: A11ySVGProps,
  ref: ForwardedRef<SVGSVGElement>
) => {
  return (
    <svg
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      ref={ref}
      {...generateA11yProps({ title, description, ...props })}
      {...props}
    >
      {title && <title id={replaceSpaceCharacter(title)}>{title}</title>}
      {description && (
        <desc id={replaceSpaceCharacter(description)}>{description}</desc>
      )}
      {children}
    </svg>
  );
};

export const A11ySVG = forwardRef<SVGSVGElement, A11ySVGProps>(A11ySVGWithRef);
