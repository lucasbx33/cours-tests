import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Owl Writey/);
});

test('login page', async ({ page }) => {
  await page.goto('/');

  // Click the get started link.
  await page.getByRole('button', { name: 'Rejoignez-nous !' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();
});

test('login error', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('fdasryvb@gmail.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('ercvtgbhnjJ!');

  // Expects page to have a heading with the name of Installation.
  await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

  await expect(page.getByText('Erreur de connexion')).toBeVisible();
});

test('login ok', async ({ page }) => {
  await page.goto('/login');

  await page.getByRole('textbox', { name: 'Email' }).fill('lucasreynaud4@gmail.com');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('JesuisLucas33!');

  // Expects page to have a heading with the name of Installation.
  await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

  await expect(page.getByRole('heading', { name: 'Mes romans' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();
});

test('exercice', async ({ page }) =>{
    await page.goto('/login');

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();

    // connexion email et password 
    await page.getByRole('textbox' , {name : 'Email'}).fill('tancrede.castets@gmail.com');
    await page.getByRole('textbox', {name : 'Mot de passe'}).fill('contis40');

    await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

    await expect(page.getByRole('heading', {name : 'Mes Romans'})).toBeVisible();

    // Click the get started link.
    await page.getByRole('button', { name: ' Créer un exercice ' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Nouvel exercice' })).toBeVisible();
  });


  test('new exercice', async ({ page }) =>{
    await page.goto('/login');

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'connexion' })).toBeVisible();

    // connexion email et password 
    await page.getByRole('textbox' , {name : 'Email'}).fill('tancrede.castets@gmail.com');
    await page.getByRole('textbox', {name : 'Mot de passe'}).fill('contis40');

    await page.getByRole('button', { name: 'Connexion' }).nth(1).click();

    await expect(page.getByRole('heading', {name : 'Mes Romans'})).toBeVisible();

    // Click the get started link.
    await page.getByRole('button', { name: ' Créer un exercice ' }).click();

    // Expects page to have a heading with the name of Installation.
    await expect(page.getByRole('heading', { name: 'Nouvel exercice' })).toBeVisible();

     await page.getByRole('textbox' , {name : 'Titre'}).fill('Exercice de cadavre exquis');
    await page.getByRole('textbox', {name : 'Écrivez le début de votre histoire :'}).fill('test test test');

      await page.getByRole('button', { name: 'Valider' }).click();

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
     await page.getByRole('textbox' , {name : 'Titre'}).fill('Exercice de cadavre exquis');
     await page.getByRole('spinbutton' , {name : ' Nombre de tours'}).fill('5');
     await page.getByRole('combobox', { name: 'Durée d\'un tour' }).click();
     await page.getByRole('option', { name: '5 minutes' , exact : true}).click();
     await page.getByRole('spinbutton' , {name : ' Minimum de mots '}).fill('1');
     await page.getByRole('spinbutton' , {name : ' Maximum de mots '}).fill('3');
    await page.getByRole('textbox', {name : 'Écrivez le début de votre histoire :'}).fill('test complet');

    // validation et retour a la page dashboard
      await page.getByRole('button', { name: 'Valider' }).click();
      await page.getByRole('button', { name: 'Dashboard' }).click();
      await expect(page.getByRole('heading', { name: 'Mes exercices' })).toBeVisible();



  });
