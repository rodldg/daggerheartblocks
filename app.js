"use strict";

const APP_VERSION = 2;
const AUTOSAVE_KEY = "forja-daggerheart-autosave-v1";
const LIBRARY_KEY = "forja-daggerheart-library-v1";
const MAX_IMPULSES = 20;
const MAX_FEATURES = 30;
const MAX_POTENTIAL_ADVERSARIES = 20;
const MAX_EXPERIENCES = 12;
const MAX_INGREDIENTS = 10;
const MAX_INGREDIENT_FLAVORS = 3;
const LOGICAL_WIDTH = 1120;

const FLAVORS = [
  { name: "Dulce", die: "d4" },
  { name: "Salado", die: "d6" },
  { name: "Amargo", die: "d8" },
  { name: "Ácido", die: "d10" },
  { name: "Umami", die: "d12" },
  { name: "Raro", die: "d20" },
];

const PALETTE = {
  background: "#d7d0c4",
  paper: "#fbf7ef",
  paperAlt: "#f2ecf6",
  ink: "#20222b",
  muted: "#656474",
  deep: "#252735",
  plum: "#5d406f",
  violet: "#8161a7",
  violetDark: "#55396d",
  violetPale: "#eee7f5",
  gold: "#c7a05e",
  goldPale: "#f2e5c9",
  red: "#954e53",
  line: "#d5cdbf",
  white: "#ffffff",
};

const EXAMPLES = {
  environment: {
    kind: "environment",
    title: "Arboleda abandonada",
    tier: 1,
    type: "Exploración",
    description: "Una antigua arboleda druídica, abandonada durante años y reclamada por completo por la naturaleza.",
    impulses: ["Atraer a los curiosos", "Hacer eco del pasado"],
    difficulty: 11,
    potentialAdversaries: [
      "Bestias: oso, lobo terrible o serpiente de cristal",
      "Guardianes: treant menor, soldado silvano o dríada joven",
    ],
    features: [
      {
        name: "Campo de batalla cubierto",
        type: "Pasiva",
        text: "Aquí ocurrió una batalla. Un PJ puede realizar una tirada de Instinto para identificar pruebas del combate. Con Esperanza descubre toda la historia; con Miedo descubre parte de ella y la escena responde a su curiosidad.",
        bullets: [
          "Armas rotas, ramas partidas y surcos cubren el suelo.",
          "Un tronco cubierto de musgo es, en realidad, el cadáver de un treant.",
          "Los árboles que siguen en pie están retorcidos por una magia poderosa.",
        ],
      },
      {
        name: "Enredaderas con espinas",
        type: "Acción",
        text: "Elige un punto dentro de la arboleda. Todas las criaturas a alcance Muy Cerca deben superar una tirada de Reacción de Agilidad o sufrir 1d8+3 de daño físico y quedar Restringidas.",
        bullets: [],
      },
      {
        name: "No son bienvenidos",
        type: "Acción",
        text: "Aparecen una dríada joven, dos soldados silvanos y tantos treants menores como PJ haya, para enfrentar a los intrusos.",
        bullets: [],
      },
    ],
    imageDataUrl: "",
    imageName: "",
    imageHeight: 340,
    imageZoom: 1,
    imagePositionX: 50,
    imagePositionY: 50,
    currentId: null,
  },
  adversary: {
    kind: "adversary",
    title: "Excavador ácido",
    tier: 1,
    type: "Solitario",
    description: "Un insecto del tamaño de un caballo, provisto de garras excavadoras y sangre intensamente ácida.",
    motives: ["Excavar", "Arrastrar", "Alimentarse", "Reposicionarse"],
    difficulty: 14,
    thresholds: { major: 8, severe: 15 },
    hp: 8,
    stress: 3,
    attackModifier: 3,
    attack: { name: "Garras", range: "Muy Cerca", damage: "1d12+2 físico" },
    experiences: [{ name: "Sentido sísmico", modifier: 2 }],
    ingredients: [
      {
        name: "Saco ácido del excavador",
        flavors: [
          { flavor: "Ácido", potency: 2 },
          { flavor: "Umami", potency: 1 },
          { flavor: "Raro", potency: 1 },
        ],
        feature: {
          name: "Catalizador corrosivo",
          text: "Al usar este ingrediente, puedes reducir en 1 la dificultad de una prueba de cocina relacionada con conservar, ablandar o disolver.",
        },
      },
      {
        name: "Carne de madriguera",
        flavors: [
          { flavor: "Salado", potency: 1 },
          { flavor: "Umami", potency: 2 },
        ],
        feature: { name: "", text: "" },
      },
    ],
    features: [
      {
        name: "Implacable (3)",
        type: "Pasiva",
        text: "El Excavador puede recibir el foco hasta tres veces por turno del DJ. Gasta Miedo de la forma habitual.",
        bullets: [],
      },
      {
        name: "Erupción de tierra",
        type: "Acción",
        text: "Marca 1 Estrés para que el Excavador irrumpa desde el subsuelo. Todas las criaturas a alcance Muy Cerca deben superar una tirada de Reacción de Agilidad o caer derribadas y quedar Vulnerables hasta su próxima acción.",
        bullets: [],
      },
      {
        name: "Escupitajo ácido",
        type: "Acción",
        text: "Realiza un ataque contra todos los objetivos frente al Excavador a alcance Cerca. Quienes reciban daño sufren 2d6 de daño físico y deben marcar una ranura de Armadura sin obtener sus beneficios.",
        bullets: [],
      },
      {
        name: "Baño ácido",
        type: "Reacción",
        text: "Cuando el Excavador recibe daño Severo, todas las criaturas a alcance Cerca reciben 1d10 de daño físico. El área queda cubierta de sangre ácida y atravesarla inflige 1d6 de daño físico.",
        bullets: [],
      },
    ],
    imageDataUrl: "",
    imageName: "",
    imageHeight: 340,
    imageZoom: 1,
    imagePositionX: 50,
    imagePositionY: 50,
    currentId: null,
  },
};

const EMPTY = {
  environment: {
    ...structuredClone(EXAMPLES.environment),
    title: "Nuevo ambiente",
    type: "Exploración",
    description: "",
    impulses: [""],
    potentialAdversaries: [""],
    features: [{ name: "", type: "Pasiva", text: "", bullets: [] }],
  },
  adversary: {
    ...structuredClone(EXAMPLES.adversary),
    title: "Nuevo adversario",
    type: "Solitario",
    description: "",
    motives: [""],
    experiences: [{ name: "", modifier: 2 }],
    ingredients: [],
    features: [{ name: "", type: "Pasiva", text: "", bullets: [] }],
  },
};

let appState = loadAutosave();
let activeKind = appState.activeKind || "environment";
let renderToken = 0;
let imageCache = { src: null, image: null };
let pendingConfirm = null;
let autosaveTimer = null;

const editorForm = document.getElementById("editorForm");
const statblockCanvas = document.getElementById("statblockCanvas");
const exportScaleSelect = document.getElementById("exportScale");
const previewMeta = document.getElementById("previewMeta");
const jsonFileInput = document.getElementById("jsonFileInput");
const libraryDialog = document.getElementById("libraryDialog");
const libraryList = document.getElementById("libraryList");
const confirmDialog = document.getElementById("confirmDialog");
const confirmTitle = document.getElementById("confirmTitle");
const confirmMessage = document.getElementById("confirmMessage");
const toastRegion = document.getElementById("toastRegion");

init();

function init() {
  normalizeAppState();
  bindGlobalEvents();
  renderKindSwitch();
  renderEditor();
  schedulePreview();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
  }
}

function defaultAppState() {
  return {
    version: APP_VERSION,
    activeKind: "environment",
    drafts: {
      environment: structuredClone(EXAMPLES.environment),
      adversary: structuredClone(EXAMPLES.adversary),
    },
  };
}

function loadAutosave() {
  try {
    const raw = localStorage.getItem(AUTOSAVE_KEY);
    if (!raw) return defaultAppState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return defaultAppState();
    return parsed;
  } catch {
    return defaultAppState();
  }
}

function normalizeAppState() {
  const fallback = defaultAppState();
  appState.version = APP_VERSION;
  if (!appState.drafts || typeof appState.drafts !== "object") appState.drafts = fallback.drafts;
  appState.drafts.environment = normalizeDraft(appState.drafts.environment, "environment");
  appState.drafts.adversary = normalizeDraft(appState.drafts.adversary, "adversary");
  activeKind = appState.activeKind === "adversary" ? "adversary" : "environment";
  appState.activeKind = activeKind;
}

