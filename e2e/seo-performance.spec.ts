import { test, expect } from '@playwright/test';

test.describe('SEO and Performance Tests', () => {
  test('should have proper SEO structure', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/BiP Omega/);
    
    // Check meta tags
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /forensic due diligence|technical due diligence/i);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /BiP Omega/);
    
    const ogDescription = page.locator('meta[property="og:description"]');
    await expect(ogDescription).toHaveAttribute('content', /forensic due diligence/i);
    
    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute('content', /og-image/);
    
    const ogUrl = page.locator('meta[property="og:url"]');
    await expect(ogUrl).toHaveAttribute('content', /bipomega.com/);
    
    // Check Twitter card tags
    const twitterCard = page.locator('meta[name="twitter:card"]');
    await expect(twitterCard).toHaveAttribute('content', 'summary_large_image');
    
    const twitterTitle = page.locator('meta[name="twitter:title"]');
    await expect(twitterTitle).toHaveAttribute('content', /BiP Omega/);
    
    const twitterDescription = page.locator('meta[name="twitter:description"]');
    await expect(twitterDescription).toHaveAttribute('content', /forensic due diligence/i);
  });

  test('should have breadcrumb structured data', async ({ page }) => {
    // Navigate to a sub-page
    await page.goto('/es/');
    
    // Check for breadcrumb structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    const jsonText = await structuredData.textContent();
    
    expect(jsonText).toBeTruthy();
    const parsedData = JSON.parse(jsonText!);
    
    // Should have breadcrumb list
    const breadcrumbData = Array.isArray(parsedData) 
      ? parsedData.find(item => item['@type'] === 'BreadcrumbList')
      : parsedData;
    
    if (breadcrumbData) {
      expect(breadcrumbData['@type']).toBe('BreadcrumbList');
      expect(breadcrumbData.itemListElement).toBeDefined();
      expect(Array.isArray(breadcrumbData.itemListElement)).toBe(true);
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
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
    
    // Check for Core Web Vitals
    const lcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          resolve(entries[entries.length - 1]?.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    });
    
    // LCP should be under 2.5 seconds
    expect(lcp).toBeLessThan(2500);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check h1 exists and only one
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check h2 elements exist
    const h2Elements = page.locator('h2');
    await expect(h2Elements.first()).toBeVisible();
    
    // Check heading content
    await expect(h1Elements).toContainText('Technical Due Diligence');
    await expect(h2Elements.first()).toContainText('The Problem');
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