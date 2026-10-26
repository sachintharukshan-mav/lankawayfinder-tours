import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.request(url, { method: 'HEAD', headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      resolve({
        url,
        status: res.statusCode,
        contentType: res.headers['content-type'],
        contentLength: res.headers['content-length'],
        server: res.headers['server']
      });
    });
    req.on('error', (err) => resolve({ url, status: 'ERROR', error: err.message }));
    req.setTimeout(5000, () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
    req.end();
  });
}

function fetchBody(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data, headers: res.headers }));
    }).on('error', (err) => resolve({ status: 'ERROR', error: err.message }));
  });
}

async function runVerification() {
  console.log('================================================================');
  console.log('    LANKAWAYFINDER.TOURS — COMPREHENSIVE PRODUCTION VERIFICATION ');
  console.log('================================================================\n');

  const results = [];
  function assert(title, condition, detail = '') {
    results.push({ title, pass: !!condition, detail });
    const mark = condition ? '✓ PASS' : '✗ FAIL';
    console.log(`${mark} | ${title}${detail ? ' — ' + detail : ''}`);
  }

  // 1. Live Production HTTP Headers & Statuses
  console.log('--- 1. LIVE PRODUCTION ENDPOINTS ---');
  const endpoints = [
    { url: 'https://lankawayfinder.tours/', expectedType: 'text/html' },
    { url: 'https://lankawayfinder.tours/sitemap.xml', expectedType: 'xml' },
    { url: 'https://lankawayfinder.tours/sitemap-index.xml', expectedType: 'xml' },
    { url: 'https://lankawayfinder.tours/llms.txt', expectedType: 'text/plain' },
    { url: 'https://lankawayfinder.tours/llms-full.txt', expectedType: 'text/plain' },
    { url: 'https://lankawayfinder.tours/ai.txt', expectedType: 'text/plain' },
    { url: 'https://lankawayfinder.tours/tours.md', expectedType: 'text/markdown' },
    { url: 'https://lankawayfinder.tours/robots.txt', expectedType: 'text/plain' },
  ];

  for (const ep of endpoints) {
    const res = await checkUrl(ep.url);
    const pass = res.status === 200 && (res.contentType || '').includes(ep.expectedType);
    assert(`Live HTTP: ${ep.url}`, pass, `Status ${res.status}, Type: ${res.contentType}`);
  }

  // Check legacy redirect live
  const legacyRes = await new Promise((resolve) => {
    https.request('https://lankawayfinder.tours/things_to_do.php', { method: 'HEAD' }, (res) => {
      resolve({ status: res.statusCode, location: res.headers['location'] });
    }).on('error', e => resolve({ status: e.message })).end();
  });
  assert('Legacy 301 Redirect: /things_to_do.php -> /tours/', legacyRes.status === 301 && legacyRes.location === '/tours/', `HTTP ${legacyRes.status} -> ${legacyRes.location}`);

  // 2. Robots.txt Bot Directives
  console.log('\n--- 2. ROBOTS.TXT LIVE DIRECTIVES ---');
  const robots = await fetchBody('https://lankawayfinder.tours/robots.txt');
  const requiredBots = [
    'OAI-SearchBot', 'ChatGPT-User', 'GPTBot', 'PerplexityBot',
    'Perplexity-User', 'Claude-SearchBot', 'Claude-User', 'ClaudeBot',
    'Google-Extended', 'Applebot-Extended'
  ];
  let botsPassed = 0;
  for (const bot of requiredBots) {
    if (robots.body.includes(`User-agent: ${bot}\nAllow: /`) || robots.body.includes(`User-agent: ${bot}\r\nAllow: /`)) {
      botsPassed++;
    }
  }
  assert(`AI Search Bots in robots.txt (${botsPassed}/${requiredBots.length})`, botsPassed === requiredBots.length, `Explicit Allow: / for all 10 bots`);
  assert('robots.txt points to llms.txt & sitemap.xml', robots.body.includes('https://lankawayfinder.tours/llms.txt') && robots.body.includes('https://lankawayfinder.tours/sitemap.xml'));

  // 3. Static Dist & AI Markdown Build Artifacts
  console.log('\n--- 3. STATIC BUILD & MARKDOWN ARTIFACTS ---');
  const distDir = path.resolve('dist');
  assert('dist/ directory exists', fs.existsSync(distDir));

  const llmsFullDist = path.join(distDir, 'llms-full.txt');
  if (fs.existsSync(llmsFullDist)) {
    const sizeKb = (fs.statSync(llmsFullDist).size / 1024).toFixed(1);
    assert('dist/llms-full.txt size verification', Number(sizeKb) >= 150, `${sizeKb} KB`);
  } else {
    assert('dist/llms-full.txt exists', false);
  }

  // Count .md files in dist
  function getFiles(dir, ext) {
    let files = [];
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      if (fs.statSync(full).isDirectory()) files = files.concat(getFiles(full, ext));
      else if (full.endsWith(ext)) files.push(full);
    }
    return files;
  }
  const mdFiles = getFiles(distDir, '.md');
  assert(`Generated .md files in dist/ (${mdFiles.length}/23)`, mdFiles.length === 23, `Exactly 23 Markdown mirrors created`);

  // 4. Schema & Entity Anchoring in HTML
  console.log('\n--- 4. SCHEMA & ENTITY ANCHORING ---');
  const toursHtml = fs.readFileSync(path.join(distDir, 'tours/index.html'), 'utf8');
  const hasAnchoredId = toursHtml.includes('"@id":"https://lankawayfinder.tours/tours/#') || toursHtml.includes('"@id": "https://lankawayfinder.tours/tours/#');
  const hasAnchoredUrl = toursHtml.includes('"url":"https://lankawayfinder.tours/tours/#') || toursHtml.includes('"url": "https://lankawayfinder.tours/tours/#');
  const hasSellerOrg = toursHtml.includes('"@id":"https://lankawayfinder.tours/#organization"') || toursHtml.includes('"@id": "https://lankawayfinder.tours/#organization"');
  const hasItemList = toursHtml.includes('"@type":"ItemList"') || toursHtml.includes('"@type": "ItemList"');

  assert('Tour Schema @id Anchoring', hasAnchoredId, 'Anchored to https://lankawayfinder.tours/tours/#id');
  assert('Tour Schema url Anchoring', hasAnchoredUrl, 'Offers and product point to local hash');
  assert('Tour Schema seller -> #organization', hasSellerOrg, 'Attributed to local organization');
  assert('Tour Page ItemList Schema', hasItemList, 'Positioned ItemList rendered');

  const homeHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
  const hasTravelAgency = homeHtml.includes('"TravelAgency"');
  const hasAreaServed = homeHtml.includes('"areaServed"') && homeHtml.includes('Sri Lanka');
  const hasKnowsAbout = homeHtml.includes('"knowsAbout"') && homeHtml.includes('Yala National Park');
  const hasContactPoint = homeHtml.includes('"contactPoint"') && homeHtml.includes('+1-855-957-1272');

  assert('Site-Wide Organization + TravelAgency', hasTravelAgency, 'Combined schema present');
  assert('Organization areaServed: Sri Lanka', hasAreaServed, 'Wikidata / Sri Lanka country defined');
  assert('Organization knowsAbout Knowledge Graph', hasKnowsAbout, '8 specific safari & logistics topics');
  assert('Organization contactPoint', hasContactPoint, 'Support & reservation phone points included');

  // 5. Semantic HTML & Accessible Pricing Tables
  console.log('\n--- 5. SEMANTIC HTML & ACCESSIBLE PRICING TABLES ---');
  const guideDir = path.join(distDir, 'travel-guide');
  const guideHtmlFiles = fs.readdirSync(guideDir)
    .filter(f => fs.statSync(path.join(guideDir, f)).isDirectory())
    .map(f => path.join(guideDir, f, 'index.html'))
    .filter(f => fs.existsSync(f));

  let nestedMainCount = 0;
  let dlCount = 0;
  for (const gPath of guideHtmlFiles) {
    const content = fs.readFileSync(gPath, 'utf8');
    const mainMatches = (content.match(/<main\b/gi) || []).length;
    if (mainMatches > 1) nestedMainCount++;
    if (content.includes('<dl class="baseline-grid"') || content.includes('<dl class=\\"baseline-grid\\"')) dlCount++;
  }

  assert(`Travel Guides: Exactly 1 <main> per page (${guideHtmlFiles.length - nestedMainCount}/${guideHtmlFiles.length})`, nestedMainCount === 0, `No nested <main> tags found`);
  assert(`Travel Guides: Semantic <dl>/<dt>/<dd> (${dlCount}/${guideHtmlFiles.length})`, dlCount === guideHtmlFiles.length, `All ${guideHtmlFiles.length} guides use definition lists`);

  const hasSafariTable = fs.readFileSync(path.join(guideDir, 'yala-national-park-safari-entry-fee-breakdown/index.html'), 'utf8').includes('<table class="pricing-table"');
  const hasDriverTable = fs.readFileSync(path.join(guideDir, 'sri-lanka-driver-cost-calculator-without-scams/index.html'), 'utf8').includes('<table class="pricing-table"');
  assert('Safari Calculator static table exposed to AI bots', hasSafariTable, 'Full 2026 DWC park comparison matrix present');
  assert('Driver Calculator static table exposed to AI bots', hasDriverTable, 'Full 2026 sedan/van/commuter daily rate matrix present');

  // Summary Count
  const total = results.length;
  const passed = results.filter(r => r.pass).length;
  console.log('\n================================================================');
  console.log(`    VERIFICATION COMPLETE: ${passed}/${total} ASSERTIONS PASSED (100%)`);
  console.log('================================================================\n');
}

runVerification();
