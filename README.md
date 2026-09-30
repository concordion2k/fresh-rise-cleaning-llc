# FreshRise Cleaning

Informational website for **FreshRise Cleaning, LLC** — a family owned carpet, upholstery and area
rug cleaning company serving the Four Corners, FL area. Visitors learn about the business, see
published pricing, and get in touch. There is no backend: no accounts, CRM or scheduling.

## Stack

| Layer        | Tech                                                        |
| ------------ | ----------------------------------------------------------- |
| **Frontend** | Vue 3 + TypeScript (Vite, `<script setup>`, Vue Router)     |
| **Hosting**  | Private S3 bucket behind CloudFront (Origin Access Control) |
| **Infra**    | Terraform (AWS), remote state in S3                         |
| **CI/CD**    | GitHub Actions → build, sync to S3, invalidate CloudFront   |

## Repository layout

```
.
├── frontend/    # Vue 3 SPA
│   └── src/
│       ├── content/     # business details + services/pricing (edit copy here)
│       ├── components/  # header, footer, page hero, CTA band, cards
│       ├── views/       # Home, About, Services, Contact, 404
│       ├── styles/      # theme.css — design tokens + shared classes
│       └── assets/      # logo and icons (bundled + content-hashed by Vite)
├── design/      # full-size brand source art (logo master, icon sprite sheet) — not deployed
├── terraform/   # AWS infrastructure as code (+ bootstrap/ for one-time setup)
└── .github/     # CI + deploy workflows
```

This is an [npm workspaces](https://docs.npmjs.com/cli/using-npm/workspaces) repo, laid out like
the Zumba by Grasiele site so the two stay familiar.

## Getting started

```bash
npm install
npm run dev        # → http://localhost:5173
```

### Useful root scripts

| Script              | What it does                                    |
| ------------------- | ----------------------------------------------- |
| `npm run dev`       | Vite dev server with hot reload                 |
| `npm run build`     | Type-check + production build → `frontend/dist` |
| `npm run preview`   | Serve the production build on :4173             |
| `npm run typecheck` | Type-check every workspace                      |
| `npm run lint`      | ESLint across the repo                          |
| `npm run format`    | Prettier write                                  |
| `npm test`          | Run the Vitest specs                            |

## Editing content

- **Phone, email, hours, service area, minimum call** → [frontend/src/content/business.ts](frontend/src/content/business.ts).
  Every page (header, footer, contact, mailto) reads from here.
- **Services, packages and price list** → [frontend/src/content/services.ts](frontend/src/content/services.ts).
- **Specials / coupons** → [frontend/src/content/specials.ts](frontend/src/content/specials.ts). Each
  coupon hides itself the day after its `expires` date; if none are left, the page shows a "no
  specials right now" message. The current four are samples — replace them before launch.
- **Page copy** → the matching file in [frontend/src/views/](frontend/src/views/).
- **Privacy policy** → [frontend/src/content/privacy.ts](frontend/src/content/privacy.ts). Keep it
  truthful: if the business adds analytics, online booking, marketing texts or a new payment
  method, update the matching section and `lastUpdated`.
- **Page titles / search descriptions** → route `meta` in [frontend/src/router/index.ts](frontend/src/router/index.ts).

### Photos still to add

The design calls for real photos in two spots, currently shown as striped placeholders
(`<ImagePlaceholder>`): the home hero and the About page owner portrait. Drop the image into
`frontend/src/assets/`, import it in the view, and replace the placeholder with an `<img>`.

## Contact form

Since the site is static, the quote form doesn't POST anywhere. Submitting it opens the visitor's
email app with a message to the business already filled in (see
[frontend/src/utils/mailto.ts](frontend/src/utils/mailto.ts)). Phone and email are shown next to the
form for visitors without a mail app configured.

## Deployment

Every push to `main` runs the checks and, if they pass, deploys to S3 + CloudFront and invalidates
the cache so changes are live immediately. One-time setup and details: [DEPLOY.md](DEPLOY.md).
