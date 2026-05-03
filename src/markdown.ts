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
}

export interface Board {
  columns: Column[];
}

const headingPattern = /^(#{1,6})\s+(.+?)\s*#*\s*$/;
const checkboxPattern = /^\s*[-*+]\s+\[( |x|X)\]\s+(.+?)\s*$/;

export function createDefaultBoard(): Board {
  return {
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
}

export function parseMarkdown(markdown: string): Board {
  const columns: Column[] = [];
  const columnIds = new Map<string, number>();
  const cardIds = new Map<string, number>();
  let currentColumn: Column | undefined;

  for (const line of markdown.split(/\r?\n/)) {
    const heading = line.match(headingPattern);

    if (heading) {
      const title = cleanInlineText(heading[2]);
      currentColumn = {
        id: uniqueId(`col-${slugify(title, "column")}`, columnIds),
        title: title || "Untitled",
        cards: []
      };
      columns.push(currentColumn);
      continue;
    }

    const checkbox = line.match(checkboxPattern);

    if (!checkbox) {
      continue;
    }

    if (!currentColumn) {
      currentColumn = {
        id: uniqueId("col-inbox", columnIds),
        title: "Inbox",
        cards: []
      };
      columns.push(currentColumn);
    }

    const parsed = parseCardText(checkbox[2]);
    currentColumn.cards.push({
      id: uniqueId(`card-${slugify(parsed.title, "card")}`, cardIds),
      title: parsed.title,
      description: parsed.description,
      done: checkbox[1].toLowerCase() === "x"
    });
  }

  return columns.length > 0 ? { columns } : createDefaultBoard();
}

export function serializeBoard(board: Board): string {
  const columns = board.columns.length > 0 ? board.columns : createDefaultBoard().columns;

  return `${columns
    .map((column) => {
      const title = cleanInlineText(column.title) || "Untitled";
      const lines = [`# ${title}`];

      for (const card of column.cards) {
        const cardTitle = cleanInlineText(card.title) || "Untitled";
        const cardDescription = cleanInlineText(card.description);
        const checkbox = card.done ? "x" : " ";
        const body = cardDescription ? `${cardTitle}: ${cardDescription}` : cardTitle;
        lines.push(`- [${checkbox}] ${body}`);
      }

      return lines.join("\n");
    })
    .join("\n\n")}\n`;
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
    const rawCards = Array.isArray(column.cards) ? column.cards : [];
    const cards = rawCards.map((rawCard, cardIndex) => {
      const card = isRecord(rawCard) ? rawCard : {};
      const cardTitle = cleanInlineText(typeof card.title === "string" ? card.title : "");
      const fallbackCardId = `card-${slugify(cardTitle || `card-${cardIndex + 1}`, "card")}`;

      return {
        id: uniqueId(cleanId(card.id, fallbackCardId), cardIds),
        title: cardTitle || "Untitled",
        description: cleanInlineText(typeof card.description === "string" ? card.description : ""),
        done: Boolean(card.done)
      };
    });

    return {
      id,
      title: title || "Untitled",
      cards
    };
  });

  return columns.length > 0 ? { columns } : createDefaultBoard();
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
    description: cleanInlineText(normalized.slice(separator + 1))
  };
}

function cleanInlineText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
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
