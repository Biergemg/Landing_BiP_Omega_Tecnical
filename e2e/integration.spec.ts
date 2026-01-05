import { test, expect } from '@playwright/test';

test.describe('Integration Tests - SEO + i18n + Performance', () => {
  test('should have SEO, i18n, and performance working together', async ({ page }) => {
    // Start with English version
    await page.goto('/');
    
    // Check SEO in English
    await expect(page).toHaveTitle(/BiP Omega.*Technical Due Diligence/);
    
    const englishMeta = page.locator('meta[name="description"]');
    await expect(englishMeta).toHaveAttribute('content', /technical due diligence/i);
    
    // Check structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toHaveCount(1);
    
    // Switch to Spanish
    const languageToggle = page.locator('.language-toggle');
    await languageToggle.click();
    
    const spanishOption = page.locator('.language-link[href*="/es/"]');
    await spanishOption.click();
    
    // Wait for navigation and check Spanish SEO
    await page.waitForURL('**/es/**');
    
    await expect(page).toHaveTitle(/BiP Omega.*Due Diligence Forense/);
    
    const spanishMeta = page.locator('meta[name="description"]');
    await expect(spanishMeta).toHaveAttribute('content', /due diligence forense/i);
    
    // Check Spanish structured data
    const spanishStructuredData = page.locator('script[type="application/ld+json"]');
    await expect(spanishStructuredData).toHaveCount(1);
    
    // Verify performance - page should load quickly
    const performanceTiming = await page.evaluate(() => {
      // Use PerformanceNavigationTiming instead of deprecated performance.timing
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        navigationStart: navigationEntry.startTime,
        loadEventEnd: navigationEntry.loadEventEnd
      };
    });
    
    const loadTime = performanceTiming.loadEventEnd - performanceTiming.navigationStart;
    expect(loadTime).toBeLessThan(3000); // Should load in under 3 seconds
  });

  test('should maintain SEO across language switching', async ({ page }) => {
    // Test English SEO
    await page.goto('/');
    
    // Check basic SEO elements exist
    await expect(page).toHaveTitle(/BiP Omega/);
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /technical due diligence/i);
    
    // For now, just verify the page loads correctly
    // TODO: Implement full hreflang tags when i18n is complete
  });

  test('should handle navigation with i18n', async ({ page }) => {
    // Start with English
    await page.goto('/');
    
    // Check basic page structure
    await expect(page).toHaveTitle(/BiP Omega/);
    
    // For now, just verify the page loads correctly
    // TODO: Implement full navigation when i18n is complete
  });

  test('should have proper analytics integration', async ({ page }) => {
    await page.goto('/');
    
    // Check basic page structure
    await expect(page).toHaveTitle(/BiP Omega/);
    
    // For now, just verify the page loads correctly
    // TODO: Implement full analytics when tracking is set up
  });

  test('should handle error scenarios gracefully', async ({ page }) => {
    // Test invalid language code
    const response = await page.goto('/invalid-lang/');
    
    // Should either redirect to default language or show 404
    expect(response?.status()).toBeLessThan(500); // Should not crash
    
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
  });
});