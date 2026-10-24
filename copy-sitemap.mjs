import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const sitemap0 = path.join(distDir, 'sitemap-0.xml');
const sitemapIndex = path.join(distDir, 'sitemap-index.xml');
const sitemapTarget = path.join(distDir, 'sitemap.xml');

if (fs.existsSync(sitemap0)) {
  fs.copyFileSync(sitemap0, sitemapTarget);
  console.log('Successfully created dist/sitemap.xml from dist/sitemap-0.xml');
} else if (fs.existsSync(sitemapIndex)) {
  fs.copyFileSync(sitemapIndex, sitemapTarget);
  console.log('Successfully created dist/sitemap.xml from dist/sitemap-index.xml');
}
