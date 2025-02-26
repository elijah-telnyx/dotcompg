import { withAsyncData } from './../utils/withAsyncData';
import Api from 'lib/Api';
import { NotFoundError } from 'utils/pageGeneration/CustomError';
import { getClient, entries, type GetClientOptions } from 'lib/Contentful';
import type {
  ProductPage,
  UseCasesPage,
  IndustryPage,
  PricingPage,
  PricingOverviewPage,
  SolutionsOverviewPage,
  CustomerStoriesOverviewPage,
  CustomerStoryPage,
  ContactUsPage,
  RequestControlReviewDataPage,
  MissionControlPortalPage,
  WhyTelnyxPage,
  OurNetworkPage,
  CareersPage,
  PartinershipsPage,
  IntegrationsPage,
  LandingPage,
  ShakenStirPage,
  TwexitPage,
  DataPrivacyPage,
  DataTransferImpactAssessmentPage,
  LegalPage,
  StorageTermsAndConditionsPage,
  GenericPage,
  IotGlobalCoveragePage,
  OurNetworkCoveragePage,
  LLMLibraryPage,
  GlobalCoveragePage,
  VoiceAiPage,
  BlogPage,
} from 'lib/Contentful/types';
import type { CarouselSectionProps } from 'ui/components/@types';

import { flattenEntry } from '../utils/flatten';
import { parseBlogEntryItemsToBlogCardsItems } from 'lib/Contentful/resources';
import { getGlobalCoverageTable as getGlobalCoverageTableData } from 'lib/Coverage/methods';
import featureFlippers from 'constants/featureFlippers';
import { getGlobalCoverageTable } from 'lib/Static';

const genericPageType = 'pageWhyTelnyx';

export const getProductPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<ProductPage>({
    content_type: 'pageProduct',
  });
};

export const getCustomerStoryPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<ProductPage>({
    content_type: 'pageCustomerStories',
  });
};

export const getUseCasePages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<UseCasesPage>({
    content_type: 'pageUseCase',
  });
};

export const getIndustryPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<IndustryPage>({
    content_type: 'pageSolution',
  });
};

export const getLandingPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<LandingPage>({
    content_type: 'pageLanding',
  });
};

// non-versioned legal pages
export const getLegalPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<LegalPage>({
    content_type: 'pageLegal',
    'metadata.tags[exists]': false,
  });
};

export const getLegalTermsAndConditionsPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<LegalPage>({
    content_type: 'pageLegal',
    'metadata.tags.sys.id[in]': 'terms-and-conditions',
  });
};

export const getLegalTermsAndConditionsOfServicePages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<LegalPage>({
    content_type: 'pageLegal',
    'metadata.tags.sys.id[in]': 'terms-and-conditions-of-service',
  });
};

export const getLegalPrivacyPolicyPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<LegalPage>({
    content_type: 'pageLegal',
    'metadata.tags.sys.id[in]': 'privacy-policy',
  });
};

interface Query {
  slug: string;
  locale?: string;
  content_type?: string;
  'metadata.tags.sys.id[in]'?: string;
  'metadata.tags[exists]'?: boolean;
}

const getPageEntryFromEntries = <T>(
  { content_type, slug, locale = 'en-US', ...query }: Query,
  opts?: GetClientOptions
) => {
  /**
   * This is for us to be sure the page exists and have content
   */
  const requiredParamsForPages: Record<string, boolean> = {
    'fields.seo[exists]': true,
  };

  if (content_type !== genericPageType) {
    requiredParamsForPages['fields.sections[exists]'] = true;
  }

  return getClient(opts)
    .getEntries<T>({
      content_type,
      include: 3,
      locale,
      'fields.slug': slug,
      ...(!opts?.preview && requiredParamsForPages),
      ...query,
    })
    .then((entries) => {
      const entry = entries.items[0];
      if (!entry) {
        throw new NotFoundError(JSON.stringify({ content_type, slug, ...query }));
      }
      return entry;
    });
};

export const getProductPage = ({ slug, locale }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<ProductPage>({ content_type: 'pageProduct', slug, locale }, opts).then((pageData) => {
    return Promise.all([
      // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
      withAsyncData<typeof pageData.fields.hero>(flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero)),
      pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) =>
        withAsyncData<typeof section>(flattenEntry<typeof section>(section))
      ),
    ]).then(async ([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        locale,
        seo,
        hero,
        sections,
      };
    });
  });
};

