# Daisy - Patch ou refacto : à toi de trancher

## 0. Installation
Pour faire tourner le projet localement :
* `npm install`
* `npm run dev`
* Se rendre sur **http://localhost:3000/dashboard**

## 1. Diagnostic du code existant
En analysant le code fourni, j'ai identifié plusieurs problématiques qui freinent la scalabilité et la maintenabilité :
* **Couplage UI / Logique :** Le fichier `dashboard.jsx` mélange l'appel réseau et le rendu complexe d'une carte au sein d'un `.map()`.
* **Aucune gestion d'erreur :** L'appel `fetch` ne possède pas de bloc `.catch()`. En cas de panne de l'API, l'interface utilisateur reste figée sans aucun retour visuel.
* **Styles en ligne :** L'utilisation de styles via l'attribut `style={{...}}` pose un problème de maintenabilité et de performance. Visuellement, cela noie la logique du composant sous des dizaines de lignes de design, rendant le fichier très lourd à lire. Techniquement, cette approche force React à recréer des objets JavaScript en mémoire à chaque rafraîchissement de l'interface.
* **Textes en dur :** Des éléments comme `"chargement..."` sont insérés directement dans le JSX, ce qui rend la traduction de l'application impossible en l'état.
* **Over-fetching:** La requête `.select('*, bookings(*), workshops(*)')` charge la totalité des tables liées en mémoire sans filtrer les colonnes nécessaires.
* **Conventions de nommage :** Le code JavaScript n'est pas standardisé (utilisation de *snake_case* pour `bookings_count` au lieu du *camelCase* habituel).

## 2. Arbitrage : Patch vs Refacto
J'ai tranché en faveur d'une **Refacto totale**.
Ajouter une nouvelle condition pour le badge "Complet" par dessus un code deja chargé et une requête API non optimisée n'aurait fait qu'empirer la dette technique. Un patch aurait répondu au besoin immédiat mais au détriment de l'évolution. Repartir sur de bonnes bases permet d'isoler les responsabilités et de sécuriser l'application.

## 3. Ce que j'ai fait
* **Utilisation de l'API Next.js :** J'ai séparé le Back du Front en utilisant le système de routes intégré (`pages/api/slots.js`) pour y servir mes données mockées.
* **Architecture de la donnée :** J'ai simulé une donnée pré-calculée côté Backend (`bookingsCount`). Le Frontend n'a plus à faire d'opérations mathématiques lourdes.
* **Création d'un composant dédié (`SlotCard.jsx`) :** J'ai extrait la carte dans son propre fichier. J'ai remplacé le CSS en ligne par des classes Tailwind en respectant la charte graphique. C'est ici qu'est gérée la logique d'affichage du badge.
* **Système de traduction :** J'ai extrait l'intégralité des textes statiques dans un dictionnaire propre (`locales/fr.json`).
* **Dashboard orchestrateur :** Le fichier `dashboard.jsx` a été nettoyé. Il ne s'occupe plus de design, mais gère strictement les 4 états de la donnée : *Loading*, *Error*, *Empty*, et *Success*.
* **Standardisation :** Pour respecter les standards professionnels, l'intégralité du code a été uniformisée en anglais.

## 4. Ce que je laisserais pour plus tard
L'architecture Frontend est maintenant propre et prête pour la production. Les prochaines étapes techniques concerneraient exclusivement l'infrastructure:
* **La vraie connexion Supabase :** Remplacer les données mockées dans la route API par le vrai SDK Supabase, en s'assurant d'écrire une requête SQL optimisée qui ne retourne que les champs stricts (*).
* **Tests automatisés :** Mettre en place des tests de composants pour garantir que la logique de calcul d'affichage du badge "COMPLET" ne régresse jamais lors de futures mises à jour.
