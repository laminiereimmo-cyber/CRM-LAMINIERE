const STORE_KEY = "laminiere-crm-v1";
const STORE_BACKUP_KEY = "laminiere-crm-v1-backup";
const STORE_VERSION_KEY = "laminiere-crm-version";
const CLOUD_CONFIG_KEY = "laminiere-crm-cloud-config";
const CLOUD_META_KEY = "laminiere-crm-cloud-meta";
const LOCAL_UPDATED_KEY = "laminiere-crm-local-updated-at";
const APP_VERSION = "0.20.14";
const LAMINIERE_LOGO_DATA_URL = "data:image/png;base64,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";
const REVENUE_TARGETS_HT = {
  2026: 100800,
  2027: null
};
let selectedRevenueYear = String(new Date().getFullYear());

const photos = [
  "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80')",
  "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80')",
  "url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80')",
  "url('https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80')"
];

const documentGroups = {
  audit: {
    title: "Documents à demander pour l'audit patrimonial",
    target: "auditDocs",
    items: [
      ["identity", "Pièce d'identité", "Carte d'identité ou passeport du client et du conjoint si projet commun."],
      ["family", "Situation familiale", "Mariage, PACS, enfants, régime matrimonial, personnes à charge."],
      ["income", "Revenus", "3 derniers bulletins de salaire, revenus indépendants ou bilans si applicable."],
      ["tax", "Avis d'imposition", "Dernier avis complet pour comprendre fiscalité et TMI."],
      ["accounts", "Relevés de comptes", "3 derniers mois des comptes courants et épargne principale."],
      ["assets", "Patrimoine existant", "Immobilier, crédits en cours, assurance vie, PER, PEA, crypto, parts sociales."],
      ["loans", "Crédits et charges", "Tableaux d'amortissement, loyers, pensions, charges récurrentes."],
      ["goal", "Objectifs", "Cashflow, retraite, transmission, capital, fiscalité, horizon et tolérance au risque."]
    ]
  },
  bank: {
    title: "Pièces pour dossier bancaire",
    target: "bankDocs",
    items: [
      ["ids", "Identité emprunteur(s)", "Pièces d'identité, livret de famille si besoin, justificatif de domicile."],
      ["incomeProof", "Revenus et contrat", "Bulletins de salaire, contrat de travail, attestation employeur ou bilans."],
      ["bankStatements", "Relevés bancaires", "3 derniers mois, tous comptes utiles, sans anomalie non expliquée."],
      ["taxNotice", "Avis d'imposition", "Dernier avis complet."],
      ["savings", "Justificatifs d'apport", "Épargne disponible, donation, cession, déblocage prévu."],
      ["currentLoans", "Crédits en cours", "Tableaux d'amortissement et mensualités restantes."],
      ["operation", "Dossier opération", "Annonce, compromis ou projet, photos, loyers attendus, charges, taxe foncière."],
      ["worksQuotes", "Devis travaux", "Devis signés ou estimatifs par lot si travaux inclus dans financement."],
      ["forecast", "Prévisionnel", "Rendement, mensualité cible, cashflow, hypothèse meublé/nu."]
    ]
  },
  notary: {
    title: "Documents et points notaire",
    target: "notaryDocs",
    items: [
      ["sellerDocs", "Documents vendeur", "Titre de propriété, diagnostics, taxe foncière, plans si disponibles."],
      ["leases", "Baux et loyers", "Baux existants, quittances, dépôt de garantie, état locatif."],
      ["coownership", "Copropriété si applicable", "PV AG, charges, règlement, travaux votés."],
      ["urbanism", "Urbanisme", "Destination, division, compteurs, autorisations, risques."],
      ["conditions", "Clauses suspensives", "Financement, travaux, documents manquants, délais."],
      ["signature", "RDV signature", "Date compromis, date acte, procuration, fonds, assurance emprunteur."]
    ]
  },
  works: {
    title: "Travaux, meuble et premier locataire",
    target: "worksDocs",
    items: [
      ["scope", "Périmètre travaux", "Lots, urgence, sécurité, performance, contraintes locatives."],
      ["quotes", "Devis par lot", "Plomberie, électricité, sols, peinture, cuisine, ameublement."],
      ["timeline", "Planning", "Date démarrage, jalons, réception, marge de sécurité."],
      ["furniture", "Liste meubles", "Inventaire LMNP, photos, factures, budget mobilier."],
      ["ads", "Mise en location", "Photos, annonce, loyer cible, dossier candidat, bail, état des lieux."],
      ["firstTenant", "Premier locataire", "Bail signé, dépôt, assurance, remise des clés."]
    ]
  },
  gvh: {
    title: "Socle Hunb'up - CRM CGP",
    target: "gvhDocs",
    items: [
      ["der", "DER signé", "Document d'entrée en relation et informations réglementaires remis au client."],
      ["identity", "Identité et coordonnées", "État civil, pièce d'identité, domicile, téléphone, e-mail."],
      ["family", "Situation familiale", "Mariage/PACS, régime matrimonial, enfants, personnes à charge, libéralités."],
      ["tax", "Résidence fiscale", "Pays de résidence fiscale, numéro fiscal, TMI, IFI si applicable."],
      ["ppeUs", "PPE / US Person", "Personne politiquement exposée, lien PPE, citoyenneté ou résidence US, TIN."],
      ["kyc", "Recueil d'informations client", "Situation professionnelle, revenus, charges, patrimoine, origine des fonds."],
      ["risk", "Profil investisseur", "Connaissance, expérience, horizon, pertes acceptables, profil de risque."],
      ["objectives", "Objectifs patrimoniaux", "Retraite, protection famille, transmission, capital, fiscalité, disponibilité."],
      ["envelope", "Enveloppes et allocation", "Assurance vie, PER, CTO, trésorerie, SCPI, existants à reprendre."],
      ["dcc", "DCC / synthèse conseil", "Document de connaissance client ou synthèse patrimoniale à jour."],
      ["review", "Suivi annuel", "Fréquence, arbitrages, mise à jour situation et objectifs."]
    ]
  }
};

const acquisitionTimeline = [
  {
    month: "Mois 1",
    items: [
      ["startMentoring", "Début mentorat", "Cadrage du client, objectifs, capacité et méthode."],
      ["sectorAnalysis", "Analyse de secteurs", "Comparer zones, tension locative, prix, rentabilité et risques."],
      ["propertyAnalysis", "Analyse de biens", "Premiers biens, lecture chiffres, travaux, loyers et liquidité."]
    ]
  },
  {
    month: "Mois 2",
    items: [
      ["sectorsValidated", "Secteurs validés", "Arbitrer les zones cibles avant d'intensifier le sourcing."],
      ["continueAnalysis", "Continuer les analyses de biens", "Shortlist des opérations compatibles avec le profil client."]
    ]
  },
  {
    month: "Mois 3",
    items: [
      ["documentsAnalysis", "Analyse des documents", "Diagnostics, taxe foncière, baux, charges, travaux, urbanisme."],
      ["bankMeetings1", "Rendez-vous banques", "Préqualification ou courtier, capacité et structure de financement."],
      ["offerAccepted", "Offre acceptée", "Conditions, prix, délai, clauses et stratégie compromis."]
    ]
  },
  {
    month: "Mois 4",
    items: [
      ["compromiseSigned", "Compromis signé", "Vérifier clauses, calendrier, pieces manquantes et financement."],
      ["bankMeetings2", "Rendez-vous banques", "Dépôt dossier complet et suivi des demandes banque."],
      ["bankProgress1", "Suivi avancées bancaires", "Réponses, assurance emprunteur, garanties, ajustements."]
    ]
  },
  {
    month: "Mois 5",
    items: [
      ["bankProgress2", "Suivi avancées bancaires", "Offre de prêt, délais, conditions suspensives."],
      ["financingValidated", "Financement validé", "Accord final, édition offre, délai legal, fonds."]
    ]
  },
  {
    month: "Mois 6",
    items: [
      ["authenticDeed", "Signature acte authentique", "Acquisition, assurances, clés, passation travaux/location."],
      ["endMentoring", "Fin mentorat", "Bilan opération, prochaines actions et preparation suivi/Hunb'up."]
    ]
  }
];

const contactPresets = {
  audit: {
    label: "Audit 3k seul",
    search: "Audit patrimonial avant decision",
    patrimoine: "À auditer",
    auditStatus: "À faire",
    auditFee: 3000,
    mandateStatus: "Non signé",
    gvhStatus: "Pas encore",
    target: "À définir",
    regime: "À définir",
    status: "Audit patrimonial",
    next: "Vendre / envoyer audit 3k TTC"
  },
  mandate: {
    label: "Audit + mandat de recherche",
    search: "Accompagnement cle en main ancien",
    patrimoine: "Audit puis recherche actif ancien",
    auditStatus: "Envoyé",
    auditFee: 3000,
    mandateStatus: "À proposer",
    gvhStatus: "Pas encore",
    target: "Petit immeuble de rapport",
    regime: "Meuble probable",
    status: "Audit patrimonial",
    next: "Compléter audit puis proposer mandat de recherche"
  },
  coaching: {
    label: "Coaching investisseur",
    search: "Coaching analyse de biens",
    patrimoine: "Premier investissement / besoin méthode",
    auditStatus: "Non applicable",
    auditFee: 390,
    mandateStatus: "Coaching",
    gvhStatus: "Pas encore",
    target: "Formation / coaching",
    regime: "À définir",
    status: "Coaching immobilier",
    next: "Planifier session coaching"
  },
  prospect: {
    label: "Prospect à relancer",
    search: "Prospect à qualifier",
    patrimoine: "Premier échange à organiser",
    auditStatus: "À faire",
    auditFee: 3000,
    mandateStatus: "Non signé",
    gvhStatus: "Pas encore",
    target: "À définir",
    regime: "À définir",
    status: "Audit patrimonial",
    next: "Relance prévue en décembre",
    type: "Prospect"
  },
  works: {
    label: "Suivi travaux",
    search: "Suivi travaux et mise en location",
    patrimoine: "Client deja engage dans une opération",
    auditStatus: "Réalisé",
    auditFee: 3000,
    mandateStatus: "Signé",
    gvhStatus: "Pas encore",
    target: "Opération avec travaux",
    regime: "LMNP",
    status: "Travaux",
    next: "Cadrer devis, planning et ameublement"
  },
  gvh: {
    label: "Bascule Hunb'up",
    search: "Placement financier après opération immobilière",
    patrimoine: "Client à basculer vers Hunb'up",
    auditStatus: "Réalisé",
    auditFee: 3000,
    mandateStatus: "Signé",
    gvhStatus: "À préparer",
    target: "Placement financier",
    regime: "LMNP",
    status: "Bascule Hunb'up",
    gvhEnvelope: "Assurance vie",
    gvhAmount: 10000,
    next: "Planifier rendez-vous Hunb'up"
  }
};

const seedData = {
  properties: [
    {
      id: "p1",
      title: "LaMinière - Cle en main ancien",
      city: "Immeuble de rapport / ancien",
      price: 4500,
      area: 9,
      rooms: 8,
      status: "LaMinière",
      owner: "Audit, sourcing, banque, notaire, travaux, location",
      next: "Cadrage patrimonial + capacité bancaire",
      photo: 0
    },
    {
      id: "p2",
      title: "Hunb'up - Bascule patrimoniale",
      city: "Assurance vie / allocation financière",
      price: 10000,
      area: 4,
      rooms: 3,
      status: "Hunb'up",
      owner: "Audit patrimonial, assurance vie, stratégie financière",
      next: "Activation après premier locataire",
      photo: 1
    },
    {
      id: "p3",
      title: "Coaching investisseur",
      city: "Decision, cible et lecture d'opération",
      price: 2500,
      area: 6,
      rooms: 4,
      status: "LaMinière",
      owner: "Analyse projet, méthode, arbitrage, passage a l'action",
      next: "Session diagnostic investisseur",
      photo: 2
    },
    {
      id: "p4",
      title: "Formation investisseur autonome",
      city: "Methodologie et outils",
      price: 390,
      area: 1,
      rooms: 1,
      status: "Formation",
      owner: "Offre d'entree LaMinière",
      next: "Proposition commerciale",
      photo: 3
    },
    {
      id: "p5",
      title: "Suivi travaux et mise en location",
      city: "Meuble / premier locataire",
      price: 1500,
      area: 4,
      rooms: 5,
      status: "Suivi",
      owner: "Devis, planning travaux, ameublement, annonces, locataire",
      next: "Vérifier regime meuble et livrables",
      photo: 0
    }
  ],
  contacts: [
    {
      id: "c1",
      name: "Jordan SARAZIN x CAKM",
      email: "à renseigner",
      phone: "à renseigner",
      source: "CJ",
      type: "Prospect",
      search: "Immeuble de rapport ancien",
      patrimoine: "À auditer",
      auditStatus: "À faire",
      auditFee: 3000,
      mandateStatus: "Non signé",
      gvhStatus: "Pas encore",
      priority: "Haute",
      owner: "Gabriel Valette",
      createdAt: "2025-07-28",
      company: "",
      signatureDate: "",
      worksBudget: 0,
      bankStatus: "À cadrer",
      notaryStatus: "Non démarré",
      acquisitionDate: "",
      firstTenantDate: "",
      gvhRisk: "À définir",
      gvhEnvelope: "",
      gvhAmount: 0,
      docChecks: {},
      timelineChecks: {},
      notes: "Premier contact a structurer. Vérifier capacité bancaire avant sourcing.",
      apport: 30000,
      capacite: 180000,
      regime: "À définir",
      target: "Petit immeuble",
      sector: "À définir",
      budget: 4500,
      last: "Aujourd'hui",
      status: "Audit patrimonial",
      next: "Compléter revenus, charges, apport, objectif"
    },
    {
      id: "c2",
      name: "Aymeric DESCAMPS",
      email: "descampsaymeric@yahoo.fr",
      phone: "à renseigner",
      source: "LaMinière",
      type: "Qualifié",
      search: "Accompagnement cle en main",
      patrimoine: "Objectif cashflow",
      auditStatus: "Envoyé",
      auditFee: 3000,
      mandateStatus: "À proposer",
      gvhStatus: "Pas encore",
      priority: "Moyenne",
      owner: "Gabriel Valette",
      createdAt: "2025-08-04",
      company: "",
      signatureDate: "",
      worksBudget: 25000,
      bankStatus: "Pre-qualification",
      notaryStatus: "Non démarré",
      acquisitionDate: "",
      firstTenantDate: "",
      gvhRisk: "Équilibré",
      gvhEnvelope: "",
      gvhAmount: 0,
      docChecks: { audit: ["identity", "income", "goal"] },
      timelineChecks: { startMentoring: true, sectorAnalysis: true },
      notes: "Profil interessant pour immeuble 3-5 lots. Prioriser secteur et rendement net.",
      apport: 45000,
      capacite: 260000,
      regime: "Meuble probable",
      target: "Immeuble 3-5 lots",
      sector: "A affiner",
      budget: 2500,
      last: "Hier",
      status: "Sourcing",
      next: "Valider secteur et criteres de rendement"
    },
    {
      id: "c3",
      name: "Hadrien MANTION",
      email: "hmantion@adentis.fr",
      phone: "à renseigner",
      source: "LaMinière TC",
      type: "Proposition",
      search: "Coaching 1ere offre LM-TC",
      patrimoine: "Premier investissement",
      auditStatus: "Non applicable",
      auditFee: 390,
      mandateStatus: "Coaching",
      gvhStatus: "Pas encore",
      priority: "Normale",
      owner: "Gabriel Valette",
      createdAt: "2025-08-12",
      company: "Adentis",
      signatureDate: "",
      worksBudget: 0,
      bankStatus: "À cadrer",
      notaryStatus: "Non démarré",
      acquisitionDate: "",
      firstTenantDate: "",
      gvhRisk: "À définir",
      gvhEnvelope: "",
      gvhAmount: 0,
      docChecks: {},
      timelineChecks: {},
      notes: "Offre coaching entree. Ne pas pousser mandat avant validation de l'engagement.",
      apport: 20000,
      capacite: 160000,
      regime: "À définir",
      target: "Opération simple",
      sector: "Toulouse",
      budget: 390,
      last: "Lundi",
      status: "Proposition",
      next: "Faire accepter proposition coaching"
    },
    {
      id: "c4",
      name: "Jonathan COHEN",
      email: "jonathan.cohen13@orange.fr",
      phone: "à renseigner",
      source: "Gabriel Valette",
      type: "Client",
      search: "Accompagnement investissement ancien",
      patrimoine: "Client en accompagnement",
      auditStatus: "Payé",
      auditFee: 3000,
      mandateStatus: "Signé",
      gvhStatus: "À préparer",
      priority: "Haute",
      owner: "Gabriel Valette",
      createdAt: "2025-07-28",
      company: "",
      signatureDate: "2025-08-12",
      worksBudget: 35000,
      bankStatus: "Pièces en cours",
      notaryStatus: "Compromis à vérifier",
      acquisitionDate: "",
      firstTenantDate: "",
      gvhRisk: "Équilibré",
      gvhEnvelope: "Assurance vie",
      gvhAmount: 10000,
      docChecks: { audit: ["identity", "income", "tax", "goal"], bank: ["ids", "incomeProof", "bankStatements"], notary: ["sellerDocs", "conditions"] },
      timelineChecks: { startMentoring: true, sectorAnalysis: true, propertyAnalysis: true, sectorsValidated: true, documentsAnalysis: true, bankMeetings1: true },
      notes: "Reunion presentation des 2 biens. Demande de metrage pour finaliser plans et chiffrage travaux.",
      apport: 50000,
      capacite: 280000,
      regime: "Meuble vise",
      target: "Immeuble de rapport",
      sector: "A confirmer",
      budget: 2500,
      last: "Il y a 3 jours",
      status: "Banque",
      next: "Vérifier dossier bancaire et pièces"
    }
  ],
  deals: [
    {
      id: "d1",
      title: "Jordan SARAZIN x CAKM",
      contact: "Audit patrimonial a complèter",
      value: 4500,
      stage: "Audit patrimonial",
      due: "Aujourd'hui",
      checks: ["Objectif", "Revenus", "Apport"]
    },
    {
      id: "d2",
      title: "Aymeric DESCAMPS",
      contact: "Petit immeuble de rapport",
      value: 4500,
      stage: "Sourcing",
      due: "Demain",
      checks: ["Criteres", "Secteur", "Rendement"]
    },
    {
      id: "d3",
      title: "Jonathan COHEN",
      contact: "Dossier bancaire",
      value: 4500,
      stage: "Banque",
      due: "Cette semaine",
      checks: ["Pieces", "Courtier", "Accord principe"]
    },
    {
      id: "d4",
      title: "Opération Cohen - acte et notaire",
      contact: "Docs notaire + RDV",
      value: 4500,
      stage: "Notaire",
      due: "28 mai",
      checks: ["Compromis", "Diagnostics", "RDV signature"]
    },
    {
      id: "d5",
      title: "Client prêt Hunb'up",
      contact: "Assurance vie et allocation financière",
      value: 10000,
      stage: "Bascule Hunb'up",
      due: "Après locataire",
      checks: ["Bien loué", "Bilan patrimonial", "Rendez-vous Hunb'up"]
    }
  ],
  tasks: [
    { id: "t1", title: "Compléter audit Jordan", detail: "Revenus, charges, apport, horizon, tolérance au risque", due: "Aujourd'hui", done: false },
    { id: "t2", title: "Sourcing Aymeric", detail: "Lister 3 immeubles de rapport compatibles criteres", due: "Demain", done: false },
    { id: "t3", title: "Vérifier dossier bancaire Jonathan", detail: "Pièces, prévisionnel, devis travaux, mensualité cible", due: "Vendredi", done: false },
    { id: "t4", title: "Préparer bascule Hunb'up", detail: "Client loué : bilan financier, assurance vie, allocation", due: "Après premier locataire", done: true }
  ]
};

let state = loadState();
let activeView = "dashboard";
let showArchivedContacts = false;
let editingTaskId = null;
let propertyFilter = "all";
let activeContactId = null;
let draggedDealId = null;
let autoSyncTimer = null;
let autoPullTimer = null;
let autoSyncBusy = false;
let autoSyncQueued = false;
let isApplyingCloudState = false;
let autoPullListenersBound = false;

const pageTitles = {
  dashboard: "Tableau de bord",
  properties: "Parcours client",
  contacts: "Contacts",
  prospects: "Prospects",
  coaching: "Coaching immobilier",
  analysis: "Analyse de bien",
  pipeline: "Opérations accompagnées",
  gantt: "Planning dossiers",
  tasks: "Relances",
  gvh: "Socle Hunb'up"
};

function loadState() {
  const storedVersion = localStorage.getItem(STORE_VERSION_KEY);
  const stored = localStorage.getItem(STORE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    normalizeStateShape(parsed);
    if (storedVersion !== APP_VERSION) {
      migrateRevenueState(parsed);
      localStorage.setItem(STORE_KEY, JSON.stringify(parsed));
      localStorage.setItem(STORE_VERSION_KEY, APP_VERSION);
    }
    return parsed;
  }
  const data = structuredClone(seedData);
  normalizeStateShape(data);
  migrateRevenueState(data);
  return data;
}

function normalizeStateShape(data) {
  if (!data || typeof data !== "object") return data;
  data.properties = Array.isArray(data.properties) ? data.properties : [];
  data.contacts = Array.isArray(data.contacts) ? data.contacts : [];
  data.deals = Array.isArray(data.deals) ? data.deals : [];
  data.tasks = Array.isArray(data.tasks) ? data.tasks : [];
  return data;
}

function migrateRevenueState(data) {
  if (!data || !Array.isArray(data.contacts) || !Array.isArray(data.deals)) return data;
  normalizeLegacyTechnicalFields(data);
  replaceLegacyGvhLabels(data);
  const revenueSpecs = [
    {
      name: "Jonathan COHEN",
      id: "c4",
      source: "Gabriel Valette",
      auditPaidDate: "2025-08-12",
      auditStatus: "Payé",
      projects: knownProjectsForContact("Jonathan COHEN")
    },
    {
      name: "Pauline GLAIZE & Adrien CARDONNA",
      aliases: ["Pauline et Adrien", "Adrien CARDONNA Pauline GLAIZE", "Pauline GLAIZE Adrien CARDONNA"],
      id: "c-rev-pauline-adrien",
      source: "LaMinière",
      status: "Banque",
      auditPaidDate: "2026-01-15",
      auditStatus: "Payé",
      projects: knownProjectsForContact("Pauline et Adrien")
    },
    {
      name: "Benoit FOUQUET",
      id: "c-rev-benoit-fouquet",
      source: "CJ",
      status: "Analyse de projet",
      auditPaidDate: "2026-01-15",
      auditStatus: "Payé",
      projects: knownProjectsForContact("Benoit FOUQUET")
    },
    {
      name: "Camille (MPI) et Dorian",
      aliases: ["Dorian CAVALIER Camille DECLERCK", "Camille DECLERCK Dorian CAVALIER", "Camille et Dorian"],
      id: "c-rev-camille-dorian",
      source: "LaMinière",
      status: "Analyse de projet",
      auditPaidDate: "2026-01-15",
      auditStatus: "Payé",
      projects: knownProjectsForContact("Camille MPI et Dorian")
    },
    {
      name: "Clément FENOUILLET",
      id: "c-rev-clement-fenouillet",
      source: "LaMinière",
      status: "Acquisition",
      auditPaidDate: "2025-12-15",
      auditStatus: "Payé",
      projects: [
        {
          city: "Solde mandat",
          source: "LM",
          revenueYear: "2026",
          revenueDate: "2026-01-15",
          acquisitionPrice: 0,
          mandateRate: 0,
          mandateFeeTtc: 2880,
          mandateFeeHt: 2400,
          works: 0,
          worksRate: 0,
          worksFeeTtc: 0,
          worksFeeHt: 0,
          auditFeeTtc: 0,
          auditFeeHt: 0,
          furniture: 0,
          status: "Solde à encaisser"
        }
      ]
    },
    {
      name: "Hadrien MANTION",
      id: "c3",
      source: "LaMinière",
      status: "Coaching immobilier",
      type: "Coaching",
      auditStatus: "Non applicable",
      auditFee: 390,
      search: "Coaching analyse de biens à Sète",
      patrimoine: "Coaching ponctuel facturé et réglé",
      target: "Formation / coaching",
      sector: "Sète, Hérault",
      next: "Coaching réglé",
      projects: [
        {
          city: "Coaching analyse de biens à Sète",
          source: "Coaching",
          revenueYear: "2026",
          revenueDate: "2026-01-15",
          revenueCategory: "Coaching",
          missionType: "Analyse de biens à Sète",
          comment: "Coaching analyse de biens à Sète dans l'Hérault. 390 € TTC facturé et réglé, soit 325 € HT.",
          acquisitionPrice: 0,
          mandateRate: 0,
          mandateFeeTtc: 390,
          mandateFeeHt: 325,
          works: 0,
          worksRate: 0,
          worksFeeTtc: 0,
          worksFeeHt: 0,
          auditFeeTtc: 0,
          auditFeeHt: 0,
          furniture: 0,
          status: "Réalisé / encaissé",
          countsAsOperation: false
        }
      ]
    },
    {
      name: "Alexis / Bayan",
      id: "c-rev-montfrin-alexis-bayan",
      source: "Montfrin",
      status: "Travaux",
      auditStatus: "Non applicable",
      auditFee: 0,
      search: "Hôtel de Calvières - Montfrin",
      patrimoine: "Mission spéciale AMO stratégique patrimoniale",
      target: "Projet patrimonial complexe ISMH",
      sector: "Montfrin",
      notes: "Dossier patrimonial ISMH, coordination architecte/géomètre, aide à la stratégie de sortie, PC potentiel 14 à 18 lots, scénario de vente ou valorisation.",
      projects: [
        {
          city: "Hôtel de Calvières - Montfrin",
          source: "Mission spéciale",
          revenueYear: "2026",
          revenueDate: "2026-01-15",
          revenueCategory: "Mission spéciale / AMO stratégique",
          missionType: "Projet patrimonial complexe ISMH",
          comment: "Forfait HT pour stratégie de sortie / valorisation, PC, architecte, géomètre, ABF/DRAC, potentiel 14 à 18 lots.",
          acquisitionPrice: 0,
          mandateRate: 0,
          mandateFeeTtc: 6000,
          mandateFeeHt: 5000,
          works: 0,
          worksRate: 0,
          worksFeeTtc: 0,
          worksFeeHt: 0,
          auditFeeTtc: 0,
          auditFeeHt: 0,
          furniture: 0,
          status: "En cours",
          countsAsOperation: false
        }
      ]
    }
  ];

  const revenueNames = new Set(revenueSpecs.flatMap((spec) => [spec.name, ...(spec.aliases || [])].map(normalizeText)));
  revenueSpecs.forEach((spec) => {
    const normalizedNames = [spec.name, ...(spec.aliases || [])].map(normalizeText);
    const matchingContacts = data.contacts.filter((item) => normalizedNames.includes(normalizeText(item.name)));
    let contact =
      matchingContacts.find((item) => normalizeText(item.name).includes("glaize") || normalizeText(item.name).includes("cardonna") || normalizeText(item.name).includes("cavalier") || normalizeText(item.name).includes("declerck")) ||
      matchingContacts[0];
    matchingContacts.filter((item) => item !== contact).forEach((duplicate) => {
      duplicate.archivedAt = duplicate.archivedAt || new Date().toISOString();
    });
    if (!contact) {
      contact = {
        id: spec.id,
        name: spec.name,
        firstName: "",
        lastName: spec.name,
        email: "à renseigner",
        phone: "à renseigner",
        source: spec.source,
        type: "Client",
        search: "Mandat + accompagnement",
        patrimoine: "Audit puis mandat de recherche",
        mandateStatus: "Signé",
        gvhStatus: "Pas encore",
        priority: "Normale",
        owner: "Gabriel Valette",
        createdAt: spec.auditPaidDate,
        signatureDate: spec.auditPaidDate,
        worksBudget: 0,
        bankStatus: "À cadrer",
        notaryStatus: "Non démarré",
        acquisitionDate: "",
        firstTenantDate: "",
        gvhRisk: "À définir",
        gvhEnvelope: "",
        gvhAmount: 0,
        docChecks: {},
        timelineChecks: {},
        notes: "",
        apport: 0,
        capacite: 0,
        regime: "Meuble probable",
        target: "Ancien / immeuble de rapport",
        sector: "À définir",
        budget: 0,
        last: "Aujourd'hui",
        status: spec.status || "Analyse de projet",
        next: "Suivre mandat et rémunération",
        projects: []
      };
      data.contacts.push(contact);
    }
    ensureContactDefaults(contact);
    contact.name = spec.name;
    contact.auditStatus = spec.auditStatus;
    contact.auditFee = Number(spec.auditFee || 3000);
    contact.auditPaidDate = spec.auditPaidDate;
    contact.auditPaidYear = yearFromDate(spec.auditPaidDate);
    if (!contact.source || contact.source === "CJ") contact.source = spec.source;
    if (spec.status) contact.status = spec.status;
    if (spec.type) contact.type = spec.type;
    if (spec.search) contact.search = spec.search;
    if (spec.patrimoine) contact.patrimoine = spec.patrimoine;
    if (spec.target) contact.target = spec.target;
    if (spec.sector) contact.sector = spec.sector;
    if (spec.next) contact.next = spec.next;
    if (spec.notes) contact.notes = spec.notes;
    contact.projects = spec.projects.map(createProject);
    syncContactProjectDealsInData(data, contact);
  });

  data.contacts.forEach((contact) => {
    if (revenueNames.has(normalizeText(contact.name))) return;
    (contact.projects || []).forEach((project) => {
      project.archivedAt = project.archivedAt || new Date().toISOString();
    });
  });

  attachLegacyRevenueDeals(data);
  archiveLegacyRevenueArtifacts(data);

  const demoDealIds = new Set(["d1", "d2", "d3", "d4", "d5"]);
  data.deals.forEach((deal) => {
    const linkedContact = data.contacts.find((contact) => contact.id === deal.contactId);
    const canonicalRevenueName = canonicalRevenueClientName(`${linkedContact?.name || ""} ${deal.title || ""} ${deal.contact || ""}`);
    const isRevenueContact = linkedContact && (revenueNames.has(normalizeText(linkedContact.name)) || Boolean(canonicalRevenueName));
    if (!deal.projectId && !deal.auditDeal) {
      deal.archivedAt = deal.archivedAt || new Date().toISOString();
      deal.revenueYear = deal.revenueYear || "2025";
    }
    if ((deal.projectId || deal.auditDeal) && !isRevenueContact) {
      deal.archivedAt = deal.archivedAt || new Date().toISOString();
      deal.revenueYear = deal.revenueYear || "2025";
    }
  });
  archiveDuplicateGeneratedDeals(data);
  return data;
}

