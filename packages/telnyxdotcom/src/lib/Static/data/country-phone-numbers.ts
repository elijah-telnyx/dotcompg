import countryNumberData, { type CountryType, BLOGARTICLECONSTANTS, testimonials } from './countryNumberData';
import { availabilityFormula } from 'utils/availabilityFormula';
import type { MetaTagsProps } from 'components/MetaTags';
import type { AvailableNumbersHeroProps } from 'components/AvailableNumbersHero';
import type {
  CustomerLogosProps,
  ColorfulCardsProps,
  TextCardsProps,
  HowItWorksProps,
  CtaBannerProps,
  SecondaryCarouselSectionProps,
  FaqProps,
  LinksDirectorySectionProps,
  TestimonialsProps,
} from 'ui/components/@types';
import type { AvailabilitySectionProps } from 'components/AvailabilitySection';
import type { WhySectionProps } from 'components/PhoneNumbersSections/WhySection';
import type { MarkdownSectionProps } from 'components/PhoneNumbersSections/MarkdownSection';
import directoryLinks from 'utils/directoryLinks';
import { getPhoneNumberHeroMedia } from './phone-numbers/methods';
import { getFirstCharacter } from 'utils/string';

export const FormattedNumberCopy = (available: string) => {
  if (+available > 9999) {
    return `${Math.floor(+available / 1000)}K+`;
  }
  return `${available}+`;
};

const seo = ({ name }: CountryType) =>
  ({
    title: `Buy ${name} virtual phone numbers`,
    description: `Start connecting with customers in ${name} with Telnyx. ${name} phone numbers start at just $1 and are loaded with features you won’t find anywhere else. Start dialing in minutes.`,
  } as MetaTagsProps);

const hero = async ({ name, demonym }: CountryType) => {
  const country_code = countryNumberData.find((country) => country.name === name)?.alpha2;
  const media = await getPhoneNumberHeroMedia({ country_code, name });

  return {
    backgroundColor: 'black',
    heading: `${name} virtual phone numbers`,
    copy: `Expand your reach in ${name} without boundaries with a global virtual phone number from Telnyx. Our ${demonym} numbers are feature-packed and AI-ready.`,
    boxDefault: `Search for ${demonym} phone numbers`,
    country_code,
    media,
  } as AvailableNumbersHeroProps;
};

