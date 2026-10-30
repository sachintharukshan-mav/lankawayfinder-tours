import fs from "node:fs";
import path from "node:path";

const DIST_DIR = path.join(process.cwd(), "dist");
const languages = ["en", "de", "fr", "ru", "it", "es"];
const gygLocales = {
  de: "de-DE",
  fr: "fr-FR",
  ru: "ru-RU",
  it: "it-IT",
  es: "es-ES",
};

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (file.endsWith(".html")) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getFiles(DIST_DIR);
console.log(`Found ${htmlFiles.length} HTML files to verify.`);

let errors = 0;
let checkedCount = 0;

for (const file of htmlFiles) {
  const rel = path.relative(DIST_DIR, file).replace(/\\/g, "/");
  if (rel === "404.html" || rel.startsWith("404/") || rel.startsWith("google")) continue;
  checkedCount++;

  const content = fs.readFileSync(file, "utf8");

  // Determine expected language
  const firstSegment = rel.split("/")[0];
  const isLocalized = languages.includes(firstSegment) && firstSegment !== "en";
  const expectedLang = isLocalized ? firstSegment : "en";

  // 1. Check <html lang="...">
  const langMatch = content.match(/<html[^>]+lang=["']([^"']+)["']/i);
  if (!langMatch || langMatch[1] !== expectedLang) {
    console.error(`[FAIL] ${rel}: Expected <html lang="${expectedLang}">, found "${langMatch ? langMatch[1] : "none"}"`);
    errors++;
  }

  // 2. Check canonical link
  const canonicalMatch = content.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    console.error(`[FAIL] ${rel}: Missing canonical tag`);
    errors++;
  } else {
    const expectedPrefix = expectedLang === "en" ? "https://lankawayfinder.tours/" : `https://lankawayfinder.tours/${expectedLang}/`;
    if (!canonicalMatch[1].startsWith(expectedPrefix) && canonicalMatch[1] !== "https://lankawayfinder.tours/") {
      console.error(`[FAIL] ${rel}: Canonical mismatch: ${canonicalMatch[1]}`);
      errors++;
    }
  }

  // 3. Check hreflang tags
  for (const l of languages) {
    const hreflangRegex = new RegExp(`<link[^>]+hreflang=["']${l}["'][^>]+href=["']([^"']+)["']`, "i");
    if (!hreflangRegex.test(content)) {
      console.error(`[FAIL] ${rel}: Missing hreflang="${l}"`);
      errors++;
    }
  }
  const xDefaultRegex = /<link[^>]+hreflang=["']x-default["'][^>]+href=["']([^"']+)["']/i;
  if (!xDefaultRegex.test(content)) {
    console.error(`[FAIL] ${rel}: Missing hreflang="x-default"`);
    errors++;
  }

  // 4. Check GetYourGuide locale query parameter on localized pages
  if (isLocalized && gygLocales[expectedLang]) {
    const gygLinks = [...content.matchAll(/href=["'](https:\/\/[^"']*getyourguide\.com[^"']*)["']/gi)];
    const expectedGygLocale = gygLocales[expectedLang];
    for (const match of gygLinks) {
      const gygUrl = match[1];
      if (!gygUrl.includes(`locale=${expectedGygLocale}`)) {
        console.error(`[FAIL] ${rel}: GetYourGuide URL missing locale=${expectedGygLocale}: ${gygUrl.slice(0, 80)}...`);
        errors++;
      }
    }
  }
}

if (errors === 0) {
  console.log(`[PASS] All ${checkedCount} public routes verified! 100% compliant with HTML lang, canonicals, 7x hreflangs, and GetYourGuide locale localization!`);
  process.exit(0);
} else {
  console.error(`[FAILED] Found ${errors} validation errors.`);
  process.exit(1);
}
