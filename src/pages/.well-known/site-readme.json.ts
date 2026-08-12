import { siteReadme } from '../../data/site-readme';

export const prerender = true;

export function GET() {
  return new Response(JSON.stringify(siteReadme, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
