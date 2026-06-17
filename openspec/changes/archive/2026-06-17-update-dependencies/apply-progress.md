# Implementation Progress: Dependency Upgrade

This document tracks the step-by-step progress of implementing the dependency upgrade to Astro v6, Tailwind v4, and Vite v6.

## Phase 1: Foundation
- [x] 1.1 Update `package.json` dependencies to Astro v6, Tailwind v4, Vite v6, Vue v3.5, and Iconify tailwind4.
- [ ] 1.2 Delete `pnpm-workspace.yaml`.
- [x] 1.3 Delete `tailwind.config.mjs`.
- [x] 1.4 Run `pnpm install` to download dependencies and regenerate `pnpm-lock.yaml`.

## Phase 2: Configuration
- [x] 2.1 Update `astro.config.mjs` to remove `@astrojs/tailwind` and add `@tailwindcss/vite` in `vite.plugins`.
- [x] 2.2 Configure `src/styles/base.css` with `@import "tailwindcss"`, `@plugin "@iconify/tailwind4"`, and `--font-sans` theme setting.
- [x] 2.3 Import `../styles/base.css` in `src/layouts/Layout.astro` frontmatter.

## Phase 3: Components & Icons Migration
- [x] 3.1 Update icon class name to `icon-[ri--arrow-right-up-line]` in `src/components/Blog.vue`.
- [x] 3.2 Update icon class names to `icon-[ri--github-fill]`, `icon-[ri--linkedin-box-fill]`, and `icon-[ri--mail-line]` in `src/components/IntroCard.astro`.

## Phase 4: Verification
- [ ] 4.1 Run `pnpm build` to compile the application and verify no TypeScript or Astro compilation errors.
- [ ] 4.2 Run `pnpm audit` to check that security vulnerabilities are resolved.
- [ ] 4.3 Start the dev server with `pnpm dev` and manually verify that typography, layout, and the four icons render correctly.
