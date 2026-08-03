# shadcn/ui Neutral — Orca Note Theme

A community theme for [Orca Notes](https://orca-notes.app) inspired by the neutral palette and component patterns of [shadcn/ui](https://ui.shadcn.com/).

**Disclaimer:** This is an unofficial third-party theme. It is not the official shadcn/ui theme, not affiliated with shadcn, and not affiliated with Orca Notes.

## Features

- Semantic OKLCH tokens (`background`, `foreground`, `primary`, `accent`, `popover`, `sidebar-*`, …)
- 1px borders, soft shadows on popovers/dialogs, `0.625rem` radius
- Orca controls mapped to shadcn/ui component patterns (New York style)
- Light/dark via Orca theme toggle (`html.t-light`)

## Project layout

```
src/
  main.ts                 # registers theme "shadcn/ui Neutral" → shadcn.css
  flavors/default.css     # neutral tokens
  theme-css/
    shadcn-primitives.css   # translated shadcn patterns
    manifest.cjs             # ordered CSS source groups
    base/                    # resets, surfaces, and layout
    components/              # focused Orca component mappings
    context-overrides.css    # preview/context-specific rules
    native-precedence.css    # late-loading Orca precedence patches
    reference/              # Orca native CSS docs + 15-shadcn-mapping.md
scripts/
  build-theme-css.cjs     # manifest → public/shadcn.css
  audit-theme-css.cjs     # CSS inventory baseline/comparison
  deploy.cjs              # → ~/Documents/orca/plugins/shadcn
DESIGN_SPEC.md            # design & architecture (中文)
```

## Development

```bash
npm install
npm run build:css       # CSS only
npm run build           # CSS + TypeScript
npm run deploy          # build + copy to Orca plugins dir
npm run build:deploy    # alias for deploy
npm run lint:css        # stylelint on src/**/*.css
```

Generated file: `public/shadcn.css` — edit sources, not the build output.

Default deploy path: `/home/ilio/Documents/orca/plugins/shadcn`. Override with `ORCA_PLUGINS_DIR`.

## Using in Orca

1. Install or symlink this plugin into your Orca plugins directory.
2. Enable the plugin in Orca settings.
3. Select appearance theme **shadcn/ui Neutral**.
4. Reload the plugin or toggle theme if CSS looks cached.

If you previously used the theme named **shadcn**, re-select **shadcn/ui Neutral** after updating.

## Docs

- [DESIGN_SPEC.md](./DESIGN_SPEC.md) — tokens, build pipeline, principles
- [src/theme-css/reference/15-shadcn-mapping.md](./src/theme-css/reference/15-shadcn-mapping.md) — Orca ↔ shadcn mapping

## License

MIT — see [LICENSE](./LICENSE) (Copyright (c) 2025 Lioyeah).

Third-party attributions (shadcn/ui, Lucide Icons) are in [NOTICE](./NOTICE).
