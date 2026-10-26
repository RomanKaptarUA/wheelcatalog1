const brandSelect = document.querySelector("#brand-select");
const modelSelect = document.querySelector("#model-select");
const generationSelect = document.querySelector("#generation-select");
const languageSelect = document.querySelector("#language-select");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status-message");
const resultsSection = document.querySelector("#results-section");
const resultsTitle = document.querySelector("#results-title");
const wheelGrid = document.querySelector("#wheel-grid");
const wheelSearch = document.querySelector("#wheel-search");
const emptyMessage = document.querySelector("#empty-message");

const translations = {
  en: {
    languageLabel: "Language",
    supportCreator: "Support the creator",
    supportCompact: "Support Creator",
    pageTitle: "Wheelcatalog — original wheels for your car",
    pageDescription: "Find original wheels for your car by make, model, and year.",
    heroEyebrow: "ORIGINAL WHEELS FOR YOUR CAR",
    heroHeadline: 'Find your<br><span class="headline-accent">original</span><br>wheels<span class="title-period">.</span>',
    heroDescription: "Browse wheels that were made for your car.",
    heroProof: "Original styles. Clear details.",
    catalogEyebrow: "CAR CATALOG",
    chooseCar: "Choose your car",
    startHere: "START HERE",
    make: "Make",
    model: "Model",
    generation: "Generation",
    findWheels: "Find wheels",
    loadingCatalog: "Loading catalog…",
    selectCar: "Select a car to browse the catalog.",
    yourResults: "YOUR RESULTS",
    searchPlaceholder: "Search by name…",
    searchAria: "Search wheels by name",
    noWheels: "No wheels found.",
    tryDifferent: "Try a different name.",
    footerLine: "Find wheels made for your car.",
    footerNote: "More cars coming soon",
    selectMake: "Select a make",
    selectMakeFirst: "Select a make first",
    selectModel: "Select a model",
    selectModelFirst: "Select a model first",
    selectGeneration: "Select a generation",
    loading: "Loading…",
    catalogUnavailable: "Catalog unavailable",
    couldNotLoadModels: "Could not load models",
    couldNotLoadGenerations: "Could not load generations",
    couldNotLoadCatalog: "Could not load the catalog.",
    requestFailed: "Something went wrong. Please try again.",
    nowSelectModel: "Now select a model.",
    selectCarGeneration: "Select a car generation.",
    carSelected: "Car selected — ready to find wheels.",
    searching: "Searching for wheels…",
    foundWheels: "Found {count} wheels. Details are not checked yet.",
    foundCheckedWheels: "Found {count} checked wheels.",
    wheelsFor: "Wheels for {generation}",
    checked: "Checked",
    checkDetails: "Check details",
    detailsComingSoon: "Details coming soon",
    oemComingSoon: "OEM number coming soon",
    originalDesign: "Original VW design",
    sizes: "SIZES",
    oem: "OEM",
    invalidMake: "Please select a valid car make.",
    invalidModel: "Please select a valid car model.",
    invalidGeneration: "Please select a valid car generation."
  },
  uk: {
    languageLabel: "Мова",
    supportCreator: "Підтримати автора",
    supportCompact: "Підтримати автора",
    pageTitle: "Wheelcatalog — оригінальні диски для вашого авто",
    pageDescription: "Знайдіть оригінальні диски для свого авто за маркою, моделлю та роком.",
    heroEyebrow: "ОРИГІНАЛЬНІ ДИСКИ ДЛЯ ВАШОГО АВТО",
    heroHeadline: 'Знайдіть<br><span class="headline-accent">рідні</span><br>диски<span class="title-period">.</span>',
    heroDescription: "Перегляньте диски, які встановлювалися на ваше авто.",
    heroProof: "Оригінальний дизайн. Зрозумілі дані.",
    catalogEyebrow: "КАТАЛОГ АВТО",
    chooseCar: "Оберіть авто",
    startHere: "ПОЧНІТЬ ТУТ",
    make: "Марка",
    model: "Модель",
    generation: "Покоління",
    findWheels: "Знайти диски",
    loadingCatalog: "Завантаження каталогу…",
    selectCar: "Оберіть авто, щоб переглянути каталог.",
    yourResults: "РЕЗУЛЬТАТИ",
    searchPlaceholder: "Пошук за назвою…",
    searchAria: "Пошук дисків за назвою",
    noWheels: "Диски не знайдено.",
    tryDifferent: "Спробуйте іншу назву.",
    footerLine: "Знайдіть диски для свого авто.",
    footerNote: "Каталог поповнюється",
    selectMake: "Оберіть марку",
    selectMakeFirst: "Спочатку оберіть марку",
    selectModel: "Оберіть модель",
    selectModelFirst: "Спочатку оберіть модель",
    selectGeneration: "Оберіть покоління",
    loading: "Завантаження…",
    catalogUnavailable: "Каталог недоступний",
    couldNotLoadModels: "Не вдалося завантажити моделі",
    couldNotLoadGenerations: "Не вдалося завантажити покоління",
    couldNotLoadCatalog: "Не вдалося завантажити каталог.",
    requestFailed: "Сталася помилка. Спробуйте ще раз.",
    nowSelectModel: "Тепер оберіть модель.",
    selectCarGeneration: "Оберіть покоління авто.",
    carSelected: "Авто обрано — можна шукати диски.",
    searching: "Шукаємо диски…",
    foundWheels: "Знайдено дисків: {count}. Дані ще не перевірені.",
    foundCheckedWheels: "Знайдено перевірених дисків: {count}.",
    wheelsFor: "Диски для {generation}",
    checked: "Перевірено",
    checkDetails: "Потрібна перевірка",
    detailsComingSoon: "Дані незабаром",
    oemComingSoon: "OEM-номер незабаром",
    originalDesign: "Оригінальний дизайн VW",
    sizes: "РОЗМІРИ",
    oem: "OEM",
    invalidMake: "Оберіть коректну марку авто.",
    invalidModel: "Оберіть коректну модель авто.",
    invalidGeneration: "Оберіть коректне покоління авто."
  },
  ru: {
    languageLabel: "Язык",
    supportCreator: "Поддержать автора",
    supportCompact: "Поддержать автора",
    pageTitle: "Wheelcatalog — оригинальные диски для вашего авто",
    pageDescription: "Найдите оригинальные диски для своего авто по марке, модели и году.",
    heroEyebrow: "ОРИГИНАЛЬНЫЕ ДИСКИ ДЛЯ ВАШЕГО АВТО",
    heroHeadline: 'Найдите<br><span class="headline-accent">родные</span><br>диски<span class="title-period">.</span>',
    heroDescription: "Посмотрите диски, которые устанавливались на ваш автомобиль.",
    heroProof: "Оригинальный дизайн. Понятные данные.",
    catalogEyebrow: "КАТАЛОГ АВТО",
    chooseCar: "Выберите авто",
    startHere: "НАЧНИТЕ ЗДЕСЬ",
    make: "Марка",
    model: "Модель",
    generation: "Поколение",
    findWheels: "Найти диски",
    loadingCatalog: "Загрузка каталога…",
    selectCar: "Выберите авто, чтобы посмотреть каталог.",
    yourResults: "РЕЗУЛЬТАТЫ",
    searchPlaceholder: "Поиск по названию…",
    searchAria: "Поиск дисков по названию",
    noWheels: "Диски не найдены.",
    tryDifferent: "Попробуйте другое название.",
    footerLine: "Найдите диски для своего авто.",
    footerNote: "Каталог пополняется",
    selectMake: "Выберите марку",
    selectMakeFirst: "Сначала выберите марку",
    selectModel: "Выберите модель",
    selectModelFirst: "Сначала выберите модель",
    selectGeneration: "Выберите поколение",
    loading: "Загрузка…",
    catalogUnavailable: "Каталог недоступен",
    couldNotLoadModels: "Не удалось загрузить модели",
    couldNotLoadGenerations: "Не удалось загрузить поколения",
    couldNotLoadCatalog: "Не удалось загрузить каталог.",
    requestFailed: "Произошла ошибка. Попробуйте ещё раз.",
    nowSelectModel: "Теперь выберите модель.",
    selectCarGeneration: "Выберите поколение автомобиля.",
    carSelected: "Авто выбрано — можно искать диски.",
    searching: "Ищем диски…",
    foundWheels: "Найдено дисков: {count}. Данные ещё не проверены.",
    foundCheckedWheels: "Найдено проверенных дисков: {count}.",
    wheelsFor: "Диски для {generation}",
    checked: "Проверено",
    checkDetails: "Нужно проверить",
    detailsComingSoon: "Данные скоро появятся",
    oemComingSoon: "OEM-номер скоро появится",
    originalDesign: "Оригинальный дизайн VW",
    sizes: "РАЗМЕРЫ",
    oem: "OEM",
    invalidMake: "Выберите корректную марку авто.",
    invalidModel: "Выберите корректную модель авто.",
    invalidGeneration: "Выберите корректное поколение авто."
  }
};

