import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

// Load .env manually without external dependencies
try {
  const envPath = path.resolve('.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || '').trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
} catch (e) {
  // ignore
}

const API_KEY = process.env.POSTHOG_PERSONAL_API_KEY;
const PROJECT_ID = process.env.POSTHOG_PROJECT_ID || '686061';

if (!API_KEY) {
  console.error('Error: POSTHOG_PERSONAL_API_KEY is not defined in your environment or .env file.');
  process.exit(1);
}

async function queryHogQL(sql) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      query: {
        kind: 'HogQLQuery',
        query: sql
      }
    });

    const req = https.request({
      hostname: 'us.posthog.com',
      path: `/api/projects/${PROJECT_ID}/query/`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'LankaWayfinder-Analytics'
      }
    }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results || []);
        } catch (e) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

async function generateExecutiveReport() {
  console.log('\n============================================================');
  console.log('       LANKAWAYFINDER.TOURS — POSTHOG EXECUTIVE REPORT      ');
  console.log('============================================================\n');

  try {
    // 1. Overall Traffic Summary (Last 7 Days)
    const trafficSummary = await queryHogQL(`
      SELECT 
        countIf(event = '$pageview') as pageviews,
        countDistinctIf(distinct_id, event = '$pageview') as unique_visitors,
        countIf(event = 'affiliate_click') as affiliate_clicks,
        countIf(event = 'lead_click') as driver_leads
      FROM events
      WHERE timestamp >= now() - interval 7 day
    `);

    const [views = 0, visitors = 0, gygClicks = 0, leads = 0] = trafficSummary[0] || [0, 0, 0, 0];

    console.log('📊 7-DAY TRAFFIC & REVENUE METRICS:');
    console.log(`   • Pageviews:           ${views}`);
    console.log(`   • Unique Visitors:     ${visitors}`);
    console.log(`   • GetYourGuide Clicks: ${gygClicks}`);
    console.log(`   • WhatsApp Inquiries:  ${leads}`);
    console.log('');

    // 2. Top Performing Guides / Pages
    const topPages = await queryHogQL(`
      SELECT 
        properties.$current_url as url,
        count() as views
      FROM events
      WHERE event = '$pageview' AND timestamp >= now() - interval 7 day
      GROUP BY url
      ORDER BY views DESC
      LIMIT 5
    `);

    console.log('📄 TOP 5 VISITED PAGES (LAST 7 DAYS):');
    if (topPages.length === 0) {
      console.log('   (No pageview traffic recorded yet)');
    } else {
      topPages.forEach(([url, count], idx) => {
        console.log(`   ${idx + 1}. ${url} — ${count} views`);
      });
    }
    console.log('');

    // 3. Affiliate Clicks Breakdown
    const affiliateBreakdown = await queryHogQL(`
      SELECT 
        properties.url as gyg_tour,
        properties.page as referring_guide,
        count() as clicks
      FROM events
      WHERE event = 'affiliate_click' AND timestamp >= now() - interval 7 day
      GROUP BY gyg_tour, referring_guide
      ORDER BY clicks DESC
      LIMIT 5
    `);

    console.log('🎯 TOP AFFILIATE CLICKS (GETYOURGUIDE):');
    if (affiliateBreakdown.length === 0) {
      console.log('   (No affiliate clicks recorded yet)');
    } else {
      affiliateBreakdown.forEach(([tour, guide, clicks], idx) => {
        console.log(`   ${idx + 1}. Guide: ${guide} -> ${clicks} clicks (${tour})`);
      });
    }
    console.log('');

    // 4. Traffic Sources & Referrers
    const referrers = await queryHogQL(`
      SELECT 
        properties.$referrer as referrer,
        count() as count
      FROM events
      WHERE event = '$pageview' AND timestamp >= now() - interval 7 day
      GROUP BY referrer
      ORDER BY count DESC
      LIMIT 5
    `);

    console.log('🌐 TOP TRAFFIC REFERRERS:');
    if (referrers.length === 0) {
      console.log('   (No referrer data yet)');
    } else {
      referrers.forEach(([ref, count], idx) => {
        console.log(`   ${idx + 1}. ${ref || 'Direct / Organic Search'} — ${count} visits`);
      });
    }
    console.log('\n============================================================\n');

  } catch (err) {
    console.error('Error querying PostHog reports:', err.message);
  }
}

generateExecutiveReport();
