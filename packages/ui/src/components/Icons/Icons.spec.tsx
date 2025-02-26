import { render } from '@testing-library/react';
import * as Icons from './index';

type IconKey = keyof typeof Icons;

describe('Icons', () => {
  (Object.keys(Icons) as IconKey[]).forEach((name) => {
    describe(`${name}`, () => {
      it(`should render SVG "<${name} />" component`, async () => {
        const IconComponent = Icons[name];
        const { container } = render(<IconComponent title={name} />);

        expect(container).toBeInTheDocument();
        expect(container.firstChild).toHaveAccessibleName(name);
      });
    });
  });
});
