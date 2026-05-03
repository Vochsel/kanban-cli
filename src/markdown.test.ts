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
});
