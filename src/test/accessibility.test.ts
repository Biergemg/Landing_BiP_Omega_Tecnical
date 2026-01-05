import { describe, it, expect } from 'vitest';
import { axe } from 'vitest-axe';

describe('Accessibility Checks', () => {
    it('should have no violations for basic button html', async () => {
        const html = '<button class="btn-primary">Click me</button>';
        const results = await axe(html);
        expect(results.violations.length).toBe(0);
    });

    it('should detect violations in bad html', async () => {
        // Image without alt text
        const html = '<img src="logo.png" />';
        const results = await axe(html);
        expect(results.violations.length).toBeGreaterThan(0);
    });
});