function attachLegacyRevenueDeals(data) {
  if (!data || !Array.isArray(data.contacts) || !Array.isArray(data.deals)) return;
  const canonicalContacts = new Map();
  data.contacts.forEach((contact) => {
    const canonicalName = canonicalRevenueClientName(contact.name);
    if (!canonicalName) return;
    if (!canonicalContacts.has(canonicalName) || (!isContactArchived(contact) && isContactArchived(canonicalContacts.get(canonicalName)))) {
      canonicalContacts.set(canonicalName, contact);
    }
  });

  data.contacts.forEach((contact) => {
    const canonicalName = canonicalRevenueClientName(contact.name);
    if (!canonicalName) return;
    const keeper = canonicalContacts.get(canonicalName);
    if (keeper && keeper !== contact) contact.archivedAt = contact.archivedAt || new Date().toISOString();
  });

  data.deals.forEach((deal) => {
    const canonicalName = canonicalRevenueClientName(`${deal.title || ""} ${deal.contact || ""}`);
    if (!canonicalName) return;
    const contact = canonicalContacts.get(canonicalName);
    if (!contact) return;
    deal.contactId = contact.id;
    if (canonicalName === "Pauline GLAIZE & Adrien CARDONNA") {
      deal.title = deal.auditDeal ? `${canonicalName} · Audit 3k` : deal.title.replace(/^Pauline et Adrien/i, canonicalName);
    }
    if (canonicalName === "Camille (MPI) et Dorian") {
      deal.title = deal.auditDeal ? `${canonicalName} · Audit 3k` : deal.title.replace(/^Camille.*?Dorian/i, canonicalName);
    }
  });
}

function archiveLegacyRevenueArtifacts(data) {
  if (!data || !Array.isArray(data.contacts) || !Array.isArray(data.deals)) return;
  const now = new Date().toISOString();
  const camilleContact = data.contacts.find((contact) => canonicalRevenueClientName(contact.name) === "Camille (MPI) et Dorian" && !isContactArchived(contact)) ||
    data.contacts.find((contact) => canonicalRevenueClientName(contact.name) === "Camille (MPI) et Dorian");
  if (camilleContact) {
    ensureContactDefaults(camilleContact);
    (camilleContact.projects || []).forEach((project) => {
      ensureProjectDefaults(project);
      const isOldCamilleMandate = Number(project.acquisitionPrice || 0) === 200000 || Math.round(Number(project.mandateFeeHt || 0)) === 9167;
      if (isOldCamilleMandate) project.archivedAt = project.archivedAt || now;
    });
  }

  const seenCanonicalAudits = new Set();
  data.deals.forEach((deal) => {
    const linkedContact = data.contacts.find((contact) => contact.id === deal.contactId);
    const canonicalName = canonicalRevenueClientName(`${linkedContact?.name || ""} ${deal.title || ""} ${deal.contact || ""}`);
    if (canonicalName === "Camille (MPI) et Dorian" && !deal.auditDeal) {
      const legacyText = normalizeText(`${deal.title || ""} ${deal.contact || ""}`);
      const isOldCamilleMandate = legacyText.includes("200 000") || legacyText.includes("200000") || Math.round(Number(deal.value || 0)) === 9750;
      if (isOldCamilleMandate) deal.archivedAt = deal.archivedAt || now;
    }
    if (!deal.auditDeal || !canonicalName) return;
    const key = `${canonicalName}:${deal.revenueYear || ""}:${Math.round(Number(deal.value || 0) * 100) / 100}`;
    if (seenCanonicalAudits.has(key)) deal.archivedAt = deal.archivedAt || now;
    else seenCanonicalAudits.add(key);
  });
}

function normalizeLegacyTechnicalFields(data) {
  data.contacts.forEach((contact) => {
    if (contact.capacite === undefined && contact.capacité !== undefined) contact.capacite = contact.capacité;
    delete contact.capacité;
    (contact.projects || []).forEach((project) => {
      if (project.countsAsOperation === undefined && project.countsAsOpération !== undefined) project.countsAsOperation = project.countsAsOpération;
      delete project.countsAsOpération;
    });
  });
  data.deals.forEach((deal) => {
    if (deal.countsAsOperation === undefined && deal.countsAsOpération !== undefined) deal.countsAsOperation = deal.countsAsOpération;
    delete deal.countsAsOpération;
  });
}

function archiveDuplicateGeneratedDeals(data) {
  const seenAudits = new Set();
  const seenProjects = new Set();
  data.deals.forEach((deal) => {
    if (deal.auditDeal) {
      const linkedContact = data.contacts?.find((contact) => contact.id === deal.contactId);
      const canonicalName = canonicalRevenueClientName(`${linkedContact?.name || ""} ${deal.title || ""} ${deal.contact || ""}`);
      const key = canonicalName ? `${canonicalName}:${deal.revenueYear || ""}:${Math.round(Number(deal.value || 0) * 100) / 100}` : deal.contactId || deal.title;
      if (seenAudits.has(key)) deal.archivedAt = deal.archivedAt || new Date().toISOString();
      else seenAudits.add(key);
    }
    if (deal.projectId) {
      const key = `${deal.contactId || ""}:${deal.projectId}`;
      if (seenProjects.has(key)) deal.archivedAt = deal.archivedAt || new Date().toISOString();
      else seenProjects.add(key);
    }
  });
}

function syncContactProjectDealsInData(data, contact) {
  ensureContactDefaults(contact);
  const projectIds = new Set(activeProjectsFromContact(contact).map((project) => project.id));
  data.deals.forEach((deal) => {
    if (deal.contactId === contact.id && deal.projectId && !projectIds.has(deal.projectId)) deal.archivedAt = deal.archivedAt || new Date().toISOString();
  });

  const auditDeals = data.deals.filter((deal) => deal.contactId === contact.id && deal.auditDeal && !deal.archivedAt);
  const auditDeal = auditDeals[0];
  auditDeals.slice(1).forEach((deal) => {
    deal.archivedAt = deal.archivedAt || new Date().toISOString();
  });
  const auditYear = auditRevenueYear(contact);
  const auditValue = isAuditRevenueRecognized(contact) ? Number(contact.auditFee || 0) / 1.2 : 0;
  if (auditValue) {
    const payload = {
      contactId: contact.id,
      auditDeal: true,
      revenueYear: auditYear,
      revenueDate: contact.auditPaidDate || contact.signatureDate || "",
      title: `${contact.name} · Audit 3k`,
      contact: "Audit patrimonial payé",
      value: auditValue,
      stage: contact.status && getStages().includes(contact.status) ? contact.status : "Audit patrimonial",
      due: "Payé",
      checks: ["Audit", "Facturation"],
      archivedAt: ""
    };
    if (auditDeal) Object.assign(auditDeal, payload);
    else data.deals.unshift({ id: crypto.randomUUID(), ...payload });
  } else if (auditDeal) {
    auditDeal.archivedAt = auditDeal.archivedAt || new Date().toISOString();
  }

  activeProjectsFromContact(contact).forEach((project) => {
    const total = projectTotalHt(project);
    const title = `${contact.name} · ${project.city || "Projet"}`;
    const projectDeals = data.deals.filter((deal) => deal.contactId === contact.id && deal.projectId === project.id && !deal.archivedAt);
    const existing = projectDeals[0];
    projectDeals.slice(1).forEach((deal) => {
      deal.archivedAt = deal.archivedAt || new Date().toISOString();
    });
    const payload = {
      contactId: contact.id,
      projectId: project.id,
      revenueYear: projectRevenueYear(project),
      revenueDate: project.revenueDate || "",
      title,
      contact: `Mandat ${project.source || "CJ"} · ${formatExactMoney(project.acquisitionPrice || 0)}`,
      value: total,
      countsAsOperation: project.countsAsOperation !== false,
      revenueCategory: project.revenueCategory || "Mandat / clé en main",
      missionType: project.missionType || "",
      stage: contact.status && getStages().includes(contact.status) ? contact.status : "Analyse de projet",
      due: project.paymentStatus || project.status || "Non payé",
      checks: ["Mandat", "Financement", "Acte"],
      archivedAt: ""
    };
    if (existing) Object.assign(existing, payload);
    else data.deals.unshift({ id: crypto.randomUUID(), ...payload });
  });
}

function replaceLegacyGvhLabels(value) {
  if (typeof value === "string") return value.replaceAll("GVH", "Hunb'up");
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      value[index] = replaceLegacyGvhLabels(item);
    });
    return value;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => {
      value[key] = replaceLegacyGvhLabels(item);
    });
  }
  return value;
}

function saveState() {
  saveStateBackup();
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  localStorage.setItem(STORE_VERSION_KEY, APP_VERSION);
  localStorage.setItem(LOCAL_UPDATED_KEY, new Date().toISOString());
  updateStatus("Sauvegarde locale");
  if (!isApplyingCloudState) scheduleAutoCloudPush();
}

function saveStateBackup() {
  const previous = localStorage.getItem(STORE_KEY);
  if (!previous) return;
  try {
    localStorage.setItem(
      STORE_BACKUP_KEY,
      JSON.stringify({
        savedAt: new Date().toISOString(),
        data: JSON.parse(previous)
      })
    );
  } catch (error) {
    console.warn("Backup local impossible", error);
  }
}

function getLocalUpdatedAt() {
  return localStorage.getItem(LOCAL_UPDATED_KEY) || "1970-01-01T00:00:00.000Z";
}

function formatMoney(value) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1).replace(".", ",")} MEUR`;
  return `${Math.round(value / 1000)} kEUR`;
}

function yearFromDate(value) {
  const text = String(value || "").trim();
  if (!text) return "";
  const direct = text.match(/\b(20\d{2})\b/);
  if (direct) return direct[1];
  const parsed = new Date(text);
  return Number.isNaN(parsed.getTime()) ? "" : String(parsed.getFullYear());
}

function matchesSearch(item) {
  const query = document.querySelector("#globalSearch").value.trim().toLowerCase();
  if (!query) return true;
  return Object.values(item).join(" ").toLowerCase().includes(query);
}

function render() {
  renderRevenueYearFilter();
  renderMetrics();
  renderDashboard();
  renderStagePie();
  renderProperties();
  renderContacts();
  renderProspects();
  renderCoaching();
  renderPipeline();
  renderGantt();
  renderTasks();
  renderGvh();
  renderAnalysisClientOptions();
  renderAnalysis();
  renderIcons();
}

function readNumber(id) {
  return Number(document.querySelector(`#${id}`)?.value || 0);
}

function worksBreakdownTotal() {
  return ["worksStructure", "worksTechnical", "worksSecondWork", "worksWetRooms", "worksContingency"].reduce((sum, id) => sum + readNumber(id), 0);
}

function renderWorksTotal() {
  const label = document.querySelector("#worksTotalLabel");
  if (!label) return;
  label.textContent = formatExactMoney(worksBreakdownTotal());
}

function formatExactMoney(value) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(value || 0)) + " EUR";
}

function displayText(value) {
  const labels = {
    "A faire": "À faire",
    "À faire": "À faire",
    "À cadrer": "À cadrer",
    "À préparer": "À préparer",
    "À proposer": "À proposer",
    "À planifier": "À planifier",
    "À qualifier": "À qualifier",
    "À auditer": "À auditer",
    "Envoyé": "Envoyé",
    "Envoyé banque": "Envoyé banque",
    "Payé": "Payé",
    "Réalisé": "Réalisé",
    "Signé": "Signé",
    "Non signé": "Non signé",
    "Non démarré": "Non démarré",
    "Pièces en cours": "Pièces en cours",
    "Offre éditée": "Offre éditée",
    "Compromis à vérifier": "Compromis à vérifier",
    "Docs à vérifier": "Docs à vérifier",
    "RDV planifié": "RDV planifié",
    "À définir": "À définir",
    "Finalisé": "Finalisé",
    "Archivé": "Archivé",
    "LaMinière": "LaMinière"
  };
  return labels[value] || value || "";
}

function monthlyPayment(capital, annualRate, years) {
  const months = Math.max(1, years * 12);
  const rate = Math.max(0, annualRate) / 100 / 12;
  if (!capital) return 0;
  if (!rate) return capital / months;
  return (capital * rate) / (1 - Math.pow(1 + rate, -months));
}

function setAutoInputValue(id, value) {
  const input = document.querySelector(`#${id}`);
  if (!input) return value;
  const rounded = Math.round(value || 0);
  if (input.dataset.manual !== "true") input.value = rounded;
  return readNumber(id);
}

function calculateOldPropertyAcquisitionFees(price, dmtoMode) {
  const basePrice = Math.max(0, Number(price) || 0);
  const departmentRate = dmtoMode === "standard" ? 0.05 : 0.045;
  const transferTaxes = basePrice * (0.012 + departmentRate + departmentRate * 0.0237);
  const securityContribution = Math.max(15, basePrice * 0.001);
  const notaryEmolumentsHt =
    Math.min(basePrice, 6500) * 0.0387 +
    Math.max(0, Math.min(basePrice, 17000) - 6500) * 0.01596 +
    Math.max(0, Math.min(basePrice, 60000) - 17000) * 0.01064 +
    Math.max(0, basePrice - 60000) * 0.00799;
  const notaryEmolumentsTtc = notaryEmolumentsHt * 1.2;
  const estimatedDebours = 1100;
  return {
    total: Math.round(transferTaxes + securityContribution + notaryEmolumentsTtc + estimatedDebours),
    transferTaxes: Math.round(transferTaxes),
    securityContribution: Math.round(securityContribution),
    notaryEmolumentsTtc: Math.round(notaryEmolumentsTtc),
    estimatedDebours
  };
}

let addressSuggestions = [];
let addressSearchTimer;
let analysisPhotoDataUrl = "";

async function fetchAddressSuggestions(query) {
  if (!query || query.trim().length < 4) return;
  try {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=6&autocomplète=1`);
    const data = await response.json();
    addressSuggestions = data.features || [];
    const datalist = document.querySelector("#addressSuggestions");
    datalist.innerHTML = addressSuggestions
      .map((feature) => `<option value="${feature.properties.label}"></option>`)
      .join("");
  } catch (error) {
    showToast("Autocomplète adresse indisponible pour le moment.");
  }
}

function applySelectedAddress() {
  const value = document.querySelector("#analysisAddress")?.value;
  const match = addressSuggestions.find((feature) => feature.properties.label === value);
  if (!match) return;
  const [lon, lat] = match.geometry.coordinates;
  document.querySelector("#analysisLat").value = lat;
  document.querySelector("#analysisLon").value = lon;
  document.querySelector("#analysisCity").value = match.properties.city || "";
  document.querySelector("#analysisPostcode").value = match.properties.postcode || "";
  renderAnalysis();
}

function renderAnalysisClientOptions() {
  const select = document.querySelector("#analysisClient");
  if (!select) return;
  const current = select.value;
  select.innerHTML = [
    `<option value="">Dossier sans client rattaché</option>`,
    ...state.contacts.map((contact) => `<option value="${contact.id}">${htmlEscape(contact.name)}</option>`)
  ].join("");
  if (current && state.contacts.some((contact) => contact.id === current)) select.value = current;
}

function getAnalysisClient() {
  const clientId = document.querySelector("#analysisClient")?.value;
  return clientId ? state.contacts.find((contact) => contact.id === clientId) : null;
}

function syncAnalysisClientFields() {
  const client = getAnalysisClient();
  const name = document.querySelector("#analysisClientName");
  const email = document.querySelector("#analysisClientEmail");
  const phone = document.querySelector("#analysisClientPhone");
  if (!client) {
    if (name) name.value = "";
    if (email) email.value = "";
    if (phone) phone.value = "";
    renderAnalysis();
    return;
  }
  if (name) name.value = client.name || "";
  if (email) email.value = client.email || "";
  if (phone) phone.value = client.phone || "";
  renderAnalysis();
}

function saveAnalysisClientFields() {
  const client = getAnalysisClient();
  if (!client) return;
  client.name = document.querySelector("#analysisClientName")?.value || client.name;
  client.email = document.querySelector("#analysisClientEmail")?.value || "";
  client.phone = document.querySelector("#analysisClientPhone")?.value || "";
  saveState();
  renderAnalysisClientOptions();
}

function autofillSectorData(city, postcode) {
  const normalized = normalizeText(`${city} ${postcode}`);
  const data = normalized.includes("castres") || String(postcode).startsWith("81100")
    ? {
        population: 42700,
        medianIncome: 23620,
        marketPriceSqm: 1404,
        tenantShare: 45,
        rentalPressure: 66
      }
    : null;
  if (!data) return;
  [
    ["analysisPopulation", data.population],
    ["analysisMedianIncome", data.medianIncome],
    ["analysisMarketPriceSqm", data.marketPriceSqm],
    ["analysisTenantShare", data.tenantShare],
    ["analysisRentalPressure", data.rentalPressure]
  ].forEach(([id, value]) => {
    const input = document.querySelector(`#${id}`);
    if (input && !Number(input.value || 0) && input.dataset.manual !== "true") input.value = value;
  });
}

function renderAnalysis() {
  const target = document.querySelector("#analysisResults");
  if (!target) return;
  renderWorksTotal();
  const address = document.querySelector("#analysisAddress")?.value || "";
  const addressExtra = document.querySelector("#analysisAddressExtra")?.value || "";
  const lat = document.querySelector("#analysisLat")?.value || "";
  const lon = document.querySelector("#analysisLon")?.value || "";
  const parsedAddress = parseAddressMeta(address);
  const city = document.querySelector("#analysisCity")?.value || parsedAddress.city;
  const postcode = document.querySelector("#analysisPostcode")?.value || parsedAddress.postcode;
  autofillSectorData(city, postcode);
  const country = document.querySelector("#analysisCountry")?.value || "France";
  const cadastre = document.querySelector("#analysisCadastre")?.value || "";
  const projectType = document.querySelector("#analysisProjectType")?.value || "";
  const description = document.querySelector("#analysisDescription")?.value || "";
  const client = getAnalysisClient();
  const price = readNumber("analysisPrice");
  const area = readNumber("analysisArea");
  const rent = readNumber("analysisRent");
  const works = readNumber("analysisWorks");
  const dmtoMode = document.querySelector("#analysisDmtoMode")?.value || "firstBuyer";
  const bankFees = readNumber("analysisBankFees");
  const brokerFees = readNumber("analysisBrokerFees");
  const furniture = readNumber("analysisFurniture");
  const annualRate = readNumber("analysisRate");
  const loanInsurance = readNumber("analysisLoanInsurance");
  const duration = readNumber("analysisDuration");
  const monthlyCosts = readNumber("analysisMonthlyCosts");
  const propertyTax = readNumber("analysisPropertyTax");
  const population = readNumber("analysisPopulation");
  const medianIncome = readNumber("analysisMedianIncome");
  const marketPriceSqm = readNumber("analysisMarketPriceSqm");
  const tenantShare = readNumber("analysisTenantShare");
  const rentalPressure = readNumber("analysisRentalPressure");
  const asset = document.querySelector("#analysisAsset")?.value || "Petit immeuble de rapport";
  const acquisitionFeeDetails = calculateOldPropertyAcquisitionFees(price, dmtoMode);
  const acquisitionFees = acquisitionFeeDetails.total;
  const acquisitionFeesInput = document.querySelector("#analysisAcquisitionFees");
  if (acquisitionFeesInput) acquisitionFeesInput.value = acquisitionFees;
  const feeOnPriceRate = readNumber("analysisFeeOnPriceRate") || 7;
  const feeOnWorksRate = readNumber("analysisFeeOnWorksRate") || 7;
  const feeOnPrice = setAutoInputValue("analysisFeeOnPrice", price * (feeOnPriceRate / 100));
  const feeOnWorks = setAutoInputValue("analysisFeeOnWorks", works * (feeOnWorksRate / 100));
  const laminiereFees = feeOnPrice + feeOnWorks;
  const totalCost = Math.round(price + acquisitionFees + bankFees + brokerFees + laminiereFees + works + furniture);
  const contribution = setAutoInputValue("analysisContribution", totalCost * 0.1);
  const contributionIsManual = document.querySelector("#analysisContribution")?.dataset.manual === "true";
  const borrowedCapital = Math.max(0, totalCost - contribution);
  const payment = monthlyPayment(borrowedCapital, annualRate, duration);
  const creditWithInsurance = payment + loanInsurance;
  const monthlyPropertyTax = propertyTax / 12;
  const operatingCosts = monthlyCosts + monthlyPropertyTax;
  const cashflow = Math.round(rent - creditWithInsurance - operatingCosts);
  const annualRent = rent * 12;
  const pricePerSqm = area ? Math.round(price / area) : 0;
  const rentPerSqm = area ? Math.round((rent / area) * 10) / 10 : 0;
  const grossYield = totalCost ? Math.round((annualRent / totalCost) * 1000) / 10 : 0;
  const yieldOnBorrowed = borrowedCapital ? Math.round((annualRent / borrowedCapital) * 1000) / 10 : 0;
  const tensionScore = estimateRentalTension(address, asset, rentPerSqm);
  const marketScore = Math.min(100, Math.max(0, Math.round(grossYield * 8 + tensionScore * 0.45 - Math.max(0, pricePerSqm - 2200) / 120)));
  const confidence = Math.min(100, Math.max(25, (lat && lon ? 45 : 0) + (address.length > 8 ? 20 : 0) + (price && area ? 20 : 0) + (rent ? 15 : 0)));
  const decision = marketScore >= 70 ? "À analyser en priorité" : marketScore >= 50 ? "Intéressant mais à vérifier" : "Prudence / à filtrer";
  const comparables = buildComparableHints(pricePerSqm, grossYield, city);
  const sectorBars = [
    ["Prix vs secteur", marketPriceSqm ? Math.min(100, Math.round((pricePerSqm / marketPriceSqm) * 100)) : 0, marketPriceSqm ? `${pricePerSqm} / ${marketPriceSqm} EUR/m2` : "À renseigner"],
    ["Population commune", population ? Math.min(100, Math.round(population / 700)) : 0, population ? new Intl.NumberFormat("fr-FR").format(population) : "À renseigner"],
    ["Part locataires", Math.min(100, tenantShare || 0), tenantShare ? `${tenantShare}%` : "À renseigner"],
    ["Tension locative", Math.min(100, rentalPressure || tensionScore), `${rentalPressure || tensionScore}%`],
    ["Revenu médian", medianIncome ? Math.min(100, Math.round((medianIncome / 30000) * 100)) : 0, medianIncome ? formatExactMoney(medianIncome) : "À renseigner"]
  ];
  const alerts = [
    grossYield >= 8 ? "Rendement brut compatible avec une lecture immeuble." : "Rendement à challenger avec DVF, loyers réels et charges.",
    cashflow >= 0 ? "Cashflow estimé positif avant fiscalité." : "Cashflow estimé négatif avant fiscalité, ajuster prix, travaux ou loyers.",
    contribution <= totalCost * 0.18 ? "Apport dans une zone finançable à vérifier banque." : "Apport élevé, vérifier effort client et stratégie patrimoniale."
  ];

  target.innerHTML = `
    <article class="analysis-card wide">
      <p class="eyebrow">Fiche bien</p>
      <h3>${htmlEscape(projectType || asset)}</h3>
      <div class="analysis-property-head">
        <div class="analysis-photo ${analysisPhotoDataUrl ? "has-photo" : ""}">
          ${analysisPhotoDataUrl ? `<img src="${analysisPhotoDataUrl}" alt="Photo principale du bien">` : "<span>Photo principale</span>"}
        </div>
        <div class="model-grid">
          <span>Adresse</span><strong>${htmlEscape(address || "À renseigner")}</strong>
          <span>Complément</span><strong>${htmlEscape(addressExtra || "-")}</strong>
          <span>Code postal / pays</span><strong>${htmlEscape(`${postcode || "-"} · ${country}`)}</strong>
          <span>Cadastre</span><strong>${htmlEscape(cadastre || "À vérifier")}</strong>
          <span>Surface</span><strong>${area || 0} m2</strong>
        </div>
      </div>
      <p class="client-mini">${htmlEscape(description || "Description projet à compléter pour le dossier bancaire.").replaceAll("\n", "<br>")}</p>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Emprunteur</p>
      <h3>${client ? htmlEscape(client.name) : "Client à rattacher"}</h3>
      <div class="model-grid">
        <span>Email</span><strong>${htmlEscape(client?.email || "À compléter")}</strong>
        <span>Téléphone</span><strong>${htmlEscape(client?.phone || "À compléter")}</strong>
        <span>Apport audit</span><strong>${client ? formatMoney(client.apport || 0) : "À compléter"}</strong>
        <span>Capacité bancaire</span><strong>${client ? formatMoney(client.capacite || 0) : "À compléter"}</strong>
      </div>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Modèle LaMinière</p>
      <h3>Tableau de rentabilité intégré</h3>
      <div class="model-grid">
        <span>Prix acquisition FAI</span><strong>${formatExactMoney(price)}</strong>
        <span>Frais acquisition</span><strong>${formatExactMoney(acquisitionFees)}</strong>
        <span>Frais bancaires + courtier</span><strong>${formatExactMoney(bankFees + brokerFees)}</strong>
        <span>Honoraires FAI ${feeOnPriceRate}%</span><strong>${formatExactMoney(feeOnPrice)}</strong>
        <span>Honoraires travaux ${feeOnWorksRate}%</span><strong>${formatExactMoney(feeOnWorks)}</strong>
        <span>Total accompagnement</span><strong>${formatExactMoney(laminiereFees)}</strong>
        <span>Travaux + meubles</span><strong>${formatExactMoney(works + furniture)}</strong>
        <span>Coût total projet</span><strong>${formatExactMoney(totalCost)}</strong>
        <span>Apport personnel ${contributionIsManual ? "" : "(auto 10%)"}</span><strong>${formatExactMoney(contribution)}</strong>
        <span>Capital emprunté</span><strong>${formatExactMoney(borrowedCapital)}</strong>
      </div>
      <p class="client-mini">Frais d'acquisition ancien estimés avec ${dmtoMode === "standard" ? "droits majorés" : "profil sans RP / non majoré"}. À confirmer par le notaire.</p>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Rentabilité projet</p>
      <h3>Simulation rapide</h3>
      <div class="model-grid">
        <span>Rendement brut sur cout total</span><strong>${grossYield}%</strong>
        <span>Rendement sur capital emprunté</span><strong>${yieldOnBorrowed}%</strong>
        <span>Loyers reçus</span><strong>${formatExactMoney(rent)}</strong>
        <span>Crédit avec assurance</span><strong>${formatExactMoney(creditWithInsurance)}</strong>
        <span>Charges totales</span><strong>${formatExactMoney(operatingCosts)}</strong>
        <span>Cashflow avant fiscalité</span><strong>${formatExactMoney(cashflow)} / mois</strong>
      </div>
      <div class="source-links">
        <a href="https://www.service-public.gouv.fr/particuliers/vosdroits/R16181" target="_blank" rel="noreferrer">Service-Public</a>
        <a href="https://docs.google.com/spreadsheets/d/1M7rikj2JVRQtkgLTey0wiXadE1e7RJZ9Z5FoDw3f2Ww/edit?usp=sharing" target="_blank" rel="noreferrer">Modèle complet</a>
      </div>
    </article>
    <article class="analysis-card">
      <p class="eyebrow">Prix</p>
      <h3>Prix au m2</h3>
      <strong>${pricePerSqm} EUR/m2</strong>
      <span class="client-mini">Hors travaux et frais.</span>
    </article>
    <article class="analysis-card">
      <p class="eyebrow">Rentabilité</p>
      <h3>Brute potentielle</h3>
      <strong>${grossYield}%</strong>
      <span class="client-mini">Sur cout total projet.</span>
    </article>
    <article class="analysis-card">
      <p class="eyebrow">Location</p>
      <h3>Tension locative</h3>
      <strong>${tensionScore}/100</strong>
      <span class="client-mini">${rentPerSqm} EUR/m2/mois estimé.</span>
    </article>
    <article class="analysis-card">
      <p class="eyebrow">Décision</p>
      <h3>Score marché</h3>
      <strong>${marketScore}/100</strong>
      <span class="status">${decision}</span>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Alertes</p>
      <h3>Points à arbitrer</h3>
      <ul class="analysis-alerts">
        ${alerts.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Adresse</p>
      <h3>Fiabilité de reconnaissance</h3>
      <strong>${confidence}%</strong>
      <div class="confidence-bar" style="--confidence:${confidence}%"><span></span></div>
      <p class="client-mini">${city || "Ville à détecter"} ${postcode ? `· ${postcode}` : ""} ${lat && lon ? `· ${Number(lat).toFixed(5)}, ${Number(lon).toFixed(5)}` : ""}</p>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">DVF beta inspire</p>
      <h3>Comparables à vérifier</h3>
      <div class="comparable-list">
        ${comparables.map((item) => `<div class="comparable-row"><span>${item.label}</span><strong>${item.value}</strong></div>`).join("")}
      </div>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Analyse secteur</p>
      <h3>${htmlEscape(city || "Commune à qualifier")}</h3>
      <div class="sector-bars">
        ${sectorBars.map(([label, width, value]) => `
          <div class="sector-bar">
            <span>${label}</span>
            <div class="sector-bar-track"><span style="--bar-width:${Math.max(4, width)}%"></span></div>
            <strong>${value}</strong>
          </div>
        `).join("")}
      </div>
      <div class="source-links">
        <a href="https://www.insee.fr/fr/statistiques/1405599?geo=COM-81065" target="_blank" rel="noreferrer">INSEE commune</a>
        <a href="https://www.normi.fr/ville/castres-81100" target="_blank" rel="noreferrer">Prix DVF secteur</a>
      </div>
      <p class="client-mini">Rempli automatiquement quand la commune est reconnue. Sources à contrôler avant envoi bancaire.</p>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Contrôle officiel</p>
      <h3>Sources à consulter</h3>
      <p>Cette première version calcule une pré-analyse locale. Les données officielles doivent être vérifiées via DVF, INSEE et les annonces locatives du secteur.</p>
      <div class="source-links">
        <a href="https://app.dvf.etalab.gouv.fr/" target="_blank" rel="noreferrer">DVF Etalab</a>
        <a href="https://explore.data.gouv.fr/fr/immobilier?onglet=carte" target="_blank" rel="noreferrer">DVF beta / carte</a>
        <a href="https://cadastre.data.gouv.fr/dvf" target="_blank" rel="noreferrer">Base DVF</a>
        <a href="https://www.insee.fr/fr/information/3544265" target="_blank" rel="noreferrer">INSEE données locales</a>
        <a href="https://adresse.data.gouv.fr/" target="_blank" rel="noreferrer">Base Adresse Nationale</a>
      </div>
    </article>
    <article class="analysis-card wide">
      <p class="eyebrow">Lecture LaMinière</p>
      <h3>${asset}</h3>
      <p><strong>${address || "Adresse à renseigner"}</strong></p>
      <p>Vérifier DVF récent, vacance locative, bassin d'emploi, transports, tension annonce, taxe foncière, travaux structurels, division, compteurs et régime meublé.</p>
    </article>
  `;
}

