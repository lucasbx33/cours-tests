import { test, expect } from '@playwright/test';
import { LoginPo } from '../pages/login.po';
import { ExercicePo } from '../pages/exercice.po';

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
    await page.goto('/login');

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();

    // connexion email et password 
    await page.getByRole('textbox' , {name : 'Email'}).fill('tancrede.castets@gmail.com');
    await page.getByRole('textbox', {name : 'Mot de passe'}).fill('contis40');

    await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

    await expect(page.getByRole('heading', {name : 'Mes Romans'})).toBeVisible();

    await page.getByRole('button', { name: ' Créer un exercice ' }).click();

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
      await page.getByRole('heading',{ name: 'menu'}).click();
      await page.getByRole('button', { name: 'Dashboard' }).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();



  });

  test('create exercice complet et supression', async ({ page }) =>{
    await page.goto('/login');

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();

    // connexion email et password 
    await page.getByRole('textbox' , {name : 'Email'}).fill('tancrede.castets@gmail.com');
    await page.getByRole('textbox', {name : 'Mot de passe'}).fill('contis40');

    await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

    await expect(page.getByRole('heading', {name : 'Mes Romans'})).toBeVisible();

    await page.getByRole('button', { name: ' Créer un exercice ' }).click();

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
      await page.getByRole('link',{ name: 'Supprimer'}).click();
      await page.getByRole('button',{ name: 'Oui'}).click();
      await page.getByRole('button', { name: 'Dashboard' }).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();



  });

  test('create exercice incomplet', async ({ page }) =>{
    await page.goto('/login');

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();

    // connexion email et password 
    await page.getByRole('textbox' , {name : 'Email'}).fill('tancrede.castets@gmail.com');
    await page.getByRole('textbox', {name : 'Mot de passe'}).fill('contis40');

    await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

    await expect(page.getByRole('heading', {name : 'Mes Romans'})).toBeVisible();

    await page.getByRole('button', { name: ' Créer un exercice ' }).click();

    await expect(page.getByRole('heading', { name: 'Nouvel exercice' })).toBeVisible();

    await page.getByRole('button', { name: 'Valider' }).click();

    await expect(page.getByRole('heading', { name: 'Nouvel exercice' })).toBeVisible();

  });

  test('delete all exercice ', async ({ page }) =>{
    await page.goto('/login');

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();

    // connexion email et password 
    await page.getByRole('textbox' , {name : 'Email'}).fill('tancrede.castets@gmail.com');
    await page.getByRole('textbox', {name : 'Mot de passe'}).fill('contis40');

    await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

    await expect(page.getByRole('heading', {name : 'Mes Romans'})).toBeVisible();


  });
