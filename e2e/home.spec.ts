import { test, expect } from '@playwright/test';

test.describe('Home Page Tests', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/BiP Omega.*Technical Due Diligence/i);
    
    // Check main heading (get the first h1 specifically)
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Technical Due Diligence for Investment Decision Gating');
    
    // Check hero section exists
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();
    
    // Check CTA buttons exist
    const ctaButton = page.locator('.btn-primary').first();
    await expect(ctaButton).toBeVisible();
    await expect(ctaButton).toContainText('Request Initial Scope');
  });

  test('should navigate to different sections', async ({ page }) => {
    await page.goto('/');
    
    // Check if key sections are visible using more reliable selectors
    await expect(page.getByRole('heading', { name: 'Methodology', exact: true })).toBeVisible();
    await expect(page.locator('section').filter({ hasText: /contact/i }).first()).toBeVisible();
    
    // Check for key content elements
    await expect(page.locator('text=investment decision gating')).toBeVisible();
    await expect(page.locator('text=public CEQA/NEPA filings')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /technical due diligence|investment decision gating/i);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /BiP Omega.*Technical Due Diligence/i);
    
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /technical due diligence|investment decision gating/i);
  });

  test('should have structured data', async ({ page }) => {
    await page.goto('/');
    
    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    const count = await structuredData.count();
    expect(count).toBeGreaterThan(0);
    
    // Check that at least one script has the expected structure
    let foundValidStructuredData = false;
    for (let i = 0; i < count; i++) {
      const jsonText = await structuredData.nth(i).textContent();
      if (jsonText) {
        try {
          const parsedData = JSON.parse(jsonText);
          if (parsedData['@context'] === 'https://schema.org' && parsedData['@type']) {
            foundValidStructuredData = true;
            break;
          }
        } catch (e) {
          // Continue to next script if this one fails to parse
        }
      }
    }
    
    expect(foundValidStructuredData).toBe(true);
  });
});