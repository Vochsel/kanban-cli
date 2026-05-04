// Marketing site interactivity. Three things live here:
//   1. Hero board demo — editable cards/columns, drag between columns.
//   2. Format section — bidirectional sync between a markdown textarea
//      and a rendered board.
//   3. Quickstart terminal — an input the user can submit, after which
//      a fake browser pane "opens" with another board demo.
// All boards share one tiny model + a single renderer.

type Card = { id: string; text: string; done: boolean };

type ColumnTone = "todo" | "doing" | "done" | "plain";

type Column = {
  id: string;
  title: string;
  tone: ColumnTone;
  cards: Card[];
};

type Board = {
  preamble: string;
  columns: Column[];
};

type BoardOptions = {
  showAddCard?: boolean;
  showAddColumn?: boolean;
  editable?: boolean;
};

// ---- id helpers ---------------------------------------------------------

let idCounter = 0;
function nextId(prefix: string): string {
  idCounter += 1;
  return `${prefix}-${idCounter.toString(36)}`;
}

function toneFromTitle(title: string): ColumnTone {
  const t = title.trim().toLowerCase();
  if (t === "doing" || t === "in progress" || t === "wip") return "doing";
  if (t === "done" || t === "complete" || t === "completed") return "done";
  if (t === "todo" || t === "to do" || t === "backlog") return "todo";
  return "plain";
}

// ---- markdown parse/serialize ------------------------------------------

