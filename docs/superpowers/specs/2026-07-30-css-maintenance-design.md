# CSS Maintenance and Debt Reduction Design

## Goal

Refactor the shadcn Orca theme source into focused CSS modules, remove
verified redundancy, and preserve the currently deployed visual and functional
behavior.

## Scope

This is a conservative maintenance refactor. It may split
`src/theme-css/_shared.css`, but it does not redesign the theme or change Orca
DOM contracts.

The following behavior must remain unchanged:

- shadcn neutral tokens and light/dark theme switching
- Orca block editor, query, tag-property, settings, popup, calendar, sidebar,
  command palette, search, AI chat, and preview styling
- existing dimensions, spacing, colors, borders, radii, shadows, hover states,
  selected states, and responsive behavior
- legacy compatibility aliases consumed by Orca
- the default flavor build and the repository's additional flavor files
- generated `public/shadcn.css` and `dist/shadcn.css`

## Architecture

The source will be organized into explicit layers:

```text
src/flavors/default.css
src/theme-css/shadcn-primitives.css
src/theme-css/base/
  reset.css
  typography.css
  surfaces.css
src/theme-css/components/
  buttons.css
  forms.css
  navigation.css
  overlays.css
  feedback.css
  editor.css
  query.css
  tag-properties.css
  ai-chat.css
  settings.css
  calendar.css
src/theme-css/overrides/
  native-precedence.css
  preview-contexts.css
```

The exact module count may be reduced when two sections have a stable shared
responsibility. The important boundary is that token definitions, generic
patterns, component mappings, and native-precedence patches are separated.

The build script will use an explicit ordered manifest:

```text
tokens
→ shadcn primitives
→ base modules
→ component modules
→ preview/context modules
→ native-precedence modules
```

The output remains one CSS file named `shadcn.css`; splitting is a source
organization change only.

## Cleanup Rules

Only evidence-based cleanup is allowed:

1. Merge repeated selectors when their declarations and context are equivalent.
2. Merge identical declaration blocks when doing so does not change cascade
   order.
3. Remove declarations completely overridden later only when the earlier
   declaration has no useful fallback role.
4. Remove obsolete Neubrutalism-only source rules that are not part of the
   shadcn build or runtime registration.
5. Preserve `!important`, high-specificity selectors, and compatibility aliases
   unless a before/after cascade check proves they are unnecessary.
6. Preserve reference documentation and flavor files.

The refactor must not delete a rule merely because it looks redundant. Rules
that exist to defeat Orca native CSS are treated as intentional until verified
otherwise.

## Verification

Before changing source organization, create a baseline containing:

- generated CSS hash
- selector inventory
- custom-property inventory
- rule count and file-size metrics
- successful TypeScript build and CSS lint output

After each refactor stage:

- rebuild the theme
- compare inventories against the baseline
- run `npm run build`
- run `npm run lint:css`
- run `npm run check`
- inspect generated CSS changes for unexpected selector or value changes

After the complete refactor, run `npm run build:deploy`. Any visual or
functional discrepancy takes precedence over further cleanup and requires
restoring the affected rule before proceeding.

## Delivery Stages

1. Add a repeatable CSS audit/baseline check without changing styling.
2. Move base and generic rules into focused modules while preserving order.
3. Move Orca component sections into focused modules.
4. Isolate preview and native-precedence patches.
5. Merge verified duplicates and remove only confirmed dead code.
6. Update build/documentation references, run all checks, and deploy.

Each stage should be independently buildable and reviewable. The work should
not be committed as one opaque rewrite.

## Non-Goals

- no visual redesign
- no Orca class renaming
- no removal of generated deployment artifacts
- no deletion of flavors without runtime/build evidence
- no broad removal of `!important`
- no unrelated TypeScript or plugin lifecycle refactor
