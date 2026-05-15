# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start                    # Run the CLI (uses tsx, no build required)
npm run build                # Compile TypeScript to dist/
npm test                     # Run Jest tests
npm run test:watch           # Run Jest in watch mode
npx jest src/utilities/formatPercentage.test.ts  # Run a single test file
```

## Environment Variables

Copy `.env.mac` or `.env.win` and adjust as needed. Required vars:

- `DIRECTORY_PATH` — root directory where scraped JSON results are written (e.g. `/Users/wanlok/Files/Projects/responses`)
- `LIMIT` — optional integer; caps how many paginated pages are fetched per URL

## CLI Usage

```bash
npx tsx src/index.ts <url>                          # Fetch and print web page content
npx tsx src/index.ts <product> <company> <name>     # Scrape and cache results to DIRECTORY_PATH
npx tsx src/index.ts list <path> [...]              # List macOS metadata (._) files
npx tsx src/index.ts delete <path> [...]            # Delete macOS metadata files
npx tsx src/index.ts fx <from> <to>                 # Get exchange rate (e.g. fx usd aud)
```

## Architecture

The project is a CLI scraping/utility tool. The main entry point is `src/index.ts`, which dispatches to one of several subsystems.

### Web scraping pipeline

`getWebPageContent` → `WebPageTask` → `getPuppeteerResult`

1. `getWebPageContent` receives a URL and optional cache coordinates (`product`, `company`, `name`, page index).
2. It iterates `webPageTasks` (one per retailer) to find a matching task via `isResponsibleFor(url)`.
3. The matching task's `getPaginationUrlStrings` resolves all paginated URLs, then `getContent` scrapes each page using Puppeteer.
4. Results are cached as JSON files under `DIRECTORY_PATH/<product>/<company>/<name>/YYYY-MM-DD_<i>_<j>.json`.

`readJsonAndGetWebPageContent` wraps this for the multi-argument CLI path, loading URLs from `src/data/<product>/<company>.json` (keyed by item `name`).

### WebPageTask interface (`src/types.ts`)

Each retailer implements:
- `isResponsibleFor(url)` — URL prefix match
- `getPaginationUrlStrings(url)` — returns all page URLs (may use Puppeteer)
- `getContent(url)` — scrapes and returns `Record<string, unknown>[]`

Current implementations: `capitalWebPageTask`, `centralfieldWebPageTask`, `jumboWebPageTask`, `scorptecWebPageTask` (all under `src/task/computer/`).

## Code Style

Prettier is configured (`.prettierrc`): 2-space indent, no trailing commas, 120-char line width.
