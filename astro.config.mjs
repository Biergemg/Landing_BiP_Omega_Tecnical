import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';

const sentryDsn = import.meta.env.PUBLIC_SENTRY_DSN || process.env.PUBLIC_SENTRY_DSN;

export default defineConfig({
  site: 'https://bipomega.com',
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => page !== 'https://bipomega.com/404',
    }),
    ...(sentryDsn
      ? [
          sentry({
            project: 'javascript-astro',
            org: 'bip-omega',
            dsn: sentryDsn,
            sourceMapsUploadOptions: {
              enabled: true,
            },
            clientInitOptions: {
              sendDefaultPii: false,
            },
            serverInitOptions: {
              sendDefaultPii: false,
            }
          })
        ]
      : [])
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'always'
  }
});
