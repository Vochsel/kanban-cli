# Twitter / X — launch post drafts

Three short threads, each tuned for a different audience. Each lead post is ≤ 280 chars; replies extend the story. Add a 30-second screen recording to the lead tweet — that single asset moves more than copy.

---

## Variant A — terminal/Bun crowd ("ship a tiny tool")

**Lead:**
> launched kanban-cli
>
> a markdown file → drag-and-drop kanban board on localhost. one Bun CLI, zero DB.
>
> `kb board.md` and you're in.
>
> github.com/Vochsel/kanban-cli

**Reply 1:**
> headings are columns. `- [ ] thing: description` lines are cards. drop a card in another column, the file updates in milliseconds. edit the file in vim, the board reloads.

**Reply 2:**
> ~1.7k LOC, single binary build via `bun build`. no electron, no auth, no cloud. just a thing on localhost that writes a markdown file you'd be happy to commit.

---

## Variant B — productivity/markdown-PKM crowd ("your notes shouldn't need another DB")

**Lead:**
> a kanban board that's just a markdown file.
>
> no database. no sync server. no separate app to keep in sync with your notes. drag cards in the browser, the file on disk updates. edit the file in your editor, the board reloads.
>
> github.com/Vochsel/kanban-cli

**Reply 1:**
> the round-trip is the whole point. writer emits canonical, diff-friendly markdown. parser preserves multi-line descriptions. you can review board changes in a git PR without squinting.

**Reply 2:**
> drops nicely into an Obsidian vault, a project README, a notes folder. one CLI: `kb anything.md`.

---

## Variant C — AI-assisted-coding crowd ("a backlog your agent can use")

**Lead:**
> tired of pasting "do the next thing" into Claude/Cursor.
>
> built kanban-cli: your todo list is a markdown kanban board. the board has a "copy prompt" button that hands the agent the file path + your custom instructions, then you watch it tick items off live.
>
> github.com/Vochsel/kanban-cli

**Reply 1:**
> the file IS the source of truth. agents read and write the same markdown you do. drag a card while it's working, no conflicts — the browser merges with what's on disk.

**Reply 2:**
> includes default instructions for agents ("move task to Doing before starting", "move done items to top of Done"). customize them in a settings dialog or strip them with `--no-instructions`.

---

## Posting notes

- Best windows: Tue/Wed/Thu 9–11 AM PT or 1–3 PM PT.
- Open with the artifact: a 20–30s screen capture beats any copy.
- Pin the thread; quote-retweet from a second account / friend if you have one.
- Don't end with a CTA "RT if you like it"; it suppresses reach.
- Reply to every reply for the first 2 hours — engagement velocity is the algorithm signal that matters.
