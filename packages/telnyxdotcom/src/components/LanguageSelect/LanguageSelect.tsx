import Grid from 'ui/components/Grid';
import Select, { type SelectProps } from 'ui/components/Select';
import * as css from './LanguageSelect.styled';

interface LanguageSelectProps extends SelectProps {
  onValueChange?: (e: string) => void;
}

const LanguageSelect = ({ items, value, onValueChange }: LanguageSelectProps) => {
  return (
    <css.SelectContainer>
      <css.Container>
        <Grid.Item xs={4} small={8} medium={12} large={12}>
          <css.SelectWrapper>
            <Select items={items} placeholder='Language' value={value} onValueChange={onValueChange} />
          </css.SelectWrapper>
        </Grid.Item>
      </css.Container>
    </css.SelectContainer>
  );
};

export default LanguageSelect;
