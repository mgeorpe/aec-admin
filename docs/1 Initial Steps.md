# Git Repository Setup and Initial Commit Guide

## Phase 1: Adding Origin

```bash
git remote add origin <your-repo-URL>
# tells Git: “this GitHub repo is now my remote called origin.”

git branch --show-current
# check your current branch name

git branch -M main
# renames your current branch to main (standard default branch name)

git add .
# stages all untracked (U) and modified (M) files

git commit -m "Initial commit: UI work + DB alignment prep"
# create a commit with everything you currently have in your working directory

git status
# should see:
#   On branch main
#   nothing to commit, working tree clean

git push -u origin main
# pushes your local commits to GitHub and links (-u) main with origin/main
# so future git push/git pull work automatically
```

## Verification

```bash
git remote -v
# lists remotes (you should see origin with your repo URL)

git log --oneline --decorate --graph --all
# quick visual history to confirm commits exist and point to main
```
