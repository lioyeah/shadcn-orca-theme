# Neubrutalism — Orca Note Theme

A Neubrutalism-style theme for [Orca Notes](https://orca-notes.app). Bold borders, hard offset shadows, zero frills.

## Design

- **2px solid black borders** — structural, unapologetic
- **Hard offset shadows** — `4px 4px 0px 0px`, no blur
- **`border-radius: 5px`** — matching ekmas/neobrutalism-components
- **6-color Brutal palette** — Orange (default), Pink, Cyan, Lime, Violet, Red
- **CSS variables** following ekmas naming: `--main`, `--background`, `--border`, `--ring`
- **shadcn/ui component discipline** — every Orca element annotated with its shadcn equivalent

## Flavors

| Flavor | Main Color | CSS File |
|--------|-----------|----------|
| **Orange (default)** | `oklch(69.73% 0.1635 43.11)` | `flavors/default.css` |
| Pink | `oklch(74.9% 0.162 0.71)` | `flavors/pink.css` |
| Cyan | `oklch(78.3% 0.135 219.2)` | `flavors/cyan.css` |
| Lime | `oklch(82.7% 0.135 130.07)` | `flavors/green.css` |
| Violet | `oklch(73.2% 0.126 297.4)` | `flavors/violet.css` |
| Red | `oklch(71.1% 0.168 28.04)` | `flavors/red.css` |

## Icons

Includes 136 neubrutalism-style SVG icons (68 colored + 68 B&W) in `public/icons/`, sourced from [neicon](https://github.com/siddsarkar/neicon) (MIT).

## Development

```bash
npm install
npm run build:css     # build theme CSS
npm run build:plugin-css  # build plugin CSS
npm run build         # full build (CSS + TypeScript)
```

## License

MIT
