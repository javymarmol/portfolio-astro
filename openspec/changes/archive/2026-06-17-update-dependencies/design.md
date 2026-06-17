# Design: Dependency Upgrade to Astro v6, Tailwind v4 & Vite v6

## Technical Approach

We will upgrade the portfolio website's framework, bundler, utility CSS, and icon dependencies to their latest major releases. This involves transitioning from Astro v4 and Tailwind CSS v3 to Astro v6, Vite v6, and Tailwind CSS v4. To do this, we will remove the legacy JavaScript configuration file (`tailwind.config.mjs`) and use Tailwind v4's CSS-first syntax in `src/styles/base.css`. Tailwind v4 will be integrated natively via the `@tailwindcss/vite` plugin in the Astro config. The icon selector syntax will be updated from the legacy custom classes to the modern dynamic selector syntax (`icon-[ri--...]`) supported by `@iconify/tailwind4`.

## Architecture Decisions

### Decision: Integration Layer for Tailwind CSS

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `@astrojs/tailwind` | Relies on Tailwind v3 and legacy config, blocks Astro v6 / Vite v6 upgrade | Rejected |
| `@tailwindcss/vite` | Official Tailwind v4 plugin, runs natively in Vite's pipeline, fast builds, requires CSS-first config | Chosen |

**Rationale**: Astro v6 uses Vite v6. Tailwind v4 provides a native `@tailwindcss/vite` plugin that integrates directly into the build pipeline, bypassing the need for an Astro-specific integration wrapper.

### Decision: Tailwind CSS Configuration File

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `tailwind.config.mjs` | Deprecated in Tailwind v4, keeps old JS-based syntax | Rejected |
| CSS-first configuration | Standard in Tailwind v4, keeps all configurations (fonts, theme, plugins) in `base.css` using CSS variables | Chosen |

**Rationale**: Tailwind v4 moves to a CSS-first configuration model. Removing `tailwind.config.mjs` simplifies the project's config surface and aligns with modern Tailwind v4 practices.

### Decision: Iconify Integration

| Option | Tradeoff | Decision |
|--------|----------|----------|
| `@iconify/tailwind` (v3) | Incompatible with Tailwind v4 build process | Rejected |
| `@iconify/tailwind4` (v4) | Designed specifically for Tailwind v4, supports dynamic class syntax `icon-[prefix--name]` | Chosen |

**Rationale**: Upgrading to `@iconify/tailwind4` allows direct integration with Tailwind v4, utilizing dynamic selectors to load only the used icons without needing a manual Tailwind-config-based plugin declaration.

## Data Flow

Data flow maps how components and styles are processed during the build step:

```
[Astro Pages / Components] ──(Vite Pipeline with @tailwindcss/vite)──> [Processed HTML & CSS (Tailwind v4)]
            │                                                                      ▲
            └──────────────────────(Dynamic Icon Scanning)─────────────────────────┘
                                             │
                                   [@iconify/tailwind4]
```

During build or dev mode, Vite scans source files (`.astro`, `.vue`) to extract Tailwind utility classes. The `@iconify/tailwind4` plugin detects classes with the pattern `icon-[ri--*]` and dynamically fetches and embeds the respective Remix Icon SVG data into the compiled CSS bundle.

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `package.json` | Modify | Update dependencies to Astro v6, Tailwind v4, Vite v6, Vue v3.5, and configure `@tailwindcss/vite` / `@iconify/tailwind4`. |
| `astro.config.mjs` | Modify | Remove `@astrojs/tailwind` integration. Add `@tailwindcss/vite` to `vite.plugins`. |
| `tailwind.config.mjs` | Delete | Remove legacy Tailwind v3 config. |
| `src/styles/base.css` | Modify | Update legacy directives to `@import "tailwindcss"`. Configure custom font family (`Figtree Variable`) and register `@iconify/tailwind4` plugin. |
| `src/layouts/Layout.astro` | Modify | Add explicit import of `../styles/base.css` in the frontmatter. |
| `src/components/Blog.vue` | Modify | Update icon class to `icon-[ri--arrow-right-up-line]`. |
| `src/components/IntroCard.astro` | Modify | Update icon classes to `icon-[ri--github-fill]`, `icon-[ri--linkedin-box-fill]`, and `icon-[ri--mail-line]`. |

## Interfaces / Contracts

### Dependency Updates (`package.json`)
```json
"dependencies": {
  "@astrojs/check": "^0.9.9",
  "@astrojs/sitemap": "^3.7.3",
  "@astrojs/vue": "^6.0.1",
  "@extractus/feed-extractor": "^7.1.3",
  "@fontsource-variable/figtree": "^5.0.22",
  "@iconify-json/ri": "^1.1.22",
  "astro": "^6.4.7",
  "tailwindcss": "^4.3.1",
  "typescript": "^5.7.3",
  "vue": "^3.5.13"
},
"devDependencies": {
  "@iconify/tailwind4": "^1.2.3",
  "@tailwindcss/vite": "^4.3.1",
  "@types/gtag.js": "^0.0.20"
}
```

### Vite Configuration (`astro.config.mjs`)
```javascript
import {defineConfig} from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  integrations: [
    vue({
      devtools: {
        launchEditor: "webstorm"
      }
    }),
    sitemap({
      customPages: ['https://blog.javymarmol.com'],
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  site: "https://javymarmol.com",
});
```

### Global Styles (`src/styles/base.css`)
```css
@import "tailwindcss";
@plugin "@iconify/tailwind4";

@theme {
  --font-sans: "Figtree Variable", var(--font-sans);
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit / Static | Astro Check & Compilation | Run `pnpm build` to compile the application and verify no TypeScript or Astro compilation errors. |
| Manual | Dev Server Visuals | Run `pnpm dev` and preview the page. Verify typography styles, layout alignment, and that the 4 icons (GitHub, LinkedIn, Email, Arrow) render correctly. |

## Migration / Rollout

No data migration or database updates are required for this frontend-only build-system upgrade. Rollout will occur atomically via a single Pull Request.