let currentLanguage = "en";
let currentWheels = [];
let brandItems = [];
let modelItems = [];
let generationItems = [];
let statusKey = "loadingCatalog";
let statusValues = {};
let statusIsError = false;
let modelPlaceholderKey = "selectMakeFirst";
let generationPlaceholderKey = "selectModelFirst";

function translate(key, values = {}) {
  let message = translations[currentLanguage][key] || translations.en[key] || key;
  for (const [name, value] of Object.entries(values)) {
    message = message.replaceAll(`{${name}}`, value);
  }
  return message;
}

function fillSelect(select, items, placeholderKey) {
  select.replaceChildren(new Option(translate(placeholderKey), ""));
  for (const item of items) {
    const label = item.years ? `${item.name} · ${item.years}` : item.name;
    select.add(new Option(label, item.id));
  }
  select.disabled = items.length === 0;
}

function refreshSelectors() {
  const selectedBrand = brandSelect.value;
  const selectedModel = modelSelect.value;
  const selectedGeneration = generationSelect.value;
  fillSelect(brandSelect, brandItems, brandItems.length ? "selectMake" : "loadingCatalog");
  fillSelect(modelSelect, modelItems, modelPlaceholderKey);
  fillSelect(generationSelect, generationItems, generationPlaceholderKey);
  brandSelect.value = selectedBrand;
  modelSelect.value = selectedModel;
  generationSelect.value = selectedGeneration;
}

