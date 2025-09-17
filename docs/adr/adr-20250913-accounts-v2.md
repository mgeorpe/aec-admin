# ADR: Adopt `accounts_v2` as Primary Account Entity
- **Status:** Accepted
- **Date:** 2025-09-13

## Context
Legacy model split “client” (billing) and “learner” (student). Real-world use shows one stable business identifier (account_code) is used for both billing and learning identity, including family and institution cases.

## Decision
- Introduce `accounts_v2` as the unified billing/learner entity.
- Keep contacts in `account_contacts`.
- Store learner labels in `account_learners` for simple grouping.
- Migrate LIP tables to use `account_code`.

## Consequences
- Simpler mental model; fewer tables.
- Historical invoice numbers remain valid (codes unchanged).
- Need migration for cycles/invoices/payments.

## Alternatives
- Normalize persons/organizations separately → too heavy for current scale.
- Keep legacy clients/learners → caused ambiguity and duplication.

## References
- `docs/db-design.md`

