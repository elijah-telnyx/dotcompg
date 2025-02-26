/* eslint-disable prettier/prettier */
export type NavItem = {
  title: string;
  href: string;
};

const NavList: NavItem[] = [
  {
    title: "Overview",
    href: "/",
  },
  {
    title: "Mission Control",
    href: "/mission-control",
  },
  {
    title: "Cloud Storage",
    href: "/cloud-storage",
  },
  {
    title: "Programmable Voice",
    href: "/voice",
  },
  {
    title: "SIP Trunking",
    href: "/sip-trunking",
  },
  {
    title: "Messaging",
    href: "/messaging",
  },
  {
    title: "WebRTC",
    href: "/webrtc",
  },
  {
    title: "Porting",
    href: "/porting",
  },
  {
    title: "Network",
    href: "/network",
  },
  {
    title: "Inventory",
    href: "/inventory",
  },
];

export default NavList;
