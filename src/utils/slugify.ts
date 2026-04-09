/**
 * Convert a tag name to a URL-safe slug.
 */
export function slugifyTag(tag: string): string {
    return tag.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
