import { useEffect, useState } from 'react';
import { NotFoundMessage, useCoverageData } from '../useCoverageData';
import * as Table from './CoverageTable.styled';
import Link from '../../Link';

export interface CountryRowProps {
  country: string;
  url?: string;
  header: string[];
  types: {
    [key: string]: {
      [key: string]: boolean | string;
    };
  };
  isServices: boolean;
  selectedTypeIndex?: number;
}

const CountryRow = ({
  country,
  url,
  types,
  header,
  isServices,
  selectedTypeIndex: tableRowTypeIndex = 0,
}: CountryRowProps) => {
  const [selectedTypeIndex, setSelectedType] = useState(0);

  const availableTypes = Object.keys(types);
  const selectedType = availableTypes[selectedTypeIndex];
  const typeData = types[selectedType];

  const rotateType = () => {
    const currentIndex = selectedTypeIndex;
    const nextIndex = (currentIndex + 1) % availableTypes.length;
    setSelectedType(nextIndex);
  };

  useEffect(() => {
    if (selectedTypeIndex !== tableRowTypeIndex) {
      setSelectedType(tableRowTypeIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRowTypeIndex]);

  return (
    <Table.Row isServices={isServices}>
      <Table.DataCell semibold>
        {url ? <Link href={url}>{country}</Link> : country}
      </Table.DataCell>

      {isServices && (
        <Table.DataCell>
          <Table.NumberTypeButton onClick={rotateType}>
            {availableTypes?.length > 1 && (
              <Table.ChevronIconContainer>
                <Table.ChevronIcon up /> <Table.ChevronIcon />
              </Table.ChevronIconContainer>
            )}
            <span>{selectedType}</span>
          </Table.NumberTypeButton>
        </Table.DataCell>
      )}

      {header.map((type) =>
        isServices ? (
          <Table.DataCell key={country + type}>
            {typeof typeData[type] === 'string' ? (
              <Table.CellCopy>{typeData[type]}</Table.CellCopy>
            ) : typeData[type] ? (
              <Table.CheckIcon />
            ) : (
              <Table.CrossIcon />
            )}
          </Table.DataCell>
        ) : (
          <Table.DataCell key={country + type}>
            {availableTypes.includes(type) ? (
              <Table.CheckIcon />
            ) : (
              <Table.CrossIcon />
            )}
          </Table.DataCell>
        )
      )}
    </Table.Row>
  );
};

const CoverageTable = ({ singleTab }: { singleTab?: boolean }) => {
  const { data, header, typeColumn, isServices, fullWidth } = useCoverageData();
  const typeColumnWidth = typeColumn?.width;

  return (
    /* Countries and number type doesn't count as numberOfColumns
     * they have their own rule over css
     */
    <Table.Root
      css={{
        $$numberOfColumns: header.length,
        width: fullWidth ? '100%' : 'unset',
        ...(typeColumnWidth ? { '--second-col': `${typeColumnWidth}px` } : {}),
      }}
    >
      <Table.Head singleTab={singleTab}>
        <Table.Row isServices={isServices}>
          <Table.HeaderCell>Countries</Table.HeaderCell>
          {isServices && (
            <Table.HeaderCell>
              {/*
               * Keep the old value hardcoded
               * to maintain compatibility
               */}
              {typeColumn?.label || 'Number Type'}
            </Table.HeaderCell>
          )}
          {header.map((key) => (
            <Table.HeaderCell key={key}>{key}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Head>

      <Table.Body>
        {data.length === 0 ? (
          <NotFoundMessage />
        ) : (
          data.map(({ country, url, types, selectedTypeIndex }) => {
            return (
              <CountryRow
                key={country.alpha2}
                types={types}
                country={country.name}
                url={url}
                header={header}
                isServices={isServices}
                selectedTypeIndex={selectedTypeIndex}
              />
            );
          })
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default CoverageTable;
