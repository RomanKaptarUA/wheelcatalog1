# Wheelcatalog

A prototype catalog of original wheels by car make, model, and generation.

## Getting started

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To run without watch mode, use `npm start`.

The interface supports English (default), Ukrainian, and Russian. The selected language is saved in the browser.

## API

- `GET /api/brands` — catalog makes.
- `GET /api/models?brand=volkswagen` — models for a make.
- `GET /api/generations?model=golf` — generations for a model.
- `GET /api/wheels?generation=golf-v` — wheel records for a generation.

## Catalog data

The dataset is in `data/catalog.json`. It includes Volkswagen and Škoda models and generation names as a starting index; production years can vary by market and should be checked against the exact vehicle. Region-specific models are labeled where needed. Most generations have no wheel records yet. The Golf V design names are demo entries, intentionally marked `verified: false`: exact OEM numbers, sizes, fitment, and sources still need verification. Do not treat unverified entries as proof of factory fitment. Once verified, add sizes to `sizes`, part numbers to `oemNumbers`, source links to `sources`, and set `verified` to `true`.

Each `sizes` entry uses the `diameter`, `width`, and `et` fields. Add wheel images through the `image` field; an empty value displays a styled placeholder.