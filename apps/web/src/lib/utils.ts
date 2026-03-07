export { formatPrice, calculateDiscountPercent, generateSlug, truncate } from '@kids-gallery/shared';

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
