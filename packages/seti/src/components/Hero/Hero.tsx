import dynamic from "next/dynamic";
import type { SectionProps } from "ui/components/Section";
import type { TimeRangeInputProps } from "components/TimeRangeInput";
import type { WebNotificationProps } from "components/WebNotification";
import Grid from "ui/components/Grid";
import Spinner from "ui/components/Spinner";
import * as css from "./Hero.styled";

/**
 * Lazy load WebNotification component because it depends on window Notification API to work
 */
const WebNotification = dynamic(() => import("components/WebNotification"), {
  ssr: false,
  loading: () => (
    <css.LoadingContainer>
      <Spinner title="Loading web notification..." />
    </css.LoadingContainer>
  ),
});

/**
 * Lazy load TimeRangeInput component because datetime and timezone offset calculations require browser context to be accurate
 */
const RelativeTimeRangeInput = dynamic(
  () => import("components/TimeRangeInput"),
  {
    ssr: false,
    loading: () => (
      <css.LoadingContainer>
        <Spinner title="Loading time range select..." />
      </css.LoadingContainer>
    ),
  }
);
const AbsoluteTimeRangeInput = dynamic(
  () => import("components/AbsoluteTimeRangeInput"),
  {
    ssr: false,
    loading: () => (
      <css.LoadingContainer>
        <Spinner title="Loading time range select..." />
      </css.LoadingContainer>
    ),
  }
);

export interface HeroProps extends SectionProps {
  heading: string;
  copy?: string;
  timeRange?: TimeRangeInputProps["timeRange"];
  timeRangeSelectOnly?: TimeRangeInputProps["timeRangeSelectOnly"];
  timeRangeIntervalMinutes?: TimeRangeInputProps["timeRangeIntervalMinutes"];
  autoRefreshTimeIntervalSeconds?: TimeRangeInputProps["autoRefreshTimeIntervalSeconds"];
  onChangeTimeRange?: TimeRangeInputProps["onBlurTimeRange"];
  onChangeAutoRefreshTimeInterval?: TimeRangeInputProps["onChangeAutoRefreshTimeInterval"];
  onChangeWebNotification?: WebNotificationProps["onChange"];
  panelsWebNotification?: WebNotificationProps["panels"];
  webNotification?: boolean;
}

const Hero = ({
  heading,
  copy,
  timeRange,
  timeRangeSelectOnly,
  timeRangeIntervalMinutes,
  autoRefreshTimeIntervalSeconds,
  onChangeTimeRange,
  onChangeAutoRefreshTimeInterval,
  onChangeWebNotification,
  panelsWebNotification,
  webNotification,
  ...props
}: HeroProps) => {
  return (
    <css.Section {...props}>
      <Grid.Container>
        <Grid.Item xs={4} small={4} medium={8} large={8} xl={8}>
          <css.TextContainer>
            <css.Heading level={1} dark dashboard>
              {heading}
            </css.Heading>
            {copy && (
              <css.WrapperCopy>
                <css.Copy dashboard>{copy}</css.Copy>
              </css.WrapperCopy>
            )}
          </css.TextContainer>
        </Grid.Item>
        <Grid.Item xs={4} small={4} medium={4} large={4} xl={4}>
          {webNotification &&
            onChangeWebNotification &&
            panelsWebNotification && (
              <WebNotification
                onChange={onChangeWebNotification}
                panels={panelsWebNotification}
              />
            )}
          {timeRange &&
            timeRangeSelectOnly &&
            onChangeTimeRange &&
            onChangeAutoRefreshTimeInterval && (
              <RelativeTimeRangeInput
                orientation="vertical"
                timeRange={timeRange}
                timeRangeSelectOnly={true}
                timeRangeIntervalMinutes={timeRangeIntervalMinutes}
                autoRefreshTimeIntervalSeconds={autoRefreshTimeIntervalSeconds}
                onBlurTimeRange={onChangeTimeRange}
                onChangeAutoRefreshTimeInterval={
                  onChangeAutoRefreshTimeInterval
                }
              />
            )}

          {timeRange &&
            !timeRangeSelectOnly &&
            onChangeTimeRange &&
            onChangeAutoRefreshTimeInterval && (
              <AbsoluteTimeRangeInput
                orientation="vertical"
                timeRange={timeRange}
                timeRangeIntervalMinutes={timeRangeIntervalMinutes}
                autoRefreshTimeIntervalSeconds={autoRefreshTimeIntervalSeconds}
                onBlurTimeRange={onChangeTimeRange}
                onChangeAutoRefreshTimeInterval={
                  onChangeAutoRefreshTimeInterval
                }
              />
            )}
        </Grid.Item>
      </Grid.Container>
    </css.Section>
  );
};

export default Hero;
