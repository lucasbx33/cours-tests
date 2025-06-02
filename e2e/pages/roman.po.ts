import { expect, Locator, Page } from '@playwright/test';
import { BasePo } from './base.po';

export class RomanPo extends BasePo {

constructor(page: Page) {
    super(page);
  }

  get createRomanButton(): Locator {
    return this.page.getByRole('button', { name: 'Créer un roman' });
  }

  get headingNewRoman(): Locator {
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

  async clickCreateRoman(): Promise<void> {
    await this.createRomanButton.click();
    await expect(this.headingNewRoman).toBeVisible();
  }

  async fillRoman(title: string, content: string): Promise<void> {
    await this.titleInput.fill(title);
    await this.contentEditor.type(content, { delay: 100 });
  }

  async submit(): Promise<void> {
    await this.confirmCreateButton.click();
  }
}
