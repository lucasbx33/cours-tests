import { expect, test } from '@playwright/test';


test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    expect(await page.locator('h1').innerText()).toContain("L'imaginaire à portée de Plume !")
});

  test('has a link to the login page', async ({ page }) => {
    await page.getByRole('button', { name: 'Rejoignez-nous !' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();
  });
});