function normalizeDraft(raw, kind) {
  const base = structuredClone(EXAMPLES[kind]);
  const value = raw && typeof raw === "object" ? raw : {};
  const draft = { ...base, ...value, kind };
  draft.title = stringValue(draft.title).slice(0, 80) || (kind === "environment" ? "Nuevo ambiente" : "Nuevo adversario");
  draft.type = stringValue(draft.type).slice(0, 60);
  draft.description = stringValue(draft.description).slice(0, 200);
  draft.tier = numericValue(draft.tier, 1, 1, 4);
  draft.difficulty = numericValue(draft.difficulty, 10, 0, 99);
  draft.imageDataUrl = stringValue(draft.imageDataUrl);
  draft.imageName = stringValue(draft.imageName);
  draft.imageHeight = numericValue(draft.imageHeight, 340, 220, 520);
  draft.imageZoom = numericValue(draft.imageZoom, 1, 1, 2.5);
  draft.imagePositionX = numericValue(draft.imagePositionX, 50, 0, 100);
  draft.imagePositionY = numericValue(draft.imagePositionY, 50, 0, 100);
  draft.features = arrayValue(draft.features).slice(0, MAX_FEATURES).map((feature) => ({
    name: stringValue(feature?.name).slice(0, 90),
    type: stringValue(feature?.type).slice(0, 30) || "Pasiva",
    text: stringValue(feature?.text).slice(0, 1600),
    bullets: arrayValue(feature?.bullets).map((item) => stringValue(item).slice(0, 240)).filter(Boolean).slice(0, 12),
  }));
  if (!draft.features.length) draft.features = [{ name: "", type: "Pasiva", text: "", bullets: [] }];

  if (kind === "environment") {
    draft.impulses = arrayValue(draft.impulses).map((item) => stringValue(item).slice(0, 100)).slice(0, MAX_IMPULSES);
    if (!draft.impulses.length) draft.impulses = [""];
    draft.potentialAdversaries = arrayValue(draft.potentialAdversaries).map((item) => stringValue(item).slice(0, 180)).slice(0, MAX_POTENTIAL_ADVERSARIES);
    if (!draft.potentialAdversaries.length) draft.potentialAdversaries = [""];
  } else {
    draft.motives = arrayValue(draft.motives).map((item) => stringValue(item).slice(0, 100)).slice(0, MAX_IMPULSES);
    if (!draft.motives.length) draft.motives = [""];
    draft.thresholds = {
      major: numericValue(draft.thresholds?.major, 8, 0, 99),
      severe: numericValue(draft.thresholds?.severe, 15, 0, 99),
    };
    draft.hp = numericValue(draft.hp, 6, 0, 99);
    draft.stress = numericValue(draft.stress, 3, 0, 99);
    draft.attackModifier = numericValue(draft.attackModifier, 2, -20, 20);
    draft.attack = {
      name: stringValue(draft.attack?.name).slice(0, 80),
      range: stringValue(draft.attack?.range).slice(0, 60),
      damage: stringValue(draft.attack?.damage).slice(0, 100),
    };
    draft.experiences = arrayValue(draft.experiences).slice(0, MAX_EXPERIENCES).map((item) => ({
      name: stringValue(item?.name).slice(0, 100),
      modifier: numericValue(item?.modifier, 2, -20, 20),
    }));
    if (!draft.experiences.length) draft.experiences = [{ name: "", modifier: 2 }];
    const rawIngredients = Object.prototype.hasOwnProperty.call(value, "ingredients") ? value.ingredients : [];
    draft.ingredients = arrayValue(rawIngredients).slice(0, MAX_INGREDIENTS).map((item) => normalizeIngredient(item));
  }
  return draft;
}

function normalizeIngredient(raw) {
  const item = raw && typeof raw === "object" ? raw : {};
  const seen = new Set();
  const flavors = arrayValue(item.flavors)
    .map((entry) => {
      const requested = stringValue(entry?.flavor);
      const flavor = FLAVORS.some((option) => option.name === requested) ? requested : "Dulce";
      return { flavor, potency: numericValue(entry?.potency, 1, 1, 3) };
    })
    .filter((entry) => {
      if (seen.has(entry.flavor)) return false;
      seen.add(entry.flavor);
      return true;
    })
    .slice(0, MAX_INGREDIENT_FLAVORS);
  if (!flavors.length) flavors.push({ flavor: "Dulce", potency: 1 });
  return {
    name: stringValue(item.name).slice(0, 100),
    flavors,
    feature: {
      name: stringValue(item.feature?.name).slice(0, 90),
      text: stringValue(item.feature?.text).slice(0, 700),
    },
  };
}

function createEmptyIngredient() {
  return {
    name: "",
    flavors: [{ flavor: "Dulce", potency: 1 }],
    feature: { name: "", text: "" },
  };
}

function stringValue(value) { return value == null ? "" : String(value); }
function arrayValue(value) { return Array.isArray(value) ? value : []; }
function numericValue(value, fallback, min, max) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
}
function currentDraft() { return appState.drafts[activeKind]; }

function bindGlobalEvents() {
  document.querySelectorAll("[data-kind]").forEach((button) => {
    button.addEventListener("click", () => switchKind(button.dataset.kind));
  });

  document.querySelectorAll("[data-global-action]").forEach((button) => {
    button.addEventListener("click", () => handleGlobalAction(button.dataset.globalAction));
  });

  editorForm.addEventListener("input", handleEditorInput);
  editorForm.addEventListener("change", handleEditorChange);
  editorForm.addEventListener("click", handleEditorClick);
  editorForm.addEventListener("dragover", handleDragOver);
  editorForm.addEventListener("dragleave", handleDragLeave);
  editorForm.addEventListener("drop", handleDrop);

  jsonFileInput.addEventListener("change", importJsonFile);
  libraryDialog.addEventListener("click", handleLibraryClick);
  confirmDialog.addEventListener("click", handleConfirmClick);
  window.addEventListener("beforeunload", saveAutosave);
}

function switchKind(kind) {
  if (!appState.drafts[kind] || kind === activeKind) return;
  activeKind = kind;
  appState.activeKind = kind;
  renderKindSwitch();
  renderEditor();
  schedulePreview();
  queueAutosave();
}

function renderKindSwitch() {
  document.querySelectorAll("[data-kind]").forEach((button) => {
    const selected = button.dataset.kind === activeKind;
    button.setAttribute("aria-selected", selected ? "true" : "false");
    button.tabIndex = selected ? 0 : -1;
  });
}

function handleGlobalAction(action) {
  switch (action) {
    case "new":
      openConfirm("Crear un bloque nuevo", "Se reemplazará el borrador actual. Los elementos guardados en la biblioteca no se modificarán.", () => {
        appState.drafts[activeKind] = structuredClone(EMPTY[activeKind]);
        renderEditor();
        schedulePreview();
        queueAutosave();
        toast("Bloque nuevo creado.", "success");
      });
      break;
    case "save": saveToLibrary(); break;
    case "library": renderLibrary(); libraryDialog.showModal(); break;
    case "load-example":
      openConfirm("Cargar el ejemplo", "El contenido del borrador actual será reemplazado por un ejemplo completo.", () => {
        appState.drafts[activeKind] = structuredClone(EXAMPLES[activeKind]);
        renderEditor();
        schedulePreview();
        queueAutosave();
        toast("Ejemplo cargado.", "success");
      });
      break;
    case "import-json": jsonFileInput.click(); break;
    case "export-json": exportJson(); break;
    case "export-png": exportPng(); break;
    case "export-pdf": exportPdf(); break;
  }
}

function renderEditor() {
  const draft = currentDraft();
  editorForm.innerHTML = [
    renderBasicSection(draft),
    renderImageSection(draft),
    activeKind === "environment" ? renderEnvironmentSection(draft) : renderAdversarySection(draft),
    activeKind === "adversary" ? renderIngredientsSection(draft) : "",
    renderFeaturesSection(draft),
  ].join("");
  updateAllCounters();
}

function renderBasicSection(draft) {
  return `
    <section class="form-section">
      <h2 class="section-title">Información principal</h2>
      <p class="section-help">El título y la descripción forman la cabecera editorial del bloque.</p>
      <div class="form-grid" style="margin-top:14px">
        ${textField("Título", "title", draft.title, 80, true)}
        ${textField("Tipo", "type", draft.type, 60, true, activeKind === "environment" ? "Exploración, Social, Viaje…" : "Solitario, Bruto, Horda…")}
        ${numberField("Tier", "tier", draft.tier, 1, 4, 1)}
        ${numberField("Dificultad", "difficulty", draft.difficulty, 0, 99, 1)}
        ${textareaField("Descripción corta", "description", draft.description, 200, true, "Máximo 200 caracteres.")}
      </div>
    </section>`;
}

function renderImageSection(draft) {
  const hasImage = Boolean(draft.imageDataUrl);
  const preview = hasImage
    ? `<img class="image-thumbnail" src="${escapeAttr(draft.imageDataUrl)}" alt="Imagen seleccionada"><div class="image-overlay-actions"><button type="button" data-action="remove-image">Quitar</button></div>`
    : `<div class="dropzone-placeholder"><span class="dropzone-symbol">◫</span><strong>Sube o arrastra una imagen</strong><span>JPG, PNG o WEBP · se procesa localmente</span></div>`;
  return `
    <details class="form-section collapsible" open>
      <summary><div><h2 class="section-title">Ilustración superior</h2><p class="section-help">Opcional. La imagen nunca sale de tu navegador.</p></div></summary>
      <div class="image-dropzone" data-dropzone>
        ${preview}
        <input type="file" accept="image/jpeg,image/png,image/webp" data-image-input aria-label="Seleccionar imagen">
      </div>
      ${hasImage ? `
        <div class="form-grid" style="margin-top:14px">
          ${rangeField("Altura", "imageHeight", draft.imageHeight, 220, 520, 10, "px")}
          ${rangeField("Zoom", "imageZoom", draft.imageZoom, 1, 2.5, 0.05, "×")}
          ${rangeField("Foco horizontal", "imagePositionX", draft.imagePositionX, 0, 100, 1, "%")}
          ${rangeField("Foco vertical", "imagePositionY", draft.imagePositionY, 0, 100, 1, "%")}
        </div>` : ""}
    </details>`;
}

