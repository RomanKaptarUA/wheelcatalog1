const languageSelect = document.querySelector("#language-select");
const languageControl = document.querySelector(".language-control");
const languageTrigger = document.querySelector("#language-trigger");
const languageMenu = document.querySelector("#language-menu");
const currentLanguageFlag = document.querySelector("#language-current-flag");
const currentLanguageName = document.querySelector("#language-current-name");
const searchForm = document.querySelector("#vehicle-search-form");
const modelSelect = document.querySelector("#model-select");
const generationSelect = document.querySelector("#generation-select");
const searchButton = document.querySelector("#search-button");
const statusMessage = document.querySelector("#status-message");
const profileSection = document.querySelector("#vehicle-profile");
const profileContent = document.querySelector("#profile-content");
const supportButton = document.querySelector("#support-button");
const supportDialog = document.querySelector("#support-dialog");
const supportDialogClose = document.querySelector("#support-dialog-close");

const languageNames = { en: "English", uk: "Українська", ru: "Русский" };
const languageFlags = {
  en: '<svg viewBox="0 0 24 16" focusable="false"><rect width="24" height="16" fill="#24477d"/><path d="M0 0 24 16M24 0 0 16" stroke="#fff" stroke-width="4"/><path d="M0 0 24 16M24 0 0 16" stroke="#c8102e" stroke-width="1.5"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="6"/><path d="M12 0v16M0 8h24" stroke="#c8102e" stroke-width="2.5"/></svg>',
  uk: '<svg viewBox="0 0 24 16" focusable="false"><rect width="24" height="8" fill="#0057b7"/><rect y="8" width="24" height="8" fill="#ffd700"/></svg>',
  ru: '<svg viewBox="0 0 24 16" focusable="false"><rect width="24" height="5.34" fill="#fff"/><rect y="5.33" width="24" height="5.34" fill="#2453a6"/><rect y="10.66" width="24" height="5.34" fill="#d52b1e"/></svg>'
};

