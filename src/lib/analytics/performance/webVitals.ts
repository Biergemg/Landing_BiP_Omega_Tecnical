import { onCLS, onINP, onLCP } from 'web-vitals';
import { sendEvent } from '../proxy/sendEvent';

interface WebVitalsMetric {
    name: string;
    delta: number;
    id: string;
}

export const initWebVitals = () => {
    if (typeof window === 'undefined') return;

    const sendToAnalytics = ({ name, delta, id }: WebVitalsMetric) => {
        // Assumes a custom compatible event or mapping in GA4
        sendEvent('web_vitals', {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(name === 'CLS' ? delta * 1000 : delta), // CLS is small, others are ms
            metric_name: name,
        });
    };

    // Listen for web vitals
    onCLS(sendToAnalytics);
    onINP(sendToAnalytics);
    onLCP(sendToAnalytics);
};