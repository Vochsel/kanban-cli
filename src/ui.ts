import type { IconNode, SVGProps } from "lucide";
import {
  Archive,
  Bookmark,
  Bug,
  CircleAlert,
  CircleCheck,
  CircleDot,
  Clock,
  Eye,
  File,
  Flag,
  Folder,
  GripVertical,
  Hourglass,
  Inbox,
  LoaderCircle,
  List,
  ListTodo,
  Palette,
  Pause,
  Pencil,
  Play,
  Plus,
  RefreshCw,
  Rocket,
  Star,
  Tag,
  Target,
  Trash2,
  Trophy,
  Zap
} from "lucide";

export interface AppShellOptions {
  fileName: string;
}

type RenderableIconNode = Array<[tag: string, attrs: SVGProps, children?: RenderableIconNode]>;

const browserIcons = {
  grip: renderLucideIcon(GripVertical),
  palette: renderLucideIcon(Palette),
  plus: renderLucideIcon(Plus),
  reload: renderLucideIcon(RefreshCw),
  statusError: renderLucideIcon(CircleAlert),
  statusSaved: renderLucideIcon(CircleCheck),
  statusSaving: renderLucideIcon(LoaderCircle),
  trash: renderLucideIcon(Trash2)
} satisfies Record<string, string>;

const columnIconChoices: Array<{ name: string; label: string; icon: IconNode }> = [
  { name: "list", label: "List", icon: List },
  { name: "todo", label: "Todo list", icon: ListTodo },
  { name: "circle-dot", label: "In progress", icon: CircleDot },
  { name: "check", label: "Done", icon: CircleCheck },
  { name: "clock", label: "Clock", icon: Clock },
  { name: "hourglass", label: "Hourglass", icon: Hourglass },
  { name: "alert", label: "Alert", icon: CircleAlert },
  { name: "inbox", label: "Inbox", icon: Inbox },
  { name: "archive", label: "Archive", icon: Archive },
  { name: "star", label: "Star", icon: Star },
  { name: "flag", label: "Flag", icon: Flag },
  { name: "bookmark", label: "Bookmark", icon: Bookmark },
  { name: "tag", label: "Tag", icon: Tag },
  { name: "target", label: "Target", icon: Target },
  { name: "zap", label: "Zap", icon: Zap },
  { name: "rocket", label: "Rocket", icon: Rocket },
  { name: "trophy", label: "Trophy", icon: Trophy },
  { name: "file", label: "File", icon: File },
  { name: "folder", label: "Folder", icon: Folder },
  { name: "pencil", label: "Edit", icon: Pencil },
  { name: "eye", label: "Review", icon: Eye },
  { name: "bug", label: "Bug", icon: Bug },
  { name: "play", label: "Play", icon: Play },
  { name: "pause", label: "Pause", icon: Pause }
];

const columnIconMap: Record<string, string> = Object.fromEntries(
  columnIconChoices.map((entry) => [entry.name, renderLucideIcon(entry.icon)])
);

const columnIconCatalog = columnIconChoices.map((entry) => ({
  name: entry.name,
  label: entry.label
}));

