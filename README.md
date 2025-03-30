# Exercizer

Un composant React réutilisable pour afficher et évaluer des exercices et évaluations interactifs.

## Aperçu

Exercizer est un outil dynamique qui prend en entrée un sujet ou une compétence, récupère la structure d'un exercice, affiche le formulaire/les questions appropriées et évalue les réponses de l'utilisateur.

## Fonctionnalités

- Récupération dynamique d'exercices basés sur un sujet/une compétence
- Support pour différents types de questions :
  - Questions à choix multiples (QCM)
  - Questions à trous
  - Questions avec glisser-déposer de mots
  - Questions basées sur des médias (image, vidéo, audio)
- Évaluation des réponses avec feedback détaillé
- Personnalisation des exercices basée sur le contexte de l'étudiant
- Fonctionnalité de réessai
- Suivi des résultats
- Personnalisation des couleurs du thème

## Installation

```bash
npm install exercizer
# ou
yarn add exercizer
```

## Utilisation basique

```jsx
import { Exercizer } from 'exercizer';

function MonApplication() {
  const handleComplete = (result) => {
    console.log('Exercice terminé:', result);
    // result contient { subject, success, score }
  };

  return (
    <div className="container">
      <h1>Pratique de mathématiques</h1>
      <Exercizer 
        subject="math" 
        onComplete={handleComplete}
      />
    </div>
  );
}
```

## Props

| Prop | Type | Description | Par défaut |
|------|------|-------------|------------|
| `subject` | string | Le sujet ou la compétence pour lequel récupérer des exercices | (obligatoire) |
| `context` | string | Contexte de l'étudiant pour personnaliser les exercices | "" |
| `contentType` | string | Type de contenu préféré pour les exercices | "multiple_choice" |
| `onComplete` | function | Fonction de callback appelée lorsque l'utilisateur termine un exercice | () => {} |
| `themeColor` | string | Couleur du thème pour personnaliser l'interface (code hexadécimal) | "#0891b2" |

## Types de questions supportés

Le composant Exercizer prend en charge plusieurs types de questions :

- **Questions à choix multiples** (`multiple_choice` ou `mcq`) : Questions classiques où l'utilisateur doit sélectionner une ou plusieurs réponses parmi des options.
- **Questions à trous** (`fill_in_the_blanks` ou `fill-in-blank`) : L'utilisateur doit remplir les espaces vides dans un texte.
- **Glisser-déposer de mots** (`drag_the_words`) : L'utilisateur doit réorganiser des mots pour former une phrase correcte.
- **Questions avec média** : Questions accompagnées d'une image, d'une vidéo ou d'un fichier audio pour enrichir le contexte.

## Personnalisation avec contexte étudiant

Vous pouvez personnaliser les exercices en fonction du profil de l'étudiant en fournissant un contexte :

```jsx
<Exercizer 
  subject="français, conjugaison, présent"
  context="Élève de 6ème, 12 ans, passion pour la lecture"
  onComplete={handleComplete}
/>
```

## Intégration API

Par défaut, Exercizer utilise des fonctions API simulées. Pour vous connecter à votre backend :

1. Créez un adaptateur API qui correspond à l'interface attendue par Exercizer
2. Passez votre adaptateur au composant

Exemple :

```jsx
import { Exercizer } from 'exercizer';
import monAdaptateurApi from './monAdaptateurApi';

function MonApplication() {
  return (
    <Exercizer 
      subject="math" 
      apiAdapter={monAdaptateurApi}
    />
  );
}
```

## Documentation

Pour une documentation complète et détaillée, visitez [https://calderis.github.io/suw-2025-aixercice/](https://calderis.github.io/suw-2025-aixercice/)

## Licence

MIT
