# ADR: Atomic-only learner labels in `account_learners`

- **Status:** Accepted
- **Date:** 2025-09-24

## Context

Most accounts have a single learner. Rare cases (e.g., siblings or departments) created ambiguity when using combined labels (e.g., “Jewel & Jembry”). We bill by `account_code`; we need simple, reliable reporting.

## Decision

- Use **atomic labels only**: one row per learner (`account_code`, `learner_label`).
- Remove `is_group` column; do not create group labels at this stage.
- Enforce `UNIQUE (account_code, learner_label)`.

## Consequences

- Simpler queries and sanity; no double counting.
- If future business needs group operations, we’ll address via a separate construct (view or new table) with explicit rules.

## Alternatives

- Mixed atomic + group labels (risk of duplicates/double-counting).
- Group-only (loses per-learner granularity).

## References

- `docs/db-design.md`
- `docs/changelog.md`
