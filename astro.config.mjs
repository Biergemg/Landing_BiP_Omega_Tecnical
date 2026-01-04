import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sentry({
      project: "javascript-astro",
      org: "bip-omega",
      dsn: "https://d16b2e65cc81cfad1de678dd48938797@o4510650633027584.ingest.us.sentry.io/4510650642399232",
      sourceMapsUploadOptions: {
        enabled: false, // Disabled for now to avoid auth token requirements
      },
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'always'
  }
});