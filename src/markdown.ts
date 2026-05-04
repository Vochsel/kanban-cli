export interface Card {
  id: string;
  title: string;
  description: string;
  done: boolean;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
  icon?: string;
}

export interface Board {
  columns: Column[];
  title?: string;
  theme?: string;
  instructions?: string;
}

const headingPattern = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const checkboxPattern = /^\s*[-*+]\s+\[( |x|X)\]\s+(.+?)\s*$/;
const continuationPattern = /^[ \t]+(\S.*?)\s*$/;
const frontmatterPattern = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const columnIconPattern = /<!--\s*icon\s*:\s*([\w-]+)\s*-->/i;
const themePattern = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/;
const iconNamePattern = /^[a-z][a-z0-9-]*$/;

export const DEFAULT_INSTRUCTIONS = `When working through tasks here, follow these defaults:

- Move a task into "Doing" section header before starting work on it
- When you complete a task, move it to the top of the "Done" section header (sort by most recent at top of list)
- Keep going to the next Todo item without stopping; only stop when the Todo column is empty

After each task, re-read the markdown to pick up any new Todo items that may have been added while you were working.`;

export function createDefaultBoard(options?: { instructions?: string | false }): Board {
  const instructions = options?.instructions === false
    ? undefined
    : options?.instructions ?? DEFAULT_INSTRUCTIONS;
  const board: Board = {
    columns: [
      {
        id: "col-todo",
        title: "Todo",
        cards: [
          {
            id: "card-first-card",
            title: "First card",
            description: "Edit this title and description, then drag it around",
            done: false
          }
        ]
      },
      {
        id: "col-doing",
        title: "Doing",
        cards: []
      },
      {
        id: "col-done",
        title: "Done",
        cards: []
      }
    ]
  };
  if (instructions) board.instructions = instructions;
  return board;
}

export function parseMarkdown(markdown: string): Board {
  const { meta, body } = stripFrontmatter(markdown);
  const columns: Column[] = [];
  const columnIds = new Map<string, number>();
  const cardIds = new Map<string, number>();
  let currentColumn: Column | undefined;

  const allLines = body.split(/\r?\n/);
  let firstStructureIndex = allLines.length;
  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i].match(headingPattern) || allLines[i].match(checkboxPattern)) {
      firstStructureIndex = i;
      break;
    }
  }
  const preludeLines = allLines.slice(0, firstStructureIndex);
  const bodyLines = allLines.slice(firstStructureIndex);
  const instructions = preludeLines.join("\n").replace(/^\s+|\s+$/g, "");

  let currentCard: Card | undefined;
  for (const line of bodyLines) {
    const heading = line.match(headingPattern);

    if (heading) {
      const headingBody = heading[2];
      const iconMatch = headingBody.match(columnIconPattern);
      const icon = iconMatch ? cleanIconName(iconMatch[1]) : undefined;
      const title = cleanInlineText(headingBody.replace(columnIconPattern, ""));
      currentColumn = {
        id: uniqueId(`col-${slugify(title, "column")}`, columnIds),
        title: title || "Untitled",
        cards: [],
        ...(icon ? { icon } : {})
      };
      columns.push(currentColumn);
      currentCard = undefined;
      continue;
    }

    const checkbox = line.match(checkboxPattern);

    if (checkbox) {
      if (!currentColumn) {
        currentColumn = {
          id: uniqueId("col-inbox", columnIds),
          title: "Inbox",
          cards: []
        };
        columns.push(currentColumn);
      }

      const parsed = parseCardText(checkbox[2]);
      const card: Card = {
        id: uniqueId(`card-${slugify(parsed.title, "card")}`, cardIds),
        title: parsed.title,
        description: parsed.description,
        done: checkbox[1].toLowerCase() === "x"
      };
      currentColumn.cards.push(card);
      currentCard = card;
      continue;
    }

    if (currentCard) {
      const cont = line.match(continuationPattern);
      if (cont) {
        currentCard.description = currentCard.description
          ? currentCard.description + "\n" + cont[1]
          : cont[1];
        continue;
      }
    }

    currentCard = undefined;
  }

  const board: Board = columns.length > 0
    ? { columns }
    : { columns: createDefaultBoard({ instructions: false }).columns };
  const title = cleanInlineText(meta.title ?? "");
  if (title) board.title = title;
  const theme = cleanTheme(meta.theme);
  if (theme) board.theme = theme;
  if (instructions) board.instructions = instructions;
  return board;
}

export function serializeBoard(board: Board): string {
  const columns = board.columns.length > 0 ? board.columns : createDefaultBoard().columns;
  const title = cleanInlineText(board.title ?? "");
  const theme = cleanTheme(board.theme);
  const frontmatter = renderFrontmatter(title, theme);
  const instructions = (board.instructions ?? "").replace(/^\s+|\s+$/g, "");
  const instructionsBlock = instructions ? `${instructions}\n\n` : "";
  const body = columns
    .map((column) => {
      const columnTitle = cleanInlineText(column.title) || "Untitled";
      const icon = cleanIconName(column.icon);
      const heading = icon ? `# ${columnTitle} <!-- icon: ${icon} -->` : `# ${columnTitle}`;
      const lines = [heading];

      for (const card of column.cards) {
        const cardTitle = cleanInlineText(card.title) || "Untitled";
        const cardDescription = cleanMultilineText(card.description);
        const checkbox = card.done ? "x" : " ";
        if (cardDescription.includes("\n")) {
          const descLines = cardDescription.split("\n");
          const first = descLines[0];
          lines.push(first ? `- [${checkbox}] ${cardTitle}: ${first}` : `- [${checkbox}] ${cardTitle}`);
          for (const cont of descLines.slice(1)) {
            lines.push(`  ${cont}`);
          }
        } else if (cardDescription) {
          lines.push(`- [${checkbox}] ${cardTitle}: ${cardDescription}`);
        } else {
          lines.push(`- [${checkbox}] ${cardTitle}`);
        }
      }

      return lines.join("\n");
    })
    .join("\n\n");

  return `${frontmatter}${instructionsBlock}${body}\n`;
}

