## Learned User Preferences

- After theme CSS or related plugin changes, automatically run `npm run build:deploy` so the theme is deployed without asking the user to do it manually.
- Search icons on dark inputs (sidebar, search panel, command palette, settings, plugin market, dropdowns, etc.) should use light/foreground color, not black.
- Avoid double borders: when an outer shell already has a border, do not add another border or focus glow on the inner element (inputs, tooltips, find/replace, popups, dropdown menus). For Orca popups, `.orca-popup` is the positioning shell (transparent, no border); the visible panel (`.orca-menu`, `.orca-select-menu`, etc.) carries the single border/shadow. Input/input-group focus: keep resting border color (`--input` / `--border`) — no brighten, no extra ring shadow.
- Component look should follow [shadcn/ui](https://ui.shadcn.com/) docs and GitHub `apps/v4/registry/new-york-v4/ui/*.tsx` — do not guess class patterns. Shortcut hints use shadcn `kbd`; settings non-filter dropdowns = `select`, filter dropdowns = `combobox`; query conditions and tag-property fold sections use `Accordion`/`Card` patterns; scope select-menu styling to settings/forms — must not hit tag props, query cascade menus, etc.
- Hover/selected rows use `--accent` / `--accent-foreground`; sidebar items use `--sidebar-accent`. Primary actions use `--primary`. Do not force hover icon/text invert (Neubrutalism legacy); icons inherit `currentColor`.
- Dark panel footers (command palette, block search) should be full-bleed muted/card fill; icons use `--foreground`, label text stays `--muted-foreground`.
- Block search right pane and AI chat message areas should reuse the main editor background and icon/text colors; block search left list uses sidebar styling. When the host DOM supports it, AI chat follows shadcn `Message`/`MessageScroller` patterns.
- Settings switches follow shadcn `switch.tsx` (primary when on); inline/body switches are smaller and vertically centered with the text line.
- Settings shortcuts page: column header row (`.orca-table-header-cell`) stays transparent; category section rows (`.orca-settings-shortcuts-header`) use `--muted` bar.
- Stats/usage UI uses multiple shadcn-style cards (`--card`, `shadow-sm`), not one mega-card.
- Editor body/content typography follows a dual-color scheme (black/white/gray only): hierarchy via font weight/size, not semantic/accent colors in prose. Typeset CSS variables apply to editor prose only, not hardcoded colors. Respect host-selected UI, body, and code fonts rather than overriding them. Blockquote-link icons use the shadcn palette instead of the host accent color. Block handle/fold-dot position and color are Orca host-owned — do not theme-override; collapsed fold dots may only get a cosmetic thin ring (transparent outer disc).
- Popup/context menu leading icons (`.orca-menu-text-icon`, `.orca-menu-text-pre`, etc.) vertically center with label text (shadcn dropdown `items-center`, 1rem icon box). Settings left nav icons (`.orca-settings > .sections .item > i`) need separate rules from `.orca-menu-*`. Settings plugin list icons (`.plugin-item .orca-image`) are host-controlled. Settings shell: one outer rounded rect (`.orca-settings` + `overflow: hidden`); column panes square at inner seam.

## Learned Workspace Facts

- This repo is an Orca Note theme plugin (`shadcn-orca-theme`); theme CSS sources are organized by base and component under `src/theme-css/`, ordered by `src/theme-css/manifest.cjs`, with color flavors in `src/flavors/*.css`.
- Unpacked native Orca styles for reference live under `src/theme-css/reference/` (including docs and core CSS).
- Theme CSS is built from `default.css` + `shadcn-primitives.css` + the ordered modules in `src/theme-css/manifest.cjs` into `public/shadcn.css` and `dist/shadcn.css` via `scripts/build-theme-css.cjs`.
- Vite uses `publicDir: false`; production `build` runs `tsc → vite build → build:css` so stale `public/shadcn.css` is never copied over fresh `dist/shadcn.css`.
- `npm run build:deploy` and `npm run deploy` both run full TS/CSS build then deploy to `/home/ilio/Documents/orca/plugins/shadcn` (override base path with `ORCA_PLUGINS_DIR`); `npm run build:css` rebuilds theme CSS only.
- Plugin unregisters legacy Neubrutalism theme on load; deploy removes stale `dist/neubrutalism.css`.
- Plugin registers theme name **shadcn/ui Neutral** (`t-shadcn` class, `shadcn.css` file) in `src/main.ts`.
- Orca may cache theme CSS via a `?_t=` query; after deploy, toggling the theme or reloading the plugin is sometimes needed to see updates.
- Global `.orca-menu` rules must exclude modals/special shells (`.orca-search-modal`, `.orca-block-popup`, `.orca-inline-reference-with-preview`, `.orca-command-modal`) or preview panes inherit popover chrome incorrectly.
- Settings shortcuts table uses Orca `Table`: column labels = `.orca-table-header-cell`, category rows = `.orca-settings-shortcuts-header`.
- Orca-to-shadcn class mapping reference: `src/theme-css/reference/15-shadcn-mapping.md`.