function renderEnvironmentSection(draft) {
  return `
    <section class="form-section">
      <h2 class="section-title">Impulsos</h2>
      <p class="section-help">Hasta ${MAX_IMPULSES} impulsos, con un máximo de 100 caracteres cada uno.</p>
      <div class="inline-list" style="margin-top:14px">
        ${draft.impulses.map((value, index) => listTextRow("impulses", index, value, 100, "Impulso")).join("")}
      </div>
      <button class="add-button" type="button" data-action="add-impulse" ${draft.impulses.length >= MAX_IMPULSES ? "disabled" : ""}>＋ Agregar impulso · ${draft.impulses.length}/${MAX_IMPULSES}</button>
    </section>
    <section class="form-section">
      <h2 class="section-title">Adversarios potenciales</h2>
      <p class="section-help">Agrupa amenazas sugeridas por familia, facción o función.</p>
      <div class="inline-list" style="margin-top:14px">
        ${draft.potentialAdversaries.map((value, index) => listTextRow("potentialAdversaries", index, value, 180, "Adversario potencial")).join("")}
      </div>
      <button class="add-button" type="button" data-action="add-potential-adversary" ${draft.potentialAdversaries.length >= MAX_POTENTIAL_ADVERSARIES ? "disabled" : ""}>＋ Agregar grupo · ${draft.potentialAdversaries.length}/${MAX_POTENTIAL_ADVERSARIES}</button>
    </section>`;
}

function renderAdversarySection(draft) {
  return `
    <section class="form-section">
      <h2 class="section-title">Impulsos y tácticas</h2>
      <p class="section-help">Hasta ${MAX_IMPULSES} entradas, con un máximo de 100 caracteres cada una.</p>
      <div class="inline-list" style="margin-top:14px">
        ${draft.motives.map((value, index) => listTextRow("motives", index, value, 100, "Impulso o táctica")).join("")}
      </div>
      <button class="add-button" type="button" data-action="add-motive" ${draft.motives.length >= MAX_IMPULSES ? "disabled" : ""}>＋ Agregar entrada · ${draft.motives.length}/${MAX_IMPULSES}</button>
    </section>
    <section class="form-section">
      <h2 class="section-title">Estadísticas de combate</h2>
      <div class="form-grid three" style="margin-top:14px">
        ${numberField("Umbral mayor", "thresholds.major", draft.thresholds.major, 0, 99, 1)}
        ${numberField("Umbral severo", "thresholds.severe", draft.thresholds.severe, 0, 99, 1)}
        ${numberField("PV", "hp", draft.hp, 0, 99, 1)}
        ${numberField("Estrés", "stress", draft.stress, 0, 99, 1)}
        ${numberField("Mod. ATQ", "attackModifier", draft.attackModifier, -20, 20, 1)}
      </div>
    </section>
    <section class="form-section">
      <h2 class="section-title">Ataque principal</h2>
      <div class="form-grid" style="margin-top:14px">
        ${textField("Nombre", "attack.name", draft.attack.name, 80)}
        ${textField("Alcance", "attack.range", draft.attack.range, 60)}
        ${textField("Daño y tipo", "attack.damage", draft.attack.damage, 100, true)}
      </div>
    </section>
    <section class="form-section">
      <h2 class="section-title">Experiencias</h2>
      <div class="inline-list" style="margin-top:14px">
        ${draft.experiences.map((item, index) => `
          <div class="list-row compact-three">
            <input type="text" maxlength="100" data-field="experiences.${index}.name" value="${escapeAttr(item.name)}" aria-label="Nombre de experiencia ${index + 1}" placeholder="Nombre de la experiencia">
            <input type="number" min="-20" max="20" step="1" data-number-field="experiences.${index}.modifier" value="${escapeAttr(item.modifier)}" aria-label="Modificador de experiencia ${index + 1}">
            <button class="remove-button" type="button" data-action="remove-experience" data-index="${index}" aria-label="Quitar experiencia">×</button>
          </div>`).join("")}
      </div>
      <button class="add-button" type="button" data-action="add-experience" ${draft.experiences.length >= MAX_EXPERIENCES ? "disabled" : ""}>＋ Agregar experiencia · ${draft.experiences.length}/${MAX_EXPERIENCES}</button>
    </section>`;
}

function renderIngredientsSection(draft) {
  const ingredientEditors = draft.ingredients.length
    ? draft.ingredients.map((ingredient, index) => ingredientEditor(ingredient, index)).join("")
    : `<div class="ingredient-empty-state"><span aria-hidden="true">✧</span><p>Este adversario todavía no suelta ingredientes.</p></div>`;
  return `
    <section class="form-section">
      <h2 class="section-title">Ingredientes que puede soltar</h2>
      <p class="section-help">Hasta ${MAX_INGREDIENTS} ingredientes. Cada uno posee entre 1 y ${MAX_INGREDIENT_FLAVORS} sabores, con potencia de 1 a 3.</p>
      <div class="ingredient-list">
        ${ingredientEditors}
      </div>
      <button class="add-button" type="button" data-action="add-ingredient" ${draft.ingredients.length >= MAX_INGREDIENTS ? "disabled" : ""}>＋ Agregar ingrediente · ${draft.ingredients.length}/${MAX_INGREDIENTS}</button>
    </section>`;
}

function ingredientEditor(ingredient, index) {
  const selectedFlavors = ingredient.flavors.map((item) => item.flavor);
  const flavorRows = ingredient.flavors.map((item, flavorIndex) => {
    const options = FLAVORS.map((flavor) => {
      const usedElsewhere = selectedFlavors.some((selected, selectedIndex) => selectedIndex !== flavorIndex && selected === flavor.name);
      return `<option value="${escapeAttr(flavor.name)}" ${item.flavor === flavor.name ? "selected" : ""} ${usedElsewhere ? "disabled" : ""}>${escapeHtml(flavor.name)} · ${flavor.die}</option>`;
    }).join("");
    return `
      <div class="ingredient-flavor-row">
        <div class="field">
          <label for="ingredient-${index}-flavor-${flavorIndex}">Sabor ${flavorIndex + 1}</label>
          <select id="ingredient-${index}-flavor-${flavorIndex}" data-field="ingredients.${index}.flavors.${flavorIndex}.flavor" data-ingredient-flavor data-ingredient-index="${index}">
            ${options}
          </select>
        </div>
        <div class="field ingredient-potency-field">
          <label for="ingredient-${index}-potency-${flavorIndex}">Potencia</label>
          <select id="ingredient-${index}-potency-${flavorIndex}" data-number-field="ingredients.${index}.flavors.${flavorIndex}.potency">
            ${[1, 2, 3].map((value) => `<option value="${value}" ${Number(item.potency) === value ? "selected" : ""}>${value}</option>`).join("")}
          </select>
        </div>
        <button class="remove-button ingredient-flavor-remove" type="button" data-action="remove-ingredient-flavor" data-ingredient-index="${index}" data-flavor-index="${flavorIndex}" aria-label="Quitar sabor" ${ingredient.flavors.length <= 1 ? "disabled" : ""}>×</button>
      </div>`;
  }).join("");
  const hasFeature = Boolean(ingredient.feature.name || ingredient.feature.text);
  return `
    <article class="ingredient-editor">
      <div class="feature-editor-header">
        <span class="feature-index">INGREDIENTE ${String(index + 1).padStart(2, "0")}</span>
        <button class="remove-button" type="button" data-action="remove-ingredient" data-index="${index}" aria-label="Quitar ingrediente">×</button>
      </div>
      <div class="form-grid">
        ${textField("Nombre", `ingredients.${index}.name`, ingredient.name, 100, true, "Ej.: Lengua de dragón")}
      </div>
      <div class="ingredient-flavors-heading">
        <div>
          <span class="field-label">Perfil de sabor</span>
          <p class="section-help">El dado está determinado por el sabor; la potencia se indica entre 1 y 3.</p>
        </div>
        <span class="ingredient-flavor-count">${ingredient.flavors.length}/${MAX_INGREDIENT_FLAVORS}</span>
      </div>
      <div class="ingredient-flavor-list">${flavorRows}</div>
      <button class="add-button ingredient-add-flavor" type="button" data-action="add-ingredient-flavor" data-ingredient-index="${index}" ${ingredient.flavors.length >= MAX_INGREDIENT_FLAVORS ? "disabled" : ""}>＋ Agregar sabor</button>
      <details class="ingredient-feature-editor" ${hasFeature ? "open" : ""}>
        <summary>Rasgo opcional del ingrediente</summary>
        <div class="form-grid" style="margin-top:12px">
          ${textField("Nombre del rasgo", `ingredients.${index}.feature.name`, ingredient.feature.name, 90, true, "Ej.: Última gota")}
          ${textareaField("Descripción del rasgo", `ingredients.${index}.feature.text`, ingredient.feature.text, 700, true, "Déjalo vacío si el ingrediente no posee un rasgo.")}
        </div>
      </details>
    </article>`;
}

function renderFeaturesSection(draft) {
  return `
    <section class="form-section">
      <h2 class="section-title">Rasgos</h2>
      <p class="section-help">Cada rasgo puede incluir un texto principal y una lista opcional de detalles.</p>
      <div>
        ${draft.features.map((feature, index) => featureEditor(feature, index)).join("")}
      </div>
      <button class="add-button" type="button" data-action="add-feature" ${draft.features.length >= MAX_FEATURES ? "disabled" : ""}>＋ Agregar rasgo · ${draft.features.length}/${MAX_FEATURES}</button>
    </section>`;
}