function parseMarkdown(md: string): Board {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");
  const preambleLines: string[] = [];
  const columns: Column[] = [];
  let current: Column | null = null;
  let inHeadings = false;

  for (const raw of lines) {
    const line = raw;
    const headingMatch = line.match(/^#\s+(.+?)\s*$/);
    if (headingMatch) {
      inHeadings = true;
      const title = headingMatch[1] ?? "";
      current = {
        id: nextId("col"),
        title,
        tone: toneFromTitle(title),
        cards: [],
      };
      columns.push(current);
      continue;
    }
    if (!inHeadings) {
      preambleLines.push(line);
      continue;
    }
    if (!current) continue;
    const cardMatch = line.match(/^\s*-\s*\[( |x|X)\]\s+(.+?)\s*$/);
    if (cardMatch) {
      const done = cardMatch[1] !== " ";
      const text = cardMatch[2] ?? "";
      current.cards.push({ id: nextId("card"), text, done });
    }
  }

  // Trim leading/trailing blank lines from preamble.
  while (preambleLines.length && preambleLines[0]!.trim() === "") preambleLines.shift();
  while (preambleLines.length && preambleLines[preambleLines.length - 1]!.trim() === "") preambleLines.pop();

  return { preamble: preambleLines.join("\n"), columns };
}

function serializeMarkdown(board: Board): string {
  const out: string[] = [];
  if (board.preamble.trim()) {
    out.push(board.preamble.trimEnd());
    out.push("");
  }
  board.columns.forEach((col, idx) => {
    if (idx > 0) out.push("");
    out.push(`# ${col.title}`);
    for (const card of col.cards) {
      out.push(`- [${card.done ? "x" : " "}] ${card.text}`);
    }
  });
  return out.join("\n") + "\n";
}

// ---- rendering ----------------------------------------------------------

const dragState: { cardId: string | null; fromBoard: BoardController | null } = {
  cardId: null,
  fromBoard: null,
};

class BoardController {
  board: Board;
  mount: HTMLElement;
  options: BoardOptions;
  onChange?: (board: Board) => void;

  constructor(mount: HTMLElement, board: Board, options: BoardOptions = {}) {
    this.mount = mount;
    this.board = board;
    this.options = options;
  }

  setBoard(board: Board, opts: { silent?: boolean } = {}): void {
    this.board = board;
    this.render();
    if (!opts.silent && this.onChange) this.onChange(this.board);
  }

  notify(): void {
    if (this.onChange) this.onChange(this.board);
  }

  render(): void {
    this.mount.innerHTML = "";
    for (const column of this.board.columns) {
      this.mount.appendChild(this.renderColumn(column));
    }
  }

  private renderColumn(column: Column): HTMLElement {
    const colEl = document.createElement("div");
    colEl.className = "kp-col";
    colEl.dataset.colId = column.id;

    const head = document.createElement("div");
    head.className = "kp-col-head";
    const icon = document.createElement("span");
    icon.className = `kp-col-icon kp-col-icon-${column.tone}`;
    head.appendChild(icon);
    const title = document.createElement("span");
    title.textContent = column.title;
    if (this.options.editable) {
      title.contentEditable = "plaintext-only";
      title.spellcheck = false;
      title.classList.add("kp-col-title");
      title.addEventListener("blur", () => {
        const next = (title.textContent ?? "").trim() || column.title;
        column.title = next;
        column.tone = toneFromTitle(next);
        icon.className = `kp-col-icon kp-col-icon-${column.tone}`;
        this.notify();
      });
      title.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          title.blur();
        }
      });
    }
    head.appendChild(title);
    colEl.appendChild(head);

    for (const card of column.cards) {
      colEl.appendChild(this.renderCard(card, column));
    }

    if (this.options.showAddCard !== false) {
      const addBtn = document.createElement("button");
      addBtn.type = "button";
      addBtn.className = "kp-add";
      addBtn.textContent = "+ Add card";
      addBtn.addEventListener("click", () => {
        const card: Card = { id: nextId("card"), text: "New card", done: false };
        column.cards.push(card);
        this.render();
        this.notify();
        // Focus the new card's text for editing.
        const el = this.mount.querySelector<HTMLElement>(`[data-card-id="${card.id}"] .kp-card-text`);
        if (el) {
          el.focus();
          const range = document.createRange();
          range.selectNodeContents(el);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      });
      colEl.appendChild(addBtn);
    }

    // Column is a drop target.
    colEl.addEventListener("dragover", (e) => {
      if (!dragState.cardId) return;
      e.preventDefault();
      colEl.classList.add("kp-col-drop");
    });
    colEl.addEventListener("dragleave", () => {
      colEl.classList.remove("kp-col-drop");
    });
    colEl.addEventListener("drop", (e) => {
      e.preventDefault();
      colEl.classList.remove("kp-col-drop");
      if (!dragState.cardId || !dragState.fromBoard) return;
      const moved = this.moveCard(dragState.cardId, column.id, dragState.fromBoard);
      if (moved) this.notify();
      dragState.cardId = null;
      dragState.fromBoard = null;
    });

    return colEl;
  }

  private renderCard(card: Card, column: Column): HTMLElement {
    const cardEl = document.createElement("div");
    cardEl.className = "kp-card";
    if (card.done) cardEl.classList.add("kp-card-done");
    cardEl.dataset.cardId = card.id;
    cardEl.draggable = true;

    const check = document.createElement("button");
    check.type = "button";
    check.className = card.done ? "kp-check kp-check-done" : "kp-check";
    check.setAttribute("aria-label", card.done ? "Mark not done" : "Mark done");
    check.addEventListener("click", (e) => {
      e.stopPropagation();
      card.done = !card.done;
      this.render();
      this.notify();
    });
    cardEl.appendChild(check);

    const text = document.createElement("span");
    text.className = "kp-card-text";
    text.textContent = card.text;
    if (this.options.editable !== false) {
      text.contentEditable = "plaintext-only";
      text.spellcheck = false;
      text.addEventListener("blur", () => {
        const next = (text.textContent ?? "").trim();
        if (next === "") {
          // Remove empty card.
          column.cards = column.cards.filter((c) => c.id !== card.id);
          this.render();
        } else {
          card.text = next;
        }
        this.notify();
      });
      text.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          text.blur();
        }
      });
    }
    cardEl.appendChild(text);

    const del = document.createElement("button");
    del.type = "button";
    del.className = "kp-del";
    del.setAttribute("aria-label", "Delete card");
    del.innerHTML = "&times;";
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      column.cards = column.cards.filter((c) => c.id !== card.id);
      this.render();
      this.notify();
    });
    cardEl.appendChild(del);

    cardEl.addEventListener("dragstart", (e) => {
      dragState.cardId = card.id;
      dragState.fromBoard = this;
      cardEl.classList.add("kp-card-dragging");
      e.dataTransfer?.setData("text/plain", card.id);
      if (e.dataTransfer) e.dataTransfer.effectAllowed = "move";
    });
    cardEl.addEventListener("dragend", () => {
      cardEl.classList.remove("kp-card-dragging");
      dragState.cardId = null;
      dragState.fromBoard = null;
    });

    return cardEl;
  }

  private moveCard(cardId: string, toColumnId: string, fromBoard: BoardController): boolean {
    // Find and remove from source.
    let card: Card | null = null;
    for (const col of fromBoard.board.columns) {
      const idx = col.cards.findIndex((c) => c.id === cardId);
      if (idx !== -1) {
        card = col.cards.splice(idx, 1)[0]!;
        break;
      }
    }
    if (!card) return false;
    const target = this.board.columns.find((c) => c.id === toColumnId);
    if (!target) return false;
    // If dropping into a "done" column, mark done; into a non-done column, mark undone.
    if (target.tone === "done") card.done = true;
    else if (target.tone !== "plain") card.done = false;
    target.cards.push(card);
    if (fromBoard !== this) fromBoard.render();
    this.render();
    fromBoard.notify();
    return true;
  }
}

