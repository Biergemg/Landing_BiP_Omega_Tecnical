import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://bipomega.com',
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => page !== 'https://bipomega.com/404',
    }),
    sentry({
      project: "javascript-astro",
      org: "bip-omega",
      dsn: import.meta.env.PUBLIC_SENTRY_DSN || process.env.PUBLIC_SENTRY_DSN,
      sourceMapsUploadOptions: {
        enabled: true,
      },
      clientInitOptions: {
        sendDefaultPii: false, // STRICTLY DISABLED for privacy compliance
      },
      serverInitOptions: {
        sendDefaultPii: false,
      }
    })
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'always'
  }
});