function featureEditor(feature, index) {
  return `
    <article class="feature-editor">
      <div class="feature-editor-header">
        <span class="feature-index">RASGO ${String(index + 1).padStart(2, "0")}</span>
        <button class="remove-button" type="button" data-action="remove-feature" data-index="${index}" aria-label="Quitar rasgo">×</button>
      </div>
      <div class="form-grid">
        ${textField("Nombre", `features.${index}.name`, feature.name, 90)}
        <div class="field">
          <label for="feature-type-${index}">Tipo</label>
          <select id="feature-type-${index}" data-field="features.${index}.type">
            ${["Pasiva", "Acción", "Reacción", "Acción de Miedo", "Especial"].map((type) => `<option value="${type}" ${type === feature.type ? "selected" : ""}>${type}</option>`).join("")}
          </select>
        </div>
        ${textareaField("Descripción", `features.${index}.text`, feature.text, 1600, true)}
        ${textareaField("Detalles o viñetas", `features.${index}.bullets`, feature.bullets.join("\n"), 2900, true, "Una viñeta por línea.", true)}
      </div>
    </article>`;
}

function textField(label, path, value, maxLength, full = false, placeholder = "") {
  const id = idFromPath(path);
  return `<div class="field ${full ? "full" : ""}"><label for="${id}">${label}</label><div class="input-wrap"><input id="${id}" type="text" maxlength="${maxLength}" data-field="${path}" value="${escapeAttr(value)}" placeholder="${escapeAttr(placeholder)}"><span class="char-counter" data-counter>${stringValue(value).length}/${maxLength}</span></div></div>`;
}