function inferCity(address) {
  const parts = address.split(",");
  return parts.length > 1 ? parts.at(-1).trim() : "";
}

function parseAddressMeta(address) {
  const text = String(address || "").trim();
  const postcodeMatch = text.match(/\b(\d{5})\b/);
  const postcode = postcodeMatch?.[1] || "";
  let city = "";
  if (postcode) {
    const afterPostcode = text.slice(text.indexOf(postcode) + postcode.length).trim();
    city = afterPostcode.replace(/[,;].*$/, "").trim();
  }
  if (!city) city = inferCity(text);
  return { postcode, city };
}

function buildComparableHints(pricePerSqm, grossYield, city) {
  const low = Math.max(0, Math.round(pricePerSqm * 0.88));
  const high = Math.round(pricePerSqm * 1.12);
  return [
    { label: `Fourchette DVF cible ${city ? `sur ${city}` : "commune"}`, value: `${low}-${high} EUR/m2` },
    { label: "Seuil LaMinière brut minimal", value: grossYield >= 7 ? "OK" : "À challenger" },
    { label: "À vérifier dans DVF", value: "ventes 5 ans" },
    { label: "À vérifier en location", value: "annonces actives" }
  ];
}

function estimateRentalTension(address, asset, rentPerSqm) {
  const text = address.toLowerCase();
  let score = 50;
  if (/(toulouse|lyon|bordeaux|nantes|rennes|lille|montpellier|paris|marseille)/.test(text)) score += 20;
  if (/(gare|metro|tram|universite|fac|chu|centre)/.test(text)) score += 12;
  if (asset.includes("Colocation")) score += 6;
  if (asset.includes("immeuble")) score += 4;
  if (rentPerSqm >= 14) score += 8;
  if (rentPerSqm < 8 && rentPerSqm > 0) score -= 10;
  return Math.min(100, Math.max(0, score));
}

function renderStagePie() {
  const chart = document.querySelector("#stagePie");
  if (!chart) return;

  const stages = getStages();
  const counts = stages
    .map((stage) => ({ stage, count: activeContacts().filter((contact) => contact.status === stage).length }))
    .filter((item) => item.count > 0);

  const total = counts.reduce((sum, item) => sum + item.count, 0) || 1;
  const maxCount = Math.max(1, ...counts.map((item) => item.count));

  chart.innerHTML = counts.length
    ? counts
        .map((item) => {
          const pct = Math.round((item.count / total) * 100);
          const width = Math.round((item.count / maxCount) * 100);
          return `<div class="funnel-row"><strong>${htmlEscape(item.stage)}</strong><div class="funnel-track"><div class="funnel-fill" style="width:${width}%"></div></div><span>${item.count} ${String.fromCharCode(183)} ${pct}%</span></div>`;
        })
        .join("")
    : '<p class="empty">Aucun dossier actif.</p>';
}

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
    return;
  }

  const fallbackIcons = {
    "layout-dashboard": "[]",
    "building-2": "LM",
    "users-round": "O",
    "search-check": "?",
    "kanban-square": "||",
    "gantt-chart": "==",
    "calendar-check": "OK",
    landmark: "Hunb'up",
    search: "?",
    download: "v",
    "file-down": "v",
    "file-up": "^",
    "external-link": ">",
    printer: "P",
    "refresh-cw": "R",
    "rotate-ccw": "R",
    plus: "+",
    home: "H",
    "user-plus": "+",
    "calendar-plus": "+",
    x: "x",
    check: "OK"
  };

  document.querySelectorAll("[data-icon]").forEach((icon) => {
    if (!icon.textContent.trim()) icon.textContent = fallbackIcons[icon.dataset.icon] || ".";
  });
}

