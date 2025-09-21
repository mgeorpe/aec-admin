# Changelog

_All notable changes to this project will be documented here._

## [Unreleased]

- Planned: Migrate `learning_cycles`, `invoices`, `payments` to use `account_code`
- Planned: Add `v_invoice_settlements` rollup view
- Planned: Add `updated_at` trigger to `accounts_v2` and other core tables

## 2025-09-21

### Added

- Status guard on `accounts_v2` (`chk_accounts_v2_status_logic`) via conditional migration.
- `updated_at` column on `accounts_v2` (default now).
- Trigger `trg_accounts_v2_updated_at` using `public.set_updated_at()`.
- Added reusable sanity queries for `accounts_v2` and `account_contacts` under `sql/sanity/`.

### Data

- Backfilled all `updated_at` to the initial import timestamp `2025-09-11 16:06:28.898529+00`.

### Validation

- Constraint validated (status logic) successfully; no data changes required.
- Verified trigger by updating account `001` (timestamp advanced; others remained at Sep-11).

### Notes

- Trigger was temporarily disabled during backfill, then re-enabled.

## 2025-09-20

### Added

- New docs: “Initial Steps”, “Folder Structure”, “Git Workflows”, “AEC-Admin Local Setup Macbook”.

### Housekeeping

- Linked README to Git Workflows.
- Prepared SQL directory placeholders for migrations/seeds/sanity (no DDL yet).

### Next

- Resume DB work: add status guard, `updated_at` trigger, `v_accounts_summary` (implement after sanity validation).
- Add sanity query templates after core objects exist.

## 2025-09-17

### Added

- **Database design (v3):**
  - Refined `accounts_v2` schema (column table, guards, status logic)
  - Added explicit sanity policy (nulls, duplicates, mapping, domains, status logic)
  - Documented conventions for codes and migration/ADR workflow
- **Clarified:** services domain (`TF`, `CD`, `PW`, `LE`) and staging approach

### Housekeeping

- Improved structure of `db-design.md` for readability
- Confirmed ADR for `accounts_v2` is **Accepted**

## 2025-09-13

### Established

- **Core schema:** created `accounts_v2`, `account_contacts`, `account_learners`
- **Guards:** service enum, start_year lower/upper bounds, status→is_active inference
- **Data:** updated service for `004 Maxime Orpel` from `PW` → `LE`
- **Seeds:** added contacts for key accounts
- **Docs:** set up `docs/adr/` with first ADR (`accounts_v2` decision)

## 2025-09-04

- Inception. Drafts. Initial schemas. No documentations
