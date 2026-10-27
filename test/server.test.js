const assert = require("node:assert/strict");
const { access, mkdir, rmdir, unlink, writeFile } = require("node:fs/promises");
const path = require("node:path");
const { after, before, test } = require("node:test");
const app = require("../server");

let server;
let baseUrl;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
});

test("Volkswagen catalog API returns models and generation data", async () => {
  const brandsResponse = await fetch(`${baseUrl}/api/brands`);
  assert.equal(brandsResponse.status, 200);
  assert.deepEqual(await brandsResponse.json(), [
    { id: "volkswagen", name: "Volkswagen" }
  ]);

  const modelsResponse = await fetch(`${baseUrl}/api/models?brand=volkswagen`);
  assert.equal(modelsResponse.status, 200);
  const models = await modelsResponse.json();
  const expectedModels = [
    "polo", "golf", "jetta", "bora", "passat", "arteon", "scirocco",
    "beetle", "corrado", "phaeton", "up", "lupo", "fox", "lavida", "sagitar",
    "magotan", "tiguan", "touareg", "t-roc", "t-cross", "taigo", "atlas", "tayron",
    "transporter", "multivan", "caravelle", "california", "caddy", "amarok", "crafter", "lt"
  ];
  assert.deepEqual(models.map((model) => model.id).sort(), expectedModels.sort());
  assert.equal(models.some((model) => model.id === "gol"), false);
  assert.equal(models.some((model) => model.id.startsWith("id-")), false);
  assert.equal(models.some((model) => model.id === "passat-cc"), false);

  const removedHeroImage = await fetch(`${baseUrl}/images/vw-phaeton.webp`);
  assert.equal(removedHeroImage.status, 200);
  assert.match(removedHeroImage.headers.get("content-type"), /image\/webp/);
  const vwLogoResponse = await fetch(`${baseUrl}/images/vwlogo.webp`);
  assert.equal(vwLogoResponse.status, 200);
  assert.match(vwLogoResponse.headers.get("content-type"), /image\/webp/);
  const vwLogo = Buffer.from(await vwLogoResponse.arrayBuffer());
  assert.equal(vwLogo.toString("ascii", 12, 16), "VP8L");
  assert.equal(vwLogo[20], 0x2f);
  assert.ok(vwLogo.readUInt32LE(21) & 0x10000000, "VW logo should have a transparent background");

  const generationsResponse = await fetch(`${baseUrl}/api/generations?model=golf`);
  assert.equal(generationsResponse.status, 200);
  const golfGenerations = await generationsResponse.json();
  assert.ok(golfGenerations.some((generation) => (
    generation.id === "golf-v" && generation.name === "Golf V" && generation.years === "2003–2008"
  )));

  const poloGenerationsResponse = await fetch(`${baseUrl}/api/generations?model=polo`);
  assert.equal(poloGenerationsResponse.status, 200);
  assert.ok((await poloGenerationsResponse.json()).some((generation) => generation.id === "polo-6r"));

  const transporterGenerationsResponse = await fetch(`${baseUrl}/api/generations?model=transporter`);
  assert.equal(transporterGenerationsResponse.status, 200);
  assert.deepEqual(
    (await transporterGenerationsResponse.json()).map((generation) => generation.id),
    ["transporter-t1", "transporter-t2", "transporter-t3", "transporter-t4", "transporter-t5", "transporter-t6", "transporter-t7"]
  );
});

test("vehicle profiles do not request external photos", async () => {
  const originalFetch = global.fetch;
  let externalPhotoRequests = 0;
  global.fetch = async (input, options) => {
    const url = String(input);
    if (url.includes("wikimedia.org")) {
      externalPhotoRequests += 1;
      throw new Error("External photo requests must stay disabled.");
    }
    if (url.startsWith("https://uk.wikipedia.org/")) {
      return Response.json({
        title: "Volkswagen Golf",
        extract: "Тестовий огляд моделі Volkswagen Golf.",
        content_urls: { desktop: { page: "https://uk.wikipedia.org/wiki/Volkswagen_Golf" } }
      });
    }
    return originalFetch(input, options);
  };

  try {
    const response = await originalFetch(`${baseUrl}/api/vehicles/golf?language=uk&generation=golf-v`);
    assert.equal(response.status, 200);
    const profile = await response.json();
    assert.equal(profile.model.name, "Golf");
    assert.equal(profile.model.vehicleClass, "compact");
    assert.equal(profile.selectedGeneration.id, "golf-v");
    assert.deepEqual(profile.photos, []);
    assert.equal("photoInfoUrl" in profile, false);
    assert.equal(profile.presentation.extract, "Тестовий огляд моделі Volkswagen Golf.");
    assert.equal(profile.presentation.license, "CC BY-SA");
    assert.equal(profile.presentationError, null);
    assert.equal(externalPhotoRequests, 0);
  } finally {
    global.fetch = originalFetch;
  }
});

