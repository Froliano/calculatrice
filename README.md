# Calculatrice — Ateliers

Mathis Branet
Andy Lopez

## Atelier 1 — API, Frontend et BDD sous Docker

Développement d'une API REST en Node.js (Express) exposant quatre opérations (`/add`, `/subtract`, `/multiply`, `/divide`) avec les valeurs passées directement dans l'URL. Un frontend en HTML/CSS/JS servi par Nginx appelle l'API et affiche l'historique des calculs stocké dans une base PostgreSQL. Les trois services sont orchestrés via Docker Compose, chacun avec son propre Dockerfile.

## Atelier 2 — Déploiement Render et Vercel

Le backend Node.js est déployé sur Render en tant que Web Service, exposant l'API publiquement. Le frontend statique est déployé sur Vercel et configuré pour pointer vers l'URL Render. Chaque push sur la branche principale déclenche automatiquement un redéploiement des deux services.

## Atelier 3 — Tests unitaires

Les fonctions de calcul sont isolées dans un module `calculator.js` pour pouvoir être testées indépendamment. Des tests JavaScript sont écrits avec Jest et Supertest, couvrant à la fois la logique pure et les routes HTTP (23 tests). Des tests d'intégration Python avec pytest vérifient les réponses de l'API en conditions réelles, dont les cas limites comme la division par zéro (12 tests).

## Atelier 4 — GitHub Actions

Un workflow CI est mis en place pour exécuter automatiquement les tests à chaque push ou pull request. Les tests JavaScript et Python tournent dans des jobs distincts, bloquant le merge si l'un d'eux échoue. Le pipeline garantit qu'aucune régression n'est introduite avant intégration.
ppement d'une API REST en Node.js (Express) exposant quatre opérations (`/add`, `/subtract`, `/multiply`, `/divide`) avec les valeurs passées directement dans l'URL. Un frontend en HTML/CSS/JS servi par Nginx appelle l'API et affiche l'historique des calculs stocké dans une base PostgreSQL. Les trois services sont orchestrés via Doc
## Atelier 5 — Grafana

Le backend expose un endpoint `/metrics` au format Prometheus grâce à `prom-client`, avec un compteur par type d'opération et un histogramme de latence. Prometheus scrape ces métriques toutes les 5 secondes et Grafana les visualise dans un dashboard préconfigurée (opérations/seconde, répartition en donut, latence p50/p95). Les trois services sont ajoutés au Docker Compose existant sans modifier l'architecture en place.
