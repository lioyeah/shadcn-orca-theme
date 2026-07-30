## Learned User Preferences

- After theme CSS or related plugin changes, automatically run `npm run build:deploy` so the theme is deployed without asking the user to do it manually.
- Search icons on dark inputs (sidebar, search panel, command palette, settings, plugin market, dropdowns, etc.) should use light/foreground color, not black.
- Avoid double borders: when an outer shell already has a thick border, do not add another border or focus glow on the inner element (inputs, tooltips, find/replace, popups, dropdown menus). For Orca popups, `.orca-popup` is the positioning shell (transparent, no border); the visible panel (`.orca-menu`, `.orca-select-menu`, etc.) carries the single neo border.
- Component look should follow neobrutalism.dev (ekmas) references when styling Orca controls such as switches, charts, and calendars (no box shadow on date pickers).
- On `--main`/blue surfaces, primary text and icons use `--main-foreground` (black); gray text fails there—muted hints should stay distinct from white without using unreadable gray (e.g. opacity/`color-mix` of black, or a main-surface muted token).
- Blue hover/selected rows should force black text and icons, including overriding user-custom tag icon colors on hover.
- Dark panel footers (command palette, block search) should be full-bleed dark fill with white icons; do not whiten label text when only icons need to be light.
- Panes that preview block/editor content (block search right pane, block-ref popups, AI chat messages) should reuse the main editor background, grid, and icon/text colors rather than a separate skin; block search left list uses sidebar styling.
- Find/replace panel uses `--main` blue background; prev/next buttons are white by default and on hover get blue background, black border, and inverted black icons.
- Settings switches should not use hard shadow; inline/body switches should be smaller than settings switches and vertically centered with the text line.
- Settings shortcuts page: column header row (`.orca-table-header-cell`) stays transparent; category section rows (`.orca-settings-shortcuts-header`) use dark bar with white text.
- Stats/usage UI should follow neobrutalism.dev/charts as multiple cards (not one mega-card), with chart types matching the examples.

## Learned Workspace Facts

- This repo is an Orca Note theme plugin (`neubrutalism-orca-theme`) with structure in `src/theme-css/_shared.css` and color flavors in `src/flavors/*.css`.
- Unpacked native Orca styles for reference live under `src/theme-css/reference/` (including docs and core CSS).
- Theme CSS is built from `_shared` + `default` flavor into `public/neubrutalism.css` via `scripts/build-theme-css.cjs`.
- `npm run build:deploy` rebuilds CSS and deploys to `/home/ilio/Documents/orca/plugins/Neubrutalism`; `npm run deploy` does a full build then deploy.
- Default flavor uses dual muted text tokens so neutral surfaces and `--main` blue surfaces can keep distinct secondary/hint contrast.
- Orca may cache theme CSS via a `?_t=` query; after deploy, toggling the theme or reloading the plugin is sometimes needed to see updates.
- Global `.orca-menu` rules must exclude modals/special shells (`.orca-search-modal`, `.orca-block-popup`, `.orca-inline-reference-with-preview`, `.orca-command-modal`) or preview panes inherit blue menu chrome incorrectly.
- Settings shortcuts table uses Orca `Table`: column labels = `.orca-table-header-cell`, category rows = `.orca-settings-shortcuts-header`.
