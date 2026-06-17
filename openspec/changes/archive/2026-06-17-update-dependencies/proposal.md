# Proposal: Dependency Upgrade to Astro v6, Tailwind v4 & Vite v6

## Intent

Upgrade dependencies to resolve 20 security vulnerabilities, improve build performance, and transition to modern CSS-first Tailwind CSS configuration.

## Scope

### In Scope
- Upgrade Astro to v6, Vite to v6, and Tailwind CSS to v4.
- Upgrade UI/Astro dependencies (`@astrojs/vue`, `@astrojs/sitemap`, `@astrojs/check`, `vue`, `typescript`).
- Migrate Tailwind config from `tailwind.config.mjs` to CSS-first styling in `src/styles/base.css`.
- Update `astro.config.mjs` to use `@tailwindcss/vite`.
- Update layout files to import global CSS.
- Update icon class strings to Tailwind v4 Iconify class format.

### Out of Scope
- Adding new business/application features.
- Refactoring UI components or replacing existing icons with different designs.

## Capabilities

### New Capabilities
None

### Modified Capabilities
None

## Approach

Implement Option A from exploration results:
1. Update `package.json` to install Astro v6, Tailwind v4, Vite v6, `@tailwindcss/vite`, `@iconify/tailwind4`, and related dependencies.
2. Delete `tailwind.config.mjs`.
3. Re-implement Tailwind configuration (fonts, plugins, icons) inside `src/styles/base.css`.
4. Register `@tailwindcss/vite` in `astro.config.mjs`.
5. Import base CSS in `src/layouts/Layout.astro`.
6. Update icon references in `src/components/Blog.vue` and `src/components/IntroCard.astro`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `package.json` | Modified | Upgrade dependencies and devDependencies |
| `astro.config.mjs` | Modified | Remove legacy Tailwind integration, add `@tailwindcss/vite` plugin |
| `tailwind.config.mjs` | Removed | Remove legacy configuration file |
| `src/styles/base.css` | Modified | Migrate to CSS-first Tailwind v4 directives and theme settings |
| `src/layouts/Layout.astro` | Modified | Explicitly import `base.css` |
| `src/components/Blog.vue` | Modified | Update class names for Iconify icons |
| `src/components/IntroCard.astro` | Modified | Update class names for Iconify icons |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Missing/broken custom font styles | Low | Verify typography configuration inside `@theme` in `base.css` matches current design |
| Broken icons | Low | Perform thorough validation of CSS class syntax mapping |

## Rollback Plan

Revert all changes and restore original packages and configurations via:

```bash
git checkout package.json pnpm-lock.yaml astro.config.mjs tailwind.config.mjs src/
pnpm install
```

## Dependencies

- None

## Success Criteria

- [ ] `pnpm build` executes successfully without errors.
- [ ] `pnpm audit` reports zero vulnerabilities.
- [ ] The application previews correctly (using `pnpm preview`).
