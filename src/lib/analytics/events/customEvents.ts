import { sendEvent } from '../proxy/sendEvent';

export const initCustomEvents = () => {
    if (typeof window === 'undefined') return;

    // 1. PDF Download Tracking
    document.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const link = target.closest('a');

        if (link && link.href.endsWith('.pdf')) {
            sendEvent('pdf_download', {
                file_url: link.href,
                link_text: link.innerText,
                event_category: 'engagement'
            });
            sessionStorage.setItem('pdf_downloaded', 'true');
        }
    });

    // 2. Pricing Section Timer (High Intent)
    const pricingSection = document.querySelector('[data-analytics-id="pricing"]');
    if (pricingSection) {
        let enterTime: number | null = null;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    enterTime = Date.now();
                    sendEvent('pricing_view', { duration: 0 });
                } else if (enterTime) {
                    const duration = (Date.now() - enterTime) / 1000;
                    if (duration > 5) { // Only insignificant if > 5s
                        sendEvent('pricing_time', { value: Math.round(duration) });
                    }
                    enterTime = null;
                }
            });
        }, { threshold: 0.5 }); // 50% visible

        observer.observe(pricingSection);
    }

    // 3. Scroll Tracking (Basic 50%, 90%)
    let tracked50 = false;
    let tracked90 = false;

    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.body.scrollHeight * 100;

        if (scrollPercent > 50 && !tracked50) {
            sendEvent('scroll_depth', { percent: 50 });
            tracked50 = true;
        }
        if (scrollPercent > 90 && !tracked90) {
            sendEvent('scroll_depth', { percent: 90 });
            tracked90 = true;
        }
    });
};
