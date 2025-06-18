import { test, expect } from '@playwright/test';
import { LoginPo } from '../pages/login.po';
import { NovelPo } from '../pages/novel.po';

test.describe('Romans', () => {
  let loginPo: LoginPo;
  let novelPo: NovelPo;

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    novelPo = new NovelPo(page);

    await loginPo.goTo();
    await loginPo.logAs('lucasreynaud4@gmail.com', 'JesuisLucas33!');
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
