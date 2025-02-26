import * as Table from './LLMComparisonTable.styled';
import utils, { type LLMModel } from '../utils';

const LLMComparisonTable = ({ data }: { data: LLMModel[] }) => {
  const modelCell = (llmModel: LLMModel) => {
    if (llmModel.URL) {
      return <a href={`/llm-library/${llmModel.URL.toString().trim()}`}>{utils.parseName(llmModel.id)}</a>;
    }
    return utils.parseName(llmModel.id);
  };
  return (
    <Table.Root>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Organization</Table.HeaderCell>
          <Table.HeaderCell>Model Name</Table.HeaderCell>
          <Table.HeaderCell>Tasks</Table.HeaderCell>
          <Table.HeaderCell>Languages Supported</Table.HeaderCell>
          <Table.HeaderCell>Context Length</Table.HeaderCell>
          <Table.HeaderCell>Parameters</Table.HeaderCell>
          <Table.HeaderCell>Model Tier</Table.HeaderCell>
          <Table.HeaderCell>License</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.length === 0 && (
          <Table.Row noData>
            <Table.DataCell semibold>No data available at this time, please try again later.</Table.DataCell>
          </Table.Row>
        )}
        {data.map((i) => (
          <Table.Row key={i.id}>
            <Table.DataCell semibold>{i.organization}</Table.DataCell>
            <Table.DataCell semibold>{modelCell(i)}</Table.DataCell>
            <Table.DataCell capitalize>{utils.parseTask(i.task)}</Table.DataCell>
            <Table.DataCell>{utils.parseLang(i.languages)}</Table.DataCell>
            <Table.DataCell>{i.context_length}</Table.DataCell>
            <Table.DataCell>{i.parameters_str}</Table.DataCell>
            <Table.DataCell capitalize>{i.tier}</Table.DataCell>
            <Table.DataCell>{i.license}</Table.DataCell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default LLMComparisonTable;
