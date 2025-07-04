Feature: Connexion utilisateur

  Scenario: Connexion réussie avec des identifiants valides
    Given je suis sur la page de connexion
    When je renseigne mon email et mon mot de passe
    And je clique sur le bouton de connexion
    Then je devrais voir la page "Mes Romans"


