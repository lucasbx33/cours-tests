Feature: Jouer à un exercice

  Scenario: L'utilisateur joue à un exercice existant
    Given je suis sur la page de connexion
    When je renseigne mon email et mon mot de passe
    And je clique sur le bouton Connexion
    Then je devrais voir la page "Mes exercices"

    When je clique sur un exercice existant
    And je clique sur " À mon tour ! "
    And j'écris un texte dans l'exercice
    Then je valide ma participation
    
