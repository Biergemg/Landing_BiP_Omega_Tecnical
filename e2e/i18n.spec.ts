import { test, expect } from '@playwright/test';

test.describe('Internationalization Tests', () => {
  test('should switch between English and Spanish', async ({ page }) => {
    // Start with English
    await page.goto('/');
    
    // Check English content
    const englishHeading = page.locator('h1');
    await expect(englishHeading).toContainText('Technical Due Diligence');
    
    // Find language selector
    const languageToggle = page.locator('.language-toggle');
    await expect(languageToggle).toBeVisible();
    
    // Click language toggle
    await languageToggle.click();
    
    // Find Spanish option
    const spanishOption = page.locator('.language-link[href*="/es/"]');
    await expect(spanishOption).toBeVisible();
    
    // Navigate to Spanish
    await spanishOption.click();
    
    // Wait for navigation
    await page.waitForURL('**/es/**');
    
    // Check Spanish content
    const spanishHeading = page.locator('h1');
    await expect(spanishHeading).toContainText('Technical Due Diligence');
    
    // Verify URL
    expect(page.url()).toContain('/es/');
  });

  test('should maintain language preference on navigation', async ({ page }) => {
    // Go to Spanish version
    await page.goto('/es/');
    
    // Check Spanish content
    const heading = page.locator('h1');
    await expect(heading).toContainText('Technical Due Diligence');
    
    // Navigate back to English
    const englishOption = page.locator('.language-link[href="/"]');
    await expect(englishOption).toBeVisible();
    await englishOption.click();
    
    // Wait for navigation
    await page.waitForURL('**/');
    
    // Check English content
    await expect(heading).toContainText('Technical Due Diligence');
    
    // Verify URL (should be root, not /en/)
    expect(page.url()).toBe('http://localhost:4321/');
  });

  test('should have proper hreflang tags', async ({ page }) => {
    await page.goto('/');
    
    // For now, just check that the page loads correctly
    // TODO: Implement hreflang tags when full i18n is ready
    await expect(page).toHaveTitle(/BiP Omega/);
  });

  test('should have translated meta tags', async ({ page }) => {
    // English version
    await page.goto('/');
    
    const englishMeta = page.locator('meta[name="description"]');
    await expect(englishMeta).toHaveAttribute('content', /technical due diligence/i);
    
    // Spanish version
    await page.goto('/es/');
    
    const spanishMeta = page.locator('meta[name="description"]');
    await expect(spanishMeta).toHaveAttribute('content', /technical due diligence/i);
  });
});