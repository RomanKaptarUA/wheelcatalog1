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
    { id: "mercedes-benz", name: "Mercedes-Benz" },
    { id: "bmw", name: "BMW" },
    { id: "skoda", name: "Škoda" },
    { id: "volkswagen", name: "Volkswagen" }
  ]);

  const bmwModelsResponse = await fetch(`${baseUrl}/api/models?brand=bmw`);
  assert.equal(bmwModelsResponse.status, 200);
  const bmwModels = await bmwModelsResponse.json();
  assert.deepEqual(bmwModels.map((model) => model.name), [
    "1 Series", "2 Series Coupe", "2 Series Gran Coupe", "2 Series Active Tourer", "3 Series",
    "4 Series Coupe", "4 Series Convertible", "4 Series Gran Coupe", "5 Series", "6 Series",
    "6 Series Gran Turismo", "7 Series", "8 Series", "8 Series Gran Coupe", "M2", "M3", "M4",
    "M5", "M6", "M8", "XM", "X1", "X2", "X3", "X3 M", "X4", "X4 M", "X5", "X5 M",
    "X6", "X6 M", "X7", "Z3", "Z3 M", "Z4", "Z4 M", "Z8", "i3", "i4", "i7", "iX", "i8"
  ]);

  const bmwGenerationsResponse = await fetch(`${baseUrl}/api/generations?model=3-series`);
  assert.equal(bmwGenerationsResponse.status, 200);
  assert.deepEqual(
    (await bmwGenerationsResponse.json()).map((generation) => generation.id),
    ["3-series-e21", "3-series-e30", "3-series-e36", "3-series-e46", "3-series-e90", "3-series-f30", "3-series-g20"]
  );

  const mercedesModelsResponse = await fetch(`${baseUrl}/api/models?brand=mercedes-benz`);
  assert.equal(mercedesModelsResponse.status, 200);
  const mercedesModels = await mercedesModelsResponse.json();
  assert.deepEqual(mercedesModels.map((model) => model.name), [
    "A-Class", "B-Class", "C-Class", "E-Class", "S-Class", "CLA", "CLS", "CLE",
    "CL-Class", "SL-Class", "SLC / SLK", "SEC", "SEL", "190 (W201)", "GLC", "GLE",
    "GLS", "G-Class", "ML-Class / M-Class", "GL-Class", "GLK", "AMG GT", "AMG One",
    "SLR McLaren", "SLS AMG", "Mercedes-Maybach S-Class", "Mercedes-Maybach GLS"
  ]);

  const mercedesGenerationsResponse = await fetch(`${baseUrl}/api/generations?model=190-w201`);
  assert.equal(mercedesGenerationsResponse.status, 200);
  assert.deepEqual(await mercedesGenerationsResponse.json(), [
    { id: "190-w201-w201", name: "190 (W201)", years: "1982–1993" }
  ]);

  const gClassWheelsResponse = await fetch(`${baseUrl}/api/wheels?generation=g-class-w463-2018`);
  assert.equal(gClassWheelsResponse.status, 200);
  const gClassWheels = await gClassWheelsResponse.json();
  assert.deepEqual(gClassWheels, [
    {
      id: "g-class-w463-2018-amg-wheel-photo",
      name: "AMG cross-spoke forged wheel",
      style: "Matte black with red rim flange",
      sizes: [],
      oemNumbers: [],
      image: "/images/wheels/mercedes-g-class-amg-wheel-2022.jpg",
      verified: false,
      sources: []
    }
  ]);

  const gClassWheelImageResponse = await fetch(`${baseUrl}/images/wheels/mercedes-g-class-amg-wheel-2022.jpg`);
  assert.equal(gClassWheelImageResponse.status, 200);
  assert.match(gClassWheelImageResponse.headers.get("content-type"), /image\/jpeg/);

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
