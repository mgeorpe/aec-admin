# Changelog

_All notable changes to this project will be documented here._

## [Unreleased]
- Planned: Migrate `learning_cycles`, `invoices`, `payments` to use `account_code`
- Planned: Add `v_invoice_settlements` rollup view
- Planned: Add `updated_at` trigger to `accounts_v2` and other core tables

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