function setStatus(key, isError = false, values = {}) {
  statusKey = key;
  statusValues = values;
  statusIsError = isError;
  statusMessage.textContent = translate(key, values);
  statusMessage.classList.toggle("error", isError);
}

function getErrorKey(error) {
  const errorKeys = {
    "Please select a valid car make.": "invalidMake",
    "Please select a valid car model.": "invalidModel",
    "Please select a valid car generation.": "invalidGeneration",
    "Could not load the catalog.": "couldNotLoadCatalog"
  };
  return errorKeys[error.message] || "requestFailed";
}

function updateResultsTitle() {
  const generation = generationItems.find((item) => item.id === generationSelect.value);
  if (!generation) return;
  const name = generation.years ? `${generation.name} · ${generation.years}` : generation.name;
  resultsTitle.textContent = translate("wheelsFor", { generation: name });
}

function setLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  localStorage.setItem("wheelcatalog-language", currentLanguage);
  languageSelect.value = currentLanguage;
  document.documentElement.lang = currentLanguage;
  document.title = translate("pageTitle");

  for (const element of document.querySelectorAll("[data-i18n]")) {
    element.textContent = translate(element.dataset.i18n);
  }
  for (const element of document.querySelectorAll("[data-i18n-html]")) {
    element.innerHTML = translate(element.dataset.i18nHtml);
  }
  for (const element of document.querySelectorAll("[data-i18n-aria]")) {
    element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  }
  for (const element of document.querySelectorAll("[data-i18n-placeholder]")) {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  }
  for (const element of document.querySelectorAll("[data-i18n-content]")) {
    element.content = translate(element.dataset.i18nContent);
  }

  refreshSelectors();
  statusMessage.textContent = translate(statusKey, statusValues);
  statusMessage.classList.toggle("error", statusIsError);
  if (!resultsSection.hidden) {
    updateResultsTitle();
    renderWheels();
  }
}

