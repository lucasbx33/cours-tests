import { test, expect } from '@playwright/test';
import { LoginPo } from '../pages/login.po';
import { ExercicePo } from '../pages/exercice.po';

async function login(page) {
  await page.goto('/login');
  await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Email' }).fill('tancrede.castets@gmail.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('contis40');
  await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

  await expect(page.getByRole('heading', { name: 'Mes Romans' })).toBeVisible();
}

test.describe('Exercices', () => {
  let loginPo: LoginPo;
  let exercicePo: ExercicePo;
  

  test.beforeEach(async ({ page }) => {
    loginPo = new LoginPo(page);
    exercicePo = new ExercicePo(page);

    await loginPo.goTo();
    await loginPo.logAs('lucasreynaud4@gmail.com', 'JesuisLucas33!');
  });
  

  test('should create a Exercice', async () => {
    await loginPo.logAsUser('alice');
    await exercicePo.clickCreateExercice();
    await exercicePo.fillExercice(
      'test de Exercice',
      '5',
      '1',
      '3',
      'Test de la creation exercice'
    );
    await exercicePo.submit();

    // Optionnel : vérifie que le Exercice a bien été créé
    //await expect(loginPo.page.getByText('test de Exercice')).toBeVisible();
  });
});

 test('create exercice complet', async ({ page }) =>{
    await login(page);

    await page.locator('#dashboardExercisesHeader > button').click();

    await expect(page.getByRole('heading', { name: 'Nouvel exercice' })).toBeVisible();

    // remplissage de l'exercice 
     await page.getByRole('textbox' , {name : 'Titre'}).fill('France');
     await page.getByRole('spinbutton' , {name : ' Nombre de tours'}).fill('10');
     await page.getByRole('combobox', { name: 'Durée d\'un tour' }).click();
     await page.getByRole('option', { name: '15 minutes' , exact : true}).click();
     await page.getByRole('spinbutton' , {name : ' Minimum de mots '}).fill('3');
     await page.getByRole('spinbutton' , {name : ' Maximum de mots '}).fill('15');
    await page.getByRole('textbox', {name : 'Écrivez le début de votre histoire :'}).fill('Arriver en france a Paris');

    // validation et retour a la page dashboard
      await page.getByRole('button', { name: 'Valider' }).click();
      await page.getByText('tancrède').click();
      await page.getByText('Dashboard' ).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();



  });

  test('create exercice complet et supression', async ({ page }) =>{
    await login(page);

    await page.locator('#dashboardExercisesHeader > button').click();

    await expect(page.getByRole('heading', { name: 'Nouvel exercice' })).toBeVisible();

    // remplissage de l'exercice 
     await page.getByRole('textbox' , {name : 'Titre'}).fill('France');
     await page.getByRole('spinbutton' , {name : ' Nombre de tours'}).fill('10');
     await page.getByRole('combobox', { name: 'Durée d\'un tour' }).click();
     await page.getByRole('option', { name: '15 minutes' , exact : true}).click();
     await page.getByRole('spinbutton' , {name : ' Minimum de mots '}).fill('3');
     await page.getByRole('spinbutton' , {name : ' Maximum de mots '}).fill('15');
    await page.getByRole('textbox', {name : 'Écrivez le début de votre histoire :'}).fill('Arriver en france a Paris');

    // validation, supression et retour a la page dashboard
      await page.getByRole('button', { name: 'Valider' }).click();
      await page.locator('a[title="Supprimer"]').click();
      await page.getByRole('button',{ name: 'Oui'}).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();



  });

  test('delete exercice ', async ({ page }) =>{
    await login(page);

    await page.locator('body > app-root > owl-writey-ui > main > owl-dashboard-page > div > div:nth-child(4) > owl-dashboard-exercises > div > owl-dashboard-exercise-card:nth-child(1) > div > mat-card > mat-card-footer > div > a > mat-icon').click();

    await expect(page.getByRole('heading', { name: 'France' })).toBeVisible();
    
    // supression de l'exercice
    await page.locator('body > app-root > owl-writey-ui > main > owl-exercise-page > div > div.exercise-page__header > owl-exercise-header-toolbar > div > div.exercise-toolbar__delete > a > mat-icon').click();
      await page.getByRole('button',{ name: 'Oui'}).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();


  });

test('finish exercice ', async ({ page }) =>{
    await login(page);

    await page.locator('body > app-root > owl-writey-ui > main > owl-dashboard-page > div > div:nth-child(4) > owl-dashboard-exercises > div > owl-dashboard-exercise-card:nth-child(1) > div > mat-card > mat-card-footer > div > a > mat-icon').click();

    await expect(page.getByRole('heading', { name: 'France' })).toBeVisible();
    
    // terminer l'exercice
    await page.locator('body > app-root > owl-writey-ui > main > owl-exercise-page > div > div.exercise-page__header > owl-exercise-header-toolbar > div > div.exercise-toolbar__finish > a > mat-icon').click();
      await page.getByRole('button',{ name: 'Oui'}).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();


  });

  test('link exercice ', async ({ page }) =>{
    await login(page);

    await page.locator('body > app-root > owl-writey-ui > main > owl-dashboard-page > div > div:nth-child(4) > owl-dashboard-exercises > div > owl-dashboard-exercise-card:nth-child(1) > div > mat-card > mat-card-footer > div > a > mat-icon').click();

    await expect(page.getByRole('heading', { name: 'France' })).toBeVisible();
    
    // partager l'exercice
    await page.locator('body > app-root > owl-writey-ui > main > owl-exercise-page > div > div.exercise-page__header > owl-exercise-header-toolbar > div > div.exercise-toolbar__link > a > mat-icon').click();
      await page.getByRole('button',{ name: 'Copier'}).click();
      await page.getByRole('button',{ name: 'Fermer'}).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();


  });

  test('jouer à l\'exercice ', async ({ page }) =>{
    await login(page);

    await page.locator('body > app-root > owl-writey-ui > main > owl-dashboard-page > div > div:nth-child(4) > owl-dashboard-exercises > div > owl-dashboard-exercise-card:nth-child(1) > div > mat-card > mat-card-footer > div > a > mat-icon').click();

    await expect(page.getByRole('heading', { name: 'France' })).toBeVisible();
    
    // partager l'exercice
      await page.getByRole('button',{ name: ' À mon tour ! '}).click();
      await page.locator('[contenteditable="true"]').click();
      await page.keyboard.type('test test test');
      await page.getByRole('button',{ name: 'Soumettre'}).click();
      await expect(page.getByRole('heading', { name: 'France' })).toBeVisible();

    
  });