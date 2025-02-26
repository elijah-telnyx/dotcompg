import IconAlert from '../../Icons/Alert';
import IconInfo from '../../Icons/Info';
import IconSuccess from '../../Icons/Success';
import * as css from './FieldMessage.styled';

export interface FieldMessageProps {
  type?: 'info' | 'error' | 'success';
  multiline?: boolean;
  children?: React.ReactNode;
}

const ICONS = {
  info: IconInfo,
  error: IconAlert,
  success: IconSuccess,
};

export const IconMessage = ({ type }: Pick<FieldMessageProps, 'type'>) => {
  if (!type) return null;

  const Icon = ICONS[type];

  return <Icon title={type} />;
};

const FieldMessage = ({ type, children, ...props }: FieldMessageProps) => {
  if (!children) return null;

  return (
    <css.Message {...props} type={type}>
      <IconMessage type={type} />
      {children}
    </css.Message>
  );
};

export default FieldMessage;
