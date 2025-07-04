import { test, expect } from '@playwright/test';
import { LoginPo } from '../pages/login.po';
import { RomanPo } from '../pages/roman.po';


import dotenv from "dotenv";
dotenv.config();


test.describe('Romans', () => {
  let loginPo: LoginPo;
  let romanPo: RomanPo;

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    romanPo = new RomanPo(page);

      const email = process.env.LOGIN_EMAIL_E2E!;
  const password = process.env.LOGIN_PASSWORD_E2E!;

    await loginPo.goTo();
    await loginPo.logAs(email, password);
  });

  test('should create a roman', async () => {
    await loginPo.logAsUser('alice');
    await romanPo.clickCreateRoman();
    await romanPo.fillRoman(
      'test de roman',
      'Titre principal\n\nVoici une première ligne.\nVoici une deuxième ligne.'
    );
    await romanPo.submit();

    // Optionnel : vérifie que le roman a bien été créé
    //await expect(loginPo.page.getByText('test de roman')).toBeVisible();
  });
});
