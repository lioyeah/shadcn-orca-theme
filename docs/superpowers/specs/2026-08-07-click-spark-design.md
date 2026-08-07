# Interactive Click Spark Design

## Goal

Add a brief, theme-aware click spark effect to interactive Orca controls without
interfering with editing, focus, layout, or native click behavior.

## Scope

The effect applies to all primary pointer clicks, including buttons, toolbar
actions, menus, menu items, tags, pills, selectors, tabs, options, switches,
links, and the editor canvas. Secondary clicks and non-primary pointer contacts
are ignored.

## Design

The plugin uses one delegated `pointerdown` listener on `document`. When the
one fixed, pointer-events-none particle node is created at the viewport click
coordinates. A single transparent, pointer-events-none Canvas draws eight
moving line segments for roughly 400ms, using the high-contrast `--primary`
theme token. The animation loop runs only while sparks are active, caps the
active particle count, and stops when the canvas is idle.

The module owns listener and overlay lifecycle and is initialized from the
plugin `load()` hook and cleaned up from `unload()`. It does not prevent default
behavior, stop propagation, add dependencies, or mutate the clicked control.

## Accessibility and Safety

The effect is skipped when `prefers-reduced-motion: reduce` matches, and CSS
also disables the animation as a fallback. Each particle is `aria-hidden` and
cannot receive pointer events, so it does not interfere with the underlying
click, writing, or drawing behavior.

## Validation

Run TypeScript build, CSS lint, CSS audit, and deployment. Manually verify
buttons, menu items, tags, selectors, tabs, and settings controls in both color
modes, plus reduced-motion and plugin unload/reload behavior.
