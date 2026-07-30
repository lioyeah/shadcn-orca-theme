# Neubrutalism — Orca Note Theme

A Neubrutalism-style theme for [Orca Notes](https://orca-notes.app). Bold borders, hard offset shadows, and compact rectangular controls.

## Design

- **2px solid black borders** — structural, unapologetic
- **Hard offset shadows** — `4px 4px 0px 0px`, no blur
- **`border-radius: 5px`** — matching ekmas/neobrutalism-components
- **6-color palette sources** — Blue (current default), Pink, Cyan, Lime, Violet, Red
- **CSS variables** following ekmas naming: `--main`, `--background`, `--border`, `--ring`
- **shadcn/ui component discipline** — every Orca element annotated with its shadcn equivalent

## Flavors

| Flavor | Main Color | CSS File |
|--------|-----------|----------|
| **Blue (current default)** | `oklch(67.47% 0.1726 259.49)` | `flavors/default.css` |
| Pink | `oklch(74.9% 0.162 0.71)` | `flavors/pink.css` |
| Cyan | `oklch(78.3% 0.135 219.2)` | `flavors/cyan.css` |
| Lime | `oklch(82.7% 0.135 130.07)` | `flavors/green.css` |
| Violet | `oklch(73.2% 0.126 297.4)` | `flavors/violet.css` |
| Red | `oklch(71.1% 0.168 28.04)` | `flavors/red.css` |

## Icons

Includes 136 neubrutalism-style SVG icons (68 colored + 68 B&W) in `public/icons/`, sourced from [neicon](https://github.com/siddsarkar/neicon) (MIT).

The additional flavor files are maintained as palette sources. The current plugin registers the generated default theme only; runtime flavor switching is not implemented.

## Development

```bash
npm install
npm run build:css     # build theme CSS
npm run build         # full build (CSS + TypeScript)
npm run deploy        # full build and deploy to Orca
```

`public/neubrutalism.css` is generated from `src/theme-css/_shared.css` and
`src/flavors/default.css`; edit the source files rather than the generated file.
The default deployment directory is
`/home/ilio/Documents/orca/plugins/Neubrutalism`. Set
`ORCA_PLUGINS_DIR` to an Orca plugins root to override it.

## License

MIT
