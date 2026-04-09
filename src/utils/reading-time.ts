/**
 * Calculate estimated reading time from raw text content.
 */
export function getReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
    return `${minutes} min read`;
}
