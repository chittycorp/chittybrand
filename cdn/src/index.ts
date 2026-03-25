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
