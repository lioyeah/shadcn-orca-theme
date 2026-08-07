# Task 5 — Journal activity heatmap fixed footer

## Automated checks

- `npm run build` — (see test summary below)
- `npm run check` — (see test summary below)
- `npm run build:deploy` — (see test summary below)

## Manual verification checklist (Orca UI — not verified by agent)

- [ ] Open a journal/date view in the main editor: exactly one heatmap is visible at the bottom of the **visible panel area** without scrolling to the end of the document.
- [ ] Scroll journal body content: the heatmap stays fixed at the panel bottom; the last lines of body text remain fully readable (not covered by the footer).
- [ ] Switch to an ordinary block view: the heatmap is removed.
- [ ] Split two journal panels: heatmap appears only on the **active** journal panel, not on the inactive side.
- [ ] Navigate journal dates: the 365-day range label does not change with the viewed date.
- [ ] Create and modify a block on the same local day: that day counts once in the grid.
- [ ] Toggle light/dark theme: level colors follow `--primary` without re-query flicker.
- [ ] Narrow the panel width: no horizontal scrollbar on the heatmap row.
- [ ] Rebuild journal DOM (e.g. switch away and back): no duplicate heatmap sections.
- [ ] Disable/reload the plugin: heatmap, `shadcn-journal-activity-layout` marker, and observers are cleaned up.

## Mount structure (expected)

```text
.orca-panel[data-panel-id="<active-journal-panel-id>"]
  .orca-hideable.shadcn-journal-activity-layout
    .orca-block-editor          ← scrollable body
    section.shadcn-journal-activity-heatmap   ← fixed footer sibling
```
