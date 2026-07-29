## Learned User Preferences

- After theme CSS or related plugin changes, automatically run `npm run build:deploy` so the theme is deployed without asking the user to do it manually.
- Search icons on dark inputs (sidebar, search panel, command palette, settings, plugin market, dropdowns, etc.) should use light/foreground color, not black.
- When an outer container already frames a text field with a thick border, do not add a thick border or focus glow on the inner input.
- Component look should follow neobrutalism.dev (ekmas) references when styling Orca controls such as switches.

## Learned Workspace Facts

- This repo is an Orca Note theme plugin (`neubrutalism-orca-theme`) with structure in `src/theme-css/_shared.css` and color flavors in `src/flavors/*.css`.
- Unpacked native Orca styles for reference live under `src/theme-css/reference/` (including docs and core CSS).
- Theme CSS is built from `_shared` + `default` flavor into `public/neubrutalism.css` via `scripts/build-theme-css.cjs`.
- `npm run build:deploy` rebuilds CSS and deploys to `/home/ilio/Documents/orca/plugins/Neubrutalism`; `npm run deploy` does a full build then deploy.