const translations = {
  en: {
    pageTitle: "VWCatalog — Volkswagen model guide",
    pageDescription: "Discover Volkswagen models, generations, features, advantages, and trade-offs.",
    languageLabel: "Language",
    supportCreator: "Support creator",
    supportAmount: "Donation amount (UAH)",
    paymentComingSoon: "Payment setup will be added later",
    closeSupport: "Close support dialog",
    navAria: "Main navigation",
    navModels: "Models",
    navAbout: "About the guide",
    heroEyebrow: "THE VOLKSWAGEN MODEL GUIDE",
    heroHeadline: "More than a car.<br><span class=\"headline-accent\">A story of your own.</span>",
    heroDescription: "Explore Volkswagen models, generations, key facts, strengths, and trade-offs.",
    heroProof: "Open sources. Clear context.",
    heroCta: "Explore models",
    heroCaption: "A guide made for people who love Volkswagen.",
    catalogEyebrow: "MODEL LIBRARY",
    chooseCar: "Find a Volkswagen",
    model: "Model",
    generation: "Generation",
    modelAria: "Choose a Volkswagen model",
    generationAria: "Choose a Volkswagen generation",
    selectModelOption: "Choose a model…",
    selectGenerationOption: "Choose a model first…",
    chooseGenerationOption: "Choose a generation…",
    findCar: "Explore model",
    loadingCatalog: "Loading Volkswagen models…",
    selectCar: "Choose a model, then choose its generation.",
    loadingProfile: "Loading model information…",
    profileLoaded: "Model guide loaded.",
    couldNotLoadModels: "Could not load Volkswagen models. Please refresh and try again.",
    requestFailed: "Could not load model information. Please try again.",
    modelNotFound: "That model is not in this Volkswagen catalog.",
    presentation: "ABOUT THE MODEL",
    overview: "Model overview",
    strengths: "ADVANTAGES",
    tradeoffs: "THINGS TO CONSIDER",
    generations: "GENERATIONS IN THIS GUIDE",
    selectedGeneration: "Selected generation",
    guides: "OWNERSHIP GUIDES",
    guidesDescription: "Guides to common issues, diagnosis, maintenance, and repairs are planned for a future update.",
    comingSoon: "COMING LATER",
    photoUnavailable: "No photos yet. Add them as:",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    overviewUnavailable: "A sourced overview is not available right now.",
    source: "Source",
    wikipediaLicense: "Wikipedia contributors · CC BY-SA",
    factsNote: "Specifications vary by generation, engine, trim, and market. Confirm the exact vehicle before making a purchase or repair decision.",
    independentDisclaimer: "VWCatalog is an independent guide and is not affiliated with or endorsed by Volkswagen AG. Volkswagen names and trademarks belong to their respective owners.",
    footerLine: "A growing guide to Volkswagen cars.",
    footerNote: "Repair guides coming later"
  },
  uk: {
    pageTitle: "VWCatalog — довідник моделей Volkswagen",
    pageDescription: "Огляд моделей і поколінь Volkswagen, їхні характеристики, переваги та компроміси.",
    languageLabel: "Мова",
    supportCreator: "Підтримати автора",
    supportAmount: "Сума донату (грн)",
    paymentComingSoon: "Оплату буде підключено пізніше",
    closeSupport: "Закрити вікно підтримки",
    navAria: "Головна навігація",
    navModels: "Моделі",
    navAbout: "Про довідник",
    heroEyebrow: "ДОВІДНИК МОДЕЛЕЙ VOLKSWAGEN",
    heroHeadline: "Більше, ніж авто.<br><span class=\"headline-accent\">Ваша власна історія.</span>",
    heroDescription: "Моделі, покоління, основні факти, переваги та нюанси володіння.",
    heroProof: "Відкриті джерела. Зрозумілий контекст.",
    heroCta: "Переглянути моделі",
    heroCaption: "Довідник для тих, хто любить Volkswagen.",
    catalogEyebrow: "БІБЛІОТЕКА МОДЕЛЕЙ",
    chooseCar: "Знайдіть Volkswagen",
    model: "Модель",
    generation: "Покоління",
    modelAria: "Оберіть модель Volkswagen",
    generationAria: "Оберіть покоління Volkswagen",
    selectModelOption: "Оберіть модель…",
    selectGenerationOption: "Спочатку оберіть модель…",
    chooseGenerationOption: "Оберіть покоління…",
    findCar: "Переглянути",
    loadingCatalog: "Завантажую моделі Volkswagen…",
    selectCar: "Оберіть модель, а потім її покоління.",
    loadingProfile: "Завантажую інформацію про модель…",
    profileLoaded: "Довідку про модель завантажено.",
    couldNotLoadModels: "Не вдалося завантажити моделі Volkswagen. Оновіть сторінку й спробуйте ще раз.",
    requestFailed: "Не вдалося завантажити інформацію про модель. Спробуйте ще раз.",
    modelNotFound: "Цієї моделі немає в каталозі Volkswagen.",
    presentation: "ПРО МОДЕЛЬ",
    overview: "Огляд моделі",
    strengths: "ПЕРЕВАГИ",
    tradeoffs: "ЩО ВАРТО ВРАХУВАТИ",
    generations: "ПОКОЛІННЯ В ДОВІДНИКУ",
    selectedGeneration: "Обране покоління",
    guides: "ПОРАДИ ВЛАСНИКАМ",
    guidesDescription: "Гайди про типові проблеми, діагностику, обслуговування й ремонт плануються в наступних оновленнях.",
    comingSoon: "ЗГОДОМ",
    photoUnavailable: "Фото ще не додано. Назвіть файли так:",
    previousPhoto: "Попереднє фото",
    nextPhoto: "Наступне фото",
    overviewUnavailable: "Зараз немає доступного огляду з посиланням на джерело.",
    source: "Джерело",
    wikipediaLicense: "Автори Вікіпедії · CC BY-SA",
    factsNote: "Характеристики залежать від покоління, двигуна, комплектації та ринку. Перевіряйте конкретне авто перед купівлею чи ремонтом.",
    independentDisclaimer: "VWCatalog — незалежний довідник, не пов’язаний із Volkswagen AG і не схвалений компанією. Назви Volkswagen і відповідні торговельні марки належать їхнім власникам.",
    footerLine: "Довідник автомобілів Volkswagen поповнюється.",
    footerNote: "Гайди з ремонту — згодом"
  },
  ru: {
    pageTitle: "VWCatalog — справочник моделей Volkswagen",
    pageDescription: "Обзор моделей и поколений Volkswagen, их характеристики, преимущества и компромиссы.",
    languageLabel: "Язык",
    supportCreator: "Поддержать автора",
    supportAmount: "Сумма пожертвования (грн)",
    paymentComingSoon: "Оплата будет подключена позже",
    closeSupport: "Закрыть окно поддержки",
    navAria: "Главная навигация",
    navModels: "Модели",
    navAbout: "О справочнике",
    heroEyebrow: "СПРАВОЧНИК МОДЕЛЕЙ VOLKSWAGEN",
    heroHeadline: "Больше, чем авто.<br><span class=\"headline-accent\">Ваша история.</span>",
    heroDescription: "Модели, поколения, основные факты, преимущества и нюансы владения.",
    heroProof: "Открытые источники. Понятный контекст.",
    heroCta: "Смотреть модели",
    heroCaption: "Справочник для тех, кто любит Volkswagen.",
    catalogEyebrow: "БИБЛИОТЕКА МОДЕЛЕЙ",
    chooseCar: "Найдите Volkswagen",
    model: "Модель",
    generation: "Поколение",
    modelAria: "Выберите модель Volkswagen",
    generationAria: "Выберите поколение Volkswagen",
    selectModelOption: "Выберите модель…",
    selectGenerationOption: "Сначала выберите модель…",
    chooseGenerationOption: "Выберите поколение…",
    findCar: "Посмотреть",
    loadingCatalog: "Загружаю модели Volkswagen…",
    selectCar: "Выберите модель, затем её поколение.",
    loadingProfile: "Загружаю информацию о модели…",
    profileLoaded: "Справка о модели загружена.",
    couldNotLoadModels: "Не удалось загрузить модели Volkswagen. Обновите страницу и попробуйте ещё раз.",
    requestFailed: "Не удалось загрузить информацию о модели. Попробуйте ещё раз.",
    modelNotFound: "Этой модели нет в каталоге Volkswagen.",
    presentation: "О МОДЕЛИ",
    overview: "Обзор модели",
    strengths: "ПРЕИМУЩЕСТВА",
    tradeoffs: "ЧТО УЧЕСТЬ",
    generations: "ПОКОЛЕНИЯ В СПРАВОЧНИКЕ",
    selectedGeneration: "Выбранное поколение",
    guides: "СОВЕТЫ ВЛАДЕЛЬЦАМ",
    guidesDescription: "Гайды о типичных проблемах, диагностике, обслуживании и ремонте планируются в следующих обновлениях.",
    comingSoon: "ПОЗЖЕ",
    photoUnavailable: "Фото ещё не добавлено. Назовите файлы так:",
    previousPhoto: "Предыдущее фото",
    nextPhoto: "Следующее фото",
    overviewUnavailable: "Сейчас нет доступного обзора со ссылкой на источник.",
    source: "Источник",
    wikipediaLicense: "Авторы Википедии · CC BY-SA",
    factsNote: "Характеристики зависят от поколения, двигателя, комплектации и рынка. Проверяйте конкретный автомобиль перед покупкой или ремонтом.",
    independentDisclaimer: "VWCatalog — независимый справочник, не связанный с Volkswagen AG и не одобренный компанией. Названия Volkswagen и соответствующие товарные знаки принадлежат их владельцам.",
    footerLine: "Справочник автомобилей Volkswagen пополняется.",
    footerNote: "Гайды по ремонту — позже"
  }
};