function numberField(label, path, value, min, max, step) {
  const id = idFromPath(path);
  return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="number" min="${min}" max="${max}" step="${step}" data-number-field="${path}" value="${escapeAttr(value)}"></div>`;
}

function textareaField(label, path, value, maxLength, full = false, hint = "", linesMode = false) {
  const id = idFromPath(path);
  const attribute = linesMode ? "data-lines-field" : "data-field";
  return `<div class="field ${full ? "full" : ""}"><label for="${id}">${label}${hint ? ` <span class="field-hint">${hint}</span>` : ""}</label><div class="input-wrap"><textarea id="${id}" maxlength="${maxLength}" ${attribute}="${path}">${escapeHtml(value)}</textarea><span class="char-counter" data-counter>${stringValue(value).length}/${maxLength}</span></div></div>`;
}

function rangeField(label, path, value, min, max, step, suffix) {
  const id = idFromPath(path);
  return `<div class="field"><label for="${id}">${label}</label><div class="range-row"><input id="${id}" type="range" min="${min}" max="${max}" step="${step}" data-number-field="${path}" value="${escapeAttr(value)}"><span class="range-value" data-range-value>${formatRange(value, suffix)}</span></div></div>`;
}

function listTextRow(path, index, value, maxLength, label) {
  return `<div class="list-row"><div class="input-wrap"><input type="text" maxlength="${maxLength}" data-field="${path}.${index}" value="${escapeAttr(value)}" aria-label="${label} ${index + 1}" placeholder="${label}"><span class="char-counter" data-counter>${stringValue(value).length}/${maxLength}</span></div><button class="remove-button" type="button" data-action="remove-${path}" data-index="${index}" aria-label="Quitar ${label.toLowerCase()}">×</button></div>`;
}

function handleEditorInput(event) {
  const target = event.target;
  if (target.matches("[data-field]")) setByPath(currentDraft(), target.dataset.field, target.value);
  if (target.matches("[data-lines-field]")) {
    setByPath(currentDraft(), target.dataset.linesField, target.value.split(/\r?\n/).map((line) => line.trim()).filter(Boolean));
  }
  if (target.matches("[data-number-field]")) setByPath(currentDraft(), target.dataset.numberField, Number(target.value));
  updateCounter(target);
  updateRangeValue(target);
  schedulePreview();
  queueAutosave();
}

function handleEditorChange(event) {
  const target = event.target;
  if (target.matches("[data-image-input]") && target.files?.[0]) processImageFile(target.files[0]);
  if (target.matches("[data-ingredient-flavor]")) {
    const ingredientIndex = Number(target.dataset.ingredientIndex);
    const ingredient = currentDraft().ingredients?.[ingredientIndex];
    if (ingredient) ingredient.flavors = normalizeIngredient({ flavors: ingredient.flavors }).flavors;
    renderEditor();
    schedulePreview();
    queueAutosave();
  }
}

function handleEditorClick(event) {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  const index = Number(button.dataset.index);
  const draft = currentDraft();
  if (action === "remove-image") {
    draft.imageDataUrl = "";
    draft.imageName = "";
    imageCache = { src: null, image: null };
    renderEditor();
  } else if (action === "add-impulse" && draft.impulses.length < MAX_IMPULSES) draft.impulses.push("");
  else if (action === "remove-impulses") draft.impulses.splice(index, 1);
  else if (action === "add-motive" && draft.motives.length < MAX_IMPULSES) draft.motives.push("");
  else if (action === "remove-motives") draft.motives.splice(index, 1);
  else if (action === "add-potential-adversary" && draft.potentialAdversaries.length < MAX_POTENTIAL_ADVERSARIES) draft.potentialAdversaries.push("");
  else if (action === "remove-potentialAdversaries") draft.potentialAdversaries.splice(index, 1);
  else if (action === "add-experience" && draft.experiences.length < MAX_EXPERIENCES) draft.experiences.push({ name: "", modifier: 2 });
  else if (action === "remove-experience") draft.experiences.splice(index, 1);
  else if (action === "add-ingredient" && draft.ingredients.length < MAX_INGREDIENTS) draft.ingredients.push(createEmptyIngredient());
  else if (action === "remove-ingredient") draft.ingredients.splice(index, 1);
  else if (action === "add-ingredient-flavor") {
    const ingredientIndex = Number(button.dataset.ingredientIndex);
    const ingredient = draft.ingredients[ingredientIndex];
    if (!ingredient || ingredient.flavors.length >= MAX_INGREDIENT_FLAVORS) return;
    const used = new Set(ingredient.flavors.map((item) => item.flavor));
    const nextFlavor = FLAVORS.find((item) => !used.has(item.name))?.name || "Dulce";
    ingredient.flavors.push({ flavor: nextFlavor, potency: 1 });
  }
  else if (action === "remove-ingredient-flavor") {
    const ingredientIndex = Number(button.dataset.ingredientIndex);
    const flavorIndex = Number(button.dataset.flavorIndex);
    const ingredient = draft.ingredients[ingredientIndex];
    if (!ingredient || ingredient.flavors.length <= 1) return;
    ingredient.flavors.splice(flavorIndex, 1);
  }
  else if (action === "add-feature" && draft.features.length < MAX_FEATURES) draft.features.push({ name: "", type: "Pasiva", text: "", bullets: [] });
  else if (action === "remove-feature") draft.features.splice(index, 1);
  else return;

  if (activeKind === "environment") {
    if (!draft.impulses.length) draft.impulses.push("");
    if (!draft.potentialAdversaries.length) draft.potentialAdversaries.push("");
  } else {
    if (!draft.motives.length) draft.motives.push("");
    if (!draft.experiences.length) draft.experiences.push({ name: "", modifier: 2 });
  }
  if (!draft.features.length) draft.features.push({ name: "", type: "Pasiva", text: "", bullets: [] });
  renderEditor();
  schedulePreview();
  queueAutosave();
}

function handleDragOver(event) {
  const zone = event.target.closest("[data-dropzone]");
  if (!zone) return;
  event.preventDefault();
  zone.classList.add("dragging");
}
function handleDragLeave(event) { event.target.closest("[data-dropzone]")?.classList.remove("dragging"); }
function handleDrop(event) {
  const zone = event.target.closest("[data-dropzone]");
  if (!zone) return;
  event.preventDefault();
  zone.classList.remove("dragging");
  const file = [...(event.dataTransfer?.files || [])].find((item) => item.type.startsWith("image/"));
  if (file) processImageFile(file);
}

async function processImageFile(file) {
  if (!file.type.startsWith("image/")) return toast("Selecciona un archivo de imagen válido.", "error");
  if (file.size > 20 * 1024 * 1024) return toast("La imagen supera el límite de 20 MB.", "error");
  try {
    const dataUrl = await fileToDataUrl(file);
    const image = await loadImage(dataUrl);
    const maxDimension = 1800;
    const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const compressed = canvas.toDataURL("image/jpeg", 0.88);
    const draft = currentDraft();
    draft.imageDataUrl = compressed;
    draft.imageName = file.name;
    imageCache = { src: compressed, image: await loadImage(compressed) };
    renderEditor();
    schedulePreview();
    queueAutosave();
    toast("Imagen incorporada localmente.", "success");
  } catch (error) {
    console.error(error);
    toast("No fue posible procesar la imagen.", "error");
  }
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  if (!src) return Promise.resolve(null);
  if (imageCache.src === src && imageCache.image) return Promise.resolve(imageCache.image);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { imageCache = { src, image }; resolve(image); };
    image.onerror = reject;
    image.src = src;
  });
}

function setByPath(object, path, value) {
  const parts = path.split(".");
  let target = object;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const key = /^\d+$/.test(parts[i]) ? Number(parts[i]) : parts[i];
    target = target[key];
  }
  const last = /^\d+$/.test(parts.at(-1)) ? Number(parts.at(-1)) : parts.at(-1);
  target[last] = value;
}

function updateAllCounters() { editorForm.querySelectorAll("input[maxlength], textarea[maxlength]").forEach(updateCounter); }
function updateCounter(target) {
  if (!target?.maxLength || target.maxLength < 0) return;
  const counter = target.parentElement?.querySelector(":scope > [data-counter]");
  if (!counter) return;
  const length = target.value.length;
  counter.textContent = `${length}/${target.maxLength}`;
  counter.classList.toggle("near-limit", length >= target.maxLength * 0.8 && length < target.maxLength);
  counter.classList.toggle("at-limit", length >= target.maxLength);
}
function updateRangeValue(target) {
  if (!target.matches?.('input[type="range"]')) return;
  const display = target.parentElement?.querySelector("[data-range-value]");
  if (!display) return;
  const suffix = target.dataset.numberField === "imageZoom" ? "×" : target.dataset.numberField === "imageHeight" ? "px" : "%";
  display.textContent = formatRange(target.value, suffix);
}
function formatRange(value, suffix) { return suffix === "×" ? `${Number(value).toFixed(2)}${suffix}` : `${Math.round(Number(value))}${suffix}`; }

function queueAutosave() {
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(saveAutosave, 350);
}

function saveAutosave() {
  try {
    localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(appState));
  } catch (error) {
    console.warn(error);
    try {
      const lightweight = structuredClone(appState);
      lightweight.drafts.environment.imageDataUrl = "";
      lightweight.drafts.adversary.imageDataUrl = "";
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(lightweight));
      toast("Se guardó el texto, pero la imagen era demasiado grande para el almacenamiento local.", "error");
    } catch {}
  }
}

function schedulePreview() {
  const token = ++renderToken;
  requestAnimationFrame(async () => {
    const draft = structuredClone(currentDraft());
    let image = null;
    try { image = draft.imageDataUrl ? await loadImage(draft.imageDataUrl) : null; } catch {}
    if (token !== renderToken) return;
    const previewScale = Math.min(1.35, Math.max(1, window.devicePixelRatio || 1));
    renderStatblock(statblockCanvas, draft, previewScale, image);
    const dimensions = `${statblockCanvas.width} × ${statblockCanvas.height} px`;
    previewMeta.textContent = `${draft.title || "Sin título"} · ${dimensions}`;
  });
}

function renderStatblock(canvas, draft, pixelScale = 1, image = null) {
  const scratch = document.createElement("canvas").getContext("2d");
  const height = Math.ceil(drawStatblock(scratch, draft, LOGICAL_WIDTH, false, image, null));
  canvas.width = Math.ceil(LOGICAL_WIDTH * pixelScale);
  canvas.height = Math.ceil(height * pixelScale);
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.scale(pixelScale, pixelScale);
  drawStatblock(ctx, draft, LOGICAL_WIDTH, true, image, height);
  return { width: LOGICAL_WIDTH, height };
}

function drawStatblock(ctx, draft, width, paint, image, measuredHeight = null) {
  const outer = 24;
  const cardX = outer;
  const cardW = width - outer * 2;
  const inner = 46;
  const contentX = cardX + inner;
  const contentW = cardW - inner * 2;
  const gap = 22;
  const hasImage = Boolean(image && draft.imageDataUrl);
  let y = outer;

  if (paint) {
    ctx.save();
    ctx.fillStyle = PALETTE.background;
    ctx.fillRect(0, 0, width, measuredHeight || 12000);
    ctx.shadowColor = "rgba(28, 26, 34, 0.25)";
    ctx.shadowBlur = 22;
    ctx.shadowOffsetY = 10;
    roundedRect(ctx, cardX, y, cardW, Math.max(200, (measuredHeight || 10000) - outer * 2), 8, PALETTE.paper);
    ctx.restore();
  }

  const topY = y;
  if (hasImage) {
    const imageH = Number(draft.imageHeight) || 340;
    if (paint) {
      ctx.save();
      roundedClip(ctx, cardX, y, cardW, imageH, 8, true, false);
      drawImageCover(ctx, image, cardX, y, cardW, imageH, draft.imageZoom, draft.imagePositionX, draft.imagePositionY);
      const gradient = ctx.createLinearGradient(0, y, 0, y + imageH);
      gradient.addColorStop(0, "rgba(24,25,35,0.10)");
      gradient.addColorStop(0.50, "rgba(24,25,35,0.15)");
      gradient.addColorStop(1, "rgba(24,25,35,0.93)");
      ctx.fillStyle = gradient;
      ctx.fillRect(cardX, y, cardW, imageH);
      ctx.restore();
    }
    drawHeroTitle(ctx, draft, contentX, y + imageH - 154, contentW, true, paint);
    y += imageH;
  } else {
    const headerH = 224;
    if (paint) {
      const gradient = ctx.createLinearGradient(cardX, y, cardX + cardW, y + headerH);
      gradient.addColorStop(0, PALETTE.deep);
      gradient.addColorStop(0.62, PALETTE.plum);
      gradient.addColorStop(1, PALETTE.violetDark);
      roundedRect(ctx, cardX, y, cardW, headerH, 8, gradient);
      drawConstellation(ctx, cardX, y, cardW, headerH);
    }
    drawHeroTitle(ctx, draft, contentX, y + 42, contentW, false, paint);
    y += headerH;
  }

  if (paint) {
    ctx.fillStyle = PALETTE.gold;
    ctx.fillRect(cardX, y, cardW, 7);
  }
  y += 7;

  const description = draft.description || "Agrega una descripción corta para presentar este bloque.";
  const descriptionH = textBlockHeight(ctx, description, 28, contentW - 44, 1.42) + 46;
  if (paint) {
    roundedRect(ctx, contentX, y + 22, contentW, descriptionH, 16, PALETTE.paperAlt);
    ctx.fillStyle = PALETTE.violet;
    ctx.fillRect(contentX, y + 22, 7, descriptionH);
    drawWrappedText(ctx, description, contentX + 28, y + 45, contentW - 52, 28, PALETTE.ink, 1.42, "italic 28px Georgia");
  }
  y += descriptionH + 44;

  if (draft.kind === "environment") y = drawEnvironmentBody(ctx, draft, contentX, y, contentW, paint);
  else y = drawAdversaryBody(ctx, draft, contentX, y, contentW, paint);

  y += 12;
  if (paint) {
    drawFooterOrnament(ctx, contentX, y, contentW);
    ctx.fillStyle = PALETTE.muted;
    ctx.font = "500 15px Arial";
    ctx.textAlign = "left";
    ctx.fillText("CREACIÓN NO OFICIAL · COMPATIBLE CON DAGGERHEART", contentX, y + 38);
    ctx.textAlign = "right";
    ctx.fillText("FORJA DE BLOQUES", contentX + contentW, y + 38);
  }
  y += 70;

  const finalHeight = y + outer;
  if (paint) {
    ctx.save();
    ctx.strokeStyle = PALETTE.deep;
    ctx.lineWidth = 3;
    roundedStroke(ctx, cardX, topY, cardW, finalHeight - topY - outer, 8);
    ctx.strokeStyle = PALETTE.gold;
    ctx.lineWidth = 1.5;
    roundedStroke(ctx, cardX + 10, topY + 10, cardW - 20, finalHeight - topY - outer - 20, 5);
    ctx.restore();
  }
  return finalHeight;
}

function drawHeroTitle(ctx, draft, x, y, width, onImage, paint) {
  const title = (draft.title || "Sin título").toLocaleUpperCase("es-CL");
  const titleSize = fitFontSize(ctx, title, width - 10, 58, 28, "700", "Georgia");
  if (paint) {
    ctx.textAlign = "left";
    ctx.fillStyle = PALETTE.white;
    ctx.font = `700 ${titleSize}px Georgia`;
    ctx.fillText(title, x, y + titleSize);
    const lineY = y + titleSize + 19;
    ctx.fillStyle = PALETTE.gold;
    ctx.fillRect(x, lineY, Math.min(170, width * 0.25), 4);
    ctx.fillStyle = onImage ? "rgba(255,255,255,0.82)" : "#ddd7e5";
    ctx.font = "600 23px Arial";
    ctx.fillText(`TIER ${draft.tier} · ${draft.type || (draft.kind === "environment" ? "AMBIENTE" : "ADVERSARIO")}`.toLocaleUpperCase("es-CL"), x, lineY + 37);
    const kindLabel = draft.kind === "environment" ? "AMBIENTE" : "ADVERSARIO";
    const badgeW = ctx.measureText(kindLabel).width + 42;
    pill(ctx, x + width - badgeW, y + 8, badgeW, 38, PALETTE.gold, PALETTE.deep, kindLabel, 16);
  }
}

function drawEnvironmentBody(ctx, draft, x, y, width, paint) {
  const impulses = draft.impulses.filter((item) => item.trim());
  const adversaries = draft.potentialAdversaries.filter((item) => item.trim());
  const labelW = 190;

  y = drawSectionLabel(ctx, "PERFIL DEL AMBIENTE", x, y, width, paint);
  y += 22;

  const impulseText = impulses.length ? impulses.join(" · ") : "Sin impulsos definidos";
  const impulseH = Math.max(70, textBlockHeight(ctx, impulseText, 22, width - labelW - 45, 1.38) + 30);
  if (paint) {
    roundedRect(ctx, x, y, width, impulseH, 12, PALETTE.violetPale);
    drawMetaLabel(ctx, "IMPULSOS", x + 22, y + 25);
    drawWrappedText(ctx, impulseText, x + labelW, y + 23, width - labelW - 22, 22, PALETTE.red, 1.38, "500 22px Arial");
  }
  y += impulseH + 14;

  const difficultyH = 76;
  if (paint) {
    roundedRect(ctx, x, y, width, difficultyH, 12, PALETTE.paperAlt);
    drawMetaLabel(ctx, "DIFICULTAD", x + 22, y + 27);
    statGem(ctx, x + labelW, y + 12, 52, String(draft.difficulty), PALETTE.violetDark);
    ctx.fillStyle = PALETTE.muted;
    ctx.font = "500 20px Arial";
    ctx.fillText("Número objetivo recomendado para enfrentar el ambiente.", x + labelW + 72, y + 47);
  }
  y += difficultyH + 14;

  const adversaryLines = adversaries.length ? adversaries : ["Sin adversarios potenciales definidos"];
  let adversaryH = 40;
  adversaryLines.forEach((item) => { adversaryH += textBlockHeight(ctx, item, 21, width - 66, 1.35) + 14; });
  adversaryH += 24;
  if (paint) {
    roundedRect(ctx, x, y, width, adversaryH, 12, "#f7f1e6");
    drawMetaLabel(ctx, "ADVERSARIOS POTENCIALES", x + 22, y + 26);
    let ty = y + 62;
    adversaryLines.forEach((item) => {
      drawDiamond(ctx, x + 27, ty + 9, 7, PALETTE.gold);
      ty = drawWrappedText(ctx, item, x + 48, ty, width - 70, 21, PALETTE.ink, 1.35, "500 21px Arial") + 12;
    });
  }
  y += adversaryH + 34;
  return drawFeatures(ctx, draft.features, x, y, width, paint);
}

function drawAdversaryBody(ctx, draft, x, y, width, paint) {
  const motives = draft.motives.filter((item) => item.trim());
  y = drawSectionLabel(ctx, "PERFIL DEL ADVERSARIO", x, y, width, paint);
  y += 22;

  const motiveText = motives.length ? motives.join(" · ") : "Sin impulsos o tácticas definidos";
  const motiveH = Math.max(72, textBlockHeight(ctx, motiveText, 22, width - 230, 1.38) + 30);
  if (paint) {
    roundedRect(ctx, x, y, width, motiveH, 12, PALETTE.violetPale);
    drawMetaLabel(ctx, "IMPULSOS Y TÁCTICAS", x + 22, y + 25);
    drawWrappedText(ctx, motiveText, x + 230, y + 23, width - 250, 22, PALETTE.red, 1.38, "500 22px Arial");
  }
  y += motiveH + 14;

  const stats = [
    ["DIFICULTAD", draft.difficulty],
    ["UMBRALES", `${draft.thresholds.major}/${draft.thresholds.severe}`],
    ["PV", draft.hp],
    ["ESTRÉS", draft.stress],
    ["ATQ", signedNumber(draft.attackModifier)],
  ];
  const statGap = 12;
  const statW = (width - statGap * (stats.length - 1)) / stats.length;
  if (paint) {
    stats.forEach(([label, value], index) => {
      const sx = x + index * (statW + statGap);
      roundedRect(ctx, sx, y, statW, 98, 12, index === 0 ? PALETTE.violetDark : PALETTE.deep);
      ctx.textAlign = "center";
      ctx.fillStyle = index === 0 ? PALETTE.goldPale : "#c8c5ce";
      ctx.font = "700 14px Arial";
      ctx.fillText(label, sx + statW / 2, y + 27);
      ctx.fillStyle = PALETTE.white;
      ctx.font = "700 31px Georgia";
      ctx.fillText(String(value), sx + statW / 2, y + 69);
    });
    ctx.textAlign = "left";
  }
  y += 112;

  const attackText = [draft.attack.name, draft.attack.range, draft.attack.damage].filter(Boolean).join(" · ") || "Ataque no definido";
  const attackH = Math.max(84, textBlockHeight(ctx, attackText, 23, width - 170, 1.35) + 34);
  if (paint) {
    roundedRect(ctx, x, y, width, attackH, 12, "#f6ede2");
    ctx.fillStyle = PALETTE.red;
    ctx.fillRect(x, y, 7, attackH);
    drawMetaLabel(ctx, "ATAQUE", x + 26, y + 29);
    drawWrappedText(ctx, attackText, x + 170, y + 25, width - 192, 23, PALETTE.ink, 1.35, "600 23px Arial");
  }
  y += attackH + 14;

  const experiences = draft.experiences.filter((item) => item.name.trim());
  if (experiences.length) {
    const experienceText = experiences.map((item) => `${item.name} ${signedNumber(item.modifier)}`).join(" · ");
    const expH = Math.max(72, textBlockHeight(ctx, experienceText, 21, width - 190, 1.35) + 30);
    if (paint) {
      roundedRect(ctx, x, y, width, expH, 12, PALETTE.paperAlt);
      drawMetaLabel(ctx, "EXPERIENCIAS", x + 22, y + 25);
      drawWrappedText(ctx, experienceText, x + 190, y + 23, width - 212, 21, PALETTE.violetDark, 1.35, "600 21px Arial");
    }
    y += expH + 28;
  } else y += 14;

  y = drawIngredients(ctx, draft.ingredients, x, y, width, paint);
  return drawFeatures(ctx, draft.features, x, y, width, paint);
}

function drawIngredients(ctx, ingredients, x, y, width, paint) {
  const activeIngredients = arrayValue(ingredients).slice(0, MAX_INGREDIENTS);
  if (!activeIngredients.length) return y;

  y = drawSectionLabel(ctx, "INGREDIENTES", x, y, width, paint);
  y += 24;

  activeIngredients.forEach((ingredient, index) => {
    const name = ingredient.name?.trim() || `Ingrediente ${index + 1}`;
    const flavors = arrayValue(ingredient.flavors).slice(0, MAX_INGREDIENT_FLAVORS);
    const nameH = textBlockHeight(ctx, name, 24, width - 82, 1.2, "700 24px Georgia");
    const chipMetrics = measureFlavorChips(ctx, flavors, width - 58);
    const chipsOffset = 22 + nameH + 17;
    const featureName = ingredient.feature?.name?.trim() || (ingredient.feature?.text?.trim() ? "Rasgo culinario" : "");
    const featureText = ingredient.feature?.text?.trim() || "";
    const featureNameH = featureName ? textBlockHeight(ctx, featureName, 17, width - 64, 1.3, "700 17px Arial") : 0;
    const featureTextH = featureText ? textBlockHeight(ctx, featureText, 17, width - 64, 1.38, "500 17px Arial") : 0;
    const featureH = featureName ? featureNameH + (featureText ? 8 + featureTextH : 0) : 0;
    const cardH = chipsOffset + chipMetrics.height + (featureH ? 18 + featureH : 0) + 25;

    if (paint) {
      roundedRect(ctx, x, y, width, cardH, 14, index % 2 === 0 ? "#fffaf0" : "#f9f1e4");
      ctx.strokeStyle = PALETTE.line;
      ctx.lineWidth = 1.5;
      roundedStroke(ctx, x, y, width, cardH, 14);
      ctx.fillStyle = PALETTE.gold;
      ctx.fillRect(x, y, 8, cardH);
      drawDiamond(ctx, x + 29, y + 29, 8, PALETTE.violetDark);
      drawWrappedText(ctx, name, x + 50, y + 19, width - 82, 24, PALETTE.ink, 1.2, "700 24px Georgia");

      drawFlavorChips(ctx, flavors, x + 28, y + chipsOffset, width - 56);
      if (featureName) {
        const featureY = y + chipsOffset + chipMetrics.height + 18;
        let featureBottom = drawWrappedText(ctx, featureName, x + 29, featureY, width - 58, 17, PALETTE.violetDark, 1.3, "700 17px Arial");
        if (featureText) {
          drawWrappedText(ctx, featureText, x + 29, featureBottom + 8, width - 58, 17, PALETTE.muted, 1.38, "500 17px Arial");
        }
      }
    }
    y += cardH + 15;
  });

  return y + 13;
}

function measureFlavorChips(ctx, flavors, maxWidth) {
  if (!flavors.length) return { height: 36, rows: 1 };
  ctx.font = "700 16px Arial";
  let rowWidth = 0;
  let rows = 1;
  flavors.forEach((item) => {
    const label = flavorChipLabel(item);
    const chipW = ctx.measureText(label).width + 30;
    if (rowWidth && rowWidth + 9 + chipW > maxWidth) {
      rows += 1;
      rowWidth = chipW;
    } else rowWidth += (rowWidth ? 9 : 0) + chipW;
  });
  return { height: rows * 36 + (rows - 1) * 8, rows };
}

function drawFlavorChips(ctx, flavors, x, y, maxWidth) {
  const list = flavors.length ? flavors : [{ flavor: "Sin sabor", potency: 1 }];
  ctx.font = "700 16px Arial";
  let cx = x;
  let cy = y;
  list.forEach((item) => {
    const label = flavorChipLabel(item);
    const chipW = ctx.measureText(label).width + 30;
    if (cx > x && cx + chipW > x + maxWidth) {
      cx = x;
      cy += 44;
    }
    roundedRect(ctx, cx, cy, chipW, 36, 18, PALETTE.violetPale);
    ctx.strokeStyle = "rgba(85,57,109,0.22)";
    ctx.lineWidth = 1;
    roundedStroke(ctx, cx, cy, chipW, 36, 18);
    ctx.fillStyle = PALETTE.violetDark;
    ctx.textAlign = "center";
    ctx.font = "700 16px Arial";
    ctx.fillText(label, cx + chipW / 2, cy + 24);
    ctx.textAlign = "left";
    cx += chipW + 9;
  });
}

function flavorChipLabel(item) {
  const flavor = stringValue(item?.flavor) || "Dulce";
  const die = FLAVORS.find((option) => option.name === flavor)?.die || "d4";
  const potency = numericValue(item?.potency, 1, 1, 3);
  return `${flavor} ${die} (${potency})`;
}

function drawFeatures(ctx, features, x, y, width, paint) {
  y = drawSectionLabel(ctx, "RASGOS", x, y, width, paint);
  y += 24;
  const activeFeatures = features.length ? features : [{ name: "Sin rasgos", type: "", text: "", bullets: [] }];
  activeFeatures.forEach((feature, index) => {
    const name = feature.name || `Rasgo ${index + 1}`;
    const type = feature.type || "";
    const titleText = type ? `${name} · ${type}` : name;
    const body = feature.text || "Agrega la descripción de este rasgo.";
    const bodyH = textBlockHeight(ctx, body, 22, width - 56, 1.43);
    let bulletsH = 0;
    const bullets = arrayValue(feature.bullets).filter((item) => item.trim());
    bullets.forEach((bullet) => { bulletsH += textBlockHeight(ctx, bullet, 19, width - 88, 1.38) + 11; });
    const cardH = 78 + bodyH + (bullets.length ? 18 + bulletsH : 0) + 30;

    if (paint) {
      roundedRect(ctx, x, y, width, cardH, 14, index % 2 === 0 ? "#fffdf8" : "#faf6ef");
      ctx.strokeStyle = PALETTE.line;
      ctx.lineWidth = 1.5;
      roundedStroke(ctx, x, y, width, cardH, 14);
      ctx.fillStyle = PALETTE.violetDark;
      ctx.fillRect(x, y, 8, cardH);
      drawDiamond(ctx, x + 29, y + 30, 9, PALETTE.gold);
      ctx.fillStyle = PALETTE.ink;
      ctx.font = "italic 700 25px Georgia";
      ctx.fillText(titleText, x + 50, y + 39);
      ctx.fillStyle = PALETTE.gold;
      ctx.fillRect(x + 50, y + 54, Math.min(125, width * 0.18), 3);
      let ty = drawWrappedText(ctx, body, x + 28, y + 78, width - 56, 22, PALETTE.ink, 1.43, "500 22px Arial");
      if (bullets.length) {
        ty += 14;
        bullets.forEach((bullet) => {
          drawDiamond(ctx, x + 39, ty + 8, 5.5, PALETTE.violet);
          ty = drawWrappedText(ctx, bullet, x + 58, ty, width - 86, 19, PALETTE.muted, 1.38, "500 19px Arial") + 11;
        });
      }
    }
    y += cardH + 18;
  });
  return y;
}

function drawSectionLabel(ctx, label, x, y, width, paint) {
  if (paint) {
    ctx.fillStyle = PALETTE.deep;
    ctx.font = "700 25px Georgia";
    ctx.fillText(label, x + 18, y + 28);
    const labelWidth = ctx.measureText(label).width;
    ctx.fillStyle = PALETTE.gold;
    ctx.fillRect(x, y + 40, labelWidth + 45, 4);
    ctx.fillStyle = PALETTE.line;
    ctx.fillRect(x + labelWidth + 55, y + 41, width - labelWidth - 55, 2);
  }
  return y + 44;
}

function drawMetaLabel(ctx, label, x, y) {
  ctx.fillStyle = PALETTE.deep;
  ctx.font = "700 16px Arial";
  ctx.fillText(label, x, y);
}

function drawFooterOrnament(ctx, x, y, width) {
  ctx.fillStyle = PALETTE.line;
  ctx.fillRect(x, y + 9, width, 2);
  drawDiamond(ctx, x + width / 2, y + 10, 8, PALETTE.gold);
}

function drawConstellation(ctx, x, y, w, h) {
  ctx.save();
  ctx.globalAlpha = 0.18;
  ctx.strokeStyle = PALETTE.goldPale;
  ctx.fillStyle = PALETTE.goldPale;
  ctx.lineWidth = 1.3;
  const points = [
    [x + w * 0.64, y + h * 0.20], [x + w * 0.73, y + h * 0.34], [x + w * 0.82, y + h * 0.18],
    [x + w * 0.90, y + h * 0.42], [x + w * 0.76, y + h * 0.70], [x + w * 0.92, y + h * 0.78],
  ];
  ctx.beginPath();
  points.forEach(([px, py], index) => index ? ctx.lineTo(px, py) : ctx.moveTo(px, py));
  ctx.stroke();
  points.forEach(([px, py], index) => drawDiamond(ctx, px, py, index % 2 ? 5 : 3.5, PALETTE.goldPale));
  ctx.restore();
}

function drawImageCover(ctx, image, x, y, w, h, zoom = 1, positionX = 50, positionY = 50) {
  const iw = image.naturalWidth || image.width;
  const ih = image.naturalHeight || image.height;
  const baseScale = Math.max(w / iw, h / ih) * Number(zoom || 1);
  const sourceW = w / baseScale;
  const sourceH = h / baseScale;
  const sx = Math.max(0, Math.min(iw - sourceW, (iw - sourceW) * (Number(positionX) / 100)));
  const sy = Math.max(0, Math.min(ih - sourceH, (ih - sourceH) * (Number(positionY) / 100)));
  ctx.drawImage(image, sx, sy, sourceW, sourceH, x, y, w, h);
}

function roundedRect(ctx, x, y, w, h, r, fill) {
  roundedPath(ctx, x, y, w, h, r);
  ctx.fillStyle = fill;
  ctx.fill();
}
function roundedStroke(ctx, x, y, w, h, r) { roundedPath(ctx, x, y, w, h, r); ctx.stroke(); }
function roundedPath(ctx, x, y, w, h, r) {
  const radius = Math.max(0, Math.min(r, w / 2, h / 2));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}
function roundedClip(ctx, x, y, w, h, r) { roundedPath(ctx, x, y, w, h, r); ctx.clip(); }

function pill(ctx, x, y, w, h, fill, textColor, text, fontSize) {
  roundedRect(ctx, x, y, w, h, h / 2, fill);
  ctx.textAlign = "center";
  ctx.fillStyle = textColor;
  ctx.font = `800 ${fontSize}px Arial`;
  ctx.fillText(text, x + w / 2, y + h / 2 + fontSize * 0.34);
  ctx.textAlign = "left";
}

function statGem(ctx, x, y, size, value, fill) {
  drawDiamond(ctx, x + size / 2, y + size / 2, size / 2, fill);
  ctx.fillStyle = PALETTE.white;
  ctx.textAlign = "center";
  ctx.font = "700 22px Georgia";
  ctx.fillText(value, x + size / 2, y + size / 2 + 8);
  ctx.textAlign = "left";
}

function drawDiamond(ctx, cx, cy, radius, fill) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - radius);
  ctx.lineTo(cx + radius, cy);
  ctx.lineTo(cx, cy + radius);
  ctx.lineTo(cx - radius, cy);
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function fitFontSize(ctx, text, maxWidth, start, min, weight, family) {
  let size = start;
  while (size > min) {
    ctx.font = `${weight} ${size}px ${family}`;
    if (ctx.measureText(text).width <= maxWidth) break;
    size -= 1;
  }
  return size;
}

function textBlockHeight(ctx, text, fontSize, maxWidth, lineHeight = 1.4, font = `500 ${fontSize}px Arial`) {
  ctx.font = font;
  const lines = wrapLines(ctx, text, maxWidth);
  return Math.max(fontSize * lineHeight, lines.length * fontSize * lineHeight);
}

function drawWrappedText(ctx, text, x, y, maxWidth, fontSize, color, lineHeight = 1.4, font = `500 ${fontSize}px Arial`) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = "left";
  const lines = wrapLines(ctx, text, maxWidth);
  const step = fontSize * lineHeight;
  lines.forEach((line, index) => ctx.fillText(line, x, y + fontSize + index * step));
  return y + lines.length * step;
}

function wrapLines(ctx, value, maxWidth) {
  const text = stringValue(value);
  const result = [];
  for (const paragraph of text.split(/\r?\n/)) {
    if (!paragraph.trim()) { result.push(""); continue; }
    const words = paragraph.trim().split(/\s+/);
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(candidate).width > maxWidth) {
        result.push(line);
        line = word;
      } else line = candidate;
    }
    result.push(line);
  }
  return result.length ? result : [""];
}

function signedNumber(value) { const n = Number(value) || 0; return n >= 0 ? `+${n}` : String(n); }

async function renderExportCanvas() {
  const requestedScale = Number(exportScaleSelect.value) || 2;
  const draft = structuredClone(currentDraft());
  const image = draft.imageDataUrl ? await loadImage(draft.imageDataUrl) : null;
  const scratch = document.createElement("canvas").getContext("2d");
  const logicalHeight = Math.ceil(drawStatblock(scratch, draft, LOGICAL_WIDTH, false, image, null));
  const dimensionLimit = 30000;
  const pixelLimit = 85000000;
  const safeScale = Math.max(0.45, Math.min(
    requestedScale,
    dimensionLimit / LOGICAL_WIDTH,
    dimensionLimit / logicalHeight,
    Math.sqrt(pixelLimit / (LOGICAL_WIDTH * logicalHeight))
  ));
  const canvas = document.createElement("canvas");
  renderStatblock(canvas, draft, safeScale, image);
  if (safeScale + 0.01 < requestedScale) {
    toast("La resolución se ajustó automáticamente para evitar exceder el límite del navegador.");
  }
  return canvas;
}

async function exportPng() {
  try {
    toast("Preparando PNG…");
    const canvas = await renderExportCanvas();
    const blob = await canvasToBlob(canvas, "image/png");
    downloadBlob(blob, `${safeFilename(currentDraft().title)}_${activeKind === "environment" ? "ambiente" : "adversario"}.png`);
    toast("PNG descargado.", "success");
  } catch (error) {
    console.error(error);
    toast("No fue posible exportar el PNG.", "error");
  }
}

async function exportPdf() {
  try {
    toast("Preparando PDF…");
    const canvas = await renderExportCanvas();
    const jpegBlob = await canvasToBlob(canvas, "image/jpeg", 0.94);
    const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());
    const pageWidth = 595.28;
    const pageHeight = pageWidth * canvas.height / canvas.width;
    const pdf = buildSingleImagePdf(jpegBytes, canvas.width, canvas.height, pageWidth, pageHeight);
    downloadBlob(new Blob([pdf], { type: "application/pdf" }), `${safeFilename(currentDraft().title)}_${activeKind === "environment" ? "ambiente" : "adversario"}.pdf`);
    toast("PDF descargado.", "success");
  } catch (error) {
    console.error(error);
    toast("No fue posible exportar el PDF.", "error");
  }
}

function buildSingleImagePdf(jpegBytes, imageWidth, imageHeight, pageWidth, pageHeight) {
  const encoder = new TextEncoder();
  const chunks = [];
  const offsets = [0];
  let length = 0;
  const push = (bytes) => { chunks.push(bytes); length += bytes.length; };
  const pushText = (text) => push(encoder.encode(text));
  const objectStart = (number) => { offsets[number] = length; pushText(`${number} 0 obj\n`); };

  pushText("%PDF-1.4\n%âãÏÓ\n");
  objectStart(1); pushText("<< /Type /Catalog /Pages 2 0 R >>\nendobj\n");
  objectStart(2); pushText("<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n");
  objectStart(3); pushText(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`);
  objectStart(4);
  pushText(`<< /Type /XObject /Subtype /Image /Width ${imageWidth} /Height ${imageHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  push(jpegBytes);
  pushText("\nendstream\nendobj\n");
  const content = `q\n${pageWidth.toFixed(2)} 0 0 ${pageHeight.toFixed(2)} 0 0 cm\n/Im0 Do\nQ\n`;
  objectStart(5); pushText(`<< /Length ${encoder.encode(content).length} >>\nstream\n${content}endstream\nendobj\n`);
  const xrefOffset = length;
  pushText("xref\n0 6\n0000000000 65535 f \n");
  for (let i = 1; i <= 5; i += 1) pushText(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  pushText(`trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

  const output = new Uint8Array(length);
  let cursor = 0;
  chunks.forEach((chunk) => { output.set(chunk, cursor); cursor += chunk.length; });
  return output;
}

