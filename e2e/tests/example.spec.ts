import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Owl Writey/);
});

test('login page', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('button', { name: 'Rejoignez-nous !' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();
});

test('login error', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('fdasryvb@gmail.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('ercvtgbhnjJ!');

  // Expects page to have a heading with the name of Installation.
  await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

  await expect(page.getByText('Erreur de connexion')).toBeVisible();
});

test('login ok', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('lucasreynaud4@gmail.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('JesuisLucas33!');

  // Expects page to have a heading with the name of Installation.
  await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

  await expect(page.getByRole('heading', { name: 'Mes romans' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();
});
