# Changelog

_All notable changes to this project will be documented here._

## [Unreleased]

- Planned: Migrate `learning_cycles`, `invoices`, `payments` to use `account_code`
- Planned: Add `v_invoice_settlements` rollup view
- Planned: Add `updated_at` trigger to `accounts_v2` and other core tables

## 2025-09-24

### Schema

- Removed `is_group` from `account_learners`.
- Added `UNIQUE (account_code, learner_label)` to enforce atomic-only labels.
- Repointed `invoices.client_code` FK from `clients(client_code)` to `accounts_v2(account_code)`.

### Policy

- Adopted **atomic-only learner labels** (one learner per row). Group labels out of scope for now.

### Sanity

- Created read-only atomic policy checks for account_learners

### Cleanup

- Dropped legacy views: `accounts`, `v_clients_*`, `v_guardians_*`, `v_learners_*`, `v_learner_guardian_summary`.
  - Rationale: migrated to `accounts_v2`; legacy model (clients/learners/guardians) deprecated.
- Dropped legacy client views: `v_client_lip_summary`, `v_cycle_lip_summary`
- Dropped legacy table `learner_guardians`, `learners_guardians` (both 0 rows; obsolete).

## 2025-09-23

### Schema

- Enriched `v_accounts_summary` with `contacts_count`.
- Migration file added: `sql/migrations/20250922T120000__add_contacts_count_to_v_accounts_summary.sql`.

### Sanity

- Added `sql/sanity/contacts_count_check.sql`:
  - Compares `contacts_count` from the view vs raw count in `account_contacts`.
  - Should return 0 mismatches.

## 2025-09-22

### Docs

- Documented `v_accounts_summary` under new “Views” section in `db-design.md`.
  - Clarified that Sep-20 entry marked it as planned, Sep-21 was actual implementation.
- Idempotent seed file `001_accounts_v2_seed.sql` capturing current accounts data (~33 rows).
- Idempotent seed file `002_account_contacts_seed.sql` capturing current contacts data.

### Added

- New sanity file `account_contacts_checks.sql` with:
  - Orphans check (should return 0 rows because every contact must link to a valid account_code).
  - Duplicates check (should return 0 rows because the same account_code + full_name + role should not repeat).

## 2025-09-21

### Added

- Status guard on `accounts_v2` (`chk_accounts_v2_status_logic`) via conditional migration.
- `updated_at` column on `accounts_v2` (default now).
- Trigger `trg_accounts_v2_updated_at` using `public.set_updated_at()`.
- Added reusable sanity queries for `accounts_v2` and `account_contacts` under `sql/sanity/`.
- Implemented view `v_accounts_summary` on `accounts_v2` for rollups and sanity/UI checks.

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
