import { GA4_MEASUREMENT_ID } from './core/config';
import { initWebVitals } from './performance/webVitals';
import { initCustomEvents } from './events/customEvents';
import { enrichVisitor } from './enrichment/enrichVisitor';
import { sendEvent } from './proxy/sendEvent';

// Add type definition for global Window extensions if not already present
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export const initAnalytics = () => {
    if (typeof window === 'undefined') return;

    // 1. Bootstrap GA4 (Logic only, script is in HEAD)
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); }
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, {
        anonymize_ip: true,
        send_page_view: false // We control page views ideally, or let default happen? Default usually fine for SPA/Astro
    });

    // 2. Initialize Web Vitals
    initWebVitals();

    // 3. Initialize Custom Events (Scroll, PDF, etc.)
    initCustomEvents();

    // 4. Enrich Visitor Profile & Send Page View (Enhanced)
    const visitorProfile = enrichVisitor();

    // Explicit Page View with enriched data
    sendEvent('page_view', {
        ...visitorProfile,
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });

    console.log('[Analytics] Initialized', visitorProfile);
};
