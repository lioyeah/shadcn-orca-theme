# Task 5 — Journal Activity Heatmap Fixes

## Root Cause

1. **Empty heatmap grid**: `get-blocks` IPC returns `created`/`modified` as ISO strings or Unix timestamps (seconds/ms), not `Date` instances. `aggregateActivity()` called `localDateKey()` via `getFullYear()` on raw values, producing invalid date keys (`NaN-NaN-NaN`) so every bucket stayed at count 0.
2. **Truncated date range**: `.shadcn-journal-activity-range` used `white-space: nowrap` + `text-overflow: ellipsis`, clipping the full `YYYY-MM-DD – YYYY-MM-DD` string on typical panel widths.
3. **Tight layout**: Default gap (3px), padding (0.75rem), and month-to-grid spacing (0.25rem) were too compact.
4. **Footer chrome issues**: `border-block-start` on the heatmap and missing outline/box-shadow resets on the layout marker made the footer look like an active/focused panel shell; layout overrides were incomplete in `native-precedence.css`.

## Changes

- Added `normalizeActivityDate()` (Date / ISO string / Unix s|ms) and `activityDateKey()` guard in `fetchActivityBlocksByIds()` and `aggregateActivity()`.
- Removed range ellipsis; allow wrap on narrow widths with `overflow-wrap: anywhere` and `tabular-nums`.
- Increased outer padding, month gap, cell gap, min cell size, and legend spacing; still 53-week fluid grid.
- Heatmap is a borderless `var(--background)` middle layer; layout scoped to `.shadcn-journal-activity-layout` with `overflow: hidden` on host and `overflow-x: hidden` on editor.
- Updated design spec visual rules and CSS audit baseline.

## Test Results

| Command | Result |
|---------|--------|
| `npm run build` | PASS — tsc, vite, build:css |
| `npm run check` | PASS — build + stylelint + audit:css:compare |
| `npm run build:deploy` | PASS — deployed to `/home/ilio/Documents/orca/plugins/shadcn` |
| Dev fixture (`runDevFixture`) | PASS — same-day/cross-day counts, ISO string + Unix ms normalization, invalid date rejection |

## Manual Verification Still Needed

- [ ] Open Orca journal view and confirm heatmap cells show real activity levels (not all level-0).
- [ ] Confirm full date range visible at typical panel width (~800px+).
- [ ] Scroll journal body to bottom — last lines not hidden under heatmap.
- [ ] No focus/active border ring on layout host when editor is focused.
- [ ] Light/dark theme color levels look correct.
- [ ] Narrow panel (~400px) — no horizontal page scroll; range wraps if needed.
- [ ] Switch away from journal / plugin reload — heatmap unmounts cleanly.
