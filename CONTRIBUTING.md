# Contributing

Thanks for improving `kanban-cli`.

## Development

Install dependencies with Bun:

```sh
bun install
```

Run the checks:

```sh
bun run typecheck
bun test
bun run build
```

Run the local CLI against the example board:

```sh
bun run dev
```

## Pull requests

- Keep markdown parsing and writing predictable.
- Add focused tests for parser or writer changes.
- Avoid browser dependencies unless they make the CLI meaningfully better.
- Keep the UI usable with local files and no network access.
