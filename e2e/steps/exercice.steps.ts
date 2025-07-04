import { createBdd } from 'playwright-bdd';
import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { expect } from '@playwright/test';

let browser: Browser;
let context: BrowserContext;
let page: Page;

const { BeforeAll, Before, AfterAll, After, Given, When, Then } = createBdd();

BeforeAll(async () => {
  browser = await chromium.launch({ headless: false });
});

AfterAll(async () => {
  await browser.close();
});

Before(async () => {
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await context.close();
});


Given('je suis sur la page de connexion', async () => {
  await page.goto('https://owl-writey.hemit.fr/login');
});

When('je renseigne mon email et mon mot de passe', async () => {
  const email = __ENV.LOGIN_EMAIL_E2E;
  const password = __ENV.LOGIN_PASSWORD_E2E;

  if (!email || !password) {
    throw new Error('Les variables LOGIN_EMAIL_E2E et LOGIN_PASSWORD_E2E doivent être définies.');
  }

  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill(password);
});

When('je clique sur le bouton Connexion', async () => {
  await page.getByRole('button', { name: 'Connexion' }).nth(1).click();
});

Then('je devrais voir la page "Mes exercices"', async () => {
  await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();
});

When('je clique sur un exercice existant', async () => {
  await page.locator('body > app-root > owl-writey-ui > main > owl-dashboard-page > div > div:nth-child(4) > owl-dashboard-exercises > div > owl-dashboard-exercise-card:nth-child(1) > div > mat-card > mat-card-footer > div > a > mat-icon').click();
});

When('je clique sur " À mon tour ! "', async () => {
  await page.getByRole('button',{ name: ' À mon tour ! '}).click();
});

When("j'écris un texte dans l'exercice", async () => {
    await page.locator('[contenteditable="true"]').click();
    await page.keyboard.type('test test test');
      
});

Then('je valide ma participation', async () => {
  await page.getByRole('button',{ name: 'Soumettre'}).click();
});


