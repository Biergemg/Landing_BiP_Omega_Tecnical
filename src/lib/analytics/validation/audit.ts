export function runAudit(): void {
    if (typeof window === 'undefined') {
        console.warn('[Analytics] Audit can only run in browser');
        return;
    }

    console.log('=== Analytics Audit ===');
    
    // Check if GA4 is loaded
    const ga4Loaded = typeof window.gtag !== 'undefined';
    console.log(`GA4 loaded: ${ga4Loaded}`);
    
    // Check dataLayer
    const dataLayerExists = Array.isArray(window.dataLayer);
    console.log(`dataLayer exists: ${dataLayerExists}`);
    
    // Check session storage
    const sessionStorageAvailable = typeof sessionStorage !== 'undefined';
    console.log(`Session storage available: ${sessionStorageAvailable}`);
    
    // Check local storage
    const localStorageAvailable = typeof localStorage !== 'undefined';
    console.log(`Local storage available: ${localStorageAvailable}`);
    
    // Check visitor ID
    let visitorId = 'Not available';
    try {
        visitorId = localStorage.getItem('visitorId') || 'Not set';
    } catch {
        visitorId = 'Error accessing localStorage';
    }
    console.log(`Visitor ID: ${visitorId}`);
    
    // Check session ID
    let sessionId = 'Not available';
    try {
        sessionId = sessionStorage.getItem('sessionId') || 'Not set';
    } catch {
        sessionId = 'Error accessing sessionStorage';
    }
    console.log(`Session ID: ${sessionId}`);
    
    // Check referrer
    const referrer = document.referrer || 'Direct/Bookmark';
    console.log(`Referrer: ${referrer}`);
    
    console.log('=== End Audit ===');
}