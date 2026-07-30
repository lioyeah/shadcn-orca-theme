## Learned User Preferences

- After theme CSS or related plugin changes, automatically run `npm run build:deploy` so the theme is deployed without asking the user to do it manually.
- Search icons on dark inputs (sidebar, search panel, command palette, settings, plugin market, dropdowns, etc.) should use light/foreground color, not black.
- Avoid double borders: when an outer shell already has a thick border, do not add another border or focus glow on the inner element (inputs, tooltips, find/replace, popups).
- Component look should follow neobrutalism.dev (ekmas) references when styling Orca controls such as switches and charts.
- On `--main`/blue surfaces, primary text and icons use `--main-foreground` (black); gray text fails there—muted hints should stay distinct from white without using unreadable gray (e.g. opacity/`color-mix` of black, or a main-surface muted token).
- Blue hover/selected rows should force black text and icons, including overriding user-custom tag icon colors on hover.
- Dark panel footers (command palette, block search) should be full-bleed dark fill with white icons; do not whiten label text when only icons need to be light.
- Panes that preview block/editor content (e.g. block search right pane, AI chat messages) should reuse the main editor background, grid, and icon/text colors rather than a separate skin.
- Settings switches should not use hard shadow; inline/body switches should be smaller than settings switches and vertically centered with the text line.
- Stats/usage UI should follow neobrutalism.dev/charts as multiple cards (not one mega-card), with chart types matching the examples.

## Learned Workspace Facts

- This repo is an Orca Note theme plugin (`neubrutalism-orca-theme`) with structure in `src/theme-css/_shared.css` and color flavors in `src/flavors/*.css`.
- Unpacked native Orca styles for reference live under `src/theme-css/reference/` (including docs and core CSS).
- Theme CSS is built from `_shared` + `default` flavor into `public/neubrutalism.css` via `scripts/build-theme-css.cjs`.
- `npm run build:deploy` rebuilds CSS and deploys to `/home/ilio/Documents/orca/plugins/Neubrutalism`; `npm run deploy` does a full build then deploy.
- Default flavor uses dual muted text tokens so neutral surfaces and `--main` blue surfaces can keep distinct secondary/hint contrast.
- Orca may cache theme CSS via a `?_t=` query; after deploy, toggling the theme or reloading the plugin is sometimes needed to see updates.
