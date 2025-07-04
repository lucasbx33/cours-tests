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
});
