'use client';

import { usePathname } from 'next/navigation';

/**
 * Shown only in draft mode (the Back Office's content preview): what is showing, and the way out. "Exit" goes
 * through /api/content-preview?exit=1, which turns draft mode off and comes back to this page.
 */
export function PreviewBadge({ state }: { state: 'drafts' | 'expired' | 'published' }) {
  const path = usePathname() || '/';
  const says = state === 'drafts' ? 'Drafts are showing' : state === 'expired' ? 'Preview expired, showing published copy' : 'Showing published copy';
  return (
    <div className="s-preview notranslate" translate="no" role="status">
      <b>Preview</b>
      <span>{says}</span>
      <a href={`/api/content-preview?exit=1&path=${encodeURIComponent(path)}`}>Exit</a>
    </div>
  );
}
