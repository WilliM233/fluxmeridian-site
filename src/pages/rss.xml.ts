import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { marked } from 'marked';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const sorted = posts.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

  return rss({
    title: 'Project Flux Meridian Blog',
    description:
      'Thoughts on building tools for ADHD, open-source development, and technology access.',
    site: context.site!,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id}`,
      content: post.body ? String(marked.parse(post.body)) : undefined,
      customData: post.data.canonicalUrl
        ? `<link rel="canonical" href="${post.data.canonicalUrl}" />`
        : undefined,
      categories: post.data.tags,
    })),
  });
}
