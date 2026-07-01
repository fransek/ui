# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`@fransek/ui` is a published React component library and design system built on top of [Base UI](https://base-ui.com) (`@base-ui/react`) unstyled primitives. Components are styled with Tailwind CSS v4 using a CSS-variable–based theme, composed via the `cn` utility (clsx + tailwind-merge). It ships as a dual ESM/CJS package with per-component entry points.

This is a pnpm workspace (`pnpm-workspace.yaml`); use `pnpm`, not `npm`, despite the stale `package-lock.json` in the tree. The library package lives at the repo root; `apps/*` holds workspace consumers.

## Commands

```bash
pnpm build            # Bundle the library with Rollup (ESM + CJS + theme.css)
pnpm dev              # Rollup in watch mode
pnpm test             # Vitest, single run
pnpm test:watch       # Vitest watch mode
pnpm coverage         # Vitest with v8 coverage
pnpm lint             # eslint --fix on src/
pnpm format           # prettier --write on src/
pnpm validate         # tsc --noEmit && lint && format && test (run before committing)
pnpm storybook        # Storybook dev server on :6006
pnpm build-storybook  # Static Storybook build
```

Run a single test file: `pnpm vitest --run src/components/date-picker.test.tsx` (or `-t "<name>"` to filter by test title).

Tests use the Storybook Vitest addon and run in a real Chromium browser via Playwright — the `storybook` Vitest project turns each story into a test, so Playwright browsers must be installed (`pnpm exec playwright install chromium`).

## Architecture

```
src/
  components/   # One component per file; the public API
  lib/
    utils.ts    # cn(), cnBaseUI(), mergeRefs()
    types.ts    # FieldAttributes shared across form components
  stories/      # Storybook stories (also serve as tests)
  theme/        # Tailwind v4 CSS theme (vars.css defines tokens for :root + .dark)
  index.ts      # Barrel export — every public component/type re-exported here
```

**Component pattern.** Each component extends the corresponding Base UI primitive's props interface and spreads remaining props onto the primitive:

- Export an `interface <Name>Props extends BaseUI<Name>Props` and add design-system props (e.g. `variant`, `size`).
- Base UI's `className` accepts either a string or a `(state) => string` function. When composing classes, handle both — see `button.tsx`, which calls `className(state)` when it is a function. Use `cnBaseUI()` from `lib/utils` to compose state-dependent classes cleanly.
- Style **only** with Tailwind utility classes via `cn(...)`; never manually concatenate class strings.
- Style variant/size maps are plain objects keyed by union types (`keyof typeof variantStyles`), and the class-composition function (e.g. `buttonStyles`) is exported alongside the component for reuse.

**Form fields.** The `Field` component provides label / description / error / validation slots. Wrapped inputs accept `fieldProps?: FieldProps` plus the `FieldAttributes` props (`label`, `errorMessage`, `description`, `isValidating`, `isValidatingMessage`, `invalid`, `infoPopover`) directly. Inputs read shared validation state from a parent `Field` via `useFieldContext`.

**Theme.** Tokens are CSS custom properties in `src/theme/vars.css` (light `:root`, dark `.dark`), aliased into Tailwind's `@theme inline` block — there is no `tailwind.config`. Semantic tokens follow a `color` / `on-color` pairing (`primary`/`on-primary`, `error`/`on-error`, etc.), plus `background`, `foreground`, `card`, `border`, `muted`, `warning`, `success`, `link`.

**Build.** `rollup.config.mjs` emits two builds (`dist/cjs`, `dist/esm`) with `preserveModules` so consumers can import individual components (`@fransek/ui/button`). Peer deps (react, base-ui, lucide-react, date-fns, etc.) are externalized; `react-day-picker` and `date-fns` are optional peers (only the calendar/date-picker need them).

## Adding a component

1. Create `src/components/<name>.tsx` following the pattern above.
2. Re-export it (and its `Props` type) from `src/index.ts`.
3. Add a story in `src/stories/<Name>.stories.tsx` (PascalCase) — stories double as the test suite.

## Conventions

- Prettier config (`.prettierrc`): 2-space indent, 80 print width, **double quotes**, **semicolons**, trailing commas everywhere. Imports are auto-organized (`prettier-plugin-organize-imports`) and Tailwind classes auto-sorted (`prettier-plugin-tailwindcss`). Note: `.github/copilot-instructions.md` is outdated on this point (it claims single quotes / no semicolons) — follow `.prettierrc`.
- TypeScript strict mode; always type the props interface explicitly.
- Commits must follow Conventional Commits (enforced by commitlint + husky). Releases are automated by semantic-release / release-please from commit messages — do not bump versions manually.
- lint-staged runs prettier, eslint, and `tsc --noEmit` on staged `.ts`/`.tsx` files via the pre-commit hook.

## Agent skills

`.agents/skills/` vendors two skills (pinned in `skills-lock.json`): `base-ui` (Base UI composition, render props, form controls — consult `references/*.md` when working with a specific primitive) and `storybook` (story authoring conventions).
