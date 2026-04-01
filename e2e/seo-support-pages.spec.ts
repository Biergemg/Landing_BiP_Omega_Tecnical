import { test, expect } from '@playwright/test';

const pages = [
  {
    url: '/technical-due-diligence-bess/',
    title: /Technical Due Diligence for BESS Projects/i,
    canonical: 'https://bipomega.com/technical-due-diligence-bess/'
  },
  {
    url: '/independent-engineer-bess/',
    title: /Independent Engineer for BESS/i,
    canonical: 'https://bipomega.com/independent-engineer-bess/'
  },
  {
    url: '/forensic-case-study/',
    title: /Forensic Case Study/i,
    canonical: 'https://bipomega.com/forensic-case-study/'
  }
];

test.describe('SEO support pages', () => {
  for (const pageConfig of pages) {
    test(`renders ${pageConfig.url} with canonical and metadata`, async ({ page }) => {
      await page.goto(pageConfig.url);
      await expect(page).toHaveTitle(pageConfig.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', pageConfig.canonical);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /BESS|battery|technical|risk/i);
      await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
    });
  }

  test('footer links expose internal technical resources', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('link', { name: 'Technical Due Diligence for BESS' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Independent Engineer BESS' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Forensic Case Study' })).toBeVisible();
  });

  test('google verification tag is absent by default when env is unset', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="google-site-verification"]')).toHaveCount(0);
  });
});
