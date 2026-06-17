# Exploration: Dependency Upgrade to Astro v6, Tailwind v4 & Vite v6

## Current State

The project current runs on:
- **Astro**: `^4.15.2` (vulnerable to several security flaws, including Remote allowlist bypass, arbitrary local file read, server island parameter replays)
- **Tailwind CSS**: `^3.4.7` (using the legacy `@astrojs/tailwind` integration and JavaScript-based `tailwind.config.mjs`)
- **Iconify Integration**: `@iconify/tailwind` (`^1.1.2`), using custom class selectors (`.iconify.ri--*`) via the Tailwind v3 `addIconSelectors` plugin
- **Package Manager**: `pnpm` (with a workspace setup)
- **Vulnerabilities**: A total of 20 vulnerabilities identified in `pnpm audit` (3 low, 12 moderate, 5 high), primarily due to outdated versions of `astro`, `vite`, `esbuild`, `yaml`, and `js-yaml`.

## Affected Areas

1. **`package.json`**
   - Must remove `@astrojs/tailwind` (deprecated in Tailwind v4) and `@iconify/tailwind` (v3 version).
   - Must upgrade `astro` to `^6.4.7` (Vite v6).
   - Must upgrade Astro integrations: `@astrojs/vue` to `^6.0.1`, `@astrojs/sitemap` to `^3.7.3`, `@astrojs/check` to `^0.9.9`.
   - Must upgrade main UI dependencies: `tailwindcss` to `^4.3.1`, `vue` to `^3.5.13`, `typescript` to `^5.7.3`.
   - Must add devDependencies: `@tailwindcss/vite` (`^4.3.1`) and `@iconify/tailwind4` (`^1.2.3`).

2. **`astro.config.mjs`**
   - Remove the `@astrojs/tailwind` integration import and registration.
   - Configure Tailwind v4 as a Vite plugin via `@tailwindcss/vite` within the `vite.plugins` array.

3. **`tailwind.config.mjs`**
   - To be removed completely. All Tailwind configuration (theme customization, fonts, and plugins) moves to the global CSS file (`src/styles/base.css`).

4. **`src/styles/base.css`**
   - Replace legacy `@tailwind` directives with Tailwind v4 `@import "tailwindcss";`.
   - Register the `@iconify/tailwind4` plugin via `@plugin "@iconify/tailwind4";`.
   - Define custom font family (`--font-sans`) inside the CSS-first `@theme` block.

5. **`src/layouts/Layout.astro`**
   - Must import `../styles/base.css` explicitly since Tailwind v4 is now loaded via standard stylesheet imports rather than automated integration injection.

6. **Component Icons**
   - Change Iconify selectors from legacy class patterns to the Tailwind v4 plugin's dynamic class structure (`icon-[ri--...]`):
     - `src/components/Blog.vue`: Change `iconify ri--arrow-right-up-line` to `icon-[ri--arrow-right-up-line]`.
     - `src/components/IntroCard.astro`: Change `iconify ri--github-fill` to `icon-[ri--github-fill]`, `iconify ri--linkedin-box-fill` to `icon-[ri--linkedin-box-fill]`, and `iconify ri--mail-line` to `icon-[ri--mail-line]`.

## Approaches

### Option A: Clean Upgrade to Astro v6 + Tailwind v4 + Vite v6 (Recommended)
- **Description**: Upgrade dependencies to the latest stable major versions. Switch Tailwind CSS to v4 utilizing the official Vite plugin `@tailwindcss/vite` and the new CSS-first design, migrating the icon plugin to `@iconify/tailwind4`.
- **Pros**:
  - Eliminates all 20 vulnerability findings.
  - Aligns configuration with modern CSS-first Tailwind standards (removing `tailwind.config.mjs`).
  - Better build-time performance and smaller bundle sizes due to Vite v6 and Tailwind v4.
- **Cons**:
  - Requires updating icon class strings across 2 files (4 selectors).
  - Requires an explicit stylesheet import inside the main layout.

### Option B: Keep Astro v4 and Tailwind v3 with Minor Version Updates
- **Description**: Sticking to Astro v4 and Tailwind v3, but updating dependencies to patch versions where possible.
- **Pros**:
  - Minimal code change required.
- **Cons**:
  - Will not fully resolve the vulnerabilities since many patches for Vite and Astro require upgrading to major versions (e.g., Astro v6, Vite v6).
  - Retains legacy deprecated configuration format.

## Recommendation

Proceed with **Option A**. The project is small, making the migration to Astro v6, Tailwind v4, and Vite v6 low-risk and highly beneficial. Resolving all current vulnerabilities is critical for security and developer experience.

## Risks

1. **Class-name scanning changes**: Tailwind v4 scans all files automatically. There is a small risk of custom classes behaving differently if they were reliant on custom safelists or content paths, but portfolio-astro has a very standard structure, so this is minimal.
2. **Icon selector translation**: Ensuring all 4 icon selectors are correctly rewritten without spelling mistakes is required to prevent broken UI icons.
3. **Global CSS load order**: Custom styles defined in `<style is:global>` must properly cascade after Tailwind v4's base styles.

## Ready for Proposal
Yes, the codebase layout and dependencies have been thoroughly mapped, and the transition path is well-defined.
