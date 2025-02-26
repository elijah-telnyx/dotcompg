import type { Meta } from '@storybook/react';
import Heading from '../../components/Typography/Heading';
import TypeScale from './TypeScale';
import { theme } from '../../styles';
const { fonts, fontWeights, space } = theme;

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
const symbols = '!"#$%&\'()*+,-./0123456789:;<=>?@[\\]^_`{}|';

const styles = {
  h1: { marginBottom: space.xl.value, display: 'block' },
  h2: { marginBottom: space.large.value, display: 'block' },
  h3: { marginBottom: space.small.value, display: 'block' },
};

const Typefaces = () => {
  const fontFamilyList = Object.values(fonts);
  const weightList = Object.entries(fontWeights);
  return (
    <div>
      <Heading level={2} style={styles.h2}>
        Typefaces
      </Heading>
      {fontFamilyList.map((font) => {
        const style = { fontFamily: font.value, marginBottom: space.xl.value };
        return (
          <div key={font.value} style={style}>
            <Heading level={3} style={styles.h3}>
              {font.value.split(',')[0]}
            </Heading>
            <div>
              {weightList.map(([name, weight]) => {
                const style = {
                  fontWeight: weight.value,
                  marginRight: space.medium.value,
                };
                return (
                  <span key={name} style={style}>
                    {name}
                  </span>
                );
              })}
            </div>
            <p>{symbols.split('').join(' ')}</p>
            <p>{alphabet.toUpperCase()}</p>
            <p>{alphabet}</p>
          </div>
        );
      })}
    </div>
  );
};

export const Typography = () => {
  return (
    <div>
      <Heading level={2} style={styles.h2}>
        TypeScale
      </Heading>
      <TypeScale />
      <div style={{ marginBottom: space.xxl.value }} />
      <Typefaces />
    </div>
  );
};

const componentMeta: Meta<typeof Typography> = {
  title: 'Design/Typography',
  component: Typography,
  parameters: {
    options: {
      showPanel: false,
    },
  },
};

export default componentMeta;
