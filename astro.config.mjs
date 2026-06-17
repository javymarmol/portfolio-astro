import {defineConfig} from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import vue from "@astrojs/vue";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [
    vue({
      devtools: false
    }),
    sitemap({
      customPages: ['https://blog.javymarmol.com'],
    })
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  site: "https://javymarmol.com",
  devToolbar: {
    enabled: true
  }
});
