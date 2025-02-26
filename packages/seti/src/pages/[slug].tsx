import { useState } from "react";
import {
  AUTO_REFRESH_INTERVAL_VALUES_SECONDS,
  TIME_RANGE_INTERVAL_VALUES_MINUTES,
  type TimeRange,
} from "utils/dashboards";
import { getDefaultStartAndEndDate } from "utils/hooks/useDatetimeRange";
import useLocalStorage from "utils/hooks/useLocalStorage";
import { LocalStorage } from "data/storage";
import Hero, { type HeroProps } from "components/Hero";
import Dashboard from "components/CollapsibleDashboard";
import { PAGES } from "data/pages";
import { defaultGetStaticProps } from "utils/pageGeneration/defaultGetStaticProps";

type PageProps = typeof PAGES.messaging;

const Page = ({ hero, sections }: PageProps) => {
  const { setItem } = useLocalStorage();
  const [timeRange, setTimeRange] = useState<TimeRange>(
    getDefaultStartAndEndDate({ minutes: 15 })
  );
  const [autoRefreshTimeIntervalSeconds, setAutoRefreshTimeIntervalSeconds] =
    useState<AUTO_REFRESH_INTERVAL_VALUES_SECONDS>(
      AUTO_REFRESH_INTERVAL_VALUES_SECONDS.ZERO
    );
  return (
    <>
      <Hero
        {...(hero as HeroProps)}
        timeRange={timeRange}
        timeRangeSelectOnly={false}
        timeRangeIntervalMinutes={
          TIME_RANGE_INTERVAL_VALUES_MINUTES.FIFTEEN_MINUTES
        }
        autoRefreshTimeIntervalSeconds={autoRefreshTimeIntervalSeconds}
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
      />
      {sections?.map(({ contentType, ratio, ...section }) => {
        return (
          <Dashboard {...section} key={section.code} timeRange={timeRange} />
        );
      })}
    </>
  );
};

export const getStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: Object.keys(PAGES).map((page) => ({ params: { slug: page } })),
  };
};

export const getStaticProps = defaultGetStaticProps({
  page: "[slug]",
  getData: ({ params }) =>
    PAGES[params?.slug as keyof typeof PAGES] || { notFound: true },
});

export default Page;
