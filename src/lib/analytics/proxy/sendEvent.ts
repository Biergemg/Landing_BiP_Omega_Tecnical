import type { EventParameters } from '../types';

export function sendEvent(eventName: string, parameters: EventParameters = {}): void {
    if (typeof window === 'undefined' || !window.gtag) {
        console.warn('[Analytics] gtag not available');
        return;
    }

    try {
        window.gtag('event', eventName, parameters);
    } catch {
        // Fail silently for analytics
        if (import.meta.env.DEV) {
            console.warn('Failed to send analytics event');
        }
    }
}