# shadcn — Orca Note Theme

[shadcn/ui](https://ui.shadcn.com/) neutral theme for [Orca Notes](https://orca-notes.app).

## Features

- Semantic OKLCH tokens (`background`, `foreground`, `primary`, `accent`, `popover`, `sidebar-*`, …)
- 1px borders, soft shadows on popovers/dialogs, `0.625rem` radius
- Orca controls mapped to official shadcn component patterns
- Light/dark via Orca theme toggle (`html.t-light`)

## Project layout

```
src/
  main.ts                 # registers theme "shadcn" → shadcn.css
  flavors/default.css     # shadcn neutral tokens
  theme-css/
    shadcn-primitives.css   # translated shadcn patterns
    _shared.css             # Orca selector overrides
    reference/              # Orca native CSS docs + 15-shadcn-mapping.md
scripts/
  build-theme-css.cjs     # → public/shadcn.css
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

1. Enable the **shadcn** plugin from the plugins directory above.
2. Select theme **shadcn** in appearance settings.
3. Reload the plugin or toggle theme if CSS looks cached.

## Docs

- [DESIGN_SPEC.md](./DESIGN_SPEC.md) — tokens, build pipeline, principles
- [src/theme-css/reference/15-shadcn-mapping.md](./src/theme-css/reference/15-shadcn-mapping.md) — Orca ↔ shadcn mapping

## License

MIT
