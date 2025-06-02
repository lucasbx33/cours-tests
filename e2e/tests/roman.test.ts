import { test, expect } from '@playwright/test';
import { LoginPo } from '../pages/login.po';
import { RomanPo } from '../pages/roman.po';

test.describe('Romans', () => {
  let loginPo: LoginPo;
  let romanPo: RomanPo;

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    romanPo = new RomanPo(page);

    await loginPo.goTo();
    await loginPo.logAs('lucasreynaud4@gmail.com', 'JesuisLucas33!');
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
