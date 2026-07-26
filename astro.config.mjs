import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { copyFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

/** Copy Astro's sitemap-0.xml to the conventional /sitemap.xml path. */
function sitemapXmlAlias() {
  return {
    name: 'sitemap-xml-alias',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const dist = fileURLToPath(dir);
        const source = join(dist, 'sitemap-0.xml');
        const target = join(dist, 'sitemap.xml');
        try {
          await access(source);
          await copyFile(source, target);
        } catch {
          // No chunked sitemap — nothing to alias
        }
      },
    },
  };
}

export default defineConfig({
  integrations: [tailwind(), sitemap(), sitemapXmlAlias()],
  site: 'https://aaghran.com',
});
