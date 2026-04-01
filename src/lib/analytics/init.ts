import { initCustomEvents } from './events/customEvents';
import { initWebVitals } from './performance/webVitals';
import type { PageViewEvent } from './types';
import { enrichVisitor } from './enrichment/enrichVisitor';
import { sendEvent } from './proxy/sendEvent';
import { GA4_MEASUREMENT_ID } from './core/config';

declare global {
  interface Window {
    dataLayer: Array<unknown>;
    gtag: (...args: unknown[]) => void;
    __analyticsAudit: () => {
      measurementId: string;
      hasDataLayer: boolean;
      hasGtag: boolean;
      pageLocation: string;
    };
  }
}

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function (...args: unknown[]) {
      window.dataLayer.push(args);
    };

    if (typeof window.gtag === 'function') {
      window.gtag('js', new Date());
      window.gtag('config', GA4_MEASUREMENT_ID, {
        anonymize_ip: true,
        send_page_view: false
      });
    }

    try {
      initWebVitals();
    } catch {
      // Fail silently - web vitals is optional
    }

    try {
      initCustomEvents();
    } catch {
      // Fail silently - custom events are optional
    }

    try {
      const visitorProfile = enrichVisitor();
      const pageViewData: PageViewEvent = {
        ...visitorProfile,
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      };

      sendEvent('page_view', pageViewData);
    } catch {
      // Fail silently - page view tracking is optional
    }

    window.__analyticsAudit = () => ({
      measurementId: GA4_MEASUREMENT_ID,
      hasDataLayer: Array.isArray(window.dataLayer),
      hasGtag: typeof window.gtag === 'function',
      pageLocation: window.location.href
    });
  } catch {
    // Fail silently for analytics
  }
}
