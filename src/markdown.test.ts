import { describe, expect, test } from "bun:test";
import { normalizeBoard, parseMarkdown, serializeBoard } from "./markdown";

describe("markdown parser", () => {
  test("parses headings as columns and checkboxes as cards", () => {
    const board = parseMarkdown(`# Todo

- [ ] Add CLI: serve a local board
- [x] Write docs: README and npm notes

## Done

- [X] Publish: tag a release
`);

    expect(board.columns).toHaveLength(2);
    expect(board.columns[0].title).toBe("Todo");
    expect(board.columns[0].cards[0]).toMatchObject({
      title: "Add CLI",
      description: "serve a local board",
      done: false
    });
    expect(board.columns[0].cards[1]).toMatchObject({
      title: "Write docs",
      description: "README and npm notes",
      done: true
    });
    expect(board.columns[1].cards[0].done).toBe(true);
  });

  test("creates an inbox column for orphan cards", () => {
    const board = parseMarkdown("- [ ] No heading yet: still captured");

    expect(board.columns).toHaveLength(1);
    expect(board.columns[0].title).toBe("Inbox");
    expect(board.columns[0].cards[0].title).toBe("No heading yet");
  });

  test("serializes to stable markdown", () => {
    const markdown = serializeBoard({
      columns: [
        {
          id: "todo",
          title: "Todo",
          cards: [
            {
              id: "a",
              title: "Build",
              description: "ship the CLI",
              done: false
            },
            {
              id: "b",
              title: "Done item",
              description: "",
              done: true
            }
          ]
        }
      ]
    });

    expect(markdown).toBe(`# Todo
- [ ] Build: ship the CLI
- [x] Done item
`);
  });

  test("normalizes browser payloads before writing", () => {
    const board = normalizeBoard({
      columns: [
        {
          id: "bad id!",
          title: "  Doing  ",
          cards: [
            {
              title: "  Fix bug  ",
              description: " with notes ",
              done: 1
            }
          ]
        }
      ]
    });

    expect(board.columns[0]).toMatchObject({
      id: "bad-id",
      title: "Doing"
    });
    expect(board.columns[0].cards[0]).toMatchObject({
      title: "Fix bug",
      description: "with notes",
      done: true
    });
  });

  test("parses frontmatter title and theme", () => {
    const board = parseMarkdown(`---
title: Project Hex
theme: "#7c3aed"
---

# Todo
- [ ] First card
`);

    expect(board.title).toBe("Project Hex");
    expect(board.theme).toBe("#7c3aed");
    expect(board.columns[0].title).toBe("Todo");
  });

  test("parses per-column icon comment and strips it from title", () => {
    const board = parseMarkdown(`# Todo <!-- icon: list -->
- [ ] First

# Done <!--icon:check-->
- [x] Old
`);

    expect(board.columns[0].title).toBe("Todo");
    expect(board.columns[0].icon).toBe("list");
    expect(board.columns[1].icon).toBe("check");
  });

  test("serializes frontmatter and column icon", () => {
    const markdown = serializeBoard({
      title: "Project Hex",
      theme: "#7c3aed",
      columns: [
        {
          id: "todo",
          title: "Todo",
          icon: "list",
          cards: [
            { id: "a", title: "Build", description: "ship the CLI", done: false }
          ]
        },
        {
          id: "done",
          title: "Done",
          cards: []
        }
      ]
    });

    expect(markdown).toBe(`---
title: Project Hex
theme: #7c3aed
---

# Todo <!-- icon: list -->
- [ ] Build: ship the CLI

# Done
`);
  });

  test("omits frontmatter when no title or theme", () => {
    const markdown = serializeBoard({
      columns: [
        { id: "todo", title: "Todo", cards: [] }
      ]
    });

    expect(markdown.startsWith("---")).toBe(false);
  });

  test("round-trips frontmatter and icons", () => {
    const original = `---
title: My Board
theme: #ff0066
---

# Backlog <!-- icon: inbox -->
- [ ] Plan: outline scope

# Done <!-- icon: check -->
- [x] Ship: tag a release
`;
    const board = parseMarkdown(original);
    expect(serializeBoard(board)).toBe(original);
  });

  test("normalizeBoard accepts theme, title, and column icon", () => {
    const board = normalizeBoard({
      title: "  Hello  ",
      theme: "#ABC",
      columns: [
        { id: "a", title: "Todo", icon: "LIST", cards: [] },
        { id: "b", title: "Done", icon: "not a real icon!", cards: [] }
      ]
    });

    expect(board.title).toBe("Hello");
    expect(board.theme).toBe("#aabbcc");
    expect(board.columns[0].icon).toBe("list");
    expect(board.columns[1].icon).toBeUndefined();
  });
});
