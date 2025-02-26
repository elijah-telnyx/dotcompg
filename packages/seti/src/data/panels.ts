import type { CollapsibleDashboardProps } from "components/CollapsibleDashboard";
import overview from "./sections/overview.json";
import missionControl from "./sections/mission-control.json";
import cloudStorage from "./sections/cloud-storage.json";
import voice from "./sections/voice.json";
import sipTrunking from "./sections/sip-trunking.json";
import messaging from "./sections/messaging.json";
import webrtc from "./sections/webrtc.json";
import porting from "./sections/porting.json";
import network from "./sections/network.json";
import inventory from "./sections/inventory.json";

export const PAGE_GROUPED_PANELS = {
  overview: overview as DashboardsPanels,
  missionControl: missionControl as DashboardsPanels,
  cloudStorage: cloudStorage as DashboardsPanels,
  voice: voice as DashboardsPanels,
  sipTrunking: sipTrunking as DashboardsPanels,
  messaging: messaging as DashboardsPanels,
  webrtc: webrtc as DashboardsPanels,
  porting: porting as DashboardsPanels,
  network: network as DashboardsPanels,
  inventory: inventory as unknown as DashboardsPanels,
};

const allPanels = {
  ...overview,
  ...missionControl,
  ...cloudStorage,
  ...voice,
  ...sipTrunking,
  ...messaging,
  ...webrtc,
  ...porting,
  ...network,
  ...inventory,
};

type DashboardPanelId = keyof typeof allPanels;

export type DashboardsPanels = {
  [code in DashboardPanelId]: CollapsibleDashboardProps & {
    ratio?: boolean;
    combined?: boolean;
    contentType?: string;
  };
};

export const PANELS: DashboardsPanels = allPanels as DashboardsPanels;
