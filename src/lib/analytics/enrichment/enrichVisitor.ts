import { sendEvent } from '../proxy/sendEvent';

export const enrichVisitor = () => {
    if (typeof window === 'undefined') return;

    const timeOnSite = Number(sessionStorage.getItem('time_on_site') || 0);
    const pdfDownloaded = sessionStorage.getItem('pdf_downloaded') === 'true';

    let visitorType = 'new';
    if (timeOnSite > 120 || pdfDownloaded) visitorType = 'engaged';

    // Returning Visitor High Intent Logic
    const isReturningVisitor = localStorage.getItem('first_visit');
    if (isReturningVisitor) {
        const daysSinceFirst = (Date.now() - Number(isReturningVisitor)) / 86400000;
        // If returning within 7 days, signal high intent
        if (daysSinceFirst < 7) {
            sendEvent('returning_visitor_high_intent', {
                days_logic: Math.floor(daysSinceFirst), // 'days' is reserved/ambiguous sometimes
                confidence: 'high'
            });
        }
    } else {
        localStorage.setItem('first_visit', String(Date.now()));
    }

    return {
        visitor_type: visitorType,
        content_depth:
            timeOnSite < 30 ? 'shallow' :
                timeOnSite < 120 ? 'medium' : 'deep'
    };
};
