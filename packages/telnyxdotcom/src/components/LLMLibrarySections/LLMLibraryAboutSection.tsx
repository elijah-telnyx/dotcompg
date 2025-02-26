import T from 'ui/components/Table';
import { type AirtableLLMRecord } from 'services/airtableService';
import Markdown from 'ui/components/Markdown';
import * as css from './LLMLibrarySections.styled';
import Twitter from 'ui/components/Icons/Twitter';
import { type ReactNode } from 'react';
import { number } from 'utils/sort';

const [xl, large, medium, small, xs] = [8, 8, 9, 6, 4];
const tableTheme = 'green';

interface BarChartItem {
  label: string;
  value: number;
}

interface RowData {
  label: string;
  units?: string;
  value: string | number;
}

const TwitterListItem = ({ children }: { children: ReactNode }) => {
  return (
    <css.ListItem>
      <css.TwitterWrapper>
        <Twitter />
        <span>{children}</span>
      </css.TwitterWrapper>
    </css.ListItem>
  );
};

const Table = ({ data, caption }: { data: RowData[]; caption?: string }) => {
  return (
    <css.Table tableTheme={tableTheme}>
      <T.Caption>{caption}</T.Caption>
      <T.TBody xl={xl} large={large} medium={medium} small={small} xs={xs}>
        {data.map(({ label, units, value }) => (
          <T.Row key={label}>
            <T.HeaderCell large={6} medium={6} small={6} xs={2}>
              {label}
              {units && <css.Units>{units}</css.Units>}
            </T.HeaderCell>
            <T.DataCell large={2} medium={2} small={2} xs={2}>
              {value ? value : 'N/A'}
            </T.DataCell>
          </T.Row>
        ))}
      </T.TBody>
    </css.Table>
  );
};

const Row = ({ alt = false, children }: { alt?: boolean; children: ReactNode }) => (
  <css.Row xl={xl} large={large} medium={medium} small={small} xs={xs}>
    {alt ? <css.Alt>{children}</css.Alt> : children}
  </css.Row>
);

const LLMLibraryAboutSection = ({ record, records }: { record: AirtableLLMRecord; records: AirtableLLMRecord[] }) => {
  const {
    'p-intro': pIntro,
    license,
    contextWindow,
    properName,
    useCases,
    arenaElo,
    MMLU,
    mtBench,
    quality,
    'p-price': pPrice,
    onlineBuzz,
  } = record;

  const data = records.reduce((acc: BarChartItem[], curr: AirtableLLMRecord) => {
    const { properName, arenaElo } = curr;
    if (arenaElo) {
      return [...acc, { label: properName, value: arenaElo }];
    }
    return acc;
  }, []);

  const CompareBarChart = ({ data }: { data: BarChartItem[] }) => {
    if (data.length === 0) return null;
    const sortedData = data.sort((a, b) => number.descending(a.value, b.value));

    const total = sortedData.length;
    const display = 5; // total number of bars to display
    const maxWidthPadding = 1.1; // 10% padding to max value so bar isn't 100% full
    const delta = Math.floor(display / 2); // number of bars to display on each side of the center
    const selectedIndex = sortedData.findIndex((item) => item.label === properName);

    // logic for handling top ranked LLMs in positions less than delta
    if (selectedIndex < delta) {
      const selectedData = sortedData.slice(0, display);
      return (
        <css.CompareProgressWrapper>
          {selectedData.map(({ label, value }) => (
            <css.CompareProgressRow
              fullWidth
              key={label}
              color={label === record.properName ? '$green' : '$blue'}
              label={label}
              max={selectedData[0].value * maxWidthPadding}
              value={value}
            />
          ))}
        </css.CompareProgressWrapper>
      );
    }

    // logic for handling lowest ranked LLMs in positions less than length - delta
    if (selectedIndex > total - 1 - delta) {
      const selectedData = sortedData.slice(-display);
      return (
        <css.CompareProgressWrapper>
          {selectedData.map(({ label, value }) => (
            <css.CompareProgressRow
              fullWidth
              key={label}
              color={label === record.properName ? '$green' : '$blue'}
              label={label}
              max={selectedData[0].value * maxWidthPadding}
              value={value}
            />
          ))}
        </css.CompareProgressWrapper>
      );
    }

    // default data for when selected LLM is not in the top or bottom 5
    const selectedData = sortedData.slice(selectedIndex - delta, selectedIndex + delta + 1);

    // all other cases have 2 or more items on both sides of selected LLM index
    return (
      <css.CompareProgressWrapper>
        {selectedData.map(({ label, value }) => (
          <css.CompareProgressRow
            fullWidth
            key={label}
            color={label === record.properName ? '$green' : '$blue'}
            label={label}
            max={selectedData[0].value * maxWidthPadding}
            value={value}
          />
        ))}
      </css.CompareProgressWrapper>
    );
  };

  return (
    <css.SectionWrapper>
      <css.Container>
        <Row>
          <css.Header level={2} css={{ marginBottom: '$large' }} category>
            about
          </css.Header>
          {pIntro && <Markdown>{pIntro}</Markdown>}
        </Row>
      </css.Container>
      <Table
        data={[
          { label: 'License', value: license },
          { label: 'Context window', units: '(in thousands)', value: contextWindow },
        ]}
      />
      <css.Container>
        <Row alt>
          <css.HeaderAlt level={2}>Use cases for {properName}</css.HeaderAlt>
          {useCases && (
            <Markdown
              dark
              options={{
                overrides: {
                  li: css.ListItem,
                },
              }}
            >
              {useCases}
            </Markdown>
          )}
        </Row>
      </css.Container>
      <Table
        caption={`Quality`}
        data={[
          { label: 'Arena Elo', value: arenaElo },
          { label: 'MMLU', value: MMLU },
          { label: 'MT Bench', value: mtBench },
        ]}
      />
      <css.Container>
        {quality && (
          <>
            <Row>
              <Markdown>{quality}</Markdown>
            </Row>
            <Row>
              <CompareBarChart data={data} />
            </Row>
          </>
        )}
      </css.Container>
      {pPrice && (
        <css.Container>
          <Row>
            <css.Header level={2} css={{ marginBottom: '$large' }} category>
              pricing
            </css.Header>
            <Markdown>{pPrice}</Markdown>
          </Row>
        </css.Container>
      )}
      {onlineBuzz && (
        <css.Container>
          <Row alt>
            <css.HeaderAlt level={2}>What&apos;s Twitter saying?</css.HeaderAlt>
            <Markdown
              dark
              options={{
                overrides: {
                  ul: css.List,
                  li: TwitterListItem,
                },
              }}
            >
              {onlineBuzz}
            </Markdown>
          </Row>
        </css.Container>
      )}
    </css.SectionWrapper>
  );
};

export default LLMLibraryAboutSection;
