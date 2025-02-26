import { useState } from "react";
import { IS_PRODUCTION } from "env";
import { LocalStorage } from "data/storage";
import { PAGES } from "data/pages";
import { defaultGetStaticProps } from "utils/pageGeneration/defaultGetStaticProps";
import { getDefaultStartAndEndDate } from "utils/hooks/useDatetimeRange";
import useLocalStorage from "utils/hooks/useLocalStorage";
import Hero, { type HeroProps } from "components/Hero";
import MetaCopy from "components/MetaCopy";
import Dashboard from "components/CollapsibleDashboard";
import {
  AUTO_REFRESH_INTERVAL_VALUES_SECONDS,
  TIME_RANGE_INTERVAL_VALUES_MINUTES,
  getDefaultPanelsWebNotification,
  type TimeRange,
} from "utils/dashboards";

type HomePageProps = typeof PAGES.overview;

const HomePage = ({
  hero: { displayTimeRange, ...hero },
  sections,
}: HomePageProps) => {
  const { setItem } = useLocalStorage();
  const [timeRange, setTimeRange] = useState<TimeRange>(
    getDefaultStartAndEndDate(displayTimeRange)
  );
  const [autoRefreshTimeIntervalSeconds, setAutoRefreshTimeIntervalSeconds] =
    useState<AUTO_REFRESH_INTERVAL_VALUES_SECONDS>(
      AUTO_REFRESH_INTERVAL_VALUES_SECONDS.ZERO
    );
  const panelsWebNotification = getDefaultPanelsWebNotification(sections);
  return (
    <>
      <Hero
        {...(hero as HeroProps)}
        timeRange={timeRange}
        timeRangeIntervalMinutes={
          TIME_RANGE_INTERVAL_VALUES_MINUTES.FIFTEEN_MINUTES
        }
        autoRefreshTimeIntervalSeconds={autoRefreshTimeIntervalSeconds}
        panelsWebNotification={panelsWebNotification}
        onChangeTimeRange={(timeRange) => {
          setTimeRange(timeRange);
        }}
        onChangeAutoRefreshTimeInterval={(autoRefreshTimeInterval) => {
          setAutoRefreshTimeIntervalSeconds(autoRefreshTimeInterval);
          setItem(
            LocalStorage.AUTO_REFRESH_TIME_INTERVAL,
            autoRefreshTimeInterval
          );
        }}
        onChangeWebNotification={(enabled) => {
          const autoRefreshTimeInterval = enabled
            ? AUTO_REFRESH_INTERVAL_VALUES_SECONDS.SIXTY
            : AUTO_REFRESH_INTERVAL_VALUES_SECONDS.ZERO;

          setAutoRefreshTimeIntervalSeconds(autoRefreshTimeInterval);
          setItem(
            LocalStorage.AUTO_REFRESH_TIME_INTERVAL,
            autoRefreshTimeInterval
          );
        }}
        webNotification
      />
      {!IS_PRODUCTION && <MetaCopy />}
      {sections.map(({ contentType, ratio, ...section }) => {
        return (
          <Dashboard {...section} key={section.code} timeRange={timeRange} />
        );
      })}
    </>
  );
};

export const getStaticProps = defaultGetStaticProps({
  page: "homepage",
  getData: () => PAGES.overview,
});

export default HomePage;
