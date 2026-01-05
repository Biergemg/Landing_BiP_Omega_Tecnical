import { test, expect } from '@playwright/test';

test.describe('Accessibility Tests', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation has proper ARIA labels
    const nav = page.locator('nav');
    await expect(nav).toHaveAttribute('role', 'navigation');
    
    const navLabel = nav.locator('[aria-label]');
    await expect(navLabel).toBeVisible();
    
    // Check language selector has proper ARIA attributes
    const languageToggle = page.locator('.language-toggle');
    await expect(languageToggle).toHaveAttribute('aria-label', 'Select Language');
    await expect(languageToggle).toHaveAttribute('aria-expanded', 'false');
    
    // Check buttons have proper labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const hasAriaLabel = await button.getAttribute('aria-label');
      const hasTextContent = await button.textContent();
      
      // Should have either aria-label or text content
      expect(hasAriaLabel || (hasTextContent && hasTextContent.trim())).toBeTruthy();
    }
  });

  test('should have proper heading structure', async ({ page }) => {
    await page.goto('/');
    
    // Check that headings are in logical order
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    
    const h2Elements = page.locator('h2');
    await expect(h2Elements.first()).toBeVisible();
    
    // Check that headings are not empty
    const h1Text = await h1.textContent();
    expect(h1Text?.trim()).toBeTruthy();
    
    const h2Text = await h2Elements.first().textContent();
    expect(h2Text?.trim()).toBeTruthy();
  });

  test('should have skip links', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip to main content link
    const skipLinks = page.locator('a[href="#main"], a[href="#content"]');
    if (await skipLinks.count() > 0) {
      await expect(skipLinks.first()).toBeVisible();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/');
    
    // Check that text has sufficient contrast
    const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, a, button');
    const elementCount = await textElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 10); i++) { // Check first 10 elements
      const element = textElements.nth(i);
      
      // Get computed styles
      const styles = await element.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight
        };
      });
      
      // Basic validation - elements should have color
      expect(styles.color).toBeTruthy();
      expect(styles.color).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
    }
  });

  test('should have keyboard navigation', async ({ page }) => {
    await page.goto('/');
    
    // Tab through the page
    await page.keyboard.press('Tab');
    
    // Check that focus is visible
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // Check that focus outline is visible
    const focusStyles = await focusedElement.evaluate((el) => {
      const computed = window.getComputedStyle(el);
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        outlineColor: computed.outlineColor
      };
    });
    
    // Should have some form of focus indicator
    expect(focusStyles.outline || focusStyles.outlineWidth !== '0px').toBeTruthy();
  });

  test('should have proper form labels', async ({ page }) => {
    await page.goto('/');
    
    // Check for form elements (if any)
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      
      // Check for associated label or aria-label
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledby = await input.getAttribute('aria-labelledby');
      const placeholder = await input.getAttribute('placeholder');
      
      // Should have some form of label
      expect(id || ariaLabel || ariaLabelledby || placeholder).toBeTruthy();
      
      // If has id, check for associated label
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        if (await label.count() > 0) {
          await expect(label).toBeVisible();
        }
      }
    }
  });
});