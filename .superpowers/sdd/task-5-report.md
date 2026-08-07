# Task 5 Report — Heatmap Date Normalization Boundary Fix

## STATUS

**DONE** — commit `cd7c96df42f52a30caf9b7ab40a3b030f3cf427f`

## Changes

- `normalizeActivityDate()` now accepts only explicit shapes:
  - `Date` instances (reject `Invalid Date`)
  - finite `number` (Unix seconds when `|value| < 1e12`, else milliseconds)
  - `YYYY-MM-DD` date-only strings parsed as **local calendar** dates
  - ISO datetime strings matching `YYYY-MM-DDTHH:mm:ss[.sss][Z|±HH:MM]` — **timezone required** (`Z` or `±HH:MM`; rejects `2020-06-15T12:00:00`)
- Rejects ambiguous strings (`2020/06/15`, `2020-06-15 12:00:00`, etc.) and rollover dates (`2020-02-30`, `2020-02-30T00:00:00Z`).
- `toActivityBlock()` requires **both** `created` and `modified` present and valid — no silent fallback from one field to the other; throws cause collector `load()` to fall back to `lastSuccessfulSnapshot` (or empty grid on first load).
- DEV fixture extended for timezone-less ISO rejection, missing-created/missing-modified throw paths, plus prior Unix seconds, date-only local parsing, rollover rejection, and failure-fallback semantics.

## Build / Check / Deploy

### `npm run build`

```
✓ tsc
✓ vite build — dist/index.js 31.34 kB │ gzip: 7.49 kB
✓ build:css — public/shadcn.css + dist/shadcn.css
Exit code: 0
```

### `npm run check`

```
✓ npm run build
✓ npm run lint:css — no issues
✓ npm run audit:css:compare — CSS selector and custom-property inventories match baseline
Exit code: 0
```

### `npm run build:deploy`

```
✓ full build
✓ deployed to /home/ilio/Documents/orca/plugins/shadcn
  - dist/index.js
  - dist/shadcn.css
  - package.json, icon.png, LICENSE, NOTICE, README.md
Exit code: 0
```

## Test Summary

| Area | Result |
|------|--------|
| TypeScript compile (`tsc`) | PASS |
| Vite production bundle | PASS |
| CSS lint + audit baseline | PASS |
| DEV fixture — ISO datetime / Unix ms | PASS (unchanged) |
| DEV fixture — Unix seconds | PASS |
| DEV fixture — `YYYY-MM-DD` local calendar | PASS |
| DEV fixture — timezone-less ISO rejection | PASS |
| DEV fixture — ambiguous / rollover rejection | PASS |
| DEV fixture — `toActivityBlock` throw on invalid date | PASS |
| DEV fixture — missing created/modified no fallback | PASS |
| DEV fixture — refresh failure preserves snapshot | PASS |
| DEV fixture — first-load failure empty grid | PASS |
| Layout / interaction | unchanged |
