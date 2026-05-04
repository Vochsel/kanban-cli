#!/usr/bin/env bun
import { resolve } from "node:path";
import { parseArgs } from "node:util";
import { startKanbanServer, type RunningServer } from "./server";

const DEFAULT_HOST = "127.0.0.1";
const DEFAULT_PORT = 4177;
const FALLBACK_PORT_ATTEMPTS = 10;

interface CliOptions {
  filePaths: string[];
  host: string;
  port: number;
  open: boolean;
  strictPort: boolean;
  defaultInstructions: boolean;
}

async function main(args: string[] = Bun.argv.slice(2)): Promise<void> {
  const options = await parseCli(args);

  if (!options) {
    return;
  }

  const running = await startWithPortFallback(options);

  const fileLines = running.filePaths.map((p, i) => `  ${i === 0 ? "›" : " "} ${p}`).join("\n");
  console.log(`kanban-cli is running
${running.filePaths.length > 1 ? `Boards (${running.filePaths.length}):\n${fileLines}` : `File: ${running.filePaths[0]}`}
Board: ${running.url}
Press Ctrl-C to stop.`);

  if (options.open) {
    openBrowser(running.url).catch(() => {
      console.warn(`Could not open a browser automatically. Open ${running.url} instead.`);
    });
  }

  process.on("SIGINT", () => stop(running));
  process.on("SIGTERM", () => stop(running));

  await new Promise(() => undefined);
}

async function parseCli(args: string[]): Promise<CliOptions | undefined> {
  const parsed = parseArgs({
    args,
    allowPositionals: true,
    options: {
      help: { type: "boolean", short: "h" },
      host: { type: "string" },
      open: { type: "boolean" },
      port: { type: "string", short: "p" },
      version: { type: "boolean", short: "v" },
      "no-open": { type: "boolean" },
      "no-instructions": { type: "boolean" }
    }
  });

  if (parsed.values.version) {
    console.log(await packageVersion());
    return undefined;
  }

  if (parsed.values.help) {
    printHelp();
    return undefined;
  }

  const filePaths = parsed.positionals;

  if (filePaths.length === 0) {
    printHelp();
    process.exitCode = 1;
    return undefined;
  }

  const port = parsed.values.port ? Number(parsed.values.port) : DEFAULT_PORT;

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("--port must be an integer between 1 and 65535");
  }

  return {
    filePaths: filePaths.map((p) => resolve(p)),
    host: parsed.values.host ?? DEFAULT_HOST,
    port,
    open: parsed.values["no-open"] ? false : parsed.values.open ?? true,
    strictPort: Boolean(parsed.values.port),
    defaultInstructions: !parsed.values["no-instructions"]
  };
}

async function startWithPortFallback(options: CliOptions): Promise<RunningServer> {
  const attempts = options.strictPort ? 1 : FALLBACK_PORT_ATTEMPTS;
  let lastError: unknown;

  for (let index = 0; index < attempts; index += 1) {
    try {
      return await startKanbanServer({
        filePaths: options.filePaths,
        host: options.host,
        port: options.port + index,
        defaultInstructions: options.defaultInstructions
      });
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Could not start kanban-cli");
}

async function openBrowser(url: string): Promise<void> {
  const command =
    process.platform === "darwin"
      ? ["open", url]
      : process.platform === "win32"
        ? ["cmd", "/c", "start", "", url]
        : ["xdg-open", url];

  const child = Bun.spawn(command, {
    stdout: "ignore",
    stderr: "ignore"
  });

  await child.exited;
}

function stop(running: RunningServer): never {
  running.server.stop(true);
  process.exit(0);
}

async function packageVersion(): Promise<string> {
  try {
    const packageJson = await Bun.file(new URL("../package.json", import.meta.url)).json();
    return typeof packageJson.version === "string" ? packageJson.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function printHelp(): void {
  console.log(`kanban-cli

Usage:
  kb <board.md> [more.md ...] [options]

Options:
  -p, --port <port>     Port to bind. Defaults to ${DEFAULT_PORT}.
      --host <host>     Host to bind. Defaults to ${DEFAULT_HOST}.
      --no-open         Do not open a browser after starting.
      --open            Open a browser after starting. This is the default.
      --no-instructions Do not seed new boards with the default instructions block.
  -v, --version         Print the package version.
  -h, --help            Show this help.

Markdown:
  # Todo
  - [ ] Card title: optional description
  - [x] Completed card
`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
