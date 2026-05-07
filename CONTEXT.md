# P-Tax — Portail Public de Consultation des Contraventions

## Contexte général

**P-Tax** est un système de gestion des contraventions routières au **Togo** (Afrique de l'Ouest), développé dans le cadre de la modernisation des services de l'État. Il s'articule autour de deux applications distinctes :

| Application | Rôle | Stack |
|---|---|---|
| **P-Tax Console** (`ptax_console`) | Interface d'administration — agents, superviseurs, direction | React + Yarn |
| **P-Tax Public** (`ptax_public`) | Portail citoyen — consultation publique des documents | React + Vite |

Ce dépôt concerne uniquement le **portail public** (`ptax_public`).

---

## Objectif du portail public

Permettre à tout citoyen togolais de **consulter librement** ses documents liés à une contravention routière, sans nécessiter de compte ni d'authentification.

L'accès se fait via :
- La **plaque d'immatriculation** ou le **numéro de châssis** du véhicule
- Le **numéro de référence** d'un document (récépissé `WRxxxxxxxx` ou procès-verbal `PYxxxxxxxx`)
- Le **scan d'une pièce d'identité** par OCR (mobile uniquement, via Tesseract.js)

---

## Documents consultables

### 1. Récépissé (`RECEPISE`)
Document remis au propriétaire d'un véhicule lors d'une **saisie ou d'une contravention** (ex. retenue du permis de conduire ou de la carte grise). Il atteste que le document original est en possession des autorités. Son numéro de référence commence par **`WR`**.

### 2. Procès-Verbal (`PROCES_VERBAL`)
Document officiel rédigé par un agent lors d'un **paiement ou d'une infraction constatée**. Il détaille les infractions, les sanctions appliquées et les montants. Son numéro de référence commence par **`PY`**.

---

## Types de véhicules pris en charge

| Catégorie | Exemples |
|---|---|
| Véhicule léger | Voitures, 4x4, berlines |
| Moto / Tricycle | Motos, tricycles, zemidjan |
| Transport commun | Bus, minibus, taxis |
| Poids lourd | Camions, remorques, semi-remorques |

---

## Flux utilisateur

```
Accueil (HomeView)
    │
    ├── Choisir le mode de recherche
    │       ├── Par plaque / châssis → Sélection engin → Sélection doc → Saisie plaque
    │       ├── Par N° de référence → Saisie WRxxx ou PYxxx
    │       └── Scanner ID (mobile) → OCR Tesseract → Remplissage automatique
    │
    ├── Appel API backend → GET /withdrawal-receipts ou GET /payments-public
    │
    ├── Résultats (ResultsView)
    │       └── Liste des documents trouvés (référence, plaque, date, montant)
    │
    └── Détail (document sélectionné)
            └── Affichage complet du document avec export PDF possible
```

---

## API Backend

Le portail consomme une API REST sécurisée exposant les endpoints publics suivants :

| Méthode | Endpoint | Description |
|---|---|---|
| `GET` | `/withdrawal-receipts` | Liste les récépissés (filtres : plaque, châssis, référence) |
| `GET` | `/payments-public` | Liste les procès-verbaux publics (filtres identiques) |

Les données retournées sont **partiellement masquées** côté frontend pour protéger la vie privée des citoyens (nom tronqué, plaque partiellement cachée).

---

## Design & Identité visuelle

Le portail adopte un design **institutionnel togolais** :
- Couleurs primaires inspirées du drapeau togolais
- Interface sobre et professionnelle (MUI avec thème personnalisé)
- Typographie claire et accessible
- Mode responsive : layout split desktop / bottom-sheet mobile

---

## Contraintes & bonnes pratiques

- **Pas d'authentification** — le portail est entièrement public
- **Masquage des données sensibles** — noms et plaques partiellement masqués
- **Responsive first** — expérience optimisée mobile (bottom drawer, OCR caméra)
- **Accessibilité** — textes lisibles, contrastes suffisants, navigation clavier
- **Pas de données stockées côté client** — aucun localStorage ni cookie de session

---

## Environnement

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | URL de base de l'API backend |

Fichier `.env` à la racine du projet (non versionné).
