/* LaMinière CRM — Analyse simple + données marché (v22.9)
   Sources publiques, sans clé :
   - Ventes DVF : API DVF open data du Cerema (apidf-preprod.cerema.fr)
   - Loyers de marché : carte des loyers ANIL / DHUP 2025 (tabular-api.data.gouv.fr)
   - DPE : base ADEME des DPE logements existants (data.ademe.fr)
   - Adresse : Base Adresse Nationale (api-adresse.data.gouv.fr)
   Les lots saisis ici sont ceux du tableau « Avis de valeur » du mode complet (analysisLots).
*/
(function () {
  "use strict";

  const DVF_URL = "https://apidf-preprod.cerema.fr/dvf_opendata/geomutations/";
  const ADEME_URL = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe03existant/";
  const LOYERS_URL = "https://tabular-api.data.gouv.fr/api/resources/";
  const LOYERS_RESOURCES = {
    appartement: "55b34088-0964-415f-9df7-d87dd98a09be",
    appartement12: "14a1fe11-b2d1-49b3-9f6b-83d12df9482c",
    appartement3: "5e3b28a4-cf56-43a3-ae79-43cceeb27f8c",
    maison: "129f764d-b613-44e4-952c-5ff50a8c9b73"
  };

  // Groupes de ventes DVF (codes de typologie du Cerema)
  const GROUPS = {
    appartement: { label: "appartements", of: "d'appartements", codes: ["121"] },
    maison: { label: "maisons", of: "de maisons", codes: ["111"] },
    local: { label: "locaux d'activité", of: "de locaux d'activité", codes: ["14"] },
    dependance: { label: "dépendances", of: "de dépendances", codes: ["131"] }
  };
  const LOT_TYPES = { Appartement: "appartement", "Local commercial": "local", Autre: "dependance" };
  const COMMERCIAL_PREMIUM = 0.02;
  const LOT_SHORT = { Appartement: "Appart.", "Local commercial": "Local", Autre: "Autre" };
  const TYPES = {
    appartement: { label: "Appartement", asset: "Appartement ancien" },
    maison: { label: "Maison", asset: "Opération avec travaux" },
    immeuble: { label: "Immeuble (plusieurs lots)", asset: "Petit immeuble de rapport" }
  };

  const DPE_CLASSES = ["A", "B", "C", "D", "E", "F", "G"];
  const DPE_RULES = {
    G: { level: "red", text: "Classe G : location interdite depuis le 1er janvier 2025. Rénovation énergétique obligatoire avant de louer." },
    F: { level: "red", text: "Classe F : location interdite à partir de 2028. Le budget travaux doit inclure la rénovation énergétique." },
    E: { level: "orange", text: "Classe E : location interdite à partir de 2034. À intégrer dans le plan de travaux." },
    D: { level: "green", text: "Classe D : louable sans contrainte de calendrier." },
    C: { level: "green", text: "Classe C : bonne performance énergétique." },
    B: { level: "green", text: "Classe B : très bonne performance énergétique." },
    A: { level: "green", text: "Classe A : excellente performance énergétique." }
  };

  const market = { key: "", dvf: null, rent: null, dpe: null, commune: null, loading: false, error: "" };

  // ---------- utilitaires ----------
  const $ = (sel) => document.querySelector(sel);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (v, d = 0) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: d, minimumFractionDigits: d }).format(v || 0);
  const euro = (v) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(v || 0)) + " €";
  const keuro = (v) => `${num((v || 0) / 1000)} k€`;
  const pct = (v, d = 0) => `${v > 0 ? "+" : ""}${num(v * 100, d)} %`;
  const toNum = (v) => Number(String(v ?? "").replace(/\s/g, "").replace(",", ".")) || 0;
  const median = (arr) => {
    if (!arr.length) return 0;
    const s = [...arr].sort((a, b) => a - b);
    const m = Math.floor(s.length / 2);
    return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
  };
  const quantile = (arr, q) => {
    if (!arr.length) return 0;
    const s = [...arr].sort((a, b) => a - b);
    const pos = (s.length - 1) * q;
    const lo = Math.floor(pos);
    const hi = Math.ceil(pos);
    return s[lo] + (s[hi] - s[lo]) * (pos - lo);
  };
  const distanceM = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const toRad = (d) => (d * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
  };
  const centroid = (geometry) => {
    let ring = geometry?.coordinates;
    while (Array.isArray(ring) && Array.isArray(ring[0]) && Array.isArray(ring[0][0])) ring = ring[0];
    if (!Array.isArray(ring) || !ring.length) return null;
    const pts = typeof ring[0] === "number" ? [ring] : ring;
    const lon = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const lat = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    return { lat, lon };
  };

  // Cache mémoire : une adresse déjà analysée ne repart pas sur le réseau.
  const cache = new Map();
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  async function getJson(url, timeout = 20000) {
    if (cache.has(url)) return cache.get(url);
    // Les API publiques refusent (403/429) quand on les sollicite trop vite : on réessaie en patientant.
    for (let attempt = 0; attempt < 3; attempt++) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(url, { signal: controller.signal });
        if ((response.status === 403 || response.status === 429) && attempt < 2) {
          await wait(2500 * (attempt + 1));
          continue;
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        cache.set(url, data);
        return data;
      } finally {
        clearTimeout(timer);
      }
    }
    throw new Error("HTTP 403");
  }
  // Exécute les tâches deux par deux pour ménager les API.
  async function inPairs(items, fn) {
    const out = [];
    for (let i = 0; i < items.length; i += 2) out.push(...(await Promise.all(items.slice(i, i + 2).map(fn))));
    return out;
  }
  const toast = (msg, d) => (typeof window.showToast === "function" ? window.showToast(msg, d) : console.log(msg));

  // ---------- lots (partagés avec le tableau « Avis de valeur » du mode complet) ----------
  const lotsRef = () => {
    try {
      return typeof analysisLots !== "undefined" ? analysisLots : [];
    } catch (e) {
      return [];
    }
  };
  function addLot(type) {
    const lots = lotsRef();
    const lot =
      typeof window.createAnalysisLot === "function"
        ? window.createAnalysisLot(type)
        : { id: String(Date.now() + Math.random()), label: type, type, surface: 0, details: "", saleSqm: 0, rentSqm: 0, currentRent: 0, status: "Loué" };
    const n = lots.length;
    lot.label = n === 0 ? "RDC" : n === 1 ? "1er étage" : `${n}e étage`;
    lot.saleSqm = 0;
    lots.push(lot);
    syncLotsExpert();
  }
  function syncLotsExpert() {
    if (typeof window.renderLotsTable === "function") window.renderLotsTable();
  }

  // ---------- sources de données ----------
  async function geocode(address) {
    const data = await getJson(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`, 8000);
    const f = data.features?.[0];
    if (!f) return null;
    const [lon, lat] = f.geometry.coordinates;
    return { lat, lon, city: f.properties.city || "", postcode: f.properties.postcode || "", citycode: f.properties.citycode || "", label: f.properties.label, score: f.properties.score || 0 };
  }

  // Ventes DVF autour de l'adresse, rangées par groupe (appartement, local...). Le rayon s'élargit tant qu'un groupe utile manque de ventes.
  async function fetchDvfGroups(lat, lon, groupKeys) {
    const keys = [...new Set(groupKeys)].filter((k) => GROUPS[k]);
    const codes = keys.flatMap((k) => GROUPS[k].codes);
    const codeFilter = codes.length === 1 ? `&codtypbien=${codes[0]}` : "";
    const thisYear = new Date().getFullYear();
    const years = [0, 1, 2, 3, 4, 5].map((i) => thisYear - i);
    let result = null;
    for (const radius of [500, 1000, 2000]) {
      const dLat = radius / 111320;
      const dLon = radius / (111320 * Math.cos((lat * Math.PI) / 180));
      const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map((v) => v.toFixed(5)).join(",");
      // Une requête par année : l'API ne trie pas par date et plafonne à 500 résultats.
      const pages = await inPairs(years, (y) => getJson(`${DVF_URL}?in_bbox=${bbox}&anneemut_min=${y}&anneemut_max=${y}&page_size=500${codeFilter}`, 30000).catch(() => null));
      if (pages.every((p) => p === null)) throw new Error("DVF indisponible");
      const byGroup = Object.fromEntries(keys.map((k) => [k, []]));
      pages
        .filter(Boolean)
        .flatMap((data) => data.features || [])
        .forEach((f) => {
          const p = f.properties || {};
          const group = keys.find((k) => GROUPS[k].codes.includes(String(p.codtypbien)));
          if (!group) return;
          const value = Number(p.valeurfonc);
          const surface = Number(p.sbati);
          const c = centroid(f.geometry);
          if (p.libnatmut !== "Vente" || !value || !surface || surface < 9 || !c) return;
          const sqm = value / surface;
          if (sqm < 300 || sqm > 15000) return;
          const dist = distanceM(lat, lon, c.lat, c.lon);
          if (dist > radius * 1.05) return;
          byGroup[group].push({ date: p.datemut, year: Number(p.anneemut), type: p.libtypbien, value, surface, sqm, dist });
        });
      result = { radius, byGroup };
      if (keys.every((k) => byGroup[k].length >= 8)) break;
    }
    return result;
  }
  // Compatibilité : bouton DVF des lots du mode complet
  async function fetchDvfAround(lat, lon, typeKey) {
    const g = GROUPS[typeKey] ? typeKey : "appartement";
    const res = await fetchDvfGroups(lat, lon, [g]);
    return { radius: res.radius, sales: res.byGroup[g] };
  }
  // Prix médian au m² d'un groupe : 3 dernières années si au moins 5 ventes, sinon 5 ans.
  function groupStats(sales) {
    if (!sales || sales.length < 3) return null;
    const recent = sales.filter((x) => x.year >= new Date().getFullYear() - 3);
    const base = recent.length >= 5 ? recent : sales;
    const sqms = base.map((x) => x.sqm);
    return { median: median(sqms), q1: quantile(sqms, 0.25), q3: quantile(sqms, 0.75), count: base.length, period: base === recent ? "3 dernières années" : "5 dernières années" };
  }

  async function fetchRent(citycode) {
    if (!citycode) return null;
    const entries = await Promise.all(
      Object.entries(LOYERS_RESOURCES).map(async ([k, rid]) => {
        try {
          const data = await getJson(`${LOYERS_URL}${rid}/data/?INSEE_C__exact=${encodeURIComponent(citycode)}`, 12000);
          const row = data.data?.[0];
          if (!row) return [k, null];
          return [k, { sqm: Number(row.loypredm2), low: Number(row["lwr.IPm2"]), high: Number(row["upr.IPm2"]), commune: row.LIBGEO, precise: row.TYPPRED === "commune" }];
        } catch (e) {
          return [k, null];
        }
      })
    );
    const out = Object.fromEntries(entries);
    return Object.values(out).some(Boolean) ? out : null;
  }
  // Indicateur ANIL adapté à la taille du logement
  function rentRefFor(kind, area) {
    const r = market.rent;
    if (!r) return null;
    if (kind === "maison") return r.maison || r.appartement;
    if (area && area < 45) return r.appartement12 || r.appartement;
    if (area >= 60) return r.appartement3 || r.appartement;
    return r.appartement;
  }

  async function fetchDpeAround(lat, lon) {
    const data = await getJson(`${ADEME_URL}values_agg?field=etiquette_dpe&geo_distance=${lon},${lat},500&agg_size=10`, 15000);
    const counts = Object.fromEntries(DPE_CLASSES.map((c) => [c, 0]));
    (data.aggs || []).forEach((a) => {
      if (counts[a.value] !== undefined) counts[a.value] = a.total;
    });
    const total = DPE_CLASSES.reduce((s, c) => s + counts[c], 0);
    return { counts, total, passoires: total ? (counts.F + counts.G) / total : 0 };
  }

  async function fetchCommune(citycode) {
    if (!citycode) return null;
    try {
      return await getJson(`https://geo.api.gouv.fr/communes/${citycode}?fields=nom,population`, 8000);
    } catch (e) {
      return null;
    }
  }

  // ---------- saisie ----------
  function readSimple() {
    const v = (id) => $(`#${id}`)?.value ?? "";
    const n = (id) => toNum(v(id));
    const type = v("sType") || "appartement";
    const lots = type === "immeuble" ? lotsRef() : [];
    const useLots = lots.length > 0;
    return {
      address: v("sAddress").trim(),
      type,
      lots,
      useLots,
      area: useLots ? lots.reduce((s, l) => s + toNum(l.surface), 0) : n("sArea"),
      price: n("sPrice"),
      works: n("sWorks"),
      rent: useLots ? lots.reduce((s, l) => s + toNum(l.currentRent), 0) : n("sRent"),
      dpe: v("sDpe"),
      contribution: v("sContribution") === "" ? null : n("sContribution"),
      // Financement et charges
      rate: n("sRate"),
      duration: n("sDuration"),
      insuranceRate: n("sInsuranceRate"),
      bankFees: n("sBankFees"),
      dmto: v("sDmto") || "standard",
      feeAcq: v("sFeeAcq") === "" ? null : n("sFeeAcq"),
      feeWorks: v("sFeeWorks") === "" ? null : n("sFeeWorks"),
      furniture: n("sFurniture"),
      propertyTax: n("sPropertyTax"),
      pno: v("sPno") === "" ? null : n("sPno"),
      managementRate: n("sManagement"),
      otherCosts: n("sOtherCosts")
    };
  }

  // Charges d'exploitation : envoyées au mode complet dans « Charges mensuelles » (hors taxe foncière, qui a sa propre case)
  function chargesOf(s) {
    const pnoYear = s.pno === null ? Math.round(2 * s.area) : s.pno;
    const management = (s.rent * s.managementRate) / 100;
    return { pnoYear, management, other: s.otherCosts, monthly: pnoYear / 12 + management + s.otherCosts, taxMonth: s.propertyTax / 12 };
  }

  function setExpert(id, value, manual) {
    const el = $(`#${id}`);
    if (!el) return;
    el.value = value;
    if (manual !== undefined) el.dataset.manual = manual ? "true" : "false";
  }
  const renderExpert = () => typeof window.renderAnalysis === "function" && window.renderAnalysis();

  // Le mode simple pilote les champs du mode complet : exports PDF, mandat, client restent valables.
  function pushToExpert() {
    const s = readSimple();
    const ch = chargesOf(s);
    setExpert("analysisAddress", s.address);
    setExpert("analysisArea", Math.round(s.area * 100) / 100);
    setExpert("analysisPrice", s.price);
    setExpert("analysisWorks", s.works);
    setExpert("analysisRent", Math.round(s.rent * 100) / 100);
    if (s.contribution === null) setExpert("analysisContribution", 0, false);
    else setExpert("analysisContribution", s.contribution, true);
    setExpert("analysisRate", s.rate);
    setExpert("analysisDuration", s.duration);
    setExpert("analysisBankFees", s.bankFees);
    setExpert("analysisDmtoMode", s.dmto);
    setExpert("analysisBrokerFees", 0);
    setExpert("analysisFurniture", s.furniture);
    setExpert("analysisPropertyTax", s.propertyTax);
    setExpert("analysisMonthlyCosts", Math.round(ch.monthly * 100) / 100);
    if (s.feeAcq === null) setExpert("analysisFeeOnPrice", 0, false);
    else setExpert("analysisFeeOnPrice", s.feeAcq, true);
    if (s.feeWorks === null) setExpert("analysisFeeOnWorks", 0, false);
    else setExpert("analysisFeeOnWorks", s.feeWorks, true);
    const asset = $("#analysisAsset");
    if (asset) asset.value = TYPES[s.type]?.asset || asset.value;
    // Assurance de prêt en % du capital : 1er calcul pour connaître le capital emprunté, puis 2e passage.
    setExpert("analysisLoanInsurance", 0);
    renderExpert();
    const borrowed = window.lastAnalysis?.borrowedCapital || 0;
    setExpert("analysisLoanInsurance", Math.round(((borrowed * s.insuranceRate) / 100 / 12) * 100) / 100);
    renderExpert();
  }

  function pullFromExpert() {
    const v = (id) => $(`#${id}`)?.value || "";
    const put = (id, value) => $(`#${id}`) && ($(`#${id}`).value = value);
    const manual = (id) => $(`#${id}`)?.dataset.manual === "true";
    if ($("#sAddress") && !$("#sAddress").value) put("sAddress", v("analysisAddress"));
    put("sArea", v("analysisArea"));
    put("sPrice", v("analysisPrice"));
    put("sWorks", v("analysisWorks"));
    put("sRent", v("analysisRent"));
    put("sContribution", manual("analysisContribution") ? v("analysisContribution") : "");
    put("sFeeAcq", manual("analysisFeeOnPrice") ? v("analysisFeeOnPrice") : "");
    put("sFeeWorks", manual("analysisFeeOnWorks") ? v("analysisFeeOnWorks") : "");
    put("sRate", v("analysisRate"));
    put("sDuration", v("analysisDuration"));
    put("sBankFees", toNum(v("analysisBankFees")) + toNum(v("analysisBrokerFees")));
    put("sFurniture", v("analysisFurniture"));
    put("sPropertyTax", v("analysisPropertyTax"));
    const asset = v("analysisAsset");
    const typeSel = $("#sType");
    if (typeSel) typeSel.value = /immeuble/i.test(asset) ? "immeuble" : /appartement|colocation/i.test(asset) ? "appartement" : typeSel.value;
  }

  // ---------- valorisation ----------
  function valuation(s) {
    if (!market.dvf) return null;
    const by = market.dvf.byGroup;
    if (!s.useLots) {
      if (s.type === "immeuble") return null;
      const g = s.type === "maison" ? "maison" : "appartement";
      const st = groupStats(by[g]);
      if (!st || !s.area) return null;
      return { mode: "simple", group: g, stats: st, byLots: st.median * s.area, retained: st.median * s.area, sales: by[g] || [] };
    }
    // Immeuble : chaque lot valorisé avec le prix DVF de son type de lot
    const rows = s.lots.map((lot) => {
      const g = LOT_TYPES[lot.type] || "appartement";
      const own = groupStats(by[g]);
      const st = own || groupStats(by.appartement);
      const surface = toNum(lot.surface);
      return { lot, group: own ? g : "appartement", stats: st, surface, value: st ? st.median * surface : 0 };
    });
    const byLots = rows.reduce((t, r) => t + r.value, 0);
    // Valeur par les loyers : loyers annuels ÷ rendement brut du secteur (loyer ANIL ÷ prix DVF des appartements)
    const appStats = groupStats(by.appartement);
    const ref = market.rent?.appartement;
    const sectorYield = appStats && ref ? (ref.sqm * 12) / appStats.median : 0;
    const annualRent = s.rent * 12;
    // Les murs commerciaux se vendent plus cher en rendement (risque locatif) : +2 points par rapport aux logements.
    const yieldFor = (lot) => (lot.type === "Appartement" ? sectorYield : sectorYield + COMMERCIAL_PREMIUM);
    rows.forEach((r) => {
      r.yield = sectorYield ? yieldFor(r.lot) : 0;
      r.byRent = r.yield && toNum(r.lot.currentRent) ? (toNum(r.lot.currentRent) * 12) / r.yield : 0;
    });
    const byRent = sectorYield && annualRent ? rows.reduce((t, r) => t + r.byRent, 0) : 0;
    const values = [byLots, byRent].filter((x) => x > 0);
    const retained = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    return { mode: "lots", rows, byLots, byRent, sectorYield, annualRent, retained, sales: by.appartement || [] };
  }

  // ---------- calcul du verdict ----------
  function computeView() {
    const s = readSimple();
    const a = window.lastAnalysis || {};
    const view = { s, a, checks: [], ch: chargesOf(s) };

    // Prix vs marché
    const val = valuation(s);
    view.val = val;
    if (val && val.retained && s.price) {
      const g = s.price / val.retained - 1;
      view.priceGap = g;
      const aside =
        val.mode === "lots"
          ? { label: "Valeur estimée", value: euro(val.retained), sub: `lots ${keuro(val.byLots)}${val.byRent ? ` · loyers ${keuro(val.byRent)}` : ""}` }
          : { label: "Valeur DVF", value: euro(val.retained), sub: `${num(val.stats.median)} €/m² · ${val.stats.count} ventes` };
      view.checks.push({
        key: "prix",
        label: "Prix vs marché",
        level: g <= 0.05 ? "green" : g <= 0.15 ? "orange" : "red",
        value: pct(g),
        aside,
        text: g <= -0.1 ? "Nettement sous le marché : vérifier pourquoi (état, travaux, nuisances)." : g <= 0.05 ? "Dans les prix du marché." : g <= 0.15 ? "Un peu au-dessus du marché : marge de négociation." : "Au-dessus du marché : à négocier fermement."
      });
    } else {
      view.checks.push({
        key: "prix",
        label: "Prix vs marché",
        level: "grey",
        value: "–",
        text: s.type === "immeuble" && !s.useLots ? "Ajouter les lots de l'immeuble (surface, loyer)." : market.dvf ? "Pas assez de ventes comparables autour." : "Cliquer sur Analyser pour charger les ventes DVF."
      });
    }

    // Loyer vs marché : uniquement les logements (l'ANIL ne couvre pas les locaux commerciaux)
    const housing = s.useLots
      ? s.lots.filter((l) => l.type === "Appartement").map((l) => ({ lot: l, area: toNum(l.surface), rent: toNum(l.currentRent), ref: rentRefFor("appartement", toNum(l.surface)) }))
      : [{ lot: null, area: s.area, rent: s.rent, ref: rentRefFor(s.type === "maison" ? "maison" : "appartement", s.area) }];
    const usable = housing.filter((h) => h.ref && h.area);
    if (market.rent && usable.length) {
      const marketTotal = usable.reduce((t, h) => t + h.ref.sqm * h.area, 0);
      const planned = usable.reduce((t, h) => t + h.rent, 0);
      const areaTotal = usable.reduce((t, h) => t + h.area, 0);
      const g = planned ? planned / marketTotal - 1 : null;
      view.rent = { housing: usable, marketTotal, planned, areaTotal, gap: g, ref: usable[0].ref };
      view.checks.push({
        key: "loyer",
        label: s.useLots ? "Loyer logements vs marché" : "Loyer vs marché",
        level: g === null ? "grey" : g <= 0.1 ? "green" : g <= 0.25 ? "orange" : "red",
        value: g === null ? "–" : pct(g),
        aside: { label: s.useLots ? "Marché logements" : "Loyer marché", value: euro(marketTotal), sub: `ANIL · ${num(areaTotal)} m²` },
        text: g === null ? "Renseigner le loyer prévu." : g <= -0.15 ? "Sous le marché : potentiel de hausse à la relocation." : g <= 0.1 ? "Loyer réaliste pour la commune." : g <= 0.25 ? "Loyer ambitieux : se justifie en meublé ou colocation, à prouver par des annonces." : "Loyer très au-dessus du marché : risque de vacance, revoir à la baisse."
      });
    } else {
      view.checks.push({ key: "loyer", label: "Loyer vs marché", level: "grey", value: "–", text: market.key && !market.rent ? "Pas d'indicateur de loyer pour cette commune." : s.useLots && !housing.length ? "Aucun logement parmi les lots." : "Cliquer sur Analyser pour charger le loyer de marché." });
    }

    // Cashflow
    if (a.cashflow !== undefined && s.price) {
      const c = a.cashflow;
      view.checks.push({
        key: "cash",
        label: "Cashflow / mois",
        level: c >= 0 ? "green" : c >= -150 ? "orange" : "red",
        value: euro(c),
        aside: { label: "Par an", value: euro(c * 12), sub: "avant impôts" },
        text: c >= 0 ? "L'opération s'autofinance avant impôts." : c >= -150 ? "Léger effort d'épargne chaque mois." : "Effort mensuel important : ajuster prix, travaux ou loyer."
      });
    }

    // DPE : seuls les logements sont concernés par les interdictions de location
    const dpeList = s.useLots ? s.lots.filter((l) => l.type === "Appartement" && DPE_RULES[l.dpe]).map((l) => l.dpe) : DPE_RULES[s.dpe] ? [s.dpe] : [];
    const hasLocal = s.useLots && s.lots.some((l) => l.type !== "Appartement");
    if (dpeList.length) {
      const worst = [...dpeList].sort().slice(-1)[0];
      const r = DPE_RULES[worst];
      view.checks.push({ key: "dpe", label: s.useLots ? "DPE des logements" : "DPE du bien", level: r.level, value: dpeList.join(" · "), text: r.text + (hasLocal ? " Local commercial non concerné." : "") });
    } else {
      view.checks.push({ key: "dpe", label: s.useLots ? "DPE des logements" : "DPE du bien", level: "grey", value: "?", text: "DPE inconnu : le demander à l'agence avant toute offre." });
    }

    const reds = view.checks.filter((c) => c.level === "red").length;
    const oranges = view.checks.filter((c) => c.level === "orange").length;
    view.verdict = reds >= 2 ? { level: "red", label: "À éviter en l'état" } : reds === 1 ? { level: "orange", label: "Possible, mais un point bloque" } : oranges >= 2 ? { level: "orange", label: "Intéressant, à négocier" } : { level: "green", label: "Bon dossier à creuser" };
    if (view.checks.every((c) => c.level === "grey")) view.verdict = { level: "grey", label: "Remplir les cases puis Analyser" };
    return view;
  }

  // ---------- affichage ----------
  function trendHtml(sales, what) {
    const years = {};
    sales.forEach((x) => {
      (years[x.year] = years[x.year] || []).push(x.sqm);
    });
    const rows = Object.keys(years)
      .sort()
      .map((y) => ({ y, m: median(years[y]), n: years[y].length }))
      .filter((r) => r.n >= 2);
    if (rows.length < 2) return "";
    const max = Math.max(...rows.map((r) => r.m));
    const first = rows[0].m;
    const last = rows[rows.length - 1].m;
    return `
      <div class="lm-trend">
        <div class="lm-subhead">Évolution du prix médian au m² des ${what} <small>${rows[0].y} → ${rows[rows.length - 1].y} : <strong>${pct(last / first - 1)}</strong></small></div>
        ${rows
          .map(
            (r) => `<div class="lm-bar-row"><span>${r.y}</span><div class="lm-bar"><i style="width:${Math.max(6, (r.m / max) * 100)}%"></i></div><strong>${num(r.m)} €/m²</strong><small>${r.n} ventes</small></div>`
          )
          .join("")}
      </div>`;
  }

  function comparablesHtml(sales, ref, area) {
    const list = sales
      .filter((x) => x.sqm >= ref * 0.5 && x.sqm <= ref * 1.8)
      .map((x) => ({ ...x, score: (area ? Math.abs(x.surface - area) / area : 0) + x.dist / market.dvf.radius + (new Date().getFullYear() - x.year) * 0.08 }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    if (!list.length) return "";
    return `
      <div class="lm-subhead">Ventes réelles les plus proches</div>
      <div class="lm-table-wrap"><table class="lm-sheet lm-comps">
        <thead><tr><th>Date</th><th>Bien</th><th class="r">Surface</th><th class="r">Prix</th><th class="r">€/m²</th><th class="r">Distance</th></tr></thead>
        <tbody>${list
          .map(
            (x) => `<tr><td>${new Date(x.date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}</td><td>${esc(x.type.toLowerCase())}</td><td class="r">${num(x.surface)} m²</td><td class="r">${euro(x.value)}</td><td class="r">${num(x.sqm)}</td><td class="r">${num(x.dist)} m</td></tr>`
          )
          .join("")}</tbody>
      </table></div>`;
  }

  function renderLotsEditor(s) {
    const host = $("#sLotsBody");
    if (!host) return;
    const lots = lotsRef();
    host.innerHTML = lots.length
      ? lots
          .map(
            (l) => `<tr>
          <td><input data-lot="${esc(l.id)}" data-f="label" value="${esc(l.label)}" placeholder="RDC" /></td>
          <td><select data-lot="${esc(l.id)}" data-f="type">${Object.keys(LOT_TYPES).map((t) => `<option value="${t}" ${l.type === t ? "selected" : ""}>${LOT_SHORT[t] || t}</option>`).join("")}</select></td>
          <td><input data-lot="${esc(l.id)}" data-f="surface" type="number" inputmode="decimal" value="${toNum(l.surface) || ""}" /></td>
          <td><input data-lot="${esc(l.id)}" data-f="currentRent" type="number" inputmode="decimal" value="${toNum(l.currentRent) || ""}" /></td>
          <td><select data-lot="${esc(l.id)}" data-f="status">${["Loué", "Vacant"].map((t) => `<option ${l.status === t ? "selected" : ""}>${t}</option>`).join("")}</select></td>
          <td>${l.type === "Appartement" ? `<select data-lot="${esc(l.id)}" data-f="dpe"><option value="">?</option>${DPE_CLASSES.map((c) => `<option ${l.dpe === c ? "selected" : ""}>${c}</option>`).join("")}</select>` : `<span class="lm-muted">–</span>`}</td>
          <td><button type="button" class="lm-x" data-del-lot="${esc(l.id)}" aria-label="Supprimer le lot">×</button></td>
        </tr>`
          )
          .join("")
      : `<tr><td colspan="7" class="lm-muted lm-empty">Aucun lot : ajoutez le premier ci-dessous.</td></tr>`;
    const totals = $("#sLotsTotal");
    if (totals) totals.textContent = lots.length ? `${lots.length} lot${lots.length > 1 ? "s" : ""} · ${num(s.area, 2)} m² · ${euro(s.rent)} / mois` : "";
  }

  function render(opts = {}) {
    const host = $("#lmSimpleResults");
    if (!host) return;
    const view = computeView();
    const { s, a, ch } = view;
    const dot = (lvl) => `<span class="lm-dot lm-${lvl}"></span>`;

    // Interface : lots visibles pour un immeuble, surface et loyer alors calculés
    const isImm = s.type === "immeuble";
    document.querySelectorAll(".lm-lots-row").forEach((r) => r.classList.toggle("hidden", !isImm));
    document.querySelectorAll(".lm-single-dpe").forEach((r) => r.classList.toggle("hidden", isImm));
    ["sArea", "sRent"].forEach((id) => {
      const el = $(`#${id}`);
      if (!el) return;
      el.readOnly = s.useLots;
      el.closest("td")?.classList.toggle("lm-calc", s.useLots);
      if (s.useLots) el.value = Math.round((id === "sArea" ? s.area : s.rent) * 100) / 100;
    });
    const typeNote = $("#sTypeNote");
    if (typeNote) typeNote.textContent = isImm ? (s.useLots ? "Surface et loyer calculés depuis les lots." : "Ajoutez chaque lot (appartement, local commercial) ci-dessous.") : "";
    if (!opts.keepLots) renderLotsEditor(s);
    else {
      const totals = $("#sLotsTotal");
      if (totals) totals.textContent = `${s.lots.length} lot${s.lots.length > 1 ? "s" : ""} · ${num(s.area, 2)} m² · ${euro(s.rent)} / mois`;
    }

    const insMonth = toNum($("#analysisLoanInsurance")?.value);
    const loan = a.creditWithInsurance !== undefined ? a.creditWithInsurance - insMonth : 0;
    const financeRows = a.price
      ? [
          ["Loyers encaissés", s.rent, "", true],
          ["Mensualité de crédit", -loan, "", true],
          ["Assurance de prêt", -insMonth, ""],
          ["Taxe foncière", -ch.taxMonth, ""],
          ["PNO (assurance propriétaire)", -ch.pnoYear / 12, ""],
          ["Gestion locative", -ch.management, ""],
          ["Autres charges (copro, eau, ménage)", -ch.other, ""],
          ["Cashflow avant impôts", a.cashflow, "total", true]
        ].filter((r) => r[3] || Math.round(r[1]) !== 0)
      : [];
    const grossYield = a.totalCost ? (s.rent * 12) / a.totalCost : 0;
    const netYield = a.totalCost ? (s.rent * 12 - s.propertyTax - ch.pnoYear - ch.management * 12 - ch.other * 12) / a.totalCost : 0;

    let html = `
      <div class="lm-verdict lm-${view.verdict.level}">
        <div><small>Verdict</small><strong>${esc(view.verdict.label)}</strong></div>
        ${market.loading ? `<span class="lm-loading">Chargement des données marché…</span>` : ""}
      </div>
      <div class="lm-checks">
        ${view.checks
          .map(
            (c) => `<div class="lm-check">${dot(c.level)}<div class="lm-check-main"><span>${esc(c.label)}</span><strong>${esc(c.value)}</strong><small>${esc(c.text)}</small></div>${c.aside ? `<div class="lm-check-aside"><span>${esc(c.aside.label)}</span><strong>${esc(c.aside.value)}</strong><small>${esc(c.aside.sub)}</small></div>` : ""}</div>`
          )
          .join("")}
      </div>`;

    if (financeRows.length) {
      html += `
      <section class="lm-block">
        <h3>Les chiffres</h3>
        <div class="lm-table-wrap"><table class="lm-sheet">
          <thead><tr><th></th><th class="r">Par mois</th><th class="r">Par an</th></tr></thead>
          <tbody>
            ${financeRows.map(([l, m, cls]) => `<tr class="${cls}"><td>${l}</td><td class="r ${m < 0 ? "lm-neg" : ""}">${euro(m)}</td><td class="r ${m < 0 ? "lm-neg" : ""}">${euro(m * 12)}</td></tr>`).join("")}
          </tbody>
        </table></div>
        <div class="lm-table-wrap"><table class="lm-sheet lm-kv">
          <tbody>
            <tr><td>Coût total du projet <small>(prix, notaire, honoraires, travaux, meubles, frais)</small></td><td class="r">${euro(a.totalCost)}</td></tr>
            <tr><td>Apport</td><td class="r">${euro(a.contribution)}</td></tr>
            <tr><td>Montant emprunté <small>${num(s.rate, 2)} % sur ${num(s.duration)} ans</small></td><td class="r">${euro(a.borrowedCapital)}</td></tr>
            <tr><td>Rendement brut <small>loyers annuels ÷ coût total</small></td><td class="r">${num(grossYield * 100, 2)} %</td></tr>
            <tr class="total"><td>Rentabilité nette <small>après taxe foncière, PNO, gestion et charges, avant crédit</small></td><td class="r">${num(netYield * 100, 2)} %</td></tr>
            ${a.metrics && a.contribution > 0 && Number.isFinite(a.metrics.irr) ? `<tr><td>TRI sur ${a.metrics.years} ans <small>(revente comprise, avant impôts)</small></td><td class="r">${num(a.metrics.irr * 100, 1)} %</td></tr>` : ""}
          </tbody>
        </table></div>
      </section>`;
    }

    const val = view.val;
    if (market.dvf) {
      html += `<section class="lm-block"><h3>Valeur du bien <small>ventes réelles DVF · rayon ${num(market.dvf.radius)} m</small></h3>`;
      if (val && val.mode === "lots") {
        html += `
          <div class="lm-table-wrap"><table class="lm-sheet lm-comps">
            <thead><tr><th>Lot</th><th class="r">Surface</th><th class="r">Prix DVF</th><th class="r">Valeur</th></tr></thead>
            <tbody>
              ${val.rows
                .map(
                  (r) => `<tr><td>${esc(r.lot.label || r.lot.type)} <small>${esc(r.lot.type.toLowerCase())}${r.stats ? ` · ${r.stats.count} ventes ${GROUPS[r.group].of}` : ""}</small></td><td class="r">${num(r.surface, 2)} m²</td><td class="r">${r.stats ? `${num(r.stats.median)} €/m²` : "–"}</td><td class="r">${euro(r.value)}</td></tr>`
                )
                .join("")}
              <tr class="total"><td>Valeur par les lots</td><td class="r">${num(s.area, 2)} m²</td><td></td><td class="r">${euro(val.byLots)}</td></tr>
            </tbody>
          </table></div>
          ${
            val.byRent
              ? `<div class="lm-table-wrap"><table class="lm-sheet lm-kv"><tbody>
            <tr><td>Loyers annuels</td><td class="r">${euro(val.annualRent)}</td></tr>
            <tr><td>Rendement brut du secteur <small>loyer ANIL des appartements ÷ prix DVF des appartements${hasLocalLot(s) ? ` · locaux commerciaux : ${num((val.sectorYield + COMMERCIAL_PREMIUM) * 100, 1)} %` : ""}</small></td><td class="r">${num(val.sectorYield * 100, 1)} %</td></tr>
            <tr class="total"><td>Valeur par les loyers <small>ce qu'un investisseur paierait pour ces loyers</small></td><td class="r">${euro(val.byRent)}</td></tr>
          </tbody></table></div>`
              : ""
          }
          <div class="lm-table-wrap"><table class="lm-sheet lm-kv"><tbody>
            <tr class="total"><td>Valeur retenue <small>${val.byRent ? "moyenne des deux méthodes" : "valeur par les lots"}</small></td><td class="r">${euro(val.retained)}</td></tr>
            <tr><td>Écart avec le prix demandé</td><td class="r ${view.priceGap > 0.05 ? "lm-neg" : ""}">${euro(s.price - val.retained)} (${pct(view.priceGap || 0)})</td></tr>
          </tbody></table></div>
          <p class="lm-note">Pour un immeuble loué, la valeur par les loyers pèse autant que les m² : un investisseur achète des revenus.</p>
          ${trendHtml(val.sales, "appartements")}`;
      } else if (val) {
        const st = val.stats;
        html += `
          <div class="lm-table-wrap"><table class="lm-sheet lm-kv"><tbody>
            <tr><td>Prix médian au m² du secteur <small>${st.count} ventes, ${st.period}</small></td><td class="r">${num(st.median)} €/m²</td></tr>
            <tr><td>Fourchette courante <small>(la moitié des ventes)</small></td><td class="r">${num(st.q1)} – ${num(st.q3)} €/m²</td></tr>
            <tr><td>Votre prix au m²</td><td class="r"><strong>${num(s.area ? s.price / s.area : 0)} €/m²</strong></td></tr>
            <tr><td>Valeur marché estimée pour ${num(s.area)} m²</td><td class="r">${euro(val.retained)}</td></tr>
            <tr class="total"><td>Écart avec le prix demandé</td><td class="r ${view.priceGap > 0.05 ? "lm-neg" : ""}">${euro(s.price - val.retained)} (${pct(view.priceGap || 0)})</td></tr>
          </tbody></table></div>
          ${trendHtml(val.sales, GROUPS[val.group].label)}
          ${comparablesHtml(val.sales, st.median, s.area)}`;
      } else {
        html += `<p class="lm-note">${s.type === "immeuble" && !s.useLots ? "Ajoutez les lots pour estimer la valeur." : "Moins de 3 ventes de ce type trouvées dans un rayon de 2 km."} Vérification manuelle : <a href="https://explore.data.gouv.fr/fr/immobilier?onglet=carte" target="_blank" rel="noreferrer">carte DVF</a>.</p>`;
      }
      html += `</section>`;
    }

    if (market.key) {
      html += `<section class="lm-block"><h3>Loyer du marché <small>carte des loyers ANIL 2025${market.rent?.appartement?.commune ? " · " + esc(market.rent.appartement.commune) : ""}</small></h3>`;
      if (view.rent) {
        const r = view.rent;
        const rows = s.useLots
          ? s.lots.map((l) => {
              const h = r.housing.find((x) => x.lot === l);
              if (!h) return `<tr><td>${esc(l.label || l.type)} <small>${esc(l.type.toLowerCase())} · hors ANIL, voir le bail</small></td><td class="r">${num(toNum(l.surface), 2)} m²</td><td class="r">${euro(toNum(l.currentRent))}</td><td class="r">–</td><td class="r">–</td></tr>`;
              const m = h.ref.sqm * h.area;
              const g = h.rent ? h.rent / m - 1 : null;
              return `<tr><td>${esc(l.label || l.type)} <small>${l.status === "Vacant" ? "vacant" : "loué"}</small></td><td class="r">${num(h.area, 2)} m²</td><td class="r">${euro(h.rent)}</td><td class="r">${euro(m)}</td><td class="r ${g > 0.25 ? "lm-neg" : ""}">${g === null ? "–" : pct(g)}</td></tr>`;
            })
          : [`<tr><td>Votre bien</td><td class="r">${num(s.area)} m²</td><td class="r">${euro(s.rent)}</td><td class="r">${euro(r.marketTotal)}</td><td class="r ${r.gap > 0.25 ? "lm-neg" : ""}">${r.gap === null ? "–" : pct(r.gap)}</td></tr>`];
        html += `
          <div class="lm-table-wrap"><table class="lm-sheet lm-comps">
            <thead><tr><th></th><th class="r">Surface</th><th class="r">Loyer prévu</th><th class="r">Marché</th><th class="r">Écart</th></tr></thead>
            <tbody>${rows.join("")}</tbody>
          </table></div>
          <p class="lm-note">Repère ANIL : ${num(r.ref.sqm, 1)} €/m² (fourchette ${num(r.ref.low, 1)} – ${num(r.ref.high, 1)} €/m²), loyers d'annonce charges comprises, logement vide.${hasLocalLot(s) ? " Les locaux commerciaux ne sont pas comparés : vérifier la date de fin du bail, l'indexation et la solidité du locataire." : ""}</p>`;
      } else {
        html += `<p class="lm-note">Pas d'indicateur disponible pour cette commune.</p>`;
      }
      html += `</section>`;
    }

    if (market.dpe && market.dpe.total) {
      const d = market.dpe;
      const max = Math.max(...DPE_CLASSES.map((c) => d.counts[c]));
      html += `
        <section class="lm-block"><h3>Énergie du quartier <small>${num(d.total)} DPE dans un rayon de 500 m</small></h3>
          <div class="lm-dpe">${DPE_CLASSES.map(
            (c) => `<div class="lm-dpe-row"><span class="lm-dpe-${c}">${c}</span><div class="lm-bar"><i class="lm-dpe-${c}" style="width:${Math.max(2, (d.counts[c] / max) * 100)}%"></i></div><strong>${num((d.counts[c] / d.total) * 100)} %</strong></div>`
          ).join("")}</div>
          <p class="lm-note">${num(d.passoires * 100)} % de passoires thermiques (F et G) autour. ${d.passoires >= 0.15 ? "Beaucoup de logements à rénover : bon terrain pour la valeur ajoutée travaux LaMinière." : ""}</p>
        </section>`;
    }

    if (market.error) html += `<p class="lm-note lm-err">${esc(market.error)}</p>`;
    if (market.key) {
      html += `<p class="lm-sources">Sources : DVF (Cerema / DGFiP), carte des loyers (ANIL / Ministère du Logement), DPE (ADEME), Base Adresse Nationale. Données publiques, à vérifier avant envoi à la banque.</p>`;
    }
    host.innerHTML = html;

    // Repères sous les cases
    const hint = $("#sRentHint");
    if (hint) {
      if (view.rent && !s.useLots) {
        hint.innerHTML = `Marché : ${euro(view.rent.marketTotal)} <button type="button" class="lm-link" id="sUseRent">Prendre</button>`;
        $("#sUseRent")?.addEventListener("click", () => {
          $("#sRent").value = Math.round(view.rent.marketTotal);
          update();
        });
      } else hint.textContent = view.rent && s.useLots ? `Marché logements : ${euro(view.rent.marketTotal)}` : "";
    }
    renderLotsAnalysis(view);
    const priceHint = $("#sPriceHint");
    if (priceHint) priceHint.textContent = val?.retained ? `Valeur estimée : ${euro(val.retained)}` : "";
    const pnoHint = $("#sPnoHint");
    if (pnoHint) pnoHint.textContent = s.pno === null ? `auto : ${euro(ch.pnoYear)} (2 €/m²)` : "";
    const feeHint = $("#sFeeHint");
    if (feeHint) feeHint.textContent = s.feeAcq === null ? `auto 7 % : ${euro(toNum($("#analysisFeeOnPrice")?.value))}` : "";
    const feeWHint = $("#sFeeWorksHint");
    if (feeWHint) feeWHint.textContent = s.feeWorks === null ? `auto 7 % : ${euro(toNum($("#analysisFeeOnWorks")?.value))}` : "";
    const sum = $("#sChargesSummary");
    if (sum) sum.textContent = `${num(s.rate, 2)} % sur ${num(s.duration)} ans · notaire ${euro(toNum($("#analysisAcquisitionFees")?.value))} · charges ${euro(ch.monthly + ch.taxMonth + insMonth)} / mois`;
  }
  // Analyse écrite lot par lot, sous le loyer : loyer actuel, loyer de marché, valeur DVF, valeur par le loyer.
  function renderLotsAnalysis(view) {
    const host = $("#sLotsAnalysis");
    if (!host) return;
    const { s, val } = view;
    if (!s.useLots || !val || val.mode !== "lots") {
      host.innerHTML = s.useLots ? `<p class="lm-lots-hint">Cliquer sur Analyser pour obtenir la valeur lot par lot.</p>` : "";
      return;
    }
    const y = val.sectorYield;
    const rows = val.rows.map((r) => {
      const rent = toNum(r.lot.currentRent);
      const ref = r.lot.type === "Appartement" ? rentRefFor("appartement", r.surface) : null;
      const marketRent = ref ? ref.sqm * r.surface : null;
      const byRent = r.byRent || 0;
      const parts = [r.value, byRent].filter((x) => x > 0);
      const retained = parts.length ? parts.reduce((t, x) => t + x, 0) / parts.length : 0;
      return { r, rent, marketRent, byRent, retained };
    });
    const tot = (k) => rows.reduce((t, x) => t + (x[k] || 0), 0);
    host.innerHTML = `
      <div class="lm-lots-analysis">
        <div class="lm-subhead">Analyse lot par lot</div>
        <div class="lm-table-wrap"><table class="lm-sheet lm-lots-val">
          <thead><tr><th>Lot</th><th class="r">Loyer</th><th class="r">Marché</th><th class="r">Valeur m²</th><th class="r">Valeur loyer</th><th class="r">Retenue</th></tr></thead>
          <tbody>
            ${rows
              .map(
                (x) => `<tr><td>${esc(x.r.lot.label || x.r.lot.type)}<small>${esc(LOT_SHORT[x.r.lot.type] || x.r.lot.type)} · ${num(x.r.surface)} m²</small></td><td class="r">${euro(x.rent)}</td><td class="r">${x.marketRent ? euro(x.marketRent) : "bail"}</td><td class="r">${keuro(x.r.value)}</td><td class="r">${x.byRent ? keuro(x.byRent) : "–"}</td><td class="r"><strong>${keuro(x.retained)}</strong></td></tr>`
              )
              .join("")}
            <tr class="total"><td>Immeuble</td><td class="r">${euro(tot("rent"))}</td><td class="r">${view.rent ? euro(view.rent.marketTotal) : "–"}</td><td class="r">${keuro(val.byLots)}</td><td class="r">${val.byRent ? keuro(val.byRent) : "–"}</td><td class="r"><strong>${keuro(val.retained)}</strong></td></tr>
          </tbody>
        </table></div>
        <p class="lm-lots-verdict">Valeur globale estimée : <strong>${euro(val.retained)}</strong>${s.price ? ` pour un prix demandé de ${euro(s.price)} (${pct(view.priceGap || 0)}).` : "."}</p>
        <p class="lm-note">Valeur m² : prix DVF du type de lot × surface. Valeur loyer : loyer annuel ÷ rendement du secteur (${num(y * 100, 1)} % pour les logements${hasLocalLot(s) ? `, ${num((y + COMMERCIAL_PREMIUM) * 100, 1)} % pour un local commercial, plus risqué` : ""}). Marché : loyer ANIL des logements${hasLocalLot(s) ? ", le local se lit sur son bail" : ""}.</p>
      </div>`;
  }
  const hasLocalLot = (s) => s.useLots && s.lots.some((l) => l.type !== "Appartement");

  function update(opts) {
    pushToExpert();
    render(opts);
  }

  // Les lots demandent leurs propres groupes DVF (appartement, local...)
  function neededGroups(s) {
    if (s.useLots) return [...new Set(["appartement", ...s.lots.map((l) => LOT_TYPES[l.type] || "appartement")])];
    return [s.type === "maison" ? "maison" : "appartement"];
  }

  async function analyse() {
    const s = readSimple();
    if (!s.address) {
      toast("Renseigne l'adresse du bien.");
      $("#sAddress")?.focus();
      return;
    }
    pushToExpert();
    market.loading = true;
    market.error = "";
    render();
    try {
      let lat = Number($("#analysisLat")?.value);
      let lon = Number($("#analysisLon")?.value);
      let citycode = $("#analysisCitycode")?.value || "";
      const knownFor = $("#analysisLat")?.dataset.address;
      if (!lat || !lon || !citycode || knownFor !== s.address) {
        const g = await geocode(s.address);
        if (!g || g.score < 0.4) throw new Error("Adresse non reconnue : choisis-la dans la liste de suggestions.");
        lat = g.lat;
        lon = g.lon;
        citycode = g.citycode;
        setExpert("analysisLat", lat);
        setExpert("analysisLon", lon);
        setExpert("analysisCity", g.city);
        setExpert("analysisPostcode", g.postcode);
        setExpert("analysisCitycode", citycode);
      }
      if ($("#analysisLat")) $("#analysisLat").dataset.address = s.address;
      market.key = `${lat},${lon},${neededGroups(s).join("+")}`;
      const [dvf, rent, dpe, commune] = await Promise.allSettled([fetchDvfGroups(lat, lon, neededGroups(s)), fetchRent(citycode), fetchDpeAround(lat, lon), fetchCommune(citycode)]);
      market.dvf = dvf.status === "fulfilled" ? dvf.value : null;
      market.rent = rent.status === "fulfilled" ? rent.value : null;
      market.dpe = dpe.status === "fulfilled" ? dpe.value : null;
      market.commune = commune.status === "fulfilled" ? commune.value : null;
      const failed = [dvf.status === "rejected" && "ventes DVF", rent.status === "rejected" && "loyers", dpe.status === "rejected" && "DPE"].filter(Boolean);
      if (failed.length) market.error = `Source momentanément saturée ou indisponible : ${failed.join(", ")}. Relancer dans une minute.`;
      // Alimente le mode complet : prix secteur, population, et prix / loyers au m² des lots (avis de valeur)
      const appStats = groupStats(market.dvf?.byGroup.appartement);
      if (appStats) setExpert("analysisMarketPriceSqm", Math.round(appStats.median));
      if (market.commune?.population) setExpert("analysisPopulation", market.commune.population);
      if (s.useLots) {
        s.lots.forEach((l) => {
          const st = groupStats(market.dvf?.byGroup[LOT_TYPES[l.type] || "appartement"]);
          if (st && !toNum(l.saleSqm)) l.saleSqm = Math.round(st.median);
          const ref = l.type === "Appartement" ? rentRefFor("appartement", toNum(l.surface)) : null;
          if (ref && !toNum(l.rentSqm)) l.rentSqm = Math.round(ref.sqm * 10) / 10;
        });
        syncLotsExpert();
      }
      renderExpert();
    } catch (e) {
      market.error = e.message || "Erreur pendant l'analyse.";
    } finally {
      market.loading = false;
      render();
    }
  }

  // ---------- bascule simple / complet ----------
  function setMode(mode) {
    const simple = mode !== "complet";
    $("#lmSimple")?.classList.toggle("hidden", !simple);
    $("#lmExpert")?.classList.toggle("hidden", simple);
    document.querySelectorAll("[data-lm-mode]").forEach((b) => b.classList.toggle("active", b.dataset.lmMode === (simple ? "simple" : "complet")));
    try {
      localStorage.setItem("laminiereAnalyseMode", simple ? "simple" : "complet");
    } catch (e) {}
    if (simple) {
      pullFromExpert();
      update();
    } else renderExpert();
  }

  function onLotEdit(e) {
    const el = e.target.closest("[data-lot]");
    if (!el) return;
    const lot = lotsRef().find((l) => String(l.id) === el.dataset.lot);
    if (!lot) return;
    const f = el.dataset.f;
    lot[f] = ["surface", "currentRent"].includes(f) ? toNum(el.value) : el.value;
    if (f === "surface" || f === "type") lot.saleSqm = 0;
    syncLotsExpert();
    // Pendant la frappe on ne redessine pas le tableau des lots (le curseur reste en place)
    update({ keepLots: el.tagName === "INPUT" && e.type === "input" });
  }

  function init() {
    if (!$("#lmSimple")) return;
    let mode = "simple";
    try {
      mode = localStorage.getItem("laminiereAnalyseMode") || "simple";
    } catch (e) {}
    // Valeur par défaut de l'assurance de prêt (0,25 % du capital par an, profil prudent)
    if ($("#sInsuranceRate") && $("#sInsuranceRate").value === "") $("#sInsuranceRate").value = "0.25";
    document.querySelectorAll("[data-lm-mode]").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.lmMode)));
    const inputs = ["sArea", "sPrice", "sWorks", "sRent", "sContribution", "sRate", "sDuration", "sInsuranceRate", "sBankFees", "sFeeAcq", "sFeeWorks", "sFurniture", "sPropertyTax", "sPno", "sManagement", "sOtherCosts"];
    inputs.forEach((id) => $(`#${id}`)?.addEventListener("input", () => update()));
    $("#sDpe")?.addEventListener("change", () => update());
    $("#sDmto")?.addEventListener("change", () => update());
    // Si quelqu'un change les droits de mutation dans le mode complet, le mode simple suit.
    $("#analysisDmtoMode")?.addEventListener("change", (e) => $("#sDmto") && ($("#sDmto").value = e.target.value));
    $("#sType")?.addEventListener("change", () => {
      const s = readSimple();
      if (s.type === "immeuble" && !s.lots.length) {
        addLot("Local commercial");
        addLot("Appartement");
      }
      if (market.key) analyse();
      else update();
    });
    // Tableau des lots : saisie directe, comme dans Excel
    const lotsBody = $("#sLotsBody");
    lotsBody?.addEventListener("input", onLotEdit);
    lotsBody?.addEventListener("change", (e) => {
      if (e.target.tagName === "SELECT" || e.target.tagName === "INPUT") onLotEdit({ target: e.target, type: "change" });
    });
    lotsBody?.addEventListener("click", (e) => {
      const del = e.target.closest("[data-del-lot]");
      if (!del) return;
      const lots = lotsRef();
      const i = lots.findIndex((l) => String(l.id) === del.dataset.delLot);
      if (i >= 0) lots.splice(i, 1);
      syncLotsExpert();
      update();
    });
    $("#sAddLotApt")?.addEventListener("click", () => {
      addLot("Appartement");
      update();
    });
    $("#sAddLotCom")?.addEventListener("click", () => {
      addLot("Local commercial");
      update();
    });
    const addr = $("#sAddress");
    addr?.addEventListener("input", (e) => {
      clearTimeout(init.t);
      init.t = setTimeout(() => typeof window.fetchAddressSuggestions === "function" && window.fetchAddressSuggestions(e.target.value), 260);
    });
    addr?.addEventListener("change", () => {
      setExpert("analysisAddress", addr.value);
      if (typeof window.applySelectedAddress === "function") window.applySelectedAddress();
      analyse();
    });
    $("#sAnalyse")?.addEventListener("click", analyse);
    $("#sReset")?.addEventListener("click", () => {
      ["sAddress", "sArea", "sPrice", "sWorks", "sRent", "sContribution", "sFeeAcq", "sFeeWorks", "sPno"].forEach((id) => $(`#${id}`) && ($(`#${id}`).value = ""));
      ["sFurniture", "sManagement", "sOtherCosts"].forEach((id) => $(`#${id}`) && ($(`#${id}`).value = "0"));
      $("#sDpe").value = "";
      lotsRef().splice(0);
      syncLotsExpert();
      Object.assign(market, { key: "", dvf: null, rent: null, dpe: null, commune: null, error: "" });
      update();
    });
    // Entrée dans une case = analyser (réflexe Excel)
    $("#lmSimple").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.matches("input")) {
        e.preventDefault();
        analyse();
      }
    });
    setMode(mode);
  }

  // Exposé pour le bouton DVF des lots (mode complet)
  window.LMMarket = { fetchDvfAround, fetchDvfGroups, fetchRent, fetchDpeAround, median, refresh: () => render() };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
