import type {
  AboutProps,
  CtaBannerProps,
  OverviewHeroProps,
} from "ui/components/@types";

import AcceptablePolicyContent from "./AcceptablePolicyContent";
import CookiePolicyContent from "lib/Static/CookiePolicyContent";
import type { MarkdownSectionProps } from "ui/components/MarkdownSection";

export const getWhyTelnyxPage = () => ({
  hero: {
    heading: "Architect your connectivity",
    copy: "Learn about the problems we solve and the opportunities we create.",
    backgroundColor: "black",
    hasOverflow: false,
    centered: true,
    spacingTop: "contrasting",
    spacingBottom: "contrasting",
    hasPattern: true,
  } as OverviewHeroProps,
  sections: [
    {
      id: "7Ix08lCoZ32HAMnObo3ltb",
      contentType: "sectionAbout",
      tag: "",
      heading: "Our approach",
      copy: `From omnichannel communications to real-time analytics to high-speed content delivery, businesses depend on localized internet, telecommunications and data infrastructure to build the products and services today's customers expect. Yet, this critical infrastructure remains largely inaccessible-it's centralized, expensive and slow. At Telnyx, we're architecting and amplifying access to global connectivity. We power communications, wireless, networking and storage from our private, global, multi-cloud IP network all the way out to the hyperlocal edge. And we make this edge infrastructure easily available through intuitive APIs housed in one space.`,
      spacingTop: "contrasting",
      spacingBottom: "continuous",
      backgroundColor: "cream",
      hasOverflow: true,
    } as AboutProps & { contentType: string },
    {
      id: "7Ix08lCoZ32HAMnObo3lt1",
      contentType: "sectionAbout",
      tag: "",
      heading: "From our secure network",
      copy: `We power communication, wireless, networking and storage from our private, global, multi-cloud IP network.
      Built with 10 multi-cloud points of presence (PoPs) in metro areas across the globe, we offer reliability and resiliency against latency, downtime and packet-loss. We own private fiber interconnects between our PoPs to provide a private highway for your data traffic, ensuring security.`,
      spacingTop: "continuous",
      spacingBottom: "continuous",
      backgroundColor: "black",
      hasOverflow: true,
      reverse: true,
      media: {
        src: "https://images.ctfassets.net/2vm221913gep/1Abh3wSCV1FVwXzA5PSB9u/1eb58eecebda7841e42be7936e0011d4/Group_2591.png",
        alt: "sim card",
      },
    } as AboutProps & { contentType: string },
    {
      id: "7Ix08lCoZ32HAMnObo3lt3",
      contentType: "sectionAbout",
      tag: "",
      heading: "To the hyperlocal edge",
      copy: `From autonomous vehicles to in-hospital patient monitoring to content delivery to smart home devices, the amount of data being generated at “the edge” is growing exponentially. However, the transmission of data is expensive.
      By providing access to edge infrastructure via APIs, we equip developers with cost effective and low-latency solutions to network and communicate that data.
      To learn more about this shift toward the hyperlocal edge, hear from our founder.`,
      spacingTop: "continuous",
      spacingBottom: "continuous",
      backgroundColor: "black",
      hasOverflow: true,
      reverse: false,
      media: {
        src: "https://images.ctfassets.net/2vm221913gep/2JZNxEZJrMZQjyuIoGz7JI/db632a6b93618998f64a0646d5fbd4e3/image.png",
        alt: "sim card",
      },
    } as AboutProps & { contentType: string },
    {
      id: "7Ix08lCoZ32HAMnObo3l123",
      contentType: "sectionAbout",
      tag: "",
      heading: "Powering easy-to-use,  customizable APIs",
      copy: `Speed up build times with our intuitive APIs, SDKs and detailed development documentation. If our out-of-the-box offering doesn’t suit your needs, adapt our APIs with ease.
      Peruse our Products Overview to learn more. Explore Dev Docs to review implementation guidance from our engineering experts.`,
      spacingTop: "continuous",
      spacingBottom: "continuous",
      backgroundColor: "black",
      hasOverflow: true,
      reverse: true,
      media: {
        src: "https://images.ctfassets.net/2vm221913gep/21Aq3Lkk8RCmll8ZKp4iWV/7942fd6437648aa41a7d10ac953b5963/Storage-2_AccessFiles-_2x__1.png",
        alt: "sim card",
      },
    } as AboutProps & { contentType: string },
    {
      id: "7Ix08lCoZ32HAMnObo3lt4",
      contentType: "sectionAbout",
      tag: "",
      heading: "Housed in a single platform",
      copy: `Historically, companies require multiple vendors to provide every type of infrastructure necessary to implement connectivity for their business. They manage an onerous number of aggregators and direct relationships, juggle multiple connectivity partners, or build and maintain their own bespoke infrastructure.
      Our holistic approach simplifies the complexity. We empower businesses of all sizes with a one-stop shop for infrastructure via our Mission Control Portal.`,
      spacingTop: "continuous",
      spacingBottom: "continuous",
      backgroundColor: "black",
      hasOverflow: true,
      reverse: false,
      media: {
        src: "https://images.ctfassets.net/2vm221913gep/512mKqQVu5nXMY8j7tSiVD/2a0618ea3237291d33ddc14c4aa1ed06/Group_2566.png",
        alt: "sim card",
      },
    } as AboutProps & { contentType: string },
    {
      id: "7Ix08lCoZ32HAMnObo3lt8",
      contentType: "sectionAbout",
      tag: "",
      heading: "With world-class support at the ready",
      copy: `Build with confidence knowing our support team is available 24/7 to assist you.
      Not sure what the right solution is for your business? Talk to an expert to design a solution that works best for you.`,
      spacingTop: "continuous",
      spacingBottom: "contrasting",
      backgroundColor: "black",
      hasOverflow: true,
      reverse: true,
      media: {
        src: "https://images.ctfassets.net/2vm221913gep/3ap1rQxeeLUkIEhL356l9j/70c05e41253119498907ce6abcbe1e5e/Group_2589.png",
        alt: "sim card",
      },
    } as AboutProps & { contentType: string },
    {
      id: "7Ix08lCoZ32HAMnObo3lt5",
      contentType: "sectionCtaBanner",
      heading: "Sign up and start building.",
      backgroundColor: "green",
      ctaButtons: [
        { text: "Sign up", href: "#signup", type: "button" },
        {
          text: "Contact us",
          href: "#contactus",
          type: "button",
          buttonKind: "secondary",
        },
      ],
    } as CtaBannerProps & { contentType: string },
  ],
});

export const getCookiePolicyPage = () => ({
  hero: {
    heading: "EverRoam Cookie Policy",
    backgroundColor: "cream",
    hasOverflow: false,
    centered: false,
    spacingTop: "contrasting",
    spacingBottom: "continuous",
  } as OverviewHeroProps,
  markdownSection: {
    copy: CookiePolicyContent,
    backgroundColor: "cream",
    hasOverflow: false,
    spacingTop: "none",
    spacingBottom: "none",
  } as MarkdownSectionProps,
});

export const getAcceptablePolicyPage = () => ({
  hero: {
    heading: "Acceptable Use Policy",
    backgroundColor: "cream",
    hasOverflow: false,
    centered: false,
    spacingTop: "contrasting",
    spacingBottom: "continuous",
  } as OverviewHeroProps,
  markdownSection: {
    copy: AcceptablePolicyContent,
    backgroundColor: "cream",
    hasOverflow: false,
    spacingTop: "none",
    spacingBottom: "none",
  } as MarkdownSectionProps,
});