export const getCustomerStoryPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<CustomerStoryPage>({ content_type: 'pageCustomerStories', slug }, opts).then(
    (pageData) => {
      return Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          slug,
          seo,
          hero,
          sections,
        };
      });
    }
  );
};

export const getIndustryPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<IndustryPage>({ content_type: 'pageSolution', slug }, opts).then((pageData) =>
    Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    })
  );
};

export const getLandingPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<LandingPage>({ content_type: 'pageLanding', slug }, opts).then((pageData) =>
    Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    })
  );
};

export const getPricingPage = ({ slug, locale }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<PricingPage>({ content_type: 'pagePricing', slug, locale }, opts).then((pageData) => {
    return Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        datePublished: pageData.sys.createdAt,
        dateModified: pageData.sys.updatedAt,
        locale,
        seo,
        hero,
        sections,
      };
    });
  });
};

export const getUseCasePage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<UseCasesPage>({ content_type: 'pageUseCase', slug }, opts).then((pageData) =>
    Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    })
  );
};

// non-versioned legal page
export const getLegalPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<LegalPage>(
    { content_type: 'pageLegal', 'metadata.tags[exists]': false, slug },
    opts
  ).then((pageData) =>
    Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    })
  );
};

export const getLegalTermsAndConditionsPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<LegalPage>(
    { content_type: 'pageLegal', 'metadata.tags.sys.id[in]': 'terms-and-conditions', slug },
    opts
  ).then((pageData) =>
    Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    })
  );
};

export const getLegalTermsAndConditionsOfServicePage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<LegalPage>(
    { content_type: 'pageLegal', 'metadata.tags.sys.id[in]': 'terms-and-conditions-of-service', slug },
    opts
  ).then((pageData) =>
    Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    })
  );
};

export const getLegalPrivacyPolicyPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<LegalPage>(
    { content_type: 'pageLegal', 'metadata.tags.sys.id[in]': 'privacy-policy', slug },
    opts
  ).then((pageData) =>
    Promise.all([
      flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
      flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    })
  );
};

// page with getEntry

export const getPricingOverviewPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<PricingOverviewPage>(entries.pricingOverview, { include: 4 })
    .then((pageData) =>
      Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getCustomerStoriesOverviewPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<CustomerStoriesOverviewPage>(entries.customerStoriesOverview, { include: 4 })
    .then((pageData) =>
      Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getSolutionsOverviewPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<SolutionsOverviewPage>(entries.solutionsOverview, { include: 4 })
    .then((pageData) =>
      Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getContactUsPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<ContactUsPage>(entries.contactUs, { include: 4 })
    .then((pageData) =>
      Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ContactUsPage>)
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          sections,
        };
      })
    );
};

export const getDataReviewControlRequestPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<RequestControlReviewDataPage>(entries.requestControlReviewData, { include: 4 })
    .then((pageData) =>
      Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ContactUsPage>)
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          sections,
        };
      })
    );
};

export const getContactUsChallengerPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<ContactUsPage>(entries.pages.contactUsChallenger, { include: 4 })
    .then((pageData) =>
      Promise.all([
        // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ContactUsPage>)
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          sections,
        };
      })
    );
};