const editorialNotes = {
  en: {
    compact: ["Compact dimensions can make everyday driving and parking easier.", "Multiple generations and body styles give buyers a broad choice of size and equipment.", "Equipment, condition, and running costs vary widely across generations and engines.", "Older examples may lack newer safety and comfort features; check the equipment on the exact car."],
    sedan: ["A conventional saloon layout offers a separate luggage compartment.", "Many versions are designed for comfortable everyday and long-distance travel.", "A saloon is less flexible for bulky loads than a hatchback or estate.", "Engines, equipment, and upkeep vary widely by generation and market."],
    suv: ["A taller body and flexible cabin can suit family use and varied road conditions.", "The model range offers different sizes and equipment levels across generations.", "Larger dimensions can make parking harder than in a compact car.", "Fuel use, capability, and maintenance depend on the exact version."],
    van: ["Flexible seating and cargo layouts support passenger or load-carrying needs.", "Some versions are configured for travel, work, or camper use.", "Size can make everyday parking and manoeuvring more difficult.", "Configuration and intensive prior use can affect running costs and condition."],
    pickup: ["A pickup combines passenger transport with an open load bed.", "Selected configurations can support work and towing duties; check the exact rated capacity.", "Large dimensions can make city driving and parking more demanding.", "Work use can mean heavy wear, so condition and service history deserve attention."],
    sports: ["A more driver-focused design gives the model a distinct character among Volkswagen cars.", "The coupé-like styling sets it apart from more practical models in the range.", "A sporty body can be less practical for passengers and bulky loads.", "Upkeep and parts availability depend on age, version, and condition."],
    utility: ["A practical, straightforward format can suit work and everyday transport.", "Different body and payload versions can support varied commercial needs.", "Age and intensive use can have a significant effect on condition.", "Parts and service needs depend on the exact year and regional specification."],
    default: ["The model has several generations and configurations to choose from.", "The generation list helps compare the broad production periods at a glance.", "Equipment and running costs vary by year, engine, and market.", "Condition, reliability, and repair needs depend on the individual vehicle and its maintenance history."]
  },
  uk: {
    compact: ["Компактні розміри зручні для міста й паркування.", "Різні покоління та кузови дають вибір розміру й оснащення.", "Двигуни, оснащення, стан і витрати різняться за поколіннями.", "У старших версіях може не бути сучасних систем безпеки й комфорту."],
    sedan: ["Класичний кузов седан має окремий багажник.", "Багато версій зручні для щоденних і далеких поїздок.", "Седан менш зручний для габаритних речей, ніж хетчбек чи універсал.", "Двигуни, оснащення й витрати різняться за поколіннями та ринками."],
    suv: ["Вищий кузов і гнучкий салон можуть бути зручними для сім'ї та різних доріг.", "У різних поколіннях є вибір розміру й оснащення.", "Через більші розміри складніше паркуватися, ніж у компактному авто.", "Витрата пального, можливості й обслуговування залежать від конкретної версії."],
    van: ["Гнучке компонування сидінь і багажного простору підходить для пасажирських або вантажних потреб.", "Окремі версії пристосовані для подорожей, роботи чи кемпінгу.", "Через розмір складніше паркуватися й маневрувати.", "Попереднє інтенсивне використання впливає на витрати й стан авто."],
    pickup: ["Пікап поєднує пасажирський салон із відкритою вантажною платформою.", "Окремі комплектації підходять для роботи та буксирування; перевіряйте допустиме навантаження.", "Через великі розміри складніше їздити й паркуватися в місті.", "Робоче використання може означати значний знос — перевірте стан і сервісну історію."],
    sports: ["Більш орієнтований на водія дизайн вирізняє модель серед Volkswagen.", "Купеподібний стиль відрізняє її від практичніших моделей.", "Спортивний кузов може бути менш зручним для пасажирів і габаритних речей.", "Витрати й доступність деталей залежать від віку, версії та стану."],
    utility: ["Практичний формат підходить для роботи й щоденних поїздок.", "Різні кузови та вантажність допомагають підібрати авто для різних комерційних завдань.", "Вік та інтенсивне використання можуть суттєво впливати на стан.", "Запчастини й обслуговування залежать від року та регіональної версії."],
    default: ["Модель має кілька поколінь і різних конфігурацій.", "Список поколінь допомагає порівняти основні періоди виробництва.", "Оснащення й витрати залежать від року, двигуна та ринку.", "Стан, надійність і потреба в ремонті залежать від конкретного авто та його історії обслуговування."]
  },
  ru: {
    compact: ["Компактные размеры удобны для города и парковки.", "Разные поколения и кузова дают выбор размера и оснащения.", "Двигатели, оснащение, состояние и расходы различаются по поколениям.", "В старших версиях может не быть современных систем безопасности и комфорта."],
    sedan: ["Классический кузов седан имеет отдельный багажник.", "Многие версии удобны для повседневных и дальних поездок.", "Седан менее удобен для крупных вещей, чем хетчбэк или универсал.", "Двигатели, оснащение и расходы различаются по поколениям и рынкам."],
    suv: ["Высокий кузов и гибкий салон могут быть удобны для семьи и разных дорог.", "В разных поколениях есть выбор размера и оснащения.", "Из-за крупных размеров сложнее парковаться, чем на компактном автомобиле.", "Расход топлива, возможности и обслуживание зависят от конкретной версии."],
    van: ["Гибкая компоновка сидений и багажного пространства подходит для пассажирских или грузовых задач.", "Некоторые версии предназначены для путешествий, работы или кемпинга.", "Из-за размера сложнее парковаться и маневрировать.", "Предыдущая интенсивная эксплуатация влияет на расходы и состояние автомобиля."],
    pickup: ["Пикап сочетает пассажирский салон с открытой грузовой платформой.", "Отдельные комплектации подходят для работы и буксировки; проверяйте допустимую нагрузку.", "Из-за крупных размеров сложнее ездить и парковаться в городе.", "Рабочая эксплуатация может означать сильный износ — проверьте состояние и историю обслуживания."],
    sports: ["Более ориентированный на водителя дизайн выделяет модель среди Volkswagen.", "Купеобразный стиль отличает её от более практичных моделей.", "Спортивный кузов может быть менее удобным для пассажиров и крупных вещей.", "Расходы и доступность деталей зависят от возраста, версии и состояния."],
    utility: ["Практичный формат подходит для работы и повседневных поездок.", "Разные кузова и грузоподъёмность позволяют подобрать автомобиль для коммерческих задач.", "Возраст и интенсивная эксплуатация могут сильно влиять на состояние.", "Запчасти и обслуживание зависят от года и региональной версии."],
    default: ["У модели есть несколько поколений и различных конфигураций.", "Список поколений помогает сравнить основные периоды производства.", "Оснащение и расходы зависят от года, двигателя и рынка.", "Состояние, надёжность и ремонт зависят от конкретного автомобиля и истории обслуживания."]
  }
};

