# Block Search Panel Styling Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the in-editor block search panel so its existing split layout follows shadcn/ui Neutral hierarchy without changing behavior.

**Architecture:** Keep Orca’s `.orca-search-modal` DOM and result/preview data flow. Adjust the shared overlay and unlayered precedence rules so the modal owns one border, the result list owns sidebar styling, the preview owns editor styling, and the footer owns the full-width muted chrome.

**Tech Stack:** CSS, PostCSS nesting, npm build/deploy scripts.

## Global Constraints

- Use existing semantic variables such as `--background`, `--secondary-background`, `--sidebar`, `--accent`, `--accent-foreground`, `--border`, and `--text-muted`.
- Do not add a second border or focus ring to an input inside an already bordered shell.
- Do not modify Orca DOM, search behavior, result data, or preview content.
- Keep special modal exclusions on global `.orca-menu` rules.
- After theme CSS changes, run `npm run build:deploy`.

---

### Task 1: Restyle the block search surface

**Files:**
- Modify: `src/theme-css/components/overlays.css:152-218, 411-502`
- Modify: `src/theme-css/context-overrides.css:301-312, 390-426`

**Interfaces:**
- Consumes: Existing `.orca-search-modal` DOM and semantic theme variables.
- Produces: A single-shell block search panel with sidebar results, editor preview, embedded search input, and muted footer.

- [ ] **Step 1: Update the search modal shell**

  Keep `.orca-search-modal` border, radius, padding, and overflow as the only outer chrome. Remove any competing inner panel border or shadow declarations introduced by the block-search-specific selectors.

- [ ] **Step 2: Update the result-list surface**

  Set `.orca-search-modal-result-list` to the sidebar surface, preserve its token remapping, and make result items transparent at rest. Keep hover/selected states on `--accent` with inherited foreground colors.

- [ ] **Step 3: Update the preview surface**

  Set `.orca-search-modal-result-preview` to `--background`, retain only the left separator, and keep nested `.orca-block-editor`, `#main`, and panel rows transparent with no border or shadow.

- [ ] **Step 4: Update the input and footer**

  Keep the search input as a borderless embedded group with only a bottom separator. Make the footer full bleed using the muted secondary surface, with muted labels and foreground icons.

- [ ] **Step 5: Run the CSS build**

  Run:

  ```bash
  npm run build:css
  ```

  Expected: the theme CSS build completes and regenerates `public/shadcn.css` and `dist/shadcn.css` without errors.

- [ ] **Step 6: Deploy the theme**

  Run:

  ```bash
  npm run build:deploy
  ```

  Expected: TypeScript/CSS build completes and the plugin is deployed to the configured Orca plugins directory.

### Task 2: Verify the generated selectors and repository state

**Files:**
- Test: generated CSS inspection and git diff

**Interfaces:**
- Consumes: Generated `public/shadcn.css` and `dist/shadcn.css`.
- Produces: Evidence that block-search selectors are present and unrelated files are unchanged.

- [ ] **Step 1: Inspect generated block-search rules**

  Confirm the generated CSS contains selectors for `.orca-search-modal`, `.orca-search-modal-result-list`, `.orca-search-modal-result-preview`, and `.orca-search-modal-footer`.

- [ ] **Step 2: Review the diff**

  Confirm only the intended theme CSS source files, generated CSS outputs, and design/plan documentation are changed; do not stage or alter the pre-existing untracked state files or `src/theme-css/reference.zip`.
