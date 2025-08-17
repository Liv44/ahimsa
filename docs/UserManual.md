# Manuel d'utilisation - Ahimsa

## Prérequis

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [Supabase](https://supabase.com/)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/Liv44/Ahimsa.git
   cd Ahimsa
   ```

2. Installez les dépendances pour le frontend et le backend :

   ```bash
   yarn install
   ```

3. Configurez les variables d'environnement et changez le fichier .env avec les bonnes valeurs :

   ```bash
   cp .env.example .env
   ```

   > Pour les clés d'API Supabase, merci de vous rapprocher de Olivia MOREAU, qui vous fournira l'accès au Passbolt où sont stockées les clés.

4. Lancez le projet :

   ```bash
   yarn dev
   ```

5. Accédez à l'application à l'adresse suivante : [http://localhost:5173/](http://localhost:5173/)

## Utilisation

### Créer un nouveau profil

1. Cliquez sur le bouton "Se connecter" en haut à droite de l'écran.
2. Si vous n'avez pas encore de compte, cliquez sur "Créer un compte" pour en créer un.
3. Vous recevrez un mail pour vous connecter à votre compte.
4. Cliquez sur le lien de connexion dans le mail.
5. Accéder à la page de profil de votre compte.

### Créer une discussion

1. Cliquez sur le bouton "Créer une discussion" en haut à droite de l'écran.
2. Cliquez sur "Commencer une nouvelle discussion".
3. Remplissez les 4 étapes de la discussion.
4. Cliquez sur "Terminer la discussion".
5. Vous arrivez sur la page de résumé de la discussion. Vous pouvez copier le texte.

### Voir son historique de discussion

1. Cliquez sur Mon Profil, en étant connecté.
2. L'historique de discussion s'affiche si des discussions ont été créées.
3. Cliquez sur l'oeil à côté de la discussion pour voir les détails.
4. Cliquez sur la poubelle pour supprimer la discussion.
