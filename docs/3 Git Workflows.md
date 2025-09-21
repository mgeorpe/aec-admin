# Git workflows

## 1. Inspect

> \*(Always do this when you return to the computer)

```bash
git branch --show-current  # Confirm branch
git fetch                  # Refresh info from github
git status                 # Check if behind / uncommitted changes
   ## Behind means there are commits in Github that you dont have locally yet
   ## Uncommitted means you have modified files locally that are not yet commiited.
      ### If you dont commit them, they stay dirty in your working directory
```

## 2.1 Sync if BEHIND

> \*(If behind, pull them before continuing, so your work is based on the latest code)

```bash
git pull --rebase origin <current-branch>
   # Git pull = fetch (get changes from github) + merge (combine them with your local branch)
   # Merge adds an extra merge commit even if theres no conflict making history noisy
   # Rebase pulls cleaner
       ## So, a "git pull --rebase origin main"
       ### gets new commits from GitHub
       ### Temporarily “takes your local commits off the branch”
       ### Puts GitHub commits first
       ### Then replays your commits on top, like they happened last
       ### This keeps history linear (no extra merge commits).
```

## 2.2 Clean if UNCOMMITTED

### Option 1) Commit them (recommended if you want to keep them)

```bash
git add -A
git commit -m "chore(wip): checkpoint before sync"
git pull --rebase origin <current-branch>
```

### Option 2) Stash them (if not ready to commit but want a clean workspace)

```bash
git stash push -m "wip before sync"
git pull --rebase origin <current-branch>
git stash pop    # get changes back after sync
```

### Option 3) Discard them (if you don't want them at all)

```bash
git restore .    # resets all files to last commit
git pull --rebase origin <current-branch>
```

## 3. Starting something new

### Step 1) Start clean from main

```bash
git checkout main
git pull --rebase origin main
```

### Step 2) Create a short-lived branch

```bash
git checkout -b <type>/<slug>
   # Examples:
     ## Docs: docs/readme-sync-checklist
     ## Schema: schema/accounts-status-guard
     ## Fix: fix/invoices-null-check
```

### Step 3) Work in small commits

```bash
# Stage & commit iteratively:
   git add <files>
   git commit -m "feat(db): add status guard on accounts_v2"

# Push early (safety)
   git push -u origin <branch>
   # Then Open PR when ready (optional if main isn’t protected).
```

## 4. When you wrap up for the day

### Step 1) Save & review

```bash
git status → ensure no forgotten files
```

### Step 2) Commit remaining work (WIP ok)

```bash
git add -A
git commit -m "chore(wip): end-of-day checkpoint"
```

### Step 3) Publish your branch (offsite backup)

```bash
git push (first time: git push -u origin <branch>)
```

### Step 4) If you were on main and changes are trivial only

```bash
# You can push to main if allowed:
  git push origin main

# Otherwise create a branch now and push:
  git checkout -b docs/eod-readme-tweak
  git push -u origin docs/eod-readme-tweak

# Leave a PR draft (optional but helpful)
  ## Create a Draft PR titled “WIP: <short description>”.
```

## 5. Git Pushing Workflow

### Shortcut (All in one Version)

```bash
git acp <commit message> #combines add all (add -A), commit -m, and push origin main while accepting a custom commit message
```

### Long Version

```bash
git status

git aa
   # "git add -A" (git aa) #Adds new + modified + deleted files across the entire repo, no matter where you are.
   # "git add ." -> #Adds new + modified + deleted files only in the current directory and its subfolders.

git commit -m "<type>: Useful commit message"
   # type = docs, schema, sanity, bugfix, hotfix (urgent), spike (experiment)

git push origin main #SHORTCUT: git pom
```

## 6. Commit Message Prefixes

- **feat** → a new feature (UI, DB, API, etc.)
- **refactor** → code restructure without behavior change
- **test** → test-related changes
- **bugfix** → same as `fix` (kept for clarity in non-tech contexts)
- **hotfix** → urgent production fix (fast patch)
- **spike** → experimental / proof-of-concept work
- **schema** → database schema migrations / constraints
- **sanity** → sanity queries, validations, guards
- **docs** → documentation, notes
- **devops** → maintenance (configs, tooling, deps, CI/CD)

## 7. Other Commands

```bash
git config --list #see all your Git configs (aliases plus other settings)

git config --get-regexp alias #list all your configured Git aliases

git config --global pager.log false #ensure git log to never open in a pager (well if you stuck, press q)
```
