export interface AppShellOptions {
  fileName: string;
}

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
      background: transparent;
      border: 1px solid transparent;
      border-radius: var(--radius);
      color: var(--ink-soft);
      cursor: pointer;
      height: 32px;
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
      align-items: baseline;
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

    h1 {
      color: var(--ink);
      font-size: 15px;
      font-weight: 600;
      line-height: 1.2;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      min-width: 0;
    }

    .top-actions {
      align-items: center;
      display: flex;
      flex: 0 0 auto;
      gap: 6px;
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

    .status-dot {
      background: var(--ok);
      border-radius: 50%;
      flex: 0 0 auto;
      height: 6px;
      width: 6px;
    }

    .status.is-saving .status-dot {
      background: var(--warn);
    }

    .status.is-error .status-dot {
      background: var(--danger);
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
      grid-template-columns: 22px minmax(0, 1fr) 28px;
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

    .icon-button:hover {
      color: var(--ink);
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

    .add-card::before {
      content: "+";
      font-size: 16px;
      font-weight: 600;
      line-height: 1;
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

    .add-column::before {
      content: "+";
      font-size: 16px;
      font-weight: 600;
      line-height: 1;
    }

    .add-column:hover {
      background: rgba(9, 30, 66, 0.12);
      color: var(--ink);
    }

    @media (max-width: 720px) {
      :root {
        --topbar-height: 48px;
      }

      .topbar {
        padding: 0 12px;
      }

      h1 {
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
        <h1 id="fileName">${escapeHtml(options.fileName)}</h1>
      </div>
      <div class="top-actions">
        <span id="status" class="status"><span class="status-dot"></span><span id="statusText">Loading</span></span>
        <button id="reload" class="ghost" type="button">Reload</button>
      </div>
    </header>
    <main class="board-wrap">
      <div id="board" class="board" aria-live="polite"></div>
    </main>
  </div>
  <script>
    const state = {
      board: { columns: [] },
      fileVersion: null,
      dragType: null,
      isDirty: false,
      isSaving: false,
      saveTimer: null,
      saveToken: 0
    };

    const boardEl = document.querySelector("#board");
    const fileNameEl = document.querySelector("#fileName");
    const statusEl = document.querySelector("#status");
    const statusTextEl = document.querySelector("#statusText");

    document.querySelector("#reload").addEventListener("click", () => loadBoard("manual"));

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
        state.isDirty = false;
        state.isSaving = false;
        fileNameEl.textContent = payload.fileName;
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
          renderBoard();
          setStatus("Reloaded from disk", "saved");
        }
      } catch (error) {
        console.error(error);
        setStatus("Sync failed", "error");
      }
    }

    function renderBoard() {
      boardEl.innerHTML = "";

      for (const column of state.board.columns) {
        boardEl.appendChild(renderColumn(column));
      }

      const addColumnBtn = button("Add column", "add-column", "Add column");
      boardEl.appendChild(addColumnBtn);

      boardEl.querySelectorAll(".card-description").forEach(growTextarea);
    }

    function renderColumn(column) {
      const columnEl = document.createElement("section");
      columnEl.className = "column";
      columnEl.dataset.columnId = column.id;

      const head = document.createElement("div");
      head.className = "column-head";

      const grip = button("::", "column-grip", "Drag column");
      grip.draggable = true;

      const title = document.createElement("input");
      title.className = "column-title";
      title.value = column.title;
      title.setAttribute("aria-label", "Column title");

      const remove = button("x", "icon-button delete-column", "Delete column");

      head.append(grip, title, remove);

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
      foot.appendChild(button("Add card", "add-card", "Add card"));

      columnEl.append(head, cards, foot);
      return columnEl;
    }

    function renderCard(card) {
      const cardEl = document.createElement("article");
      cardEl.className = card.done ? "card is-done" : "card";
      cardEl.dataset.cardId = card.id;

      const top = document.createElement("div");
      top.className = "card-top";

      const grip = button("::", "card-grip", "Drag card");
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

      const remove = button("x", "icon-button delete-card", "Delete card");

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
      statusEl.classList.toggle("is-saving", mode === "saving");
      statusEl.classList.toggle("is-error", mode === "error");
    }

    function button(text, className, label) {
      const element = document.createElement("button");
      element.type = "button";
      element.className = className;
      element.textContent = text;
      element.setAttribute("aria-label", label);
      element.title = label;
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
