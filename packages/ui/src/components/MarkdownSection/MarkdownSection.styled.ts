import { styled } from '../../styles';
import SectionComponent from '../Section';

export const Section = styled(SectionComponent, {
  variants: {
    useRegularTable: {
      true: {
        'div:has(div>table)': {
          overflow: 'auto',
        },
        table: {
          width: '100%',
          display: 'table',
          borderCollapse: 'collapse',
        },
        th: {
          width: '100%',
          minWidth: 312,
          textWrap: 'nowrap',
          '&:first-child': {
            borderRadius: '$medium 0 0 0',
          },
          '&:last-child': {
            borderRadius: '0 $medium 0 0',
          },
        },
        thead: {
          display: 'table-header-group',
        },
        tbody: {
          display: 'table-row-group',
        },
        tr: {
          wordWrap: 'break-word',
          display: 'table-row',
          maxWidth: '100% !important',
          '&:last-child': {
            td: {
              '&:first-child': {
                borderRadius: ' 0 0 0 $medium',
              },
              '&:last-child': {
                borderRadius: '0 0 $medium 0',
              },
            },
          },
        },
        'td, th': {
          paddingInline: '$medium',
          display: 'table-cell',
        },
      },
    },
  },
});
