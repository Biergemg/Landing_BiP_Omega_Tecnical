declare global {
    interface Window {
        dataLayer: Array<unknown>;
        gtag: (...args: unknown[]) => void;
    }
}

export function initGtag(): void {
    if (typeof window === 'undefined') return;

    window.dataLayer = window.dataLayer || [];

    function gtag(...args: unknown[]): void {
        window.dataLayer.push(args);
    }

    window.gtag = gtag;

    window.gtag('js', new Date());
    window.gtag('config', 'G-KRV707DJ7F');
}