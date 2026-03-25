/**
 * ChittyBrand CDN — serves brand assets from R2 at brand.chitty.cc
 * @canon chittycanon://docs/tech/spec/brand-cdn
 */

interface Env {
  BRAND_ASSETS: R2Bucket;
  ENVIRONMENT: string;
}

interface ServiceMeta {
  name: string;
  description: string;
  domain: string;
}

// Ecosystem service metadata for OG image generation
const SERVICES: Record<string, ServiceMeta> = {
  'chittyid':        { name: 'ChittyID',        description: 'Universal entity identity — the trust anchor for all ChittyOS services',         domain: 'id' },
  'chittytrust':     { name: 'ChittyTrust',      description: 'Trust resolution and scoring across the ChittyOS ecosystem',                     domain: 'trust' },
  'chittyauth':      { name: 'ChittyAuth',       description: 'Authentication and authorization for ChittyOS services',                         domain: 'auth' },
  'chittycert':      { name: 'ChittyCert',       description: 'Service certification and compliance verification',                              domain: 'cert' },
  'chittyregister':  { name: 'ChittyRegister',   description: 'Service registration and ecosystem onboarding',                                  domain: 'register' },
  'chittyconnect':   { name: 'ChittyConnect',    description: 'AI-intelligent spine — REST API, MCP server, GitHub App',                        domain: 'connect' },
  'chittyrouter':    { name: 'ChittyRouter',     description: 'Intelligent gateway with AI-powered routing and circuit breaking',                domain: 'router' },
  'chittyapi':       { name: 'ChittyAPI',        description: 'Unified API gateway for the ChittyOS platform',                                  domain: 'api' },
  'chittymonitor':   { name: 'ChittyMonitor',    description: 'Observability and health monitoring across all services',                         domain: 'monitor' },
  'chittyevidence':  { name: 'ChittyEvidence',   description: 'Evidence processing, chain of custody, and forensic analysis',                    domain: 'evidence' },
  'chittyintel':     { name: 'ChittyIntel',      description: 'Intelligence analysis and pattern detection',                                    domain: 'intel' },
  'chittyscore':     { name: 'ChittyScore',      description: 'Trust scoring and reputation computation',                                       domain: 'score' },
  'chittycases':     { name: 'ChittyCases',      description: 'Case management for legal and compliance workflows',                             domain: 'cases' },
  'chittydashboard': { name: 'ChittyDashboard',  description: 'Unified dashboard for ecosystem visibility',                                     domain: 'dashboard' },
  'chittyregistry':  { name: 'ChittyRegistry',   description: 'Universal service registry with discovery and AI recommendations',               domain: 'registry' },
  'chittymcp':       { name: 'ChittyMCP',        description: 'Model Context Protocol servers for Claude integration',                          domain: 'mcp' },
  'chittymarket':    { name: 'ChittyMarket',     description: 'Claude Code marketplace — skills, agents, hooks, MCP servers',                   domain: 'market' },
  'chittycore':      { name: 'ChittyCore',       description: 'Shared @chittyos/core package — ID, auth, brand, canon, agents',                 domain: 'core' },
  'chittycanon':     { name: 'ChittyCanon',      description: 'Canonical governance, ontology, and pattern standards',                          domain: 'canon' },
  'chittybrand':     { name: 'ChittyBrand',      description: 'Official brand assets and design tokens for the ecosystem',                      domain: 'brand' },
  'chittyos':        { name: 'ChittyOS',         description: 'Trust infrastructure and intelligent operating system',                          domain: 'chitty' },
  'chittyfinance':   { name: 'ChittyFinance',    description: 'Financial forensics, flow-of-funds analysis, and transaction tracking',          domain: 'finance' },
  'chittyproof':     { name: 'ChittyProof',      description: 'Proof generation and verification for claims and assertions',                    domain: 'proof' },
  'chittyagent':     { name: 'ChittyAgent',      description: 'Multi-agent orchestration framework for autonomous workflows',                   domain: 'agent' },
  'chittyledger':    { name: 'ChittyLedger',     description: 'Immutable fact ledger with chain of custody and contradiction detection',        domain: 'ledger' },
};

