import { initCustomEvents } from './events/customEvents';
import { initWebVitals } from './performance/webVitals';
import type { PageViewEvent } from './types';
import { enrichVisitor } from './enrichment/enrichVisitor';
import { sendEvent } from './proxy/sendEvent';

declare global {
    interface Window {
        dataLayer: Array<unknown>;
        gtag: (...args: unknown[]) => void;
        __analyticsAudit: () => void;
    }
}

export function initAnalytics(): void {
    if (typeof window === 'undefined') return;

    try {
        // 1. Bootstrap GA4 (Logic only, script is in HEAD)
        window.dataLayer = window.dataLayer || [];
        window.gtag = function (...args: unknown[]) {
            window.dataLayer.push(args);
        };

        // Guard against gtag not being available
        if (typeof window.gtag === 'function') {
            window.gtag('js', new Date());
            window.gtag('config', 'G-KRV707DJ7F', {
                anonymize_ip: true,
                send_page_view: false
            });
        }

        // 2. Initialize Web Vitals (wrapped defensively)
        try {
            initWebVitals();
        } catch {
            // Fail silently - web vitals is optional
        }

        // 3. Initialize Custom Events (Scroll, PDF, etc.)
        try {
            initCustomEvents();
        } catch {
            // Fail silently - custom events are optional
        }

        // 4. Enrich Visitor Profile & Send Page View (Enhanced)
        try {
            const visitorProfile = enrichVisitor();

            // Explicit Page View with enriched data
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

        // 5. Expose audit function to window
        // window.__analyticsAudit = runAudit; // TODO: Implementar cuando se migre el módulo
    } catch {
        // Fail silently for analytics
    }
}