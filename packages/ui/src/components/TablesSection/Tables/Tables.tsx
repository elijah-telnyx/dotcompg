import type { TablesSectionTableProps } from '../TablesSection';
import TwoColumnsTable from './TwoColumnsTable';
import ThreeColumnsTable from './ThreeColumnsTable';
import FourColumnsTable from './FourColumnsTable';

const Tables = (props: TablesSectionTableProps) => {
  if (props.columns === 2) return <TwoColumnsTable {...props} />;

  if (props.columns === 3) return <ThreeColumnsTable {...props} />;

  if (props.columns === 4) return <FourColumnsTable {...props} />;

  return null;
};

export default Tables;
