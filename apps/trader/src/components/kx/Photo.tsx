import Image from 'next/image';
import { PHOTOS, type PhotoKey } from '@/content/photos';
import { cn } from '@/lib/cn';

/**
 * One of the founder's photos, cropped to fill its box (object-cover). `maxCss` is the widest the box gets in CSS
 * pixels; it must stay at or under half the file's width so the photo is sharp on 2× screens.
 */
export function Photo({ k, sizes, className, alt, priority = false, pos }: { k: PhotoKey; sizes: string; className?: string; alt?: string; priority?: boolean; pos?: string }) {
  const p = PHOTOS[k];
  return (
    <Image
      src={p.src}
      alt={alt ?? p.alt}
      fill
      sizes={sizes}
      quality={80}
      priority={priority}
      className={cn('kx-photo object-cover', className)}
      style={{ objectPosition: pos ?? p.pos }}
    />
  );
}
