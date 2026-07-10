# BayanLink

**Sarili mong link. Sarili mong negosyo.**

BayanLink is a Philippines-first link-in-bio storefront for creators, microbusinesses, local merchants, tours, stays, food sellers, and service providers. It keeps the familiar simplicity of a link-in-bio tool while adding visual offers, peso pricing, Messenger, WhatsApp, and Filipino payment choices.

> **Status:** Interactive front-end prototype. Authentication, cloud persistence, uploads, real payments, orders, analytics, and subscriptions are the next production phase.

## What Works Now

- Linktree-style dashboard with BayanLink’s own interface and product logic
- Separate editor sections for profile, offers, appearance, and settings
- Live mobile storefront preview
- Visual product and service cards with photos and peso prices
- Simple link blocks
- Add, edit, remove, reorder, show/hide, and feature blocks
- Three Filipino-inspired themes
- Messenger and WhatsApp destinations
- GCash, Maya, QR Ph, COD, and bank-transfer display options
- Public merchant route at `/[username]`
- Browser persistence for prototype edits
- Responsive desktop, tablet, and mobile layouts

## Product Principle

Filipino customers shop with their eyes and usually complete purchases through familiar messaging and payment channels. BayanLink puts photos, prices, trust, and one clear action first. The merchant’s identity stays dominant; BayanLink provides the infrastructure underneath.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Vercel

## Run Locally

```bash
git clone https://github.com/merqatodigital/pinoy-link-in-bio.git
cd pinoy-link-in-bio
npm install
npm run dev
```

Open `http://localhost:3000` for the editor and `http://localhost:3000/palawan-pantry` for the public storefront.

## Project Structure

```text
pinoy-link-in-bio/
├── app/
│   ├── [username]/
│   │   └── page.tsx                 # Public merchant route
│   ├── globals.css                  # Global styles and mobile behavior
│   ├── layout.tsx                   # Metadata and root layout
│   └── page.tsx                     # Dashboard entry
├── components/
│   ├── dashboard/
│   │   ├── bayanlink-dashboard.tsx  # State, persistence, and dashboard shell
│   │   ├── editor-panel.tsx         # Profile, blocks, themes, and settings
│   │   └── sidebar.tsx              # Main merchant navigation
│   └── storefront/
│       ├── public-storefront.tsx    # Public-page prototype adapter
│       └── storefront.tsx           # Shared customer-facing storefront
├── data/
│   └── demo-store.ts                # Demo content and theme tokens
├── types/
│   └── bayanlink.ts                 # Shared product and storefront models
├── public/
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Production Roadmap

1. Supabase authentication and merchant workspaces
2. Database-backed pages, blocks, products, and settings
3. Supabase Storage image uploads
4. Unique username validation and publish workflow
5. Order requests and payment-proof uploads
6. Analytics, subscriptions, and custom domains
7. Business templates for food, stays, tours, services, creators, and online sellers

## Validation

```bash
npm run lint
npm run build
```

Both commands pass for the current prototype.

## Maintainer

Built by [MerQato Digital](https://github.com/merqatodigital).

## License

No open-source license has been assigned. All rights reserved unless a license is added later.