function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("Canvas vacío")), type, quality));
}

function exportJson() {
  const payload = {
    app: "Forja de Bloques Daggerheart",
    version: APP_VERSION,
    exportedAt: new Date().toISOString(),
    block: structuredClone(currentDraft()),
  };
  downloadBlob(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }), `${safeFilename(currentDraft().title)}.json`);
  toast("JSON descargado.", "success");
}

async function importJsonFile() {
  const file = jsonFileInput.files?.[0];
  jsonFileInput.value = "";
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const raw = parsed.block || parsed;
    const kind = raw.kind === "adversary" ? "adversary" : raw.kind === "environment" ? "environment" : null;
    if (!kind) throw new Error("El archivo no identifica el tipo de bloque.");
    activeKind = kind;
    appState.activeKind = kind;
    appState.drafts[kind] = normalizeDraft(raw, kind);
    renderKindSwitch();
    renderEditor();
    schedulePreview();
    queueAutosave();
    toast("Bloque importado correctamente.", "success");
  } catch (error) {
    console.error(error);
    toast(`No se pudo importar el JSON: ${error.message}`, "error");
  }
}

function loadLibrary() {
  try { return JSON.parse(localStorage.getItem(LIBRARY_KEY) || "[]"); } catch { return []; }
}
function writeLibrary(items) { localStorage.setItem(LIBRARY_KEY, JSON.stringify(items)); }

