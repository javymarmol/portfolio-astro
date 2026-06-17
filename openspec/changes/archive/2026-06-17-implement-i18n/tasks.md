# Tasks: Implement i18n

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~350 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | single-pr |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Implement i18n support, redirection, dynamic routes, and localized UI | PR 1 | Single PR for full i18n feature integration |

## Phase 1: Foundation

- [x] 1.1 Create `src/libs/i18n.ts` containing the `Locale` type, translation dictionaries (English/Spanish), and the `getLangFromUrl` / `useTranslations` helpers.
- [x] 1.2 Update `astro.config.mjs` to configure native `i18n` with `locales` ('en', 'es') and `defaultLocale` ('en').

## Phase 2: Routing

- [x] 2.1 Create dynamic page route `src/pages/[lang]/index.astro` implementing `getStaticPaths` for 'en' and 'es' and rendering the main page markup.
- [x] 2.2 Modify `src/pages/index.astro` to perform client-side redirection using a lightweight `<script>` based on `navigator.language`.

## Phase 3: Components Migration

- [x] 3.1 Update `src/layouts/Layout.astro` to accept a dynamic `lang` prop, set `lang` attributes, and inject alternate hreflang canonical headers.
- [x] 3.2 Update `src/components/IntroCard.astro` to use translations from `useTranslations(lang)`.
- [x] 3.3 Update `src/components/AboutMe.astro` to use translations from `useTranslations(lang)`.
- [x] 3.4 Update `src/components/Contacts.astro` to use translations from `useTranslations(lang)`.
- [x] 3.5 Update `src/components/TimeZoneCard.astro` to use translations from `useTranslations(lang)`.
- [x] 3.6 Update `src/components/Now.astro` to use translations from `useTranslations(lang)`.
- [x] 3.7 Update `src/components/Blog.vue` to accept a dynamic `lang` prop and translate the screen-reader label.
- [x] 3.8 Update the copyright footer block in `src/pages/[lang]/index.astro` to use translations from the dictionary.

## Phase 4: Localizing 404

- [x] 4.1 Update `src/pages/404.astro` to render both English and Spanish message blocks.
- [x] 4.2 Add inline client-side script in `src/pages/404.astro` to detect language from URL path and toggle the visibility of the corresponding language blocks.

## Phase 5: Verification

- [x] 5.1 Run `pnpm build` to compile the project and check for Astro linting and type errors (`astro check`).
- [x] 5.2 Verify that static pages generate in `dist/` for both locales (e.g. `/es/index.html` and `/en/index.html`).
- [x] 5.3 Manually audit client-side redirect by hitting `/` with different browser locale headers.
- [x] 5.4 Manually verify the localized 404 page toggles text correctly.
