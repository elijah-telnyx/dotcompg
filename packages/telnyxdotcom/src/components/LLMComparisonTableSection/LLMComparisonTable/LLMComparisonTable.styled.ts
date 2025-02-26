import { styled } from 'ui/styles';
import Plus from 'ui/components/Icons/Plus';
import Checkmark from 'ui/components/Icons/Checkmark';
import ChevronDown from 'ui/components/Icons/ChevronDown';
import { STICKY } from '../LLMComparisonTableSection.styled';

export const Root = styled('table', {
  textAlign: 'left',
  margin: '0 auto',
  width: '100%',
});

export const Head = styled('thead', STICKY.TABLE_HEADER, {
  display: 'block',
  textTransform: 'uppercase',
  backgroundColor: '$cream',
  paddingTop: '$small',
});

export const Row = styled('tr', {
  display: 'grid',
  gap: '$medium',
  paddingBottom: '$xs',
  marginBottom: '$small',
  gridTemplateColumns: '140px 250px repeat(6, 1fr)',
  variants: {
    noData: {
      true: {
        gridTemplateColumns: '1fr',
        textAlign: 'center',
      },
    },
  },
});

export const Body = styled('tbody', {});

export const HeaderCell = styled('th', {
  typography: '$h3',
  fontSize: '$xxxs',
  lineHeight: '$xxxs',
  gridTemplateColumns: '120px 315px repeat(6, 1fr)',
});

export const DataCell = styled('td', {
  a: {
    color: '$blue',
    textDecoration: 'underline',
    '&:hover': {
      color: 'unset',
    },
  },
  fontSize: '$xs',
  variants: {
    capitalize: {
      true: {
        textTransform: 'capitalize',
      },
    },
    semibold: {
      true: {
        'a, span': {
          fontWeight: '$semibold',
          fontSize: '$xs',
        },
        fontWeight: '$semibold',
      },
    },
  },
});

const iconSize = {
  width: 24,
  height: 24,
};
export const CrossIcon = styled(Plus, iconSize, {
  rotate: '45deg',
  color: '$tan',
});
export const CheckIcon = styled(Checkmark, iconSize, {
  color: '$greenAlt',
});

export const CellCopy = styled('div', {
  typography: '$p.caption.mobile',
  color: '$grayHoverLightBackground',
});

export const NumberTypeButton = styled('button', {
  typography: '$p.mobile',
  width: '100%',
  paddingBottom: '$xs',
  display: 'flex',
  alignItems: 'center',
  '&:hover, &:focus': {
    color: '$blue',
  },
});

export const ChevronIconContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: '10px',
  gridTemplateRows: '10px',
  gap: 1,
  marginRight: '$xs',
});

export const ChevronIcon = styled(ChevronDown, {
  height: 14,
  width: 14,
  variants: {
    up: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});
