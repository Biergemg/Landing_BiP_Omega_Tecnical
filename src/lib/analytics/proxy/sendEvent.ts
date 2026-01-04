export const sendEvent = (eventName: string, params: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, {
            ...params,
            timestamp: Date.now()
        });
    } else {
        // Only warn in development to avoid noise in prod if something loads late
        if (import.meta.env.DEV) {
            console.warn(`[Analytics] gtag not found, event skipped: ${eventName}`);
        }
    }
};
