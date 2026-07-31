# Usage Panel Chart and Progress Design

## Goal

Align the usage panel's two data presentations with their shadcn/ui
counterparts without changing Orca's data, DOM classes, or interaction model.

## Design

### Creative hours

Keep the existing SVG and `.orca-stats-chart-bar` elements, but style them as a
shadcn chart bar series:

- rectangular primary/chart-colored bars
- consistent bar width and spacing
- subtle chart grid/axis treatment
- opacity-only hover feedback
- existing labels, tooltip behavior, and data remain unchanged

### Journal records

Keep the existing journal row and track/fill classes, but style them as
shadcn Progress:

- muted track with a quiet border
- primary indicator
- year on the left and count on the right
- width normalized against the maximum record count
- no additional shadow or heavy chrome

## Constraints

- Modify only presentation CSS.
- Do not change JavaScript, data calculation, or DOM class names.
- Preserve light/dark token behavior.
- Preserve existing card layout, scroll behavior, and interactions.

## Verification

Run `npm run check` and `npm run build:deploy`. Inspect both chart sections in
light and dark modes, including hover state and the row with the maximum journal
count.
