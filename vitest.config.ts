/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
    // @ts-ignore - Vitest config types are not automatically merged with Vite types in all environments
    test: {
        environment: 'jsdom',
        include: ['src/**/*.test.{ts,tsx}'],
        setupFiles: ['./vitest.setup.ts'],
        globals: true,
    },
});
