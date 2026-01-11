export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

export interface PageSEO {
  home: SEOConfig;
  about: SEOConfig;
  services: SEOConfig;
  contact: SEOConfig;
  [key: string]: SEOConfig;
}

export const seoConfig: PageSEO = {
  home: {
    title: "BiP Omega – Forensic Due Diligence for BESS | $9.5-23M Risk Identified",
    description: "Independent technical due diligence for investment decision gating. Phase 1 diagnostic in 72 hours using forensic analysis of public records. 89% validation rate.",
    keywords: [
      "technical due diligence", "independent technical diagnostic", "BESS risk assessment",
      "energy infrastructure", "investment decision gating", "forensic analysis",
      "battery energy storage systems", "pre-investment analysis", "public records analysis"
    ],
    canonical: "https://bipomega.com/",
    ogImage: "https://bipomega.com/og-image.png",
    ogImageAlt: "BiP Omega - Forensic Due Diligence for BESS Projects"
  },
  about: {
    title: "About BiP Omega | Technical Due Diligence Expertise",
    description: "Learn about our methodology, team expertise, and 89% validation rate in identifying Critical Silences that standard IE reports miss.",
    keywords: [
      "about BiP Omega", "Gustavo Bierge", "technical due diligence methodology",
      "Critical Silences", "investment decision gating", "energy infrastructure expertise"
    ],
    canonical: "https://bipomega.com/about/",
    ogImage: "https://bipomega.com/og-image-about.png",
    ogImageAlt: "About BiP Omega - Technical Due Diligence Methodology"
  },
  services: {
    title: "Services | Phase 1 Forensic Diagnostic for BESS Projects",
    description: "72-hour fatal flaw forensic audit using publicly available information. Binary Go/No-Go investment decision before NDA signature.",
    keywords: [
      "Phase 1 diagnostic", "forensic audit", "BESS project analysis", "investment decision gating",
      "public records analysis", "fatal flaw identification", "technical due diligence services"
    ],
    canonical: "https://bipomega.com/services/",
    ogImage: "https://bipomega.com/og-image-services.png",
    ogImageAlt: "BiP Omega Services - Phase 1 Forensic Diagnostic"
  },
  contact: {
    title: "Contact BiP Omega | Technical Due Diligence Consultation",
    description: "Schedule a consultation for independent technical due diligence. Identify fatal flaws before capital deployment.",
    keywords: [
      "contact BiP Omega", "technical due diligence consultation", "BESS project evaluation",
      "investment decision support", "schedule consultation"
    ],
    canonical: "https://bipomega.com/contact/",
    ogImage: "https://bipomega.com/og-image-contact.png",
    ogImageAlt: "Contact BiP Omega - Technical Due Diligence"
  },
  terms: {
    title: "Terms of Service - BiP Omega",
    description: "Terms of service for BiP Omega technical due diligence services. Professional independence and intellectual property terms.",
    keywords: [
      "terms of service", "BiP Omega terms", "technical due diligence terms", "professional independence",
      "intellectual property", "liability limitation", "service terms"
    ],
    canonical: "https://bipomega.com/terms/",
    ogImage: "https://bipomega.com/og-image-terms.png",
    ogImageAlt: "BiP Omega Terms of Service"
  },
  privacy: {
    title: "Privacy Policy - BiP Omega",
    description: "Privacy policy for BiP Omega. Minimal data collection, no tracking cookies, professional confidentiality.",
    keywords: [
      "privacy policy", "BiP Omega privacy", "data collection", "cookies policy", 
      "professional confidentiality", "information security", "privacy terms"
    ],
    canonical: "https://bipomega.com/privacy/",
    ogImage: "https://bipomega.com/og-image-privacy.png",
    ogImageAlt: "BiP Omega Privacy Policy"
  }
};

export function getSEOConfig(page: string): SEOConfig {
  return seoConfig[page] || seoConfig.home;
}

export function generateStructuredData(page: string): Record<string, unknown> {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BiP Omega",
    "url": "https://bipomega.com",
    "logo": "https://bipomega.com/logo.png",
    "description": "Independent technical due diligence for investment decision gating"
  };

  const pageSchemas = {
    home: {
      "@type": "WebSite",
      "mainEntity": baseSchema,
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".hero-headline", ".hero-subheadline"]
      }
    },
    services: {
      "@type": "Service",
      "serviceType": "Technical Due Diligence",
      "provider": baseSchema,
      "areaServed": "Global",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Technical Due Diligence Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Phase 1 - Fatal Flaw Forensic Audit",
              "description": "Binary Go/No-Go investment decision with quantified exposure"
            }
          }
        ]
      }
    },
    contact: {
      "@type": "ContactPage",
      "mainEntity": baseSchema
    }
  };

  return pageSchemas[page as keyof typeof pageSchemas] || pageSchemas.home;
}