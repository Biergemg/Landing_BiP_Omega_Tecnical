import * as Sentry from "@sentry/astro";

Sentry.init({
    dsn: "https://d16b2e65cc81cfad1de678dd48938797@o4510650633027584.ingest.us.sentry.io/4510650642399232",
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/astro/configuration/options/#sendDefaultPii
    sendDefaultPii: true,
    tracesSampleRate: 1.0,
});
