# VWCatalog

A Volkswagen model guide. Choose a model or generation from the list to see a sourced overview, your own locally supplied photo when available, model generations, general ownership considerations, and planned repair-guide topics.

## Getting started

Requires Node.js 18 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To run without watch mode, use `npm start`.

The interface supports English, Ukrainian, and Russian. Wikipedia overviews use the selected language when an article is available and otherwise fall back to English.

VWCatalog is an independent guide and is not affiliated with or endorsed by Volkswagen AG. This notice clarifies the site's status but does not grant permission to use trademarks, logos, text, or photos; use materials only when you own the rights or have a license or permission.

## API

- `GET /api/brands` — catalog makes.
- `GET /api/models?brand=volkswagen` — Volkswagen models and generations.
- `GET /api/vehicles/:id?language=en&generation=golf-v` — model overview, generations, vehicle category, and matching local gallery photos when present. A generation is required.
- `GET /api/generations?model=golf` — generations for a model.

## Sources and limitations

The model and generation index is in `data/catalog.json`. Model overviews come from Wikipedia's REST API and link to their source; text is attributed under CC BY-SA. Vehicle photos are never searched for or downloaded from external services. Add your own images to the folder for the matching generation under `public/images/cars/<model-id>/<generation-id>/`. For example, add `1.webp` through `4.webp` to `public/images/cars/golf/golf-v/` for up to four Golf V gallery images. WebP is recommended; `.jpg`, `.jpeg`, and `.png` are also supported. Browse the gallery with the arrows or dots, or swipe the photo on a touch screen. The profile shows the expected folder and filenames when no local photo has been added.

The overview describes the model range, not a particular engine or trim. The displayed vehicle type and ownership considerations are general editorial guidance; they are not reliability guarantees or vehicle-specific inspection advice. Production dates and exact specifications can vary by generation and market. Confirm the exact model year, engine, equipment, and service history before making purchase or repair decisions.

Repair and common-issue guides are planned for a future update.
