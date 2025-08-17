# Architecture

## Introduction

L'application est développée en utilisant React et Supabase. Le code est écrit en Typescript et utilisé pour le développement de l'application.

## Architecture

### Stack technique

L'application utilise :

- **Frontend** : React avec TypeScript
- **Backend** : Supabase (Backend As A Service)
- **Base de données** : PostgreSQL (via Supabase)
- **Authentification** : Service d'authentification Supabase

### Architecture hexagonale

Pour garantir une forte adaptabilité du frontend, l'application suit une **architecture hexagonale**. Cette approche rend le frontend indépendant du backend, permettant d'intégrer différentes sources de données et d'anticiper les évolutions futures. Elle favorise la modularité des services tiers tout en gardant une base métier stable.

### Structure des dossiers

#### `/domain` - Couche métier

Regroupe toute la partie métier de l'application, totalement indépendante des sources de données :

- **Entités** : Modèles de données métier
- **Use cases** : Logique métier
- **Ports** : Interfaces des repositories

#### `/infrastructure` - Couche d'accès aux données

Contient les accès à Supabase :

- **Repositories (adapters)** : Implémentations des ports définis dans le domaine
- **Mappers** : Transformation des données entre Supabase et les entités métier

#### `/hooks` - Couche de liaison

Fait le lien entre les usecases du domaine et les repositories de l'infrastructure.

#### `/components`, `/contents`, `/pages` - Couche présentation

Contiennent toutes les parties design de l'application, avec des appels de données via les hooks.

### Schéma de l'architecture

![Architecture](./assets/architecture.png)
