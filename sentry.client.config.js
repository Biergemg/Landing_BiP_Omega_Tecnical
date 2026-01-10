import * as Sentry from "@sentry/astro";

try {
    Sentry.init({
        dsn: "https://d16b2e65cc81cfad1de678dd48938797@o4510650633027584.ingest.us.sentry.io/4510650642399232",
        // Adds request headers and IP for users, for more info visit:
        // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
        sendDefaultPii: true,
        integrations: [
            Sentry.browserTracingIntegration(),
            Sentry.replayIntegration(),
        ],
        // Tracing
        tracesSampleRate: 1.0, // Capture 100% of the transactions
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    });
} catch (e) {
    // Fail silently - error monitoring is optional
    console.warn('Sentry initialization failed:', e);
}
