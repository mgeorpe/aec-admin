# AEC Admin — Database Design (v2)

_Last updated: 2025-09-17_

## Purpose
Single source of truth for billing and learning relationships using stable `account_code` (e.g., `001`, `003-A`).

## Core Entities

### 1. `accounts_v2`
Represents a billing entity and its learner identity (individual or institution).

| Column        | Type        | Null | Notes |
|---------------|-------------|------|-------|
| account_code  | text (PK)   | NO   | Business identifier (`001`, `003-A`, …) |
| account_name  | text        | NO   | Display name (who this account is for) |
| type          | text        | NO   | `'individual'` \| `'institution'` |
| service       | text        | NO   | `'TF' \| 'CD' \| 'PW' \| 'LE'` |
| country       | text        | YES  | Free text; prefer ISO country name |
| start_year    | int         | YES  | First paying year (nullable for prospects) |
| status        | text        | NO   | `'prospect' \| 'active' \| 'inactive'` |
| is_active     | boolean     | NO   | Derived convenience flag |
| created_at    | timestamptz | NO   | Audit |
| updated_at    | timestamptz | NO   | Audit |

**Guards & Triggers**
- `service` in (`TF`,`CD`,`PW`,`LE`)
- `start_year >= 2021` (when not null); upper bound = `current_year + 1` via trigger
- `status → is_active` inference:
  - `prospect` → `false`
  - `active` → `true`
  - `inactive` → `false`

### 2. `account_contacts`
Contacts tied to an account (guardian, learner, PM, etc.)

| Column       | Type        | Null | Notes |
|--------------|-------------|------|-------|
| id           | uuid (PK)   | NO   | `gen_random_uuid()` |
| account_code | text (FK)   | NO   | → `accounts_v2.account_code` (ON UPDATE CASCADE) |
| full_name    | text        | NO   | |
| role         | text        | NO   | e.g., `Learner`, `Mother`, `HR Manager` |
| email        | text        | YES  | |
| phone        | text        | YES  | |

### 3. `account_learners`
Lightweight learner labels (single or grouped).

| Column        | Type        | Null | Notes |
|---------------|-------------|------|-------|
| id            | uuid (PK)   | NO   | `gen_random_uuid()` |
| account_code  | text (FK)   | NO   | → `accounts_v2` |
| learner_label | text        | NO   | e.g., `Jewel & Jembry`, `Management Staffs` |
| is_group      | boolean     | NO   | default `false` |
| created_at    | timestamptz | NO   | |

`unique (account_code, learner_label)`

## Planned Migrations (LIP)
- Migrate `learning_cycles`, `invoices`, `payments` to use `account_code`.
- Rollup view: `v_invoice_settlements` rebuilt on account basis.

## Conventions
- Codes are **immutable**; never recycle.
- Alphanumeric codes (`003-A`) are allowed consistently across all FKs.

## Changelog
See `docs/CHANGELOG.md`.
