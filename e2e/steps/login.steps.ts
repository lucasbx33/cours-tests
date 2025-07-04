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
  const email = process.env.LOGIN_EMAIL_E2E;
  const password = process.env.LOGIN_PASSWORD_E2E;

  if (!email || !password) {
    throw new Error("Variables d'environnement manquantes : LOGIN_EMAIL_E2E ou LOGIN_PASSWORD_E2E");
  }

  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill(password);
});

When('je clique sur le bouton de connexion', async () => {
  await page.getByRole('button', { name: 'Connexion' }).nth(1).click();
});

Then('je devrais voir la page {string}', async function ({}, titre: string) {
  await expect(page.getByRole('heading', { name: titre })).toBeVisible();
});
