export const runAudit = () => {
    console.group('Analytics Audit');
    console.log('✅ GA4 Configured:', typeof window.gtag === 'function');
    console.log('✅ DataLayer Present:', Array.isArray(window.dataLayer));
    // Check if script is loaded
    const script = document.querySelector('script[src*="googletagmanager"]');
    console.log('✅ GA4 Script Tag:', script ? 'Found' : 'MISSING');

    // Check Session Storage
    console.log('ℹ️ Visitor Type:', sessionStorage.getItem('visitor_type') || 'Not set yet');
    console.log('ℹ️ Time on Site:', sessionStorage.getItem('time_on_site'));

    console.groupEnd();
};

// Expose to window for manual testing in console
if (typeof window !== 'undefined') {
    (window as any).__analyticsAudit = runAudit;
}