function renderMetrics() {
  const deals = activeDeals();
  const projectDeals = deals.filter((deal) => deal.projectId && !deal.auditDeal && deal.countsAsOperation !== false);
  const offerValue = deals.reduce((sum, deal) => sum + Number(deal.value || 0), 0);
  const revenueTarget = revenueTargetForYear(selectedRevenueYear);
  const targetProgress = revenueTarget ? Math.min(100, Math.round((offerValue / revenueTarget) * 100)) : 0;
  const targetNote = revenueTarget ? `objectif ${formatExactMoney(revenueTarget)} HT` : selectedRevenueYear === "2025" ? "année de lancement · pas d'objectif annuel" : "objectif annuel à définir";
  const progressText = revenueTarget ? `${targetProgress}% de l'objectif annuel` : selectedRevenueYear === "2025" ? "CA réalisé sans objectif annuel" : "Prévision à cadrer";
  const contacts = activeContacts();
  const hotContacts = contacts.filter((contact) => !["Bascule Hunb'up", "Finalisé"].includes(contact.status)).length;
  const openTasks = state.tasks.filter((task) => !task.done).length;
  const gvhReady = deals.filter((deal) => deal.stage === "Bascule Hunb'up").length;

  const revenueArcPct = revenueTarget ? targetProgress : 100;
  const revenueArcCircumference = 2 * Math.PI * 16;
  const revenueArcOffset = revenueArcCircumference * (1 - revenueArcPct / 100);
  const metrics = [
    {
      label: `CA prévisionnel ${selectedRevenueYear}`,
      value: `${formatExactMoney(offerValue)} HT`,
      note: `${projectDeals.length} projets actifs · ${targetNote}`,
      action: "revenue-forecast",
      extra: `<div class="metric-arc-wrap" aria-label="${progressText}"><svg width="40" height="40" viewBox="0 0 40 40" class="metric-arc"><circle cx="20" cy="20" r="16" fill="none" stroke="var(--line)" stroke-width="5"/><circle cx="20" cy="20" r="16" fill="none" stroke="var(--accent)" stroke-width="5" stroke-linecap="round" stroke-dasharray="${revenueArcCircumference}" stroke-dashoffset="${revenueArcOffset}" transform="rotate(-90 20 20)"/></svg><small>${progressText}</small></div>`
    },
    { label: "Clients actifs", value: hotContacts, note: "Prospects et opérations LaMinière" },
    { label: "Relances ouvertes", value: openTasks, note: "À traiter cette semaine" },
    { label: "Bascule Hunb'up", value: gvhReady, note: "Clients prêts pour assurance vie", accent: "blue" }
  ];

  document.querySelector("#metrics").innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card ${metric.action ? "metric-card-action" : ""} ${metric.accent ? "metric-card-accent-" + metric.accent : ""}" ${metric.action ? `data-metric-action="${metric.action}" role="button" tabindex="0"` : ""}>
          <span>${metric.accent ? `<span class="metric-dot metric-dot-${metric.accent}"></span>` : ""}${metric.label}</span>
          <strong>${metric.value}</strong>
          <p>${metric.note}</p>
          ${metric.extra || ""}
        </article>
      `
    )
    .join("");
}

function revenueTargetForYear(year = selectedRevenueYear) {
  return REVENUE_TARGETS_HT[String(year)] ?? null;
}

function clientRevenueKey(row) {
  const canonicalName = canonicalRevenueClientName(`${row.client || ""} ${row.title || ""} ${row.detail || ""}`);
  return row.contactId || normalizeText(canonicalName || row.client || row.title || "Client") || "client";
}

function revenueForecastRows() {
  return activeDeals()
    .filter((deal) => Number(deal.value || 0) > 0)
    .sort((a, b) => Number(b.value || 0) - Number(a.value || 0))
    .map((deal) => {
      const contact = findLinkedContactForDeal(deal);
      const canonicalName = canonicalRevenueClientName(`${deal.title || ""} ${deal.contact || ""} ${contact?.name || ""}`);
      const kind = deal.revenueCategory || (deal.auditDeal ? "Audit" : deal.countsAsOperation === false ? "Autre revenu" : "Projet");
      const realized = deal.auditDeal || normalizePaymentStatus(deal.due) === "Payé";
      return {
        id: deal.id,
        contactId: contact?.id || deal.contactId || "",
        title: deal.title || contact?.name || "Dossier",
        client: contact?.name || canonicalName || deal.title || "Client",
        detail: deal.contact || deal.due || deal.stage || "",
        kind,
        status: realized ? "Réalisé / encaissé" : "En cours",
        value: Number(deal.value || 0),
        stage: deal.stage || "À suivre"
      };
    });
}

function groupedRevenueForecastRows(rows) {
  return Object.values(
    rows.reduce((groups, row) => {
      const key = clientRevenueKey(row);
      if (!groups[key]) {
        groups[key] = {
          client: row.client || "Client",
          total: 0,
          realized: 0,
          pending: 0,
          rows: []
        };
      }
      groups[key].total += row.value;
      if (row.status === "Réalisé / encaissé") groups[key].realized += row.value;
      else groups[key].pending += row.value;
      groups[key].rows.push(row);
      return groups;
    }, {})
  ).sort((a, b) => b.total - a.total);
}

function openRevenueForecastModal() {
  const rows = revenueForecastRows();
  const groupedRows = groupedRevenueForecastRows(rows);
  const total = rows.reduce((sum, row) => sum + row.value, 0);
  const revenueTarget = revenueTargetForYear(selectedRevenueYear);
  const progress = revenueTarget ? Math.min(100, Math.round((total / revenueTarget) * 100)) : null;
  const realized = rows.filter((row) => row.status === "Réalisé / encaissé").reduce((sum, row) => sum + row.value, 0);
  const pending = total - realized;
  document.querySelector("#revenueForecastTitle").textContent = `CA prévisionnel ${selectedRevenueYear}`;
  document.querySelector("#revenueForecastSummary").innerHTML = `
    <div><span>Total prévisionnel</span><strong>${formatExactMoney(total)} HT</strong></div>
    <div><span>Objectif annuel</span><strong>${revenueTarget ? `${formatExactMoney(revenueTarget)} HT` : "À définir"}</strong></div>
    <div><span>Avancement</span><strong>${progress === null ? "Non applicable" : `${progress}%`}</strong></div>
    <div><span>Réalisé / encaissé</span><strong>${formatExactMoney(realized)} HT</strong></div>
    <div><span>En cours</span><strong>${formatExactMoney(pending)} HT</strong></div>
  `;
  document.querySelector("#revenueForecastRows").innerHTML =
    groupedRows
      .map(
        (group) => `
          <section class="forecast-client-group">
            <div class="forecast-client-head">
              <span>
                <strong>${htmlEscape(group.client)}</strong>
                <small>${group.rows.length} ligne${group.rows.length > 1 ? "s" : ""} · encaissé ${formatExactMoney(group.realized)} HT · en cours ${formatExactMoney(group.pending)} HT</small>
              </span>
              <strong>${formatExactMoney(group.total)} HT</strong>
            </div>
            ${group.rows
              .map(
                (row) => `
                  <div class="forecast-row forecast-row-child">
                    <button class="forecast-row-main" type="button" data-open-revenue-deal="${row.id}">
                      <span>
                        <strong>${htmlEscape(row.kind)}</strong>
                        <small>${htmlEscape(row.stage)} · ${htmlEscape(row.detail)}</small>
                      </span>
                      <span class="forecast-row-right">
                        <em>${row.status}</em>
                        <strong>${formatExactMoney(row.value)} HT</strong>
                      </span>
                    </button>
                    <button class="ghost-button table-action" data-archive-revenue-deal="${row.id}" type="button">Sortir du CA</button>
                  </div>
                `
              )
              .join("")}
          </section>
        `
      )
      .join("") || emptyState("Aucun montant comptabilisé sur cette année.");
  document.querySelector("#revenueForecastModal").showModal();
}

function availableRevenueYears() {
  const years = new Set([String(new Date().getFullYear()), "2027"]);
  state.contacts.map(ensureContactDefaults).forEach((contact) => {
    if (isAuditRevenueRecognized(contact)) years.add(auditRevenueYear(contact));
    activeProjects(contact).forEach((project) => years.add(projectRevenueYear(project)));
  });
  state.deals.map(ensureDealDefaults).forEach((deal) => years.add(dealRevenueYear(deal)));
  return Array.from(years).filter(Boolean).sort();
}

function renderRevenueYearFilter() {
  const select = document.querySelector("#caYearFilter");
  if (!select) return;
  const years = availableRevenueYears();
  if (!years.includes(String(selectedRevenueYear))) selectedRevenueYear = years.at(-1) || selectedRevenueYear;
  select.innerHTML = years.map((year) => `<option value="${year}" ${String(selectedRevenueYear) === year ? "selected" : ""}>${year}</option>`).join("");
}

function renderDashboard() {
  const stages = getStages();
  renderActionHub();
  renderClientControlGrid();
  document.querySelector("#pipelineMini").innerHTML = stages
    .map((stage) => {
      const total = activeDeals().filter((deal) => deal.stage === stage).reduce((sum, deal) => sum + Number(deal.value || 0), 0);
      const pct = Math.min(100, Math.max(12, total / 9000));
      return `<div class="pipeline-row"><strong>${stage}</strong><div class="progress"><span style="width:${pct}%"></span></div><span>${formatMoney(total)}</span></div>`;
    })
    .join("");

  document.querySelector("#dashboardTasks").innerHTML = state.tasks
    .map(ensureTaskDefaults)
    .filter((task) => !task.done)
    .sort((a, b) => taskUrgencyRank(a) - taskUrgencyRank(b))
    .slice(0, 6)
    .map(taskTemplate)
    .join("") || emptyState("Aucune relance ouverte.");

  document.querySelector("#featuredProperties").innerHTML = state.properties.slice(0, 3).map(propertyTemplate).join("");
  renderBusinessInsights();
  renderBlockers();
  renderAdvisorFocus();
  renderCloudSummary();
}

function renderActionHub() {
  const target = document.querySelector("#actionHub");
  if (!target) return;
  const actions = [
    ["Nouveau client", "Créer une fiche client, audit 3k ou mandat.", "contact", "user-plus"],
    ["Nouvelle analyse", "Adresse, DVF, rentabilité, dossier bancaire.", "analysis", "search-check"],
    ["Relance", "Créer une tâche visible au tableau de bord.", "task", "calendar-plus"],
    ["Planning", "Voir les dossiers étape par étape.", "gantt", "gantt-chart"],
    ["Dossier bancaire", "Exporter ou imprimer depuis l'analyse.", "bank", "file-down"],
    ["Site web", "Ouvrir laminiere.com dans un nouvel onglet.", "website", "external-link"]
  ];
  target.innerHTML = actions
    .map(
      ([title, note, action, icon]) => `
        <button class="action-card" data-action-hub="${action}" type="button">
          <span data-icon="${icon}"></span>
          <strong>${title}</strong>
          <small>${note}</small>
        </button>
      `
    )
    .join("");
}

function renderClientControlGrid() {
  const target = document.querySelector("#clientControlGrid");
  if (!target) return;
  const contacts = activeContacts().slice(0, 6);
  const stageCounts = getStages()
    .map((stage) => [stage, activeContacts().filter((contact) => contact.status === stage).length])
    .filter(([, count]) => count > 0)
    .slice(0, 5);
  target.innerHTML = `
    <div class="client-control-summary">
      <strong>${activeContacts().length}</strong>
      <span>clients en base</span>
      <small>${state.tasks.filter((task) => !task.done).length} relances ouvertes</small>
    </div>
    <div class="client-control-list">
      ${contacts
        .map(
          (contact) => `
            <button class="client-control-row" data-open-linked-contact="${contact.id}" type="button">
              <span>
                <strong>${htmlEscape(contact.name)}</strong>
                <small>${htmlEscape(contact.status)} · ${htmlEscape(contact.next || "À planifier")}</small>
              </span>
              <em title="${htmlEscape(clientScoreTooltip(contact))}" data-score-info="${contact.id}"><span class="score-dot ${scoreTier(clientScore(contact))}"></span>${clientScore(contact)}/100</em>
            </button>
          `
        )
        .join("") || emptyState("Aucun client pour le moment.")}
    </div>
    <div class="client-stage-list">
      ${stageCounts.map(([stage, count]) => `<div><span>${htmlEscape(stage)}</span><strong>${count}</strong></div>`).join("") || "<p class=\"empty\">Aucune étape active.</p>"}
    </div>
  `;
}

function renderCloudSummary() {
  const label = document.querySelector("#cloudWorkspaceLabel");
  if (!label) return;
  const config = getCloudConfig();
  label.textContent = config?.workspace ? `Workspace ${config.workspace} · ${config.autoSync === false ? "sync manuelle" : "sync auto"}` : "Mode local";
  const details = document.querySelector("#cloudSyncDetails");
  if (details) {
    const meta = getCloudMeta();
    const archivedCount = state.contacts.map(ensureContactDefaults).filter(isContactArchived).length;
    const localSummary = `${activeContacts().length} actifs, ${archivedCount} archives · app ${APP_VERSION}`;
    details.textContent = meta.lastCloudUpdatedAt
      ? `Dernier cloud: ${new Date(meta.lastCloudUpdatedAt).toLocaleString("fr-FR")} · local: ${localSummary}`
      : `Local: ${localSummary} · cloud non vérifié`;
  }
}

function renderBusinessInsights() {
  const contacts = activeContacts();
  const auditSigned = contacts.filter((contact) => ["Envoyé", "Payé", "Réalisé", "Envoyé", "Payé", "Réalisé"].includes(contact.auditStatus)).length;
  const auditPaid = contacts.filter((contact) => ["Payé", "Réalisé", "Payé", "Réalisé"].includes(contact.auditStatus)).reduce((sum, contact) => sum + Number(contact.auditFee || 0), 0);
  const mandates = contacts.filter((contact) => ["Signé", "Signé"].includes(contact.mandateStatus)).length;
  const gvhPotential = contacts.reduce((sum, contact) => sum + Number(contact.gvhAmount || 0), 0);
  const avgScore = contacts.length ? Math.round(contacts.reduce((sum, contact) => sum + clientScore(contact), 0) / contacts.length) : 0;

  const rows = [
    ["Audits actifs", `${auditSigned}`, `${formatMoney(auditPaid)} déjà sécurisés ou en cours`],
    ["Mandats signés", `${mandates}`, "Clients passés de l'audit à l'accompagnement ancien"],
    ["Potentiel Hunb'up", formatMoney(gvhPotential), "Montants identifiés pour assurance vie / allocation"],
    ["Score moyen", `${avgScore}/100`, "Maturité moyenne du portefeuille client"]
  ];

  document.querySelector("#businessInsights").innerHTML = rows
    .map(([label, value, note]) => `<div class="business-row"><div><strong>${label}</strong><span class="client-mini">${note}</span></div><span class="score-pill">${value}</span></div>`)
    .join("");
}

function renderAdvisorFocus() {
  const target = document.querySelector("#advisorFocus");
  if (!target) return;
  const contacts = activeContacts();
  const rows = [
    {
      label: "Dossiers banque à compléter",
      value: contacts.filter((contact) => ["Banque", "Notaire"].includes(contact.status) && documentProgressRatio(contact, "bank") < 0.75).length,
      note: "Priorité aux pièces manquantes, prévisionnel et accord de principe."
    },
    {
      label: "Audits à convertir",
      value: contacts.filter((contact) => ["À faire", "En cours", "A faire"].includes(contact.auditStatus) || contact.status === "Audit patrimonial").length,
      note: "Objectif : audit 3k, capacité bancaire, cible ancien."
    },
    {
      label: "Clients prêts Hunb'up",
      value: contacts.filter((contact) => contact.status === "Bascule Hunb'up" || ["À préparer", "Prêt à basculer"].includes(contact.gvhStatus) || normalizeText(contact.gvhStatus) === ["pret", "a", "basculer"].join(" ")).length,
      note: "Préparer assurance vie, allocation et rendez-vous post-location."
    }
  ];
  target.innerHTML = rows
    .map((row) => `<div class="advisor-row"><div><strong>${row.label}</strong><span class="client-mini">${row.note}</span></div><span class="score-pill">${row.value}</span></div>`)
    .join("");
}

function renderBlockers() {
  const blockers = activeContacts()
    .flatMap((contact) => detectBlockers(contact).map((blocker) => ({ contact, blocker })))
    .slice(0, 6);

  document.querySelector("#blockerList").innerHTML =
    blockers
      .map(
        ({ contact, blocker }) => `
          <div class="blocker-row" data-blocker-contact-id="${contact.id}">
            <div><strong>${contact.name}</strong><span class="client-mini">${blocker}</span></div>
          <span class="status">${displayText(contact.status)}</span>
          </div>
        `
      )
      .join("") || emptyState("Aucun blocage prioritaire détecté.");
}

function propertyTemplate(property) {
  return `
    <article class="property-card">
      <div class="property-media" style="--photo: ${photos[property.photo % photos.length]}">
        <span class="badge">${displayText(property.status)}</span>
      </div>
      <div class="property-body">
        <h3>${property.title}</h3>
        <p>${property.city} · ${formatMoney(property.price)}</p>
        <div class="property-meta">
          <span>${property.area} etapes</span>
          <span>${property.rooms} livrables</span>
          <span>${property.owner}</span>
        </div>
      </div>
    </article>
  `;
}

function renderProperties() {
  const properties = state.properties.filter(matchesSearch).filter((property) => propertyFilter === "all" || property.status === propertyFilter);
  document.querySelector("#propertyGrid").innerHTML = properties.map(propertyTemplate).join("") || emptyState("Aucune offre ne correspond à la recherche.");
}

function renderContacts() {
  state.contacts.forEach(ensureContactDefaults);
  const contacts = state.contacts
    .map(ensureContactDefaults)
    .filter((contact) => (showArchivedContacts ? isContactArchived(contact) : !isContactArchived(contact)))
    .filter(matchesSearch);
  document.querySelector("#showArchivedContacts").checked = showArchivedContacts;
  document.querySelector("#contactsTable").innerHTML = contacts
    .map(
      (contact) => `
        <tr data-contact-id="${contact.id}">
          <td>
            <strong>${htmlEscape(contact.name)}</strong>
            ${isContactArchived(contact) ? '<br /><span class="status muted-status">Archivé</span>' : ""}
          </td>
          <td>${htmlEscape(contact.source || "Source ?")}<br /><span class="client-mini">${htmlEscape(contact.owner || "Responsable ?")}</span></td>
          <td>${contact.search}<br /><span class="client-mini">${contact.target || "Cible à définir"} · ${contact.sector || "Secteur ?"}</span><br /><span class="score-pill" title="${htmlEscape(clientScoreTooltip(contact))}" data-score-info="${contact.id}"><span class="score-dot ${scoreTier(clientScore(contact))}"></span>${clientScore(contact)}/100</span></td>
          <td><span class="status">${displayText(contact.auditStatus)}</span><br /><span class="money-pill">${formatMoney(contact.auditFee)}</span><br /><span class="client-mini">${documentProgress(contact, "audit")}</span></td>
          <td><span class="status">${displayText(contact.mandateStatus)}</span><br /><span class="client-mini">Banque: ${displayText(contact.bankStatus)}</span><br /><span class="client-mini">${documentProgress(contact, "bank")} banque</span></td>
          <td><span class="status">${displayText(contact.gvhStatus)}</span><br /><span class="client-mini">${contact.gvhEnvelope || "À qualifier"}</span><br /><span class="client-mini">${documentProgress(contact, "gvh")}</span></td>
          <td>${contact.next || contact.last || "À planifier"}</td>
          <td>
            <button class="ghost-button table-action" data-merge-contact="${contact.id}" type="button">Fusionner</button>
            <button class="ghost-button table-action" data-archive-contact="${contact.id}" type="button">${isContactArchived(contact) ? "Restaurer" : "Archiver"}</button>
          </td>
        </tr>
      `
    )
    .join("") || `<tr><td colspan="8" class="empty">${showArchivedContacts ? "Aucun contact archivé." : "Aucun contact actif."}</td></tr>`;
}

function isProspect(contact) {
  ensureContactDefaults(contact);
  const haystack = normalizeText([contact.type, contact.status, contact.search, contact.patrimoine, contact.target, contact.next].join(" "));
  return !isCoachingContact(contact) && (contact.type === "Prospect" || contact.status === "Prospect" || haystack.includes("prospect"));
}

function isCoachingContact(contact) {
  ensureContactDefaults(contact);
  const haystack = normalizeText([contact.type, contact.status, contact.search, contact.patrimoine, contact.target, contact.next].join(" "));
  return contact.type === "Coaching" || contact.status === "Coaching immobilier" || haystack.includes("coaching");
}

function prospectRelances(contact) {
  return state.tasks.map(ensureTaskDefaults).filter((task) => task.clientId === contact.id && !task.done);
}

function parseIsoDate(value) {
  const text = String(value || "").trim();
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(text);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function isoDateFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function tomorrowIso() {
  const date = startOfToday();
  date.setDate(date.getDate() + 1);
  return isoDateFromDate(date);
}

function formatDueLabel(value) {
  const parsed = parseIsoDate(value);
  if (!parsed) return value || "";
  const diffDays = Math.round((parsed - startOfToday()) / 86400000);
  if (diffDays < 0) return `En retard (${-diffDays}j)`;
  if (diffDays === 0) return "Aujourd'hui";
  if (diffDays === 1) return "Demain";
  if (diffDays > 1 && diffDays <= 6) return `Dans ${diffDays} jours`;
  return parsed.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function isDecemberDue(task) {
  const parsed = parseIsoDate(task.due);
  if (parsed) return parsed.getMonth() === 11;
  const text = normalizeText(task.due);
  return text.includes("decembre") || text.includes("december");
}

function taskUrgencyRank(task) {
  const parsed = parseIsoDate(task.due);
  if (parsed) {
    const diffDays = Math.round((parsed - startOfToday()) / 86400000);
    if (diffDays < 0) return -1;
    if (diffDays === 0) return 0;
    if (diffDays === 1) return 1;
    return 5 + diffDays;
  }
  const due = normalizeText(task.due);
  if (due.includes("aujourd")) return 0;
  if (due.includes("demain")) return 1;
  if (due.includes("cette semaine") || due.includes("semaine")) return 2;
  if (due.includes("decembre")) return 8;
  if (due.includes("janvier")) return 9;
  const year = yearFromDate(task.due);
  if (year) return Number(year) * 100;
  return 5;
}

function renderProspects() {
  const target = document.querySelector("#prospectGrid");
  if (!target) return;
  const prospects = activeContacts().filter(isProspect).filter(matchesSearch);
  target.innerHTML =
    prospects
      .map((contact) => {
        const relances = prospectRelances(contact);
        const december = relances.find((task) => isDecemberDue(task));
        return `
          <article class="prospect-card" data-prospect-id="${contact.id}">
            <div>
              <span class="badge">${htmlEscape(contact.source || "Prospect")}</span>
              <h3>${htmlEscape(contact.name)}</h3>
              <p>${htmlEscape(contact.search || contact.target || "Projet à qualifier")}</p>
            </div>
            <div class="property-meta">
              <span>${htmlEscape(contact.email || "Email à renseigner")}</span>
              <span>${htmlEscape(contact.phone || "Téléphone à renseigner")}</span>
              <span>${htmlEscape(contact.next || december?.title || "Relance à planifier")}</span>
            </div>
            <div class="prospect-relances">
              ${relances.length ? relances.slice(0, 3).map((task) => `<span class="status">${htmlEscape(formatDueLabel(task.due))} · ${htmlEscape(task.title)}</span>`).join("") : '<span class="client-mini">Aucune relance ouverte</span>'}
            </div>
            <div class="card-actions">
              <button class="ghost-button" type="button" data-open-prospect="${contact.id}">Ouvrir</button>
              <button class="ghost-button" type="button" data-december-prospect="${contact.id}">Relance décembre</button>
            </div>
          </article>
        `;
      })
      .join("") || emptyState("Aucun prospect à relancer pour le moment.");
}

function renderCoaching() {
  const target = document.querySelector("#coachingGrid");
  if (!target) return;
  const clients = activeContacts().filter(isCoachingContact).filter(matchesSearch);
  target.innerHTML =
    clients
      .map((contact) => {
        const projects = activeProjects(contact).filter((project) => project.revenueCategory === "Coaching" || normalizeText(project.source).includes("coaching") || normalizeText(project.city).includes("coaching"));
        const total = projects.reduce((sum, project) => sum + projectTotalHt(project), 0);
        const realized = projects.filter((project) => normalizePaymentStatus(project.paymentStatus, project.status) === "Payé").reduce((sum, project) => sum + projectTotalHt(project), 0);
        return `
          <article class="prospect-card" data-coaching-contact-id="${contact.id}">
            <div>
              <span class="badge">Coaching immobilier</span>
              <h3>${htmlEscape(contact.name)}</h3>
              <p>${htmlEscape(contact.search || "Analyse ponctuelle")}</p>
            </div>
            <div class="property-meta">
              <span>${htmlEscape(contact.sector || "Secteur à préciser")}</span>
              <span>${formatExactMoney(total)} HT</span>
              <span>${realized ? `Réalisé ${formatExactMoney(realized)} HT` : "Paiement à renseigner"}</span>
            </div>
            <div class="card-actions">
              <button class="ghost-button" type="button" data-open-coaching="${contact.id}">Ouvrir</button>
            </div>
          </article>
        `;
      })
      .join("") || emptyState("Aucun coaching immobilier enregistré.");
}

function addDecemberProspectRelance(contactId) {
  const contact = state.contacts.find((item) => item.id === contactId);
  if (!contact) return;
  const hasDecemberRelance = state.tasks.map(ensureTaskDefaults).some((task) => {
    return task.clientId === contactId && !task.done && isDecemberDue(task);
  });
  if (hasDecemberRelance) {
    showToast("Une relance décembre existe déjà pour ce prospect.");
    return;
  }
  state.tasks.unshift({
    id: crypto.randomUUID(),
    clientId: contactId,
    title: `Relancer ${contact.name}`,
    type: "Relance",
    priority: "Normale",
    detail: "Relance prospect à traiter en décembre.",
    due: "Décembre",
    done: false,
    createdAt: new Date().toISOString().slice(0, 10)
  });
  contact.next = "Relance prévue en décembre";
  saveState();
  render();
  showToast("Relance décembre ajoutée au prospect.");
}

function documentProgress(contact, groupKey) {
  const total = documentGroups[groupKey]?.items.length || 0;
  const done = contact.docChecks?.[groupKey]?.length || 0;
  return `${done}/${total} pieces`;
}

function documentProgressRatio(contact, groupKey) {
  const total = documentGroups[groupKey]?.items.length || 0;
  if (!total) return 0;
  return (contact.docChecks?.[groupKey]?.length || 0) / total;
}

function timelineProgressRatio(contact) {
  const total = acquisitionTimeline.reduce((sum, month) => sum + month.items.length, 0);
  if (!total) return 0;
  const done = Object.values(contact.timelineChecks || {}).filter(Boolean).length;
  return done / total;
}

function clientScore(contact) {
  ensureContactDefaults(contact);
  let score = 0;
  if (["Envoyé", "Payé", "Réalisé", "Envoyé", "Payé", "Réalisé"].includes(contact.auditStatus)) score += 12;
  if (["Payé", "Réalisé", "Payé", "Réalisé"].includes(contact.auditStatus)) score += 12;
  if (contact.apport > 0) score += 10;
  if (contact.capacite > 0) score += 10;
  if (contact.search && contact.search !== "À définir") score += 8;
  if (contact.target && contact.target !== "Cible à définir") score += 8;
  if (contact.sector && !["À définir", "Secteur ?"].includes(contact.sector)) score += 6;
  if (["Signé", "Signé"].includes(contact.mandateStatus)) score += 12;
  if (documentProgressRatio(contact, "audit") >= 0.5) score += 8;
  if (documentProgressRatio(contact, "bank") >= 0.4) score += 6;
  if (timelineProgressRatio(contact) >= 0.35) score += 6;
  if (["À préparer", "Prêt à basculer", "RDV planifié", "Client Hunb'up"].includes(contact.gvhStatus) || normalizeText(contact.gvhStatus) === ["pret", "a", "basculer"].join(" ")) score += 8;
  return Math.min(100, score);
}
function scoreTier(score) {
  if (score >= 70) return "score-good";
  if (score >= 40) return "score-mid";
  return "score-low";
}

function clientScoreBreakdown(contact) {
  ensureContactDefaults(contact);
  return [
    [["Envoyé", "Payé", "Réalisé"].includes(contact.auditStatus), "Audit envoyé", 12],
    [["Payé", "Réalisé"].includes(contact.auditStatus), "Audit payé", 12],
    [contact.apport > 0, "Apport renseigné", 10],
    [contact.capacite > 0, "Capacité bancaire renseignée", 10],
    [contact.search && contact.search !== "À définir", "Projet défini", 8],
    [contact.target && contact.target !== "Cible à définir", "Cible définie", 8],
    [contact.sector && !["À définir", "Secteur ?"].includes(contact.sector), "Secteur défini", 6],
    [contact.mandateStatus === "Signé", "Mandat signé", 12],
    [documentProgressRatio(contact, "audit") >= 0.5, "Pièces audit au moins 50%", 8],
    [documentProgressRatio(contact, "bank") >= 0.4, "Pièces banque au moins 40%", 6],
    [timelineProgressRatio(contact) >= 0.35, "Planning au moins 35%", 6],
    [["À préparer", "Prêt à basculer", "RDV planifié", "Client Hunb'up"].includes(contact.gvhStatus) || normalizeText(contact.gvhStatus) === ["pret", "a", "basculer"].join(" "), "Prêt Hunb'up", 8]
  ].map(([met, label, points]) => ({ met, label, points }));
}

function clientScoreTooltip(contact) {
  return clientScoreBreakdown(contact)
    .map(({ met, label, points }) => (met ? "OK  " : "--  ") + label + " (" + points + " pts)")
    .join(String.fromCharCode(10));
}

function detectBlockers(contact) {
  const blockers = [];
  if (["À faire", "A faire"].includes(contact.auditStatus)) blockers.push("Audit 3k à vendre ou à envoyer.");
  if (documentProgressRatio(contact, "audit") < 0.5) blockers.push("Pieces audit insuffisantes.");
  if (contact.mandateStatus === "Signé" && documentProgressRatio(contact, "bank") < 0.45) blockers.push("Dossier bancaire incomplet.");
  if (["Banque", "Notaire"].includes(contact.status) && documentProgressRatio(contact, "notary") < 0.35) blockers.push("Documents notaire à sécuriser.");
  if (["Travaux", "Ameublement"].includes(contact.status) && documentProgressRatio(contact, "works") < 0.35) blockers.push("Travaux / meublé à cadrer.");
  if (contact.status === "Location" && contact.gvhStatus === "Pas encore") blockers.push("Bascule Hunb'up à préparer après mise en location.");
  return blockers;
}

function ensureContactDefaults(contact) {
  const defaults = {
    firstName: "",
    lastName: "",
    email: document.querySelector("#analysisClientEmail")?.value || "",
    phone: document.querySelector("#analysisClientPhone")?.value || "",
    source: "",
    patrimoine: "À auditer",
    auditStatus: "À faire",
    auditFee: 3000,
    mandateStatus: "Non signé",
    gvhStatus: "Pas encore",
    priority: "Normale",
    owner: "Gabriel Valette",
    createdAt: new Date().toISOString().slice(0, 10),
    company: "",
    signatureDate: "",
    auditPaidDate: "",
    auditPaidYear: "",
    worksBudget: 0,
    bankStatus: "À cadrer",
    notaryStatus: "Non démarré",
    acquisitionDate: "",
    firstTenantDate: "",
    gvhRisk: "À définir",
    gvhEnvelope: "",
    gvhAmount: 0,
    cgpStatus: "À qualifier",
    cgpMission: "Bilan patrimonial",
    cgpObjectives: "",
    cgpHorizon: "À définir",
    cgpExperience: "À qualifier",
    cgpFamilyStatus: "",
    cgpTaxResidence: "France",
    cgpTmi: 0,
    cgpPpe: "Non vérifié",
    cgpUsPerson: "Non vérifié",
    cgpCompliance: "À compléter",
    docChecks: {},
    timelineChecks: {},
    archivedAt: "",
    projects: [],
    apport: 0,
    capacite: 0,
    budget: 0,
    notes: "",
    next: "À planifier"
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (contact[key] === undefined || contact[key] === null) contact[key] = value;
  });
  if (!contact.lastName && contact.name && !contact.firstName) contact.lastName = contact.name;
  if (!contact.projects.length) contact.projects = knownProjectsForContact(contact.name).map(createProject);
  return contact;
}

function renderPipeline() {
  const stages = getStages();
  document.querySelector("#kanban").innerHTML = stages
    .map((stage) => {
      const deals = activeDeals().filter((deal) => deal.stage === stage).filter(matchesSearch);
      return `
        <section class="kanban-column" data-stage="${stage}">
          <h2>${stage}</h2>
          ${stage === "Analyse de projet" ? '<p class="column-note">Travaux à chiffrer si nécessaire.</p>' : ""}
          ${deals.map(dealTemplate).join("") || emptyState("Rien ici pour le moment.")}
        </section>
      `;
    })
    .join("");
}

function dealTemplate(deal) {
  ensureDealDefaults(deal);
  const checks = deal.checks || [];
  const stages = getStages();
  const index = stages.indexOf(deal.stage);
  const linkedContact = findLinkedContactForDeal(deal);
  return `
    <article class="deal-card" data-deal-id="${deal.id}" draggable="true">
      <strong>${deal.title}</strong>
      <p>${linkedContact ? htmlEscape(linkedContact.name) : htmlEscape(deal.contact)}</p>
      <div class="deal-checklist">
        ${checks.map((check, index) => `<span class="deal-check ${index === 0 ? "done" : ""}"><span class="deal-dot"></span>${check}</span>`).join("")}
      </div>
      <div class="deal-footer">
        <span>${formatMoney(deal.value)}</span>
        <span class="status">${deal.due}</span>
      </div>
      <div class="deal-actions">
        ${linkedContact ? `<button class="ghost-button" type="button" data-open-linked-contact="${linkedContact.id}">Client</button>` : ""}
        <button class="ghost-button" type="button" data-move-deal="${deal.id}" data-direction="-1" ${index <= 0 ? "disabled" : ""}>Precedent</button>
        <button class="ghost-button" type="button" data-move-deal="${deal.id}" data-direction="1" ${index >= stages.length - 1 ? "disabled" : ""}>Suivant</button>
        <button class="ghost-button" type="button" data-exit-deal="${deal.id}">Sortir</button>
      </div>
    </article>
  `;
}

function moveDeal(dealId, direction) {
  const deal = state.deals.find((item) => item.id === dealId);
  if (!deal) return;
  const stages = getStages();
  const index = stages.indexOf(deal.stage);
  const nextIndex = Math.min(stages.length - 1, Math.max(0, index + Number(direction)));
  setDealStage(dealId, stages[nextIndex]);
}

function setDealStage(dealId, stage) {
  const deal = state.deals.find((item) => item.id === dealId);
  if (!deal || !getStages().includes(stage)) return;
  deal.stage = stage;
  const linkedContact = findLinkedContactForDeal(deal);
  if (linkedContact) linkedContact.status = stage;
  saveState();
  render();
  showToast(`Dossier deplace vers ${stage}.`);
}

function exitDeal(dealId) {
  const deal = state.deals.find((item) => item.id === dealId);
  if (!deal) return;
  deal.archivedAt = new Date().toISOString();
  if (deal.contactId && deal.projectId) {
    const contact = state.contacts.find((item) => item.id === deal.contactId);
    const project = contact?.projects?.find((item) => item.id === deal.projectId);
    if (project) project.archivedAt = deal.archivedAt;
  }
  saveState();
  render();
  showToast("Opération sortie du pipe. La fiche client reste disponible.");
}

function archiveRevenueDeal(dealId) {
  const deal = state.deals.find((item) => item.id === dealId);
  if (!deal) return;
  deal.archivedAt = new Date().toISOString();
  if (deal.contactId && deal.projectId) {
    const contact = state.contacts.find((item) => item.id === deal.contactId);
    const project = contact?.projects?.find((item) => item.id === deal.projectId);
    if (project) project.archivedAt = deal.archivedAt;
  }
  const modal = document.querySelector("#revenueForecastModal");
  if (modal?.open) modal.close();
  saveState();
  render();
  openRevenueForecastModal();
  showToast("Ligne sortie du CA.");
}

function renderGantt() {
  const board = document.querySelector("#ganttBoard");
  const preview = document.querySelector("#dashboardGantt");
  if (!board && !preview) return;
  const stages = getStages();
  const deals = activeDeals().slice(0, board ? activeDeals().length : 5);
  const rows = deals
    .map((deal) => {
      const stageIndex = Math.max(0, stages.indexOf(deal.stage));
      const progress = Math.round(((stageIndex + 1) / stages.length) * 100);
      const linkedContact = findLinkedContactForDeal(deal);
      const nextTask = state.tasks.find((task) => !task.done && normalizeText(task.title + " " + task.detail).includes(normalizeText((linkedContact?.name || deal.title).split(" ")[0])));
      return `
        <article class="gantt-row">
          <div class="gantt-meta">
            <strong>${htmlEscape(deal.title)}</strong>
            <span>${htmlEscape(deal.stage)} · ${htmlEscape(formatDueLabel(nextTask?.due || deal.due || "À planifier"))}</span>
          </div>
          <div class="gantt-track" style="--gantt-progress:${progress}%">
            <span></span>
          </div>
          <button class="ghost-button" ${linkedContact ? `data-open-linked-contact="${linkedContact.id}"` : 'data-action-hub="pipeline"'} type="button">
            ${linkedContact ? "Fiche" : "Pipeline"}
          </button>
        </article>
      `;
    })
    .join("") || emptyState("Aucun dossier à planifier.");
  if (board) board.innerHTML = rows;
  if (preview) preview.innerHTML = rows;
}

function findLinkedContactForDeal(deal) {
  const linkedById = deal.contactId ? state.contacts.find((contact) => contact.id === deal.contactId) : null;
  const canonicalName = canonicalRevenueClientName(`${linkedById?.name || ""} ${deal.title || ""} ${deal.contact || ""}`);
  if (canonicalName) {
    const canonicalContact = state.contacts.find((contact) => !isContactArchived(contact) && canonicalRevenueClientName(contact.name) === canonicalName) ||
      state.contacts.find((contact) => canonicalRevenueClientName(contact.name) === canonicalName);
    if (canonicalContact) return canonicalContact;
  }
  if (linkedById) return linkedById;
  const normalizedTitle = normalizeText(deal.title);
  return state.contacts.find((contact) => {
    const normalizedName = normalizeText(contact.name);
    return normalizedTitle.includes(normalizedName) || normalizedName.includes(normalizedTitle.split(" ")[0]);
  });
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function canonicalRevenueClientName(value) {
  const normalized = normalizeText(value);
  if (!normalized) return "";
  const hasPaulineAdrien = normalized.includes("pauline et adrien") || (normalized.includes("pauline") && normalized.includes("adrien")) || normalized.includes("glaize") || normalized.includes("cardonna");
  if (hasPaulineAdrien) return "Pauline GLAIZE & Adrien CARDONNA";
  const hasCamilleDorian = (normalized.includes("camille") && normalized.includes("dorian")) || normalized.includes("cavalier") || normalized.includes("declerck");
  if (hasCamilleDorian) return "Camille (MPI) et Dorian";
  return "";
}

function getStages() {
  return ["Audit patrimonial", "Sourcing", "Analyse de projet", "Banque", "Notaire", "Acquisition", "Travaux", "Ameublement", "Location", "Bascule Hunb'up"];
}

function buildContactDisplayName(firstName, lastName, fallback = "") {
  return [firstName, lastName].map((part) => String(part || "").trim()).filter(Boolean).join(" ") || String(fallback || "").trim();
}

function revenueCategoryOptions() {
  return [
    "Mandat / clé en main",
    "Audit",
    "Coaching",
    "Honoraires travaux",
    "Formation",
    "Mission spéciale / AMO stratégique",
    "Solde mandat",
    "Autre"
  ];
}

function paymentStatusOptions() {
  return ["Non payé", "Partiellement payé", "Payé"];
}

function normalizePaymentStatus(value, fallbackStatus = "") {
  const normalized = normalizeText(value);
  if (normalized.includes("non paye") || normalized === "non") return "Non payé";
  if (normalized.includes("partiel")) return "Partiellement payé";
  if (normalized.includes("paye") || normalized.includes("realise") || normalized.includes("encaisse") || normalized.includes("regle")) return "Payé";
  if (value) return value;
  const fallback = normalizeText(fallbackStatus);
  if (fallback.includes("non paye") || fallback === "non") return "Non payé";
  return fallback.includes("paye") || fallback.includes("realise") || fallback.includes("encaisse") || fallback.includes("regle") ? "Payé" : "Non payé";
}

function knownProjectsForContact(name) {
  const normalized = normalizeText(name);
  const templates = {
    "jonathan cohen": [
      { city: "Remoulins", source: "Hunb'up", revenueYear: "2026", revenueDate: "2026-06-15", acquisitionPrice: 165000, mandateFeeTtc: 11550, mandateFeeHt: 9625, works: 65000, worksFeeTtc: 1550, worksFeeHt: 1291.67, auditFeeTtc: 0, auditFeeHt: 0, furniture: 6000 },
      { city: "Graulhet", source: "Hunb'up", revenueYear: "2026", revenueDate: "2026-06-15", acquisitionPrice: 199000, mandateFeeTtc: 12000, mandateFeeHt: 10000, works: 47679, worksFeeTtc: 0, worksFeeHt: 0, auditFeeTtc: 0, auditFeeHt: 0, furniture: 0 }
    ],
    "pauline et adrien": [
      { city: "Agde", source: "LM", revenueYear: "2026", acquisitionPrice: 238000, mandateFeeTtc: 16600, mandateFeeHt: 11383.33, works: 15000, worksFeeTtc: 1050, worksFeeHt: 875, auditFeeTtc: 0, auditFeeHt: 0, furniture: 0 },
      { city: "Béziers", source: "LM", revenueYear: "2026", acquisitionPrice: 200000, mandateFeeTtc: 14000, mandateFeeHt: 11666.67, works: 50000, worksFeeTtc: 3500, worksFeeHt: 2916.67, auditFeeTtc: 0, auditFeeHt: 0, furniture: 0 }
    ],
    "benoit fouquet": [
      { city: "Murviel", source: "LM", revenueYear: "2026", acquisitionPrice: 100000, mandateFeeTtc: 7000, mandateFeeHt: 3333.33, works: 18000, worksFeeTtc: 0, worksFeeHt: 0, auditFeeTtc: 0, auditFeeHt: 0, furniture: 0 }
    ],
    "camille mpi et dorian": [
      { city: "Projet à réussir", source: "LM", revenueYear: "2026", acquisitionPrice: 220000, mandateFeeTtc: 15400, mandateFeeHt: 10333.33, works: 10000, worksFeeTtc: 700, worksFeeHt: 583.33, auditFeeTtc: 0, auditFeeHt: 0, furniture: 0 }
    ],
    "clement fenouillet": [
      { city: "Solde mandat", source: "LM", revenueYear: "2026", revenueDate: "2026-01-15", acquisitionPrice: 0, mandateRate: 0, mandateFeeTtc: 2880, mandateFeeHt: 2400, works: 0, worksRate: 0, worksFeeTtc: 0, worksFeeHt: 0, auditFeeTtc: 0, auditFeeHt: 0, furniture: 0, status: "Solde à encaisser", countsAsOperation: false }
    ]
  };
  return templates[normalized] || [];
}

function createProject(data = {}) {
  const acquisitionPrice = Number(data.acquisitionPrice || 0);
  const works = Number(data.works || 0);
  const mandateRate = data.mandateRate !== undefined ? Number(data.mandateRate || 0) : 7;
  const worksRate = data.worksRate !== undefined ? Number(data.worksRate || 0) : 7;
  const mandateFeeTtc = data.mandateFeeTtc !== undefined ? Number(data.mandateFeeTtc || 0) : Number(acquisitionPrice ? acquisitionPrice * (mandateRate / 100) : 0);
  const worksFeeTtc = data.worksFeeTtc !== undefined ? Number(data.worksFeeTtc || 0) : Number(works ? works * (worksRate / 100) : 0);
  const auditFeeTtc = data.auditFeeTtc !== undefined ? Number(data.auditFeeTtc || 0) : 0;
  return {
    id: data.id || crypto.randomUUID(),
    source: data.source || "CJ",
    city: data.city || data.name || "Projet",
    revenueCategory: data.revenueCategory || (data.countsAsOperation === false && normalizeText(data.city || data.name) === "solde mandat" ? "Solde mandat" : "Mandat / clé en main"),
    missionType: data.missionType || "",
    comment: data.comment || "",
    revenueYear: String(data.revenueYear || yearFromDate(data.revenueDate) || selectedRevenueYear),
    revenueDate: data.revenueDate || "",
    paymentStatus: normalizePaymentStatus(data.paymentStatus, data.status),
    acquisitionPrice,
    mandateRate,
    mandateFeeTtc,
    mandateFeeHt: data.mandateFeeHt !== undefined ? Number(data.mandateFeeHt || 0) : Math.round((mandateFeeTtc / 1.2) * 100) / 100,
    works,
    worksRate,
    worksFeeTtc,
    worksFeeHt: data.worksFeeHt !== undefined ? Number(data.worksFeeHt || 0) : Math.round((worksFeeTtc / 1.2) * 100) / 100,
    auditFeeTtc,
    auditFeeHt: data.auditFeeHt !== undefined ? Number(data.auditFeeHt || 0) : Math.round((auditFeeTtc / 1.2) * 100) / 100,
    furniture: Number(data.furniture || 0),
    status: data.status || "En cours",
    countsAsOperation: data.countsAsOperation !== false && normalizeText(data.city || data.name) !== "solde mandat",
    archivedAt: data.archivedAt || ""
  };
}

function ensureProjectDefaults(project) {
  return Object.assign(project, createProject(project));
}

function projectTotalHt(project) {
  ensureProjectDefaults(project);
  return Number(project.mandateFeeHt || 0) + Number(project.worksFeeHt || 0) + Number(project.auditFeeHt || 0);
}

function isAuditRevenueRecognized(contact) {
  return ["Payé", "Réalisé", "Paye", "Realise"].includes(contact.auditStatus);
}

function auditRevenueYear(contact) {
  return String(yearFromDate(contact.auditPaidDate) || contact.auditPaidYear || yearFromDate(contact.signatureDate) || selectedRevenueYear);
}

function auditRevenueHt(contact, year = selectedRevenueYear) {
  if (!isAuditRevenueRecognized(contact)) return 0;
  return auditRevenueYear(contact) === String(year) ? Number(contact.auditFee || 0) / 1.2 : 0;
}

function projectRevenueYear(project) {
  return String(project.revenueYear || yearFromDate(project.revenueDate) || selectedRevenueYear);
}

function dealRevenueYear(deal) {
  return String(deal.revenueYear || yearFromDate(deal.revenueDate) || "");
}

function isDealInSelectedRevenueYear(deal) {
  return dealRevenueYear(deal) === String(selectedRevenueYear);
}

function activeProjects(contact) {
  return (contact.projects || []).map(ensureProjectDefaults).filter((project) => !project.archivedAt);
}

function activeProjectsFromContact(contact) {
  return (contact.projects || []).map(ensureProjectDefaults).filter((project) => !project.archivedAt);
}

function isContactArchived(contact) {
  return Boolean(contact.archivedAt || contact.status === "Archivé");
}

function activeContacts() {
  return state.contacts.map(ensureContactDefaults).filter((contact) => !isContactArchived(contact));
}

function ensureDealDefaults(deal) {
  const defaults = {
    contactId: "",
    archivedAt: "",
    revenueYear: "",
    revenueDate: "",
    due: "À planifier",
    checks: []
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (deal[key] === undefined || deal[key] === null) deal[key] = value;
  });
  return deal;
}

function isDealActive(deal) {
  ensureDealDefaults(deal);
  if (deal.archivedAt) return false;
  const linkedContact = findLinkedContactForDeal(deal);
  return !linkedContact || !isContactArchived(ensureContactDefaults(linkedContact));
}

function activeDeals() {
  state.contacts.map(ensureContactDefaults).forEach(syncContactProjectDeals);
  return state.deals.map(ensureDealDefaults).filter(isDealActive).filter(isDealInSelectedRevenueYear);
}

function ensureTaskDefaults(task) {
  const defaults = {
    clientId: "",
    type: "Relance",
    priority: "Normale",
    due: "Aujourd'hui",
    recurrenceDays: 0,
    done: false,
    createdAt: new Date().toISOString().slice(0, 10)
  };
  Object.entries(defaults).forEach(([key, value]) => {
    if (task[key] === undefined || task[key] === null) task[key] = value;
  });
  return task;
}

function findTaskClient(task) {
  ensureTaskDefaults(task);
  if (task.clientId) return state.contacts.find((contact) => contact.id === task.clientId);
  const haystack = normalizeText(`${task.title || ""} ${task.detail || ""}`);
  return activeContacts().find((contact) => {
    const firstToken = normalizeText(contact.name).split(" ")[0];
    return firstToken && haystack.includes(firstToken);
  });
}

const clientFieldGroups = {
  summary: [
    ["lastName", "Nom", "text"],
    ["firstName", "Prénom", "text"],
    ["email", "E-mail", "email"],
    ["phone", "Téléphone", "tel"],
    ["source", "Source", "text"],
    ["owner", "Responsable", "select", ["Gabriel Valette", "Anais Vergnon Valette", "LaMinière", "Hunb'up", "Partenaire"]],
    ["priority", "Priorité", "select", ["Basse", "Normale", "Moyenne", "Haute"]],
    ["createdAt", "Date création", "date"],
    ["next", "Prochaine action", "text", null, "full"]
  ],
  audit: [
    ["auditStatus", "Statut audit", "select", ["À faire", "Envoyé", "Payé", "Réalisé", "Non applicable"]],
    ["auditFee", "Audit TTC", "number"],
    ["auditPaidDate", "Date paiement audit", "date"],
    ["patrimoine", "Lecture patrimoniale", "text", null, "full"],
    ["apport", "Apport disponible", "number"],
    ["capacite", "Capacité bancaire", "number"],
    ["regime", "Regime envisage", "select", ["À définir", "Nu", "Meuble probable", "LMNP", "LMP", "SCI", "Autre"]],
    ["search", "Projet client", "text", null, "full"],
    ["target", "Cible recherchee", "text"],
    ["sector", "Secteur", "text"]
  ],
  coaching: [
    ["type", "Segment", "select", ["Prospect", "Qualifié", "Client", "Coaching", "Partenaire", "Client Hunb'up"]],
    ["status", "Statut coaching", "select", ["Coaching immobilier", "Analyse de projet", "Réalisé", "Archivé"]],
    ["search", "Mission", "text", null, "full"],
    ["sector", "Ville / secteur", "text"],
    ["next", "Suivi / prochaine action", "text", null, "full"],
    ["notes", "Notes coaching", "text", null, "full"]
  ],
  mandate: [
    ["mandateStatus", "Mandat de recherche", "select", ["Non signé", "À proposer", "Envoyé", "Signé", "Coaching"]],
    ["signatureDate", "Signature prevue / signee", "date"],
    ["worksBudget", "Budget travaux estime", "number"],
    ["bankStatus", "Dossier bancaire", "select", ["À cadrer", "Pré-qualification", "Pièces en cours", "Envoyé banque", "Accord principe", "Offre éditée"]],
    ["notaryStatus", "Notaire / docs", "select", ["Non démarré", "Docs à vérifier", "Compromis à vérifier", "RDV planifié", "Acte signé"]],
    ["acquisitionDate", "Date acquisition", "date"],
    ["firstTenantDate", "Premier locataire", "date"],
    ["status", "Étape opérationnelle", "select", getStages()]
  ],
  gvh: [
    ["gvhStatus", "Statut Hunb'up", "select", ["Pas encore", "À préparer", "Prêt à basculer", "RDV planifié", "Client Hunb'up", "Archivé"]],
    ["cgpStatus", "Statut CGP", "select", ["À qualifier", "DER à envoyer", "DER signé", "Recueil en cours", "DCC à préparer", "Conseil remis", "Suivi annuel"]],
    ["cgpMission", "Mission", "select", ["Bilan patrimonial", "Assurance vie", "PER", "Allocation financière", "Transmission", "Trésorerie", "Suivi annuel"]],
    ["gvhEnvelope", "Enveloppe / solution", "select", ["", "Assurance vie", "PER", "CTO", "Trésorerie", "Allocation globale"]],
    ["gvhAmount", "Montant à placer / suivre", "number"],
    ["gvhRisk", "Profil de risque", "select", ["À définir", "Prudent", "Équilibré", "Dynamique"]],
    ["cgpHorizon", "Horizon", "select", ["À définir", "Court terme", "Moyen terme", "Long terme", "Retraite", "Transmission"]],
    ["cgpExperience", "Connaissance / expérience", "select", ["À qualifier", "Débutant", "Informé", "Averti", "Expert"]],
    ["cgpObjectives", "Objectifs patrimoniaux", "text", null, "full"],
    ["cgpFamilyStatus", "Situation familiale / régime", "text"],
    ["cgpTaxResidence", "Résidence fiscale", "text"],
    ["cgpTmi", "TMI estimée (%)", "number"],
    ["cgpPpe", "PPE", "select", ["Non vérifié", "Non", "Oui", "Lien PPE"]],
    ["cgpUsPerson", "US Person", "select", ["Non vérifié", "Non", "Oui"]],
    ["cgpCompliance", "Conformité", "select", ["À compléter", "Complet", "À mettre à jour", "Bloquant"]],
    ["company", "Entreprise / contexte pro", "text"],
    ["last", "Dernier contact", "text"],
    ["type", "Segment", "select", ["Prospect", "Qualifié", "Client", "Partenaire", "Client Hunb'up"]]
  ]
};

function fieldTemplate([name, label, type, options, width], contact) {
  const value = contact[name] ?? "";
  if (type === "select") {
    return `
      <label class="field ${width || ""}">
        <span>${label}</span>
        <select name="${name}">
          ${options.map((option) => `<option value="${option}" ${String(value) === option ? "selected" : ""}>${option || "À définir"}</option>`).join("")}
        </select>
      </label>
    `;
  }

  return `
    <label class="field ${width || ""}">
      <span>${label}</span>
      <input name="${name}" type="${type}" value="${String(value).replaceAll('"', "&quot;")}" />
    </label>
  `;
}

function openContactDrawer(contactId) {
  const found = state.contacts.find((item) => item.id === contactId);
  if (!found) return;
  const contact = ensureContactDefaults(found);
  activeContactId = contactId;
  document.querySelector("#drawerName").textContent = contact.name;
  document.querySelector("#drawerEyebrow").textContent = `${contact.status} · ${contact.source || "source à renseigner"}`;
  document.querySelector("#archiveContact").textContent = isContactArchived(contact) ? "Restaurer" : "Archiver";
  Object.entries(clientFieldGroups).forEach(([group, fields]) => {
    const target = document.querySelector(`#${group}Fields`);
    if (target) target.innerHTML = fields.map((field) => fieldTemplate(field, contact)).join("");
  });
  renderMandateProjects(contact);
  renderCoachingProjects(contact);
  const mandateProjects = document.querySelector("#mandateProjects");
  if (mandateProjects) mandateProjects.dataset.auditHt = String(auditRevenueHt(contact, selectedRevenueYear));
  renderClientTimeline(contact);
  renderDocumentChecklists(contact);
  renderEmailTemplates(contact);
  document.querySelector("#clientNotes").value = contact.notes || "";
  document.querySelector("#clientDrawer").classList.add("open");
  document.querySelector("#clientDrawer").setAttribute("aria-hidden", "false");
  renderIcons();
}

