import {defineConfig} from 'astro/config';
import tailwind from "@astrojs/tailwind";

import vue from "@astrojs/vue";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    vue({
      devtools: {
        launchEditor: "webstorm"
      }
    }),
    sitemap({
      customPages: ['https://blog.javymarmol.com'],
    })],
  site: "https://javymarmol.com",
});
