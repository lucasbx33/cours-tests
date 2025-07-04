import { test, expect } from '@playwright/test';
import { LoginPo } from '../pages/login.po';
import { NovelPo } from '../pages/novel.po';


import dotenv from "dotenv";
dotenv.config();


test.describe('Romans', () => {
  let loginPo: LoginPo;
  let novelPo: NovelPo;

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    novelPo = new NovelPo(page);

      const email = process.env.LOGIN_EMAIL_E2E!;
  const password = process.env.LOGIN_PASSWORD_E2E!;

    await loginPo.goTo();
    await loginPo.logAs(email, password);
  });

  test('should create a roman', async () => {
    await loginPo.logAsUser('alice');
    await novelPo.clickCreateNovel();
    await novelPo.fillNovel(
      'test de roman',
      'Titre principal\n\nVoici une première ligne.\nVoici une deuxième ligne.'
    );
    await novelPo.submit();
  });

  test('add chapter to a roman', async () => {
    await loginPo.logAsUser('alice');
    await novelPo.clickInNovel();
    await novelPo.newChapter();
    await novelPo.fillNovel(
      'test de roman',
      'Titre principal\n\nVoici une première ligne.\nVoici une deuxième ligne.'
    );
    await novelPo.submit();
  });

  test('create roman complet et ajout de chapitre', async ({ page }) => {
    await page.locator('#dashboardNovelsAddButton').click(); 
    await expect(page.getByRole('heading', { name: 'Nouveau roman' })).toBeVisible();
    await novelPo.fillNovel(
      'test de roman',
      'Titre principal\n\nVoici une première ligne.\nVoici une deuxième ligne.'
    );
    await page.getByRole('button', { name: 'Créer' }).click();
    await page.getByRole('button', { name: 'Ajouter un chapitre' }).click();
    
  });

  test('ajout d\'un personnage dans un roman', async ({ page }) => {
    // Aller sur la page du premier roman
    await page.locator('body > app-root > owl-writey-ui > main > owl-dashboard-page > div > div:nth-child(2) > owl-dashboard-novels > div > owl-dashboard-novel-card:nth-child(1) > div > mat-card > mat-card-footer > div > a > mat-icon').click();
    // Ouvrir le panneau des personnages
    await page.locator('body > app-root > owl-writey-ui > main > owl-novel-page > div > div > div.layout__left-panel > owl-side-panel > div > div > div > owl-novel-sidebar > div > owl-novel-sidebar-universe > div > a > span').click();
    // Cliquer sur "ajouter un personnage"
    await page.locator('body > app-root > owl-writey-ui > main > owl-novel-page > div > div > div.layout__content > owl-novel-characters-page > div > div.characters > owl-novel-corkboard > div > div.corkboard__new > a > mat-icon').click();

    // Sélectionner le premier élément du tag (combobox)
    const tagCombobox = await page.getByRole('combobox', { name: 'Ajouter un tag' });
    await tagCombobox.click();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
  });

 
});