function renderMandateProjects(contact) {
  const target = document.querySelector("#mandateProjects");
  if (!target) return;
  const projects = activeProjects(contact);
  const auditHt = auditRevenueHt(contact, selectedRevenueYear);
  const projectsTotal = projects
    .filter((project) => projectRevenueYear(project) === String(selectedRevenueYear))
    .reduce((sum, project) => sum + projectTotalHt(project), 0);
  const total = auditHt + projectsTotal;
  target.dataset.auditHt = String(auditHt);
  target.innerHTML = `
    <div class="project-header">
      <div>
        <p class="eyebrow">Projets CJ</p>
        <h3>Audit + mandat</h3>
        <span class="client-mini">${auditHt ? `Audit reconnu ${selectedRevenueYear}: ${formatExactMoney(auditHt)} HT` : `Audit non comptabilisé sur ${selectedRevenueYear}.`}</span>
      </div>
      <strong id="mandateProjectsTotal">${formatExactMoney(total)} HT</strong>
    </div>
    <div class="project-list">
      ${projects.map((project) => projectTemplate(project)).join("") || emptyState("Aucun projet rattaché au mandat.")}
    </div>
    <button class="ghost-button" id="addMandateProject" type="button">Ajouter projet</button>
  `;
}

function renderCoachingProjects(contact) {
  const target = document.querySelector("#coachingProjects");
  if (!target) return;
  const projects = activeProjects(contact).filter((project) => project.revenueCategory === "Coaching" || normalizeText(project.source).includes("coaching") || normalizeText(project.city).includes("coaching"));
  const total = projects
    .filter((project) => projectRevenueYear(project) === String(selectedRevenueYear))
    .reduce((sum, project) => sum + projectTotalHt(project), 0);
  target.innerHTML = `
    <div class="project-header">
      <div>
        <p class="eyebrow">Coaching immobilier</p>
        <h3>Analyse de biens / coaching ponctuel</h3>
        <span class="client-mini">Rubrique séparée des prospects, audits et mandats.</span>
      </div>
      <strong id="coachingProjectsTotal">${formatExactMoney(total)} HT</strong>
    </div>
    <div class="project-list">
      ${projects.map((project) => coachingProjectTemplate(project)).join("") || emptyState("Aucun coaching rattaché à cette fiche.")}
    </div>
    <button class="ghost-button" id="addCoachingProject" type="button">Ajouter un coaching</button>
  `;
}

function coachingProjectTemplate(project) {
  ensureProjectDefaults(project);
  const fields = [
    ["city", "Mission / ville", "text"],
    ["revenueYear", "Année CA", "number"],
    ["paymentStatus", "Paiement", "select", paymentStatusOptions()],
    ["mandateFeeTtc", "Prix TTC vu client", "number"],
    ["mandateFeeHt", "Prix HT CA", "number"],
    ["status", "Statut", "select", ["En cours", "Réalisé / encaissé", "Facturé", "À facturer"]],
    ["comment", "Commentaire", "text"]
  ];
  return `
    <article class="project-row" data-project-id="${project.id}">
      <div class="project-row-head">
        <strong>${htmlEscape(project.city || "Coaching")}</strong>
        <span class="score-pill" data-project-total>${formatExactMoney(projectTotalHt(project))}</span>
      </div>
      <input data-project-field="source" type="hidden" value="Coaching" />
      <input data-project-field="revenueCategory" type="hidden" value="Coaching" />
      <input data-project-field="missionType" type="hidden" value="Coaching immobilier" />
      <input data-project-field="acquisitionPrice" type="hidden" value="0" />
      <input data-project-field="mandateRate" type="hidden" value="0" />
      <input data-project-field="works" type="hidden" value="0" />
      <input data-project-field="worksRate" type="hidden" value="0" />
      <input data-project-field="worksFeeTtc" type="hidden" value="0" />
      <input data-project-field="worksFeeHt" type="hidden" value="0" />
      <input data-project-field="auditFeeTtc" type="hidden" value="0" />
      <input data-project-field="auditFeeHt" type="hidden" value="0" />
      <input data-project-field="furniture" type="hidden" value="0" />
      <div class="project-grid">
        ${fields
          .map(
            ([name, label, type, options = []]) => `
              <label class="field">
                <span>${label}</span>
                ${
                  type === "select"
                    ? `<select data-project-field="${name}">${options.map((option) => `<option value="${option}" ${String(project[name] || "") === option ? "selected" : ""}>${option}</option>`).join("")}</select>`
                    : `<input data-project-field="${name}" type="${type}" value="${String(project[name] ?? "").replaceAll('"', "&quot;")}" />`
                }
              </label>
            `
          )
          .join("")}
      </div>
      <button class="ghost-button table-action" data-remove-project="${project.id}" type="button">Sortir le coaching</button>
    </article>
  `;
}

function projectTemplate(project) {
  ensureProjectDefaults(project);
  const fields = [
    ["source", "Origine", "text"],
    ["revenueCategory", "Catégorie revenu", "select", revenueCategoryOptions()],
    ["missionType", "Type mission", "text"],
    ["city", "Projet / ville", "text"],
    ["revenueYear", "Année CA", "number"],
    ["paymentStatus", "Paiement", "select", paymentStatusOptions()],
    ["acquisitionPrice", "Prix acquisition", "number"],
    ["mandateRate", "% mandat", "number"],
    ["mandateFeeTtc", "Hono TTC", "number"],
    ["mandateFeeHt", "Hono HT", "number"],
    ["works", "Travaux", "number"],
    ["worksRate", "% travaux", "number"],
    ["worksFeeTtc", "Hono travaux TTC", "number"],
    ["worksFeeHt", "Hono travaux HT", "number"],
    ["auditFeeTtc", "Audit TTC", "number"],
    ["auditFeeHt", "Audit HT", "number"],
    ["furniture", "Meubles", "number"],
    ["comment", "Commentaire", "text"]
  ];
  return `
    <article class="project-row" data-project-id="${project.id}">
      <div class="project-row-head">
        <strong>${htmlEscape(project.city || "Projet")}</strong>
        <span class="score-pill" data-project-total>${formatExactMoney(projectTotalHt(project))}</span>
      </div>
      <div class="project-grid">
        ${fields
          .map(
            ([name, label, type, options = []]) => `
              <label class="field">
                <span>${label}</span>
                ${
                  type === "select"
                    ? `<select data-project-field="${name}">${options.map((option) => `<option value="${option}" ${String(project[name] || "") === option ? "selected" : ""}>${option}</option>`).join("")}</select>`
                    : `<input data-project-field="${name}" type="${type}" value="${String(project[name] ?? "").replaceAll('"', "&quot;")}" />`
                }
              </label>
            `
          )
          .join("")}
      </div>
      <button class="ghost-button table-action" data-remove-project="${project.id}" type="button">Sortir le projet</button>
    </article>
  `;
}

function missingDocuments(contact, groupKey) {
  const checked = new Set(contact.docChecks?.[groupKey] || []);
  return (documentGroups[groupKey]?.items || []).filter(([id]) => !checked.has(id)).map(([, title]) => title);
}

function buildEmailTemplates(contact) {
  const firstName = contact.name.split(" ")[0] || contact.name;
  const auditMissing = missingDocuments(contact, "audit");
  const bankMissing = missingDocuments(contact, "bank");
  const notaryMissing = missingDocuments(contact, "notary");
  const gvhMissing = missingDocuments(contact, "gvh");

  return [
    {
      id: "audit",
      title: "Demande pieces audit",
      body: `Bonjour ${firstName},\n\nPour avancer sur votre audit patrimonial LaMinière, pouvez-vous nous transmettre les éléments suivants :\n\n${auditMissing.map((item) => `- ${item}`).join("\n") || "- Tout est complet à ce stade."}\n\nL'objectif est de valider votre capacité, votre stratégie et le type d'opération ancien le plus cohérent.\n\nBonne journée,\nLaMinière`
    },
    {
      id: "bank",
      title: "Relance dossier bancaire",
      body: `Bonjour ${firstName},\n\nPour constituer ou compléter le dossier bancaire de votre opération, il nous manque encore :\n\n${bankMissing.map((item) => `- ${item}`).join("\n") || "- Le dossier bancaire semble complet à ce stade."}\n\nDès réception, nous pourrons sécuriser la suite avec la banque ou le courtier.\n\nBonne journée,\nLaMinière`
    },
    {
      id: "notary",
      title: "Point notaire",
      body: `Bonjour ${firstName},\n\nPour sécuriser la partie notaire et les documents de l'opération, voici les points à compléter ou vérifier :\n\n${notaryMissing.map((item) => `- ${item}`).join("\n") || "- Les points notaire sont complets à ce stade."}\n\nNous gardons l'objectif de fluidifier le compromis, l'acte et les délais.\n\nBonne journée,\nLaMinière`
    },
    {
      id: "gvh",
      title: "Préparation bascule Hunb'up",
      body: `Bonjour ${firstName},\n\nVotre projet immobilier avance, nous pouvons commencer à préparer la partie Hunb'up pour organiser la suite patrimoniale et financière.\n\nÉléments à prévoir :\n${gvhMissing.map((item) => `- ${item}`).join("\n") || "- Le socle Hunb'up est complet à ce stade."}\n\nL'objectif sera de structurer votre enveloppe, votre allocation et le suivi dans la durée.\n\nBonne journée,\nHunb'up`
    }
  ];
}

function renderEmailTemplates(contact) {
  const target = document.querySelector("#emailTemplates");
  if (!target) return;
  target.innerHTML = buildEmailTemplates(contact)
    .map(
      (template) => `
        <article class="email-card">
          <div class="email-card-header">
            <h3>${template.title}</h3>
            <button class="ghost-button" type="button" data-copy-email="${template.id}">Copier</button>
          </div>
          <pre class="email-body">${template.body}</pre>
        </article>
      `
    )
    .join("");
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

async function copyEmailTemplate(templateId) {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  const template = buildEmailTemplates(ensureContactDefaults(contact)).find((item) => item.id === templateId);
  if (!template) return;
  await copyText(template.body);
  showToast("Email copie dans le presse-papier.");
}

function renderClientTimeline(contact) {
  const target = document.querySelector("#clientTimeline");
  if (!target) return;
  const checks = contact.timelineChecks || {};
  target.innerHTML = acquisitionTimeline
    .map(
      (month) => `
        <section class="timeline-month">
          <div class="timeline-label">${month.month}</div>
          <div class="timeline-items">
            ${month.items
              .map(
                ([id, title, help]) => `
                  <label class="timeline-item">
                    <input type="checkbox" data-timeline-id="${id}" ${checks[id] ? "checked" : ""} />
                    <span><strong>${title}</strong>${help}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
}

function renderDocumentChecklists(contact) {
  Object.entries(documentGroups).forEach(([groupKey, group]) => {
    const target = document.querySelector(`#${group.target}`);
    if (!target) return;
    const checked = new Set(contact.docChecks?.[groupKey] || []);
    const done = group.items.filter(([id]) => checked.has(id)).length;
    target.innerHTML = `
      <section class="doc-card">
        <div class="doc-card-header">
          <h3>${group.title}</h3>
          <span class="doc-progress">${done}/${group.items.length} recus</span>
        </div>
        <div class="doc-list">
          ${group.items
            .map(
              ([id, title, help]) => `
                <label class="doc-item">
                  <input type="checkbox" data-doc-group="${groupKey}" data-doc-id="${id}" ${checked.has(id) ? "checked" : ""} />
                  <span><strong>${title}</strong>${help}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </section>
    `;
  });
}

function toggleClientDocument(group, id, isChecked) {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  ensureContactDefaults(contact);
  const existing = new Set(contact.docChecks[group] || []);
  if (isChecked) existing.add(id);
  else existing.delete(id);
  contact.docChecks[group] = Array.from(existing);
  saveState();
  renderDocumentChecklists(contact);
  renderEmailTemplates(contact);
  renderContacts();
  renderDashboard();
  renderGvh();
}

function toggleClientTimeline(id, isChecked) {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  ensureContactDefaults(contact);
  contact.timelineChecks[id] = isChecked;
  saveState();
  renderClientTimeline(contact);
  renderContacts();
  renderDashboard();
}

function closeContactDrawer() {
  document.querySelector("#clientDrawer").classList.remove("open");
  document.querySelector("#clientDrawer").setAttribute("aria-hidden", "true");
  activeContactId = null;
}

function readProjectInputs(contact) {
  const existing = new Map((contact.projects || []).map((project) => [project.id, project]));
  contact.projects = Array.from(document.querySelectorAll("[data-project-id]")).map((row) => {
    const id = row.dataset.projectId;
    const project = createProject(existing.get(id) || { id });
    row.querySelectorAll("[data-project-field]").forEach((input) => {
      const key = input.dataset.projectField;
      project[key] = input.type === "number" ? Number(input.value || 0) : input.value;
    });
    return createProject(project);
  });
}

function readProjectRow(row) {
  const project = { id: row.dataset.projectId };
  row.querySelectorAll("[data-project-field]").forEach((input) => {
    const key = input.dataset.projectField;
    project[key] = input.type === "number" ? Number(input.value || 0) : input.value;
  });
  return createProject(project);
}

function writeProjectValue(row, key, value) {
  const input = row.querySelector(`[data-project-field="${key}"]`);
  if (input) input.value = Math.round(Number(value || 0) * 100) / 100;
}

function recalculateProjectRow(row, changedKey = "") {
  const project = readProjectRow(row);
  if (["acquisitionPrice", "mandateRate"].includes(changedKey)) {
    project.mandateFeeTtc = project.acquisitionPrice * (project.mandateRate / 100);
    project.mandateFeeHt = project.mandateFeeTtc / 1.2;
    writeProjectValue(row, "mandateFeeTtc", project.mandateFeeTtc);
    writeProjectValue(row, "mandateFeeHt", project.mandateFeeHt);
  }
  if (changedKey === "mandateFeeTtc") {
    project.mandateFeeHt = project.mandateFeeTtc / 1.2;
    writeProjectValue(row, "mandateFeeHt", project.mandateFeeHt);
  }
  if (["works", "worksRate"].includes(changedKey)) {
    project.worksFeeTtc = project.works * (project.worksRate / 100);
    project.worksFeeHt = project.worksFeeTtc / 1.2;
    writeProjectValue(row, "worksFeeTtc", project.worksFeeTtc);
    writeProjectValue(row, "worksFeeHt", project.worksFeeHt);
  }
  if (changedKey === "worksFeeTtc") {
    project.worksFeeHt = project.worksFeeTtc / 1.2;
    writeProjectValue(row, "worksFeeHt", project.worksFeeHt);
  }
  if (changedKey === "auditFeeTtc") {
    project.auditFeeHt = project.auditFeeTtc / 1.2;
    writeProjectValue(row, "auditFeeHt", project.auditFeeHt);
  }
  updateProjectTotals();
}

function updateProjectTotals() {
  const rows = Array.from(document.querySelectorAll("[data-project-id]"));
  let total = Number(document.querySelector("#mandateProjects")?.dataset.auditHt || 0);
  let coachingTotal = 0;
  rows.forEach((row) => {
    const project = readProjectRow(row);
    const rowTotal = projectTotalHt(project);
    if (project.revenueCategory !== "Coaching" && projectRevenueYear(project) === String(selectedRevenueYear)) total += rowTotal;
    if (project.revenueCategory === "Coaching" && projectRevenueYear(project) === String(selectedRevenueYear)) coachingTotal += rowTotal;
    const pill = row.querySelector("[data-project-total]");
    if (pill) pill.textContent = formatExactMoney(rowTotal);
  });
  const totalTarget = document.querySelector("#mandateProjectsTotal");
  if (totalTarget) totalTarget.textContent = `${formatExactMoney(total)} HT`;
  const coachingTarget = document.querySelector("#coachingProjectsTotal");
  if (coachingTarget) coachingTarget.textContent = `${formatExactMoney(coachingTotal)} HT`;
}

function syncContactProjectDeals(contact) {
  ensureContactDefaults(contact);
  const projectIds = new Set(activeProjects(contact).map((project) => project.id));
  state.deals.forEach((deal) => {
    if (deal.contactId === contact.id && deal.projectId && !projectIds.has(deal.projectId)) deal.archivedAt = deal.archivedAt || new Date().toISOString();
  });
  const auditDeals = state.deals.filter((deal) => deal.contactId === contact.id && deal.auditDeal && !deal.archivedAt);
  const auditDeal = auditDeals[0];
  auditDeals.slice(1).forEach((deal) => {
    deal.archivedAt = deal.archivedAt || new Date().toISOString();
  });
  const auditYear = auditRevenueYear(contact);
  const auditValue = isAuditRevenueRecognized(contact) ? Number(contact.auditFee || 0) / 1.2 : 0;
  if (auditValue) {
    const payload = {
      contactId: contact.id,
      auditDeal: true,
      revenueYear: auditYear,
      revenueDate: contact.auditPaidDate || contact.signatureDate || "",
      title: `${contact.name} · Audit 3k`,
      contact: "Audit patrimonial payé",
      value: auditValue,
      stage: contact.status && getStages().includes(contact.status) ? contact.status : "Audit patrimonial",
      due: "Payé",
      checks: ["Audit", "Facturation"],
      archivedAt: ""
    };
    if (auditDeal) Object.assign(auditDeal, payload);
    else state.deals.unshift({ id: crypto.randomUUID(), ...payload });
  } else if (auditDeal) {
    auditDeal.archivedAt = auditDeal.archivedAt || new Date().toISOString();
  }
  activeProjects(contact).forEach((project) => {
    const total = projectTotalHt(project);
    const title = `${contact.name} · ${project.city || "Projet"}`;
    const projectDeals = state.deals.filter((deal) => deal.contactId === contact.id && deal.projectId === project.id && !deal.archivedAt);
    const existing = projectDeals[0];
    projectDeals.slice(1).forEach((deal) => {
      deal.archivedAt = deal.archivedAt || new Date().toISOString();
    });
    const payload = {
      contactId: contact.id,
      projectId: project.id,
      revenueYear: projectRevenueYear(project),
      revenueDate: project.revenueDate || "",
      title,
      contact: `Mandat ${project.source || "CJ"} · ${formatExactMoney(project.acquisitionPrice || 0)}`,
      value: total,
      countsAsOperation: project.countsAsOperation !== false,
      revenueCategory: project.revenueCategory || "Mandat / clé en main",
      missionType: project.missionType || "",
      stage: contact.status && getStages().includes(contact.status) ? contact.status : "Analyse de projet",
      due: project.paymentStatus || project.status || "Non payé",
      checks: ["Mandat", "Financement", "Acte"],
      archivedAt: ""
    };
    if (existing) Object.assign(existing, payload);
    else state.deals.unshift({ id: crypto.randomUUID(), ...payload });
  });
}

function addProjectToActiveContact(project = {}) {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  ensureContactDefaults(contact);
  readProjectInputs(contact);
  contact.projects.push(createProject(project));
  syncContactProjectDeals(contact);
  saveState();
  render();
  openContactDrawer(contact.id);
  setDrawerTab("mandate");
}

function removeProjectFromActiveContact(projectId) {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  ensureContactDefaults(contact);
  readProjectInputs(contact);
  const project = contact.projects.find((item) => item.id === projectId);
  if (project) project.archivedAt = new Date().toISOString();
  syncContactProjectDeals(contact);
  saveState();
  render();
  openContactDrawer(contact.id);
  setDrawerTab("mandate");
  showToast("Projet sorti du pipe.");
}

function toggleContactArchive(contactId) {
  const contact = state.contacts.find((item) => item.id === contactId);
  if (!contact) return;
  ensureContactDefaults(contact);
  if (isContactArchived(contact)) {
    contact.archivedAt = "";
    if (contact.status === "Archivé") contact.status = "Audit patrimonial";
    showToast("Contact restauré.");
  } else {
    contact.archivedAt = new Date().toISOString();
    showToast("Contact archivé. Il reste disponible dans Archivés.");
  }
  saveState();
  render();
  if (activeContactId === contactId) {
    openContactDrawer(contact.id);
  }
}

function archiveActiveContact() {
  if (!activeContactId) return;
  toggleContactArchive(activeContactId);
}

function deleteActiveContact() {
  if (!activeContactId) return;
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  if (!window.confirm(`Supprimer définitivement ${contact.name} ? Cette action ne pourra pas être annulée depuis l'interface.`)) return;
  state.contacts = state.contacts.filter((item) => item.id !== activeContactId);
  state.deals.forEach((deal) => {
    if (deal.contactId === activeContactId) deal.contactId = "";
  });
  closeContactDrawer();
  saveState();
  render();
  showToast("Contact supprimé définitivement.");
}

function contactMergeLabel(contact) {
  ensureContactDefaults(contact);
  const archived = isContactArchived(contact) ? " · archivé" : "";
  return `${contact.name || "Sans nom"} · ${contact.source || "source ?"}${archived}`;
}

function fillMergeContactModal(defaultKeepId = "") {
  const contacts = state.contacts.map(ensureContactDefaults).sort((a, b) => String(a.name || "").localeCompare(String(b.name || ""), "fr"));
  const options = contacts
    .map((contact) => `<option value="${contact.id}">${htmlEscape(contactMergeLabel(contact))}</option>`)
    .join("");
  const keepSelect = document.querySelector("#mergeKeepContact");
  const sourceSelect = document.querySelector("#mergeSourceContact");
  keepSelect.innerHTML = options;
  sourceSelect.innerHTML = options;
  if (defaultKeepId) keepSelect.value = defaultKeepId;
  const firstOther = contacts.find((contact) => contact.id !== keepSelect.value);
  sourceSelect.value = firstOther?.id || "";
}

function openMergeContactModal(defaultKeepId = "") {
  fillMergeContactModal(defaultKeepId);
  document.querySelector("#mergeContactModal").showModal();
}

function mergeContacts(keepId, sourceId) {
  if (!keepId || !sourceId || keepId === sourceId) {
    showToast("Choisis deux contacts différents.");
    return;
  }
  const keep = state.contacts.find((contact) => contact.id === keepId);
  const source = state.contacts.find((contact) => contact.id === sourceId);
  if (!keep || !source) {
    showToast("Contact introuvable.");
    return;
  }
  ensureContactDefaults(keep);
  ensureContactDefaults(source);

  const existingProjectIds = new Set((keep.projects || []).map((project) => project.id));
  const projectIdMap = new Map();
  (source.projects || []).forEach((project) => {
    const oldProjectId = project.id;
    const nextProject = ensureProjectDefaults({ ...project });
    if (!nextProject.id || existingProjectIds.has(nextProject.id)) nextProject.id = crypto.randomUUID();
    existingProjectIds.add(nextProject.id);
    if (oldProjectId) projectIdMap.set(oldProjectId, nextProject.id);
    keep.projects.push(nextProject);
  });

  const fieldsToComplete = ["email", "phone", "source", "type", "search", "patrimoine", "target", "sector", "next", "notes", "owner", "mandateStatus", "bankStatus", "notaryStatus", "gvhStatus", "gvhEnvelope", "cgpStatus", "cgpMission"];
  fieldsToComplete.forEach((field) => {
    if (!keep[field] || normalizeText(keep[field]).includes("renseigner") || normalizeText(keep[field]).includes("definir")) keep[field] = source[field] || keep[field];
  });
  ["apport", "capacite", "worksBudget", "gvhAmount"].forEach((field) => {
    if (!Number(keep[field] || 0) && Number(source[field] || 0)) keep[field] = Number(source[field] || 0);
  });
  if (!isAuditRevenueRecognized(keep) && isAuditRevenueRecognized(source)) {
    keep.auditStatus = source.auditStatus;
    keep.auditFee = source.auditFee;
    keep.auditPaidDate = source.auditPaidDate;
    keep.auditPaidYear = source.auditPaidYear;
  }

  state.deals.forEach((deal) => {
    if (deal.contactId === source.id) {
      deal.contactId = keep.id;
      if (deal.projectId && projectIdMap.has(deal.projectId)) deal.projectId = projectIdMap.get(deal.projectId);
    }
  });
  state.tasks.forEach((task) => {
    if (task.clientId === source.id) task.clientId = keep.id;
    if (task.contactId === source.id) task.contactId = keep.id;
  });

  source.projects = [];
  source.archivedAt = source.archivedAt || new Date().toISOString();
  source.status = "Archivé";
  source.next = `Fusionné avec ${keep.name}`;

  syncContactProjectDeals(keep);
  archiveDuplicateGeneratedDeals(state);
  saveState();
  render();
  openContactDrawer(keep.id);
  showToast(`Fusion terminée : ${source.name} est rattaché à ${keep.name}.`);
}

function setDrawerTab(tab) {
  document.querySelectorAll(".drawer-tab").forEach((button) => button.classList.toggle("active", button.dataset.drawerTab === tab));
  document.querySelectorAll(".drawer-section").forEach((section) => section.classList.toggle("active", section.dataset.section === tab));
}

function saveActiveContact(form) {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  const values = Object.fromEntries(new FormData(form).entries());
  readProjectInputs(contact);
  Object.entries(values).forEach(([key, value]) => {
    const numericFields = ["auditFee", "apport", "capacite", "worksBudget", "gvhAmount", "cgpTmi"];
    contact[key] = numericFields.includes(key) ? Number(value || 0) : value;
  });
  contact.name = buildContactDisplayName(contact.firstName, contact.lastName, contact.name);
  syncContactProjectDeals(contact);
  contact.last = "Aujourd'hui";
  saveState();
  render();
  openContactDrawer(contact.id);
  showToast("Fiche client mise a jour.");
}

function markActiveMandate() {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  contact.mandateStatus = "Signé";
  contact.status = "Sourcing";
  contact.next = "Lancer recherche ancien / immeuble de rapport";
  saveState();
  render();
  openContactDrawer(contact.id);
  showToast("Client passe en mandat de recherche.");
}

function prepareActiveGvh() {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  contact.gvhStatus = "À préparer";
  contact.gvhEnvelope = contact.gvhEnvelope || "Assurance vie";
  contact.gvhAmount = contact.gvhAmount || Math.max(10000, Math.round((contact.apport || 0) * 0.25));
  contact.cgpStatus = contact.cgpStatus || "À qualifier";
  contact.cgpMission = contact.cgpMission || "Bilan patrimonial";
  contact.cgpCompliance = contact.cgpCompliance || "À compléter";
  contact.next = "Planifier rendez-vous Hunb'up après stabilisation locative";
  saveState();
  render();
  openContactDrawer(contact.id);
  showToast("Socle Hunb'up préparé depuis la fiche client.");
}

function editTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return;
  editingTaskId = taskId;
  openModal("task");
}

function deleteTask(taskId) {
  const task = state.tasks.find((item) => item.id === taskId);
  if (!task) return;
  if (!window.confirm(`Supprimer la relance "${task.title}" ?`)) return;
  state.tasks = state.tasks.filter((item) => item.id !== taskId);
  saveState();
  render();
  showToast("Relance supprimée.");
}

function taskTemplate(task) {
  ensureTaskDefaults(task);
  const client = findTaskClient(task);
  const priorityClass = task.priority === "Haute" ? "priority-high" : task.priority === "Basse" ? "priority-low" : "";
  const urgencyRank = taskUrgencyRank(task);
  const urgencyClass = task.done ? "" : urgencyRank === -1 ? "task-overdue" : urgencyRank === 0 ? "task-due-today" : urgencyRank === 1 ? "task-due-soon" : "";
  return `
    <article class="task-item ${task.done ? "task-done" : ""} ${urgencyClass}">
      <button class="check ${task.done ? "done" : ""}" data-toggle-task="${task.id}" type="button" title="Basculer la tache">
        ${task.done ? '<span data-icon="check"></span>' : ""}
      </button>
      <div class="task-main">
        <strong>${htmlEscape(task.title)}</strong>
        <span>${htmlEscape(task.detail || "Aucun détail")}</span>
        <small>${client ? `Client: ${htmlEscape(client.name)}` : "Aucun client lié"} · ${htmlEscape(task.type || "Relance")}</small>
      </div>
      <div class="task-side">
        <span class="status ${priorityClass}">${htmlEscape(formatDueLabel(task.due))}</span>
        <div class="task-actions">
          ${client ? `<button class="ghost-button table-action" data-open-linked-contact="${client.id}" type="button">Client</button>` : ""}
          <button class="ghost-button table-action" data-edit-task="${task.id}" type="button">Modifier</button>
          <button class="ghost-button table-action danger-action" data-delete-task="${task.id}" type="button">Supprimer</button>
        </div>
      </div>
    </article>
  `;
}

function renderTasks() {
  state.tasks.forEach(ensureTaskDefaults);
  const tasks = state.tasks.filter((task) => {
    const client = findTaskClient(task);
    return matchesSearch({ ...task, client: client?.name || "" });
  });
  document.querySelector("#taskBoard").innerHTML = tasks
    .map((task) => taskTemplate(task).replace("task-item", "task-card"))
    .join("") || emptyState("Aucune relance trouvée.");
}

function renderGvh() {
  const gvhGrid = document.querySelector("#gvhGrid");
  if (!gvhGrid) return;
  const clients = activeContacts()
    .filter((contact) => contact.gvhStatus !== "Pas encore" || contact.status === "Bascule Hunb'up")
    .filter(matchesSearch);

  gvhGrid.innerHTML =
    clients
      .map(
        (contact) => `
          <article class="property-card" data-gvh-contact-id="${contact.id}">
            <div class="property-body">
              <span class="badge">${displayText(contact.gvhStatus)}</span>
              <h3>${contact.name}</h3>
              <p>${contact.cgpMission || "Bilan patrimonial"} · ${contact.gvhEnvelope || "Solution à définir"} · ${formatMoney(contact.gvhAmount || 0)}</p>
              <div class="property-meta">
                <span>Profil ${contact.gvhRisk}</span>
                <span>${contact.cgpCompliance || "Conformité à compléter"}</span>
                <span>${documentProgress(contact, "gvh")}</span>
                <span>${contact.email || "Email à renseigner"}</span>
                <span>${contact.next || "Action à planifier"}</span>
              </div>
              <div class="card-actions">
                <button class="ghost-button" type="button" data-export-gvh-word="${contact.id}">Export Word</button>
                <button class="ghost-button" type="button" data-export-gvh-excel="${contact.id}">Export Excel</button>
              </div>
            </div>
          </article>
        `
      )
      .join("") || emptyState("Aucun client Hunb'up à préparer pour le moment.");
}

function bindGvhCards() {
  document.querySelector("#gvhGrid")?.addEventListener("click", (event) => {
    const word = event.target.closest("[data-export-gvh-word]");
    if (word) {
      exportClientWordById(word.dataset.exportGvhWord);
      return;
    }
    const excel = event.target.closest("[data-export-gvh-excel]");
    if (excel) {
      exportClientExcelById(excel.dataset.exportGvhExcel);
      return;
    }
    const card = event.target.closest("[data-gvh-contact-id]");
    if (!card) return;
    openContactDrawer(card.dataset.gvhContactId);
    setDrawerTab("gvh");
  });
}

function emptyState(text) {
  return `<p class="empty">${text}</p>`;
}

function setView(view) {
  activeView = view;
  document.querySelectorAll(".view").forEach((el) => el.classList.toggle("active", el.id === view));
  document.querySelectorAll(".nav-item").forEach((el) => el.classList.toggle("active", el.dataset.view === view));
  document.querySelector("#pageTitle").textContent = pageTitles[view];
  if (location.hash.slice(1) !== view) history.replaceState(null, "", `#${view}`);
}

function updateStatus(text) {
  const status = document.querySelector("#appStatus");
  if (!status) return;
  status.textContent = text;
}

function openCloudSyncModal() {
  fillCloudForm();
  document.querySelector("#cloudModal").showModal();
}

function showToast(message, duration = 2600) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), duration);
}

