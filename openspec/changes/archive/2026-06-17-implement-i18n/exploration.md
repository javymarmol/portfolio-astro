# Exploration: implement-i18n

This document explores the implementation of client-side language detection and internationalization (i18n) support in the `portfolio-astro` project.

## Current State
- The root index file is `src/pages/index.astro` and contains the hardcoded Spanish portfolio grid.
- Translations do not exist; all component texts are in Spanish.
- `Layout.astro` has hardcoded `<html lang="es">` and `es_ES` locale meta tags.
- The project runs Astro v6 and Tailwind CSS v4.

## Affected Areas
- `astro.config.mjs`: Adding built-in i18n configuration for SEO sitemap generation and routing support.
- `src/libs/i18n.ts`: New file for translation dictionaries (EN/ES) and utility functions.
- `src/pages/index.astro`: Will be replaced with a client-side redirect page that detects browser language and redirects to `/es/` or `/en/`.
- `src/pages/[lang]/index.astro`: New dynamic route that serves the portfolio grid in the selected language.
- `src/layouts/Layout.astro`: Modified to accept dynamic `lang` and SEO attributes.
- Components (`IntroCard.astro`, `AboutMe.astro`, `Contacts.astro`, `TimeZoneCard.astro`, `Now.astro`, `Blog.vue`): Updated to fetch and display localized content.

## Approaches

### Approach A: Dynamic Route (`[lang]/index.astro`) + Client-Side Redirect at Root
A single dynamic page route `src/pages/[lang]/index.astro` handles rendering for both `/en/` and `/es/`. Root `/` performs a fast client-side redirect via inline script block based on `navigator.language`.
- **Pros**: Keep code DRY (no duplication of layout/page files), highly maintainable. Easy to add more languages in the future.
- **Cons**: Client-side redirect has a minimal execution cost on page load (mitigated by putting inline redirect script at the top of `<head>`).

### Approach B: Explicit Subdirectories (`/en/` and `/es/` directories)
Separate pages are created at `src/pages/en/index.astro` and `src/pages/es/index.astro`.
- **Pros**: Simple routing logic.
- **Cons**: Massive code duplication between both `index.astro` files, leading to high maintenance overhead.

## Recommendation
Implement **Approach A**. The dynamic route approach is the cleanest, easiest to maintain, and utilizes Astro's modern routing capabilities efficiently. A centralized translation dictionary `src/libs/i18n.ts` will drive the components, and individual components will pull translations using a URL-based lang helper, avoiding prop drilling.

## Risks
- **Redirection Delay/Flicker**: Redirecting client-side from `/` can cause a brief blank page. This is minimized by keeping `/index.astro` lightweight (only redirection script, no heavy bundles or styles).
- **SEO/Crawlers**: Bots might not execute JS redirection. We should include a `<noscript>` fallback redirect tag (`<meta http-equiv="refresh" content="0;url=/en/" />`) and proper alternate link annotations in the layout.