function generateLandingPage(): string {
  const servicesByTier: Record<string, { name: string; domain: string; desc: string }[]> = {
    '0 — Trust Anchors': [
      { name: 'ChittyID', domain: 'id', desc: 'Universal entity identity' },
      { name: 'ChittyTrust', domain: 'trust', desc: 'Trust resolution and scoring' },
    ],
    '1 — Core Identity': [
      { name: 'ChittyAuth', domain: 'auth', desc: 'Authentication and authorization' },
      { name: 'ChittyCert', domain: 'cert', desc: 'Certification and compliance' },
      { name: 'ChittyRegister', domain: 'register', desc: 'Service registration' },
    ],
    '2 — Platform': [
      { name: 'ChittyConnect', domain: 'connect', desc: 'AI-intelligent spine — REST API, MCP, GitHub App' },
      { name: 'ChittyRouter', domain: 'router', desc: 'Intelligent gateway and routing' },
      { name: 'ChittyAPI', domain: 'api', desc: 'Unified API gateway' },
    ],
    '3 — Operational': [
      { name: 'ChittyMonitor', domain: 'monitor', desc: 'Observability and health monitoring' },
      { name: 'ChittyRegistry', domain: 'registry', desc: 'Service discovery and catalog' },
    ],
    '4 — Domain': [
      { name: 'ChittyEvidence', domain: 'evidence', desc: 'Evidence processing and chain of custody' },
      { name: 'ChittyIntel', domain: 'intel', desc: 'Intelligence analysis' },
      { name: 'ChittyScore', domain: 'score', desc: 'Trust scoring and reputation' },
      { name: 'ChittyLedger', domain: 'ledger', desc: 'Immutable fact ledger' },
    ],
    '5 — Application': [
      { name: 'ChittyCases', domain: 'cases', desc: 'Case management' },
      { name: 'ChittyDashboard', domain: 'dashboard', desc: 'Ecosystem visibility' },
      { name: 'ChittyMarket', domain: 'market', desc: 'Claude Code marketplace' },
    ],
  };

  const tierSections = Object.entries(servicesByTier).map(([tier, services]) => {
    const rows = services.map(s =>
      `<a href="https://${s.domain}.chitty.cc/health" class="service" target="_blank">
        <span class="svc-name">${s.name}</span>
        <span class="svc-desc">${s.desc}</span>
        <span class="svc-domain">${s.domain}.chitty.cc</span>
      </a>`
    ).join('\n');
    return `<div class="tier"><h3>Tier ${tier}</h3>${rows}</div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>ChittyOS — Trust Infrastructure</title>
  <meta name="description" content="Trust infrastructure and intelligent operating system for verification, identity, and evidence.">
  <meta property="og:title" content="ChittyOS">
  <meta property="og:description" content="Trust infrastructure and intelligent operating system for verification, identity, and evidence.">
  <meta property="og:image" content="https://brand.chitty.cc/og/chittyos.svg">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://chitty.cc">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="https://brand.chitty.cc/logos/mark/chittyos-mark.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap" rel="stylesheet">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{background:#0F0F1A;color:#F5F3FF;font-family:'Figtree',system-ui,sans-serif;min-height:100vh}
    .gradient-bar{height:4px;background:linear-gradient(90deg,#6366f1,#8b5cf6)}
    .container{max-width:1080px;margin:0 auto;padding:0 24px}
    header{padding:80px 0 40px}
    .logo{display:flex;align-items:center;gap:16px;margin-bottom:32px}
    .logo-mark{width:56px;height:56px;border-radius:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-size:32px;font-weight:800;color:#fff}
    .logo-text{font-family:'Syne',sans-serif;font-size:32px;font-weight:700;background:linear-gradient(135deg,#6366f1,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
    .tagline{font-size:20px;color:#A5B4FC;margin-bottom:16px;font-weight:400}
    .desc{font-size:16px;color:#818CF8;max-width:640px;line-height:1.6}
    .tiers{padding:40px 0 80px}
    .tier{margin-bottom:32px}
    .tier h3{font-family:'Syne',sans-serif;font-size:14px;font-weight:600;color:#6366f1;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #1E1B4B}
    .service{display:grid;grid-template-columns:180px 1fr auto;gap:12px;align-items:center;padding:12px 16px;border-radius:8px;text-decoration:none;color:inherit;transition:background 0.15s}
    .service:hover{background:#1E1B4B}
    .svc-name{font-family:'Syne',sans-serif;font-weight:700;font-size:15px;color:#F5F3FF}
    .svc-desc{font-size:14px;color:#A5B4FC}
    .svc-domain{font-family:'JetBrains Mono',monospace;font-size:13px;color:#818CF8;text-align:right}
    footer{padding:40px 0;border-top:1px solid #1E1B4B;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px}
    footer a{color:#818CF8;text-decoration:none;font-size:14px}
    footer a:hover{color:#A5B4FC}
    .links{display:flex;gap:24px}
    .copy{font-size:13px;color:#6B7280}
    @media(max-width:768px){
      .service{grid-template-columns:1fr;gap:4px}
      .svc-domain{text-align:left}
    }
  </style>
</head>
<body>
  <div class="gradient-bar"></div>
  <div class="container">
    <header>
      <div class="logo">
        <div class="logo-mark">C</div>
        <div class="logo-text">ChittyOS</div>
      </div>
      <p class="tagline">Making proof as frictionless as speech</p>
      <p class="desc">Trust infrastructure and intelligent operating system for verification, identity, and evidence. A distributed platform of Cloudflare Workers powering identity resolution, evidence processing, trust scoring, and service orchestration.</p>
    </header>
    <section class="tiers">
      <h2 style="font-family:'Syne',sans-serif;font-size:24px;font-weight:700;margin-bottom:24px">Services</h2>
      ${tierSections}
    </section>
    <footer>
      <div class="links">
        <a href="https://github.com/chittyos">GitHub</a>
        <a href="https://registry.chitty.cc">Registry</a>
        <a href="https://brand.chitty.cc/manifest.json">Brand Assets</a>
      </div>
      <span class="copy">&copy; ${new Date().getFullYear()} ChittyOS</span>
    </footer>
  </div>
</body>
</html>`;
}

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const CONTENT_TYPES: Record<string, string> = {
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.css': 'text/css',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
};

const CACHE_MAX_AGE = 86400; // 1 day
const IMMUTABLE_MAX_AGE = 31536000; // 1 year

function getContentType(path: string): string {
  const ext = path.substring(path.lastIndexOf('.'));
  return CONTENT_TYPES[ext] || 'application/octet-stream';
}

function getCacheControl(path: string): string {
  // Versioned paths (e.g., /v1/logos/mark.svg) are immutable
  if (/^\/v\d+\//.test(path)) {
    return `public, max-age=${IMMUTABLE_MAX_AGE}, immutable`;
  }
  return `public, max-age=${CACHE_MAX_AGE}`;
}

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
    'Access-Control-Max-Age': '86400',
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }

    // Landing page at chitty.cc
    const host = url.hostname;
    if (host === 'chitty.cc' && (path === '/' || path === '')) {
      return new Response(generateLandingPage(), {
        headers: {
          'Content-Type': 'text/html;charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          ...corsHeaders(),
        },
      });
    }

    // Health check
    if (path === '/health') {
      return Response.json({
        status: 'ok',
        service: 'chittybrand-cdn',
        environment: env.ENVIRONMENT,
      });
    }

    // Asset manifest
    if (path === '/manifest.json') {
      return Response.json({
        name: 'ChittyBrand CDN',
        version: '1.0.0',
        base: 'https://brand.chitty.cc',
        assets: {
          'logos/mark': '/logos/mark/chittyos-mark.svg',
          'logos/mark-dark': '/logos/mark/chittyos-mark-dark.svg',
          'logos/wordmark': '/logos/wordmark/chittyos-wordmark.svg',
          'logos/wordmark-white': '/logos/wordmark/chittyos-wordmark-white.svg',
          'logos/lockup': '/logos/lockup/chittyos-lockup.svg',
          'tokens': '/tokens/design-tokens.json',
          'og-template': '/og-images/og-template.svg',
        },
      }, {
        headers: {
          ...corsHeaders(),
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
        },
      });
    }

    // Only GET/HEAD
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    // Dynamic OG image generation: /og/{service}.svg
    const ogMatch = path.match(/^\/og\/([a-z]+)\.svg$/);
    if (ogMatch) {
      const serviceKey = ogMatch[1];
      const meta = SERVICES[serviceKey];
      if (!meta) {
        return Response.json(
          { error: 'Unknown service', service: serviceKey, available: Object.keys(SERVICES) },
          { status: 404, headers: corsHeaders() }
        );
      }

      const templateObj = await env.BRAND_ASSETS.get('og-images/og-template.svg');
      if (!templateObj) {
        return Response.json(
          { error: 'OG template not found in R2' },
          { status: 500, headers: corsHeaders() }
        );
      }

      const template = await templateObj.text();
      const svg = template
        .replace('{{SERVICE_NAME}}', xmlEscape(meta.name))
        .replace('{{DESCRIPTION}}', xmlEscape(meta.description))
        .replace('{{DOMAIN}}', xmlEscape(meta.domain));

      return new Response(svg, {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': `public, max-age=${CACHE_MAX_AGE}`,
          ...corsHeaders(),
        },
      });
    }

    // Strip leading slash for R2 key
    const key = path.startsWith('/') ? path.slice(1) : path;

    if (!key) {
      return Response.redirect('https://github.com/chittycorp/chittybrand', 302);
    }

    const object = await env.BRAND_ASSETS.get(key);
    if (!object) {
      return Response.json(
        { error: 'Not Found', path },
        { status: 404, headers: corsHeaders() }
      );
    }

    const headers = new Headers({
      'Content-Type': getContentType(key),
      'Cache-Control': getCacheControl(path),
      'ETag': object.httpEtag,
      ...corsHeaders(),
    });

    if (object.customMetadata?.['content-disposition']) {
      headers.set('Content-Disposition', object.customMetadata['content-disposition']);
    }

    if (request.method === 'HEAD') {
      return new Response(null, { headers });
    }

    return new Response(object.body, { headers });
  },
} satisfies ExportedHandler<Env>;
