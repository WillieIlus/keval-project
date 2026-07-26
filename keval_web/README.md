# Keval Web

Nuxt 4 frontend for Keval Investments Ltd.

## Requirements

- Node.js 22
- Yarn 1.22.22
- `NUXT_PUBLIC_API_BASE` set to the Django API base URL for production builds

## Setup

```bash
yarn install
```

## Development

```bash
yarn dev
```

For local API development, create `.env` from `.env.example` and point `NUXT_PUBLIC_API_BASE` at the local Django API.

## Verification

```bash
yarn lint
yarn typecheck
yarn generate
```

The static SPA output is generated in `.output/public` and is the Netlify publish directory.
