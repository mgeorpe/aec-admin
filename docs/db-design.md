# AEC Admin — Database Design (v3)

_Last updated: 2025-09-17_

## Purpose

Single source of truth for billing and learning relationships using stable `account_code` (e.g., `001`, `003-A`).  
Acts as canonical anchor for invoices, payments, cycles, and learners.

---

## Core Entities

### 1. `accounts_v2`

Represents a billing entity and its learner identity (individual or institution).

| Column       | Type        | Null | Notes                                              |
| ------------ | ----------- | ---- | -------------------------------------------------- |
| account_code | text (PK)   | NO   | Business identifier (`001`, `003-A`, …); immutable |
| account_name | text        | NO   | Display name (who this account is for)             |
| type         | text        | NO   | `'individual'` \| `'institution'`                  |
| service      | text        | NO   | `'TF' \| 'CD' \| 'PW' \| 'LE'` (extendable)        |
| country      | text        | YES  | Prefer ISO country name                            |
| start_year   | int         | YES  | First paying year (nullable for prospects)         |
| status       | text        | NO   | `'prospect' \| 'active' \| 'inactive'`             |
| is_active    | boolean     | NO   | Derived convenience flag                           |
| created_at   | timestamptz | NO   | Audit                                              |
| updated_at   | timestamptz | NO   | Audit                                              |

#### Guards & Triggers

- **Service domain:** must be one of (`TF`,`CD`,`PW`,`LE`).
- **Start year range:** `>= 2021` and `<= current_year + 1` (enforced by trigger).
- **Status guard** (`chk_accounts_v2_status_logic`): enforces
  - `prospect` ⇒ `start_year IS NULL` and `is_active=false`
  - `active` ⇒ `start_year IS NOT NULL` and `is_active=true`
  - `inactive` ⇒ `is_active=false`
  - Added & validated on **2025-09-21**.
- **`updated_at` trigger** (`trg_accounts_v2_updated_at`) calls `public.set_updated_at()` on every UPDATE; baseline set to `2025-09-11 16:06:28.898529+00` on 2025-09-21, then verified via account `001`.

---

### 2. `account_contacts`

Contacts tied to an account (guardian, learner, PM, HR, etc.).

| Column       | Type      | Null | Notes                                             |
| ------------ | --------- | ---- | ------------------------------------------------- |
| id           | uuid (PK) | NO   | `gen_random_uuid()`                               |
| account_code | text (FK) | NO   | → `accounts_v2.account_code` (ON UPDATE CASCADE)  |
| full_name    | text      | NO   |                                                   |
| role         | text      | NO   | `Learner`, `Mother`, `HR Manager`, etc.           |
| email        | text      | YES  |                                                   |
| phone        | text      | YES  |                                                   |
| is_primary   | boolean   | NO   | default `false`; enforce max one primary per role |

---

### 3. `account_learners`

Optional lightweight learner labels (single or grouped).  
Use only when granular learner grouping is needed.

| Column        | Type        | Null | Notes                                       |
| ------------- | ----------- | ---- | ------------------------------------------- |
| id            | uuid (PK)   | NO   | `gen_random_uuid()`                         |
| account_code  | text (FK)   | NO   | → `accounts_v2.account_code`                |
| learner_label | text        | NO   | e.g., `Jewel & Jembry`, `Management Staffs` |
| is_group      | boolean     | NO   | default `false`                             |
| created_at    | timestamptz | NO   |                                             |

`unique (account_code, learner_label)`

---

## Views

### v_accounts_summary

- **Purpose:** simple rollup for UI lists and sanity checks.
- **Columns:** account_code, account_name, type, service, country, status, is_active, start_year, created_at, updated_at
  - `contacts_count` — number of linked contacts per account (derived from `account_contacts`)
- **Order:** account_code
- **Notes:** Extend later when UI needs more fields.

---

## Planned Migrations (LIP)

- Migrate `learning_cycles`, `invoices`, `payments` to use `account_code`.
- Introduce rollup view: `v_invoice_settlements` (aggregated per account).
- Add trigger to auto-update `updated_at` on every row change.

---

## Sanity Policy

Run after every migration/seed batch:

1. **Null checks:** no missing `account_code`, `account_name`, `type`, `service`, `status`.
2. **Duplicate check:** `account_code` must be unique.
3. **Mapping check:** all `account_contacts.account_code` resolve to existing accounts.
4. **Domain check:** `service` ∈ (`TF`,`CD`,`PW`,`LE`), `status` ∈ (`prospect`,`active`,`inactive`).
5. **Status logic:** matches `start_year` and `is_active` inference.
6. **Country + year sanity:** country not empty, `start_year` within allowed range.

---

## Conventions

- Codes are **immutable**; never recycle.
- Alphanumeric codes (`003-A`) allowed consistently across FKs.
- Every schema change must have:
  - Migration file in `sql/migrations/`
  - Entry in `docs/CHANGELOG.md`
  - Optional ADR if decision is structural or irreversible
