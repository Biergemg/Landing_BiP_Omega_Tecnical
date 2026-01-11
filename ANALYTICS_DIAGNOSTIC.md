# 📊 Diagnóstico de Google Analytics - BiP Omega

## 🎯 Problemas Reportados
- ❌ No se registran eventos en Google Analytics
- ❌ No se registran visitas en Google Analytics
- ⚠️ CloudFlare muestra muchas métricas (tráfico real)

## 🔍 Análisis de la Implementación

### ✅ Configuración Correcta Encontrada
1. **Google Analytics 4 ID**: `G-KRV707DJ7F` está correctamente configurado
2. **Scripts de GA4**: Cargados en todas las páginas
3. **Eventos Personalizados**: Implementados (scroll, PDF downloads, pricing views)
4. **Web Vitals**: Configurados para métricas de rendimiento
5. **Page Views**: Automáticamente enviados con datos enriquecidos

### 📋 Implementación Detallada

#### Archivos de Analytics:
- `src/lib/analytics/init.ts` - Inicialización principal
- `src/components/partials/Analytics.astro` - Componente de Astro
- `src/lib/analytics/events/customEvents.ts` - Eventos personalizados
- `src/lib/analytics/gtag.ts` - Configuración de gtag
- `src/lib/analytics/proxy/sendEvent.ts` - Envío de eventos

#### Eventos Configurados:
1. **Page Views** - Automáticos con datos del visitante
2. **Scroll Depth** - 50% y 90% de scroll
3. **PDF Downloads** - Clicks en enlaces PDF
4. **Pricing Views** - Visualización de sección de precios
5. **Time on Pricing** - Tiempo en sección de precios

## 🚨 Posibles Causas del Problema

### 1. Bloqueadores de Anuncios
**Síntoma**: Analytics no registra nada pero CloudFlare sí
**Solución**: Los usuarios con bloqueadores no aparecerán en GA

### 2. Consentimiento de Cookies (GDPR)
**Síntoma**: GA4 requiere consentimiento explícito en algunos países
**Verificación**: Revisar si hay banner de cookies implementado

### 3. Configuración de GA4
**Síntoma**: Los eventos se envían pero no aparecen en el dashboard
**Verificación**: 
- Verificar en GA4: Reports > Realtime
- Verificar en GA4: Reports > Engagement > Events

### 4. Problemas de DNS/Proxy
**Síntoma**: CloudFlare ve tráfico pero GA no
**Verificación**: Revisar configuración de CloudFlare

## 🧪 Pruebas Recomendadas

### Test 1: Verificación en Tiempo Real
1. Abrir Google Analytics
2. Ir a Reports > Realtime
3. Navegar al sitio en una ventana incógnita
4. Verificar si aparece el usuario activo

### Test 2: Consola del Navegador
1. Abrir el sitio en Chrome
2. Presionar F12 > Consola
3. Ejecutar: `window.gtag`
4. Debe mostrar: `ƒ gtag() { [native code] }`

### Test 3: Network Tab
1. Abrir Network tab en DevTools
2. Filtrar por "collect" o "google"
3. Deben aparecer peticiones a google-analytics.com

### Test 4: dataLayer
1. En consola ejecutar: `window.dataLayer`
2. Debe mostrar un array con eventos

## 🔧 Soluciones Inmediatas

### 1. Verificar Consentimiento
```javascript
// Si hay banner de cookies, asegurar que GA se active después del consentimiento
if (userConsentGiven) {
    window.gtag('consent', 'update', {
        'analytics_storage': 'granted'
    });
}
```

### 2. Desactivar Modo de Depuración
```javascript
// En init.ts, cambiar:
window.gtag('config', 'G-KRV707DJ7F', {
    anonymize_ip: true,
    send_page_view: false,
    debug_mode: false // Asegurar que esté en false
});
```

### 3. Forzar Envío de Eventos
```javascript
// Prueba manual en consola:
window.gtag('event', 'test_event', {
    event_category: 'debug',
    event_label: 'manual_test',
    value: 1
});
```

## 📊 Diagnóstico con Herramientas

### 1. Analytics Audit Tool
Usar el archivo: `/analytics-audit.html`
- Abrir en navegador
- Ejecutar pruebas
- Verificar resultados

### 2. Google Tag Assistant
- Instalar extensión de Chrome
- Verificar que GA4 esté funcionando
- Identificar errores

### 3. GA4 Debug View
1. GA4 > Configure > DebugView
2. Activar debug_mode en el sitio
3. Ver eventos en tiempo real

## 🎯 Próximos Pasos

1. **Ejecutar pruebas de auditoría** con el archivo creado
2. **Verificar dashboard de GA4** en tiempo real
3. **Revisar configuración de CloudFlare** (posibles bloqueos)
4. **Implementar banner de cookies** si no existe
5. **Monitorear durante 24-48 horas** después de cambios

## 🆘 Si el Problema Persiste

1. **Verificar propiedad GA4**: Asegurar que el ID sea correcto
2. **Revisar filtros**: No hay filtros excluyendo tráfico
3. **Verificar zona horaria**: Coincida con tu ubicación
4. **Contactar soporte de Google**: Si todo lo demás falla

---
**Nota**: CloudFlare mostrando "muchas métricas" es buena señal - indica que hay tráfico real. El problema está en la capa de tracking de GA4, no en la infraestructura.