# Hacker News — Show HN drafts

Three angles for the same launch. Pick one for the title; the body can be reused with light edits. HN tends to reward the "single small idea + concrete artifact" framing.

---

## Variant A — terminal/Bun crowd

**Title:** Show HN: kanban-cli – a single Markdown file becomes a local kanban board

**Body:**

I wanted a kanban board I could check into git with my code, edit in any text editor, and still drag-and-drop in a browser when I felt like it. So I built kanban-cli: a tiny Bun-powered CLI that serves a markdown file as a Trello-style board on localhost. Headings become columns, `- [ ] task: optional description` lines become cards. Every change in the browser writes back to the file in a canonical, diff-friendly format. File changes on disk live-reload in the browser.

Around 1.7k LOC, no DB, no auth, no cloud. Run it inline with `npx kanban-cli@latest board.md` (or `bunx kanban-cli@latest board.md`) — no install needed. Repo: https://github.com/Vochsel/kanban-cli

Feedback welcome — especially on the markdown round-trip rules and where it breaks.

---

## Variant B — markdown/personal-knowledge-management crowd

**Title:** Show HN: Kanban that lives in a markdown file (and round-trips cleanly)

**Body:**

If you already keep notes in markdown — Obsidian, vault folders, project READMEs — a kanban board shouldn't be a separate tool with a separate database. kanban-cli is a CLI that opens any `.md` file as a local kanban board: headings are columns, checkbox lines are cards. Drag a card across columns in the browser, the file on disk updates within milliseconds. Edit the markdown directly, the browser reloads.

It's careful about the round-trip: the writer emits a stable canonical format so git diffs are reviewable, and the parser preserves multi-line descriptions via indented continuation lines. Boards can carry an instructions block at the top of the file (great for handing off to AI assistants) — opt out with `--no-instructions`.

No install needed: `npx kanban-cli@latest TODO.md`. Bun + zero external runtime deps. Repo: https://github.com/Vochsel/kanban-cli

---

## Variant C — AI-assisted-coding crowd

**Title:** Show HN: A kanban board AI agents can read, write, and check off

**Body:**

I kept asking Claude / Cursor to "implement the next thing on my list" and pasting tasks into chat. So I made the list addressable: kanban-cli turns a markdown file into a local kanban board, but the file itself is still the source of truth. The board includes a "Copy prompt to start implementing" button that puts a one-shot instruction on your clipboard — including the absolute path to the file and the board's own custom instructions block ("move tasks to Doing before starting work", etc.).

The agent picks up the file, ticks items off, moves them to Done, and you watch the columns rearrange in the browser as it works. Because the source of truth is the markdown, you can edit alongside the agent without losing changes.

Try it instantly: `npx kanban-cli@latest TODO.md`. Repo: https://github.com/Vochsel/kanban-cli

---

## Submission notes

- HN guidelines: stay descriptive, avoid superlatives, no "the best".
- Best post times historically: Mon–Thu, 9–11 AM EST.
- Reply quickly to early comments — comment velocity drives ranking more than upvotes.
- A short "Author here, happy to answer questions" first comment helps.
