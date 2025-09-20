# AEC Admin

Admin app for billing + learning management  
Tech stack: **PostgreSQL + Supabase + Next.js**

---

## 📑 Docs Workflow

### When schema or rules change

1. Update [`docs/db-design.md`](docs/db-design.md) (tables, guards, rationale)
2. Append new entry to [`docs/CHANGELOG.md`](docs/changelog.md) (date + summary)
3. If it’s a design decision, add an ADR under `docs/adr/adr-YYYYMMDD-<slug>.md`

### Git Process

See **[Git Workflows](docs/GIT-WORKFLOWS.md)** for daily routines.

- Use small branches: `docs/<topic>` or `schema/<topic>`
- Commit with **Conventional Commits**:
  - `docs: update db-design with start_year guard`
  - `feat(db): add account_learners table`
  - `fix(db): allow LE service`
- Push and open PR (optional), then merge to `main`

---

## 🗄️ SQL Organization

| Folder            | Purpose                                     |
| ----------------- | ------------------------------------------- |
| `sql/migrations/` | DDL changes (tables, constraints, triggers) |
| `sql/seeds/`      | Seed data (idempotent where possible)       |
| `sql/sanity/`     | Reusable validation queries                 |

---

## 🧭 DB Runbook (when working on schema)

1. **Migrations** – create/update tables, constraints, triggers
2. **Seeds** – insert or update core data (`accounts_v2`, `account_contacts`)
3. **Sanity** – run `sql/sanity/*` to validate nulls, duplicates, mapping, domains
4. **Docs** – update `db-design.md` + `changelog.md` + ADR (if needed)

---

## 🚀 Getting Started (UI)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Start development server:

```bash
npm run dev
# or yarn dev / pnpm dev / bun dev
```

### What Changed

- Added **tech stack line** so it’s clear this repo is not just a Next.js app but also includes schema + docs.
- Added **DB runbook** section so you never forget migration → seed → sanity → docs order.
- Kept your Git process + Conventional Commits exactly as is.
- Made SQL folder purpose table for quick scanning.
