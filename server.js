const express = require("express");
const path = require("node:path");
const catalog = require("./data/catalog.json");

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, "public");

app.disable("x-powered-by");
app.use(express.static(publicDirectory));

app.get("/api/brands", (_request, response) => {
  response.json(catalog.brands.map(({ id, name }) => ({ id, name })));
});

app.get("/api/models", (request, response) => {
  const brand = catalog.brands.find((item) => item.id === request.query.brand);

  if (!brand) {
    response.status(400).json({ error: "Please select a valid car make." });
    return;
  }

  response.json(brand.models.map(({ id, name }) => ({ id, name })));
});

app.get("/api/generations", (request, response) => {
  const model = catalog.brands
    .flatMap((brand) => brand.models)
    .find((item) => item.id === request.query.model);

  if (!model) {
    response.status(400).json({ error: "Please select a valid car model." });
    return;
  }

  response.json(model.generations.map(({ id, name, years }) => ({ id, name, years })));
});

app.get("/api/wheels", (request, response) => {
  const generation = catalog.brands
    .flatMap((brand) => brand.models)
    .flatMap((model) => model.generations)
    .find((item) => item.id === request.query.generation);

  if (!generation) {
    response.status(400).json({ error: "Please select a valid car generation." });
    return;
  }

  response.json(generation.wheels);
});

app.get("/{*path}", (_request, response) => {
  response.sendFile(path.join(publicDirectory, "index.html"));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Wheelcatalog running at http://localhost:${port}`);
  });
}

module.exports = app;