export function normalizeBoard(input: unknown): Board {
  const source = isRecord(input) ? input : {};
  const rawColumns = Array.isArray(source.columns) ? source.columns : [];
  const columnIds = new Map<string, number>();
  const cardIds = new Map<string, number>();
  const columns = rawColumns.map((rawColumn, columnIndex) => {
    const column = isRecord(rawColumn) ? rawColumn : {};
    const title = cleanInlineText(typeof column.title === "string" ? column.title : "");
    const fallbackColumnId = `col-${slugify(title || `column-${columnIndex + 1}`, "column")}`;
    const id = uniqueId(cleanId(column.id, fallbackColumnId), columnIds);
    const icon = cleanIconName(typeof column.icon === "string" ? column.icon : undefined);
    const rawCards = Array.isArray(column.cards) ? column.cards : [];
    const cards = rawCards.map((rawCard, cardIndex) => {
      const card = isRecord(rawCard) ? rawCard : {};
      const cardTitle = cleanInlineText(typeof card.title === "string" ? card.title : "");
      const fallbackCardId = `card-${slugify(cardTitle || `card-${cardIndex + 1}`, "card")}`;

      return {
        id: uniqueId(cleanId(card.id, fallbackCardId), cardIds),
        title: cardTitle || "Untitled",
        description: cleanMultilineText(typeof card.description === "string" ? card.description : ""),
        done: Boolean(card.done)
      };
    });

    return {
      id,
      title: title || "Untitled",
      cards,
      ...(icon ? { icon } : {})
    };
  });

  const board: Board = columns.length > 0
    ? { columns }
    : { columns: createDefaultBoard({ instructions: false }).columns };
  const rawTitle = typeof source.title === "string" ? cleanInlineText(source.title) : "";
  if (rawTitle) board.title = rawTitle;
  const theme = cleanTheme(typeof source.theme === "string" ? source.theme : undefined);
  if (theme) board.theme = theme;
  if (typeof source.instructions === "string") {
    const instructions = source.instructions.replace(/^\s+|\s+$/g, "");
    if (instructions) board.instructions = instructions;
  }
  return board;
}

function parseCardText(text: string): Pick<Card, "title" | "description"> {
  const normalized = cleanInlineText(text);
  const separator = normalized.indexOf(":");

  if (separator === -1) {
    return {
      title: normalized || "Untitled",
      description: ""
    };
  }

  return {
    title: cleanInlineText(normalized.slice(0, separator)) || "Untitled",
    description: normalized.slice(separator + 1).trim()
  };
}

function stripFrontmatter(input: string): { meta: Record<string, string>; body: string } {
  const match = input.match(frontmatterPattern);
  if (!match) return { meta: {}, body: input };

  const meta: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    if (!key) continue;
    let value = line.slice(idx + 1).trim();
    if (value.length >= 2) {
      const first = value[0];
      const last = value[value.length - 1];
      if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
        value = value.slice(1, -1);
      }
    }
    meta[key.toLowerCase()] = value;
  }

  return { meta, body: input.slice(match[0].length) };
}

function renderFrontmatter(title: string, theme: string | undefined): string {
  const lines: string[] = [];
  if (title) lines.push(`title: ${escapeFrontmatterValue(title)}`);
  if (theme) lines.push(`theme: ${theme}`);
  if (lines.length === 0) return "";
  return `---\n${lines.join("\n")}\n---\n\n`;
}

function escapeFrontmatterValue(value: string): string {
  if (/[:#'"\n]/.test(value)) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

function cleanTheme(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  if (!themePattern.test(trimmed)) return undefined;
  if (trimmed.length === 4) {
    return `#${trimmed[1]}${trimmed[1]}${trimmed[2]}${trimmed[2]}${trimmed[3]}${trimmed[3]}`.toLowerCase();
  }
  return trimmed.toLowerCase();
}

function cleanIconName(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim().toLowerCase();
  if (!trimmed || !iconNamePattern.test(trimmed)) return undefined;
  return trimmed;
}

function cleanInlineText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function cleanMultilineText(value: string): string {
  return value
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/, ""))
    .join("\n")
    .replace(/^\s+|\s+$/g, "");
}

function cleanId(value: unknown, fallback: string): string {
  if (typeof value !== "string") {
    return fallback;
  }

  const cleaned = value.replace(/[^a-zA-Z0-9_-]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return cleaned || fallback;
}

function slugify(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function uniqueId(base: string, seen: Map<string, number>): string {
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
