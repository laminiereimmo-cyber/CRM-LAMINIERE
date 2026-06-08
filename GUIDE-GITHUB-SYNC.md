# Routine GitHub Pages + Supabase

## Publier une nouvelle version

1. Extraire le dernier zip `crm-laminiere-deploy-vXX-X.zip`.
2. Dans GitHub, déposer les fichiers extraits a la racine du depot `CRM-LAMINIERE`.
3. Remplacer les fichiers existants, notamment `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.json` et `.nojekyll`.
4. Ouvrir l'adresse racine GitHub Pages :
   `https://laminiereimmo-cyber.github.io/CRM-LAMINIERE/`
5. Faire `Ctrl + F5` sur PC. Sur iPhone, fermer puis rouvrir l'app si l'ancienne version reste affichee.

## Synchroniser PC et telephone

1. Choisir l'appareil maitre, en general le PC.
2. Sur cet appareil : `Cloud Supabase` puis `Envoyer vers cloud`.
3. Sur l'autre appareil : `Cloud Supabase` puis `Recuperer du cloud`.
4. Verifier que le bloc cloud affiche le meme workspace et une version d'app recente.

## Configuration Supabase

- URL : `https://zgrwlxxclinpblfwcfnd.supabase.co`
- Workspace : `laminiere-gvh-2026`
- Table : `crm_state`
- Ligne attendue : `id = laminiere-gvh-2026`

L'app accepte aussi une URL avec `/rest/v1`, mais elle sauvegarde automatiquement l'URL courte.
