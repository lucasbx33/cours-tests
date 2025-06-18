import { expect, Locator, Page } from '@playwright/test';
import { BasePo } from './base.po';

export class NovelPo extends BasePo {

constructor(page: Page) {
    super(page);
  }

  get createNovelButton(): Locator {
    return this.page.getByRole('button', { name: 'Créer un roman' });
  }

  get clickInNovelButton(): Locator {
    return this.page.getByRole('button', { name: 'Ouvrir le romans' }).nth(0);
  }

  get boxChapter(): Locator {
    return this.page.locator('.clickInNewChapter');
  }

  get clickInNewChapterButton(): Locator {
    return this.page.getByRole('button', { name: 'Ajouter un chapitre' });
  }

  get headingNewNovel(): Locator {
    return this.page.getByRole('heading', { name: 'Nouveau roman' });
  }

  get titleInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Titre du roman' });
  }

  get contentEditor(): Locator {
    return this.page.locator('.NgxEditor__Content');
  }

  get confirmCreateButton(): Locator {
    return this.page.getByRole('button', { name: 'Créer' });
  }

  async clickCreateNovel(): Promise<void> {
    await this.createNovelButton.click();
    await expect(this.headingNewNovel).toBeVisible();
  }

  async clickInNovel(): Promise<void> {
    await this.clickInNovelButton.click();
  }

  async newChapter(): Promise<void> {
    const hasNovel = await expect(this.boxChapter).toBeVisible().catch(() => false);
    if(!hasNovel){
      await this.clickInNewChapterButton.click();
    }else{

    }
  }

  async fillNovel(title: string, content: string): Promise<void> {
    await this.titleInput.fill(title);
    await this.contentEditor.type(content, { delay: 100 });
  }

  async submit(): Promise<void> {
    await this.confirmCreateButton.click();
  }
}
