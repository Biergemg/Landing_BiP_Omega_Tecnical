import { test, expect } from '@playwright/test';

test.describe('Basic Site Tests', () => {
  test('should load the home page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/BiP Omega/);
    
    // Check main heading exists
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    
    // Check that heading contains relevant text
    const headingText = await heading.textContent();
    expect(headingText).toBeTruthy();
    expect(headingText?.toLowerCase()).toMatch(/due diligence|forensic|bess/);
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /due diligence/i);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /BiP Omega/i);
    
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /due diligence/i);
  });

  test('should have structured data', async ({ page }) => {
    await page.goto('/');
    
    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    const count = await structuredData.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify it's valid JSON
    for (let i = 0; i < count; i++) {
      const jsonText = await structuredData.nth(i).textContent();
      expect(jsonText).toBeTruthy();
      
      const parsedData = JSON.parse(jsonText!);
      expect(parsedData['@context']).toBe('https://schema.org');
    }
  });

  test('should load within performance budget', async ({ page }) => {
    await page.goto('/');
    
    // Wait for network idle
    await page.waitForLoadState('networkidle');
    
    // Check performance metrics
    const performanceTiming = await page.evaluate(() => {
      // Use PerformanceNavigationTiming instead of deprecated performance.timing
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        navigationStart: navigationEntry.startTime,
        loadEventEnd: navigationEntry.loadEventEnd
      };
    });
    
    const loadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
    
    // Should load within 5 seconds (generous for development)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check h1 exists and only one
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check h2 elements exist
    const h2Elements = page.locator('h2');
    const h2Count = await h2Elements.count();
    expect(h2Count).toBeGreaterThan(0);
    
    // Check that headings are not empty
    const h1Text = await h1Elements.textContent();
    expect(h1Text?.trim()).toBeTruthy();
  });

  test('should have alt text for images', async ({ page }) => {
    await page.goto('/');
    
    // Check all images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
    }
  });
});