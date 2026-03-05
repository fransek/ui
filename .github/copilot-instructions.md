# Copilot Instructions

## Project Overview

`@fransek/ui` is a React component library and design system built on top of [Base UI](https://base-ui.com). Components are styled with [Tailwind CSS v4](https://tailwindcss.com) using a custom CSS variable–based theme, composed with [`clsx`](https://github.com/lukeed/clsx) and [`tailwind-merge`](https://github.com/dcastil/tailwind-merge) via the `cn` utility.

## Tech Stack

- **React** (>=18) with TypeScript
- **Base UI** (`@base-ui/react`) for accessible, unstyled primitives
- **Tailwind CSS v4** for utility-class styling (no config file — theme is defined in CSS)
- **lucide-react** for icons
- **Rollup** for bundling (ESM + CJS)
- **Storybook** (Vite) for component development and docs
- **Vitest** + **Playwright** for testing
- **ESLint** + **Prettier** for linting/formatting
- **semantic-release** for automated versioning and changelog

## Repository Structure

```
src/
  components/   # React components (one file per component)
  lib/
    types.ts    # Shared TypeScript types (e.g. FieldAttributes)
    utils.ts    # cn() utility (clsx + tailwind-merge)
  stories/      # Storybook stories for each component
  theme/        # CSS theme files (vars, base, utilities, components)
    vars.css    # CSS custom properties for light + dark mode
    index.css   # Aggregates all theme partials
```

## Component Conventions

- Each component lives in `src/components/<name>.tsx` and is exported from `src/index.ts`.
- Components extend the corresponding **Base UI** primitive's props interface and forward all extra props with `...props`.
- Styling is done exclusively with Tailwind utility classes using the `cn()` helper from `../lib/utils`.
- Components that include a form field wrapper accept `fieldProps?: FieldProps` and the `FieldAttributes` props (`label`, `errorMessage`, `isValidating`, `isValidatingMessage`, `description`) directly on the component.
- The `Field` component provides labelling, validation, and description slots for wrapped inputs.
- Use the `useFieldContext` hook inside inputs to read shared `isValidating` state from a parent `Field`.

### Adding a New Component

1. Create `src/components/<name>.tsx`:
   - Import the Base UI primitive and its prop types.
   - Define an exported `interface <Name>Props` that extends the Base UI props.
   - Export the component function with destructured props and sensible defaults.
   - Apply `cn(...)` for class composition; never concatenate class strings manually.
2. Export it from `src/index.ts`.
3. Add a Storybook story in `src/stories/<Name>.stories.tsx`.

### CSS Theme

Theme tokens are CSS custom properties defined in `src/theme/vars.css` for both light (`:root`) and dark (`.dark`) modes, then aliased into Tailwind's `@theme inline` block. Available semantic color tokens include `background`, `foreground`, `card`, `border`, `primary` / `on-primary` / `primary-foreground`, `secondary`, `muted`, `error`, `warning`, `success`, etc.

## Scripts

```bash
pnpm build          # Build the library (Rollup)
pnpm test           # Run tests (Vitest, no-watch)
pnpm lint           # ESLint --fix on src/
pnpm format         # Prettier --write on src/
pnpm validate       # tsc + lint + format + test
pnpm storybook      # Start Storybook dev server on :6006
pnpm build-storybook # Build static Storybook
```

## Code Style

- TypeScript strict mode; always type props interfaces explicitly.
- Single quotes for strings; no semicolons (Prettier handles formatting).
- Organize imports automatically via `prettier-plugin-organize-imports`.
- Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) spec (enforced by commitlint).