function saveToLibrary() {
  const draft = currentDraft();
  const library = loadLibrary();
  const now = new Date().toISOString();
  let id = draft.currentId;
  if (!id) id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const record = { id, kind: activeKind, title: draft.title || "Sin título", updatedAt: now, data: { ...structuredClone(draft), currentId: id } };
  const existing = library.findIndex((item) => item.id === id);
  if (existing >= 0) library[existing] = record; else library.unshift(record);
  try {
    writeLibrary(library);
    draft.currentId = id;
    queueAutosave();
    toast(existing >= 0 ? "Bloque actualizado en la biblioteca." : "Bloque guardado en la biblioteca.", "success");
  } catch (error) {
    console.error(error);
    toast("No hay espacio suficiente en el almacenamiento local. Prueba exportando el JSON o usando una imagen más liviana.", "error");
  }
}

function renderLibrary() {
  const library = loadLibrary().sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
  if (!library.length) {
    libraryList.innerHTML = `<div class="library-empty"><p>No hay bloques guardados todavía.</p><p>Usa el botón <strong>Guardar</strong> para crear tu biblioteca local.</p></div>`;
    return;
  }
  libraryList.innerHTML = library.map((item) => `
    <article class="library-item">
      <div><h3>${escapeHtml(item.title || "Sin título")}</h3><p>${item.kind === "environment" ? "Ambiente" : "Adversario"} · ${formatDate(item.updatedAt)}</p></div>
      <div class="library-actions">
        <button type="button" data-library-action="load" data-id="${escapeAttr(item.id)}">Abrir</button>
        <button type="button" class="delete" data-library-action="delete" data-id="${escapeAttr(item.id)}">Eliminar</button>
      </div>
    </article>`).join("");
}

