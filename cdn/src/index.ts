/**
 * ChittyBrand CDN — serves brand assets from R2 at brand.chitty.cc
 * @canon chittycanon://docs/tech/spec/brand-cdn
 */

interface Env {
  BRAND_ASSETS: R2Bucket;
  ENVIRONMENT: string;
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
