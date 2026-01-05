export interface VisitorProfile {
    visitorId: string;
    sessionId: string;
    referrer: string;
    landingPage: string;
    userAgent: string;
    timestamp: number;
}

// Throttling para optimizar performance
const THROTTLE_DELAY = 1000; // 1 segundo
let lastUpdate = 0;

function generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function enrichVisitor(): VisitorProfile {
    if (typeof window === 'undefined') {
        return {
            visitorId: 'server-side',
            sessionId: 'server-side',
            referrer: 'server-side',
            landingPage: 'server-side',
            userAgent: 'server-side',
            timestamp: Date.now()
        };
    }

    // Get or create visitor ID
    let visitorId: string | null = null;
    try {
        visitorId = localStorage.getItem('visitorId');
        if (!visitorId) {
            visitorId = generateId();
            localStorage.setItem('visitorId', visitorId);
        }
    } catch {
        visitorId = generateId();
    }

    // Get or create session ID
    let sessionId: string | null = null;
    try {
        sessionId = sessionStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = generateId();
            sessionStorage.setItem('sessionId', sessionId);
        }
    } catch {
        sessionId = generateId();
    }

    return {
        visitorId,
        sessionId,
        referrer: document.referrer || 'Direct/Bookmark',
        landingPage: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
    };
}

export function updateVisitorProfile(updates: Partial<VisitorProfile>) {
    const now = Date.now();
    
    // Throttling: evitar actualizaciones muy frecuentes
    if (now - lastUpdate < THROTTLE_DELAY) {
        console.log('[Analytics] Update throttled - too frequent');
        return;
    }
    
    lastUpdate = now;
    
    try {
        // Solo actualizar si estamos en el navegador
        if (typeof window === 'undefined') {
            console.warn('[Analytics] Cannot update profile on server side');
            return;
        }
        
        // Aquí puedes agregar lógica para actualizar el perfil
        // Por ejemplo, enviar a analytics o actualizar storage
        console.log('[Analytics] Updating visitor profile:', updates);
        
        // Ejemplo: actualizar timestamp en sessionStorage
        sessionStorage.setItem('lastProfileUpdate', now.toString());
        
    } catch (error) {
        console.error('[Analytics] Error updating visitor profile:', error);
    }
}