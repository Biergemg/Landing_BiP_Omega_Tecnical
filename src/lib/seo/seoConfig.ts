import { DEFAULT_OG_IMAGE, SITE_URL } from '../site/config';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
}

export interface PageSEO {
  [key: string]: SEOConfig;
}

const baseOrganization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'BiP Omega',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'Independent technical due diligence for utility-scale BESS projects and investment decision gating.',
  founder: {
    '@type': 'Person',
    name: 'Gustavo Bierge',
    jobTitle: 'Founder'
  },
  sameAs: ['https://www.linkedin.com/in/gustavo-bierge'],
  areaServed: 'Global'
};

export const seoConfig: PageSEO = {
  home: {
    title: 'BiP Omega – Technical Due Diligence for Utility-Scale BESS | Gustavo Bierge',
    description: 'Structured technical due diligence for utility-scale BESS projects. Mandate-adaptive analysis for investment committees, lenders, and independent engineers. Every conclusion traceable.',
    keywords: [
      'technical due diligence',
      'technical due diligence BESS',
      'battery energy storage due diligence',
      'investment decision gating',
      'independent engineer BESS',
      'energy storage project risk assessment'
    ],
    canonical: `${SITE_URL}/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'BiP Omega - Technical Due Diligence for Utility-Scale BESS'
  },
  technicalDueDiligenceBess: {
    title: 'Technical Due Diligence for BESS Projects | BiP Omega',
    description: 'Technical due diligence for utility-scale BESS projects with traceable evidence classification, critical silence detection, and decision-ready risk framing for investors and lenders.',
    keywords: [
      'technical due diligence BESS',
      'battery energy storage due diligence',
      'BESS due diligence',
      'utility-scale battery storage risk assessment'
    ],
    canonical: `${SITE_URL}/technical-due-diligence-bess/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Technical Due Diligence for BESS Projects'
  },
  independentEngineerBess: {
    title: 'Independent Engineer for BESS vs Early Technical Gate | BiP Omega',
    description: 'Independent engineer BESS positioning page for lenders and investors comparing full IE scope against an earlier technical gate based on public-record evidence and critical silence detection.',
    keywords: [
      'independent engineer BESS',
      'BESS technical advisory',
      'battery storage independent engineer',
      'BESS lender technical review'
    ],
    canonical: `${SITE_URL}/independent-engineer-bess/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'Independent Engineer for BESS'
  },
  forensicCaseStudy: {
    title: 'BESS Forensic Case Study and Sample Technical Report | BiP Omega',
    description: 'Forensic case study page for BESS project risk assessment queries. Review how BiP Omega structures evidence classification, critical silence analysis, and decision-ready technical outputs.',
    keywords: [
      'energy storage project risk assessment',
      'BESS forensic case study',
      'sample due diligence report',
      'battery storage technical report'
    ],
    canonical: `${SITE_URL}/forensic-case-study/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'BESS Forensic Case Study'
  },
  terms: {
    title: 'Terms of Service - BiP Omega',
    description: 'Terms of service for BiP Omega technical due diligence services. Professional independence and intellectual property terms.',
    keywords: ['terms of service', 'BiP Omega terms', 'technical due diligence terms'],
    canonical: `${SITE_URL}/terms/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'BiP Omega Terms of Service'
  },
  privacy: {
    title: 'Privacy Policy - BiP Omega',
    description: 'Privacy policy for BiP Omega. Minimal data collection, no tracking cookies, and professional confidentiality.',
    keywords: ['privacy policy', 'BiP Omega privacy', 'professional confidentiality'],
    canonical: `${SITE_URL}/privacy/`,
    ogImage: DEFAULT_OG_IMAGE,
    ogImageAlt: 'BiP Omega Privacy Policy'
  }
};

export function getSEOConfig(page: string): SEOConfig {
  return seoConfig[page] || seoConfig.home;
}

export function generateStructuredData(page: string): Record<string, unknown> | Record<string, unknown>[] {
  const baseWebPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: 'BiP Omega',
      url: SITE_URL
    },
    about: baseOrganization
  };

  const pageSchemas: Record<string, Record<string, unknown> | Record<string, unknown>[]> = {
    home: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'BiP Omega',
        url: SITE_URL,
        publisher: baseOrganization,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${SITE_URL}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        ...baseWebPage,
        '@id': `${SITE_URL}/#webpage`,
        url: `${SITE_URL}/`,
        name: 'BiP Omega - Technical Due Diligence for Utility-Scale BESS',
        mainEntity: baseOrganization
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Technical Due Diligence for Utility-Scale BESS Projects',
        serviceType: 'Technical Due Diligence',
        provider: baseOrganization,
        areaServed: 'Global',
        audience: {
          '@type': 'Audience',
          audienceType: 'Investment committees, lenders, and risk-sensitive infrastructure buyers'
        }
      }
    ],
    technicalDueDiligenceBess: {
      ...baseWebPage,
      '@id': `${SITE_URL}/technical-due-diligence-bess/#webpage`,
      url: `${SITE_URL}/technical-due-diligence-bess/`,
      name: 'Technical Due Diligence for BESS Projects',
      mainEntity: {
        '@type': 'Service',
        name: 'Technical Due Diligence for BESS Projects',
        serviceType: 'BESS Technical Due Diligence',
        provider: baseOrganization,
        areaServed: 'Global'
      }
    },
    independentEngineerBess: {
      ...baseWebPage,
      '@id': `${SITE_URL}/independent-engineer-bess/#webpage`,
      url: `${SITE_URL}/independent-engineer-bess/`,
      name: 'Independent Engineer for BESS vs Early Technical Gate',
      mainEntity: {
        '@type': 'Article',
        headline: 'Independent Engineer for BESS: What Buyers Need Before Full IE Scope',
        author: {
          '@type': 'Person',
          name: 'Gustavo Bierge'
        },
        publisher: baseOrganization
      }
    },
    forensicCaseStudy: {
      ...baseWebPage,
      '@id': `${SITE_URL}/forensic-case-study/#webpage`,
      url: `${SITE_URL}/forensic-case-study/`,
      name: 'BESS Forensic Case Study and Sample Technical Report',
      mainEntity: {
        '@type': 'TechArticle',
        headline: 'BESS Forensic Case Study: Evidence Structure Before Full Due Diligence',
        author: {
          '@type': 'Person',
          name: 'Gustavo Bierge'
        },
        publisher: baseOrganization
      }
    },
    terms: {
      ...baseWebPage,
      '@id': `${SITE_URL}/terms/#webpage`,
      url: `${SITE_URL}/terms/`,
      name: 'Terms of Service - BiP Omega'
    },
    privacy: {
      ...baseWebPage,
      '@id': `${SITE_URL}/privacy/#webpage`,
      url: `${SITE_URL}/privacy/`,
      name: 'Privacy Policy - BiP Omega'
    }
  };

  return pageSchemas[page] || pageSchemas.home;
}
