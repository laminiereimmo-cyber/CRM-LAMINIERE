/* LaMinière CRM — Analyse simple + données marché (v22.6)
   Sources publiques, sans clé :
   - Ventes DVF : API DVF open data du Cerema (apidf-preprod.cerema.fr)
   - Loyers de marché : carte des loyers ANIL / DHUP 2025 (tabular-api.data.gouv.fr)
   - DPE : base ADEME des DPE logements existants (data.ademe.fr)
   - Adresse : Base Adresse Nationale (api-adresse.data.gouv.fr)
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

  const TYPES = {
    appartement: { label: "Appartement", codes: ["121"], asset: "Appartement ancien" },
    maison: { label: "Maison", codes: ["111"], asset: "Opération avec travaux" },
    immeuble: { label: "Immeuble / plusieurs logements", codes: ["122", "123", "112", "151", "152"], asset: "Petit immeuble de rapport" }
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
  const euro = (v) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(v || 0)) + " €";
  const num = (v, d = 0) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: d, minimumFractionDigits: d }).format(v || 0);
  const pct = (v, d = 0) => `${v > 0 ? "+" : ""}${num(v * 100, d)} %`;
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
  async function getJson(url, timeout = 20000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } finally {
      clearTimeout(timer);
    }
  }
  const toast = (msg, d) => (typeof window.showToast === "function" ? window.showToast(msg, d) : console.log(msg));

  // ---------- sources de données ----------
  async function geocode(address) {
    const data = await getJson(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(address)}&limit=1`, 8000);
    const f = data.features?.[0];
    if (!f) return null;
    const [lon, lat] = f.geometry.coordinates;
    return { lat, lon, city: f.properties.city || "", postcode: f.properties.postcode || "", citycode: f.properties.citycode || "", label: f.properties.label, score: f.properties.score || 0 };
  }

  async function fetchDvfAround(lat, lon, typeKey) {
    const type = TYPES[typeKey] || TYPES.appartement;
    const thisYear = new Date().getFullYear();
    const years = [0, 1, 2, 3, 4, 5].map((i) => thisYear - i);
    const codeFilter = type.codes.length === 1 ? `&codtypbien=${type.codes[0]}` : "";
    for (const radius of [500, 1000, 2000]) {
      const dLat = radius / 111320;
      const dLon = radius / (111320 * Math.cos((lat * Math.PI) / 180));
      const bbox = [lon - dLon, lat - dLat, lon + dLon, lat + dLat].map((v) => v.toFixed(5)).join(",");
      // Une requête par année : l'API ne trie pas par date et plafonne à 500 résultats.
      const pages = await Promise.all(
        years.map((y) => getJson(`${DVF_URL}?in_bbox=${bbox}&anneemut_min=${y}&anneemut_max=${y}&page_size=500${codeFilter}`, 30000).catch(() => null))
      );
      if (pages.every((p) => p === null)) throw new Error("DVF indisponible");
      const sales = pages
        .filter(Boolean)
        .flatMap((data) => data.features || [])
        .map((f) => {
          const p = f.properties || {};
          const value = Number(p.valeurfonc);
          const surface = Number(p.sbati);
          const c = centroid(f.geometry);
          if (p.libnatmut !== "Vente" || !value || !surface || surface < 9 || !c) return null;
          if (!type.codes.includes(String(p.codtypbien))) return null;
          const sqm = value / surface;
          if (sqm < 300 || sqm > 15000) return null;
          const dist = distanceM(lat, lon, c.lat, c.lon);
          if (dist > radius * 1.05) return null;
          return { date: p.datemut, year: Number(p.anneemut), type: p.libtypbien, value, surface, sqm, dist, lots: Number(p.nblocmut || 0) };
        })
        .filter(Boolean);
      if (sales.length >= 8 || radius === 2000) return { radius, sales };
    }
    return { radius: 2000, sales: [] };
  }

  async function fetchRent(citycode) {
    if (!citycode) return null;
    const entries = await Promise.all(
      Object.entries(LOYERS_RESOURCES).map(async ([k, rid]) => {
        try {
          const data = await getJson(`${LOYERS_URL}${rid}/data/?INSEE_C__exact=${encodeURIComponent(citycode)}`, 12000);
          const row = data.data?.[0];
          if (!row) return [k, null];
          return [k, { sqm: Number(row.loypredm2), low: Number(row["lwr.IPm2"]), high: Number(row["upr.IPm2"]), commune: row.LIBGEO, precise: row.TYPPRED === "commune", obs: Number(row.nbobs_com || 0) }];
        } catch (e) {
          return [k, null];
        }
      })
    );
    const out = Object.fromEntries(entries);
    return Object.values(out).some(Boolean) ? out : null;
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

  // ---------- état du formulaire simple ----------
  function readSimple() {
    const n = (id) => Number(($(`#${id}`)?.value || "").toString().replace(/\s/g, "").replace(",", ".")) || 0;
    return {
      address: $("#sAddress")?.value.trim() || "",
      type: $("#sType")?.value || "appartement",
      area: n("sArea"),
      price: n("sPrice"),
      works: n("sWorks"),
      rent: n("sRent"),
      dpe: $("#sDpe")?.value || "",
      contribution: $("#sContribution")?.value === "" ? null : n("sContribution")
    };
  }

  function setExpert(id, value, manual) {
    const el = $(`#${id}`);
    if (!el) return;
    el.value = value;
    if (manual !== undefined) el.dataset.manual = manual ? "true" : "false";
  }

  // Le mode simple pilote les champs du mode complet : exports PDF, mandat, client restent valables.
  function pushToExpert() {
    const s = readSimple();
    setExpert("analysisAddress", s.address);
    setExpert("analysisArea", s.area);
    setExpert("analysisPrice", s.price);
    setExpert("analysisWorks", s.works);
    setExpert("analysisRent", s.rent);
    if (s.contribution === null) setExpert("analysisContribution", 0, false);
    else setExpert("analysisContribution", s.contribution, true);
    const asset = $("#analysisAsset");
    if (asset) asset.value = TYPES[s.type]?.asset || asset.value;
    if (typeof window.renderAnalysis === "function") window.renderAnalysis();
  }

  function pullFromExpert() {
    const v = (id) => $(`#${id}`)?.value || "";
    if ($("#sAddress") && !$("#sAddress").value) $("#sAddress").value = v("analysisAddress");
    if ($("#sArea")) $("#sArea").value = v("analysisArea");
    if ($("#sPrice")) $("#sPrice").value = v("analysisPrice");
    if ($("#sWorks")) $("#sWorks").value = v("analysisWorks");
    if ($("#sRent")) $("#sRent").value = v("analysisRent");
    const contrib = $("#analysisContribution");
    if ($("#sContribution")) $("#sContribution").value = contrib?.dataset.manual === "true" ? contrib.value : "";
    const asset = v("analysisAsset");
    if ($("#sType")) $("#sType").value = /immeuble/i.test(asset) ? "immeuble" : /appartement|colocation/i.test(asset) ? "appartement" : $("#sType").value;
  }

  // ---------- calcul du verdict ----------
  function computeView() {
    const s = readSimple();
    const a = window.lastAnalysis || {};
    const view = { s, a, checks: [] };

    // Prix vs marché (DVF)
    if (market.dvf && market.dvf.sales.length >= 3 && s.area) {
      const recent = market.dvf.sales.filter((x) => x.year >= new Date().getFullYear() - 3);
      const base = recent.length >= 5 ? recent : market.dvf.sales;
      const sqms = base.map((x) => x.sqm);
      const med = median(sqms);
      view.price = { median: med, q1: quantile(sqms, 0.25), q3: quantile(sqms, 0.75), count: base.length, period: base === recent ? "3 dernières années" : "5 dernières années", askSqm: s.price / s.area, estimate: med * s.area };
      view.price.gap = med ? view.price.askSqm / med - 1 : 0;
      const g = view.price.gap;
      view.checks.push({
        key: "prix",
        label: "Prix vs marché",
        level: g <= 0.05 ? "green" : g <= 0.15 ? "orange" : "red",
        value: pct(g),
        text: g <= -0.1 ? "Nettement sous les ventes du secteur : vérifier pourquoi (état, travaux, nuisances)." : g <= 0.05 ? "Dans les prix du secteur." : g <= 0.15 ? "Un peu au-dessus du marché : marge de négociation." : "Au-dessus du marché : à négocier fermement."
      });
    } else {
      view.checks.push({ key: "prix", label: "Prix vs marché", level: "grey", value: "–", text: market.dvf ? "Pas assez de ventes comparables autour." : "Cliquer sur Analyser pour charger les ventes DVF." });
    }

    // Loyer vs marché (ANIL)
    const rentRef = market.rent && (s.type === "maison" ? market.rent.maison : s.type === "appartement" && s.area && s.area < 45 ? market.rent.appartement12 || market.rent.appartement : s.type === "appartement" && s.area >= 60 ? market.rent.appartement3 || market.rent.appartement : market.rent.appartement);
    if (rentRef && s.area) {
      view.rent = { ...rentRef, market: rentRef.sqm * s.area, low: rentRef.low * s.area, high: rentRef.high * s.area };
      view.rent.gap = s.rent ? s.rent / view.rent.market - 1 : null;
      const g = view.rent.gap;
      view.checks.push({
        key: "loyer",
        label: "Loyer vs marché",
        level: g === null ? "grey" : g <= 0.1 ? "green" : g <= 0.25 ? "orange" : "red",
        value: g === null ? "–" : pct(g),
        text: g === null ? "Renseigner le loyer prévu." : g <= 0.1 ? "Loyer réaliste pour la commune." : g <= 0.25 ? "Loyer ambitieux : se justifie en meublé ou colocation, à prouver par des annonces." : "Loyer très au-dessus du marché : risque de vacance, revoir à la baisse."
      });
    } else {
      view.checks.push({ key: "loyer", label: "Loyer vs marché", level: "grey", value: "–", text: market.rent === null && market.key ? "Pas d'indicateur de loyer pour cette commune." : "Cliquer sur Analyser pour charger le loyer de marché." });
    }

    // Cashflow
    if (a.cashflow !== undefined && s.price) {
      const c = a.cashflow;
      view.checks.push({
        key: "cash",
        label: "Cashflow / mois",
        level: c >= 0 ? "green" : c >= -150 ? "orange" : "red",
        value: euro(c),
        text: c >= 0 ? "L'opération s'autofinance avant impôts." : c >= -150 ? "Léger effort d'épargne chaque mois." : "Effort mensuel important : ajuster prix, travaux ou loyer."
      });
    }

    // DPE
    if (s.dpe && DPE_RULES[s.dpe]) {
      const r = DPE_RULES[s.dpe];
      view.checks.push({ key: "dpe", label: "DPE du bien", level: r.level, value: s.dpe, text: r.text });
    } else {
      view.checks.push({ key: "dpe", label: "DPE du bien", level: "grey", value: "?", text: "DPE inconnu : le demander à l'agence avant toute offre." });
    }

    const reds = view.checks.filter((c) => c.level === "red").length;
    const oranges = view.checks.filter((c) => c.level === "orange").length;
    view.verdict = reds >= 2 ? { level: "red", label: "À éviter en l'état" } : reds === 1 ? { level: "orange", label: "Possible, mais un point bloque" } : oranges >= 2 ? { level: "orange", label: "Intéressant, à négocier" } : { level: "green", label: "Bon dossier à creuser" };
    if (view.checks.every((c) => c.level === "grey")) view.verdict = { level: "grey", label: "Remplir les cases puis Analyser" };
    return view;
  }

  // ---------- affichage ----------
  function trendHtml(sales) {
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
        <div class="lm-subhead">Évolution du prix médian au m² <small>${rows[0].y} → ${rows[rows.length - 1].y} : <strong>${pct(last / first - 1)}</strong></small></div>
        ${rows
          .map(
            (r) => `<div class="lm-bar-row"><span>${r.y}</span><div class="lm-bar"><i style="width:${Math.max(6, (r.m / max) * 100)}%"></i></div><strong>${num(r.m)} €/m²</strong><small>${r.n} ventes</small></div>`
          )
          .join("")}
      </div>`;
  }

  function comparablesHtml(view) {
    const s = view.s;
    const ref = view.price?.median || median(market.dvf.sales.map((x) => x.sqm));
    const list = market.dvf.sales
      .filter((x) => x.sqm >= ref * 0.5 && x.sqm <= ref * 1.8)
      .map((x) => ({ ...x, score: (s.area ? Math.abs(x.surface - s.area) / s.area : 0) + x.dist / market.dvf.radius + (new Date().getFullYear() - x.year) * 0.08 }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 8)
      .sort((a, b) => (a.date < b.date ? 1 : -1));
    if (!list.length) return "";
    return `
      <div class="lm-subhead">Ventes réelles les plus proches de votre bien</div>
      <div class="lm-table-wrap"><table class="lm-sheet lm-comps">
        <thead><tr><th>Date</th><th>Bien</th><th class="r">Surface</th><th class="r">Prix</th><th class="r">€/m²</th><th class="r">Distance</th></tr></thead>
        <tbody>${list
          .map(
            (x) => `<tr><td>${new Date(x.date).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}</td><td>${esc(x.type.toLowerCase())}</td><td class="r">${num(x.surface)} m²</td><td class="r">${euro(x.value)}</td><td class="r">${num(x.sqm)}</td><td class="r">${num(x.dist)} m</td></tr>`
          )
          .join("")}</tbody>
      </table></div>`;
  }

  function render() {
    const host = $("#lmSimpleResults");
    if (!host) return;
    const view = computeView();
    const { s, a } = view;
    const dot = (lvl) => `<span class="lm-dot lm-${lvl}"></span>`;

    const financeRows = a.price
      ? [
          ["Loyer encaissé", a.rent, a.rent * 12, ""],
          ["Mensualité crédit + assurance", -a.creditWithInsurance, -a.creditWithInsurance * 12, ""],
          ["Charges + taxe foncière", -a.operatingCosts, -a.operatingCosts * 12, ""],
          ["Cashflow avant impôts", a.cashflow, a.cashflow * 12, "total"]
        ]
      : [];

    let html = `
      <div class="lm-verdict lm-${view.verdict.level}">
        <div><small>Verdict</small><strong>${esc(view.verdict.label)}</strong></div>
        ${market.loading ? `<span class="lm-loading">Chargement des données marché…</span>` : ""}
      </div>
      <div class="lm-checks">
        ${view.checks
          .map(
            (c) => `<div class="lm-check">${dot(c.level)}<div><span>${esc(c.label)}</span><strong>${esc(c.value)}</strong><small>${esc(c.text)}</small></div></div>`
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
            ${financeRows.map(([l, m, y, cls]) => `<tr class="${cls}"><td>${l}</td><td class="r ${m < 0 ? "lm-neg" : ""}">${euro(m)}</td><td class="r ${y < 0 ? "lm-neg" : ""}">${euro(y)}</td></tr>`).join("")}
          </tbody>
        </table></div>
        <div class="lm-table-wrap"><table class="lm-sheet lm-kv">
          <tbody>
            <tr><td>Coût total du projet <small>(frais, honoraires, travaux compris)</small></td><td class="r">${euro(a.totalCost)}</td></tr>
            <tr><td>Apport</td><td class="r">${euro(a.contribution)}</td></tr>
            <tr><td>Montant emprunté</td><td class="r">${euro(a.borrowedCapital)}</td></tr>
            <tr><td>Rendement brut</td><td class="r">${num(a.grossYield, 1)} %</td></tr>
            ${a.metrics && a.contribution > 0 && Number.isFinite(a.metrics.irr) ? `<tr><td>TRI sur ${a.metrics.years} ans <small>(revente comprise, avant impôts)</small></td><td class="r">${num(a.metrics.irr * 100, 1)} %</td></tr>` : ""}
          </tbody>
        </table></div>
        <p class="lm-note">Taux, durée, charges et honoraires : réglables dans le mode complet.</p>
      </section>`;
    }

    if (market.dvf) {
      html += `<section class="lm-block"><h3>Prix du marché <small>ventes réelles DVF · rayon ${num(market.dvf.radius)} m</small></h3>`;
      if (view.price) {
        const p = view.price;
        html += `
          <div class="lm-table-wrap"><table class="lm-sheet lm-kv"><tbody>
            <tr><td>Prix médian au m² du secteur <small>${p.count} ventes, ${p.period}</small></td><td class="r">${num(p.median)} €/m²</td></tr>
            <tr><td>Fourchette courante <small>(la moitié des ventes)</small></td><td class="r">${num(p.q1)} – ${num(p.q3)} €/m²</td></tr>
            <tr><td>Votre prix au m²</td><td class="r"><strong>${num(p.askSqm)} €/m²</strong></td></tr>
            <tr><td>Valeur marché estimée pour ${num(s.area)} m²</td><td class="r">${euro(p.estimate)}</td></tr>
            <tr class="total"><td>Écart avec le prix demandé</td><td class="r ${p.gap > 0.05 ? "lm-neg" : ""}">${euro(s.price - p.estimate)} (${pct(p.gap)})</td></tr>
          </tbody></table></div>
          ${trendHtml(market.dvf.sales)}
          ${comparablesHtml(view)}`;
      } else {
        html += `<p class="lm-note">Moins de 3 ventes de ce type trouvées dans un rayon de 2 km. Vérifier à la main sur <a href="https://explore.data.gouv.fr/fr/immobilier?onglet=carte" target="_blank" rel="noreferrer">la carte DVF</a>.</p>`;
      }
      html += `</section>`;
    }

    if (market.key) {
      html += `<section class="lm-block"><h3>Loyer du marché <small>carte des loyers ANIL 2025${market.rent?.appartement?.commune ? " · " + esc(market.rent.appartement.commune) : ""}</small></h3>`;
      if (view.rent) {
        const r = view.rent;
        html += `
          <div class="lm-table-wrap"><table class="lm-sheet lm-kv"><tbody>
            <tr><td>Loyer de marché au m² <small>${r.precise ? "calculé sur la commune" : "commune peu dense : estimé sur le secteur"}</small></td><td class="r">${num(r.sqm, 1)} €/m²</td></tr>
            <tr><td>Loyer de marché pour ${num(s.area)} m²</td><td class="r"><strong>${euro(r.market)}</strong> / mois</td></tr>
            <tr><td>Fourchette</td><td class="r">${euro(r.low)} – ${euro(r.high)}</td></tr>
            <tr class="total"><td>Votre loyer prévu</td><td class="r ${r.gap > 0.25 ? "lm-neg" : ""}">${s.rent ? `${euro(s.rent)} (${pct(r.gap)})` : "à renseigner"}</td></tr>
          </tbody></table></div>
          <p class="lm-note">Loyers d'annonce, charges comprises, logement vide. Un meublé ou une colocation se loue plus cher.</p>`;
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
            (c) => `<div class="lm-dpe-row ${s.dpe === c ? "is-current" : ""}"><span class="lm-dpe-${c}">${c}</span><div class="lm-bar"><i class="lm-dpe-${c}" style="width:${Math.max(2, (d.counts[c] / max) * 100)}%"></i></div><strong>${num((d.counts[c] / d.total) * 100)} %</strong></div>`
          ).join("")}</div>
          <p class="lm-note">${num(d.passoires * 100)} % de passoires thermiques (F et G) autour. ${d.passoires >= 0.15 ? "Beaucoup de logements à rénover : bon terrain pour la valeur ajoutée travaux LaMinière." : ""}</p>
        </section>`;
    }

    if (market.error) html += `<p class="lm-note lm-err">${esc(market.error)}</p>`;
    if (market.key) {
      html += `<p class="lm-sources">Sources : DVF (Cerema / DGFiP), carte des loyers (ANIL / Ministère du Logement), DPE (ADEME), Base Adresse Nationale. Données publiques, à vérifier avant envoi à la banque.</p>`;
    }
    host.innerHTML = html;

    // Suggestion de loyer
    const hint = $("#sRentHint");
    if (hint) {
      if (view.rent) {
        hint.innerHTML = `Marché : ${euro(view.rent.market)} <button type="button" class="lm-link" id="sUseRent">Prendre</button>`;
        $("#sUseRent")?.addEventListener("click", () => {
          $("#sRent").value = Math.round(view.rent.market);
          update();
        });
      } else hint.textContent = "";
    }
    const priceHint = $("#sPriceHint");
    if (priceHint) priceHint.textContent = view.price ? `Marché : ${euro(view.price.estimate)}` : "";
  }

  function update() {
    pushToExpert();
    render();
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
      market.key = `${lat},${lon},${s.type}`;
      const [dvf, rent, dpe, commune] = await Promise.allSettled([fetchDvfAround(lat, lon, s.type), fetchRent(citycode), fetchDpeAround(lat, lon), fetchCommune(citycode)]);
      market.dvf = dvf.status === "fulfilled" ? dvf.value : null;
      market.rent = rent.status === "fulfilled" ? rent.value : null;
      market.dpe = dpe.status === "fulfilled" ? dpe.value : null;
      market.commune = commune.status === "fulfilled" ? commune.value : null;
      const failed = [dvf.status === "rejected" && "ventes DVF", rent.status === "rejected" && "loyers", dpe.status === "rejected" && "DPE"].filter(Boolean);
      if (failed.length) market.error = `Source indisponible pour le moment : ${failed.join(", ")}. Relancer dans quelques minutes.`;
      // Alimente les indicateurs secteur du mode complet
      if (market.dvf?.sales.length) setExpert("analysisMarketPriceSqm", Math.round(median(market.dvf.sales.map((x) => x.sqm))));
      if (market.commune?.population) setExpert("analysisPopulation", market.commune.population);
      if (typeof window.renderAnalysis === "function") window.renderAnalysis();
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
      render();
    } else if (typeof window.renderAnalysis === "function") window.renderAnalysis();
  }

  function init() {
    if (!$("#lmSimple")) return;
    let mode = "simple";
    try {
      mode = localStorage.getItem("laminiereAnalyseMode") || "simple";
    } catch (e) {}
    document.querySelectorAll("[data-lm-mode]").forEach((b) => b.addEventListener("click", () => setMode(b.dataset.lmMode)));
    ["sArea", "sPrice", "sWorks", "sRent", "sContribution"].forEach((id) => $(`#${id}`)?.addEventListener("input", update));
    ["sType", "sDpe"].forEach((id) =>
      $(`#${id}`)?.addEventListener("change", () => {
        if (id === "sType" && market.key) analyse();
        else update();
      })
    );
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
      ["sAddress", "sArea", "sPrice", "sWorks", "sRent", "sContribution"].forEach((id) => ($(`#${id}`).value = ""));
      $("#sDpe").value = "";
      Object.assign(market, { key: "", dvf: null, rent: null, dpe: null, commune: null, error: "" });
      update();
    });
    // Enter dans une case = analyser (réflexe Excel)
    $("#lmSimple").addEventListener("keydown", (e) => {
      if (e.key === "Enter" && e.target.matches("input")) {
        e.preventDefault();
        analyse();
      }
    });
    setMode(mode);
  }

  // Exposé pour le bouton DVF des lots (mode complet)
  window.LMMarket = { fetchDvfAround, fetchRent, fetchDpeAround, median, refresh: render };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