const sections = (
  { name, dialingCode, demonym, available, activeFeatureItems, metro }: CountryType,
  countryNumberCount: string
) => {
  const cardItems = [];

  if (+countryNumberCount) {
    cardItems.push({
      id: '1',
      title: `Establish presence in ${name}`,
      leadingText: `Don't stunt your growth. Meet your ${name} customers where they are by procuring numbers seamlessly in Mission Control.`,
      highlightTitle: FormattedNumberCopy(countryNumberCount),
      highlightText: `Local numbers available in ${name}`,
    });
  }

  if (available && name === 'United States') {
    cardItems.push({
      id: '2',
      title: `HD Voice in ${name}`,
      leadingText: 'Experience crystal-clear conversations with Telnyx HD Voice—unrivaled clarity in every call.',
      highlightTitle: available,
      highlightText: `HD Voice-enabled numbers in ${name}`,
    });
  }

  if (metro) {
    metro.map((m) => {
      m.countDisplay = availabilityFormula(m.count);
    });
  }

  const pageLayoutData = {
    links: {
      title: 'Buy Global Numbers',
      directoryLinksTabs: directoryLinks(countryNumberData, name),
      currentDirectory: getFirstCharacter(name),
    } as LinksDirectorySectionProps,
    metro: {
      heading: `${name} Availability`,
      copy: `${name}'s country code is ${dialingCode}. Local numbers are available in multiple area codes from Telnyx.`,
      tagline: `AVAILABILITY`,
      metro,
    } as AvailabilitySectionProps | undefined,
    logos: {
      title: 'Country Numbers - Logos',
      copy: 'Trusted by over 50,000 businesses, from fast-growing startups to world-class institutions.',
      infiniteAnimation: true,
      logos: [
        {
          title: 'Lightspeed Logo',
          media: {
            src: '//images.ctfassets.net/2vm221913gep/PBJJnufqJGA8detN8cD8D/1b39b26fc93b5976301cfbf0b7a7840e/Numbers_Logo_Lightspeed.svg',
            alt: 'Customer Logo Lightspeed',
            height: 72,
            width: 256,
            svg:
              '<svg width="256" height="72" viewBox="0 0 256 72" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
              '<g clip-path="url(#clip0_1270_6650)">\n' +
              '<path d="M54.69 15.9355L56.5172 19.1622C56.8827 19.8297 56.8827 20.6457 56.5172 21.3132L45.6268 40.4875L50.7797 49.5368C51.5837 50.9462 53.082 51.8363 54.69 51.8363C56.298 51.8363 57.7963 50.9462 58.6003 49.5368L63.7532 40.4875L62.401 38.0397L56.5538 48.313C56.1883 48.9805 55.4574 49.3885 54.7265 49.3885C53.9591 49.3885 53.2647 48.9805 52.8993 48.313L48.4042 40.4875L58.5272 22.6855L60.3545 25.9121C60.7199 26.5797 60.7199 27.3956 60.3545 28.0632L53.3013 40.4875L54.69 42.9353L62.3645 29.4354L67.4077 38.2993C68.1751 39.6716 68.1751 41.3405 67.4077 42.7127L62.2914 51.725C61.5239 53.0973 59.0754 56.1755 54.69 56.1755C50.3046 56.1755 47.8926 53.0973 47.0886 51.725L41.9723 42.7127C41.2049 41.3405 41.2049 39.6716 41.9723 38.2993L54.69 15.9355Z" fill="#000000"/>\n' +
              '<path d="M78.4814 25.5415H82.0263V46.7927H78.4814V25.5415Z" fill="#000000"/>\n' +
              '<path d="M86.7769 29.4355C87.9274 29.4355 88.86 28.489 88.86 27.3215C88.86 26.154 87.9274 25.2075 86.7769 25.2075C85.6265 25.2075 84.6938 26.154 84.6938 27.3215C84.6938 28.489 85.6265 29.4355 86.7769 29.4355Z" fill="#000000"/>\n' +
              '<path d="M84.9863 32.0318H88.5677V46.7926H84.9863V32.0318ZM97.9598 31.6609C93.9033 31.6609 90.6143 34.5538 90.6143 39.1526C90.6143 43.7515 93.4648 46.5701 97.9964 46.5701C99.7871 46.5701 101.687 47.4973 101.687 49.5371C101.687 51.5769 100.079 52.7266 97.9964 52.7266C95.9133 52.7266 94.1957 51.4657 94.1957 49.5371H90.6143C90.6143 53.5055 93.7571 56.1387 97.9964 56.1387C102.199 56.1387 105.269 53.6167 105.269 49.5371C105.269 47.6456 104.684 45.8654 102.272 44.6416C104.648 43.5289 105.342 40.9699 105.342 39.1155C105.342 34.5538 102.016 31.6609 97.9598 31.6609ZM97.9964 43.566C95.9133 43.566 94.1957 41.7487 94.1957 39.1526C94.1957 36.5936 95.9133 34.7021 97.9964 34.7021C100.079 34.7021 101.761 36.6307 101.761 39.1526C101.761 41.7116 100.043 43.566 97.9964 43.566ZM115.721 31.6609C114.076 31.6609 112.505 32.1801 111.189 33.8491V25.5044H107.608V46.7555H111.189V39.2639C111.189 37.0757 112.651 35.2584 114.771 35.2584C116.671 35.2584 118.06 36.4081 118.06 39.0784V46.7555H121.641V38.8188C121.678 34.4796 119.85 31.6609 115.721 31.6609ZM130.375 44.2707C129.937 44.2707 129.571 44.1223 129.352 43.8256C129.133 43.5289 129.023 43.0839 129.023 42.4163V35.1472H131.91L132.239 31.9947H129.06V27.9522L125.442 28.3601V32.0318H122.701V35.1842H125.442V42.5276C125.442 44.0482 125.807 45.1979 126.502 45.9767C127.196 46.7555 128.256 47.1635 129.608 47.1635C130.229 47.1635 130.814 47.0893 131.435 46.9039C132.056 46.7185 132.605 46.4588 133.08 46.1251L131.837 43.7885C131.362 44.1223 130.85 44.2707 130.375 44.2707ZM145.103 38.8559C143.641 37.9287 141.924 37.8175 140.242 37.7062C139.256 37.632 137.757 37.4095 137.757 36.1114C137.757 35.1842 138.708 34.665 140.425 34.665C141.814 34.665 143.02 34.9988 144.043 35.9631L146.053 33.5895C144.372 32.106 142.654 31.6609 140.352 31.6609C137.684 31.6609 134.176 32.8477 134.176 36.2598C134.176 37.6691 134.907 38.9672 136.113 39.7089C137.465 40.5619 139.219 40.6732 140.718 40.8586C141.741 40.9699 143.422 41.2295 143.13 42.6759C142.947 43.6773 141.741 43.974 140.9 44.0111C139.987 44.0482 139.073 43.974 138.159 43.7515C137.209 43.4918 136.442 43.0468 135.601 42.4905L133.774 44.827C133.884 44.9012 133.993 45.0124 133.993 45.0124C136.332 46.9781 139.585 47.6086 142.545 46.941C144.774 46.4218 146.674 44.7899 146.674 42.3421C146.747 40.9699 146.309 39.5977 145.103 38.8559ZM156.907 31.6609C155.262 31.6609 153.326 32.3656 152.193 33.9974L152.083 31.9947H148.611V53.2459L152.193 52.8379V45.0495C153.216 46.6443 155.445 47.1635 156.98 47.1635C161.621 47.1635 164.326 43.6402 164.326 39.3751C164.326 35.0359 161.366 31.6609 156.907 31.6609ZM156.615 44.0111C154.166 44.0111 152.522 41.7487 152.522 39.4493C152.522 37.1499 154.056 34.7021 156.615 34.7021C159.209 34.7021 160.708 37.187 160.708 39.4493C160.744 41.7487 159.063 44.0111 156.615 44.0111ZM169.003 40.7103C169.405 42.4534 170.977 43.974 173.535 43.974C174.851 43.974 176.605 43.3064 177.445 42.4534L179.748 44.7528C178.213 46.3476 175.691 47.1264 173.498 47.1264C168.967 47.1264 165.678 44.0852 165.678 39.3751C165.678 34.9246 169.077 31.6609 173.243 31.6609C177.628 31.6609 181.283 34.7021 180.917 40.7103H169.003ZM177.445 37.9287C177.043 36.1856 175.326 34.665 173.243 34.665C171.306 34.665 169.515 36.0002 169.003 37.9287H177.445ZM185.595 40.7103C185.997 42.4534 187.568 43.974 190.126 43.974C191.442 43.974 193.196 43.3064 194.037 42.4534L196.339 44.7528C194.804 46.3476 192.283 47.1264 190.09 47.1264C185.558 47.1264 182.269 44.0852 182.269 39.3751C182.269 34.9246 185.668 31.6609 189.834 31.6609C194.22 31.6609 197.874 34.7021 197.509 40.7103H185.595ZM194.073 37.9287C193.671 36.1856 191.954 34.665 189.871 34.665C187.934 34.665 186.143 36.0002 185.631 37.9287H194.073ZM206.17 47.1635C207.814 47.1635 209.751 46.4588 210.884 44.827L210.994 46.7926H214.465V25.5415H210.884V33.7749C209.861 32.1801 207.595 31.698 206.06 31.698C201.419 31.698 198.751 35.1842 198.751 39.4864C198.751 43.7885 201.711 47.1635 206.17 47.1635ZM206.426 34.8134C208.874 34.8134 210.519 37.0757 210.519 39.3751C210.519 41.6746 208.984 44.1223 206.426 44.1223C203.831 44.1223 202.333 41.6375 202.333 39.3751C202.333 37.0757 203.977 34.8134 206.426 34.8134Z" fill="#000000"/>\n' +
              '</g>\n' +
              '<defs>\n' +
              '<clipPath id="clip0_1270_6650">\n' +
              '<rect width="173.589" height="40.8" fill="white" transform="translate(41.2056 15.6001)"/>\n' +
              '</clipPath>\n' +
              '</defs>\n' +
              '</svg>\n',
          },
        },
        {
          title: 'Ooma - Logo',
          media: {
            src: '//images.ctfassets.net/2vm221913gep/7GatUOzxlJxkH7gsPW59nM/997fac3cb20abc73b548aba23eb0f90e/Numbers_Logo_Ooma.svg',
            alt: 'Customer Logo Ooma',
            height: 72,
            width: 256,
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="72" fill="#000000" xmlns:v="https://vecta.io/nano"><path d="M122.904 39.455c0 6.91-5.551 12.439-12.409 12.439-6.749 0-12.409-5.528-12.409-12.439 0-6.804 5.552-12.226 12.409-12.226s12.409 5.422 12.409 12.226zm-20.355.106c0 4.465 3.592 8.186 7.946 8.186s7.946-3.615 7.946-8.186c0-4.465-3.592-8.08-7.946-8.08s-7.946 3.615-7.946 8.08zm-22.532 7.655c-6.204 0-11.211-4.89-11.211-11.163 0-6.379 4.898-11.375 11.103-11.375 6.531 0 11.429 4.89 11.429 11.375 0 6.166-5.007 11.163-11.32 11.163zm0-27.216c-8.926 0-16.001 7.123-16.001 16.053 0 8.718 7.184 15.841 16.11 15.841 8.817 0 16.001-7.123 16.001-15.841 0-9.037-7.075-16.053-16.11-16.053zm70.752 7.229c-3.483 0-6.095 1.382-7.619 4.04 0 0 0 .106-.109.106s-.109 0-.109-.106c-.871-2.233-4.027-4.04-6.966-4.04-1.524 0-3.048.319-4.245.957-1.307.638-2.286 1.914-2.83 3.189 0 .106-.218 0-.109 0l.109-.744c.108-.532.217-1.063.217-1.595v-1.063c0-.106 0-.106-.109-.106h-3.918c-.109 0-.109 0-.109.106V51.15c0 .106.109.106.109.106h4.354c.109 0 .109 0 .109-.106V36.904c0-2.977 2.503-5.422 5.551-5.422 2.939.106 5.334 2.552 5.334 5.422v-.106V51.15c0 .106 0 .106.108.106h4.137c.109 0 .109 0 .109-.106V36.904c0-2.977 2.503-5.422 5.551-5.422 2.939.106 5.334 2.552 5.334 5.422v-.106V51.15c0 .106 0 .106.108.106h4.028c.109 0 .109-.106.109-.106V37.01c.109-5.953-3.375-9.781-9.144-9.781zm35.81.638h-3.701c-.108 0-.108 0-.108.106v.532.106c0 .638 0 1.169.108 1.807l.109 1.063c0 .106-.109.106-.109 0-1.741-2.764-5.333-4.146-8.381-4.146-6.749 0-12.409 5.422-12.409 12.226v.106.106c0 6.804 5.551 12.226 12.409 12.226 3.048 0 6.64-1.488 8.381-4.146 0-.106.109 0 .109 0l-.109 1.063c-.108.532-.108 1.169-.108 1.807v.106.532c0 .106 0 .106.108.106h3.701c.109 0 .109 0 .109-.106l-.109-23.495c.109.106.109 0 0 0zm-4.027 11.695c0 4.465-3.592 8.08-7.946 8.08-4.463 0-7.946-3.615-7.946-8.08s3.592-8.08 7.946-8.08 7.946 3.615 7.946 8.08zm8.926-14.459c0-.425-.326-.638-.762-.638h-.871v2.02h.218v-.744h.327l.653.744h.326l-.762-.744c.653 0 .871-.319.871-.638zm-.762.425h-.544v-.851h.544c.218 0 .436.106.436.425.108.213-.109.425-.436.425z"/><path d="M190.61 23.721c-1.089 0-1.851.744-1.851 1.807s.762 1.807 1.851 1.807 1.85-.744 1.85-1.807-.762-1.807-1.85-1.807zm1.632 1.807c0 .851-.761 1.488-1.632 1.488s-1.633-.638-1.633-1.488.762-1.488 1.633-1.488c.871-.106 1.632.638 1.632 1.488z"/></svg>',
          },
        },
        {
          title: 'Upmarket - Logo',
          media: {
            src: '//images.ctfassets.net/2vm221913gep/17NKKYwXePZCFOtXfzb9xm/e3f6ed4c2ae11a05890d15eadcdd6a83/Numbers_Logo_Upmarket.svg',
            alt: 'Customer Logo Upmarket',
            height: 72,
            width: 256,
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="72" fill="none" xmlns:v="https://vecta.io/nano"><mask id="A" maskUnits="userSpaceOnUse" x="2" y="16" width="252" height="40"><path d="M254 16H2v39.366h252V16z" fill="#fff"/></mask><g mask="url(#A)"><path d="M65.462 25.007v11.094c0 3.251 1.402 4.891 4.384 4.891 2.863.03 4.801-2.416 4.801-5.159V24.977h6.084v21.025h-5.577l-.209-2.744c-1.909 2.505-4.294 3.251-6.859 3.191-4.772 0-8.827-2.117-8.827-10.319V24.947l6.203.06zm19.743 30.359v-30.33h5.487l.388 2.684c1.968-2.535 4.354-3.072 6.978-3.072 6.173 0 10.378 4.354 10.378 10.915s-4.324 10.945-10.467 10.945c-2.207 0-4.801-.775-6.591-2.982v11.84h-6.173zm17.058-19.802c0-3.042-1.879-5.428-5.159-5.428-2.773 0-5.666 1.402-5.666 5.428 0 3.519 2.863 5.428 5.666 5.428 3.161 0 5.159-2.267 5.159-5.428zm23.142 10.527V34.699c0-2.803-1.133-4.622-3.638-4.622s-3.817 2.266-3.817 4.682v11.332h-6.203V24.827h5.427l.418 2.416c1.312-2.326 3.758-2.893 5.577-2.893 2.326 0 4.801.865 6.173 3.966 1.909-2.893 3.907-3.996 7.038-3.996 4.444 0 8.44 2.237 8.44 10.14v11.631h-6.203V34.609c0-2.684-.746-4.444-3.221-4.444s-3.907 2.117-3.907 4.503V46.06l-6.084.03zm39.903-21.263h5.785v21.114h-5.547l-.328-2.654c-1.401 2.237-4.443 3.072-6.501 3.101-6.322.03-10.885-4.056-10.885-11.034s4.801-11.124 11.064-11.034c2.654 0 5.13 1.044 6.233 2.893l.179-2.386zm-11.362 10.587c0 3.519 2.475 5.547 5.546 5.547 3.46 0 5.607-2.684 5.607-5.338 0-3.042-1.909-5.815-5.607-5.815-3.071 0-5.546 2.088-5.546 5.607zm27.048-10.558l.448 2.296c1.401-1.968 3.28-2.833 5.636-2.833 1.998 0 3.698.596 5.189 1.909l-2.564 4.861c-1.044-.716-2.088-1.074-3.37-1.074-2.655 0-4.921 1.7-4.921 4.861v10.945h-6.143V24.827l5.725.03zM199.932 16v17.029l6.263-8.231h7.246v.388l-7.724 9.513 8.917 10.676v.447h-7.396l-7.336-9.245v9.245h-6.143V16h6.173zm20.637 21.472c.298 2.028 2.266 3.698 5.756 3.698 1.67 0 3.966-.388 5.487-1.67l3.489 3.817c-2.266 2.207-5.934 3.102-9.066 3.102-7.664 0-11.899-4.473-11.899-11.213 0-6.382 4.324-10.855 11.243-10.855s11.929 4.473 10.617 13.092l-15.627.03zm10.02-4.503c-.119-2.296-2.475-3.37-5.07-3.37s-4.383 1.282-4.98 3.37h10.05zm17.029-13.987v5.935h5.398v5.13h-5.458v7.963c0 2.237 1.253 2.833 2.446 2.833.745 0 1.908-.179 2.594-.507l1.432 5.13c-1.581.626-2.804.865-4.503.954-4.623.209-8.112-1.789-8.112-8.41v-7.963h-3.817v-5.129h3.787v-5.219l6.233-.716zM33.045 39.619c-.209-1.044-.686-2.028-1.491-2.833L25.768 31l-4.324-4.324c-1.044-1.014-2.386-1.581-3.847-1.581s-2.833.567-3.847 1.581L3.61 36.816c-2.117 2.117-2.117 5.577 0 7.694 1.074 1.044 2.445 1.581 3.847 1.581a5.44 5.44 0 0 0 3.847-1.581l5.636-5.636c.358-.358.954-.358 1.312 0l5.607 5.636c.268.268.537.507.865.686l.626.358c.179.089.358.149.567.239.06.03.119.03.179.06l.149.06.388.089c.358.089.716.119 1.104.119.626 0 1.223-.09 1.789-.298.239-.09.447-.149.656-.268.268-.119.507-.298.775-.477.119-.09.209-.149.328-.268.089-.09.209-.179.298-.268l.03-.03.03-.03c1.252-1.342 1.7-3.161 1.402-4.861zm-3.698 3.608c-.03.03-.089.06-.119.09-.06.03-.09.06-.149.089a1.06 1.06 0 0 1-.268.119c-.06.03-.089.03-.119.06-.06.03-.119.03-.179.06s-.119.03-.209.06c-.03 0-.06 0-.06.03-.09.03-.179.03-.268.03a2 2 0 0 1-.597 0c-.089-.03-.209-.03-.298-.06-.209-.03-.388-.09-.567-.149-.09-.03-.179-.09-.268-.119a2.77 2.77 0 0 1-.388-.239 1.49 1.49 0 0 1-.239-.209c-.03-.03-.09-.06-.119-.119l-3.191-3.221-2.445-2.445c-.656-.656-1.491-.984-2.356-.984s-1.7.328-2.356.984L9.604 42.81a3.06 3.06 0 0 1-4.324 0 3.06 3.06 0 0 1 0-4.324l10.11-10.14c.596-.596 1.342-.895 2.177-.895s1.581.328 2.177.895l10.11 10.14a3.06 3.06 0 0 1 0 4.324c-.149.179-.328.298-.507.418zm22.337-6.412l-10.11-10.14c-1.044-1.044-2.386-1.61-3.847-1.61s-2.803.567-3.847 1.61l-5.487 5.458 1.7 1.7 5.457-5.457c.567-.596 1.342-.895 2.177-.895s1.581.328 2.177.895l10.11 10.14c.567.596.895 1.342.895 2.177s-.328 1.581-.895 2.177a3.06 3.06 0 0 1-4.324 0l-5.607-5.607c-1.282-1.282-3.37-1.282-4.682 0l-2.416 2.445-3.221 3.102a3.01 3.01 0 0 1-.477.388c-.03.03-.089.06-.119.09-.06.03-.09.06-.149.089-.089.06-.179.09-.268.119-.03.03-.089.03-.119.06-.06.03-.119.03-.179.06s-.119.03-.209.06c-.03 0-.06 0-.06.03-.089.03-.179.03-.268.03a1.98 1.98 0 0 1-.596 0c-.09-.03-.209-.03-.298-.06-.209-.03-.388-.089-.567-.149-.09-.03-.179-.089-.268-.119a2.77 2.77 0 0 1-.388-.239 1.5 1.5 0 0 1-.239-.209c-.03-.03-.089-.06-.119-.119-.567-.596-.895-1.342-.895-2.177s.328-1.581.895-2.177l1.342-1.342-1.67-1.7-1.342 1.342c-.775.775-1.282 1.759-1.491 2.833a5.82 5.82 0 0 0-.09 1.014c0 1.461.567 2.803 1.61 3.847.268.268.537.507.865.686l.626.358c.179.09.358.149.567.239.06.03.119.03.179.06s.09.03.149.06l.388.089a4.47 4.47 0 0 0 1.103.119c.626 0 1.223-.089 1.789-.298.239-.09.447-.149.656-.269.268-.119.507-.298.775-.477.119-.089.209-.149.328-.268.09-.089.209-.179.298-.298l.03-.03.03-.03 5.547-5.547c.358-.358.954-.358 1.312 0l5.607 5.607c2.117 2.117 5.577 2.117 7.694 0 1.044-1.044 1.61-2.386 1.61-3.847s-.626-2.803-1.67-3.817zM27.647 21.159c2.177 0 3.937 1.76 3.937 3.907s-1.76 3.937-3.937 3.937-3.937-1.76-3.937-3.907 1.76-3.937 3.937-3.937z" fill="#000000"/></g></svg>',
          },
        },
        {
          title: 'Cisco - Logo',
          media: {
            src: '//images.ctfassets.net/2vm221913gep/4z1VK1aAvFMJ2HJtZ2rzbO/7cb534e4457858d7922bd5ad8a306554/Numbers_Logo_Cisco.svg',
            alt: 'Customer Logo Cisco',
            height: 72,
            width: 256,
            svg: '<svg xmlns="http://www.w3.org/2000/svg" width="256" height="72" fill="#000000" xmlns:v="https://vecta.io/nano"><path d="M111.134 44.539h-4.391V61.51h4.391V44.539zm35.418 4.86c-1.136-.597-2.406-.908-3.697-.904-2.836 0-4.809 1.927-4.809 4.525 0 2.521 1.887 4.529 4.809 4.529a7.91 7.91 0 0 0 3.697-.9V61.2c-1.297.391-2.646.595-4.003.605-4.941 0-9.276-3.319-9.276-8.788 0-5.068 3.924-8.785 9.276-8.785 1.358.004 2.708.209 4.003.608v4.558zm-45.848 0a7.82 7.82 0 0 0-3.689-.904c-2.844 0-4.814 1.927-4.814 4.525 0 2.521 1.869 4.529 4.814 4.529a7.85 7.85 0 0 0 3.689-.9V61.2a14.16 14.16 0 0 1-4.003.605c-4.941 0-9.272-3.319-9.272-8.788 0-5.068 3.924-8.785 9.272-8.785a13.67 13.67 0 0 1 4.003.608v4.558zm68.865 3.622c0 4.853-3.845 8.788-9.201 8.788s-9.19-3.935-9.19-8.788 3.838-8.785 9.19-8.785 9.201 3.939 9.201 8.785zm-9.201-4.463a4.67 4.67 0 0 0-2.556.735c-.758.487-1.351 1.182-1.704 1.998s-.448 1.715-.275 2.584a4.43 4.43 0 0 0 1.246 2.297 4.62 4.62 0 0 0 2.346 1.232 4.69 4.69 0 0 0 2.653-.25c.839-.337 1.557-.911 2.062-1.646a4.4 4.4 0 0 0 .773-2.486c.012-.587-.096-1.17-.32-1.715s-.557-1.04-.981-1.457a4.49 4.49 0 0 0-1.487-.967 4.59 4.59 0 0 0-1.757-.324zm-32.573-.165a15.61 15.61 0 0 0-3.435-.517c-1.76 0-2.717.576-2.717 1.392 0 1.035 1.29 1.396 2.015 1.618l1.21.364c2.852.882 4.149 2.787 4.149 4.853 0 4.263-3.846 5.695-7.206 5.695a27.04 27.04 0 0 1-4.742-.463V57.44c1.35.381 2.744.593 4.148.63 2.186 0 3.192-.623 3.192-1.585 0-.86-.871-1.355-1.959-1.691l-.938-.295c-2.448-.751-4.484-2.153-4.484-4.962 0-3.173 2.44-5.305 6.488-5.305a19.41 19.41 0 0 1 4.282.539l-.003 3.622zM82.772 26.299a2.1 2.1 0 0 0-.67-1.447c-.407-.38-.948-.592-1.511-.592s-1.105.212-1.511.592a2.11 2.11 0 0 0-.67 1.447v4.456a2.1 2.1 0 0 0 .67 1.447c.407.38.948.592 1.511.592s1.105-.212 1.511-.592a2.11 2.11 0 0 0 .67-1.447v-4.456zm11.977-5.848a2.1 2.1 0 0 0-.67-1.447c-.407-.38-.948-.592-1.511-.592s-1.105.212-1.511.592a2.11 2.11 0 0 0-.67 1.447v10.304a2.1 2.1 0 0 0 .67 1.447c.407.38.948.592 1.511.592s1.105-.212 1.511-.592a2.11 2.11 0 0 0 .67-1.447V20.451zm11.978-7.997c-.023-.549-.263-1.067-.669-1.447s-.948-.592-1.511-.592a2.21 2.21 0 0 0-1.511.592 2.1 2.1 0 0 0-.67 1.447v22.535a2.1 2.1 0 0 0 .67 1.447 2.21 2.21 0 0 0 1.511.592c.563 0 1.104-.212 1.511-.592a2.1 2.1 0 0 0 .669-1.447V12.454zm11.979 7.997a2.11 2.11 0 0 0-.67-1.447c-.406-.38-.948-.592-1.511-.592s-1.105.212-1.511.592a2.11 2.11 0 0 0-.67 1.447v10.304a2.11 2.11 0 0 0 .67 1.447 2.21 2.21 0 0 0 3.022 0 2.11 2.11 0 0 0 .67-1.447V20.451zm11.966 5.848c-.023-.547-.262-1.063-.667-1.442s-.945-.59-1.506-.59-1.101.211-1.506.59-.644.896-.667 1.442v4.456a2.07 2.07 0 0 0 .139.838 2.1 2.1 0 0 0 .464.718c.203.206.447.37.717.483a2.21 2.21 0 0 0 .853.17c.293 0 .583-.058.853-.17s.514-.276.717-.483a2.1 2.1 0 0 0 .464-.718 2.07 2.07 0 0 0 .139-.838v-4.456zm11.986-5.843c0-.562-.229-1.102-.637-1.5s-.961-.621-1.538-.621-1.13.223-1.538.621-.637.937-.637 1.5v10.3a2.09 2.09 0 0 0 .637 1.499c.408.397.961.621 1.538.621s1.13-.223 1.538-.621.637-.937.637-1.499v-10.3zm11.985-8.002c0-.562-.23-1.102-.637-1.499s-.962-.621-1.538-.621a2.2 2.2 0 0 0-1.538.621c-.408.398-.638.937-.638 1.499v22.535c0 .562.23 1.102.638 1.499a2.2 2.2 0 0 0 1.538.621c.576 0 1.13-.223 1.538-.621s.637-.937.637-1.499V12.454zm11.984 8.001a2.11 2.11 0 0 0-.672-1.452 2.22 2.22 0 0 0-3.032 0 2.11 2.11 0 0 0-.672 1.452v10.3a2.11 2.11 0 0 0 .672 1.453 2.22 2.22 0 0 0 3.032 0 2.11 2.11 0 0 0 .672-1.453v-10.3zm11.96 5.844a2.1 2.1 0 0 0-.668-1.445 2.21 2.21 0 0 0-3.017 0 2.1 2.1 0 0 0-.669 1.445v4.456a2.08 2.08 0 0 0 .139.839c.104.268.263.512.466.719a2.16 2.16 0 0 0 .718.483c.271.112.561.17.854.17a2.23 2.23 0 0 0 .855-.17 2.18 2.18 0 0 0 .717-.483 2.11 2.11 0 0 0 .466-.719 2.08 2.08 0 0 0 .139-.839v-4.456z"/></svg>',
          },
          alt: 'Cisco Logo',
        },
      ],
      backgroundColor: 'green',
      spacingTop: 'none',
      spacingBottom: 'continuous',
    } as unknown as CustomerLogosProps,
    features: {
      title: 'Country Numbers - Features',
      tagline: 'FEATURES',
      heading: `Feature-packed ${name} numbers`,
      copy: `Bring a personal touch to ${demonym} customers with a local presence. Increase engagement in ${name} with recognizable numbers.`,
      lead: true,
      items: [
        {
          title: 'Country Numbers - Feature 1',
          heading: '2-way SMS',
          copy: `For ${name} reach, our SMS API ensures ${demonym}s get messages without delays or compliance issues.`,
        },
        {
          title: 'Country Numbers - Feature 2',
          heading: 'Inbound calling',
          copy: `Reliable inbound calling for ${demonym}s—because every call to or from your ${name} business matters.`,
        },
        {
          title: 'Country Numbers - Feature 3',
          heading: 'Emergency calling',
          copy: `E911 ensures ${demonym}s can quickly reach help, with location accuracy for emergency services.`,
        },
        {
          title: 'Country Numbers - Feature 4',
          heading: 'Fax support',
          copy: `Secure, versatile faxing for ${demonym}s. Send and receive faxes digitally, with full control and privacy.`,
        },
        {
          title: 'Country Numbers - Feature 5',
          heading: 'Number portability',
          copy: `Port your existing ${name} number(s) effortlessly. Our portal guides you through each step.`,
        },
        {
          title: 'Country Numbers - Feature 6',
          heading: 'Full PSTN replacement',
          copy: `Transition to modern VoIP seamlessly with Telnyx's complete PSTN replacement in ${name}, retaining key telephony features.`,
        },
      ].filter((_, i) => (activeFeatureItems ? activeFeatureItems.includes(i) : true)),
      backgroundColor: 'green',
      spacingTop: 'contrasting',
      spacingBottom: 'contrasting',
    } as unknown as TextCardsProps,
    whyTelnyx: {
      title: 'Country Numbers - Why Telnyx',
      tagline: 'WHY TELNYX',
      heading: `Use a centralized platform for global calling`,
      copy: `Bring a personal touch to ${demonym} customers with a local presence. Increase engagement in ${name} with recognizable numbers.`,
      lead: true,
      items: [
        {
          title: 'Global reach, local familiarity',
          heading: 'Global reach, local familiarity',
          copy: `Establish a local presence your customers will recognize in 140+ countries.`,
          media: {
            src: '//videos.ctfassets.net/2vm221913gep/4COuUuk71oMLjBgu9SSfdA/e82be230f8514a2dbfe71f98d3b06a74/1_bg.mp4',
            alt: 'globe animation',
            width: 160,
            fm: 'mp4',
          },
        },
        {
          title: 'Unlimited numbers',
          heading: 'Unlimited numbers',
          copy: `Scale your presence according to your business needs. Receive a discount after purchasing 50+ numbers.`,
          media: {
            src: 'https://videos.ctfassets.net/2vm221913gep/3rPluaqakfPx1QWprxv4hZ/ae94cc410efe13a4689be31f9f950eab/2_bg.mp4',
            alt: 'phone numbers animation',
            width: 160,
            fm: 'mp4',
          },
        },
        {
          title: 'Fast, easy number porting',
          heading: 'Fast, easy number porting',
          copy: `Port existing ${name} numbers painlessly with Telnyx FastPort® technology.`,
          media: {
            src: 'https://videos.ctfassets.net/2vm221913gep/60imhMeNQM6htklaYhacS9/2c2f5752932f038959711e8a7c2579d9/3_bg.mp4',
            alt: 'number porting animation',
            width: 160,
            fm: 'mp4',
          },
        },
      ],
      backgroundColor: 'cream',
      spacingTop: 'continuous',
      spacingBottom: 'continuous',
    } as unknown as WhySectionProps,
    benefits: {
      cardTheme: 'citron',
      overlap: true,
      items: cardItems,
      spacingTop: 'continuous',
      spacingBottom: 'continuous',
    } as ColorfulCardsProps,
    howItWorks: {
      title: 'Country Numbers - How it works',
      tagline: `Buy ${name} Numbers`,
      headingElement: 'h2',
      items: [
        {
          title: 'Country Numbers - How it works 1',
          heading: 'Set up a portal account',
          headingElement: 'h2',
          copy: `Sign up for the Mission Control Portal with Telnyx to get started with ${name} numbers.`,
          media: {
            src: '//images.ctfassets.net/2vm221913gep/luCRssZHOp1pm1Q4JDS1H/a8293662dd745934e41beeb111d91d45/How_It_Works_Still_Global_Numbers_1.svg',
            alt: 'Telnyx log in page',
            height: 816,
            width: 936,
          },
        },
        {
          title: 'Country Numbers - How it works 2',
          heading: `Find the perfect ${name} number`,
          headingElement: 'h2',
          copy: `Use our search tool to look for numbers by ${name} or area code. When you’ve found the perfect, one add it to your cart and check out.`,
          media: {
            src: '//images.ctfassets.net/2vm221913gep/1ur4VjXDuzI0NpXRLHPtVv/44916cd322a232233a3565d8e3822932/How_It_Works_Still_Global_Numbers_2.svg',
            alt: null,
            height: 816,
            width: 936,
          },
        },
        {
          title: 'Country Numbers - How it works 3',
          heading: 'Connect your number for use ',
          headingElement: 'h2',
          copy: `Assign your new ${name} number to a SIP connection or messaging profile in your portal account.`,
          media: {
            src: '//images.ctfassets.net/2vm221913gep/1DD5ZVJJAk5Qofsh8g336L/0ce5b1a9a647be6b74d42cd55ae57c3e/How_It_Works_Still_Global_Numbers_3.svg',
            alt: null,
            height: 816,
            width: 936,
          },
        },
        {
          title: 'Country Numbers - How it works 4',
          heading: `Start using your ${name} number`,
          headingElement: 'h2',
          copy: `It’s time to talk the talk! Make and receive calls, or send text messages with your new ${name} number in the portal or via API.`,
          media: {
            src: '//images.ctfassets.net/2vm221913gep/7oeIv430ZDJcPzi3o6C3Pv/19fafd967f8c65a57d6cccae291b2bf7/How_It_Works_Still_Global_Numbers_4.svg',
            alt: null,
            height: 816,
            width: 936,
          },
        },
      ],
      ctaButtons: [
        {
          title: 'Sign up CTA',
          text: `Get a ${name} number`,
          href: 'https://telnyx.com/sign-up',
          type: 'button',
          buttonKind: 'primary',
          linkKind: 'default',
        },
      ],
      spacingTop: 'contrasting',
      spacingBottom: 'continuous',
    } as unknown as HowItWorksProps,
    knowBeforeBuy: {
      title: 'Country Numbers - Know Before You Buy',
      tagline: 'KNOW BEFORE YOU BUY',
      heading: `${name} local regulations`,
    } as unknown as MarkdownSectionProps,
    localEconomy: {
      title: 'Country Numbers - Top Industries',
      heading: `Top industries in ${name}`,
    } as unknown as MarkdownSectionProps,
    pricing: {
      title: 'Country Numbers - Pricing',
      tag: 'PRICING',
      heading: `${name} number pricing`,
      headingElement: 'h2',
      copy: `Pay only for the ${name} numbers you need month-to-month. No contracts required.`,
      pricingCopy: 'Starting at:',
      pricingValue: '$1.00',
      pricingCaption: 'per month',
      ctaButtons: [
        {
          title: 'See pricing CTA',
          text: 'See pricing',
          href: 'https://telnyx.com/pricing/numbers',
          type: 'button',
          buttonKind: 'primary',
          linkKind: 'default',
        },
      ],
      backgroundColor: 'citron',
      spacingTop: 'contrasting',
      spacingBottom: 'contrasting',
    } as unknown as CtaBannerProps,
    relatedArticles: {} as SecondaryCarouselSectionProps,
    faqs: {
      id: '67dlZaRssM3fqin0zH9ddD',
      contentType: 'sectionFaq',
      title: 'Country Numbers - FAQ',
      tagline: 'FAQ',
      questions: [
        {
          id: '2MBuKJytElk123b7H39cC9',
          title: 'Country Numbers - FAQ 1',
          question: `How much do local ${name} numbers cost per month?`,
          answer: `Local numbers for ${name} start at just $1 and are just $1/mo thereafter.`,
        },
        {
          id: '2Y3yVSZEo4fyw2tiFnhZUi',
          title: 'Country Numbers - FAQ 2',
          question: `How do I get a ${name} virtual number?`,
          answer: `It’s so easy. Sign up for the Mission Control Portal with Telnyx, use our portals to find the perfect number, connect your ${name} number for use, and start dialing from recognizable local numbers in starting with dialing code ${dialingCode}.`,
        },
        {
          id: '2tt5QLmKFGhjdaab7DDY5e',
          title: 'Country Numbers - FAQ 3',
          question: `Whats the calling code for ${name}?`,
          answer: `The calling code for ${name} is ${dialingCode}.`,
        },
      ],
      backgroundColor: 'cream',
      spacingTop: 'contrasting',
      spacingBottom: 'continuous',
    } as unknown as FaqProps,
    airTableContent: null as { heading: string; copy: string } | null,
    testimonials: {
      testimonialHeading: 'Real User feedback',
      testimonials: testimonials as TestimonialsProps['testimonials'],
    },
  };

  return pageLayoutData;
};

const pageData = async (slug: string, countryNumberCount: string) => {
  const country = countryNumberData.find((i: CountryType) => i.slug === slug);
  return country
    ? {
        country,
        seo: seo(country),
        hero: await hero(country),
        sections: sections(country, countryNumberCount),
        blogPosts: BLOGARTICLECONSTANTS,
      }
    : null;
};

export default pageData;
