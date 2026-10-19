import type { ImgHTMLAttributes } from 'react';
import type { ImageFile, SiteImage } from '@/lib/content';
import { cn } from '@/lib/cn';

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> & { image: SiteImage };

/**
 * An image for both themes: the light file, and the dark one when the resolved theme is dark. With a dark file both
 * <img> are in the markup and site.css hides one by html[data-theme] (set before first paint), so the server and
 * the client render the same thing: no flash of the wrong picture, no hydration mismatch, and no layout shift (both
 * share the classes, so they take the same box). A hidden lazy image is never fetched. Without a dark file it is a
 * single <img> for both themes. Plain <img> on purpose: local files are already sized, and content-service files
 * come with their own srcset.
 */
export function ThemedImage({ image, alt, className, sizes, ...rest }: Props) {
  const img = (f: ImageFile, cls?: string) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...rest}
      src={f.src}
      srcSet={f.srcSet}
      sizes={f.srcSet ? sizes || '100vw' : undefined}
      width={f.w || undefined}
      height={f.h || undefined}
      alt={alt ?? image.alt}
      className={cn(className, cls)}
    />
  );
  if (!image.dark) return img(image);
  return (
    <>
      {img(image, 'th-l')}
      {img(image.dark, 'th-d')}
    </>
  );
}
