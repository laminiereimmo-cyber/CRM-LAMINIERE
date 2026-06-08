const STORE_KEY = "laminiere-crm-v1";
const STORE_BACKUP_KEY = "laminiere-crm-v1-backup";
const STORE_VERSION_KEY = "laminiere-crm-version";
const CLOUD_CONFIG_KEY = "laminiere-crm-cloud-config";
const CLOUD_META_KEY = "laminiere-crm-cloud-meta";
const LOCAL_UPDATED_KEY = "laminiere-crm-local-updated-at";
const APP_VERSION = "0.19.1";
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
    title: "Socle Hunb'up - placement financier",
    target: "gvhDocs",
    items: [
      ["kyc", "KYC et connaissance client", "Identité, domicile, situation professionnelle, origine des fonds."],
      ["risk", "Profil de risque", "Questionnaire, horizon, pertes acceptables, expérience financière."],
      ["allocation", "Objectif d'allocation", "Sécurité, rendement, disponibilité, fiscalité, transmission."],
      ["envelope", "Enveloppe", "Assurance vie, PER, CTO, liquidités, existants a reprendre."],
      ["amount", "Montant et versements", "Montant initial, versements programmés, poche sécurité."],
      ["review", "Rendez-vous de suivi", "Fréquence, arbitrages, lien avec revenus locatifs."]
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
    search: "Coaching investisseur autonome",
    patrimoine: "Premier investissement / besoin méthode",
    auditStatus: "Non applicable",
    auditFee: 390,
    mandateStatus: "Coaching",
    gvhStatus: "Pas encore",
    target: "Opération simple",
    regime: "À définir",
    status: "Sourcing",
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
      "Client"
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
    if (storedVersion !== APP_VERSION) {
      migrateRevenueState(parsed);
      localStorage.setItem(STORE_KEY, JSON.stringify(parsed));
      localStorage.setItem(STORE_VERSION_KEY, APP_VERSION);
    }
    return parsed;
  }
  const data = structuredClone(seedData);
  migrateRevenueState(data);
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
      name: "Pauline et Adrien",
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
    }
  ];

  const revenueNames = new Set(revenueSpecs.map((spec) => normalizeText(spec.name)));
  revenueSpecs.forEach((spec) => {
    const normalizedName = normalizeText(spec.name);
    let contact = data.contacts.find((item) => normalizeText(item.name) === normalizedName);
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
    contact.auditStatus = spec.auditStatus;
    contact.auditFee = 3000;
    contact.auditPaidDate = spec.auditPaidDate;
    contact.auditPaidYear = yearFromDate(spec.auditPaidDate);
    if (!contact.source || contact.source === "CJ") contact.source = spec.source;
    if (spec.status) contact.status = spec.status;
    contact.projects = spec.projects.map(createProject);
  });

  data.contacts.forEach((contact) => {
    if (revenueNames.has(normalizeText(contact.name))) return;
    (contact.projects || []).forEach((project) => {
      project.archivedAt = project.archivedAt || new Date().toISOString();
    });
  });

  const demoDealIds = new Set(["d1", "d2", "d3", "d4", "d5"]);
  data.deals.forEach((deal) => {
    const linkedContact = data.contacts.find((contact) => contact.id === deal.contactId);
    const isRevenueContact = linkedContact && revenueNames.has(normalizeText(linkedContact.name));
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
      const key = deal.contactId || deal.title;
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
  const pie = document.querySelector("#stagePie");
  const legend = document.querySelector("#stageLegend");
  if (!pie || !legend) return;

  const palette = ["#0c7a69", "#c88b35", "#4f6f94", "#b85a6a", "#5f7c54", "#6f6a4f", "#2f5f73", "#8f6f3f", "#1f3d38"];
  const stages = getStages();
  const counts = stages.map((stage, index) => ({
    stage,
    count: activeContacts().filter((contact) => contact.status === stage).length,
    color: palette[index % palette.length]
  })).filter((item) => item.count > 0);

  const total = counts.reduce((sum, item) => sum + item.count, 0) || 1;
  let cursor = 0;
  const segments = counts.map((item) => {
    const start = cursor;
    const end = cursor + (item.count / total) * 100;
    cursor = end;
    return `${item.color} ${start}% ${end}%`;
  });

  pie.style.background = counts.length ? `conic-gradient(${segments.join(", ")})` : "#dce4df";
  legend.innerHTML = counts.length
    ? counts
        .map((item) => {
          const pct = Math.round((item.count / total) * 100);
          return `<div class="legend-row"><span class="legend-dot" style="--legend-color:${item.color}"></span><strong>${item.stage}</strong><span>${item.count} · ${pct}%</span></div>`;
        })
        .join("")
    : `<div class="legend-row"><span class="legend-dot" style="--legend-color:#dce4df"></span><strong>Aucun dossier</strong><span>0%</span></div>`;
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
  const contacts = activeContacts();
  const hotContacts = contacts.filter((contact) => !["Bascule Hunb'up", "Finalisé"].includes(contact.status)).length;
  const openTasks = state.tasks.filter((task) => !task.done).length;
  const gvhReady = deals.filter((deal) => deal.stage === "Bascule Hunb'up").length;

  const metrics = [
    [`Objectifs CA ${selectedRevenueYear}`, `${formatExactMoney(offerValue)} HT`, `${projectDeals.length} projets actifs ${selectedRevenueYear}`],
    ["Clients actifs", hotContacts, "Prospects et opérations LaMinière"],
    ["Relances ouvertes", openTasks, "À traiter cette semaine"],
    ["Bascule Hunb'up", gvhReady, "Clients prêts pour assurance vie"]
  ];

  document.querySelector("#metrics").innerHTML = metrics
    .map(([label, value, note]) => `<article class="metric-card"><span>${label}</span><strong>${value}</strong><p>${note}</p></article>`)
    .join("");
}

function availableRevenueYears() {
  const years = new Set([String(new Date().getFullYear())]);
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
    .filter((task) => !task.done)
    .slice(0, 4)
    .map(taskTemplate)
    .join("");

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
    ["Site web", "Ouvrir laminiere.fr dans un nouvel onglet.", "website", "external-link"]
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
              <em>${clientScore(contact)}/100</em>
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
    details.textContent = meta.lastCloudUpdatedAt
      ? `Dernier cloud: ${new Date(meta.lastCloudUpdatedAt).toLocaleString("fr-FR")} · local: ${activeContacts().length} actifs, ${archivedCount} archives`
      : `Local: ${activeContacts().length} actifs, ${archivedCount} archives · cloud non vérifié`;
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
          <td>${contact.search}<br /><span class="client-mini">${contact.target || "Cible à définir"} · ${contact.sector || "Secteur ?"}</span><br /><span class="score-pill">${clientScore(contact)}/100</span></td>
          <td><span class="status">${displayText(contact.auditStatus)}</span><br /><span class="money-pill">${formatMoney(contact.auditFee)}</span><br /><span class="client-mini">${documentProgress(contact, "audit")}</span></td>
          <td><span class="status">${displayText(contact.mandateStatus)}</span><br /><span class="client-mini">Banque: ${displayText(contact.bankStatus)}</span><br /><span class="client-mini">${documentProgress(contact, "bank")} banque</span></td>
          <td><span class="status">${displayText(contact.gvhStatus)}</span><br /><span class="client-mini">${contact.gvhEnvelope || "À qualifier"}</span><br /><span class="client-mini">${documentProgress(contact, "gvh")}</span></td>
          <td>${contact.next || contact.last || "À planifier"}</td>
          <td>
            <button class="ghost-button table-action" data-archive-contact="${contact.id}" type="button">${isContactArchived(contact) ? "Restaurer" : "Archiver"}</button>
          </td>
        </tr>
      `
    )
    .join("") || `<tr><td colspan="8" class="empty">${showArchivedContacts ? "Aucun contact archivé." : "Aucun contact actif."}</td></tr>`;
}

function isProspect(contact) {
  ensureContactDefaults(contact);
  return contact.type === "Prospect" || contact.status === "Prospect";
}

function prospectRelances(contact) {
  return state.tasks.map(ensureTaskDefaults).filter((task) => task.clientId === contact.id && !task.done);
}

function renderProspects() {
  const target = document.querySelector("#prospectGrid");
  if (!target) return;
  const prospects = activeContacts().filter(isProspect).filter(matchesSearch);
  target.innerHTML =
    prospects
      .map((contact) => {
        const relances = prospectRelances(contact);
        const december = relances.find((task) => normalizeText(task.due).includes("decembre") || normalizeText(task.due).includes("december"));
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
              ${relances.length ? relances.slice(0, 3).map((task) => `<span class="status">${htmlEscape(task.due)} · ${htmlEscape(task.title)}</span>`).join("") : '<span class="client-mini">Aucune relance ouverte</span>'}
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

function addDecemberProspectRelance(contactId) {
  const contact = state.contacts.find((item) => item.id === contactId);
  if (!contact) return;
  const hasDecemberRelance = state.tasks.map(ensureTaskDefaults).some((task) => {
    return task.clientId === contactId && !task.done && normalizeText(task.due).includes("decembre");
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
            <span>${htmlEscape(deal.stage)} · ${htmlEscape(nextTask?.due || deal.due || "À planifier")}</span>
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
  if (deal.contactId) return state.contacts.find((contact) => contact.id === deal.contactId);
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

function getStages() {
  return ["Audit patrimonial", "Sourcing", "Analyse de projet", "Banque", "Notaire", "Acquisition", "Travaux", "Ameublement", "Location", "Bascule Hunb'up"];
}

function buildContactDisplayName(firstName, lastName, fallback = "") {
  return [firstName, lastName].map((part) => String(part || "").trim()).filter(Boolean).join(" ") || String(fallback || "").trim();
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
      { city: "Murviel", source: "LM", revenueYear: "2026", acquisitionPrice: 200000, mandateFeeTtc: 14000, mandateFeeHt: 9166.67, works: 10000, worksFeeTtc: 700, worksFeeHt: 583.33, auditFeeTtc: 0, auditFeeHt: 0, furniture: 0 }
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
    revenueYear: String(data.revenueYear || yearFromDate(data.revenueDate) || selectedRevenueYear),
    revenueDate: data.revenueDate || "",
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
    ["gvhEnvelope", "Enveloppe / solution", "select", ["", "Assurance vie", "PER", "CTO", "Trésorerie", "Allocation globale"]],
    ["gvhAmount", "Montant à placer / suivre", "number"],
    ["gvhRisk", "Profil de risque", "select", ["À définir", "Prudent", "Équilibré", "Dynamique"]],
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

function projectTemplate(project) {
  ensureProjectDefaults(project);
  const fields = [
    ["source", "Origine", "text"],
    ["city", "Projet / ville", "text"],
    ["revenueYear", "Année CA", "number"],
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
    ["furniture", "Meubles", "number"]
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
            ([name, label, type]) => `
              <label class="field">
                <span>${label}</span>
                <input data-project-field="${name}" type="${type}" value="${String(project[name] ?? "").replaceAll('"', "&quot;")}" />
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
  rows.forEach((row) => {
    const project = readProjectRow(row);
    const rowTotal = projectTotalHt(project);
    if (projectRevenueYear(project) === String(selectedRevenueYear)) total += rowTotal;
    const pill = row.querySelector("[data-project-total]");
    if (pill) pill.textContent = formatExactMoney(rowTotal);
  });
  const totalTarget = document.querySelector("#mandateProjectsTotal");
  if (totalTarget) totalTarget.textContent = `${formatExactMoney(total)} HT`;
}

function syncContactProjectDeals(contact) {
  ensureContactDefaults(contact);
  const projectIds = new Set(activeProjects(contact).map((project) => project.id));
  state.deals.forEach((deal) => {
    if (deal.contactId === contact.id && deal.projectId && !projectIds.has(deal.projectId)) deal.archivedAt = deal.archivedAt || new Date().toISOString();
  });
  const auditDeals = state.deals.filter((deal) => deal.contactId === contact.id && deal.auditDeal);
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
    const projectDeals = state.deals.filter((deal) => deal.contactId === contact.id && deal.projectId === project.id);
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
      stage: contact.status && getStages().includes(contact.status) ? contact.status : "Analyse de projet",
      due: project.status || "En cours",
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
    const numericFields = ["auditFee", "apport", "capacite", "worksBudget", "gvhAmount"];
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
  return `
    <article class="task-item ${task.done ? "task-done" : ""}">
      <button class="check ${task.done ? "done" : ""}" data-toggle-task="${task.id}" type="button" title="Basculer la tache">
        ${task.done ? '<span data-icon="check"></span>' : ""}
      </button>
      <div class="task-main">
        <strong>${htmlEscape(task.title)}</strong>
        <span>${htmlEscape(task.detail || "Aucun détail")}</span>
        <small>${client ? `Client: ${htmlEscape(client.name)}` : "Aucun client lié"} · ${htmlEscape(task.type || "Relance")}</small>
      </div>
      <div class="task-side">
        <span class="status ${priorityClass}">${htmlEscape(task.due)}</span>
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
              <p>${contact.gvhEnvelope || "Solution à définir"} · ${formatMoney(contact.gvhAmount || 0)}</p>
              <div class="property-meta">
                <span>${contact.gvhRisk}</span>
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

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

function getCloudConfig() {
  try {
    return JSON.parse(localStorage.getItem(CLOUD_CONFIG_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveCloudConfig(config) {
  localStorage.setItem(CLOUD_CONFIG_KEY, JSON.stringify(config));
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
  return String(url || "").trim().replace(/\/+$/, "");
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
    .then(() => updateStatus("App web hors ligne active"))
    .catch(() => updateStatus("Sauvegarde locale active"));
}

function openModal(type) {
  const isGvhContext = activeView === "gvh";
  const isProspectContext = activeView === "prospects";
  const editedTask = type === "task" && editingTaskId ? ensureTaskDefaults(state.tasks.find((task) => task.id === editingTaskId) || {}) : null;
  const editedTaskClientId = editedTask?.clientId || (editedTask ? findTaskClient(editedTask)?.id : "") || "";
  const config = {
    property: {
      title: "Nouveau parcours",
      fields: [
        ["title", "Parcours", isGvhContext ? "Hunb'up - Bascule patrimoniale" : "LaMinière - Clé en main ancien", "select", "", ["LaMinière - Clé en main ancien", "Audit patrimonial 3k TTC", "Mandat de recherche ancien", "Suivi travaux et ameublement", "Formation investisseur autonome", "Coaching investisseur", "Hunb'up - Bascule patrimoniale"]],
        ["city", "Cible", isGvhContext ? "Placement financier" : "Petit immeuble de rapport", "select", "", ["Petit immeuble de rapport", "Appartement ancien", "Colocation", "Division / creation de lots", "Opération avec travaux", "Placement financier", "Formation / coaching"]],
        ["price", "Valeur", isGvhContext ? "10000" : "4500", "select", "", ["3000", "390", "1500", "2500", "4500", "10000"]],
        ["area", "Étapes", isGvhContext ? "4" : "9", "select", "", ["1", "4", "6", "8", "9"]],
        ["rooms", "Livrables", isGvhContext ? "3" : "8", "select", "", ["1", "3", "4", "5", "8"]],
        ["owner", "Description", isGvhContext ? "Audit patrimonial, assurance vie, stratégie financière" : "Audit, sourcing, banque, notaire, travaux, location"],
        ["status", "Univers", isGvhContext ? "Hunb'up" : "LaMinière", "select", "", [["LaMinière", "LaMinière"], "Hunb'up", "Formation", "Suivi"]]
      ]
    },
    deal: {
      title: "Nouvelle opération",
      fields: [
        ["contactId", "Client lié", "", "select", "full", [["", "Choisir un client"], ...activeContacts().map((contact) => [contact.id, contact.name])]],
        ["title", "Nom opération", "Nouvelle opération"],
        ["stage", "Étape", "Audit patrimonial", "select", "", getStages()],
        ["value", "Objectif CA", "4500", "number"],
        ["contact", "Objet", "Mandat de recherche / accompagnement", "text", "full"],
        ["due", "Échéance", "Cette semaine"],
        ["checks", "Points à suivre", "Objectif, Revenus, Apport", "text", "full"]
      ]
    },
    contact: {
      title: "Nouveau contact",
      fields: [
        ["preset", "Modèle", "mandate", "select", "", Object.entries(contactPresets).map(([value, preset]) => [value, preset.label])],
        ["name", "Nom", "Dubois"],
        ["firstName", "Prénom", "Claire"],
        ["email", "Email", "claire@email.fr"],
        ["phone", "Téléphone", "06..."],
        ["source", "Source", "CJ", "select", "", ["CJ", "Recommandation", "Instagram", "LinkedIn", "Site web", "Evenement", "Client existant", "Partenaire", "Autre"]],
        ["search", "Projet", "Petit immeuble ancien de rapport", "text", "full"],
        ["patrimoine", "Situation patrimoniale", "À auditer", "text", "full"],
        ["apport", "Apport", "30000", "number"],
        ["capacite", "Capacité bancaire", "220000", "number"],
        ["regime", "Regime vise", "Meuble probable", "select", "", ["À définir", "Nu", "Meuble probable", "LMNP", "LMP", "SCI", "Autre"]],
        ["target", "Cible", "Petit immeuble de rapport", "select", "", ["À définir", "Petit immeuble de rapport", "Appartement ancien", "Colocation", "Division / creation de lots", "Opération avec travaux", "Placement financier", "Formation / coaching"]],
        ["sector", "Secteur", "Ville / zone"],
        ["priority", "Priorité", "Normale", "select", "", ["Basse", "Normale", "Moyenne", "Haute"]],
        ["owner", "Responsable", "Gabriel Valette", "select", "", ["Gabriel Valette", "Anais Vergnon Valette", "LaMinière", "Hunb'up", "Partenaire"]],
        ["status", "Étape", "Audit patrimonial", "select", "", getStages()],
        ["next", "Prochaine action", "Compléter audit patrimonial", "text", "full"]
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
        ["due", "Échéance", editedTask?.due || "Demain"]
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
      value: Number(values.value || 0),
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
    state.contacts.unshift({
      id: crypto.randomUUID(),
      name: contactDisplayName,
      firstName: values.firstName,
      lastName: values.name,
      email: values.email,
      phone: values.phone,
      source: values.source,
      type: "Client",
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
      due: values.due
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
document.querySelector("#globalSearch").addEventListener("input", render);
document.querySelector("#caYearFilter")?.addEventListener("change", (event) => {
  selectedRevenueYear = String(event.target.value);
  render();
});
document.querySelector("#quickAdd").addEventListener("click", () => {
  if (activeView === "tasks") editingTaskId = null;
  openModal(activeView === "contacts" || activeView === "prospects" ? "contact" : activeView === "tasks" ? "task" : activeView === "pipeline" ? "deal" : "property");
});
document.querySelector("#dashboardAddContact")?.addEventListener("click", () => openModal("contact"));
document.querySelector("#addProperty").addEventListener("click", () => openModal("property"));
document.querySelector("#addContact").addEventListener("click", () => openModal("contact"));
document.querySelector("#addProspect")?.addEventListener("click", () => openModal("contact"));
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
document.querySelector("#openCloudSync").addEventListener("click", () => {
  fillCloudForm();
  document.querySelector("#cloudModal").showModal();
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
  const archiveButton = event.target.closest("[data-archive-contact]");
  if (archiveButton) {
    event.stopPropagation();
    toggleContactArchive(archiveButton.dataset.archiveContact);
    return;
  }
  const row = event.target.closest("[data-contact-id]");
  if (!row) return;
  openContactDrawer(row.dataset.contactId);
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
    if (type === "website") window.open("https://laminiere.fr/", "_blank", "noopener");
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

initRouting();
initInstallPrompt();
registerServiceWorker();
render();
initAutoCloudSync();




