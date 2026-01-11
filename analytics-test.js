// 🔍 Script de Diagnóstico de Analytics para Consola del Navegador
// Este script verifica el funcionamiento de Google Analytics en tiempo real

console.clear();
console.log('🚀 Iniciando diagnóstico de Analytics...');

// Función para log con formato
function logAnalytics(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️';
    console.log(`[${timestamp}] ${prefix} ${message}`);
}

// 1. Verificar gtag
logAnalytics('Verificando gtag...');
if (typeof window.gtag === 'function') {
    logAnalytics('gtag está definido y es una función', 'success');
} else {
    logAnalytics('gtag NO está definido o no es una función', 'error');
    console.error('window.gtag:', window.gtag);
}

// 2. Verificar dataLayer
logAnalytics('Verificando dataLayer...');
if (window.dataLayer && Array.isArray(window.dataLayer)) {
    logAnalytics(`dataLayer está definido con ${window.dataLayer.length} elementos`, 'success');
    console.table(window.dataLayer.slice(-5)); // Mostrar últimos 5 eventos
} else {
    logAnalytics('dataLayer NO está definido correctamente', 'error');
}

// 3. Verificar scripts de GA cargados
logAnalytics('Verificando scripts de Google Analytics...');
const gaScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
if (gaScripts.length > 0) {
    logAnalytics(`Se encontraron ${gaScripts.length} scripts de GA`, 'success');
    gaScripts.forEach((script, index) => {
        logAnalytics(`Script ${index + 1}: ${script.src}`, 'info');
    });
} else {
    logAnalytics('NO se encontraron scripts de Google Analytics', 'error');
}

// 4. Verificar ID de medición
const ga4Id = 'G-KRV707DJ7F';
logAnalytics(`Verificando ID de medición: ${ga4Id}`);

// 5. Enviar evento de prueba
logAnalytics('Enviando evento de prueba...');
if (typeof window.gtag === 'function') {
    try {
        window.gtag('event', 'test_diagnostic', {
            event_category: 'diagnostic',
            event_label: 'manual_test',
            value: 1,
            timestamp: new Date().toISOString()
        });
        logAnalytics('Evento de prueba enviado exitosamente', 'success');
    } catch (error) {
        logAnalytics(`Error enviando evento: ${error.message}`, 'error');
    }
} else {
    logAnalytics('No se puede enviar evento - gtag no disponible', 'error');
}

// 6. Verificar bloqueadores de anuncios
setTimeout(() => {
    logAnalytics('Verificando posibles bloqueadores de anuncios...');
    if (typeof window.gtag === 'undefined' && gaScripts.length === 0) {
        logAnalytics('⚠️ Posible bloqueador de anuncios detectado', 'warning');
        console.warn('Los bloqueadores de anuncios pueden impedir que GA4 funcione');
    }
}, 1000);

// 7. Información del entorno
logAnalytics('Información del entorno:');
console.log('📍 URL actual:', window.location.href);
console.log('👤 User Agent:', navigator.userAgent.substring(0, 100) + '...');
console.log('📅 Hora actual:', new Date().toLocaleString());

// 8. Funciones de utilidad para el usuario
window.analyticsHelp = function() {
    console.log('\n🆘 Ayuda de Analytics:');
    console.log('1. Abre Google Analytics');
    console.log('2. Ve a Reports > Realtime');
    console.log('3. Si ves usuarios activos, GA está funcionando');
    console.log('4. Si no ves nada, revisa:');
    console.log('   - Bloqueadores de anuncios');
    console.log('   - Consentimiento de cookies');
    console.log('   - Filtros en GA4');
    console.log('5. Usa: window.testEvent() para enviar un evento de prueba');
};

window.testEvent = function() {
    if (typeof window.gtag === 'function') {
        window.gtag('event', 'user_test_event', {
            event_category: 'user_action',
            event_label: 'manual_trigger',
            value: Math.floor(Math.random() * 100)
        });
        logAnalytics('✅ Evento de usuario enviado', 'success');
    } else {
        logAnalytics('❌ No se puede enviar evento - gtag no disponible', 'error');
    }
};

logAnalytics('Diagnóstico completado. Usa window.analyticsHelp() para más información.');

// 9. Monitorear cambios futuros
if (window.dataLayer) {
    const originalPush = window.dataLayer.push;
    window.dataLayer.push = function(...args) {
        const result = originalPush.apply(this, args);
        logAnalytics(`📊 Nuevo evento en dataLayer: ${JSON.stringify(args[0])}`, 'info');
        return result;
    };
    logAnalytics('Monitoreo de dataLayer activado', 'success');
}

// 10. Verificar si hay algún error de consola
console.log('\n🔍 Revisa la consola de Google Analytics:');
console.log('1. Ve a https://analytics.google.com');
console.log('2. Selecciona tu propiedad');
console.log('3. Ve a Reports > Realtime');
console.log('4. Si ves actividad, ¡GA4 está funcionando!');
console.log('5. Si no ves nada, el problema puede ser:');
console.log('   - Bloqueadores de anuncios');
console.log('   - Consentimiento de cookies no configurado');
console.log('   - Filtros excluyendo tu IP');
console.log('   - Problemas de zona horaria');