import { scrollIntoView } from 'ui/utils/scrollIntoView';
import * as css from './LLMComparisonAccordion.styled';
import utils, { type LLMModel } from '../utils';

interface AccordionRowProps {
  label: string;
  value: string | number | JSX.Element;
}

const AccordionRow = ({ label, value }: AccordionRowProps) => (
  <css.UnorderedList>
    <css.ListItem>
      <css.ListItemHeading>{label}</css.ListItemHeading>
      <css.ListItemValue capitalize={label === 'Tasks' || label === 'Model Tier'}>{value}</css.ListItemValue>
    </css.ListItem>
  </css.UnorderedList>
);

const LLMComparisonAccordion = ({ data }: { data: LLMModel[] }) => {
  if (data.length === 0) return null;

  const modelCell = (llmModel: LLMModel) => {
    if (llmModel.URL) {
      return <a href={`/llm-library/${llmModel.URL}`}>{utils.parseName(llmModel.id)}</a>;
    }
    return utils.parseName(llmModel.id);
  };

  return (
    <div>
      <css.Accordion
        id='accordion'
        type='single'
        defaultValue={data[0].id}
        collapsible
        onValueChange={(value) => {
          if (!value) return;
          const element = document.querySelector(`[data-scroll-to=${value}]`);
          // wait for another accordion item to close
          setTimeout(() => {
            scrollIntoView(element);
          }, 400);
        }}
      >
        {data.map((model) => {
          const key = `llm-${model.index}`;
          return (
            <css.AccordionItem key={key} value={key}>
              {model.URL && (
                <css.LLMLink aria-hidden='true' href={`/llm-library/${model.URL}`}>
                  {utils.parseName(model.id)}
                </css.LLMLink>
              )}
              <css.AccordionTrigger data-scroll-to={key}>
                {utils.parseName(model.id)} <css.PlusIcon />
              </css.AccordionTrigger>
              <css.AccordionContent>
                <AccordionRow label={'Organization'} value={model.organization} />
                <AccordionRow label={'Model Name'} value={modelCell(model)} />
                <AccordionRow label={'Tasks'} value={utils.parseTask(model.task)} />
                <AccordionRow label={'Languages Supported'} value={utils.parseLang(model.languages)} />
                <AccordionRow label={'Context Length'} value={model.context_length} />
                <AccordionRow label={'Parameters'} value={model.parameters_str} />
                <AccordionRow label={'Model Tier'} value={model.tier} />
                <AccordionRow label={'License'} value={model.license} />
              </css.AccordionContent>
            </css.AccordionItem>
          );
        })}
      </css.Accordion>
    </div>
  );
};

export default LLMComparisonAccordion;
