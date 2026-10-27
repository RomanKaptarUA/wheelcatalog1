const express = require("express");
const path = require("node:path");
const { readdir } = require("node:fs/promises");
const catalog = require("./data/catalog.json");

const app = express();
const port = Number(process.env.PORT) || 3000;
const publicDirectory = path.join(__dirname, "public");
const vehicleImageDirectory = path.join(publicDirectory, "images", "cars");
const profileCache = new Map();
const profileCacheDuration = 6 * 60 * 60 * 1000;
const localPhotoExtensions = new Map([["webp", 0], ["jpg", 1], ["jpeg", 2], ["png", 3]]);

const vehicleClasses = {
  compact: new Set(["beetle", "bora", "fox", "golf", "jetta", "lavida", "lupo", "polo", "sagitar", "up"]),
  sedan: new Set(["arteon", "magotan", "passat", "phaeton"]),
  suv: new Set(["atlas", "t-cross", "t-roc", "taigo", "tayron", "tiguan", "touareg"]),
  van: new Set(["caddy", "california", "caravelle", "crafter", "multivan", "transporter"]),
  pickup: new Set(["amarok"]),
  sports: new Set(["corrado", "scirocco"]),
  utility: new Set(["lt"])
};

const wikipediaTitles = {
  up: "Volkswagen_up!"
};

app.disable("x-powered-by");
app.use(express.static(publicDirectory));

function getModelById(id) {
  return catalog.brands.flatMap((brand) => brand.models).find((model) => model.id === id);
}

function getVehicleClass(model) {
  return Object.entries(vehicleClasses).find(([, modelIds]) => modelIds.has(model.id))?.[0] || "other";
}

function stripHtml(value = "") {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

async function fetchWikipediaJson(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "VWCatalog/1.0 (Volkswagen model guide)" },
    signal: AbortSignal.timeout(10000)
  });
  if (!response.ok) {
    throw new Error(`Wikipedia returned HTTP ${response.status}.`);
  }
  return response.json();
}

async function getWikipediaSummary(model, language) {
  const title = wikipediaTitles[model.id]
    || `Volkswagen_${model.name.split("/")[0].split("(")[0].trim().replace(/\s+/g, "_")}`;
  const primaryName = model.name.split("/")[0].split("(")[0].trim();
  const candidateTitles = [title, `Volkswagen_${primaryName.replace(/\s+/g, "_")}`];

  for (const candidate of new Set(candidateTitles)) {
    try {
      const url = `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(candidate)}`;
      const summary = await fetchWikipediaJson(url);
      if (summary.extract && summary.content_urls?.desktop?.page) {
        return {
          title: summary.title,
          extract: summary.extract,
          url: summary.content_urls.desktop.page,
          language
        };
      }
    } catch (error) {
      if (!(error instanceof Error)) throw error;
    }
  }

  try {
    const params = new URLSearchParams({
      action: "query",
      list: "search",
      srsearch: `"Volkswagen ${primaryName}"`,
      srlimit: "5",
      format: "json"
    });
    const search = await fetchWikipediaJson(`https://${language}.wikipedia.org/w/api.php?${params}`);
    const matchingTitle = search.query?.search?.find((item) => (
      item.title.toLocaleLowerCase().includes(primaryName.toLocaleLowerCase())
    ))?.title;
    if (matchingTitle) {
      const summary = await fetchWikipediaJson(
        `https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(matchingTitle)}`
      );
      if (summary.extract && summary.content_urls?.desktop?.page) {
        return {
          title: summary.title,
          extract: summary.extract,
          url: summary.content_urls.desktop.page,
          language
        };
      }
    }
  } catch (error) {
    if (!(error instanceof Error)) throw error;
  }

  if (language !== "en") return getWikipediaSummary(model, "en");
  throw new Error("No Wikipedia overview was found for this model.");
}

