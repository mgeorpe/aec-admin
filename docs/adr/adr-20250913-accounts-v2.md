# ADR: Adopt `accounts_v2` as Primary Account Entity
- **Status:** Accepted
- **Date:** 2025-09-13

## Context
Legacy `clients` plus `learners/guardians` created redundancy and unclear ownership.

## Decision
- Use `accounts_v2` as the canonical account entity.
- Contacts carry roles; no separate learners/guardians tables.
- Keep `learners` as comma-separated text for now (pragmatic).

## Consequences
- Positive: simpler joins, clearer ownership, faster delivery.
- Negative: learners text is non-normalized; future parsing may be needed.
- Trade-off: defers full normalization to later milestones.

## Alternatives
- Keep legacy tables (complex, redundant).
- Fully normalized learners/guardians (slower initial delivery).

## References
- `docs/db-design.md`