function handleLibraryClick(event) {
  const dialogAction = event.target.closest("[data-dialog-action]")?.dataset.dialogAction;
  if (dialogAction === "close") return libraryDialog.close();
  if (dialogAction === "clear") {
    openConfirm("Vaciar biblioteca", "Se eliminarán todos los bloques guardados en este navegador. Esta acción no se puede deshacer.", () => {
      localStorage.removeItem(LIBRARY_KEY);
      renderLibrary();
      toast("Biblioteca vaciada.", "success");
    });
    return;
  }
  const button = event.target.closest("[data-library-action]");
  if (!button) return;
  const library = loadLibrary();
  const index = library.findIndex((item) => item.id === button.dataset.id);
  if (index < 0) return;
  if (button.dataset.libraryAction === "load") {
    const record = library[index];
    activeKind = record.kind === "adversary" ? "adversary" : "environment";
    appState.activeKind = activeKind;
    appState.drafts[activeKind] = normalizeDraft(record.data, activeKind);
    appState.drafts[activeKind].currentId = record.id;
    renderKindSwitch();
    renderEditor();
    schedulePreview();
    queueAutosave();
    libraryDialog.close();
    toast("Bloque cargado desde la biblioteca.", "success");
  } else if (button.dataset.libraryAction === "delete") {
    openConfirm("Eliminar bloque", `Se eliminará “${recordTitle(library[index])}” de la biblioteca local.`, () => {
      library.splice(index, 1);
      writeLibrary(library);
      renderLibrary();
      toast("Bloque eliminado.", "success");
    });
  }
}

function recordTitle(record) { return record?.title || "Sin título"; }

function openConfirm(title, message, callback) {
  confirmTitle.textContent = title;
  confirmMessage.textContent = message;
  pendingConfirm = callback;
  confirmDialog.showModal();
}
function handleConfirmClick(event) {
  const action = event.target.closest("[data-confirm]")?.dataset.confirm;
  if (!action) return;
  if (action === "accept" && pendingConfirm) pendingConfirm();
  pendingConfirm = null;
  confirmDialog.close();
}

function toast(message, type = "info") {
  const element = document.createElement("div");
  element.className = `toast ${type}`;
  element.innerHTML = `<p>${escapeHtml(message)}</p>`;
  toastRegion.appendChild(element);
  setTimeout(() => { element.style.opacity = "0"; element.style.transform = "translateY(8px)"; }, 3200);
  setTimeout(() => element.remove(), 3550);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1200);
}

function safeFilename(value) {
  return stringValue(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "_").replace(/^_+|_+$/g, "").toLowerCase() || "statblock";
}
function idFromPath(path) { return `field-${path.replace(/[^a-zA-Z0-9]+/g, "-")}`; }
function escapeHtml(value) { return stringValue(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]); }
function escapeAttr(value) { return escapeHtml(value); }
function formatDate(value) { try { return new Intl.DateTimeFormat("es-CL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value)); } catch { return value; } }
