# Git Cheat Sheet

> Documentation only. Do not treat this as a command to run anywhere.

This guide turns the Git reference screenshot into a practical working cheat sheet.
It focuses on **when** to use a command, **why** it matters, **how** to use it, and the **before/after** state it creates.

## Core mental model

Git work usually moves through three states:

- **Working tree**: files on disk that you have edited
- **Index / staging area**: files selected for the next commit
- **HEAD / branch tip**: the current committed snapshot

Most mistakes come from skipping one of those checks. Start with `git status` and `git diff` before you change history.

## Safe everyday workflow

| Step | Command | When | Why | Before | After |
| --- | --- | --- | --- | --- | --- |
| Inspect | `git status -sb` | Before any action | Confirms what changed and whether you are on the right branch | Unclear local state | You know branch, staged files, and unstaged files |
| Review | `git diff` | Before staging or committing | Shows exactly what changed in the working tree | Modified files only | You can inspect the patch line by line |
| Stage | `git add <path>` | After review | Moves selected changes into the next commit | Working tree only | Files are staged in the index |
| Commit | `git commit -m "message"` | After a coherent change set | Records a checkpoint in history | Staged changes exist | New commit is created and branch tip moves |
| Share | `git push` | After a valid local commit | Publishes local history to the remote | Local branch ahead of remote | Remote branch matches your local branch |

## Setup and project creation

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git config` | First-time setup or repo policy changes | Sets identity, editor, and behavior | `git config --global user.name "Your Name"` | No or wrong config | Git uses the chosen settings |
| `git init` | Starting a new repo | Creates repository metadata | `git init` | Folder is not a repo | Folder becomes a Git repo with `.git/` |
| `git clone` | Copying an existing repo | Creates a working copy from remote | `git clone https://github.com/org/repo.git` | No local checkout | Local checkout exists and tracks remote |
| `git help` | Learning a command | Opens authoritative built-in help | `git help merge` | Unsure about syntax | Command docs are visible |

## Snapshotting

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git add` | Before commit | Selects files or hunks for the next commit | `git add src/app/page.tsx` | File is modified only | File is staged |
| `git commit` | After staging a clean unit of work | Creates a permanent checkpoint | `git commit -m "feat: add hero section"` | Staged changes exist | New commit is recorded |
| `git restore` | To abandon local edits | Reverts working-tree changes safely | `git restore src/app/page.tsx` | File has uncommitted edits | File returns to HEAD contents |
| `git reset` | When you need to unstage or move branch history | Changes what points at the commit and/or what is staged | `git reset HEAD~1` or `git reset <file>` | Commit or stage is in the wrong state | History or staging area is rewound |
| `git rm` | When removing tracked files | Deletes file and stages removal | `git rm old-file.txt` | Tracked file exists | File is removed and staged for deletion |
| `git mv` | When renaming tracked files | Preserves rename intent in history | `git mv old-name.ts new-name.ts` | Old path exists | Rename is staged cleanly |

## Branching and merging

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git branch` | To inspect or create branches | Shows branch topology and lets you create branch names | `git branch` or `git branch feature/landing-page` | Single current branch or unclear branch list | Branch list is visible or new branch ref exists |
| `git checkout` | Legacy branch/file navigation | Old all-in-one command, still seen in scripts | `git checkout feature/landing-page` | On another ref | HEAD moves to the target ref |
| `git switch` | Preferred branch switching | Safer branch movement than old checkout | `git switch dev` | On the wrong branch | You are on the target branch |
| `git merge` | When combining completed work | Joins histories into the target branch | `git merge feature/landing-page` | Target branch lacks feature commits | Target branch now includes them |
| `git mergetool` | When merge conflicts need GUI help | Uses a configured merge tool | `git mergetool` | Merge conflict exists | Conflicts are resolved interactively |
| `git worktree` | When you need two branches checked out at once | Avoids juggling branches in one folder | `git worktree add ../repo-dev dev` | One checkout blocks branch switching | Multiple working directories exist |

### Merge choice guide

| Situation | Use | Why |
| --- | --- | --- |
| Small branch ready for integration | `git merge` | Preserves a clear branch-level history |
| Need to inspect branch work in another folder | `git worktree` | Lets you keep both branches open |
| Need to switch branch without accidental file checkout confusion | `git switch` | Lower risk than older `checkout` usage |

## Sharing and remote updates

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git fetch` | Before integrating remote work | Downloads remote refs without changing your branch | `git fetch origin` | Remote has new commits you have not seen | Your local remote-tracking refs are updated |
| `git pull` | When you want to fetch and integrate immediately | Combines fetch with merge or rebase | `git pull origin dev` | Local branch trails remote | Local branch includes remote updates |
| `git push` | After a local commit | Publishes your branch and commits | `git push -u origin feature/landing-page` | Local branch ahead of remote | Remote branch matches local commits |
| `git remote` | When checking repo links | Shows where your repo sends and receives changes | `git remote -v` | Remote target may be unclear | Remote URLs are visible |
| `git submodule` | When a repo contains nested repos | Manages linked repositories | `git submodule update --init --recursive` | Nested repos are missing or stale | Submodules are populated and aligned |

## Inspection and comparison

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git show` | To inspect one commit | Displays commit content and metadata | `git show HEAD~1` | You only know a commit hash | You see the actual patch |
| `git log` | To read history | Shows what changed and when | `git log --oneline --graph --decorate` | History is opaque | History is readable and ordered |
| `git diff` | Before staging, after staging, or between refs | Shows line-level change details | `git diff dev...feature/landing-page` | Changes are not obvious | The exact diff is visible |
| `git difftool` | When visual diff tools help | Opens a GUI diff viewer | `git difftool` | Raw diff is hard to read | Diff is shown in a visual tool |
| `git range-diff` | When comparing two commit series | Reveals how a patch series changed | `git range-diff main...feature old...new` | Two histories are hard to compare | Patch evolution is clear |
| `git shortlog` | For release notes or summaries | Summarises commits by author | `git shortlog -sn` | Raw log is too verbose | Contributor summary is visible |
| `git describe` | When naming builds or artifacts | Turns commits into human-readable tags | `git describe --tags` | Commit hash alone is cryptic | Tag-based version text is available |

