# Calcul Zone d'Échange (Cx / Spire)

Outil de calcul de zone d'échange caténaire (cotes A, A', D, E, B60, B70) avec
schéma SVG interactif (bras, spires, cotes) qui se met à jour en direct selon
les valeurs saisies.

## Structure du projet

```
.
├── index.html   → structure HTML + schéma SVG intégré
├── style.css    → styles (mise en page, champs, media query mobile)
└── app.js       → logique de calcul + mise à jour du schéma SVG
```

## Pourquoi le SVG reste dans `index.html`

Contrairement à un logo statique, ce SVG est **piloté par le JavaScript** :
`app.js` modifie en direct des dizaines d'éléments internes du dessin
(`brasGauche`, `brasDroit`, `ressortG`, `ressortD`, `coteA`, `axe_main_cx_D`…)
via `document.getElementById(...)`. Si le SVG était extrait dans un fichier
externe (`<img src="...">`), le JavaScript ne pourrait plus accéder à ses
éléments internes et le schéma ne bougerait plus. Il reste donc intégré
directement dans la page.

## Déploiement sur GitHub Pages

1. Pousse ces 3 fichiers à la racine de ton dépôt (ou dans un sous-dossier).
2. **Settings → Pages** → choisis la branche/dossier contenant `index.html`.
3. Ton outil sera accessible à :
   `https://<ton-user>.github.io/<nom-du-repo>/`

Aucune étape de build : HTML/CSS/JS statique pur, aucune dépendance externe
(pas de CDN utilisé ici).

## Notes

- Aucune logique métier n'a été modifiée : seul le découpage en fichiers a
  changé, pour faciliter le versionnement sur GitHub.
- `app.js` contient : le calcul principal (`calculer()`), la bascule
  Ancrage fixe / mesures réelles (`toggleMode()`), l'affichage
  conditionnel des blocs Ancrage/Support (`toggleAncrage()`,
  `togglesupport()`), le dessin des spires (`dessinerRessort()`), et
  l'initialisation au chargement de la page.