let currentLanguage = "en";
let models = [];
let currentProfile = null;
let requestInProgress = false;

function translate(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
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

function setStatus(key, isError = false) {
  statusMessage.textContent = translate(key);
  statusMessage.classList.toggle("error", isError);
}

function setLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  localStorage.setItem("wheelcatalog-language", currentLanguage);
  languageSelect.value = currentLanguage;
  currentLanguageFlag.innerHTML = languageFlags[currentLanguage];
  currentLanguageName.textContent = languageNames[currentLanguage];
  for (const option of languageMenu.querySelectorAll("[data-language-option]")) {
    const optionLanguage = option.dataset.languageOption;
    option.querySelector(".language-flag").innerHTML = languageFlags[optionLanguage];
    option.setAttribute("aria-pressed", String(optionLanguage === currentLanguage));
  }
  languageMenu.hidden = true;
  languageTrigger.setAttribute("aria-expanded", "false");
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
  for (const element of document.querySelectorAll("[data-i18n-content]")) {
    element.content = translate(element.dataset.i18nContent);
  }

  addListItems();
  if (currentProfile) renderProfile(currentProfile);
  else setStatus(models.length ? "selectCar" : "loadingCatalog");
}

async function loadJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new Error(result.error || translate("requestFailed"));
  }
  return response.json();
}

