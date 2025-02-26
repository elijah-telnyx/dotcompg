import { useState } from 'react';
import type { TablesSectionTableProps } from '../TablesSection';

interface UseHiddenTableProps {
  footer: TablesSectionTableProps['footer'];
}

const openHiddenTables = (container: HTMLElement) => {
  const elementWithHeight = container.firstElementChild;
  if (elementWithHeight) {
    const { clientHeight, children } = elementWithHeight;
    // without this the bottom gets cropped
    const tablesMargin = children.length * 32;
    container.style.height = clientHeight + tablesMargin + 'px';
    container.scrollIntoView();
  }
};

const closeHiddenTables = (container: HTMLElement) => {
  container.style.height = '0px';
};

const useHiddenTable = ({ footer }: UseHiddenTableProps) => {
  const [hiddenTable, setHiddenTable] = useState(() =>
    // create an object with the key being the inner table container id and the value true
    // all the tables start hidden
    footer?.data.reduce((tables, footerItem) => {
      if (footerItem.toggleButton) {
        const { toggleButton } = footerItem;
        const tableId = toggleButton.innerTableId;
        tables[tableId] = true;
      }
      return tables;
    }, {} as Record<string, boolean>)
  );

  const toggleTable = (tableId: string) => {
    if (hiddenTable) {
      const value = !hiddenTable[tableId];
      setHiddenTable({ ...hiddenTable, [tableId]: value });
      const container = document.getElementById(tableId);
      if (!container) return;
      if (value) {
        closeHiddenTables(container);
      } else {
        openHiddenTables(container);
      }
    }
  };

  return { toggleTable, hiddenTable };
};

export default useHiddenTable;