export function renderAppShell(options: AppShellOptions): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(options.fileName)} - kanban-md</title>
  <style>
    :root {
      color-scheme: light;
      --bg: #f4f5f7;
      --surface: #ffffff;
      --column-bg: #ebecf0;
      --column-bg-hover: #e2e4ea;
      --ink: #172b4d;
      --ink-soft: #344563;
      --muted: #5e6c84;
      --line: #dfe1e6;
      --line-strong: #c1c7d0;
      --accent: #0c66e4;
      --accent-strong: #0747a6;
      --accent-soft: rgba(12, 102, 228, 0.12);
      --ok: #1f845a;
      --warn: #b8770a;
      --danger: #c9372c;
      --shadow-card: 0 1px 1px rgba(9, 30, 66, 0.13), 0 0 1px rgba(9, 30, 66, 0.10);
      --shadow-card-hover: 0 2px 4px rgba(9, 30, 66, 0.16), 0 0 1px rgba(9, 30, 66, 0.12);
      --radius-sm: 4px;
      --radius: 6px;
      --radius-lg: 8px;
      --topbar-height: 52px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", Roboto, "Helvetica Neue", Arial, sans-serif;
    }

    * {
      box-sizing: border-box;
    }

    html,
    body {
      height: 100%;
      margin: 0;
    }

    body {
      background: var(--bg);
      color: var(--ink);
      font-size: 14px;
      line-height: 1.4;
      -webkit-font-smoothing: antialiased;
    }

    button,
    input,
    textarea {
      font: inherit;
      color: inherit;
    }

    button {
      align-items: center;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink-soft);
      cursor: pointer;
      display: inline-flex;
      gap: 6px;
      height: 32px;
      justify-content: center;
      padding: 0 10px;
      transition: background-color 120ms ease, color 120ms ease, border-color 120ms ease;
    }

    button:hover {
      background: rgba(9, 30, 66, 0.06);
      color: var(--ink);
    }

    button:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 1px;
    }

    .shell {
      display: grid;
      grid-template-rows: var(--topbar-height) 1fr;
      height: 100vh;
    }

    .topbar {
      align-items: center;
      background: var(--surface);
      border-bottom: 1px solid var(--line);
      display: flex;
      gap: 12px;
      padding: 0 16px;
    }

    .brand {
      align-items: center;
      display: flex;
      gap: 10px;
      flex: 1 1 auto;
      min-width: 0;
    }

    .brand-mark {
      color: var(--muted);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.02em;
      flex: 0 0 auto;
    }

    .board-title {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink);
      flex: 1 1 auto;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.2;
      min-width: 0;
      outline: none;
      overflow: hidden;
      padding: 5px 7px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .board-title:hover {
      background: rgba(9, 30, 66, 0.04);
    }

    .board-title:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .board-title::placeholder {
      color: var(--muted);
      font-weight: 500;
    }

    .top-actions {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      gap: 6px;
    }

    .theme-picker {
      align-items: center;
      display: inline-flex;
      flex: 0 0 auto;
      position: relative;
    }

    .theme-picker .lucide-icon {
      pointer-events: none;
    }

    .theme-input {
      appearance: none;
      -webkit-appearance: none;
      background: transparent;
      border: 0;
      cursor: pointer;
      height: 32px;
      inset: 0;
      margin: 0;
      opacity: 0;
      padding: 0;
      position: absolute;
      width: 32px;
    }

    .theme-swatch {
      align-items: center;
      background: var(--accent);
      border: 1px solid rgba(9, 30, 66, 0.16);
      border-radius: 999px;
      color: #ffffff;
      display: inline-flex;
      flex: 0 0 auto;
      height: 22px;
      justify-content: center;
      pointer-events: none;
      width: 22px;
    }

    .theme-swatch .lucide-icon {
      height: 12px;
      width: 12px;
    }

    .status {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      font-size: 12px;
      gap: 6px;
      height: 32px;
      padding: 0 8px;
      white-space: nowrap;
    }

    .lucide-icon {
      display: block;
      flex: 0 0 auto;
      height: 16px;
      stroke-width: 2;
      width: 16px;
    }

    .status-icon {
      align-items: center;
      color: var(--ok);
      display: inline-flex;
      flex: 0 0 auto;
      justify-content: center;
    }

    .status-icon .lucide-icon {
      height: 14px;
      width: 14px;
    }

    .status.is-saving .status-icon {
      color: var(--warn);
    }

    .status.is-saving .status-icon .lucide-icon {
      animation: spin 900ms linear infinite;
    }

    .status.is-error .status-icon {
      color: var(--danger);
    }

    .ghost {
      font-weight: 500;
    }

    .primary {
      background: var(--accent);
      border-color: var(--accent);
      color: #ffffff;
      font-weight: 600;
      padding: 0 12px;
    }

    .primary:hover {
      background: var(--accent-strong);
      border-color: var(--accent-strong);
      color: #ffffff;
    }

    .board-wrap {
      min-height: 0;
      min-width: 0;
      overflow: hidden;
    }

    .board {
      align-items: flex-start;
      display: flex;
      gap: 12px;
      height: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 16px;
      scroll-padding: 16px;
    }

    .column {
      background: var(--column-bg);
      border-radius: var(--radius-lg);
      display: flex;
      flex: 0 0 280px;
      flex-direction: column;
      max-height: 100%;
      min-height: 80px;
    }

    .column.column-dragging {
      opacity: 0.5;
    }

    .column-head {
      align-items: center;
      display: grid;
      gap: 4px;
      grid-template-columns: 22px 26px minmax(0, 1fr) 28px;
      padding: 10px 8px 6px 10px;
    }

    .column-grip,
    .card-grip {
      align-items: center;
      color: var(--muted);
      cursor: grab;
      display: inline-flex;
      font-size: 14px;
      height: 24px;
      justify-content: center;
      line-height: 1;
      opacity: 0.5;
      padding: 0;
      transition: opacity 120ms ease;
      user-select: none;
      width: 22px;
    }

    .column-grip .lucide-icon,
    .card-grip .lucide-icon {
      height: 16px;
      width: 16px;
    }

    .column:hover .column-grip,
    .card:hover .card-grip {
      opacity: 1;
    }

    .column-grip:active,
    .card-grip:active {
      cursor: grabbing;
    }

    .icon-button {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      font-size: 16px;
      height: 28px;
      justify-content: center;
      line-height: 1;
      padding: 0;
      width: 28px;
    }

    .icon-button .lucide-icon {
      height: 15px;
      width: 15px;
    }

    .icon-button:hover {
      color: var(--ink);
    }

    .column-icon-btn {
      color: var(--ink-soft);
      height: 26px;
      opacity: 0.55;
      transition: opacity 120ms ease, color 120ms ease, background-color 120ms ease;
      width: 26px;
    }

    .column-icon-btn .lucide-icon {
      height: 16px;
      width: 16px;
    }

    .column-icon-btn.has-icon {
      color: var(--accent);
      opacity: 1;
    }

    .column:hover .column-icon-btn,
    .column-icon-btn:focus-visible,
    .column-icon-btn.is-open {
      opacity: 1;
    }

    .column-title {
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink);
      font-size: 14px;
      font-weight: 600;
      min-width: 0;
      outline: none;
      padding: 5px 7px;
      width: 100%;
    }

    .column-title:hover {
      background: rgba(9, 30, 66, 0.04);
    }

    .column-title:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .icon-popover {
      background: var(--surface);
      border: 1px solid var(--line);
      border-radius: var(--radius-lg);
      box-shadow: 0 8px 24px rgba(9, 30, 66, 0.18), 0 0 1px rgba(9, 30, 66, 0.16);
      display: grid;
      gap: 4px;
      grid-template-columns: repeat(6, 28px);
      padding: 8px;
      position: fixed;
      z-index: 50;
    }

    .icon-popover .icon-popover-row {
      display: contents;
    }

    .icon-choice {
      align-items: center;
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
      color: var(--ink-soft);
      cursor: pointer;
      display: inline-flex;
      height: 28px;
      justify-content: center;
      padding: 0;
      width: 28px;
    }

    .icon-choice:hover {
      background: rgba(9, 30, 66, 0.06);
      color: var(--ink);
    }

    .icon-choice.is-active {
      background: var(--accent-soft);
      color: var(--accent);
    }

    .icon-choice .lucide-icon {
      height: 16px;
      width: 16px;
    }

    .icon-popover-clear {
      grid-column: 1 / -1;
      height: 26px;
      justify-content: flex-start;
      padding: 0 6px;
    }

    .cards {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      gap: 8px;
      min-height: 8px;
      overflow-x: hidden;
      overflow-y: auto;
      padding: 4px 8px;
      scrollbar-width: thin;
    }

    .cards::-webkit-scrollbar {
      width: 8px;
    }

    .cards::-webkit-scrollbar-thumb {
      background: rgba(9, 30, 66, 0.18);
      border-radius: 4px;
    }

    .card {
      background: var(--surface);
      border-radius: var(--radius);
      box-shadow: var(--shadow-card);
      display: grid;
      gap: 4px;
      padding: 8px 8px 8px 6px;
      transition: box-shadow 120ms ease;
    }

    .card:hover {
      box-shadow: var(--shadow-card-hover);
    }

    .card.card-dragging {
      opacity: 0.5;
    }

    .card-top {
      align-items: center;
      display: grid;
      gap: 4px;
      grid-template-columns: 22px 22px minmax(0, 1fr) 26px;
    }

    .card-check {
      accent-color: var(--accent);
      cursor: pointer;
      height: 14px;
      justify-self: center;
      margin: 0;
      width: 14px;
    }

    .card-title,
    .card-description {
      border: 1px solid transparent;
      border-radius: var(--radius-sm);
      color: var(--ink);
      outline: none;
      width: 100%;
    }

    .card-title {
      background: transparent;
      font-size: 14px;
      font-weight: 500;
      min-width: 0;
      padding: 4px 6px;
    }

    .card-title:hover {
      background: rgba(9, 30, 66, 0.04);
    }

    .card-title:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .card-description {
      background: transparent;
      color: var(--ink-soft);
      font-size: 13px;
      line-height: 1.4;
      margin-left: 22px;
      min-height: 26px;
      overflow: hidden;
      padding: 4px 6px;
      resize: none;
      width: calc(100% - 22px);
    }

    .card-description::placeholder {
      color: var(--muted);
    }

    .card-description:hover {
      background: rgba(9, 30, 66, 0.04);
    }

    .card-description:focus {
      background: var(--surface);
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent-soft);
    }

    .card.is-done .card-title {
      color: var(--muted);
      text-decoration: line-through;
    }

    .column-foot {
      padding: 4px 8px 8px;
    }

    .add-card {
      align-items: center;
      color: var(--muted);
      display: inline-flex;
      font-size: 13px;
      font-weight: 500;
      gap: 6px;
      height: 32px;
      justify-content: flex-start;
      padding: 0 8px;
      text-align: left;
      width: 100%;
    }

    .add-card .lucide-icon,
    .add-column .lucide-icon,
    .ghost .lucide-icon {
      height: 15px;
      width: 15px;
    }

    .add-card:hover {
      background: rgba(9, 30, 66, 0.08);
      color: var(--ink);
    }

    .empty {
      color: var(--muted);
      font-size: 12px;
      padding: 8px 8px 12px;
      text-align: center;
    }

    .add-column {
      align-items: center;
      align-self: flex-start;
      background: rgba(9, 30, 66, 0.06);
      border-radius: var(--radius-lg);
      color: var(--ink-soft);
      display: inline-flex;
      flex: 0 0 280px;
      font-size: 13px;
      font-weight: 500;
      gap: 6px;
      height: 40px;
      justify-content: flex-start;
      padding: 0 12px;
      transition: background-color 120ms ease;
    }

    .add-column:hover {
      background: rgba(9, 30, 66, 0.12);
      color: var(--ink);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @media (max-width: 720px) {
      :root {
        --topbar-height: 48px;
      }

      .topbar {
        padding: 0 12px;
      }

      .board-title {
        font-size: 14px;
      }

      .board {
        gap: 8px;
        padding: 12px;
        scroll-padding: 12px;
      }

      .column {
        flex-basis: min(82vw, 300px);
      }

      .add-column {
        flex-basis: min(82vw, 300px);
      }
    }
  </style>
</head>
<body>
  <div class="shell">
    <header class="topbar">
      <div class="brand">
        <span class="brand-mark">kanban-md</span>
        <input id="boardTitle" class="board-title" type="text" aria-label="Board title" autocomplete="off" spellcheck="false">
      </div>
      <div class="top-actions">
        <label class="theme-picker" title="Board theme color">
          <span class="theme-swatch" id="themeSwatch">${browserIcons.palette}</span>
          <input id="themeInput" class="theme-input" type="color" aria-label="Board theme color" value="#0c66e4">
        </label>
        <span id="status" class="status"><span id="statusIcon" class="status-icon">${browserIcons.statusSaving}</span><span id="statusText">Loading</span></span>
        <button id="reload" class="ghost" type="button">${browserIcons.reload}<span>Reload</span></button>
      </div>
    </header>
    <main class="board-wrap">
      <div id="board" class="board" aria-live="polite"></div>
    </main>
  </div>
  <script>
    const state = {
      board: { columns: [] },
      fileName: ${JSON.stringify(options.fileName)},
      fileVersion: null,
      dragType: null,
      isDirty: false,
      isSaving: false,
      saveTimer: null,
      saveToken: 0,
      iconPopover: null
    };

    const icons = ${JSON.stringify(browserIcons)};
    const columnIcons = ${JSON.stringify(columnIconMap)};
    const columnIconCatalog = ${JSON.stringify(columnIconCatalog)};
    const DEFAULT_ACCENT = "#0c66e4";

    const boardEl = document.querySelector("#board");
    const boardTitleEl = document.querySelector("#boardTitle");
    const themeInputEl = document.querySelector("#themeInput");
    const themeSwatchEl = document.querySelector("#themeSwatch");
    const statusEl = document.querySelector("#status");
    const statusIconEl = document.querySelector("#statusIcon");
    const statusTextEl = document.querySelector("#statusText");

    document.querySelector("#reload").addEventListener("click", () => loadBoard("manual"));

    boardTitleEl.addEventListener("input", () => {
      state.board.title = boardTitleEl.value.trim() || undefined;
      scheduleSave();
    });

    boardTitleEl.addEventListener("blur", () => {
      const trimmed = boardTitleEl.value.trim();
      boardTitleEl.value = trimmed;
      state.board.title = trimmed || undefined;
      updateDocumentTitle();
    });

    themeInputEl.addEventListener("input", () => {
      const value = themeInputEl.value.toLowerCase();
      state.board.theme = value === DEFAULT_ACCENT ? undefined : value;
      applyTheme(value);
      scheduleSave();
    });

    boardEl.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) return;

      if (button.matches(".add-column")) {
        addColumn();
        return;
      }

      const columnEl = button.closest(".column");
      const cardEl = button.closest(".card");

      if (button.matches(".add-card") && columnEl) {
        addCard(columnEl.dataset.columnId);
      }

      if (button.matches(".delete-column") && columnEl) {
        deleteColumn(columnEl.dataset.columnId);
      }

      if (button.matches(".delete-card") && columnEl && cardEl) {
        deleteCard(columnEl.dataset.columnId, cardEl.dataset.cardId);
      }

      if (button.matches(".column-icon-btn") && columnEl) {
        toggleIconPopover(button, columnEl.dataset.columnId);
      }
    });

    boardEl.addEventListener("input", (event) => {
      const target = event.target;

      if (target.matches(".card-description")) {
        growTextarea(target);
      }

      syncStateFromDom();
      scheduleSave();
    });

    boardEl.addEventListener("change", (event) => {
      if (!event.target.matches(".card-check")) return;
      syncStateFromDom();
      scheduleSave();
      event.target.closest(".card").classList.toggle("is-done", event.target.checked);
    });

    boardEl.addEventListener("blur", (event) => {
      const target = event.target;
      if (!target.matches(".column-title, .card-title")) return;

      if (!target.value.trim()) {
        target.value = "Untitled";
        syncStateFromDom();
        scheduleSave();
      }
    }, true);

    boardEl.addEventListener("dragstart", (event) => {
      const columnHandle = event.target.closest(".column-grip");
      const cardHandle = event.target.closest(".card-grip");

      if (columnHandle) {
        const columnEl = columnHandle.closest(".column");
        state.dragType = "column";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", columnEl.dataset.columnId);
        requestAnimationFrame(() => columnEl.classList.add("column-dragging"));
        return;
      }

      if (cardHandle) {
        const cardEl = cardHandle.closest(".card");
        state.dragType = "card";
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", cardEl.dataset.cardId);
        requestAnimationFrame(() => cardEl.classList.add("card-dragging"));
      }
    });

    boardEl.addEventListener("dragover", (event) => {
      if (state.dragType === "card") {
        const list = event.target.closest(".cards");
        const dragging = boardEl.querySelector(".card-dragging");
        if (!list || !dragging) return;

        event.preventDefault();
        list.querySelector(".empty")?.remove();
        const after = getAfterElement(list, ".card:not(.card-dragging)", event.clientY, "vertical");
        if (!after) {
          list.appendChild(dragging);
        } else {
          list.insertBefore(dragging, after);
        }
      }

      if (state.dragType === "column") {
        const dragging = boardEl.querySelector(".column-dragging");
        if (!dragging) return;

        event.preventDefault();
        const after = getAfterElement(boardEl, ".column:not(.column-dragging)", event.clientX, "horizontal");
        const addColumnTile = boardEl.querySelector(".add-column");
        if (!after) {
          if (addColumnTile) {
            boardEl.insertBefore(dragging, addColumnTile);
          } else {
            boardEl.appendChild(dragging);
          }
        } else {
          boardEl.insertBefore(dragging, after);
        }
      }
    });

    boardEl.addEventListener("drop", (event) => {
      if (state.dragType) event.preventDefault();
    });

    boardEl.addEventListener("dragend", () => {
      const changed = Boolean(state.dragType);
      boardEl.querySelectorAll(".card-dragging, .column-dragging").forEach((el) => {
        el.classList.remove("card-dragging", "column-dragging");
      });
      state.dragType = null;

      if (changed) {
        syncStateFromDom();
        renderBoard();
        saveNow();
      }
    });

    document.addEventListener("click", (event) => {
      if (!state.iconPopover) return;
      if (state.iconPopover.element.contains(event.target)) return;
      if (state.iconPopover.button.contains(event.target)) return;
      closeIconPopover();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.iconPopover) {
        closeIconPopover();
      }
    });

    window.addEventListener("resize", () => {
      if (state.iconPopover) closeIconPopover();
    });

    async function loadBoard(reason) {
      if (reason === "external" && state.isDirty) {
        setStatus("File changed on disk", "saving");
        return;
      }

      setStatus("Loading", "saving");

      try {
        const response = await fetch("/api/board", { headers: { "Accept": "application/json" } });
        if (!response.ok) throw new Error(await response.text());
        const payload = await response.json();
        state.board = payload.board;
        state.fileVersion = payload.version;
        state.fileName = payload.fileName;
        state.isDirty = false;
        state.isSaving = false;
        applyBoardChrome();
        renderBoard();
        setStatus(reason === "external" ? "Reloaded from disk" : "Saved", "saved");
      } catch (error) {
        console.error(error);
        setStatus("Load failed", "error");
      }
    }

    async function checkDiskChanges() {
      if (!state.fileVersion || state.isDirty || state.isSaving || state.dragType) {
        return;
      }

      try {
        const response = await fetch("/api/board", { headers: { "Accept": "application/json" } });
        if (!response.ok) throw new Error(await response.text());
        const payload = await response.json();

        if (payload.version && payload.version !== state.fileVersion) {
          state.board = payload.board;
          state.fileVersion = payload.version;
          state.fileName = payload.fileName;
          applyBoardChrome();
          renderBoard();
          setStatus("Reloaded from disk", "saved");
        }
      } catch (error) {
        console.error(error);
        setStatus("Sync failed", "error");
      }
    }

    function applyBoardChrome() {
      boardTitleEl.value = state.board.title ?? "";
      boardTitleEl.placeholder = state.fileName;
      const theme = state.board.theme ?? DEFAULT_ACCENT;
      themeInputEl.value = theme;
      applyTheme(theme);
      updateDocumentTitle();
    }

    function updateDocumentTitle() {
      const display = (state.board.title && state.board.title.trim()) || state.fileName;
      document.title = display + " - kanban-md";
    }

    function applyTheme(color) {
      const root = document.documentElement.style;
      const hex = normalizeHex(color);
      if (!hex) {
        root.removeProperty("--accent");
        root.removeProperty("--accent-strong");
        root.removeProperty("--accent-soft");
        themeSwatchEl.style.removeProperty("background");
        return;
      }
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const strong = darken(r, g, b, 0.7);
      root.setProperty("--accent", hex);
      root.setProperty("--accent-strong", strong);
      root.setProperty("--accent-soft", "rgba(" + r + ", " + g + ", " + b + ", 0.12)");
      themeSwatchEl.style.background = hex;
    }

    function normalizeHex(value) {
      if (typeof value !== "string") return null;
      const trimmed = value.trim().toLowerCase();
      if (/^#[0-9a-f]{6}$/.test(trimmed)) return trimmed;
      if (/^#[0-9a-f]{3}$/.test(trimmed)) {
        return "#" + trimmed[1] + trimmed[1] + trimmed[2] + trimmed[2] + trimmed[3] + trimmed[3];
      }
      return null;
    }

    function darken(r, g, b, factor) {
      const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * factor)));
      const hex = (v) => v.toString(16).padStart(2, "0");
      return "#" + hex(clamp(r)) + hex(clamp(g)) + hex(clamp(b));
    }

    function renderBoard() {
      closeIconPopover();
      boardEl.innerHTML = "";

      for (const column of state.board.columns) {
        boardEl.appendChild(renderColumn(column));
      }

      const addColumnBtn = button("Add column", "add-column", "Add column", "plus");
      boardEl.appendChild(addColumnBtn);

      boardEl.querySelectorAll(".card-description").forEach(growTextarea);
    }

    function renderColumn(column) {
      const columnEl = document.createElement("section");
      columnEl.className = "column";
      columnEl.dataset.columnId = column.id;

      const head = document.createElement("div");
      head.className = "column-head";

      const grip = button("", "column-grip", "Drag column", "grip");
      grip.draggable = true;

      const iconBtn = document.createElement("button");
      iconBtn.type = "button";
      const hasIcon = Boolean(column.icon && columnIcons[column.icon]);
      iconBtn.className = hasIcon ? "icon-button column-icon-btn has-icon" : "icon-button column-icon-btn";
      iconBtn.setAttribute("aria-label", "Column icon");
      iconBtn.title = "Set column icon";
      iconBtn.dataset.columnIconBtn = "1";
      iconBtn.innerHTML = hasIcon ? columnIcons[column.icon] : columnIcons.list;
      if (!hasIcon) iconBtn.style.opacity = "";

      const title = document.createElement("input");
      title.className = "column-title";
      title.value = column.title;
      title.setAttribute("aria-label", "Column title");

      const remove = button("", "icon-button delete-column", "Delete column", "trash");

      head.append(grip, iconBtn, title, remove);

      const cards = document.createElement("div");
      cards.className = "cards";
      cards.dataset.columnId = column.id;

      if (column.cards.length === 0) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Drop cards here";
        cards.appendChild(empty);
      } else {
        for (const card of column.cards) {
          cards.appendChild(renderCard(card));
        }
      }

      const foot = document.createElement("div");
      foot.className = "column-foot";
      foot.appendChild(button("Add card", "add-card", "Add card", "plus"));

      columnEl.append(head, cards, foot);
      return columnEl;
    }

    function renderCard(card) {
      const cardEl = document.createElement("article");
      cardEl.className = card.done ? "card is-done" : "card";
      cardEl.dataset.cardId = card.id;

      const top = document.createElement("div");
      top.className = "card-top";

      const grip = button("", "card-grip", "Drag card", "grip");
      grip.draggable = true;

      const check = document.createElement("input");
      check.className = "card-check";
      check.type = "checkbox";
      check.checked = card.done;
      check.setAttribute("aria-label", "Done");

      const title = document.createElement("input");
      title.className = "card-title";
      title.value = card.title;
      title.setAttribute("aria-label", "Card title");

      const remove = button("", "icon-button delete-card", "Delete card", "trash");

      top.append(grip, check, title, remove);

      const description = document.createElement("textarea");
      description.className = "card-description";
      description.value = card.description;
      description.rows = 1;
      description.placeholder = "Add a description";
      description.setAttribute("aria-label", "Card description");

      cardEl.append(top, description);
      return cardEl;
    }

    function toggleIconPopover(buttonEl, columnId) {
      if (state.iconPopover && state.iconPopover.columnId === columnId) {
        closeIconPopover();
        return;
      }
      closeIconPopover();
      openIconPopover(buttonEl, columnId);
    }

    function openIconPopover(buttonEl, columnId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      const popover = document.createElement("div");
      popover.className = "icon-popover";
      popover.setAttribute("role", "dialog");
      popover.setAttribute("aria-label", "Pick column icon");

      for (const entry of columnIconCatalog) {
        const choice = document.createElement("button");
        choice.type = "button";
        choice.className = column.icon === entry.name ? "icon-choice is-active" : "icon-choice";
        choice.title = entry.label;
        choice.setAttribute("aria-label", entry.label);
        choice.innerHTML = columnIcons[entry.name];
        choice.addEventListener("click", () => {
          column.icon = entry.name;
          closeIconPopover();
          renderBoard();
          saveNow();
        });
        popover.appendChild(choice);
      }

      const clear = document.createElement("button");
      clear.type = "button";
      clear.className = "icon-choice icon-popover-clear";
      clear.textContent = "No icon";
      clear.addEventListener("click", () => {
        delete column.icon;
        closeIconPopover();
        renderBoard();
        saveNow();
      });
      popover.appendChild(clear);

      document.body.appendChild(popover);
      const rect = buttonEl.getBoundingClientRect();
      const popWidth = popover.offsetWidth;
      const popHeight = popover.offsetHeight;
      let left = rect.left;
      if (left + popWidth > window.innerWidth - 8) {
        left = Math.max(8, window.innerWidth - popWidth - 8);
      }
      let top = rect.bottom + 4;
      if (top + popHeight > window.innerHeight - 8) {
        top = Math.max(8, rect.top - popHeight - 4);
      }
      popover.style.left = left + "px";
      popover.style.top = top + "px";

      buttonEl.classList.add("is-open");
      state.iconPopover = { element: popover, button: buttonEl, columnId };
    }

    function closeIconPopover() {
      if (!state.iconPopover) return;
      state.iconPopover.button.classList.remove("is-open");
      state.iconPopover.element.remove();
      state.iconPopover = null;
    }

    function addColumn() {
      const column = {
        id: createId("column"),
        title: "New column",
        cards: []
      };
      state.board.columns.push(column);
      renderBoard();
      focusColumn(column.id);
      saveNow();
    }

    function addCard(columnId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      const card = {
        id: createId("card"),
        title: "New card",
        description: "",
        done: false
      };
      column.cards.push(card);
      renderBoard();
      focusCard(card.id);
      saveNow();
    }

    function deleteColumn(columnId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      if (column.cards.length > 0 && !window.confirm("Delete this column and its cards?")) {
        return;
      }

      state.board.columns = state.board.columns.filter((item) => item.id !== columnId);
      renderBoard();
      saveNow();
    }

    function deleteCard(columnId, cardId) {
      const column = state.board.columns.find((item) => item.id === columnId);
      if (!column) return;

      column.cards = column.cards.filter((item) => item.id !== cardId);
      renderBoard();
      saveNow();
    }

    function syncStateFromDom() {
      const columnById = new Map(state.board.columns.map((column) => [column.id, column]));
      const cardById = new Map(state.board.columns.flatMap((column) => column.cards.map((card) => [card.id, card])));
      const nextColumns = [];

      for (const columnEl of boardEl.querySelectorAll(".column")) {
        const column = columnById.get(columnEl.dataset.columnId);
        if (!column) continue;

        column.title = columnEl.querySelector(".column-title").value.trim() || "Untitled";
        column.cards = [];

        for (const cardEl of columnEl.querySelectorAll(".card")) {
          const card = cardById.get(cardEl.dataset.cardId);
          if (!card) continue;

          card.title = cardEl.querySelector(".card-title").value.trim() || "Untitled";
          card.description = cardEl.querySelector(".card-description").value.trim();
          card.done = cardEl.querySelector(".card-check").checked;
          column.cards.push(card);
        }

        nextColumns.push(column);
      }

      state.board.columns = nextColumns;
    }

    function scheduleSave() {
      state.isDirty = true;
      clearTimeout(state.saveTimer);
      state.saveTimer = setTimeout(() => saveNow(), 320);
      setStatus("Saving", "saving");
    }

    async function saveNow() {
      clearTimeout(state.saveTimer);
      syncStateFromDom();
      const token = ++state.saveToken;
      state.isDirty = true;
      state.isSaving = true;
      setStatus("Saving", "saving");

      try {
        const response = await fetch("/api/board", {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(state.board)
        });

        if (!response.ok) throw new Error(await response.text());
        const payload = await response.json();

        if (token === state.saveToken) {
          state.board = payload.board;
          state.fileVersion = payload.version;
          state.fileName = payload.fileName;
          state.isDirty = false;
          state.isSaving = false;
          setStatus("Saved", "saved");
        }
      } catch (error) {
        console.error(error);
        if (token === state.saveToken) {
          state.isSaving = false;
          setStatus("Save failed", "error");
        }
      }
    }

    function setStatus(text, mode) {
      statusTextEl.textContent = text;
      const iconName = mode === "error" ? "statusError" : mode === "saving" ? "statusSaving" : "statusSaved";
      statusIconEl.innerHTML = icons[iconName];
      statusEl.classList.toggle("is-saving", mode === "saving");
      statusEl.classList.toggle("is-error", mode === "error");
    }

    function button(text, className, label, iconName) {
      const element = document.createElement("button");
      element.type = "button";
      element.className = className;
      element.setAttribute("aria-label", label);
      element.title = label;

      if (iconName) {
        element.insertAdjacentHTML("afterbegin", icons[iconName]);
      }

      if (text) {
        const textEl = document.createElement("span");
        textEl.textContent = text;
        element.appendChild(textEl);
      }

      return element;
    }

    function getAfterElement(container, selector, position, axis) {
      const elements = [...container.querySelectorAll(selector)];
      let closest = { offset: Number.NEGATIVE_INFINITY, element: null };

      for (const child of elements) {
        const box = child.getBoundingClientRect();
        const midpoint = axis === "horizontal" ? box.left + box.width / 2 : box.top + box.height / 2;
        const offset = position - midpoint;

        if (offset < 0 && offset > closest.offset) {
          closest = { offset, element: child };
        }
      }

      return closest.element;
    }

    function growTextarea(textarea) {
      textarea.style.height = "0px";
      textarea.style.height = Math.min(180, textarea.scrollHeight) + "px";
    }

    function focusColumn(columnId) {
      requestAnimationFrame(() => {
        const input = boardEl.querySelector('[data-column-id="' + columnId + '"] .column-title');
        input?.focus();
        input?.select();
      });
    }

    function focusCard(cardId) {
      requestAnimationFrame(() => {
        const input = boardEl.querySelector('[data-card-id="' + cardId + '"] .card-title');
        input?.focus();
        input?.select();
      });
    }

    function createId(prefix) {
      if (crypto.randomUUID) {
        return prefix + "-" + crypto.randomUUID();
      }

      return prefix + "-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2);
    }

    boardTitleEl.placeholder = state.fileName;
    loadBoard("initial");
    setInterval(checkDiskChanges, 1500);
  </script>
</body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLucideIcon(iconNode: IconNode): string {
  return `<svg class="lucide-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${renderIconChildren(iconNode as RenderableIconNode)}</svg>`;
}

function renderIconChildren(iconNode: RenderableIconNode): string {
  return iconNode
    .map(([tag, attrs, children]) => {
      const attributes = Object.entries(attrs)
        .map(([name, value]) => {
          if (value === undefined) {
            return "";
          }

          return ` ${name}="${escapeHtml(String(value))}"`;
        })
        .join("");
      const body = children ? renderIconChildren(children) : "";

      return `<${tag}${attributes}>${body}</${tag}>`;
    })
    .join("");
}
