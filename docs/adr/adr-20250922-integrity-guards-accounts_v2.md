# ADR: Integrity Guards on `accounts_v2` (status constraint, updated_at trigger, sanity SQL)

- **Status:** Accepted
- **Date:** 2025-09-22

## Context

We need durable data integrity for `accounts_v2` independent of UI/API bugs. Two recurrent risks:

1. Status drift (e.g., `active` with no `start_year`, or `prospect` marked active).
2. Stale write-tracking (`updated_at`) when rows change.
   We also want quick, repeatable sanity checks outside app code.

## Decision

- **Status guard (CHECK)**: Enforce alignment among `status`, `start_year`, and `is_active` at the DB layer.
  - `prospect` ⇒ `start_year IS NULL` and `is_active=false`
  - `active` ⇒ `start_year IS NOT NULL` and `is_active=true`
  - `inactive` ⇒ `is_active=false`
- **`updated_at` trigger**: Maintain `updated_at` on every UPDATE via `public.set_updated_at()`.
- **Sanity framework in SQL**: Keep reusable checks in `sql/sanity/*` (nulls, domains, year bounds, status logic, contacts mapping).

## Consequences

- **Defense-in-depth**: DB rejects invalid rows; fewer regressions from scripts/UI.
- **Observability**: One-command sanity runs during seeds/migrations.
- **Operational clarity**: Clean rollup view(s) power UI and QA.

## Alternatives

- Rely on UI/API validation only → fragile; mistakes leak into data.
- Derive `status` purely from views → convenient read, but updates can diverge.

## Implementation Notes

- Constraint name: `chk_accounts_v2_status_logic` (validated; safe add used).
- Trigger: `trg_accounts_v2_updated_at` using `public.set_updated_at()`.
- Sanity scripts: `sql/sanity/accounts_v2_*.sql`, `sql/sanity/account_contacts_checks.sql`.

## References

- `docs/db-design.md` (tables, guards, triggers, views)
- `docs/changelog.md` (dated entries for guard/trigger/sanity)