function getCached(key, loader) {
  const cached = profileCache.get(key);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const value = loader().catch((error) => {
    profileCache.delete(key);
    throw error;
  });
  profileCache.set(key, { value, expiresAt: Date.now() + profileCacheDuration });
  if (profileCache.size > 200) profileCache.delete(profileCache.keys().next().value);
  return value;
}

async function findLocalVehiclePhoto(model, generation) {
  const imageDirectory = path.join(vehicleImageDirectory, model.id, generation.id);
  let entries;
  try {
    entries = await readdir(imageDirectory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  const candidates = entries.flatMap((entry) => {
    if (!entry.isFile()) return [];
    const match = entry.name.match(/^(1|2|3|4)\.(webp|jpg|jpeg|png)$/i);
    if (!match) return [];
    const extension = match[2].toLowerCase();
    return [{
      filename: entry.name,
      order: Number(match[1]),
      extensionPriority: localPhotoExtensions.get(extension)
    }];
  });
  candidates.sort((left, right) => (
    left.order - right.order || left.extensionPriority - right.extensionPriority
      || left.filename.localeCompare(right.filename)
  ));

  const usedOrders = new Set();
  return candidates
    .filter((candidate) => {
      if (usedOrders.has(candidate.order)) return false;
      usedOrders.add(candidate.order);
      return true;
    })
    .map(({ filename }) => ({
      title: `${model.name} ${generation.name}`,
      url: `/images/cars/${model.id}/${generation.id}/${encodeURIComponent(filename)}`
    }));
}

app.get("/api/brands", (_request, response) => {
  response.json(catalog.brands.map(({ id, name }) => ({ id, name })));
});

app.get("/api/models", (request, response) => {
  const brand = catalog.brands.find((item) => item.id === request.query.brand);
  if (!brand) {
    response.status(400).json({ error: "Please select a valid car make." });
    return;
  }

  response.json(brand.models.map(({ id, name, generations }) => ({
    id,
    name,
    generations: generations.map(({ id: generationId, name: generationName, years }) => ({
      id: generationId,
      name: generationName,
      years
    }))
  })));
});

app.get("/api/vehicles/:id", async (request, response) => {
  const model = getModelById(request.params.id);
  if (!model) {
    response.status(404).json({ error: "Vehicle model not found." });
    return;
  }

  if (!request.query.generation) {
    response.status(400).json({ error: "Please select a generation for this model." });
    return;
  }
  const selectedGeneration = model.generations.find((generation) => generation.id === request.query.generation);
  if (!selectedGeneration) {
    response.status(400).json({ error: "Please select a valid generation for this model." });
    return;
  }

  const language = ["en", "uk", "ru"].includes(request.query.language) ? request.query.language : "en";
  const [presentationResult, photos] = await Promise.all([
    getCached(`summary:${language}:${model.id}`, () => getWikipediaSummary(model, language))
      .then((value) => ({ status: "fulfilled", value }), (reason) => ({ status: "rejected", reason })),
    findLocalVehiclePhoto(model, selectedGeneration)
  ]);
  const presentation = presentationResult.status === "fulfilled" ? presentationResult.value : null;

  response.json({
    model: {
      id: model.id,
      name: model.name,
      vehicleClass: getVehicleClass(model),
      generations: model.generations.map(({ id, name, years }) => ({ id, name, years }))
    },
    selectedGeneration: {
      id: selectedGeneration.id,
      name: selectedGeneration.name,
      years: selectedGeneration.years
    },
    presentation: presentation
      ? {
          ...presentation,
          license: "CC BY-SA",
          licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/"
        }
      : null,
    photos,
    presentationError: presentationResult.status === "rejected" ? presentationResult.reason.message : null
  });
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

app.get("/{*path}", (_request, response) => {
  response.sendFile(path.join(publicDirectory, "index.html"));
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`VWCatalog running at http://localhost:${port}`);
  });
}

module.exports = app;
