# kanban-cli

[![npm version](https://img.shields.io/npm/v/kanban-cli.svg)](https://www.npmjs.com/package/kanban-cli)

`kanban-cli` is a tiny Bun-powered CLI that turns a markdown file into a local Trello-style kanban board.

```sh
npx kanban-cli@latest board.md
```

The browser UI runs on localhost, supports drag and drop across columns, writes every edit back to the markdown file, and reloads when the file changes on disk. If the markdown file does not exist, kanban-cli creates a starter board and opens it.

## Run it

The fastest path is no install at all:

```sh
npx kanban-cli@latest board.md
```

If you use Bun:

```sh
bunx kanban-cli@latest board.md
```

If you'd rather have it on your PATH as `kb`, install globally:

```sh
npm install -g kanban-cli
kb board.md
```

Or run straight from a checkout (handy for hacking on the CLI itself):

```sh
bun install
bun run dev          # uses ./examples/basic.md
bun run dev path.md  # or pass any markdown file
```

Requires Bun 1.3 or newer at runtime (the published binary is built with Bun and `npx`/`bunx` will fetch it on demand).

## Markdown format

Headings become columns. Checkbox list items become cards. The first colon separates the title from the description.

```md
# Todo
- [ ] Add CLI: serve a local board
- [ ] Polish UI: make the board feel good

# Doing
- [ ] Wire npm publish: add NPM_TOKEN in GitHub

# Done
- [x] Create markdown board: headings become columns
```

`kanban-cli` writes a canonical markdown format so changes are easy to review in git.

## CLI

```sh
kb <board.md> [options]
```

Options:

- `-p, --port <port>`: port to bind, default `4177`.
- `--host <host>`: host to bind, default `127.0.0.1`.
- `--no-open`: start the server without opening a browser.
- `--open`: open a browser after starting, enabled by default.
- `-v, --version`: print the package version.
- `-h, --help`: show help.

If the markdown file does not exist, `kanban-cli` creates a starter board.

## Development

```sh
bun install
bun run typecheck
bun test
bun run build
bun run dev
```

The published CLI is bundled into `dist/cli.js`. Bun serves the local API and browser app from the CLI process.

## Publishing

The repository includes GitHub Actions for CI and npm publishing:

- `.github/workflows/ci.yml` runs typecheck, tests, and the CLI build on pushes and pull requests.
- `.github/workflows/publish.yml` publishes to npm when a GitHub release is published or the workflow is run manually.

To publish:

1. Add an npm automation token as the `NPM_TOKEN` repository secret.
2. Update the version in `package.json`.
3. Create and publish a GitHub release.

## License

Apache-2.0
