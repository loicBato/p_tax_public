# P-Tax Public — Structure du projet & Technologies

## Stack technique

| Catégorie | Technologie | Version |
|---|---|---|
| Framework UI | **React** | ^19.2.5 |
| Bundler | **Vite** | ^8.0.9 |
| Router | **React Router DOM** | ^7.14.1 |
| Composants UI | **Material UI (MUI)** | ^9.0.0 |
| Animations | **Framer Motion** | ^12.38.0 |
| Icônes | **React Icons** | ^5.6.0 |
| Requêtes HTTP | **Axios** | ^1.15.1 |
| OCR | **Tesseract.js** | ^7.0.0 |
| Dates | **Moment.js** | ^2.30.1 |
| PDF | **jsPDF** + **html2canvas** | ^4.2.1 / ^1.4.1 |
| Codes-barres | **JsBarcode** | ^3.12.3 |
| Nombres en lettres | **to-words** | ^5.5.0 |
| CSS additionnel | **Tailwind CSS** (via plugin Vite) | ^4.2.2 |
| Styling MUI | **Emotion** (react + styled) | ^11.x |

---

## Structure des dossiers

```
ptax_public/
├── public/                        # Assets statiques servis directement
├── src/
│   ├── main.jsx                   # Point d'entrée React (ReactDOM.render)
│   ├── App.jsx                    # Composant racine, wrap du Router
│   ├── index.css                  # Styles globaux
│   ├── App.css                    # Styles applicatifs de base
│   │
│   ├── Router/                    # Définition des routes
│   │   └── index.jsx              # Routes principales (/, /document/:id, etc.)
│   │
│   ├── theme/                     # Thème MUI personnalisé
│   │   └── index.js               # Palette, typographie, overrides MUI
│   │
│   ├── core/                      # Composants & logique transversale
│   │   ├── components/            # Layout, Header, Footer, etc.
│   │   └── ...
│   │
│   ├── lib/                       # Utilitaires partagés (non spécifiques à un feature)
│   │
│   ├── utils/                     # Helpers purs (formatage, masquage, etc.)
│   │
│   ├── assets/                    # Images, illustrations, logos
│   │   └── ptax_illustration.png  # Illustration hero desktop
│   │
│   └── features/                  # Modules fonctionnels (architecture feature-first)
│       └── documents/             # Feature principale : consultation des documents
│           ├── pages/             # Pages React reliées aux routes
│           ├── hooks/             # Custom hooks
│           │   ├── usePortal.js   # Logique de recherche et d'état global
│           │   └── useOcr.js      # OCR via Tesseract.js (scan pièce d'identité)
│           ├── services/          # Appels API (axios)
│           │   └── documentService.jsx
│           ├── dialogs/           # Modales et dialogues
│           └── components/        # Composants UI de la feature
│               ├── HomeView.jsx   # Re-export → HomeView/index.jsx
│               ├── ResultsView.jsx
│               └── HomeView/      # Composants du formulaire de recherche
│                   ├── index.jsx          # Orchestrateur (state + handlers)
│                   ├── HomeHero.jsx       # Section hero (badge + titre)
│                   ├── ModeSelector.jsx   # Grille de sélection du mode
│                   ├── PanelRef.jsx       # Panel recherche par référence WR/PY
│                   ├── PanelAdv.jsx       # Panel recherche par plaque (stepper 3 étapes)
│                   ├── SearchDrawer.jsx   # Bottom sheet mobile (SwipeableDrawer)
│                   ├── svgs.jsx           # Composants SVG illustratifs + données statiques
│                   └── svgs.js            # Re-export de svgs.jsx
│
├── .env                           # Variables d'environnement (non versionné)
├── vite.config.js                 # Config Vite
├── eslint.config.js               # Config ESLint
├── package.json
├── CONTEXT.md                     # Contexte métier du projet
└── PROJECT.md                     # Ce fichier — structure & technologies
```

---

## Architecture frontend

### Pattern : Feature-First

Le code est organisé par **domaine fonctionnel** (feature) plutôt que par type de fichier. Chaque feature est autonome et contient ses propres composants, hooks, services et pages.

```
features/
  documents/        ← tout ce qui concerne les documents (recherche, affichage)
    components/     ← UI spécifique
    hooks/          ← logique métier encapsulée
    services/       ← communication API
    pages/          ← pages montées par le router
    dialogs/        ← modales
```

### Gestion du state

- **Local** (`useState`) — état UI éphémère (champ de saisie, step courant)
- **Hook personnalisé** (`usePortal.js`) — état de recherche et résultats partagés entre composants
- **Pas de store global** (pas de Redux, Zustand, etc.) — l'application est suffisamment simple

### Responsive

| Breakpoint | Comportement |
|---|---|
| Mobile (`< sm`) | Bottom sheet (SwipeableDrawer) pour les panels de recherche |
| Desktop (`≥ sm`) | Panels affichés inline sous les cartes de sélection |
| Desktop (`≥ md`) | Layout split : illustration à gauche, formulaire à droite |

---

## Composants HomeView — détail

| Fichier | Rôle | Props clés |
|---|---|---|
| `index.jsx` | Orchestrateur, tout le state | `onSearch`, `isSearching` |
| `HomeHero.jsx` | Badge + titre + sous-titre | aucune |
| `ModeSelector.jsx` | Grille de 2-3 cartes cliquables | `mode`, `ocr`, `onSelectMode` |
| `PanelRef.jsx` | Formulaire + info référence WR/PY | `reference`, `setReference`, `onSubmit`, `isSearching` |
| `PanelAdv.jsx` | Stepper 3 étapes (engin → doc → plaque) | `engin`, `docType`, `searchTerm`, + setters, `onSubmit` |
| `SearchDrawer.jsx` | Bottom sheet 60vh, hauteur fixe | `open`, `mode`, `onClose`, `children` |
| `svgs.jsx` | 8 SVG illustratifs + `ENGINS`, `DOCS`, `MODES` | prop `selected` |

---

## Conventions de code

- **JSX uniquement dans `.jsx`** — les fichiers `.js` ne contiennent pas de JSX (contrainte Vite/OXC)
- **Imports nommés** — pas de `export default` sauf pour les pages
- **MUI sx prop** — tout le styling via le prop `sx` de MUI (pas de fichiers CSS séparés par composant)
- **Framer Motion** — animations d'entrée/sortie via `<AnimatePresence>` + `<motion.div>`
- **Pas de TypeScript** — le projet est en JavaScript pur (migration de TS vers JS déjà effectuée)

---

## Scripts disponibles

```bash
npm run dev          # Serveur de développement Vite
npm run dev -- --host   # Accessible sur le réseau local (mobile test)
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # ESLint
```

---

## Variables d'environnement

```env
# .env (à créer à la racine)
VITE_API_BASE_URL=https://api.ptax.tg/api/V1
```

> [!IMPORTANT]
> Toutes les variables exposées au frontend doivent être préfixées par `VITE_`.

---

## Dépendances notables

### Tesseract.js (OCR)
Utilisé dans `useOcr.js` pour analyser une photo de pièce d'identité prise depuis la caméra du téléphone et en extraire automatiquement le numéro de référence.

### jsPDF + html2canvas
Permettent de générer un PDF du document consulté directement dans le navigateur, sans appel serveur.

### JsBarcode
Génère les codes-barres affichés sur les récépissés exportés.

### to-words
Convertit les montants numériques en toutes lettres pour les documents officiels (ex. `15000` → `"quinze mille francs CFA"`).
