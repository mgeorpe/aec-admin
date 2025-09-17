## Making Folders and Starter Files

```bash
# 1. Ensure folder structure (idempotent)
mkdir -p docs/adr sql/migrations sql/seeds sql/sanity

# 2. Ensure starter files (no overwrite if edited)
touch docs/db-design.md docs/CHANGELOG.md README.md
touch docs/adr/adr-template.md docs/adr/adr-20250913-accounts-v2.md

# 3. Stage & commit layout
git add docs sql README.md
git commit -m "chore(repo): pin repo layout v1 (docs, sql, ADRs)"
git tag -a repo-layout-v1 -m "Repo layout v1: docs + sql/{migrations,seeds,sanity}, ADR template + first ADR"

# 4. Push everything
git push && git push --tags
```

## Verification

```bash
git tag --list
git ls-files | sort
ls -R docs/adr
```
