import type { EventParameters } from '../types';

export function sendEvent(eventName: string, parameters: EventParameters = {}): void {
    if (typeof window === 'undefined' || !window.gtag) {
        return;
    }

    try {
        window.gtag('event', eventName, parameters);
    } catch {
        // Fail silently for analytics
    }
}