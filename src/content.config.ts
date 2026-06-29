import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    lede: z.string(),
    story: z.string(),
    stack: z.array(z.string()),
    url: z.string().nullable(),
    showPipelineDiagram: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    meta: z.string(),
    image: z.string().nullable(),
  }),
});

export const collections = { projects, writing };
