# BayanLink

**A Philippines-first link-in-bio storefront for creators, small businesses, local merchants, tours, stays, and service providers.**

BayanLink combines a simple merchant editor with a live mobile storefront preview. The current version is a front-end prototype designed around Filipino commerce habits, including GCash, Maya, QR Ph, COD, Messenger, WhatsApp, Shopee, Lazada, and local courier tracking concepts.

> **Project status:** Working UI prototype. Authentication, persistent storage, real payments, uploads, merchant accounts, and production integrations are not implemented yet.

## Current Features

- Live merchant editor and mobile storefront preview
- Editable business name, bio, location, avatar, and verification badge
- Three configurable visual themes
- Editable product cards with Philippine peso pricing
- Messenger and WhatsApp order-message simulation
- Mock GCash, Maya, QR Ph, and COD payment flow
- Shopee and Lazada integration placeholders
- Mock courier tracking for Philippine delivery services
- Responsive interface built without additional runtime UI libraries

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint

## Run Locally

```bash
git clone https://github.com/merqatodigital/pinoy-link-in-bio.git
cd pinoy-link-in-bio
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available Commands

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```text
pinoy-link-in-bio/
├── app/
│   ├── globals.css       # Global styles and Tailwind setup
│   ├── layout.tsx        # Root layout and metadata
│   └── page.tsx          # Merchant editor and storefront prototype
├── public/               # Static SVG assets
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

## Current Architecture

The prototype currently runs as one client-side experience in `app/page.tsx`. Merchant information and products are stored in React state, so changes reset when the page reloads.

The next production phase should separate the application into:

- Public merchant storefront routes
- Authenticated merchant dashboard
- Shared UI components
- Supabase authentication and database
- Supabase Storage for images
- Product, payment, link, and order models
- Public merchant usernames and custom URLs
- Analytics and subscription management

## Product Direction

BayanLink is intended to make online selling simpler for Philippine microbusinesses that may rely more on messaging and local payment methods than a traditional e-commerce checkout.

The goal is one shareable link where a merchant can present products or services, accept inquiries, show trusted payment options, and guide customers toward ordering.

## Maintainer

Built by [MerQato Digital](https://github.com/merqatodigital).

## License

No open-source license has been assigned yet. All rights reserved unless a license is added later.
