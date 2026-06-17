# Proposal: Implement i18n

## Intent

Provide multilingual support (English and Spanish) to the portfolio site to reach a global audience, allowing users to view content in their preferred language with seamless navigation and routing.

## Scope

### In Scope
- Configure Astro native i18n support for routing (English and Spanish).
- Dynamic locale detection and client-side redirection to the preferred language on first access.
- Structured translation dictionaries/JSON for UI and content strings.
- Refactor existing static English page content in `src/pages` and `src/components` to read from the translation system.
- Support default fallback locale (English) when no locale match is found.

### Out of Scope
- Server-side geo-IP routing.
- Multilingual translation for third-party RSS blog posts.
- Translation of code documentation or other non-user-facing files.

## Capabilities

### New Capabilities
- `i18n-routing`: Support for locale-prefixed routes (e.g. `/es/` and `/en/`) and automatic locale redirection based on user preference.
- `i18n-rendering`: Translation rendering for English and Spanish across all portfolio cards, headers, and UI elements.

### Modified Capabilities
- None

## Approach

Leverage Astro's built-in i18n routing support configured in `astro.config.mjs`. Store translation strings in standard JSON/JS files under `src/libs/i18n/` or similar. Update Astro pages (e.g. `src/pages/[lang]/index.astro`) to statically generate locale-prefixed paths. Add a lightweight client-side script in the head layout to detect user browser language and redirect to the appropriate locale-prefixed path if no language cookie or subpath is set.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `astro.config.mjs` | Modified | Configure built-in i18n options (locales, defaultLocale, routing strategy). |
| `src/pages` | Modified | Reorganize page routing structure to support language prefixes (e.g., dynamic params or nested subdirectories). |
| `src/layouts` | Modified | Inject language detection/redirection script and set correct HTML `lang` attributes. |
| `src/components` | Modified | Replace hardcoded English strings with dynamic translations using helper utility. |
| `src/libs/i18n` | New | Add translation dictionaries for English and Spanish, and lookup helpers. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| SEO duplicate content penalty | Low | Use standard canonical/hreflang tags via Astro integration. |
| Redirect loop | Low | Ensure language detection runs once and respects user path selection. |

## Rollback Plan

Revert all code modifications and directory structure changes to their clean state using Git:
```bash
git reset --hard HEAD
git clean -fd
```

## Dependencies

- Astro v4+ (supports native i18n).

## Success Criteria

- [ ] Successful build execution with `pnpm build` (`astro check && astro build`).
- [ ] Client-side redirection correctly routes root visitors based on browser preferred language.
- [ ] Correct rendering of all UI texts and content in both English (`/en/` or `/`) and Spanish (`/es/`).
