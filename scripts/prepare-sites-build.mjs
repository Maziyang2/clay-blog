import { mkdir, rename, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = join(projectRoot, 'dist');
const astroOutputDir = join(projectRoot, '.sites-astro-output');
const clientDir = join(distDir, 'client');
const serverDir = join(distDir, 'server');

await rm(astroOutputDir, { recursive: true, force: true });
await rename(distDir, astroOutputDir);
await mkdir(distDir, { recursive: true });
await rename(astroOutputDir, clientDir);
await mkdir(serverDir, { recursive: true });

const worker = `const ORIGIN_PLACEHOLDER = 'https://clay-blog.invalid';

const isTextResponse = (contentType = '') =>
  contentType.startsWith('text/') ||
  contentType.includes('json') ||
  contentType.includes('xml');

const responseHeaders = (response) => {
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
  return headers;
};

export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    const headers = responseHeaders(response);

    if (!response.body || !isTextResponse(headers.get('content-type') ?? '')) {
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }

    const origin = new URL(request.url).origin;
    const body = (await response.text()).replaceAll(ORIGIN_PLACEHOLDER, origin);

    return new Response(body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
`;

const wranglerConfig = {
  name: 'maziyang2-clay-blog',
  compatibility_date: '2026-08-13',
  compatibility_flags: ['nodejs_compat'],
  main: 'index.js',
  no_bundle: true,
  rules: [{ type: 'ESModule', globs: ['**/*.js', '**/*.mjs'] }],
  assets: {
    directory: '../client',
    html_handling: 'auto-trailing-slash',
    not_found_handling: '404-page',
  },
  observability: { enabled: true },
};

await writeFile(join(serverDir, 'index.js'), worker);
await writeFile(
  join(serverDir, 'wrangler.json'),
  `${JSON.stringify(wranglerConfig)}\n`,
);
