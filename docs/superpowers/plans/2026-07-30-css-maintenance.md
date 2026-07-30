# CSS Maintenance and Debt Reduction Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the monolithic Orca theme stylesheet into ordered modules and remove only verified redundancy while preserving the current generated CSS behavior.

**Architecture:** Keep `default.css` as the token source and `shadcn-primitives.css` as the generic shadcn layer. Replace `_shared.css` with focused files loaded through an explicit manifest, using separate component and native-precedence layers. Generate the same `public/shadcn.css` and `dist/shadcn.css` artifacts.

**Tech Stack:** Node.js CommonJS build scripts, TypeScript/Vite plugin build, CSS nesting, Stylelint 16, shell-based verification.

## Global Constraints

- Preserve the deployed theme’s visual and functional behavior.
- Do not rename Orca classes or change DOM assumptions.
- Preserve generated `public/shadcn.css` and `dist/shadcn.css`.
- Preserve reference documentation and all flavor files.
- Keep `!important` and high-specificity rules unless a cascade check proves them unnecessary.
- Run `npm run build:deploy` after theme CSS changes.
- Do not commit `.cursor/` local state.

---

### Task 1: Establish CSS audit baseline

**Files:**
- Create: `scripts/audit-theme-css.cjs`
- Modify: `package.json`
- Create: `docs/superpowers/baselines/2026-07-30-css-baseline.json`

**Interfaces:**
- `node scripts/audit-theme-css.cjs --write <path>` writes a JSON baseline.
- `node scripts/audit-theme-css.cjs --compare <path>` exits non-zero when selector or custom-property inventories differ.

- [ ] **Step 1: Add an audit script that normalizes CSS inventories**

The script must read `src/flavors/default.css`, `src/theme-css/shadcn-primitives.css`, and the current generated `public/shadcn.css`; record SHA-256, byte count, line count, selector set, custom-property set, and declaration block count. Ignore comments and generated-header lines when extracting selectors. Sort all inventory arrays before serializing.

- [ ] **Step 2: Add npm commands**

Add:

```json
"audit:css": "node scripts/audit-theme-css.cjs",
"audit:css:write": "node scripts/audit-theme-css.cjs --write docs/superpowers/baselines/2026-07-30-css-baseline.json"
```

- [ ] **Step 3: Generate and inspect the baseline**

Run:

```bash
npm run build:css
npm run audit:css:write
npm run build
npm run lint:css
```

Expected: all commands succeed and the baseline contains non-empty selector and custom-property inventories.

- [ ] **Step 4: Commit the baseline tooling**

```bash
git add scripts/audit-theme-css.cjs package.json package-lock.json docs/superpowers/baselines/2026-07-30-css-baseline.json
git commit -m "chore: add CSS audit baseline"
```

### Task 2: Create the ordered source manifest

**Files:**
- Create: `src/theme-css/manifest.cjs`
- Modify: `scripts/build-theme-css.cjs`

**Interfaces:**
- `manifest.cjs` exports an ordered array of source paths relative to `src/`.
- `build-theme-css.cjs` reads the manifest, fails if a listed file is missing, and concatenates files in order.

- [ ] **Step 1: Define the manifest order**

Use this order:

```js
[
  "flavors/default.css",
  "theme-css/shadcn-primitives.css",
  "theme-css/base.css",
  "theme-css/components.css",
  "theme-css/context-overrides.css",
  "theme-css/native-precedence.css",
]
```

The first implementation may use grouped files rather than many files; later tasks split those groups without changing manifest order.

- [ ] **Step 2: Update the build script**

Resolve every manifest entry from `src/`, read it as UTF-8, and concatenate with two newlines. Keep the existing generated header and writes to both `public/shadcn.css` and `dist/shadcn.css`.

- [ ] **Step 3: Verify output before moving rules**

Run `npm run build:css`. Confirm it succeeds and the output begins with the generated header and contains the token definitions.

### Task 3: Split the current stylesheet without changing rules

**Files:**
- Create: `src/theme-css/base.css`
- Create: `src/theme-css/components.css`
- Create: `src/theme-css/context-overrides.css`
- Create: `src/theme-css/native-precedence.css`
- Delete: `src/theme-css/_shared.css`

**Interfaces:**
- The four files are source-only modules concatenated by the manifest.
- The generated output remains a single `shadcn.css`.

- [ ] **Step 1: Move base sections verbatim**

Move the opening shared tokens/remapping and sections `4.0` through `4.1` into `base.css`. Preserve whitespace-independent CSS content and ordering.

- [ ] **Step 2: Move component sections verbatim**