test("vehicle profile serves and orders local generation gallery photos", async () => {
  const photoDirectory = path.join(__dirname, "..", "public", "images", "cars", "golf", "golf-v");
  const photoFiles = [
    { filename: "1.webp", contents: Buffer.from("first local photo") },
    { filename: "2.jpg", contents: Buffer.from("second local photo") },
    { filename: "3.png", contents: Buffer.from("third local photo") }
  ];
  const originalFetch = global.fetch;
  const createdPhotos = [];
  let createdPhotoDirectory = false;

  try {
    try {
      await access(photoDirectory);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      createdPhotoDirectory = true;
    }
    await mkdir(photoDirectory, { recursive: true });
    for (const photo of photoFiles) {
      const photoPath = path.join(photoDirectory, photo.filename);
      await writeFile(photoPath, photo.contents, { flag: "wx" });
      createdPhotos.push(photoPath);
    }

    global.fetch = async (input, options) => {
      const url = String(input);
      if (url.startsWith("https://en.wikipedia.org/")) {
        return Response.json({
          title: "Volkswagen Golf",
          extract: "A test overview of the Volkswagen Golf.",
          content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Volkswagen_Golf" } }
        });
      }
      if (url.includes("wikimedia.org")) {
        throw new Error("External photo requests must stay disabled.");
      }
      return originalFetch(input, options);
    };

    const response = await originalFetch(`${baseUrl}/api/vehicles/golf?language=en&generation=golf-v`);
    assert.equal(response.status, 200);
    const profile = await response.json();
    assert.deepEqual(profile.photos.map((photo) => photo.url), [
      "/images/cars/golf/golf-v/1.webp",
      "/images/cars/golf/golf-v/2.jpg",
      "/images/cars/golf/golf-v/3.png"
    ]);

    for (const [index, photo] of profile.photos.entries()) {
      const imageResponse = await originalFetch(`${baseUrl}${photo.url}`);
      assert.equal(imageResponse.status, 200);
      const extension = photoFiles[index].filename.split(".").pop();
      const contentType = extension === "webp" ? "image/webp" : extension === "jpg" ? "image/jpeg" : "image/png";
      assert.match(imageResponse.headers.get("content-type"), new RegExp(contentType));
      assert.deepEqual(Buffer.from(await imageResponse.arrayBuffer()), photoFiles[index].contents);
    }
  } finally {
    global.fetch = originalFetch;
    for (const photoPath of createdPhotos) {
      await unlink(photoPath);
    }
    if (createdPhotoDirectory) {
      try {
        await rmdir(photoDirectory);
      } catch (error) {
        if (error.code !== "ENOTEMPTY" && error.code !== "ENOENT") throw error;
      }
    }
  }
});

test("generation API rejects unknown models", async () => {
  const response = await fetch(`${baseUrl}/api/generations?model=unknown`);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Please select a valid car model." });
});

test("vehicle profile API rejects unknown models and generations", async () => {
  const unknownModel = await fetch(`${baseUrl}/api/vehicles/unknown`);
  assert.equal(unknownModel.status, 404);
  assert.deepEqual(await unknownModel.json(), { error: "Vehicle model not found." });

  for (const removedModel of ["gol", "id-3", "id-buzz", "passat-cc"]) {
    const response = await fetch(`${baseUrl}/api/vehicles/${removedModel}?generation=removed`);
    assert.equal(response.status, 404, `${removedModel} should not have a profile`);
  }

  const removedGenerationList = await fetch(`${baseUrl}/api/generations?model=gol`);
  assert.equal(removedGenerationList.status, 400);

  const missingGeneration = await fetch(`${baseUrl}/api/vehicles/golf`);
  assert.equal(missingGeneration.status, 400);
  assert.deepEqual(await missingGeneration.json(), { error: "Please select a generation for this model." });

  const unknownGeneration = await fetch(`${baseUrl}/api/vehicles/golf?generation=passat-b1`);
  assert.equal(unknownGeneration.status, 400);
  assert.deepEqual(await unknownGeneration.json(), { error: "Please select a valid generation for this model." });
});

test("non-API routes serve the application without a vehicle photo", async () => {
  const response = await fetch(`${baseUrl}/catalog`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /VWCatalog/);
  assert.match(html, /id="language-select"/);
  assert.match(html, /class="support-button"/);
  assert.match(html, /id="support-button"/);
  assert.match(html, /data-i18n-aria="supportCreator"/);
  assert.match(html, /data-i18n="supportCreator">Support creator/);
  assert.match(html, /id="support-dialog"/);
  assert.match(html, /id="support-amount" type="number" min="1"/);
  assert.match(html, /data-i18n="paymentComingSoon"/);
  assert.match(html, /value="en">English/);
  assert.match(html, /value="uk">Українська/);
  assert.match(html, /value="ru">Русский/);
  assert.match(html, /id="language-trigger"/);
  assert.match(html, /id="language-menu"/);
  assert.match(html, /data-language-option="en"/);
  assert.match(html, /data-language-option="uk"/);
  assert.match(html, /data-language-option="ru"/);
  assert.match(html, /id="vehicle-search-form"/);
  assert.match(html, /<select id="model-select"/);
  assert.match(html, /<select id="generation-select"/);
  assert.match(html, /class="site-nav"/);
  assert.match(html, /class="hero-cta" href="#model-finder"/);
  assert.match(html, /data-i18n="generation">Generation/);
  assert.match(html, /class="hero-vehicle" src="\/images\/vw-phaeton\.webp"/);
  assert.doesNotMatch(html, /<datalist|id="vehicle-search"|id="vehicle-select"/);
  assert.match(html, /src="\/vehicles\.js"/);
  assert.doesNotMatch(html, /page-wheel|wheel-grid|wheel-search/);
  assert.equal((html.match(/class="brand-mark" src="\/images\/vwlogo\.webp"/g) || []).length, 2);
  assert.match(html, /VW<span class="brand-accent">Catalog<\/span>/);
  assert.doesNotMatch(html, /VWwheelCatalog/);
  assert.match(html, /data-i18n="independentDisclaimer"/);
  assert.doesNotMatch(html, /how-it-works|how-section/);
});