// ---- hero board ---------------------------------------------------------

const heroSeed: Board = {
  preamble: "",
  columns: [
    {
      id: nextId("col"),
      title: "Todo",
      tone: "todo",
      cards: [
        { id: nextId("card"), text: "Wire AI prompt", done: false },
        { id: nextId("card"), text: "Ship 0.2.1 release", done: false },
        { id: nextId("card"), text: "Polish description dialog", done: false },
      ],
    },
    {
      id: nextId("col"),
      title: "Doing",
      tone: "doing",
      cards: [{ id: nextId("card"), text: "Drag and drop everything", done: false }],
    },
    {
      id: nextId("col"),
      title: "Done",
      tone: "done",
      cards: [
        { id: nextId("card"), text: "Parse markdown into columns", done: true },
        { id: nextId("card"), text: "Round-trip to disk", done: true },
      ],
    },
  ],
};

function mountBoard(selector: string, board: Board, options: BoardOptions = {}): BoardController | null {
  const mount = document.querySelector<HTMLElement>(selector);
  if (!mount) return null;
  const ctrl = new BoardController(mount, board, options);
  ctrl.render();
  return ctrl;
}

// ---- format section: bidirectional sync ---------------------------------

const formatSeedMarkdown = `# Todo
- [ ] Add CLI: serve a local board
- [ ] Polish UI: feel good

# Doing
- [ ] Wire npm publish

# Done
- [x] Headings become columns
`;

function setupFormatSection(): void {
  const textarea = document.querySelector<HTMLTextAreaElement>("[data-md-source]");
  const mount = document.querySelector<HTMLElement>('[data-board="format"]');
  if (!textarea || !mount) return;

  textarea.value = formatSeedMarkdown;
  const initial = parseMarkdown(formatSeedMarkdown);
  const ctrl = new BoardController(mount, initial, { showAddCard: true, editable: true });
  ctrl.render();

  let suppressNextRender = false;

  ctrl.onChange = (b) => {
    suppressNextRender = true;
    textarea.value = serializeMarkdown(b);
  };

  textarea.addEventListener("input", () => {
    if (suppressNextRender) {
      suppressNextRender = false;
      return;
    }
    const parsed = parseMarkdown(textarea.value);
    ctrl.setBoard(parsed, { silent: true });
  });
}

// ---- quickstart terminal ------------------------------------------------

const quickstartSeed: Board = {
  preamble: "",
  columns: [
    {
      id: nextId("col"),
      title: "Todo",
      tone: "todo",
      cards: [
        { id: nextId("card"), text: "Try editing me", done: false },
        { id: nextId("card"), text: "Drag me to Done", done: false },
      ],
    },
    {
      id: nextId("col"),
      title: "Doing",
      tone: "doing",
      cards: [{ id: nextId("card"), text: "Press the checkbox", done: false }],
    },
    {
      id: nextId("col"),
      title: "Done",
      tone: "done",
      cards: [{ id: nextId("card"), text: "Read the markdown", done: true }],
    },
  ],
};

