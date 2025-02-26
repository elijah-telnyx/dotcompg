import Tooltip from 'ui/components/Tooltip/Tooltip';
import EmergencyIcon from './icons/EmergencyIcon';
import FaxIcon from './icons/FaxIcon';
import HdVoiceIcon from './icons/HdVoiceIcon';
import MmsIcon from './icons/MmsIcon';
import SmsIcon from './icons/SmsIcon';
import VoiceIcon from './icons/VoiceIcon';
import { styled } from 'ui/styles';

const icons = {
  emergency: EmergencyIcon,
  fax: FaxIcon,
  hd_voice: HdVoiceIcon,
  mms: MmsIcon,
  sms: SmsIcon,
  voice: VoiceIcon,
  international_sms: SmsIcon,
};

interface AvailableNumbersIconsProps {
  readonly name: keyof typeof icons;
}

function formatNameToTitle(name: keyof typeof icons) {
  return name.replace('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
}

const IconWrapper = styled('div', {
  display: 'inline-block',
  marginLeft: '4px',
});

export default function AvailableNumbersIcons({ name }: AvailableNumbersIconsProps) {
  const Icon = icons[name];
  if (!Icon) {
    return null;
  }

  return (
    <Tooltip content={formatNameToTitle(name)}>
      <IconWrapper>
        <Icon height={15} width={15} />
      </IconWrapper>
    </Tooltip>
  );
}
