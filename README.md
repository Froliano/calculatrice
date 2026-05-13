# Calculatrice — Ateliers

Mathis Branet
Andy Lopez

## Atelier 1 — Backend, Frontend et BDD sous Docker

Développement d'une API REST en Node.js (Express) exposant quatre opérations (`/add`, `/subtract`, `/multiply`, `/divide`) avec les valeurs passées directement dans l'URL. Un frontend en HTML/CSS/JS servi par Nginx appelle l'API et affiche l'historique des calculs stocké dans une base PostgreSQL. Les trois services sont orchestrés via Docker Compose, chacun avec son propre Dockerfile.

## Atelier 2 — Méthode BDD

La méthode BDD (Behavior-Driven Development) consiste à écrire les tests avant le code, en décrivant le comportement attendu de l'application sous forme de scénarios lisibles. Les fonctions de calcul sont isolées dans un module `calculator.js` et les cas de test (valeurs normales, décimaux, division par zéro) sont définis en amont pour guider l'implémentation. Cette approche garantit que chaque fonctionnalité est couverte dès sa conception.

## Atelier 3 — Déploiement continu avec Vercel et Render

Le backend Node.js est déployé sur Render en tant que Web Service, exposant l'API publiquement. Le frontend statique est déployé sur Vercel et configuré pour pointer vers l'URL Render. Chaque push sur la branche principale déclenche automatiquement un redéploiement des deux services.

## Atelier 4 — Automatisation des tests unitaires

Des tests JavaScript sont écrits avec Jest et Supertest, couvrant à la fois la logique pure des fonctions et les routes HTTP (23 tests). Des tests d'intégration Python avec pytest vérifient les réponses de l'API en conditions réelles, dont les cas limites comme la division par zéro (12 tests). Les deux suites sont exécutables en une commande via Docker Compose.

## Atelier 5 — CI : Intégration Continue

Un workflow GitHub Actions est mis en place pour exécuter automatiquement les tests à chaque push ou pull request. Les tests JavaScript et Python tournent dans des jobs distincts, bloquant le merge si l'un d'eux échoue. Le pipeline garantit qu'aucune régression n'est introduite avant intégration.

## Atelier 6 — Monitoring avec Grafana

Le backend expose un endpoint `/metrics` au format Prometheus grâce à `prom-client`, avec un compteur par type d'opération et un histogramme de latence. Prometheus scrape ces métriques toutes les 5 secondes et Grafana les visualise dans un dashboard préconfigurée (opérations/seconde, répartition en donut, latence p50/p95). Les trois services sont ajoutés au Docker Compose existant sans modifier l'architecture en place.