export const getMissonControlPortalPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<MissionControlPortalPage>(entries.missionControlPortal, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getWhyTelnyxPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<WhyTelnyxPage>(entries.whyTelnyx, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getOurNetworkPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<OurNetworkPage>(entries.ourNetwork, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getOurNetworkCoveragePage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<OurNetworkCoveragePage>(entries.ourNetworkCoverage, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getCareersPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<CareersPage>(entries.careers, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getPartnershipPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<PartinershipsPage>(entries.partnerships, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getIntegrationsPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<IntegrationsPage>(entries.integrations, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getTheBetterTwilioAlternative = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<GenericPage>(entries.theBetterTwilioAlternative, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...(pageData.fields.sections?.map((section) => flattenEntry<typeof section>(section)) || []),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getShakenStir = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<ShakenStirPage>(entries.shakenStir, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getTwexit = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<TwexitPage>(entries.twexit, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getDataPrivacy = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<DataPrivacyPage>(entries.dataPrivacy, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getDataTransferImpactAssessment = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<DataTransferImpactAssessmentPage>(entries.dataTransferImpactAssessment, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getTermsAndConditions = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<LegalPage>(entries.termsAndConditions, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getTermsAndConditionsOfService = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<LegalPage>(entries.termsAndConditionsOfService, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getPrivacyPolicy = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<LegalPage>(entries.privacyPolicy, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getStorageTermsAndConditions = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<StorageTermsAndConditionsPage>(entries.storageTermsAndConditions, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getIotGlobalCoveragePage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<IotGlobalCoveragePage>(entries.iotGlobalCoverage, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getLLMLibraryPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<LLMLibraryPage>(entries.llmLibraryDetailsPage, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) =>
          withAsyncData<typeof section>(flattenEntry<typeof section>(section))
        ),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
        };
      })
    );
};

export const getGlobalCoveragePage = async (opts?: GetClientOptions) => {
  const staticTableData = featureFlippers.ENGDESK_35704_COVERAGE_TABLE_DATA
    ? await getGlobalCoverageTableData()
    : getGlobalCoverageTable();

  return getClient(opts)
    .getEntry<GlobalCoveragePage>(entries.globalCoveragePage, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero),
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) =>
          withAsyncData<typeof section>(flattenEntry<typeof section>(section))
        ),
      ]).then(([hero, seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          hero,
          sections,
          tableData: staticTableData,
        };
      })
    );
};

export const getVoiceAiPage = (opts?: GetClientOptions) => {
  return getClient(opts)
    .getEntry<VoiceAiPage>(entries.voiceAi, { include: 4 })
    .then((pageData) =>
      Promise.all([
        flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
        ...pageData.fields.sections.map((section) => flattenEntry<typeof section>(section)),
      ]).then(([seo, ...sections]) => {
        return {
          id: pageData.sys.id,
          ...pageData.fields,
          seo,
          sections,
        };
      })
    );
};

export const getDirectoryArticles = (blogPosts: string[]) =>
  getClient({ blog: true })
    .getEntries<BlogPage>({ 'fields.slug[in]': blogPosts.join(','), content_type: 'rcPost' })
    .then((res) => {
      return {
        semanticHeading: false,
        backgroundColor: 'black',
        heading: 'Related articles',
        items: res.items.map(parseBlogEntryItemsToBlogCardsItems),
      };
    });

export const getStateNumberSections = () =>
  getClient()
    .getEntry<CarouselSectionProps>(entries.sections.globalNumbersCarousel, { include: 4 })
    .then((res) => {
      return flattenEntry(res).then((data) => ({ carousel: data }));
    });

export const getStateNumberCopyData = (): Promise<{ [key: string]: string }> => {
  return getClient()
    .getAsset(entries.assets.statePhoneNumberCopy)
    .then(({ fields }) => Api.get('https://' + fields.file.url));
};

export const getCountryIoTSections = () =>
  getClient()
    .getEntry<CarouselSectionProps>(entries.sections.IoTSimCardCarousel, { include: 4 })
    .then((res) => {
      return flattenEntry(res).then((data) => ({ carousel: data }));
    });

export const getGenericPage = ({ slug }: Query, opts?: GetClientOptions) => {
  return getPageEntryFromEntries<GenericPage>({ content_type: 'pageWhyTelnyx', slug }, opts).then((pageData) => {
    return Promise.all([
      // @TODO: move this flatten + promise logic to a separate method with a generic Page type (call getEntryFields<ProductPage>)
      pageData.fields.hero
        ? flattenEntry<typeof pageData.fields.hero>(pageData.fields.hero)
        : Promise.resolve(undefined),
      pageData.fields.seo && flattenEntry<typeof pageData.fields.seo>(pageData.fields.seo),
      ...(pageData.fields.sections?.map((section) => flattenEntry<typeof section>(section)) || []),
    ]).then(([hero, seo, ...sections]) => {
      return {
        id: pageData.sys.id,
        ...pageData.fields,
        seo,
        hero,
        sections,
      };
    });
  });
};

export const getGenericPages = (opts?: GetClientOptions) => {
  return getClient(opts).getEntries<GenericPage>({
    content_type: 'pageWhyTelnyx',
  });
};

export {
  getHomePageData,
  getInteractiveHomePageData,
  getFreshHomePageData,
  getOurNetworkCoveragePageData,
} from './assets';
