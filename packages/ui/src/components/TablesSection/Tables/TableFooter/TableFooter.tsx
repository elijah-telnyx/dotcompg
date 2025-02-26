import type { TablesSectionTableProps } from '../../TablesSection';
import type useHiddenTable from '../useHiddenTable';

import Grid from '../../../Grid';
import Markdown from '../../../Markdown';
import Table from '../../../Table';
import Link from '../../../Link';
import { PlusIcon } from '../../../Faq/Faq.styled';
import * as css from '../Tables.styles';

type FooterProps = Required<Pick<TablesSectionTableProps, 'footer'>> &
  ReturnType<typeof useHiddenTable>;

const TableFooter = ({ footer, toggleTable, hiddenTable }: FooterProps) => {
  return (
    <Grid.Container>
      <Grid.FullWidthItem>
        <Table.Footer id={footer.id}>
          {footer.data.map(({ toggleButton, ...content }) => {
            /**
             * checks if there is a hidden table and a button linked to the table
             */
            const hasButton =
              hiddenTable &&
              toggleButton?.innerTableId &&
              typeof hiddenTable[toggleButton?.innerTableId] !== undefined;

            const state =
              hasButton && hiddenTable[toggleButton.innerTableId]
                ? 'close'
                : 'open';

            return (
              <Table.FooterItem key={content.value}>
                <Markdown options={{ forceBlock: false }}>
                  {content.value}
                </Markdown>
                {hasButton && (
                  <Link
                    htmlAs='button'
                    onClick={() => toggleTable(toggleButton.innerTableId)}
                    aria-expanded={hiddenTable[toggleButton?.innerTableId]}
                    data-state={state}
                    aria-controls={toggleButton?.innerTableId}
                  >
                    <css.ToggleButtonCopy>
                      {toggleButton.label[state]}
                    </css.ToggleButtonCopy>

                    <PlusIcon css={{ width: 10, height: 10 }} />
                  </Link>
                )}
              </Table.FooterItem>
            );
          })}
        </Table.Footer>
      </Grid.FullWidthItem>
    </Grid.Container>
  );
};

export default TableFooter;