## Patching and history surgery

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git apply` | When applying a patch file | Applies diff content without creating a commit | `git apply fix.patch` | Patch exists outside the repo | Working tree reflects the patch |
| `git cherry-pick` | When you need one commit from another branch | Imports a specific fix without merging everything | `git cherry-pick <sha>` | Good commit exists elsewhere | Selected commit is replayed here |
| `git rebase` | When you want a cleaner linear history | Replays commits onto another base | `git rebase dev` | Branch has diverged | Branch commits are rewritten on the new base |
| `git revert` | When you need to undo a bad commit safely | Creates a new commit that reverses the old one | `git revert <sha>` | Bad commit is published | A compensating commit restores the prior state |

### Safe history choice guide

| Situation | Use | Avoid |
| --- | --- | --- |
| Already-pushed bad change | `git revert` | `git reset --hard` on shared history |
| Need a clean PR series before review | `git rebase` | Large merge bubbles in a short-lived feature branch |
| Need one fix from another branch | `git cherry-pick` | Copy-pasting files manually |

## Recovery and safety

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git stash` | When you must switch tasks quickly | Shelves uncommitted work temporarily | `git stash push -m "WIP"` | Dirty worktree blocks switching | Worktree is clean and changes are stored |
| `git stash pop` | When resuming stashed work | Restores stashed changes back into the tree | `git stash pop` | Changes are hidden in stash | Changes return to the worktree |
| `git clean` | When you need to remove untracked files | Deletes files Git does not track | `git clean -fd` | Temporary files clutter the tree | Untracked files are removed |
| `git reflog` | After a reset or lost branch tip | Helps recover previous HEAD positions | `git reflog` | You think history is lost | Old branch positions are visible |
| `git fsck` | When you suspect repository corruption | Checks object integrity | `git fsck --full` | Repo state is questionable | Integrity problems are reported |

### Recovery choice guide

| Situation | Use | Why |
| --- | --- | --- |
| Need to save work before switching branches | `git stash` | Fast temporary parking |
| Need to recover a lost commit | `git reflog` | Finds previous HEAD positions |
| Need to remove generated junk | `git clean` | Removes untracked files only |

## Debugging and investigation

| Command | When | Why | How I would use it | Before | After |
| --- | --- | --- | --- | --- | --- |
| `git bisect` | When hunting a regression | Binary-searches the commit that introduced the bug | `git bisect start` | Bug source is unknown | A culprit commit is identified |
| `git blame` | When tracing a line’s origin | Shows who last changed each line | `git blame src/file.ts` | Line authorship is unclear | Line history is visible |
| `git grep` | When searching repository content | Searches tracked files by text | `git grep "TODO"` | You do not know where text lives | Matching files and lines are listed |

## Low-level commands, for reference

These are rarely needed day to day, but they are useful when you are debugging Git itself or writing tooling around it.

| Command | When | Why | Before | After |
| --- | --- | --- | --- | --- |
| `git cat-file` | Inspecting Git objects | Reads raw object content | Object id only | Object contents are visible |
| `git hash-object` | Creating or hashing blobs | Produces an object id from content | Text or file exists | Blob hash exists |
| `git ls-files` | Seeing tracked paths | Lists index-tracked files | Tracked files hidden in tooling | File list is visible |
| `git rev-parse` | Turning refs into hashes | Resolves branch/tag names to commit ids | Ref name only | Full SHA is known |
| `git update-ref` | Scripted ref changes | Moves refs directly | Ref target is stale | Ref points at a new commit |
| `git write-tree` | Plumbing for tree creation | Writes the index as a tree object | Index exists | Tree object is created |

## Practical examples

### Example 1: Add a feature safely

**Before**

- `git status` shows `src/components/shell/ApplicationShell.tsx` modified.
- `git diff` shows the hero copy and layout changes.

**Commands**

```bash
git add src/components/shell/ApplicationShell.tsx
git commit -m "feat: improve hero layout"
git push
```

**After**

- The change is staged, committed, and published.
- `git status` is clean again.

### Example 2: Undo a bad published commit

**Before**

- A commit was already pushed to `dev`.
- The commit introduced a regression.

**Commands**

```bash
git revert <bad-commit-sha>
git push
```

**After**

- A new commit reverses the bad change.
- Shared history stays intact.

### Example 3: Recover work after a risky reset

**Before**

- A branch tip moved unexpectedly.
- You need to inspect where it used to point.

**Commands**

```bash
git reflog
git switch -c recovery/<name> <previous-sha>
```

**After**

- The earlier state is recoverable.
- You can continue from a safe branch name.

## Rule of thumb

- Use `add` and `commit` for normal progress.
- Use `fetch` before you integrate remote work.
- Use `merge` for integration and `revert` for safe undo.
- Use `rebase`, `reset`, and `clean` carefully because they rewrite or discard local state.
- Check `status` and `diff` before every risky step.

