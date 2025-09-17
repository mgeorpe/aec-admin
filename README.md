# AEC Admin

## Docs workflow

### When schema or rules change
1) Update `docs/db-design.md` (tables, guards, rationale)
2) Append a new entry to `docs/CHANGELOG.md` (date + summary)
3) If it’s a design decision, add an ADR under `docs/adr/adr-YYYYMMDD-<slug>.md`

### Git process
- Use small branches: `docs/<topic>` or `schema/<topic>`
- Commit with Conventional Commits:
  - `docs: update db-design with start_year guard`
  - `feat(db): add account_learners table`
  - `fix(db): allow LE service`
- Push and open PR (optional), then merge to `main`

### SQL organization
- `sql/migrations/` – DDL changes (tables/constraints/triggers)
- `sql/seeds/` – seed data
- `sql/sanity/` – reusable validation queries

## Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
