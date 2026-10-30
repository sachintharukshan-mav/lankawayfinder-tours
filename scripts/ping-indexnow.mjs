import fs from "node:fs";
import path from "node:path";

const SITEMAP_PATH = path.resolve("dist/sitemap.xml");
const HOST = "lankawayfinder.tours";
const KEY = "lankawayfinder2026indexnowkey";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function pingIndexNow() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error("dist/sitemap.xml not found. Run `npm run build` first.");
    process.exit(1);
  }

  const xml = fs.readFileSync(SITEMAP_PATH, "utf8");
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

  if (urls.length === 0) {
    console.error("No URLs found in dist/sitemap.xml");
    process.exit(1);
  }

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  console.log(`Submitting ${urls.length} canonical URLs to IndexNow (Bing / ChatGPT Search / Yandex)...`);

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (response.ok || response.status === 202) {
    console.log(`IndexNow accepted ${urls.length} URLs (HTTP ${response.status}).`);
  } else {
    const text = await response.text();
    console.warn(`IndexNow returned HTTP ${response.status}: ${text}`);
  }
}

pingIndexNow().catch((err) => {
  console.error("IndexNow submission failed:", err.message);
  process.exit(1);
});
