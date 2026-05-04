---
title: Features for Kanban
theme: #1f845a
---

When working through tasks here, always follow these defaults and check after starting or finishing a task:

- Move a task into "Doing" section header before starting work on it
- When you complete a task, move it to the top of the "Done" section header (sort by most recent at top of list)
- Keep going forever until all todo's are done

# Backlog
- [ ] Potentially support yaml in parallel
- [ ] Add labels/category support for cards
- [ ] since we run from cli, we could have auto-implement: run claude -p or codex from cli to auto start, or tidy cards etc

# Todo

# Doing

# Done
- [x] move github to be next to npm button, and icons for both
- [x] Improve the parallelism so that in progress changes from ui are merged neatly and nicely with any updates on disk from ai.: Do this auto merge and line by line
- [x] Create a one click copy of prompt to install and run kanban-cli: prompt is like create or find todo markdown file, and then run npx start of kanban-cli@latest
- [x] Add support for space separated files to open multiple boards: show these in ui as selectable dropdown in top left on name of current board
- [x] add full darkmode support with toggle and override
- [x] add a opt-in feature that plays a sound in browser when cards move to doing, and then done: simple subtle sfx, done should be like a check success sound
- [x] add r.click context menu to all cards, and add copy deeplink off card into there: also add delete, copy text to clipboard, and edit description options to context menu
- [x] improve the ui of the settings dialog, add a simple sidebar on left
- [x] add link to gh repo, and kanban-cli.vochsel.com to the settings dialog
- [x] improve default instruction to keep going after doing each item until no more in todo column
- [x] Update marketing posts for new inline npx kanban-cli@latest ...
- [x] Make the dropzone of columns more forgiving
- [x] Create an apps/www basic vite site that explains simply the purpose and use of this tool: Nicely designed and aesthetic, linking to the github.
- [x] In docs/marketing/forums create a hacker news and twitter/x post to announce the creation of this: make 3 examples for 3 different audiences so we can see which works best
- [x] Copy prompt to start should be cetnered on header
- [x] Include board custom instructions if they exist
- [x] Clicking on "Drop cards here" should also make a new card
- [x] Add a button in middle of top title bar "Copy prompt to start implementing": which copies an instruction prompt to clipboard, which includes absolute path to md file and instructions prompt to start implementing, with play icon
- [x] Change Reload button to just icon
- [x] Change default prompt: To When working through tasks here, follow these defaults: - Move a task into "Doing" section header before starting work on it - When you complete a task, move it to the top of the "Done" section header (sort by most recent at top of list) (Add section at end "once complete, check markdown to see if new todo tasks are available)
- [x] Ensure that description new lines are preserved in markdown bidrectionally
- [x] the color pallette should change the bg color and column colors not the tick colors
- [x] the card dialog description should wrap the title too, and make the dialog a bit nicer looking
- [x] change icon picker to allow searching and have ticks etc
- [x] add option in header, maybe settings, to see entire .md in raw text in dialog
- [x] Make card titles wrap
- [x] Enter in input should submit title change
- [x] Add support to copy deeplink to card or column or file itself
- [x] Change color of board to 16 presets
- [x] Make sure bun build works
- [x] Change deep link to deeplink to file on disk
- [x] Remove the grab handle from items, and instead make card grabbable
- [x] allow bun dev to pass actual file as well as fallback to example.md
- [x] Add npmjs badge to readme
- [x] Hide scrollbar on columns
- [x] Move description to a dialog and edit on card click: should open on click of whole card, and hide description from card, just show icon when card has description
- [x] Make bun run dev auto update hot reload
- [x] Make sure the description icon is inlien with left of title/label, not checkbox
- [x] Update new and existing md files to add instructions to top of md files: Add a section for global prompt, that lives up top of markdown - maybe by default when it starts it moves to doing - or maybe option to be auto or manual. Defaults: move completed tasks to top of done list when done. move task to doing before starting work This should be opt out, with a settings dialog to both customize instructions, and also disable completely. add cli opt out too
- [x] Dont open dialog on new card, let me edit label/title inline: also the wrapping of title doesnt seem to update properly
- [x] allow shift enter in inline title to add new line