Move sections `4.2` through `4.30`, excluding preview-only and final high-specificity blocks, into `components.css`. Keep each existing section comment with its rules.

- [ ] **Step 3: Move contextual rules verbatim**

Move preview, block-reference, search-result, and other context-specific rules into `context-overrides.css`.

- [ ] **Step 4: Move final precedence patches verbatim**

Move the unlayered end-of-file overrides, including the sidebar-collapsed, command modal, query, AI-chat, and tag-property precedence rules, into `native-precedence.css`.

- [ ] **Step 5: Remove the old source and build**

Run:

```bash
npm run build:css
node scripts/audit-theme-css.cjs --compare docs/superpowers/baselines/2026-07-30-css-baseline.json
```

Expected: the selector and custom-property inventories match the baseline; any inventory mismatch is fixed before proceeding.

- [ ] **Step 6: Run static checks**

Run `npm run build`, `npm run lint:css`, and `npm run check`. Fix only syntax, ordering, or path errors introduced by the split.

### Task 4: Split large modules by stable responsibility

**Files:**
- Create focused files under `src/theme-css/base/`, `src/theme-css/components/`, and `src/theme-css/overrides/`
- Modify: `src/theme-css/manifest.cjs`
- Delete the corresponding grouped modules after content moves

**Interfaces:**
- Each module contains complete CSS sections and has no imports.
- Manifest order remains equivalent to Task 3.

- [ ] **Step 1: Extract base modules**

Create `base/reset.css`, `base/typography.css`, and `base/surfaces.css`. Move only complete sections; do not split nested rules across files.

- [ ] **Step 2: Extract component modules**

Create modules for buttons/forms/navigation/overlays/feedback/editor/query/tag-properties/ai-chat/settings/calendar. Keep related selectors together, especially paired normal and hover/selected rules.

- [ ] **Step 3: Extract override modules**

Create `overrides/preview-contexts.css` and `overrides/native-precedence.css`. Keep the latter last in the manifest.

- [ ] **Step 4: Compare after each extraction**

After every extraction:

```bash
npm run build:css
node scripts/audit-theme-css.cjs --compare docs/superpowers/baselines/2026-07-30-css-baseline.json
npm run lint:css
```

Expected: inventories remain equal and lint passes.

### Task 5: Remove verified redundant rules

**Files:**
- Modify focused CSS modules under `src/theme-css/`
- Modify: `scripts/audit-theme-css.cjs` if additional checks are needed

**Interfaces:**
- No public runtime interface changes.

- [ ] **Step 1: Identify duplicate selector blocks**

Use the audit script to report repeated normalized selectors and same-value declarations. Review each candidate against source order and context.

- [ ] **Step 2: Merge only equivalent blocks**

Merge duplicate rules only when selector list, declarations, media/scope context, and cascade position are equivalent. Keep separate blocks when their later position is needed to defeat native Orca CSS.

- [ ] **Step 3: Remove confirmed dead declarations**

Delete only declarations proven to be fully overridden in the same cascade context and not used as a fallback for unsupported CSS. Do not remove compatibility variables solely because they are not referenced in repository source.

- [ ] **Step 4: Rebuild and compare**

Run:

```bash
npm run build:css
npm run audit:css:write
npm run build
npm run lint:css
```

Review the generated diff and document any intentional byte-level changes as rule merges or dead-code removal.

### Task 6: Update documentation and complete deployment

**Files:**
- Modify: `README.md`
- Modify: `DESIGN_SPEC.md`
- Modify: `src/theme-css/reference/15-shadcn-mapping.md`
- Modify: `scripts/build-theme-css.cjs` comments if needed

**Interfaces:**
- Documentation describes the modular source layout and manifest order.

- [ ] **Step 1: Update source layout documentation**

Replace references to `_shared.css` as the only source with the actual module directories and explain that the build emits one generated CSS file.

- [ ] **Step 2: Run full verification**

Run:

```bash
npm run check
node scripts/audit-theme-css.cjs --compare docs/superpowers/baselines/2026-07-30-css-baseline.json
```

Expected: TypeScript build, CSS build, lint, and audit all pass.

- [ ] **Step 3: Deploy**

Run:

```bash
npm run build:deploy
```

Expected: deployment completes to `/home/ilio/Documents/orca/plugins/shadcn` and contains `dist/index.js` and `dist/shadcn.css`.

- [ ] **Step 4: Commit the completed refactor**

```bash
git add README.md DESIGN_SPEC.md src scripts package.json package-lock.json public/shadcn.css dist/shadcn.css
git commit -m "refactor: modularize and clean theme CSS"
git status
```
