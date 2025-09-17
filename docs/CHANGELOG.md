# Changelog
_All notable changes to this project will be documented here._

## [Unreleased]
- Planned: Migrate `learning_cycles`, `invoices`, `payments` to use `account_code`
- Planned: Add `v_invoice_settlements` rollup view
- Planned: Add `updated_at` trigger to `accounts_v2` and other core tables

## 2025-09-13
- Established `accounts_v2`, `account_contacts`, `account_learners`.
- Added guards: service enum, start_year lower/upper bound, status→is_active inference.
- Updated service: 004 Maxime Orpel from `PW` → `LE`.
- Seeded contacts for key accounts.
- Set up docs/adr structure.

## 2025-09-17
### Added
- **Database design (v3):**
  - Defined `accounts_v2` schema with guards and status logic
  - Added `account_contacts` with `is_primary` uniqueness rule
  - Introduced optional `account_learners` table for grouped learner labels
  - Documented sanity policy (nulls, duplicates, mapping, domains, status logic)
- **Conventions:** Documented immutable account codes and migration/ADR workflow

### Housekeeping
- Clarified services domain: `TF`, `CD`, `PW`, `LE`
- Noted use of staging tables for legacy data cleanup
