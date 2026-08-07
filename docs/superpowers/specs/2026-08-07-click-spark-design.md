# Interactive Click Spark Design

## Goal

Add a brief, theme-aware click spark effect to interactive Orca controls without
interfering with editing, focus, layout, or native click behavior.

## Scope

The effect applies to interactive controls including buttons, toolbar actions,
menus, menu items, tags, pills, selectors, tabs, options, switches, and links.
It excludes editable content, text inputs, selects, whiteboards, drag surfaces,
and elements marked with `data-no-click-spark`.

## Design

The plugin uses one delegated `pointerdown` listener on `document`. When the
event target resolves to an eligible control, a fixed, pointer-events-none
overlay is created at the viewport click coordinates. Eight short CSS rays
expand and fade for roughly 350ms, using `--primary` and `--accent` theme
tokens. The effect is removed after its animation completes.

The module owns listener and overlay lifecycle and is initialized from the
plugin `load()` hook and cleaned up from `unload()`. It does not prevent default
behavior, stop propagation, add dependencies, or mutate the clicked control.

## Accessibility and Safety

The effect is skipped when `prefers-reduced-motion: reduce` matches, and CSS
also disables the animation as a fallback. The overlay is `aria-hidden` and
cannot receive pointer events. Editable and whiteboard regions are excluded to
keep writing and drawing uninterrupted.

## Validation

Run TypeScript build, CSS lint, CSS audit, and deployment. Manually verify
buttons, menu items, tags, selectors, tabs, and settings controls in both color
modes, plus reduced-motion and plugin unload/reload behavior.
