import { cookies, draftMode } from 'next/headers';
import type { NextRequest } from 'next/server';
import { PREVIEW_COOKIE, isPreviewToken, previewPath } from '@/lib/content';

/**
 * GET /api/content-preview?token=…&path=/about: the Back Office's "Preview" button. Turns on Next draft mode, keeps
 * the content service's preview token (30 minutes, like the token itself) in an httpOnly cookie and sends the
 * visitor to `path` (same-site paths only). Pages then render per request with the drafts (lib/content.ts).
 * GET /api/content-preview?exit=1&path=/about leaves the preview.
 */
export const dynamic = 'force-dynamic';

const go = (path: string) => new Response(null, { status: 307, headers: { Location: path, 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer' } });

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const path = previewPath(q.get('path'));
  const draft = await draftMode();
  const jar = await cookies();

  if (q.has('exit')) {
    draft.disable();
    jar.delete(PREVIEW_COOKIE);
    return go(path);
  }

  const token = q.get('token');
  if (!isPreviewToken(token)) {
    return new Response('This preview link is not valid. Open the preview again from the Back Office.', { status: 400, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
  }
  draft.enable();
  jar.set(PREVIEW_COOKIE, token, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 30 * 60 });
  return go(path);
}
