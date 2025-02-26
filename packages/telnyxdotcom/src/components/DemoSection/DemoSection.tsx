import type { InferenceSectionProps } from 'components/FreshHome/InferenceSection';
import dynamic from 'next/dynamic';

const DynamicInferenceDemo = dynamic(() => import('components/FreshHome/InferenceSection'), {
  ssr: true,
});

export interface DemoSectionProps extends InferenceSectionProps {
  demoType: 'inference';
}

const DemoSection = ({ demoType, ...props }: DemoSectionProps) => {
  switch (demoType) {
    case 'inference':
      return <DynamicInferenceDemo {...props} />;
    default:
      return null;
  }
};

export default DemoSection;
