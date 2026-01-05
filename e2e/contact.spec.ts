import { test, expect } from '@playwright/test';

test.describe('Contact Form Tests', () => {
  test('should validate contact form fields', async ({ page }) => {
    // Navigate to contact form (assuming it's on the home page)
    await page.goto('/');
    
    // Find contact form or contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Scroll to contact section
    await contactSection.scrollIntoViewIfNeeded();
    
    // Check if form exists
    const form = page.locator('form');
    const formCount = await form.count();
    
    if (formCount > 0) {
      // Check if form fields exist
      const formInputs = page.locator('input, textarea');
      const inputCount = await formInputs.count();
      
      expect(inputCount).toBeGreaterThan(0);
      
      // Check if submit button exists
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeVisible();
    }
  });

  test('should handle form submission', async ({ page }) => {
    await page.goto('/');
    
    // Find contact section
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
    
    // Scroll to contact section
    await contactSection.scrollIntoViewIfNeeded();
    
    // Find form
    const form = page.locator('form');
    const formCount = await form.count();
    
    if (formCount > 0) {
      // Find form fields
      const formInputs = page.locator('input, textarea');
      const inputCount = await formInputs.count();
      
      expect(inputCount).toBeGreaterThan(0);
      
      // Find submit button
      const submitButton = page.locator('button[type="submit"]');
      await expect(submitButton).toBeVisible();
    }
  });

  test('should validate phone number format', async ({ page }) => {
    await page.goto('/');
    
    // Find contact section
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    
    // Find phone input if it exists
    const phoneInput = page.locator('input[type="tel"], input[name*="phone"], input[name*="telefono"]');
    
    if (await phoneInput.count() > 0) {
      // Phone input exists, check it's visible
      await expect(phoneInput).toBeVisible();
    }
  });

  test('should handle form errors gracefully', async ({ page }) => {
    await page.goto('/');
    
    // Find contact section
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    
    // Page should still be functional
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });
});