function getCloudConfig() {
  try {
    return JSON.parse(localStorage.getItem(CLOUD_CONFIG_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCloudConfig(config) {
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify({ ...config, url: normalizeSupabaseUrl(config.url) }));
}

function getCloudMeta() {
  try {
    return JSON.parse(localStorage.getItem(CLOUD_META_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCloudMeta(meta) {
  localStorage.setItem(CLOUD_META_KEY, JSON.stringify(meta));
}

function normalizeSupabaseUrl(url) {
  return String(url || "")
    .trim()
    .replace(/\/+$/, "")
    .replace(/\/rest\/v1(?:\/crm_state)?$/i, "");
}

function getCloudEndpoint(config) {
  return `${normalizeSupabaseUrl(config.url)}/rest/v1/crm_state`;
}

function getCloudHeaders(config) {
  return {
    apikey: config.key,
    Authorization: `Bearer ${config.key}`,
    "Content-Type": "application/json"
  };
}

function fillCloudForm() {
  const config = getCloudConfig();
  document.querySelector("#cloudUrl").value = config.url || "";
  document.querySelector("#cloudKey").value = config.key || "";
  document.querySelector("#cloudWorkspace").value = config.workspace || "crm-laminiere-gvh";
  document.querySelector("#cloudAutoSync").checked = config.autoSync !== false;
}

function readCloudForm() {
  return {
    url: normalizeSupabaseUrl(document.querySelector("#cloudUrl")?.value),
    key: document.querySelector("#cloudKey")?.value.trim(),
    workspace: document.querySelector("#cloudWorkspace")?.value.trim() || "crm-laminiere-gvh",
    autoSync: document.querySelector("#cloudAutoSync")?.checked !== false
  };
}

function validateCloudConfig(config) {
  if (!config.url || !config.key || !config.workspace) {
    showToast("Complète URL, clé publique et workspace Supabase.");
    return false;
  }
  return true;
}

async function fetchCloudRows(config) {
  const response = await fetch(`${getCloudEndpoint(config)}?select=data,updated_at&id=eq.${encodeURIComponent(config.workspace)}&limit=1`, {
    headers: getCloudHeaders(config)
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
}

async function pushCloudState(options = {}) {
  const config = options.fromForm ? readCloudForm() : options.config || getCloudConfig();
  if (!validateCloudConfig(config)) return;
  saveCloudConfig(config);
  renderCloudSummary();
  normalizeStateShape(state);
  migrateRevenueState(state);
  const syncedAt = new Date().toISOString();
  const payload = {
    id: config.workspace,
    data: state,
    updated_at: syncedAt
  };
  const response = await fetch(`${getCloudEndpoint(config)}?on_conflict=id`, {
    method: "POST",
    headers: {
      ...getCloudHeaders(config),
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error(await response.text());
  saveCloudMeta({ ...getCloudMeta(), lastSyncedAt: syncedAt, lastCloudUpdatedAt: syncedAt });
  updateStatus("Synchronise cloud");
  if (!options.silent) showToast("Données envoyées vers le cloud.");
}

async function applyCloudRow(row, options = {}) {
  isApplyingCloudState = true;
  state = row.data;
  normalizeStateShape(state);
  migrateRevenueState(state);
  localStorage.setItem(STORE_KEY, JSON.stringify(state));
  localStorage.setItem(STORE_VERSION_KEY, APP_VERSION);
  localStorage.setItem(LOCAL_UPDATED_KEY, row.updated_at || new Date().toISOString());
  isApplyingCloudState = false;
  saveCloudMeta({ ...getCloudMeta(), lastSyncedAt: row.updated_at, lastCloudUpdatedAt: row.updated_at });
  render();
  updateStatus("Données cloud récupérées");
  if (!options.silent) showToast("Données récupérées depuis le cloud.");
}

async function pullCloudState(options = {}) {
  const config = options.fromForm ? readCloudForm() : options.config || getCloudConfig();
  if (!validateCloudConfig(config)) return;
  saveCloudConfig(config);
  renderCloudSummary();
  const rows = await fetchCloudRows(config);
  if (!rows.length || !rows[0].data) {
    if (!options.silent) showToast("Aucune donnée cloud trouvée pour ce workspace.");
    return;
  }
  saveCloudMeta({ ...getCloudMeta(), lastCloudUpdatedAt: rows[0].updated_at });
  renderCloudSummary();
  if (options.confirmReplace !== false && !window.confirm("Remplacer les données locales par celles du cloud ?")) return;
  await applyCloudRow(rows[0], options);
}

async function inspectCloudState(options = {}) {
  const config = options.fromForm ? readCloudForm() : getCloudConfig();
  if (!validateCloudConfig(config)) return;
  saveCloudConfig(config);
  const rows = await fetchCloudRows(config);
  if (!rows.length || !rows[0].data) {
    showToast("Cloud vide pour ce workspace.");
    return;
  }
  const count = Array.isArray(rows[0].data.contacts) ? rows[0].data.contacts.length : 0;
  saveCloudMeta({ ...getCloudMeta(), lastCloudUpdatedAt: rows[0].updated_at });
  renderCloudSummary();
  showToast(`Cloud OK: ${count} contacts · ${new Date(rows[0].updated_at).toLocaleString("fr-FR")}`);
}

function shouldAutoSync(config = getCloudConfig()) {
  return Boolean(config.url && config.key && config.workspace && config.autoSync !== false);
}

function scheduleAutoCloudPush() {
  const config = getCloudConfig();
  if (!shouldAutoSync(config)) return;
  window.clearTimeout(autoSyncTimer);
  updateStatus("Sync automatique en attente");
  autoSyncTimer = window.setTimeout(() => autoPushCloudState(config), 3200);
}

async function autoPushCloudState(config) {
  if (autoSyncBusy) {
    autoSyncQueued = true;
    return;
  }
  autoSyncBusy = true;
  try {
    await pushCloudState({ config, silent: true });
  } catch (error) {
    updateStatus("Sync auto en pause");
  } finally {
    autoSyncBusy = false;
    if (autoSyncQueued) {
      autoSyncQueued = false;
      scheduleAutoCloudPush();
    }
  }
}

async function autoPullCloudState(options = {}) {
  const config = getCloudConfig();
  if (!shouldAutoSync(config) || autoSyncBusy) return;
  try {
    const rows = await fetchCloudRows(config);
    if (!rows.length || !rows[0].data) return;
    const cloudUpdatedAt = rows[0].updated_at || "1970-01-01T00:00:00.000Z";
    const meta = getCloudMeta();
    const lastSyncedAt = meta.lastSyncedAt || "1970-01-01T00:00:00.000Z";
    const localUpdatedAt = getLocalUpdatedAt();
    const cloudIsNewer = new Date(cloudUpdatedAt) > new Date(lastSyncedAt);
    const localHasUnsyncedChanges = new Date(localUpdatedAt) > new Date(lastSyncedAt);
    if (cloudIsNewer && !localHasUnsyncedChanges) {
      await applyCloudRow(rows[0], { silent: !options.showToast });
      updateStatus("Cloud récupéré automatiquement");
    } else if (cloudIsNewer && localHasUnsyncedChanges) {
      updateStatus("Sync à vérifier");
      if (options.showToast) showToast("Modifications sur 2 appareils. Choisis Envoyer ou Récupérer.");
    }
  } catch (error) {
    updateStatus("Sync auto indisponible");
  }
}

function startAutoCloudPolling() {
  window.clearInterval(autoPullTimer);
  if (!shouldAutoSync()) return;
  autoPullTimer = window.setInterval(() => autoPullCloudState(), 30000);
  if (!autoPullListenersBound) {
    autoPullListenersBound = true;
    window.addEventListener("focus", () => autoPullCloudState({ showToast: true }));
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) autoPullCloudState({ showToast: true });
    });
  }
}

async function initAutoCloudSync() {
  const config = getCloudConfig();
  renderCloudSummary();
  if (!shouldAutoSync(config)) return;
  try {
    await autoPullCloudState();
    startAutoCloudPolling();
    if (document.querySelector("#appStatus")?.textContent === "Sauvegarde locale active") updateStatus("Sync automatique active");
  } catch (error) {
    updateStatus("Sync auto indisponible");
  }
}

function exportCrmData() {
  const payload = {
    app: "laminiere-crm",
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    data: state
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `laminiere-crm-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Export des données prêt.");
}

function cleanText(value) {
  return String(value ?? "")
    .replaceAll("\u00c3\u00a9", "é")
    .replaceAll("\u00c3\u00a8", "è")
    .replaceAll("\u00c3\u00aa", "ê")
    .replaceAll("\u00c3\u00a0", "à")
    .replaceAll("\u00c3\u00a2", "â")
    .replaceAll("\u00c3\u00a7", "ç")
    .replaceAll("\u00c3\u00b4", "ô")
    .replaceAll("\u00c3\u00bb", "û")
    .replaceAll("\u00c3\u00b9", "ù")
    .replaceAll("\u00c3\u00ae", "î")
    .replaceAll("\u00c3\u00af", "ï")
    .replaceAll("\u00c3\u2030", "É")
    .replaceAll("\u00c3\u20ac", "À")
    .replaceAll("\u00c2\u00b7", "·")
    .replaceAll("\u00c2\u00b2", "²")
    .replaceAll("\u00c2\u00a0", " ");
}

function toCsvValue(value) {
  const text = cleanText(value);
  return `"${text.replaceAll('"', '""')}"`;
}

function exportClientsCsv() {
  const headers = ["Nom", "Email", "Téléphone", "Source", "Projet", "Étape", "Audit", "Mandat", "Hunb'up", "Apport", "Capacité", "Prochaine action", "Score"];
  const rows = state.contacts.map((contact) => {
    ensureContactDefaults(contact);
    return [
      contact.name,
      contact.email,
      contact.phone,
      contact.source,
      contact.search,
      contact.status,
      contact.auditStatus,
      contact.mandateStatus,
      contact.gvhStatus,
      contact.apport,
      contact.capacite,
      contact.next,
      clientScore(contact)
    ];
  });
  const csv = `\ufeff${[headers, ...rows].map((row) => row.map(toCsvValue).join(";")).join("\n")}`;
  downloadTextFile(`laminiere-clients-${new Date().toISOString().slice(0, 10)}.csv`, csv, "text/csv;charset=utf-8");
  showToast("Export CSV clients prêt.");
}

function downloadTextFile(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function buildClientDossier(contact) {
  ensureContactDefaults(contact);
  return {
    exportedAt: new Date().toISOString(),
    client: contact,
    score: clientScore(contact),
    documents: Object.fromEntries(
      Object.entries(documentGroups).map(([groupKey, group]) => {
        const checked = new Set(contact.docChecks?.[groupKey] || []);
        return [
          groupKey,
          group.items.map(([id, title, help]) => ({ id, title, help, received: checked.has(id) }))
        ];
      })
    ),
    timeline: acquisitionTimeline.map((month) => ({
      month: month.month,
      items: month.items.map(([id, title, help]) => ({ id, title, help, done: Boolean(contact.timelineChecks?.[id]) }))
    })),
    blockers: detectBlockers(contact)
  };
}

function exportActiveClientDossier() {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  if (!contact) return;
  const dossier = buildClientDossier(contact);
  const safeName = contact.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  downloadTextFile(`dossier-client-${safeName || "laminiere"}.json`, JSON.stringify(dossier, null, 2), "application/json");
  showToast("Dossier client exporté.");
}

function safeFilename(name) {
  return String(name || "client").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function htmlEscape(value) {
  return cleanText(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function resizeImageFileToDataUrl(file, maxWidth = 1100, maxHeight = 720, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Lecture image impossible"));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Image invalide"));
      image.onload = () => {
        const ratio = Math.min(maxWidth / image.width, maxHeight / image.height, 1);
        const width = Math.max(1, Math.round(image.width * ratio));
        const height = Math.max(1, Math.round(image.height * ratio));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      image.src = String(reader.result || "");
    };
    reader.readAsDataURL(file);
  });
}

function exportActiveClientWord() {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  exportClientWord(contact);
}

function exportClientWordById(contactId) {
  exportClientWord(state.contacts.find((item) => item.id === contactId));
}

function exportClientWord(contact) {
  if (!contact) return;
  ensureContactDefaults(contact);
  const dossier = buildClientDossier(contact);
  const docRows = Object.entries(dossier.documents)
    .map(([group, docs]) => {
      const list = docs.map((doc) => `<li>${doc.received ? "[x]" : "[ ]"} ${htmlEscape(doc.title)}</li>`).join("");
      return `<h2>${htmlEscape(group.toUpperCase())}</h2><ul>${list}</ul>`;
    })
    .join("");
  const timelineRows = dossier.timeline
    .map((month) => `<h2>${htmlEscape(month.month)}</h2><ul>${month.items.map((item) => `<li>${item.done ? "[x]" : "[ ]"} ${htmlEscape(item.title)}</li>`).join("")}</ul>`)
    .join("");
  const html = `
    <html><head><meta charset="utf-8"><title>Dossier ${htmlEscape(contact.name)}</title></head>
    <body>
      <h1>Dossier client - ${htmlEscape(contact.name)}</h1>
      <p><strong>Score:</strong> ${clientScore(contact)}/100</p>
      <p><strong>Email:</strong> ${htmlEscape(contact.email)}<br>
      <strong>Téléphone:</strong> ${htmlEscape(contact.phone)}<br>
      <strong>Source:</strong> ${htmlEscape(contact.source)}<br>
      <strong>Projet:</strong> ${htmlEscape(contact.search)}<br>
      <strong>Étape:</strong> ${htmlEscape(contact.status)}<br>
      <strong>Prochaine action:</strong> ${htmlEscape(contact.next)}</p>
      <h2>Audit / financement</h2>
      <p><strong>Audit:</strong> ${htmlEscape(contact.auditStatus)} - ${formatMoney(contact.auditFee)}<br>
      <strong>Apport:</strong> ${formatMoney(contact.apport)}<br>
      <strong>Capacité bancaire:</strong> ${formatMoney(contact.capacite)}<br>
      <strong>Mandat:</strong> ${htmlEscape(contact.mandateStatus)}<br>
      <strong>Hunb'up:</strong> ${htmlEscape(contact.gvhStatus)} - ${htmlEscape(contact.gvhEnvelope)}</p>
      <h2>Documents</h2>
      ${docRows}
      <h2>Timeline</h2>
      ${timelineRows}
      <h2>Notes</h2>
      <p>${htmlEscape(contact.notes).replaceAll("\n", "<br>")}</p>
    </body></html>
  `;
  downloadTextFile(`dossier-client-${safeFilename(contact.name)}.doc`, html, "application/msword");
  showToast("Dossier Word exporté.");
}

function exportActiveClientExcel() {
  const contact = state.contacts.find((item) => item.id === activeContactId);
  exportClientExcel(contact);
}

function exportClientExcelById(contactId) {
  exportClientExcel(state.contacts.find((item) => item.id === contactId));
}

function exportClientExcel(contact) {
  if (!contact) return;
  ensureContactDefaults(contact);
  const headers = ["Nom", "Email", "Téléphone", "Source", "Projet", "Étape", "Audit", "Audit TTC", "Mandat", "Hunb'up", "Apport", "Capacité", "Score", "Prochaine action"];
  const row = [contact.name, contact.email, contact.phone, contact.source, contact.search, contact.status, contact.auditStatus, contact.auditFee, contact.mandateStatus, contact.gvhStatus, contact.apport, contact.capacite, clientScore(contact), contact.next];
  const csv = `\ufeff${[headers, row].map((items) => items.map(toCsvValue).join(";")).join("\n")}`;
  downloadTextFile(`dossier-client-${safeFilename(contact.name)}.csv`, csv, "text/csv;charset=utf-8");
  showToast("Dossier Excel exporté.");
}

function exportAnalysisBankWord() {
  renderAnalysis();
  const address = document.querySelector("#analysisAddress")?.value || "";
  const addressExtra = document.querySelector("#analysisAddressExtra")?.value || "";
  const parsedAddress = parseAddressMeta(address);
  const postcode = document.querySelector("#analysisPostcode")?.value || parsedAddress.postcode;
  const country = document.querySelector("#analysisCountry")?.value || "France";
  const cadastre = document.querySelector("#analysisCadastre")?.value || "";
  const projectType = document.querySelector("#analysisProjectType")?.value || "";
  const description = document.querySelector("#analysisDescription")?.value || "";
  const client = getAnalysisClient();
  const price = readNumber("analysisPrice");
  const area = readNumber("analysisArea");
  const rent = readNumber("analysisRent");
  const works = readNumber("analysisWorks");
  const acquisitionFees = readNumber("analysisAcquisitionFees");
  const bankFees = readNumber("analysisBankFees");
  const brokerFees = readNumber("analysisBrokerFees");
  const feeOnPrice = readNumber("analysisFeeOnPrice");
  const feeOnWorks = readNumber("analysisFeeOnWorks");
  const furniture = readNumber("analysisFurniture");
  const contribution = readNumber("analysisContribution");
  const propertyTax = readNumber("analysisPropertyTax");
  const monthlyCosts = readNumber("analysisMonthlyCosts");
  const rate = readNumber("analysisRate");
  const loanInsurance = readNumber("analysisLoanInsurance");
  const duration = readNumber("analysisDuration");
  const population = readNumber("analysisPopulation");
  const medianIncome = readNumber("analysisMedianIncome");
  const marketPriceSqm = readNumber("analysisMarketPriceSqm");
  const tenantShare = readNumber("analysisTenantShare");
  const rentalPressure = readNumber("analysisRentalPressure");
  const city = document.querySelector("#analysisCity")?.value || parsedAddress.city;
  autofillSectorData(city, postcode);
  const totalFees = feeOnPrice + feeOnWorks;
  const totalCost = price + acquisitionFees + bankFees + brokerFees + totalFees + works + furniture;
  const borrowedCapital = Math.max(0, totalCost - contribution);
  const payment = monthlyPayment(borrowedCapital, rate, duration);
  const creditWithInsurance = payment + loanInsurance;
  const monthlyOperatingCosts = monthlyCosts + propertyTax / 12;
  const cashflow = Math.round(rent - creditWithInsurance - monthlyOperatingCosts);
  const grossYield = totalCost ? Math.round(((rent * 12) / totalCost) * 1000) / 10 : 0;
  const pricePerSqm = area ? Math.round(price / area) : 0;
  const safeTitle = safeFilename(address || projectType || "analyse-bien");
  const sectorRows = [
    ["Population commune", population ? new Intl.NumberFormat("fr-FR").format(population) : "À compléter", population ? Math.min(100, Math.round(population / 1000)) : 0],
    ["Prix m² secteur", marketPriceSqm ? `${formatExactMoney(marketPriceSqm)} / m²` : "À compléter", marketPriceSqm ? Math.min(100, Math.round((pricePerSqm / marketPriceSqm) * 100)) : 0],
    ["Prix m² projet", pricePerSqm ? `${formatExactMoney(pricePerSqm)} / m²` : "À compléter", pricePerSqm ? 65 : 0],
    ["Revenu médian annuel", medianIncome ? formatExactMoney(medianIncome) : "À compléter", medianIncome ? Math.min(100, Math.round((medianIncome / 30000) * 100)) : 0],
    ["Part locataires", tenantShare ? `${tenantShare}%` : "À compléter", tenantShare || 0],
    ["Tension locative", rentalPressure ? `${rentalPressure}%` : "À compléter", rentalPressure || 0]
  ];
  const sectorChart = sectorRows
    .map(([label, value, pct]) => `
      <tr>
        <th>${label}</th>
        <td>${value}</td>
        <td><div class="bar"><span style="width:${Math.max(4, Math.min(100, pct))}%"></span></div></td>
      </tr>
    `)
    .join("");
  const clientRows = client
    ? `
      <tr><th>Nom dossier</th><td>${htmlEscape(client.name || "À compléter")}</td></tr>
      <tr><th>Email</th><td>${htmlEscape(client.email || "À compléter")}</td></tr>
      <tr><th>Téléphone</th><td>${htmlEscape(client.phone || "À compléter")}</td></tr>
      <tr><th>Situation / objectif</th><td>${htmlEscape(client.patrimoine || client.search || "À compléter")}</td></tr>
      <tr><th>Apport déclaré</th><td>${formatMoney(client.apport || 0)}</td></tr>
      <tr><th>Capacité bancaire</th><td>${formatMoney(client.capacite || 0)}</td></tr>
    `
    : `
      <tr><th>Nom dossier</th><td>À compléter</td></tr>
      <tr><th>Email</th><td>À compléter</td></tr>
      <tr><th>Téléphone</th><td>À compléter</td></tr>
      <tr><th>Situation familiale</th><td>À compléter</td></tr>
      <tr><th>Revenus annuels</th><td>À compléter</td></tr>
      <tr><th>Charges annuelles</th><td>À compléter</td></tr>
      <tr><th>Patrimoine / épargne</th><td>À compléter</td></tr>
    `;
  const photoBlock = analysisPhotoDataUrl
    ? `
      <table class="photo-frame" role="presentation" cellspacing="0" cellpadding="0">
        <tr>
          <td>
            <img class="main-photo" src="${analysisPhotoDataUrl}" width="620" alt="Photo principale du bien">
          </td>
        </tr>
      </table>
    `
    : `
      <div class="photo-placeholder">Photo principale du bien à intégrer</div>
    `;
  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Dossier bancaire - ${htmlEscape(address || projectType)}</title>
        <style>
          body{margin:0;background:#f4f7f4;color:#17211f;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:1.4}
          .page{width:720px;margin:0 auto;background:#ffffff}
          .cover{padding:18px 30px 16px;background:#102820;color:#ffffff}
          h1{margin:0 0 6px;font-size:28px;line-height:1.15}
          .subtitle{margin:0;color:#dbe7df;font-size:13px}
          .content{padding:22px 30px}
          .summary{width:100%;border-collapse:collapse;margin:0 0 18px}
          .summary td{padding:4px 0;border:0;vertical-align:top}
          .summary .label{width:150px;font-weight:700;color:#102820}
          .photo-frame{width:100%;border-collapse:collapse;margin:14px 0 18px}
          .photo-frame td{padding:0;border:1px solid #d9e1dc;background:#eef4ef;text-align:center}
          .main-photo{display:block;width:620px;max-width:620px;height:auto;margin:0 auto;border:0}
          .photo-placeholder{margin:16px 0 22px;padding:38px;border:1px dashed #9bb8ad;background:#f7fbf8;color:#65736d;text-align:center;font-weight:700}
          .kpis{width:100%;border-collapse:separate;border-spacing:8px;margin:0 -8px 16px}
          .kpis td{width:33%;padding:10px 12px;border:1px solid #d9e1dc;background:#f7fbf8;vertical-align:top}
          .kpi-label{display:block;color:#65736d;font-size:10px;font-weight:700;text-transform:uppercase;line-height:1.2}
          .kpi-value{display:block;margin-top:6px;color:#006f61;font-size:16px;font-weight:800;line-height:1.25;white-space:normal}
          h2{margin:22px 0 8px;padding-bottom:6px;border-bottom:2px solid #d7b45b;color:#006f61;font-size:17px}
          .data{width:100%;border-collapse:collapse;margin:10px 0 18px}
          .data th,.data td{border:1px solid #d9e1dc;padding:7px 9px;text-align:left;vertical-align:middle}
          .data th{width:48%;background:#f7fbf8;color:#102820}
          .bar{width:170px;height:10px;border-radius:10px;background:#e4ece7;overflow:hidden}
          .bar span{display:block;height:10px;background:#006f61}
          .muted{color:#65736d;font-size:12px}
          ul{margin-top:8px}
          li{margin-bottom:5px}
        </style>
      </head>
      <body>
        <div class="page">
          <div class="cover">
            <h1>Dossier bancaire</h1>
            <p class="subtitle">Synthèse opération, budget et financement</p>
          </div>
          <div class="content">
            <h2>Sommaire</h2>
            <ol>
              <li>Emprunteur(s)</li>
              <li>Présentation du projet</li>
              <li>Analyse du secteur</li>
              <li>Budget opération</li>
              <li>Rentabilité et financement</li>
              <li>Pièces à joindre</li>
            </ol>
            <h2>1. Emprunteur(s)</h2>
            <table class="data">${clientRows}</table>
            <table class="summary">
              <tr><td class="label">Projet</td><td>${htmlEscape(projectType || "Investissement locatif ancien")}</td></tr>
              <tr><td class="label">Adresse</td><td>${htmlEscape(address)} ${htmlEscape(addressExtra)}</td></tr>
              <tr><td class="label">Code postal / pays</td><td>${htmlEscape(postcode)} - ${htmlEscape(country)}</td></tr>
              <tr><td class="label">Cadastre</td><td>${htmlEscape(cadastre || "À vérifier")}</td></tr>
            </table>
            ${photoBlock}
            <table class="kpis">
              <tr>
                <td><span class="kpi-label">Coût total</span><span class="kpi-value">${formatExactMoney(totalCost)}</span></td>
                <td><span class="kpi-label">Apport</span><span class="kpi-value">${formatExactMoney(contribution)}</span></td>
                <td><span class="kpi-label">Rendement brut</span><span class="kpi-value">${grossYield}%</span></td>
              </tr>
            </table>
            <h2>2. Présentation du projet</h2>
            <p>${htmlEscape(description || "Description à compléter.").replaceAll("\n", "<br>")}</p>
            <table class="data">
              <tr><th>Surface</th><td>${area} m2</td></tr>
              <tr><th>Prix FAI</th><td>${formatExactMoney(price)}</td></tr>
              <tr><th>Loyer mensuel estimé</th><td>${formatExactMoney(rent)}</td></tr>
              <tr><th>Travaux</th><td>${formatExactMoney(works)}</td></tr>
              <tr><th>Meubles</th><td>${formatExactMoney(furniture)}</td></tr>
            </table>
            <h2>3. Analyse du secteur</h2>
            <p class="muted">Commune : ${htmlEscape(city || "À compléter")} - données à contrôler avec INSEE, DVF et annonces locatives.</p>
            <table class="data">
              ${sectorChart}
            </table>
            <h2>4. Budget opération</h2>
            <table class="data">
              <tr><th>Frais d'acquisition ancien</th><td>${formatExactMoney(acquisitionFees)}</td></tr>
              <tr><th>Frais bancaires + courtier</th><td>${formatExactMoney(bankFees + brokerFees)}</td></tr>
              <tr><th>Honoraires d'accompagnement</th><td>${formatExactMoney(totalFees)}</td></tr>
              <tr><th>Coût total projet</th><td>${formatExactMoney(totalCost)}</td></tr>
              <tr><th>Apport personnel</th><td>${formatExactMoney(contribution)}</td></tr>
              <tr><th>Capital emprunté cible</th><td>${formatExactMoney(borrowedCapital)}</td></tr>
            </table>
            <h2>5. Rentabilité et financement</h2>
            <table class="data">
              <tr><th>Rendement brut</th><td>${grossYield}%</td></tr>
              <tr><th>Taux / durée simulés</th><td>${rate}% sur ${duration} ans</td></tr>
              <tr><th>Loyers reçus</th><td>${formatExactMoney(rent)}</td></tr>
              <tr><th>Crédit avec assurance</th><td>${formatExactMoney(creditWithInsurance)}</td></tr>
              <tr><th>Charges totales</th><td>${formatExactMoney(monthlyOperatingCosts)}</td></tr>
              <tr><th>Cashflow avant fiscalité</th><td>${formatExactMoney(cashflow)} / mois</td></tr>
            </table>
            <h2>6. Pièces à joindre</h2>
            <ul>
              <li>Annonce, photos et plan si disponible</li>
              <li>Devis travaux et chiffrage par lot si travaux financés</li>
              <li>Taxe foncière, charges, baux ou estimation locative</li>
              <li>Diagnostics, urbanisme, cadastre et éléments notaire</li>
              <li>Simulation bancaire et justificatifs client</li>
            </ul>
          </div>
        </div>
      </body>
    </html>
  `;
  downloadTextFile(`dossier-bancaire-${safeTitle}.doc`, html, "application/msword");
  showToast("Dossier bancaire Word exporté.");
}

function printAnalysisBankDossier() {
  renderAnalysis();
  const address = document.querySelector("#analysisAddress")?.value || "Adresse à compléter";
  const client = getAnalysisClient();
  const projectType = document.querySelector("#analysisProjectType")?.value || "Investissement locatif ancien";
  const price = readNumber("analysisPrice");
  const works = readNumber("analysisWorks");
  const rent = readNumber("analysisRent");
  const contribution = readNumber("analysisContribution");
  const analysisHtml = document.querySelector("#analysisResults")?.innerHTML || "";
  const printable = window.open("", "_blank", "width=900,height=1100");
  if (!printable) {
    showToast("Autorise les pop-ups pour imprimer le dossier bancaire.");
    return;
  }
  printable.document.write(`
    <html>
      <head>
        <meta charset="utf-8">
        <title>Dossier bancaire - ${htmlEscape(address)}</title>
        <style>
          body{margin:0;padding:28px;background:#f4f7f4;color:#17211f;font-family:Arial,Helvetica,sans-serif}
          .print-page{max-width:900px;margin:0 auto;background:#fff;padding:28px;border:1px solid #d9e1dc}
          h1{margin:0 0 6px;color:#102820;font-size:30px}
          h2{margin-top:24px;padding-bottom:6px;border-bottom:2px solid #d7b45b;color:#006f61}
          .intro{color:#65736d}
          .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:18px 0}
          .kpis div{padding:12px;border:1px solid #d9e1dc;background:#f7fbf8}
          .kpis span{display:block;color:#65736d;font-size:11px;font-weight:700;text-transform:uppercase}
          .kpis strong{display:block;margin-top:6px;color:#006f61;font-size:18px}
          .analysis-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
          .analysis-card{break-inside:avoid;padding:14px;border:1px solid #d9e1dc;background:#fff}
          .analysis-card.wide{grid-column:1 / -1}
          .analysis-photo,.ghost-button,.primary-button,.field-button{display:none!important}
          .metric-line,.analysis-card div{max-width:100%}
          @media print{body{padding:0;background:#fff}.print-page{border:0}.ghost-button,.primary-button{display:none!important}}
        </style>
      </head>
      <body>
        <main class="print-page">
          <h1>Dossier bancaire</h1>
          <p class="intro">${htmlEscape(projectType)} · ${htmlEscape(address)} · ${htmlEscape(client?.name || "Emprunteur à compléter")}</p>
          <section class="kpis">
            <div><span>Prix FAI</span><strong>${formatExactMoney(price)}</strong></div>
            <div><span>Travaux</span><strong>${formatExactMoney(works)}</strong></div>
            <div><span>Loyers</span><strong>${formatExactMoney(rent)} / mois</strong></div>
            <div><span>Apport</span><strong>${formatExactMoney(contribution)}</strong></div>
          </section>
          <h2>Analyse et rentabilité</h2>
          <div class="analysis-grid">${analysisHtml}</div>
        </main>
        <script>window.onload = () => { window.print(); };</script>
      </body>
    </html>
  `);
  printable.document.close();
}

function printClientFiche() {
  renderAnalysis();
  const address = document.querySelector("#analysisAddress")?.value || "Adresse à compléter";
  const city = document.querySelector("#analysisCity")?.value || "";
  const client = getAnalysisClient();
  const clientName = client?.name || document.querySelector("#analysisClientName")?.value || "Client";
  const projectType = document.querySelector("#analysisProjectType")?.value || "Investissement locatif ancien";
  const asset = document.querySelector("#analysisAsset")?.value || "Petit immeuble de rapport";
  const description = document.querySelector("#analysisDescription")?.value || "Bien sélectionné dans le cadre de votre accompagnement LaMinière.";
  const price = readNumber("analysisPrice");
  const area = readNumber("analysisArea");
  const rent = readNumber("analysisRent");
  const works = readNumber("analysisWorks");
  const acquisitionFees = readNumber("analysisAcquisitionFees");
  const bankFees = readNumber("analysisBankFees");
  const brokerFees = readNumber("analysisBrokerFees");
  const feeOnPrice = readNumber("analysisFeeOnPrice");
  const feeOnWorks = readNumber("analysisFeeOnWorks");
  const furniture = readNumber("analysisFurniture");
  const contribution = readNumber("analysisContribution");
  const rate = readNumber("analysisRate");
  const loanInsurance = readNumber("analysisLoanInsurance");
  const duration = readNumber("analysisDuration");
  const monthlyCosts = readNumber("analysisMonthlyCosts");
  const propertyTax = readNumber("analysisPropertyTax");
  const marketPriceSqm = readNumber("analysisMarketPriceSqm");
  const rentalPressure = readNumber("analysisRentalPressure");
  const totalFees = feeOnPrice + feeOnWorks;
  const totalCost = Math.round(price + acquisitionFees + bankFees + brokerFees + totalFees + works + furniture);
  const borrowedCapital = Math.max(0, totalCost - contribution);
  const payment = monthlyPayment(borrowedCapital, rate, duration);
  const creditWithInsurance = payment + loanInsurance;
  const monthlyOperatingCosts = monthlyCosts + propertyTax / 12;
  const cashflow = Math.round(rent - creditWithInsurance - monthlyOperatingCosts);
  const grossYield = totalCost ? Math.round(((rent * 12) / totalCost) * 1000) / 10 : 0;
  const pricePerSqm = area ? Math.round(price / area) : 0;
  const rentPerSqm = area ? Math.round((rent / area) * 10) / 10 : 0;
  const tensionScore = estimateRentalTension(address, asset, rentPerSqm);
  const marketScore = Math.min(100, Math.max(0, Math.round(grossYield * 8 + tensionScore * 0.45 - Math.max(0, pricePerSqm - 2200) / 120)));
  const tensionGauge = Math.min(100, Math.max(0, rentalPressure || tensionScore));
  const priceGauge = marketPriceSqm ? Math.min(100, Math.round((pricePerSqm / marketPriceSqm) * 100)) : 0;
  const priceGaugeNote = marketPriceSqm ? `${formatExactMoney(pricePerSqm)}/m² vs ${formatExactMoney(marketPriceSqm)}/m² secteur` : "Prix secteur à renseigner";
  const readingNote = grossYield >= 8 && cashflow >= 0
    ? "Un rendement solide et un cashflow positif dès l'acquisition : deux signaux qui limitent le risque et soutiennent la revente à moyen terme."
    : grossYield >= 6
      ? "Un projet dans une fourchette de rendement raisonnable, à sécuriser sur le prix et les travaux avant engagement."
      : "Un dossier à retravailler sur le prix, les travaux ou le loyer avant de le présenter en financement.";
  const preparedDate = new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <title>Fiche client - ${htmlEscape(address)}</title>
        <style>
          body{margin:0;padding:28px;background:#f5f8f3;color:#16211e;font-family:Arial,Helvetica,sans-serif}
          .sheet{max-width:760px;margin:0 auto;background:#fff;border:1px solid #dce4dd;border-radius:12px;overflow:hidden}
          .cover{padding:34px 40px 28px;background:#07594d;color:#fff}
          .cover .brand{display:flex;align-items:center;gap:10px;margin-bottom:18px}
          .cover .brand img{height:34px;display:block}
          .cover .brand span{font-size:12px;font-weight:700;letter-spacing:.03em;color:rgba(255,255,255,.85)}
          .cover .eyebrow{font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:rgba(255,255,255,.65);margin:0 0 6px}
          .cover h1{font-size:28px;margin:0 0 8px}
          .cover .sub{font-size:13px;color:rgba(255,255,255,.8);margin:0}
          .body{padding:26px 40px 30px}
          .kpi-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:26px}
          .kpi{background:#f5f8f3;border:1px solid #dce4dd;border-radius:10px;padding:12px 14px}
          .kpi .l{font-size:10.5px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#8b978f;margin-bottom:6px}
          .kpi .v{font-size:20px;font-weight:800;color:#16211e}
          h2{font-size:17px;margin:0 0 4px;color:#16211e}
          .section-eyebrow{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#07594d;margin:0 0 4px}
          section{margin-bottom:24px}
          .section-intro{color:#5c6b64;font-size:12.5px;margin:6px 0 14px;line-height:1.5}
          .confidence-row{display:grid;grid-template-columns:150px 1fr auto;align-items:center;gap:12px;margin-bottom:10px}
          .confidence-row .label{font-size:12.5px;font-weight:700}
          .confidence-row .label small{display:block;font-weight:400;color:#5c6b64;font-size:10.5px;margin-top:2px}
          .gauge{height:9px;border-radius:999px;background:#dce4dd;overflow:hidden}
          .gauge span{display:block;height:100%;background:#0c7a69}
          .confidence-row .score{font-size:15px;font-weight:800;min-width:42px;text-align:right;color:#16211e}
          .data-table{width:100%;border-collapse:collapse;font-size:12.5px}
          .data-table th{width:55%;text-align:left;padding:8px 0;color:#5c6b64;font-weight:400;border-bottom:1px solid #dce4dd}
          .data-table td{text-align:right;padding:8px 0;font-weight:700;border-bottom:1px solid #dce4dd}
          .closing{background:#e6f2ee;border-radius:10px;padding:16px 18px;color:#07594d;font-size:12.5px;line-height:1.5}
          .closing strong{display:block;font-size:14px;font-weight:800;margin-bottom:4px}
          .footer{padding:14px 40px;border-top:1px solid #dce4dd;display:flex;justify-content:space-between;font-size:10.5px;color:#8b978f}
          @media print{body{padding:0;background:#fff}.sheet{border:0;border-radius:0}}
        </style>
      </head>
      <body>
        <div class="sheet">
          <div class="cover">
            <div class="brand"><img src="${LAMINIERE_LOGO_DATA_URL}" alt="LaMinière"><span>LAMINIÈRE · ACCOMPAGNEMENT INVESTISSEUR</span></div>
            <p class="eyebrow">Fiche de présentation</p>
            <h1>${htmlEscape(projectType || asset)} — ${htmlEscape(city || address)}</h1>
            <p class="sub">Préparé pour ${htmlEscape(clientName)} · ${preparedDate}</p>
          </div>
          <div class="body">
            <div class="kpi-row">
              <div class="kpi"><div class="l">Prix FAI</div><div class="v">${formatExactMoney(price)}</div></div>
              <div class="kpi"><div class="l">Rendement brut</div><div class="v">${grossYield}%</div></div>
              <div class="kpi"><div class="l">Cashflow estimé</div><div class="v">${formatExactMoney(cashflow)}/mois</div></div>
            </div>
            <section>
              <p class="section-eyebrow">Le bien</p>
              <h2>Description</h2>
              <p class="section-intro">${htmlEscape(description).replaceAll(String.fromCharCode(10), "<br>")}</p>
            </section>
            <section>
              <p class="section-eyebrow">Pourquoi ce bien nous rassure</p>
              <h2>Confiance marché</h2>
              <div class="confidence-row">
                <div class="label">Tension locative<small>Facilité à relouer rapidement</small></div>
                <div class="gauge"><span style="width:${tensionGauge}%"></span></div>
                <div class="score">${tensionGauge}/100</div>
              </div>
              <div class="confidence-row">
                <div class="label">Prix au m²<small>${priceGaugeNote}</small></div>
                <div class="gauge"><span style="width:${priceGauge}%"></span></div>
                <div class="score">${priceGauge}/100</div>
              </div>
              <div class="confidence-row">
                <div class="label">Score marché<small>Synthèse rendement, tension et prix</small></div>
                <div class="gauge"><span style="width:${marketScore}%"></span></div>
                <div class="score">${marketScore}/100</div>
              </div>
            </section>
            <section>
              <p class="section-eyebrow">Chiffres clés</p>
              <h2>Rentabilité &amp; financement</h2>
              <table class="data-table">
                <tr><th>Coût total du projet</th><td>${formatExactMoney(totalCost)}</td></tr>
                <tr><th>Apport personnel</th><td>${formatExactMoney(contribution)}</td></tr>
                <tr><th>Loyer mensuel estimé</th><td>${formatExactMoney(rent)}</td></tr>
                <tr><th>Cashflow avant fiscalité</th><td>${formatExactMoney(cashflow)}/mois</td></tr>
              </table>
            </section>
            <div class="closing">
              <strong>Notre lecture</strong>
              ${readingNote}
            </div>
          </div>
          <div class="footer">
            <span>LaMinière · laminiere.com</span>
            <span>Document indicatif, à confirmer par le notaire et la banque.</span>
          </div>
        </div>
        <script>window.onload = () => { window.print(); };</script>
      </body>
    </html>
  `;
  downloadTextFile(`fiche-client-${safeFilename(address || projectType || "bien")}.html`, html, "text/html");
  showToast("Fiche client telechargee. Ouvre le fichier pour impression ou enregistrement en PDF.");
}

function createClientFromAnalysis() {
  const nameInput = document.querySelector("#analysisClientName");
  const name = nameInput?.value.trim();
  if (!name) {
    showToast("Renseigne un nom de client ou dossier.");
    return;
  }
  const contact = ensureContactDefaults({
    id: crypto.randomUUID(),
    name,
    email: "",
    phone: "",
    source: "Analyse de bien",
    type: "Client",
    search: document.querySelector("#analysisProjectType")?.value || document.querySelector("#analysisAsset")?.value || "Investissement locatif ancien",
    patrimoine: "",
    apport: readNumber("analysisContribution"),
    capacite: Math.max(0, readNumber("analysisPrice") + readNumber("analysisWorks")),
    auditStatus: "À faire",
    auditFee: 3000,
    mandateStatus: "À qualifier",
    bankStatus: "À cadrer",
    gvhStatus: "Pas encore",
    gvhEnvelope: "",
    gvhRisk: "Équilibré",
    status: "Analyse de projet",
    sourceDetail: "Créé depuis la rubrique Analyse",
    next: "Compléter identité, revenus, charges et pièces bancaires",
    notes: document.querySelector("#analysisDescription")?.value || "",
    docChecks: {},
    timelineChecks: {}
  });
  state.contacts.unshift(contact);
  saveState();
  renderAnalysisClientOptions();
  document.querySelector("#analysisClient").value = contact.id;
  render();
  showToast("Client créé et rattaché au dossier bancaire.");
}

function addAnalysisProjectToMandate() {
  const contact = getAnalysisClient();
  if (!contact) {
    showToast("Sélectionne ou crée un client avant d'ajouter le projet.");
    return;
  }
  ensureContactDefaults(contact);
  const price = readNumber("analysisPrice");
  const works = readNumber("analysisWorks");
  const feeOnPrice = readNumber("analysisFeeOnPrice") || price * ((readNumber("analysisFeeOnPriceRate") || 7) / 100);
  const feeOnWorks = readNumber("analysisFeeOnWorks") || works * ((readNumber("analysisFeeOnWorksRate") || 7) / 100);
  const project = createProject({
    source: contact.source || "CJ",
    city: document.querySelector("#analysisCity")?.value || document.querySelector("#analysisAddress")?.value || "Projet analysé",
    acquisitionPrice: price,
    mandateFeeTtc: feeOnPrice,
    mandateFeeHt: Math.round((feeOnPrice / 1.2) * 100) / 100,
    works,
    worksFeeTtc: feeOnWorks,
    worksFeeHt: Math.round((feeOnWorks / 1.2) * 100) / 100,
    auditFeeTtc: 0,
    auditFeeHt: 0,
    furniture: readNumber("analysisFurniture")
  });
  contact.projects.push(project);
  contact.status = "Analyse de projet";
  syncContactProjectDeals(contact);
  saveState();
  renderAnalysisClientOptions();
  render();
  showToast("Projet ajouté au mandat et au pipe.");
}

function validateImport(data) {
  return data && Array.isArray(data.properties) && Array.isArray(data.contacts) && Array.isArray(data.deals) && Array.isArray(data.tasks);
}

async function importCrmData(file) {
  if (!file) return;
  try {
    if (!file.name.toLowerCase().endsWith(".json")) {
      await importClientSpreadsheet(file);
      return;
    }
    const payload = JSON.parse(await file.text());
    const imported = payload.data || payload;
    if (!validateImport(imported)) throw new Error("Format invalide");
    state = imported;
    saveState();
    render();
    showToast("Données importées.");
  } catch (error) {
    showToast(`Import impossible: ${error.message || "fichier non reconnu"}.`);
  }
}

function normalizeImportKey(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "");
}

function pickImportValue(row, aliases) {
  const wanted = new Set(aliases.map(normalizeImportKey));
  const found = Object.entries(row).find(([key]) => wanted.has(normalizeImportKey(key)));
  return found ? String(found[1] ?? "").trim() : "";
}

function parseImportNumber(value) {
  const normalized = String(value || "").replace(/\s/g, "").replace(/[â‚¬k]/gi, "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseDelimitedRows(text) {
  const separator = text.includes("\t") ? "\t" : text.split("\n")[0]?.includes(";") ? ";" : ",";
  const rows = [];
  let cell = "";
  let row = [];
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === separator && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows
    .filter((line) => line.some((value) => String(value || "").trim()))
    .map((line) => Object.fromEntries(headers.map((header, index) => [header, line[index] || ""])));
}

async function spreadsheetRows(file) {
  if (file.name.toLowerCase().endsWith(".csv") || file.name.toLowerCase().endsWith(".tsv")) {
    return parseDelimitedRows(await file.text());
  }
  if (!window.XLSX) throw new Error("Librairie Excel non chargée. Vérifie la connexion puis recharge la page.");
  const workbook = window.XLSX.read(await file.arrayBuffer(), { type: "array" });
  const firstSheet = workbook.SheetNames[0];
  if (!firstSheet) return [];
  return window.XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { defval: "" });
}

function buildImportedContact(row) {
  const fullName = pickImportValue(row, ["Nom complet", "Client", "Contact", "Nom et prénom", "Nom prenom", "Name"]);
  const firstName = pickImportValue(row, ["Prénom", "Prénom", "First name"]);
  const lastName = pickImportValue(row, ["Nom", "Last name"]);
  const name = buildContactDisplayName(firstName, lastName, fullName || lastName);
  const email = pickImportValue(row, ["Email", "E-mail", "Mail", "Adresse email"]);
  const phone = pickImportValue(row, ["Téléphone", "Téléphone", "Tel", "Mobile", "Portable"]);
  if (!name && !email && !phone) return null;
  return ensureContactDefaults({
    id: crypto.randomUUID(),
    name: name || email || phone,
    firstName,
    lastName: lastName || (!firstName ? fullName : ""),
    email,
    phone,
    source: pickImportValue(row, ["Source", "Origine", "Canal"]) || "Import Excel",
    type: pickImportValue(row, ["Segment", "Type"]) || "Client",
    search: pickImportValue(row, ["Projet", "Recherche", "Besoin", "Objectif"]) || "À qualifier",
    patrimoine: pickImportValue(row, ["Situation patrimoniale", "Patrimoine", "Lecture patrimoniale"]) || "À auditer",
    apport: parseImportNumber(pickImportValue(row, ["Apport", "Apport disponible"])),
    capacite: parseImportNumber(pickImportValue(row, ["Capacité", "Capacité", "Capacité bancaire", "Budget"])),
    regime: pickImportValue(row, ["Régime", "Regime", "Regime vise"]) || "À définir",
    target: pickImportValue(row, ["Cible", "Cible recherchée", "Cible recherchee"]) || "À définir",
    sector: pickImportValue(row, ["Secteur", "Ville", "Zone"]),
    auditStatus: pickImportValue(row, ["Audit", "Statut audit"]) || "À faire",
    auditFee: parseImportNumber(pickImportValue(row, ["Audit TTC", "Montant audit"])) || 3000,
    mandateStatus: pickImportValue(row, ["Mandat", "Mandat de recherche"]) || "Non signé",
    gvhStatus: pickImportValue(row, ["Hunb'up", "Statut Hunb'up"]) || "Pas encore",
    owner: pickImportValue(row, ["Responsable", "Owner", "Conseiller"]) || "Gabriel Valette",
    priority: pickImportValue(row, ["Priorité", "Priorité"]) || "Normale",
    status: pickImportValue(row, ["Étape", "Étape", "Statut", "Pipeline"]) || "Audit patrimonial",
    next: pickImportValue(row, ["Prochaine action", "Action", "Next"]) || "À planifier",
    notes: pickImportValue(row, ["Notes", "Commentaire", "Commentaires"]),
    createdAt: new Date().toISOString().slice(0, 10),
    docChecks: {},
    timelineChecks: {},
    archivedAt: ""
  });
}

function contactImportKey(contact) {
  const email = normalizeImportKey(contact.email);
  if (email) return `email:${email}`;
  const phone = normalizeImportKey(contact.phone);
  if (phone) return `phone:${phone}`;
  return `name:${normalizeImportKey(contact.name)}`;
}

async function importClientSpreadsheet(file) {
  const rows = await spreadsheetRows(file);
  const contacts = rows.map(buildImportedContact).filter(Boolean);
  if (!contacts.length) throw new Error("Aucun contact détecté");
  const existing = new Set(state.contacts.map((contact) => contactImportKey(ensureContactDefaults(contact))));
  const imported = [];
  let skipped = 0;
  contacts.forEach((contact) => {
    const key = contactImportKey(contact);
    if (existing.has(key)) {
      skipped += 1;
      return;
    }
    existing.add(key);
    imported.push(contact);
  });
  if (!imported.length) {
    showToast(`Aucun nouveau contact importé (${skipped} doublons détectés).`);
    return;
  }
  state.contacts = [...imported, ...state.contacts];
  saveState();
  renderAnalysisClientOptions();
  render();
  showToast(`${imported.length} contacts importés depuis Excel${skipped ? `, ${skipped} doublons ignorés` : ""}.`);
}

function initRouting() {
  const initialView = location.hash.slice(1);
  if (pageTitles[initialView]) setView(initialView);
  window.addEventListener("hashchange", () => {
    const nextView = location.hash.slice(1);
    if (pageTitles[nextView]) setView(nextView);
  });
}

function initInstallPrompt() {
  let deferredPrompt;
  const installButton = document.querySelector("#installApp");
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.classList.remove("hidden");
  });
  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    installButton.classList.add("hidden");
  });
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") {
    updateStatus("Sauvegarde locale active");
    return;
  }

  navigator.serviceWorker
    .register("sw.js")
    .then(() => updateStatus(shouldAutoSync() ? "Sync automatique active" : "App web hors ligne active"))
    .catch(() => updateStatus("Sauvegarde locale active"));
}

function openModal(type) {
  const isGvhContext = activeView === "gvh";
  const isProspectContext = activeView === "prospects";
  const isCoachingContext = activeView === "coaching";
  const editedTask = type === "task" && editingTaskId ? ensureTaskDefaults(state.tasks.find((task) => task.id === editingTaskId) || {}) : null;
  const editedTaskClientId = editedTask?.clientId || (editedTask ? findTaskClient(editedTask)?.id : "") || "";
  const config = {
    property: {
      title: isGvhContext ? "Préparer Hunb'up" : "Nouveau parcours",
      fields: isGvhContext
        ? [
            ["contactId", "Client existant", "", "select", "full", [["", "Créer un nouveau client / prospect"], ...activeContacts().map((contact) => [contact.id, contact.name])]],
            ["name", "Nom", "Client à qualifier"],
            ["firstName", "Prénom", ""],
            ["email", "Email", ""],
            ["phone", "Téléphone", ""],
            ["source", "Source", "Hunb'up", "select", "", ["Hunb'up", "LaMinière", "Recommandation", "Client existant", "Partenaire", "Autre"]],
            ["gvhEnvelope", "Solution / enveloppe", "Assurance vie", "select", "", ["Assurance vie", "PER", "CTO", "Trésorerie", "Allocation globale", "À définir"]],
            ["price", "Montant à placer / suivre", "10000", "number"],
            ["gvhRisk", "Profil de risque", "À définir", "select", "", ["À définir", "Prudent", "Équilibré", "Dynamique"]],
            ["search", "Objectif patrimonial", "Bascule patrimoniale / placement financier", "text", "full"],
            ["owner", "Responsable", "Gabriel Valette", "select", "", ["Gabriel Valette", "Anais Vergnon Valette", "Hunb'up", "Partenaire"]],
            ["next", "Prochaine action", "Préparer DER / recueil d'informations", "text", "full"]
          ]
        : [
            ["title", "Parcours", "LaMinière - Clé en main ancien", "select", "", ["LaMinière - Clé en main ancien", "Audit patrimonial 3k TTC", "Mandat de recherche ancien", "Suivi travaux et ameublement", "Formation investisseur autonome", "Coaching investisseur", "Hunb'up - Bascule patrimoniale"]],
            ["city", "Cible", "Petit immeuble de rapport", "select", "", ["Petit immeuble de rapport", "Appartement ancien", "Colocation", "Division / creation de lots", "Opération avec travaux", "Placement financier", "Formation / coaching"]],
            ["price", "Valeur", "4500", "select", "", ["3000", "390", "1500", "2500", "4500", "10000"]],
            ["area", "Étapes", "9", "select", "", ["1", "4", "6", "8", "9"]],
            ["rooms", "Livrables", "8", "select", "", ["1", "3", "4", "5", "8"]],
            ["owner", "Description", "Audit, sourcing, banque, notaire, travaux, location"],
            ["status", "Univers", "LaMinière", "select", "", [["LaMinière", "LaMinière"], "Hunb'up", "Formation", "Suivi"]]
          ]
    },
    deal: {
      title: "Nouvelle opération",
      fields: [
        ["contactId", "Client lié", "", "select", "full", [["", "Choisir un client"], ...activeContacts().map((contact) => [contact.id, contact.name])]],
        ["title", "Nom opération", "Nouvelle opération"],
        ["stage", "Étape", "Audit patrimonial", "select", "", getStages()],
        ["value", "Objectif CA (si pas de calcul auto ci-dessous)", "4500", "number"],
        ["acquisitionPrice", "Prix d'acquisition (commission 7% auto)", "", "number"],
        ["travauxMontantTTC", "Montant travaux TTC (commission 7% auto)", "", "number"],
        ["artisanFacturesHT", "Factures/devis artisans HT (marge 5% auto)", "", "number"],
        ["contact", "Objet", "Mandat de recherche / accompagnement", "text", "full"],
        ["due", "Échéance", "Cette semaine"],
        ["checks", "Points à suivre", "Objectif, Revenus, Apport", "text", "full"]
      ]
    },
    contact: {
      title: isProspectContext ? "Nouveau prospect" : isCoachingContext ? "Nouveau coaching" : "Nouveau contact",
      fields: [
        ["preset", "Modèle", isProspectContext ? "audit" : isCoachingContext ? "coaching" : "mandate", "select", "", Object.entries(contactPresets).map(([value, preset]) => [value, preset.label])],
        ["name", "Nom", "Dubois"],
        ["firstName", "Prénom", "Claire"],
        ["email", "Email", "claire@email.fr"],
        ["phone", "Téléphone", "06..."],
        ["source", "Source", isProspectContext ? "Recommandation" : isCoachingContext ? "LaMinière TC" : "CJ", "select", "", ["CJ", "Recommandation", "Instagram", "LinkedIn", "Site web", "Evenement", "Client existant", "Partenaire", "LaMinière TC", "Autre"]],
        ["search", "Projet", isProspectContext ? "Prospect à qualifier" : isCoachingContext ? "Coaching analyse de biens" : "Petit immeuble ancien de rapport", "text", "full"],
        ["patrimoine", "Situation patrimoniale", "À auditer", "text", "full"],
        ["apport", "Apport", "30000", "number"],
        ["capacite", "Capacité bancaire", "220000", "number"],
        ["regime", "Regime vise", "Meuble probable", "select", "", ["À définir", "Nu", "Meuble probable", "LMNP", "LMP", "SCI", "Autre"]],
        ["target", "Cible", isCoachingContext ? "Formation / coaching" : "Petit immeuble de rapport", "select", "", ["À définir", "Petit immeuble de rapport", "Appartement ancien", "Colocation", "Division / creation de lots", "Opération avec travaux", "Placement financier", "Formation / coaching"]],
        ["sector", "Secteur", "Ville / zone"],
        ["priority", "Priorité", "Normale", "select", "", ["Basse", "Normale", "Moyenne", "Haute"]],
        ["owner", "Responsable", "Gabriel Valette", "select", "", ["Gabriel Valette", "Anais Vergnon Valette", "LaMinière", "Hunb'up", "Partenaire"]],
        ["status", "Étape", isProspectContext ? "Prospect" : isCoachingContext ? "Coaching immobilier" : "Audit patrimonial", "select", "", ["Prospect", "Coaching immobilier", ...getStages()]],
        ["next", "Prochaine action", isProspectContext ? "Relance prévue en décembre" : isCoachingContext ? "Coaching à suivre" : "Compléter audit patrimonial", "text", "full"]
      ]
    },
    task: {
      title: editedTask ? "Modifier relance" : "Nouvelle relance",
      fields: [
        ["clientId", "Client lié", editedTaskClientId, "select", "full", [["", "Aucun client"], ...activeContacts().map((contact) => [contact.id, contact.name])]],
        ["title", "Sujet", editedTask?.title || "Appeler le client"],
        ["type", "Type", editedTask?.type || "Relance", "select", "", ["Relance", "Rendez-vous", "Document", "Banque", "Notaire", "Hunb'up", "Autre"]],
        ["priority", "Priorité", editedTask?.priority || "Normale", "select", "", ["Basse", "Normale", "Haute"]],
        ["detail", "Détail", editedTask?.detail || "Valider disponibilités", "text", "full"],
        ["due", "Échéance", parseIsoDate(editedTask?.due) ? editedTask.due : tomorrowIso(), "date"],
        ["recurrenceDays", "Relance recurrente tous les (jours, 0 = desactive)", editedTask?.recurrenceDays || 0, "number"]
      ]
    }
  }[type];

  const modal = document.querySelector("#entryModal");
  document.querySelector("#modalTitle").textContent = config.title;
  document.querySelector("#entryForm").dataset.type = type;
  document.querySelector("#modalFields").innerHTML = config.fields
    .map(([name, label, placeholder, inputType = "text", width = "", options = []]) => {
      if (inputType === "select") {
        return `
          <div class="field ${width}">
            <label for="${name}">${label}</label>
            <select id="${name}" name="${name}">
              ${options
                .map((option) => {
                  const value = Array.isArray(option) ? option[0] : option;
                  const text = Array.isArray(option) ? option[1] : option;
                  return `<option value="${value}" ${value === placeholder ? "selected" : ""}>${text}</option>`;
                })
                .join("")}
            </select>
          </div>
        `;
      }
      return `<div class="field ${width}"><label for="${name}">${label}</label><input id="${name}" name="${name}" type="${inputType}" value="${htmlEscape(placeholder)}" placeholder="${htmlEscape(placeholder)}" /></div>`;
    })
    .join("");
  if (type === "contact") bindContactPreset();
  modal.showModal();
}

function bindContactPreset() {
  const presetSelect = document.querySelector("#preset");
  if (!presetSelect) return;
  const applyPreset = () => {
    const preset = contactPresets[presetSelect.value];
    if (!preset) return;
    Object.entries(preset).forEach(([key, value]) => {
      if (key === "label") return;
      const field = document.querySelector(`#${key}`);
      if (field) field.value = value;
    });
  };
  presetSelect.addEventListener("change", applyPreset);
  applyPreset();
}

function createEntry(type, values) {
  const contactDisplayName = type === "contact" ? buildContactDisplayName(values.firstName, values.name, values.name) : "";
  if (type === "contact" && !contactDisplayName) {
    showToast("Renseigne au moins le nom du contact.");
    return false;
  }
  if (type === "deal" && !values.contactId) {
    showToast("Choisis un client à lier à l'opération.");
    return false;
  }
  if (type === "property") {
    if (activeView === "gvh") {
      let contact = state.contacts.find((item) => item.id === values.contactId);
      if (!contact) {
        const contactName = buildContactDisplayName(values.firstName, values.name, values.name);
        if (!contactName) {
          showToast("Choisis un client existant ou renseigne un nom.");
          return false;
        }
        contact = ensureContactDefaults({
          id: crypto.randomUUID(),
          name: contactName,
          firstName: values.firstName,
          lastName: values.name,
          email: values.email,
          phone: values.phone,
          source: values.source || "Hunb'up",
          type: "Prospect",
          search: values.search || "Bascule patrimoniale / placement financier",
          patrimoine: "À qualifier côté Hunb'up",
          auditStatus: "Non applicable",
          auditFee: 0,
          mandateStatus: "Non applicable",
          gvhStatus: "À préparer",
          gvhEnvelope: values.gvhEnvelope,
          gvhAmount: Number(values.price || 0),
          gvhRisk: values.gvhRisk,
          priority: "Normale",
          owner: values.owner || "Gabriel Valette",
          status: "Bascule Hunb'up",
          next: values.next || "Préparer DER / recueil d'informations",
          createdAt: new Date().toISOString().slice(0, 10),
          docChecks: {},
          timelineChecks: {},
          archivedAt: "",
          projects: []
        });
        state.contacts.unshift(contact);
      } else {
        ensureContactDefaults(contact);
        contact.gvhStatus = "À préparer";
        contact.gvhEnvelope = values.gvhEnvelope || contact.gvhEnvelope;
        contact.gvhAmount = Number(values.price || contact.gvhAmount || 0);
        contact.gvhRisk = values.gvhRisk || contact.gvhRisk;
        contact.cgpStatus = contact.cgpStatus || "À qualifier";
        contact.cgpMission = contact.cgpMission || "Bilan patrimonial";
        contact.status = "Bascule Hunb'up";
        contact.next = values.next || contact.next || "Préparer DER / recueil d'informations";
        contact.owner = values.owner || contact.owner;
        if (values.search) contact.search = values.search;
      }
      saveState();
      render();
      showToast("Client préparé dans Hunb'up.");
      openContactDrawer(contact.id);
      setDrawerTab("gvh");
      return true;
    }
    state.properties.unshift({
      id: crypto.randomUUID(),
      title: values.title,
      city: values.city,
      price: Number(values.price),
      area: Number(values.area),
      rooms: Number(values.rooms),
      status: values.status,
      owner: values.owner,
      next: "À cadrer",
      photo: state.properties.length % photos.length
    });
  }

  if (type === "deal") {
    const linkedContact = state.contacts.find((contact) => contact.id === values.contactId);
    state.deals.unshift({
      id: crypto.randomUUID(),
      contactId: values.contactId,
      title: values.title || linkedContact?.name || "Nouvelle opération",
      contact: values.contact || linkedContact?.search || "Objectif en cours",
      value: (Number(values.acquisitionPrice || 0) * 0.07 + Number(values.travauxMontantTTC || 0) * 0.07 + Number(values.artisanFacturesHT || 0) * 0.05) || Number(values.value || 0),
      acquisitionPrice: Number(values.acquisitionPrice || 0),
      travauxMontantTTC: Number(values.travauxMontantTTC || 0),
      artisanFacturesHT: Number(values.artisanFacturesHT || 0),
      stage: values.stage,
      due: values.due,
      checks: String(values.checks || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      archivedAt: ""
    });
    if (linkedContact) linkedContact.status = values.stage;
  }

  if (type === "contact") {
    const preset = contactPresets[values.preset] || {};
    const isProspectEntry = activeView === "prospects" || values.status === "Prospect" || normalizeText(values.search).includes("prospect");
    const isCoachingEntry = activeView === "coaching" || values.status === "Coaching immobilier" || normalizeText(values.search).includes("coaching");
    state.contacts.unshift({
      id: crypto.randomUUID(),
      name: contactDisplayName,
      firstName: values.firstName,
      lastName: values.name,
      email: values.email,
      phone: values.phone,
      source: values.source,
      type: isCoachingEntry ? "Coaching" : isProspectEntry ? "Prospect" : "Client",
      search: values.search,
      patrimoine: values.patrimoine,
      apport: Number(values.apport),
      capacite: Number(values.capacite),
      regime: values.regime,
      target: values.target,
      sector: values.sector,
      budget: Number(values.capacite),
      last: "Aujourd'hui",
      auditStatus: preset.auditStatus || "À faire",
      auditFee: Number(preset.auditFee || 3000),
      mandateStatus: preset.mandateStatus || "Non signé",
      gvhStatus: preset.gvhStatus || "Pas encore",
      gvhEnvelope: preset.gvhEnvelope || "",
      gvhAmount: Number(preset.gvhAmount || 0),
      priority: values.priority,
      owner: values.owner,
      createdAt: new Date().toISOString().slice(0, 10),
      company: "",
      signatureDate: "",
      worksBudget: 0,
      bankStatus: "À cadrer",
      notaryStatus: "Non démarré",
      acquisitionDate: "",
      firstTenantDate: "",
      gvhRisk: "À définir",
      archivedAt: "",
      docChecks: {},
      timelineChecks: {},
      status: values.status,
      next: values.next
    });
  }

  if (type === "task") {
    const payload = {
      clientId: values.clientId,
      title: values.title,
      type: values.type,
      priority: values.priority,
      detail: values.detail,
      due: values.due,
      recurrenceDays: Number(values.recurrenceDays || 0)
    };
    if (editingTaskId) {
      const task = state.tasks.find((item) => item.id === editingTaskId);
      if (task) Object.assign(task, payload);
      editingTaskId = null;
    } else {
      state.tasks.unshift({
        id: crypto.randomUUID(),
        ...payload,
        done: false,
        createdAt: new Date().toISOString().slice(0, 10)
      });
    }
  }

  saveState();
  render();
  showToast(type === "contact" ? "Contact client enregistré." : type === "task" ? "Relance enregistrée." : type === "deal" ? "Opération ajoutée au pipe." : "Parcours enregistré.");
  return true;
}

document.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.view)));
document.querySelectorAll("[data-view-shortcut]").forEach((button) => button.addEventListener("click", () => setView(button.dataset.viewShortcut)));
document.querySelector("#metrics").addEventListener("click", (event) => {
  const card = event.target.closest("[data-metric-action]");
  if (card?.dataset.metricAction === "revenue-forecast") openRevenueForecastModal();
});
document.querySelector("#metrics").addEventListener("keydown", (event) => {
  if (!["Enter", " "].includes(event.key)) return;
  const card = event.target.closest("[data-metric-action]");
  if (card?.dataset.metricAction !== "revenue-forecast") return;
  event.preventDefault();
  openRevenueForecastModal();
});
document.querySelector("#revenueForecastRows")?.addEventListener("click", (event) => {
  const archiveButton = event.target.closest("[data-archive-revenue-deal]");
  if (archiveButton) {
    event.stopPropagation();
    archiveRevenueDeal(archiveButton.dataset.archiveRevenueDeal);
    return;
  }
  const row = event.target.closest("[data-open-revenue-deal]");
  if (!row) return;
  const deal = state.deals.find((item) => item.id === row.dataset.openRevenueDeal);
  const contact = deal ? findLinkedContactForDeal(deal) : null;
  document.querySelector("#revenueForecastModal").close();
  if (contact) {
    openContactDrawer(contact.id);
    setDrawerTab(deal?.auditDeal ? "audit" : "mandate");
    return;
  }
  setView("pipeline");
});
document.querySelector("#openPipelineFromForecast")?.addEventListener("click", () => {
  document.querySelector("#revenueForecastModal").close();
  setView("pipeline");
});
document.querySelector("#globalSearch").addEventListener("input", render);
document.querySelector("#caYearFilter")?.addEventListener("change", (event) => {
  selectedRevenueYear = String(event.target.value);
  render();
});
document.querySelector("#quickAdd").addEventListener("click", () => {
  if (activeView === "tasks") editingTaskId = null;
  openModal(activeView === "contacts" || activeView === "prospects" || activeView === "coaching" ? "contact" : activeView === "tasks" ? "task" : activeView === "pipeline" ? "deal" : "property");
});
document.querySelector("#dashboardAddContact")?.addEventListener("click", () => openModal("contact"));
document.querySelector("#addProperty").addEventListener("click", () => openModal("property"));
document.querySelector("#addContact").addEventListener("click", () => openModal("contact"));
document.querySelector("#addTask").addEventListener("click", () => {
  editingTaskId = null;
  openModal("task");
});
document.querySelector("#prospectGrid")?.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-prospect]");
  if (openButton) {
    openContactDrawer(openButton.dataset.openProspect);
    return;
  }
  const decemberButton = event.target.closest("[data-december-prospect]");
  if (decemberButton) addDecemberProspectRelance(decemberButton.dataset.decemberProspect);
});
document.querySelector("#coachingGrid")?.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-coaching]");
  if (!openButton) return;
  openContactDrawer(openButton.dataset.openCoaching);
  setDrawerTab("coaching");
});
document.querySelector("#addGanttTask")?.addEventListener("click", () => {
  editingTaskId = null;
  openModal("task");
});
document.querySelector("#runAnalysis").addEventListener("click", renderAnalysis);
[
  "analysisAddress",
  "analysisAddressExtra",
  "analysisCountry",
  "analysisClientName",
  "analysisClientEmail",
  "analysisClientPhone",
  "analysisCadastre",
  "analysisProjectType",
  "analysisDescription",
  "analysisPrice",
  "analysisArea",
  "analysisRent",
  "analysisWorks",
  "analysisDmtoMode",
  "analysisBankFees",
  "analysisBrokerFees",
  "analysisFeeOnPriceRate",
  "analysisFeeOnWorksRate",
  "analysisFurniture",
  "analysisRate",
  "analysisLoanInsurance",
  "analysisDuration",
  "analysisMonthlyCosts",
  "analysisPropertyTax",
  "analysisAsset",
  "worksStructure",
  "worksTechnical",
  "worksSecondWork",
  "worksWetRooms",
  "worksContingency",
  "analysisPopulation",
  "analysisMedianIncome",
  "analysisMarketPriceSqm",
  "analysisTenantShare",
  "analysisRentalPressure"
].forEach((id) => {
  document.querySelector(`#${id}`)?.addEventListener("input", renderAnalysis);
});
document.querySelector("#analysisClient")?.addEventListener("change", syncAnalysisClientFields);
["analysisClientName", "analysisClientEmail", "analysisClientPhone"].forEach((id) => {
  document.querySelector(`#${id}`)?.addEventListener("change", saveAnalysisClientFields);
});
document.querySelector("#createAnalysisClient")?.addEventListener("click", createClientFromAnalysis);
document.querySelector("#analysisDescription")?.addEventListener("input", (event) => {
  const counter = document.querySelector("#analysisDescriptionCount");
  if (counter) counter.textContent = event.target.value.length;
});
document.querySelector("#analysisPhoto")?.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    analysisPhotoDataUrl = "";
    renderAnalysis();
    return;
  }
  resizeImageFileToDataUrl(file)
    .then((dataUrl) => {
      analysisPhotoDataUrl = dataUrl;
      renderAnalysis();
      showToast("Photo redimensionnée pour l'export.");
    })
    .catch(() => {
      analysisPhotoDataUrl = "";
      showToast("Image non lisible, essaie un JPEG ou PNG.");
    });
});
document.querySelector("#exportAnalysisBank")?.addEventListener("click", exportAnalysisBankWord);
document.querySelector("#addAnalysisProject")?.addEventListener("click", addAnalysisProjectToMandate);
document.querySelector("#printAnalysisBank")?.addEventListener("click", printAnalysisBankDossier);
document.querySelector("#printClientFiche")?.addEventListener("click", printClientFiche);
document.querySelector("#applyWorksTotal")?.addEventListener("click", () => {
  const total = worksBreakdownTotal();
  document.querySelector("#analysisWorks").value = Math.round(total);
  document.querySelector("#analysisWorks").dataset.manual = "true";
  renderAnalysis();
  showToast("Budget travaux mis à jour depuis le chiffrage par lots.");
});
["analysisFeeOnPrice", "analysisFeeOnWorks", "analysisContribution"].forEach((id) => {
  document.querySelector(`#${id}`)?.addEventListener("input", (event) => {
    event.currentTarget.dataset.manual = "true";
    renderAnalysis();
  });
});
[
  ["analysisFeeOnPriceRate", "analysisFeeOnPrice"],
  ["analysisFeeOnWorksRate", "analysisFeeOnWorks"],
  ["analysisPrice", "analysisFeeOnPrice"],
  ["analysisWorks", "analysisFeeOnWorks"],
  ["analysisPrice", "analysisContribution"],
  ["analysisWorks", "analysisContribution"],
  ["analysisDmtoMode", "analysisContribution"],
  ["analysisBankFees", "analysisContribution"],
  ["analysisBrokerFees", "analysisContribution"],
  ["analysisFeeOnPriceRate", "analysisContribution"],
  ["analysisFeeOnWorksRate", "analysisContribution"],
  ["analysisFurniture", "analysisContribution"]
].forEach(([triggerId, targetId]) => {
  document.querySelector(`#${triggerId}`)?.addEventListener("input", () => {
    const targetInput = document.querySelector(`#${targetId}`);
    if (targetInput) targetInput.dataset.manual = "false";
    renderAnalysis();
  });
});
document.querySelector("#analysisAddress")?.addEventListener("input", (event) => {
  window.clearTimeout(addressSearchTimer);
  addressSearchTimer = window.setTimeout(() => fetchAddressSuggestions(event.target.value), 260);
});
document.querySelector("#analysisAddress")?.addEventListener("change", applySelectedAddress);
document.querySelector("#showArchivedContacts")?.addEventListener("change", (event) => {
  showArchivedContacts = event.target.checked;
  renderContacts();
});
document.querySelector("#exportData").addEventListener("click", exportClientsCsv);
document.querySelector("#importData").addEventListener("click", () => document.querySelector("#importFile").click());
document.querySelector("#importFile").addEventListener("change", (event) => importCrmData(event.target.files[0]));
document.querySelectorAll("[data-open-cloud-sync], #openCloudSync").forEach((button) => {
  button.addEventListener("click", openCloudSyncModal);
});
document.querySelector("#cloudForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter?.value === "cancel") {
    document.querySelector("#cloudModal").close();
    return;
  }
  const config = readCloudForm();
  if (!validateCloudConfig(config)) return;
  saveCloudConfig(config);
  renderCloudSummary();
  startAutoCloudPolling();
  autoPullCloudState({ showToast: true });
  document.querySelector("#cloudModal").close();
  showToast("Configuration cloud enregistrée.");
});
document.querySelector("#inspectCloud")?.addEventListener("click", () => {
  inspectCloudState({ fromForm: true }).catch((error) => showToast(`Test cloud impossible: ${error.message.slice(0, 120)}`));
});
document.querySelector("#pushCloud").addEventListener("click", () => {
  pushCloudState({ fromForm: true }).catch((error) => showToast(`Sync cloud impossible: ${error.message.slice(0, 120)}`));
});
document.querySelector("#pullCloud").addEventListener("click", () => {
  pullCloudState({ fromForm: true }).catch((error) => showToast(`Récupération cloud impossible: ${error.message.slice(0, 120)}`));
});

document.querySelector("#dashboardPushCloud")?.addEventListener("click", () => {
  pushCloudState().catch((error) => showToast(`Sync cloud impossible: ${error.message.slice(0, 120)}`));
});
document.querySelector("#dashboardPullCloud")?.addEventListener("click", () => {
  pullCloudState({ confirmReplace: true }).catch((error) => showToast(`Récupération cloud impossible: ${error.message.slice(0, 120)}`));
});

document.querySelectorAll("[data-property-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    propertyFilter = button.dataset.propertyFilter;
    document.querySelectorAll("[data-property-filter]").forEach((item) => item.classList.toggle("active", item === button));
    renderProperties();
  });
});

document.querySelector("#contactsTable").addEventListener("click", (event) => {
  const mergeButton = event.target.closest("[data-merge-contact]");
  if (mergeButton) {
    event.stopPropagation();
    openMergeContactModal(mergeButton.dataset.mergeContact);
    return;
  }
  const archiveButton = event.target.closest("[data-archive-contact]");
  if (archiveButton) {
    event.stopPropagation();
    toggleContactArchive(archiveButton.dataset.archiveContact);
    return;
  }
  const scoreInfo = event.target.closest("[data-score-info]");
  if (scoreInfo) {
    event.stopPropagation();
    const scoreContact = state.contacts.find((item) => item.id === scoreInfo.dataset.scoreInfo);
    if (scoreContact) showToast(clientScoreTooltip(scoreContact), 6000);
    return;
  }
  const row = event.target.closest("[data-contact-id]");
  if (!row) return;
  openContactDrawer(row.dataset.contactId);
});

document.querySelector("#mergeContactForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter?.value === "cancel") {
    document.querySelector("#mergeContactModal").close();
    return;
  }
  mergeContacts(document.querySelector("#mergeKeepContact").value, document.querySelector("#mergeSourceContact").value);
  document.querySelector("#mergeContactModal").close();
});

document.querySelector("#blockerList").addEventListener("click", (event) => {
  const row = event.target.closest("[data-blocker-contact-id]");
  if (!row) return;
  openContactDrawer(row.dataset.blockerContactId);
});

document.querySelector("#kanban").addEventListener("click", (event) => {
  const linkedContact = event.target.closest("[data-open-linked-contact]");
  if (linkedContact?.dataset.openLinkedContact) {
    openContactDrawer(linkedContact.dataset.openLinkedContact);
    return;
  }
  const exitButton = event.target.closest("[data-exit-deal]");
  if (exitButton) {
    exitDeal(exitButton.dataset.exitDeal);
    return;
  }
  const moveButton = event.target.closest("[data-move-deal]");
  if (!moveButton) return;
  moveDeal(moveButton.dataset.moveDeal, moveButton.dataset.direction);
});

document.querySelector("#kanban").addEventListener("dragstart", (event) => {
  const card = event.target.closest("[data-deal-id]");
  if (!card) return;
  draggedDealId = card.dataset.dealId;
  card.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedDealId);
});

document.querySelector("#kanban").addEventListener("dragend", (event) => {
  event.target.closest("[data-deal-id]")?.classList.remove("dragging");
  document.querySelectorAll(".kanban-column.drag-over").forEach((column) => column.classList.remove("drag-over"));
  draggedDealId = null;
});

document.querySelector("#kanban").addEventListener("dragover", (event) => {
  const column = event.target.closest("[data-stage]");
  if (!column || !draggedDealId) return;
  event.preventDefault();
  column.classList.add("drag-over");
  event.dataTransfer.dropEffect = "move";
});

document.querySelector("#kanban").addEventListener("dragleave", (event) => {
  const column = event.target.closest("[data-stage]");
  if (!column || column.contains(event.relatedTarget)) return;
  column.classList.remove("drag-over");
});

document.querySelector("#kanban").addEventListener("drop", (event) => {
  const column = event.target.closest("[data-stage]");
  if (!column) return;
  event.preventDefault();
  const dealId = event.dataTransfer.getData("text/plain") || draggedDealId;
  column.classList.remove("drag-over");
  setDealStage(dealId, column.dataset.stage);
});

document.querySelector("#closeDrawer").addEventListener("click", closeContactDrawer);
document.querySelector("#drawerBackdrop").addEventListener("click", closeContactDrawer);
document.querySelectorAll("[data-drawer-tab]").forEach((button) => {
  button.addEventListener("click", () => setDrawerTab(button.dataset.drawerTab));
});
document.querySelector("#clientForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveActiveContact(event.currentTarget);
});
document.querySelector("#clientForm").addEventListener("input", (event) => {
  const projectInput = event.target.closest("[data-project-field]");
  if (!projectInput) return;
  const row = projectInput.closest("[data-project-id]");
  if (row) recalculateProjectRow(row, projectInput.dataset.projectField);
});
document.querySelector("#clientForm").addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-doc-group]");
  if (checkbox) {
    toggleClientDocument(checkbox.dataset.docGroup, checkbox.dataset.docId, checkbox.checked);
    return;
  }
  const timeline = event.target.closest("[data-timeline-id]");
  if (timeline) toggleClientTimeline(timeline.dataset.timelineId, timeline.checked);
});
document.querySelector("#clientForm").addEventListener("click", (event) => {
  const addProjectButton = event.target.closest("#addMandateProject");
  if (addProjectButton) {
    addProjectToActiveContact();
    return;
  }
  const addCoachingButton = event.target.closest("#addCoachingProject");
  if (addCoachingButton) {
    addProjectToActiveContact({
      source: "Coaching",
      city: "Coaching immobilier",
      revenueYear: selectedRevenueYear,
      revenueCategory: "Coaching",
      missionType: "Coaching immobilier",
      acquisitionPrice: 0,
      mandateRate: 0,
      mandateFeeTtc: 0,
      mandateFeeHt: 0,
      works: 0,
      worksRate: 0,
      worksFeeTtc: 0,
      worksFeeHt: 0,
      auditFeeTtc: 0,
      auditFeeHt: 0,
      furniture: 0,
      status: "En cours",
      countsAsOperation: false,
      comment: "Prix à renseigner."
    });
    setDrawerTab("coaching");
    return;
  }
  const removeProjectButton = event.target.closest("[data-remove-project]");
  if (removeProjectButton) {
    removeProjectFromActiveContact(removeProjectButton.dataset.removeProject);
    return;
  }
  const copyButton = event.target.closest("[data-copy-email]");
  if (!copyButton) return;
  copyEmailTemplate(copyButton.dataset.copyEmail);
});
document.querySelector("#markMandate").addEventListener("click", markActiveMandate);
document.querySelector("#copyToGvh").addEventListener("click", prepareActiveGvh);
document.querySelector("#exportClient").addEventListener("click", exportActiveClientWord);
document.querySelector("#exportClientExcel").addEventListener("click", exportActiveClientExcel);
document.querySelector("#archiveContact").addEventListener("click", archiveActiveContact);
document.querySelector("#deleteContact").addEventListener("click", deleteActiveContact);
bindGvhCards();

document.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action-hub]");
  if (action) {
    const type = action.dataset.actionHub;
    if (type === "contact") openModal("contact");
    if (type === "task") openModal("task");
    if (type === "analysis") setView("analysis");
    if (type === "gantt") setView("gantt");
    if (type === "pipeline") setView("pipeline");
    if (type === "bank") {
      setView("analysis");
      showToast("Complète l'analyse puis clique Dossier bancaire.");
    }
    if (type === "website") window.open("https://laminiere.com/", "_blank", "noopener");
    return;
  }

  const scoreInfo = event.target.closest("[data-score-info]");
  if (scoreInfo) {
    const scoreContact = state.contacts.find((item) => item.id === scoreInfo.dataset.scoreInfo);
    if (scoreContact) showToast(clientScoreTooltip(scoreContact), 6000);
    return;
  }

  const linkedContact = event.target.closest("[data-open-linked-contact]");
  if (linkedContact?.dataset.openLinkedContact) {
    openContactDrawer(linkedContact.dataset.openLinkedContact);
    return;
  }

  const editTaskButton = event.target.closest("[data-edit-task]");
  if (editTaskButton) {
    editTask(editTaskButton.dataset.editTask);
    return;
  }

  const deleteTaskButton = event.target.closest("[data-delete-task]");
  if (deleteTaskButton) {
    deleteTask(deleteTaskButton.dataset.deleteTask);
    return;
  }

  const toggle = event.target.closest("[data-toggle-task]");
  if (!toggle) return;
  const task = state.tasks.find((item) => item.id === toggle.dataset.toggleTask);
  task.done = !task.done;
  saveState();
  render();
});

document.querySelector("#entryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (event.submitter?.value === "cancel") {
    editingTaskId = null;
    document.querySelector("#entryModal").close();
    return;
  }
  const form = event.currentTarget;
  const values = Object.fromEntries(new FormData(form).entries());
  if (createEntry(form.dataset.type, values)) document.querySelector("#entryModal").close();
});

document.querySelector("#entryModal").addEventListener("cancel", (event) => {
  event.preventDefault();
});

function refreshRecurringTasks() {
  const today = startOfToday();
  let changed = false;
  state.tasks.forEach((task) => {
    ensureTaskDefaults(task);
    if (task.done || !task.recurrenceDays) return;
    const parsed = parseIsoDate(task.due);
    if (!parsed) return;
    let next = parsed;
    let moved = false;
    while (next < today) {
      next = new Date(next.getFullYear(), next.getMonth(), next.getDate() + Number(task.recurrenceDays));
      moved = true;
    }
    if (moved) {
      task.due = isoDateFromDate(next);
      changed = true;
    }
  });
  if (changed) saveState();
}

initRouting();
initInstallPrompt();
registerServiceWorker();
refreshRecurringTasks();
render();
initAutoCloudSync();