function setupQuickstart(): void {
  const stage = document.querySelector<HTMLElement>("[data-qs-stage]");
  const body = document.querySelector<HTMLElement>("[data-qs-body]");
  const input = document.querySelector<HTMLInputElement>("[data-qs-input]");
  const browser = document.querySelector<HTMLElement>("[data-qs-browser]");
  const file = document.querySelector<HTMLElement>("[data-qs-file]");
  const fileBody = document.querySelector<HTMLTextAreaElement>("[data-qs-file-body]");
  const fileStatus = document.querySelector<HTMLElement>("[data-qs-file-status]");
  const boardMount = document.querySelector<HTMLElement>('[data-board="quickstart"]');
  if (!stage || !body || !input || !browser || !file || !fileBody || !boardMount) return;

  let started = false;
  let savedTimer: number | undefined;

  const run = () => {
    if (started) return;
    const cmd = input.value.trim();
    if (!cmd) return;
    started = true;

    // Freeze the input as a static line, then animate output.
    const promptLine = input.parentElement;
    if (promptLine) {
      const frozen = document.createElement("span");
      frozen.className = "qs-input-frozen";
      frozen.textContent = cmd;
      promptLine.replaceChild(frozen, input);
    }

    const lines = [
      { text: "▸ Resolving kanban-cli@latest from npm...", delay: 220 },
      { text: "▸ kanban-cli is running", delay: 380 },
      { text: "▸ File:  /Users/you/board.md", delay: 80 },
      { text: "▸ Board: http://127.0.0.1:4177", delay: 80 },
      { text: "▸ Opening browser...", delay: 320 },
    ];

    let cursor = 0;
    const writeNext = () => {
      if (cursor >= lines.length) {
        showLiveView();
        return;
      }
      const { text, delay } = lines[cursor]!;
      const div = document.createElement("div");
      div.className = "qs-line qs-line-out";
      div.textContent = text;
      body.appendChild(div);
      cursor += 1;
      setTimeout(writeNext, delay);
    };
    setTimeout(writeNext, 180);
  };

  const flashSaved = () => {
    if (!fileStatus) return;
    fileStatus.textContent = "writing…";
    fileStatus.classList.add("qs-file-status-writing");
    if (savedTimer) clearTimeout(savedTimer);
    savedTimer = window.setTimeout(() => {
      fileStatus.textContent = "saved";
      fileStatus.classList.remove("qs-file-status-writing");
    }, 360);
  };

  const showLiveView = () => {
    browser.hidden = false;
    file.hidden = false;
    requestAnimationFrame(() => {
      browser.classList.add("qs-browser-open");
      file.classList.add("qs-file-open");
    });
    const ctrl = new BoardController(boardMount, quickstartSeed, {
      showAddCard: true,
      editable: true,
    });
    let suppressReparse = false;
    ctrl.onChange = (b) => {
      suppressReparse = true;
      fileBody.value = serializeMarkdown(b);
      flashSaved();
    };
    ctrl.render();
    fileBody.value = serializeMarkdown(quickstartSeed);
    fileBody.addEventListener("input", () => {
      if (suppressReparse) {
        suppressReparse = false;
        return;
      }
      const parsed = parseMarkdown(fileBody.value);
      ctrl.setBoard(parsed, { silent: true });
      flashSaved();
    });
    stage.classList.add("qs-stage-open");
  };

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run();
    }
  });
  input.addEventListener("focus", () => input.select());
}

// ---- boot --------------------------------------------------------------

const year = new Date().getFullYear();
const footerYearEl = document.querySelector("[data-year]");
if (footerYearEl) footerYearEl.textContent = String(year);

mountBoard('[data-board="hero"]', structuredClone(heroSeed), {
  showAddCard: true,
  editable: true,
});

setupFormatSection();
setupQuickstart();
setupCopyAiPrompt();

function setupCopyAiPrompt(): void {
  const btn = document.querySelector<HTMLButtonElement>("[data-copy-ai-prompt]");
  const label = document.querySelector<HTMLElement>("[data-copy-ai-prompt-label]");
  if (!btn || !label) return;

  const prompt = [
    "Set up a kanban board for this project using kanban-cli (https://github.com/Vochsel/kanban-cli).",
    "",
    "1. Find an existing TODO/tasks markdown file in the repo. If there isn't one, create TODO.md at the project root with these sections:",
    "",
    "   # Todo",
    "   - [ ] First task",
    "",
    "   # Doing",
    "",
    "   # Done",
    "",
    "2. Run the CLI on that file in a terminal: `npx kanban-cli@latest <path/to/file.md>`",
    "",
    "It opens a local kanban board in the browser. The markdown file remains the source of truth — drag in the browser, the file updates; edit the file, the board reloads.",
  ].join("\n");

  btn.addEventListener("click", async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(prompt);
      } else {
        const ta = document.createElement("textarea");
        ta.value = prompt;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      const original = label.textContent;
      label.textContent = "Copied — paste in your AI tool";
      btn.classList.add("is-copied");
      setTimeout(() => {
        label.textContent = original;
        btn.classList.remove("is-copied");
      }, 1800);
    } catch (err) {
      console.error(err);
      label.textContent = "Copy failed";
    }
  });
}