async function loadOptions(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || "Could not load the catalog.");
  }
  return response.json();
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function renderWheels() {
  const searchTerm = wheelSearch.value.trim().toLocaleLowerCase(currentLanguage);
  const visibleWheels = currentWheels.filter((wheel) =>
    `${wheel.name} ${wheel.style}`.toLocaleLowerCase(currentLanguage).includes(searchTerm)
  );

  wheelGrid.innerHTML = visibleWheels.map((wheel) => {
    const status = wheel.verified ? translate("checked") : translate("checkDetails");
    const sizeSummary = wheel.sizes.length
      ? wheel.sizes.map((size) => `R${size.diameter} ${size.width}J ET${size.et}`).join(" · ")
      : translate("detailsComingSoon");
    const oemSummary = wheel.oemNumbers.length
      ? wheel.oemNumbers.join(", ")
      : translate("oemComingSoon");
    const style = wheel.style === "Original VW design" ? translate("originalDesign") : wheel.style;

    return `
      <article class="wheel-card">
        <div class="wheel-visual" aria-hidden="true">
          ${wheel.image
            ? `<img class="wheel-photo" src="${escapeHtml(wheel.image)}" alt="">`
            : '<span class="mini-wheel"></span>'}
          <span class="demo-badge">${escapeHtml(status)}</span>
        </div>
        <div class="wheel-info">
          <div class="wheel-title-row"><h3>${escapeHtml(wheel.name)}</h3></div>
          <p class="wheel-style">${escapeHtml(style)}</p>
          <div class="wheel-meta"><span>${escapeHtml(translate("sizes"))}</span><strong>${escapeHtml(sizeSummary)}</strong></div>
          <div class="wheel-meta"><span>${escapeHtml(translate("oem"))}</span><strong>${escapeHtml(oemSummary)}</strong></div>
        </div>
      </article>`;
  }).join("");

  emptyMessage.hidden = visibleWheels.length > 0;
}

async function searchWheels() {
  const generationId = generationSelect.value;
  if (!generationId) return;

  searchButton.disabled = true;
  setStatus("searching");
  try {
    currentWheels = await loadOptions(`/api/wheels?generation=${encodeURIComponent(generationId)}`);
    updateResultsTitle();
    resultsSection.hidden = false;
    wheelSearch.value = "";
    renderWheels();

    const unverifiedCount = currentWheels.filter((wheel) => !wheel.verified).length;
    setStatus(unverifiedCount
      ? "foundWheels"
      : "foundCheckedWheels", false, { count: currentWheels.length });
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    setStatus(getErrorKey(error), true);
  } finally {
    searchButton.disabled = false;
  }
}

async function initialize() {
  setLanguage(localStorage.getItem("wheelcatalog-language") || "en");
  try {
    brandItems = await loadOptions("/api/brands");
    refreshSelectors();
    brandSelect.disabled = false;
    setStatus("selectCar");
  } catch (error) {
    fillSelect(brandSelect, [], "catalogUnavailable");
    setStatus(getErrorKey(error), true);
  }
}

languageSelect.addEventListener("change", () => setLanguage(languageSelect.value));

brandSelect.addEventListener("change", async () => {
  modelItems = [];
  generationItems = [];
  modelPlaceholderKey = "loading";
  generationPlaceholderKey = "selectModelFirst";
  refreshSelectors();
  resultsSection.hidden = true;
  searchButton.disabled = true;
  if (!brandSelect.value) {
    modelPlaceholderKey = "selectMakeFirst";
    refreshSelectors();
    return;
  }

  try {
    modelItems = await loadOptions(`/api/models?brand=${encodeURIComponent(brandSelect.value)}`);
    modelPlaceholderKey = "selectModel";
    refreshSelectors();
    setStatus("nowSelectModel");
  } catch (error) {
    modelPlaceholderKey = "couldNotLoadModels";
    refreshSelectors();
    setStatus(getErrorKey(error), true);
  }
});

modelSelect.addEventListener("change", async () => {
  generationItems = [];
  generationPlaceholderKey = "loading";
  refreshSelectors();
  resultsSection.hidden = true;
  searchButton.disabled = true;
  if (!modelSelect.value) {
    generationPlaceholderKey = "selectModelFirst";
    refreshSelectors();
    return;
  }

  try {
    generationItems = await loadOptions(`/api/generations?model=${encodeURIComponent(modelSelect.value)}`);
    generationPlaceholderKey = "selectGeneration";
    refreshSelectors();
    setStatus("selectCarGeneration");
  } catch (error) {
    generationPlaceholderKey = "couldNotLoadGenerations";
    refreshSelectors();
    setStatus(getErrorKey(error), true);
  }
});

generationSelect.addEventListener("change", () => {
  searchButton.disabled = !generationSelect.value;
  resultsSection.hidden = true;
  if (generationSelect.value) setStatus("carSelected");
});

searchButton.addEventListener("click", searchWheels);
wheelSearch.addEventListener("input", renderWheels);

initialize();
