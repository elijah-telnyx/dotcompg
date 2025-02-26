import {
  Heading1,
  Heading2,
  Heading2Category,
  Heading3,
} from '../../components/Typography/Heading/Heading.styled';
import Paragraph from '../../components/Typography/Paragraph';
import Caption from '../../components/Typography/Caption';
import Quote from '../../components/Typography/Quote';
import Statistics from '../../components/Typography/Statistics';
import CTA from '../../components/Typography/CTA';
import Code from '../../components/Typography/Code';
import Link from '../../components/Typography/Link';

const orderedList: any[] = [
  { name: 'Heading1', component: Heading1 },
  {
    name: 'Heading1.Alt',
    component: (props: any) => <Heading1 {...props} alt />,
  },
  { name: 'Heading2', component: Heading2 },
  {
    name: 'Heading2.Category',
    component: (props: any) => <Heading2Category {...props} />,
  },
  { name: 'Heading3', component: Heading3 },
  {
    name: 'Paragraph.Lead',
    component: (props: any) => <Paragraph {...props} lead />,
  },
  { name: 'Paragraph', component: Paragraph },
  { name: 'Caption', component: Caption },
  {
    name: 'Statistics.Major',
    component: (props: any) => <Statistics {...props} major />,
  },
  { name: 'Statistics', component: Statistics },
  { name: 'Quote', component: Quote },
  { name: 'CTA', component: CTA },
  { name: 'Code', component: Code },
  {
    name: 'Link.Lead',
    component: (props: any) => <Link {...props} lead={true} />,
  },
  { name: 'Link', component: Link },
];

const TypeScale = () => {
  return (
    <div>
      {orderedList.map((Typography) => {
        const name = Typography.name;
        return (
          <Typography.component key={name} as='div' style={{ marginBottom: 8 }}>
            {name}
          </Typography.component>
        );
      })}
    </div>
  );
};

export default TypeScale;