function addListItems() {
  const selectedModelId = modelSelect.value;
  modelSelect.replaceChildren(new Option(translate("selectModelOption"), ""));
  for (const model of models) {
    modelSelect.add(new Option(model.name, model.id));
  }
  modelSelect.value = selectedModelId;
  modelSelect.disabled = models.length === 0;
  updateGenerationOptions();
}

function updateGenerationOptions() {
  const selectedGenerationId = generationSelect.value;
  const model = models.find((item) => item.id === modelSelect.value);
  generationSelect.replaceChildren(new Option(translate(
    model ? "chooseGenerationOption" : "selectGenerationOption"
  ), ""));
  for (const generation of model?.generations || []) {
    const label = generation.years ? `${generation.name} · ${generation.years}` : generation.name;
    generationSelect.add(new Option(label, generation.id));
  }
  generationSelect.value = selectedGenerationId;
  generationSelect.disabled = !model;
  searchButton.disabled = !model || !generationSelect.value || requestInProgress;
}

function renderList(items) {
  if (!items.length) return `<p class="profile-empty">—</p>`;
  return `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function renderPhotoPlaceholder(model, generation) {
  const message = translate("photoUnavailable");
  const imagePath = `public/images/cars/${model.id}/${generation.id}`;
  return `<div class="vehicle-photo-placeholder" role="img" aria-label="${escapeHtml(`${message} ${imagePath}`)}">
    <span>VW</span><p>${escapeHtml(message)}</p>
    <code>${escapeHtml(`${imagePath}/1.webp\n${imagePath}/2.webp\n${imagePath}/3.webp\n${imagePath}/4.webp`)}</code>
  </div>`;
}

function renderPhotoBlock(profile) {
  const { model, selectedGeneration, photos } = profile;
  if (!photos?.length) return renderPhotoPlaceholder(model, selectedGeneration);

  const photoAlt = escapeHtml(`${model.name} — ${selectedGeneration.name}`);
  const image = `<img class="vehicle-photo" src="${escapeHtml(photos[0].url)}" alt="${photoAlt}" decoding="async" fetchpriority="high">`;
  if (photos.length === 1) return image;

  const photoButtons = photos.map((_, index) => `
    <button class="vehicle-gallery-dot${index === 0 ? " is-active" : ""}" type="button"
      data-photo-index="${index}" aria-label="${escapeHtml(`${index + 1} / ${photos.length}`)}"
      aria-pressed="${index === 0}"></button>`).join("");
  return `<div class="vehicle-gallery" data-photo-gallery>
    ${image}
    <button class="vehicle-gallery-arrow is-previous" type="button" data-photo-step="-1"
      aria-label="${escapeHtml(translate("previousPhoto"))}">‹</button>
    <button class="vehicle-gallery-arrow is-next" type="button" data-photo-step="1"
      aria-label="${escapeHtml(translate("nextPhoto"))}">›</button>
    <div class="vehicle-gallery-controls">
      <span class="vehicle-gallery-count" aria-live="polite">1 / ${photos.length}</span>
      <div class="vehicle-gallery-dots">${photoButtons}</div>
    </div>
  </div>`;
}

function attachPhotoGalleryHandlers(profile) {
  const gallery = profileContent.querySelector("[data-photo-gallery]");
  if (!gallery) return;

  const photos = profile.photos;
  const photoElement = gallery.querySelector(".vehicle-photo");
  const counter = gallery.querySelector(".vehicle-gallery-count");
  const dots = [...gallery.querySelectorAll(".vehicle-gallery-dot")];
  let photoIndex = 0;
  let touchStartX = null;

  function showPhoto(index) {
    photoIndex = (index + photos.length) % photos.length;
    photoElement.src = photos[photoIndex].url;
    counter.textContent = `${photoIndex + 1} / ${photos.length}`;
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === photoIndex;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-pressed", String(active));
    });
  }

  gallery.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.photoStep) {
      showPhoto(photoIndex + Number(button.dataset.photoStep));
    } else if (button.dataset.photoIndex !== undefined) {
      showPhoto(Number(button.dataset.photoIndex));
    }
  });
  photoElement.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });
  photoElement.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 40) showPhoto(photoIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });
  photoElement.addEventListener("error", () => {
    profile.photos.splice(photoIndex, 1);
    if (!profile.photos.length) {
      gallery.closest(".vehicle-media").innerHTML = renderPhotoPlaceholder(
        profile.model,
        profile.selectedGeneration
      );
      return;
    }
    gallery.closest(".vehicle-media").innerHTML = renderPhotoBlock(profile);
    attachPhotoGalleryHandlers(profile);
  }, { once: true });
}

function renderProfile(profile) {
  const { model, presentation, presentationError, advantages, tradeoffs, selectedGeneration } = profile;
  const modelName = escapeHtml(model.name);
  const generations = model.generations.map((generation) => `
    <li>
      <button class="generation-chip${selectedGeneration?.id === generation.id ? " is-selected" : ""}"
        type="button" data-generation-id="${escapeHtml(generation.id)}"
        aria-pressed="${selectedGeneration?.id === generation.id}">
        <span>${escapeHtml(generation.name)}</span><small>${escapeHtml(generation.years || "")}</small>
      </button>
    </li>`).join("");
  const photoBlock = renderPhotoBlock(profile);
  const overview = presentation
    ? `<p>${escapeHtml(presentation.extract)}</p>
       <p class="source-credit">${escapeHtml(translate("source"))}: <a href="${escapeHtml(presentation.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(presentation.title)}</a> · <a href="${escapeHtml(presentation.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(translate("wikipediaLicense"))}</a></p>`
    : `<p class="profile-empty">${escapeHtml(translate("overviewUnavailable"))}${presentationError ? ` ${escapeHtml(presentationError)}` : ""}</p>`;
  profileContent.innerHTML = `
    <div class="profile-title">
      <div><p class="eyebrow">${escapeHtml(translate("presentation"))}</p><h2>${modelName}</h2></div>
      ${selectedGeneration ? `<span class="selected-generation">${escapeHtml(translate("selectedGeneration"))}: ${escapeHtml(selectedGeneration.name)}</span>` : ""}
    </div>
    <div class="vehicle-intro">
      <figure class="vehicle-media">${photoBlock}</figure>
      <div class="vehicle-overview">
        <p class="eyebrow">${escapeHtml(translate("overview"))}</p>
        ${overview}
        <p class="facts-note">${escapeHtml(translate("factsNote"))}</p>
      </div>
    </div>
    <div class="pros-cons-grid">
      <section class="editorial-panel"><p class="eyebrow">${escapeHtml(translate("strengths"))}</p>${renderList(advantages)}</section>
      <section class="editorial-panel"><p class="eyebrow">${escapeHtml(translate("tradeoffs"))}</p>${renderList(tradeoffs)}</section>
    </div>
    <section class="generation-panel">
      <p class="eyebrow">${escapeHtml(translate("generations"))}</p>
      <ul class="generation-list">${generations}</ul>
    </section>
    <section class="guides-panel">
      <div><p class="eyebrow">${escapeHtml(translate("guides"))}</p><p>${escapeHtml(translate("guidesDescription"))}</p></div>
      <span class="coming-soon">${escapeHtml(translate("comingSoon"))}</span>
    </section>`;

  attachPhotoGalleryHandlers(profile);
}

profileContent.addEventListener("click", (event) => {
  const generationButton = event.target.closest("[data-generation-id]");
  if (!generationButton || requestInProgress) return;

  const generationId = generationButton.dataset.generationId;
  if (generationSelect.value === generationId) return;
  generationSelect.value = generationId;
  searchButton.disabled = !modelSelect.value || !generationSelect.value;
  exploreModel(new Event("submit", { cancelable: true }));
});

function loadEditorial(vehicleClass) {
  const notes = editorialNotes[currentLanguage];
  return notes[vehicleClass] || notes.default;
}

async function exploreModel(event) {
  event.preventDefault();
  if (requestInProgress) return;

  const model = models.find((item) => item.id === modelSelect.value);
  const generation = model?.generations.find((item) => item.id === generationSelect.value);
  if (!model || !generation) {
    currentProfile = null;
    profileSection.hidden = true;
    setStatus("selectCar");
    return;
  }

  requestInProgress = true;
  searchButton.disabled = true;
  profileSection.hidden = true;
  setStatus("loadingProfile");
  const generationQuery = `&generation=${encodeURIComponent(generation.id)}`;
  try {
    currentProfile = await loadJson(`/api/vehicles/${encodeURIComponent(model.id)}?language=${encodeURIComponent(currentLanguage)}${generationQuery}`);
    const notes = loadEditorial(currentProfile.model.vehicleClass);
    currentProfile.advantages = notes.slice(0, 2);
    currentProfile.tradeoffs = notes.slice(2);
    renderProfile(currentProfile);
    profileSection.hidden = false;
    setStatus("profileLoaded");
    profileSection.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    currentProfile = null;
    setStatus(error.message === "Vehicle model not found." ? "modelNotFound" : "requestFailed", true);
  } finally {
    requestInProgress = false;
    searchButton.disabled = !modelSelect.value || !generationSelect.value;
  }
}

async function initialize() {
  setLanguage(localStorage.getItem("wheelcatalog-language") || "en");
  try {
    models = await loadJson("/api/models?brand=volkswagen");
    addListItems();
    setStatus("selectCar");
  } catch {
    setStatus("couldNotLoadModels", true);
  }
}

modelSelect.addEventListener("change", () => {
  generationSelect.value = "";
  updateGenerationOptions();
  profileSection.hidden = true;
  if (modelSelect.value) setStatus("selectCar");
});
generationSelect.addEventListener("change", () => {
  searchButton.disabled = !modelSelect.value || !generationSelect.value || requestInProgress;
  profileSection.hidden = true;
  if (generationSelect.value) setStatus("selectCar");
});
languageTrigger.addEventListener("click", () => {
  const isExpanded = languageTrigger.getAttribute("aria-expanded") === "true";
  languageTrigger.setAttribute("aria-expanded", String(!isExpanded));
  languageMenu.hidden = isExpanded;
});
languageMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-language-option]");
  if (!option) return;
  languageSelect.value = option.dataset.languageOption;
  languageSelect.dispatchEvent(new Event("change", { bubbles: true }));
});
languageControl.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || languageMenu.hidden) return;
  languageMenu.hidden = true;
  languageTrigger.setAttribute("aria-expanded", "false");
  languageTrigger.focus();
});
document.addEventListener("click", (event) => {
  if (languageControl.contains(event.target) || languageMenu.hidden) return;
  languageMenu.hidden = true;
  languageTrigger.setAttribute("aria-expanded", "false");
});
languageSelect.addEventListener("change", () => {
  setLanguage(languageSelect.value);
  if (currentProfile) {
    currentProfile = null;
    exploreModel(new Event("submit", { cancelable: true }));
  }
});
searchForm.addEventListener("submit", exploreModel);
supportButton.addEventListener("click", () => supportDialog.showModal());
supportDialogClose.addEventListener("click", () => supportDialog.close());
supportDialog.addEventListener("click", (event) => {
  if (event.target === supportDialog) supportDialog.close();
});

initialize();
