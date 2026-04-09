import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('L Melton'),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    series: z.string().optional(),
    draft: z.boolean().default(false),
    coverImage: z.string().optional(),
    canonicalUrl: z.string().url().optional(),
  }),
});

export const collections = { blog };
