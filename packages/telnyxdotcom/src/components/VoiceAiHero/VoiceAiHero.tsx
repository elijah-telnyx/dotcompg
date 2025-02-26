import { useState, useEffect, useRef } from 'react';
import * as css from './VoiceAiHero.styled';
import Media from 'ui/components/Media';
import Paragraph from 'ui/components/Typography/Paragraph';
import Tagline from 'ui/components/Tagline';
import CtaButton from 'ui/components/CtaButton';
import VoiceAiFormContainer from './VoiceAiForm/VoiceAiFormContainer';
import CustomerLogos from 'ui/components/CustomerLogos';
import customerLogos from './CustomerLogos';
import { type Config } from '@lottiefiles/dotlottie-web';

// Lottie animation
type DotLottieType = {
  play: () => void;
  setFrame: (frame: number) => void;
};

const ANIMATION_CONFIG = {
  STARTFRAME: 10,
  ENDFRAME: 49,
  SOURCE:
    'https://assets.ctfassets.net/2vm221913gep/TD7zoLQKmSNn2iKFPF9gd/4ba456acc3c1fe86091ef8a2694a1a44/voice_ai_ani_updated.lottie',
} as const;

const VoiceAiHero = () => {
  const contentSectionRef = useRef<HTMLDivElement | null>(null);
  const viewportWrapperRef = useRef<HTMLDivElement | null>(null);
  const gradientTwo = useRef<HTMLDivElement | null>(null);
  const formElementRef = useRef<HTMLDivElement | null>(null);

  const [aboveFold, setAboveFold] = useState(true);
  const [dotLottie, setDotLottie] = useState<DotLottieType | null>(null);
  const [lottieMode, setLottieMode] = useState<Config['mode'] | undefined>('forward');
  const dotLottieRefCallback = (dotLottie: DotLottieType | null) => {
    setDotLottie(dotLottie);
  };
  const [gradientTwoMove, setGradientTwoMove] = useState(false);
  const [viewPortWrapperStyle, setViewPortWrapperStyle] = useState<boolean | undefined>(undefined);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const handleScroll = (): void => {
      //***** Play the animations based on scroll position *****//
      const currentScrollTop = window.scrollY;
      const formElement = formElementRef.current;
      const formPosition = formElement?.getBoundingClientRect().top || 0;

      // Determine scroll direction
      const isScrollingDown = currentScrollTop > lastScrollTop;

      // Check if form element is coming into view
      if (formPosition <= window.innerHeight && isScrollingDown) {
        setGradientTwoMove(true);

        if (dotLottie && formPosition <= window.innerHeight && !hasPlayed) {
          setLottieMode('forward');
          dotLottie.setFrame(ANIMATION_CONFIG.STARTFRAME);
          dotLottie.play();
          setHasPlayed(true);
        }
      }

      // Check if scrolling up from form
      if (formPosition > window.innerHeight && !isScrollingDown) {
        setGradientTwoMove(false);

        if (dotLottie && lottieMode !== 'reverse') {
          setLottieMode('reverse');
          dotLottie.setFrame(ANIMATION_CONFIG.ENDFRAME);
          dotLottie.play();
          setHasPlayed(false);
        }
      }
      //************//

      setLastScrollTop(currentScrollTop);

      //***** Adjust the viewport wrapper position based on scroll *****//
      const contentSection = contentSectionRef.current;
      const viewportWrapper = viewportWrapperRef.current;

      if (!contentSection || !viewportWrapper) return;

      // Get the bounding rectangle of the content section
      const contentRect = contentSection.getBoundingClientRect();

      // Adjust the viewport wrapper's position based on scroll
      if (contentRect.bottom < window.innerHeight) {
        setAboveFold(false);
        setViewPortWrapperStyle(false);
      } else {
        setAboveFold(true);
        setViewPortWrapperStyle(true);
      }
      //************//
    };

    // Attach the scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [dotLottie, lottieMode, setLottieMode, lastScrollTop]);

  return (
    <css.BaseContainer>
      <css.HeroViewportWrapper ref={viewportWrapperRef} isfixed={viewPortWrapperStyle}>
        <css.MediaDotLottieWrapper
          src={ANIMATION_CONFIG.SOURCE}
          dotLottieRefCallback={dotLottieRefCallback}
          autoplay={false}
          playOnHover={false}
          autoResizeCanvas={true}
          mode={lottieMode}
        />
        <css.GradientDivOne></css.GradientDivOne>
      </css.HeroViewportWrapper>

      <css.HeroContentWrapper ref={contentSectionRef}>
        <css.BuildSection id='voice_ai_hero'>
          <css.HeaderWrapper>
            <css.TagLine>
              <Tagline>Get Started For Free</Tagline>
              <css.HeaderHighlightSup>
                <css.HeaderHighlightSupMediaWrapper>
                  <Media
                    src='https://images.ctfassets.net/2vm221913gep/14raYNu4EZFeYmzqurm43L/66d2933bbcfa0c7ee1e035f806030420/transparent_bg.gif'
                    alt='stars'
                  />
                </css.HeaderHighlightSupMediaWrapper>
              </css.HeaderHighlightSup>
            </css.TagLine>
            <css.HeadingItem>
              <css.Heading level={1} dark>
                Build a custom AI voice bot
              </css.Heading>
            </css.HeadingItem>
            <css.SubHeadingItem>
              <Paragraph dark>Generate a unique, context-aware AI voice bot in minutes using propriety data.</Paragraph>
            </css.SubHeadingItem>
            <css.CtaItem>
              <CtaButton buttonKind='primary' text='Build Now' type='button' href='#voice_ai_form' />
            </css.CtaItem>
          </css.HeaderWrapper>
        </css.BuildSection>

        <css.GradientDivTwo move={gradientTwoMove} ref={gradientTwo} stick={!aboveFold}></css.GradientDivTwo>

        <css.FormSection id='voice_ai_form' ref={formElementRef}>
          <VoiceAiFormContainer />
          <css.FooterParagraph>
            After answering a few questions, we’ll take publicly available embed information from your website to create
            your custom low-latency AI voice bot.
          </css.FooterParagraph>
          <CustomerLogos
            {...customerLogos}
            css={{
              background: 'none',
              '& img': {
                height: 32,
              },
            }}
          />
        </css.FormSection>
      </css.HeroContentWrapper>
    </css.BaseContainer>
  );
};

export default VoiceAiHero;
