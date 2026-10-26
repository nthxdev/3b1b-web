import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('home page loads', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      name: '3Blue1Brown Web',
    }),
  ).toBeVisible()
})

test('vectors lesson can be opened', async ({ page }) => {
  await page.goto('/')

  await page
    .getByRole('link', { name: /vectors/i })
    .first()
    .click()

  await expect(page).toHaveURL(/\/lessons\/vectors$/)

  await expect(
    page.getByRole('heading', { name: 'Vectors' }).first(),
  ).toBeVisible()
})

test('homepage has no detected WCAG A/AA violations', async ({ page }) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
