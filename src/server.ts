import { basename, dirname, resolve } from "node:path";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createDefaultBoard, normalizeBoard, parseMarkdown, serializeBoard, type Board } from "./markdown";
import { renderAppShell, type BoardSummary } from "./ui";

export interface ServerOptions {
  filePaths: string[];
  host: string;
  port: number;
  defaultInstructions?: boolean;
}

export interface RunningServer {
  server: Bun.Server<undefined>;
  filePaths: string[];
  fileNames: string[];
  host: string;
  port: number;
  url: string;
}

interface BoardEntry {
  id: string;
  filePath: string;
  fileName: string;
}

export async function startKanbanServer(options: ServerOptions): Promise<RunningServer> {
  const filePaths = options.filePaths.map((p) => resolve(p));

  if (filePaths.length === 0) {
    throw new Error("At least one board file path is required");
  }

  for (const filePath of filePaths) {
    await ensureBoardFile(filePath, { defaultInstructions: options.defaultInstructions });
  }

  const boards: BoardEntry[] = filePaths.map((filePath, index) => ({
    id: "b" + index,
    filePath,
    fileName: basename(filePath)
  }));

  const boardsById = new Map(boards.map((b) => [b.id, b]));

  function resolveBoard(url: URL): BoardEntry {
    const id = url.searchParams.get("board");
    if (id && boardsById.has(id)) return boardsById.get(id)!;
    return boards[0]!;
  }

  const server = Bun.serve({
    hostname: options.host,
    port: options.port,
    async fetch(request) {
      const url = new URL(request.url);

      try {
        if (url.pathname === "/api/boards" && request.method === "GET") {
          return json({ boards: boards.map((b) => ({ id: b.id, fileName: b.fileName, filePath: b.filePath })) });
        }

        if (url.pathname === "/api/board" && request.method === "GET") {
          const entry = resolveBoard(url);
          const { board, version } = await readBoardWithVersion(entry.filePath);
          return json({ id: entry.id, board, fileName: entry.fileName, filePath: entry.filePath, version });
        }

        if (url.pathname === "/api/board/raw" && request.method === "GET") {
          const entry = resolveBoard(url);
          const content = await Bun.file(entry.filePath).text();
          return new Response(content, {
            headers: {
              "Cache-Control": "no-store",
              "Content-Type": "text/markdown; charset=utf-8"
            }
          });
        }

        if (url.pathname === "/api/board" && request.method === "PUT") {
          const entry = resolveBoard(url);
          const body = await request.json();
          const { board, version } = await writeBoardWithVersion(entry.filePath, body);
          return json({ id: entry.id, board, fileName: entry.fileName, filePath: entry.filePath, version });
        }

        if (url.pathname === "/healthz" && request.method === "GET") {
          const versions: Record<string, string> = {};
          for (const b of boards) versions[b.id] = await fileVersion(b.filePath);
          return json({ ok: true, versions });
        }

        if (request.method === "GET") {
          const summary: BoardSummary[] = boards.map((b) => ({ id: b.id, fileName: b.fileName, filePath: b.filePath }));
          const initial = boards[0]!;
          return html(
            renderAppShell({
              fileName: initial.fileName,
              filePath: initial.filePath,
              boards: summary,
              activeBoardId: initial.id
            })
          );
        }

        return json({ error: "Not found" }, 404);
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unexpected server error";
        return json({ error: message }, 500);
      }
    }
  });

  const displayHost = options.host === "0.0.0.0" ? "127.0.0.1" : options.host;

  return {
    server,
    filePaths,
    fileNames: boards.map((b) => b.fileName),
    host: options.host,
    port: server.port ?? options.port,
    url: `http://${displayHost}:${server.port}`
  };
}

export async function ensureBoardFile(
  filePath: string,
  options?: { defaultInstructions?: boolean }
): Promise<void> {
  const file = Bun.file(filePath);
  const exists = await file.exists();
  const seed = createDefaultBoard({
    instructions: options?.defaultInstructions === false ? false : undefined
  });

  if (!exists) {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, serializeBoard(seed), "utf8");
    return;
  }

  const content = await file.text();

  if (content.trim().length === 0) {
    await writeFile(filePath, serializeBoard(seed), "utf8");
  }
}

async function readBoardWithVersion(filePath: string): Promise<{ board: Board; version: string }> {
  const content = await Bun.file(filePath).text();
  return {
    board: parseMarkdown(content),
    version: await fileVersion(filePath)
  };
}

async function writeBoardWithVersion(filePath: string, input: unknown): Promise<{ board: Board; version: string }> {
  const board = normalizeBoard(input);
  await writeFile(filePath, serializeBoard(board), "utf8");
  return {
    board,
    version: await fileVersion(filePath)
  };
}

async function fileVersion(filePath: string): Promise<string> {
  const stats = await stat(filePath);
  return `${stats.mtimeMs}:${stats.size}`;
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "application/json; charset=utf-8"
    }
  });
}

function html(body: string): Response {
  return new Response(body, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8"
    }
  });
}
