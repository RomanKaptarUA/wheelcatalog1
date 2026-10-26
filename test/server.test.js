const assert = require("node:assert/strict");
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

test("catalog API supports choosing a car and returns wheel records", async () => {
  const brandsResponse = await fetch(`${baseUrl}/api/brands`);
  assert.equal(brandsResponse.status, 200);
  assert.deepEqual(await brandsResponse.json(), [
    { id: "skoda", name: "Škoda" },
    { id: "volkswagen", name: "Volkswagen" }
  ]);

  const modelsResponse = await fetch(`${baseUrl}/api/models?brand=volkswagen`);
  assert.equal(modelsResponse.status, 200);
  const models = await modelsResponse.json();
  const expectedModels = [
    "polo", "golf", "jetta", "bora", "passat", "arteon", "passat-cc", "scirocco",
    "beetle", "corrado", "phaeton", "up", "lupo", "fox", "gol", "lavida", "sagitar",
    "magotan", "tiguan", "touareg", "t-roc", "t-cross", "taigo", "atlas", "tayron",
    "id-3", "id-4", "id-5", "id-6", "id-7", "id-buzz", "transporter", "multivan",
    "caravelle", "california", "caddy", "amarok", "crafter", "lt"
  ];
  assert.deepEqual(models.map((model) => model.id).sort(), expectedModels.sort());

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

  const skodaModelsResponse = await fetch(`${baseUrl}/api/models?brand=skoda`);
  assert.equal(skodaModelsResponse.status, 200);
  const skodaModels = await skodaModelsResponse.json();
  assert.equal(skodaModels.length, 20);
  assert.deepEqual(skodaModels.map((model) => model.name), [
    "Citigo", "Elroq", "Enyaq Coupé iV", "Enyaq iV", "Fabia", "Favorit", "Felicia",
    "Kamiq", "Karoq", "Kodiaq", "Kushaq", "Kylaq", "Octavia", "Popular", "Rapid",
    "Roomster", "Scala", "Slavia", "Superb", "Yeti"
  ]);

  const skodaGenerationsResponse = await fetch(`${baseUrl}/api/generations?model=octavia`);
  assert.equal(skodaGenerationsResponse.status, 200);
  const octaviaGenerations = await skodaGenerationsResponse.json();
  assert.ok(octaviaGenerations.some((generation) => generation.id === "octavia-iv"));

  const wheelsResponse = await fetch(`${baseUrl}/api/wheels?generation=golf-v`);
  assert.equal(wheelsResponse.status, 200);
  const wheels = await wheelsResponse.json();
  assert.equal(wheels.length, 3);
  assert.ok(wheels.every((wheel) => wheel.verified === false));
});

test("catalog API rejects unknown selectors", async () => {
  const response = await fetch(`${baseUrl}/api/wheels?generation=unknown`);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { error: "Please select a valid car generation." });
});

test("non-API routes serve the application", async () => {
  const response = await fetch(`${baseUrl}/catalog`);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Wheelcatalog/);
  assert.match(html, /id="language-select"/);
  assert.match(html, /class="support-button"/);
  assert.match(html, /data-i18n-aria="supportCreator"/);
  assert.match(html, /data-i18n="supportCompact"/);
  assert.match(html, /value="en">English/);
  assert.match(html, /value="uk">Українська/);
  assert.match(html, /value="ru">Русский/);
  assert.doesNotMatch(html, /theme-toggle|Light mode/);
  assert.equal((html.match(/class="page-wheel"/g) || []).length, 1);
  assert.match(html, /class="page-wheel" src="\/images\/wheels\/AMG%20Alloy%20Wheel\.webp"/);
  assert.doesNotMatch(html, /how-it-works|how-section/);
});
