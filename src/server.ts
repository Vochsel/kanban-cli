import { basename, dirname, resolve } from "node:path";
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createDefaultBoard, normalizeBoard, parseMarkdown, serializeBoard, type Board } from "./markdown";
import { renderAppShell } from "./ui";

export interface ServerOptions {
  filePath: string;
  host: string;
  port: number;
}

export interface RunningServer {
  server: Bun.Server<undefined>;
  filePath: string;
  fileName: string;
  host: string;
  port: number;
  url: string;
}

export async function startKanbanServer(options: ServerOptions): Promise<RunningServer> {
  const filePath = resolve(options.filePath);
  await ensureBoardFile(filePath);

  const fileName = basename(filePath);
  const server = Bun.serve({
    hostname: options.host,
    port: options.port,
    async fetch(request) {
      const url = new URL(request.url);

      try {
        if (url.pathname === "/api/board" && request.method === "GET") {
          const { board, version } = await readBoardWithVersion(filePath);
          return json({ board, fileName, version });
        }

        if (url.pathname === "/api/board" && request.method === "PUT") {
          const body = await request.json();
          const { board, version } = await writeBoardWithVersion(filePath, body);
          return json({ board, fileName, version });
        }

        if (url.pathname === "/healthz" && request.method === "GET") {
          return json({ ok: true, version: await fileVersion(filePath) });
        }

        if (request.method === "GET") {
          return html(renderAppShell({ fileName }));
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
    filePath,
    fileName,
    host: options.host,
    port: server.port ?? options.port,
    url: `http://${displayHost}:${server.port}`
  };
}

export async function ensureBoardFile(filePath: string): Promise<void> {
  const file = Bun.file(filePath);
  const exists = await file.exists();

  if (!exists) {
    await mkdir(dirname(filePath), { recursive: true });
    await writeFile(filePath, serializeBoard(createDefaultBoard()), "utf8");
    return;
  }

  const content = await file.text();

  if (content.trim().length === 0) {
    await writeFile(filePath, serializeBoard(createDefaultBoard()), "utf8");
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
