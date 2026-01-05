import { test, expect, devices } from '@playwright/test';

// Use mobile device at the test level
test.use({
  ...devices['iPhone 12'],
});

test.describe('Mobile Navigation Tests', () => {
  test('should have working mobile navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check mobile navigation toggle exists
    const navToggle = page.locator('.nav-toggle');
    await expect(navToggle).toBeVisible();
    
    // Check mobile menu is initially hidden
    const navMenu = page.locator('.nav-menu');
    await expect(navMenu).not.toBeVisible();
    
    // Click mobile toggle
    await navToggle.click();
    
    // Check mobile menu is now visible
    await expect(navMenu).toBeVisible();
    
    // Check that toggle has correct aria-expanded
    await expect(navToggle).toHaveAttribute('aria-expanded', 'true');
    
    // Check navigation items are visible
    const navItems = navMenu.locator('.nav-item');
    await expect(navItems.first()).toBeVisible();
    
    // Click toggle again to close
    await navToggle.click();
    
    // Check mobile menu is hidden again
    await expect(navMenu).not.toBeVisible();
    await expect(navToggle).toHaveAttribute('aria-expanded', 'false');
  });

  test('should have working mobile language selector', async ({ page }) => {
    await page.goto('/');
    
    // Check language selector exists
    const languageSelector = page.locator('.language-selector');
    await expect(languageSelector).toBeVisible();
    
    // Check language toggle
    const languageToggle = languageSelector.locator('.language-toggle');
    await expect(languageToggle).toBeVisible();
    
    // Check language menu is initially hidden
    const languageMenu = languageSelector.locator('.language-menu');
    await expect(languageMenu).not.toBeVisible();
    
    // Click language toggle
    await languageToggle.click();
    
    // Check language menu is now visible
    await expect(languageMenu).toBeVisible();
    
    // Check language options
    const languageOptions = languageMenu.locator('.language-option');
    await expect(languageOptions.first()).toBeVisible();
    
    // Check Spanish option exists
    const spanishOption = languageMenu.locator('.language-link[href*="/es/"]');
    await expect(spanishOption).toBeVisible();
    
    // Click language toggle again to close
    await languageToggle.click();
    
    // Check language menu is hidden
    await expect(languageMenu).not.toBeVisible();
  });

  test('should navigate to Spanish on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Open language selector
    const languageToggle = page.locator('.language-toggle');
    await languageToggle.click();
    
    // Click Spanish option
    const spanishOption = page.locator('.language-link[href*="/es/"]');
    await spanishOption.click();
    
    // Wait for navigation
    await page.waitForURL('**/es/**');
    
    // Check we're on Spanish page
    await expect(page.locator('h1')).toContainText('Due Diligence Forense');
    expect(page.url()).toContain('/es/');
  });

  test('should have proper touch targets', async ({ page }) => {
    await page.goto('/');
    
    // Check all interactive elements have sufficient size
    const interactiveElements = page.locator('button, a, input, select, textarea');
    const elementCount = await interactiveElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 10); i++) {
      const element = interactiveElements.nth(i);
      
      // Get element dimensions
      const box = await element.boundingBox();
      if (box) {
        // Minimum touch target size is 44x44 pixels
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('should be responsive on different mobile devices', async ({ browser }) => {
    const devicesToTest = [
      devices['iPhone 12'],
      devices['Pixel 5'],
      devices['iPhone SE'],
    ];

    for (const device of devicesToTest) {
      const context = await browser.newContext({
        ...device,
      });
      
      const page = await context.newPage();
      
      await page.goto('/');
      
      // Check that content is visible
      const heroSection = page.locator('.hero');
      await expect(heroSection).toBeVisible();
      
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      
      // Check that navigation toggle is visible on mobile
      const navToggle = page.locator('.nav-toggle');
      await expect(navToggle).toBeVisible();
      
      await context.close();
    }
  });
});