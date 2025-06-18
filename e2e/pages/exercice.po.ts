import { expect, Locator, Page } from '@playwright/test';
import { BasePo } from './base.po';

export class ExercicePo extends BasePo {

constructor(page: Page) {
    super(page);
  }

  get createExerciceButton(): Locator {
    return this.page.getByRole('button', { name: 'Créer un exercice' });
  }

  get headingNewExercice(): Locator {
    return this.page.getByRole('heading', { name: 'Nouvel exercice' });
  }

  get titleInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Titre' });
  }

  get nbTourInput(): Locator {
    return this.page.getByRole('spinbutton' , {name : ' Nombre de tours'});
  }
  get dureeTourInput(): Locator {
    return this.page.getByRole('combobox', { name: 'Durée d\'un tour' });
  }
  get dureeTourOptionInput(): Locator {
    return this.page.getByRole('option', { name: '5 minutes' , exact : true});
  }

  get minMotsInput(): Locator {
    return this.page.getByRole('spinbutton' , {name : ' Minimum de mots '});
  }
  get maxMotsInput(): Locator {
    return this.page.getByRole('spinbutton' , {name : ' Maximum de mots '});
  }
  get debutHistInput(): Locator {
    return this.page.getByRole('textbox', {name : 'Écrivez le début de votre histoire :'});
  }

  get confirmCreateButton(): Locator {
    return this.page.getByRole('button', { name: 'Valider' });
  }

  async clickCreateExercice(): Promise<void> {
    await this.createExerciceButton.click();
    await expect(this.headingNewExercice).toBeVisible();
  }

  async fillExercice(title: string, nbTour: string, minMot: string, maxMot: string, debutHistoire: string): Promise<void> {
    await this.titleInput.fill(title);
    await this.nbTourInput.fill(nbTour);
    //await this.dureeTourInput.click();
    await this.minMotsInput.fill(minMot);
    await this.maxMotsInput.fill(maxMot);
    await this.debutHistInput.fill(debutHistoire);
  }

  async submit(): Promise<void> {
    await this.confirmCreateButton.click();
  }
}
