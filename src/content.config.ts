import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    featuredimage: z.string().optional(),
    draft: z.boolean().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    github: z.string().optional(),
    url: z.string().optional(),
    /** Status line shown as a callout on the project page, e.g. paused or retired. */
    notice: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().optional(),
    category: z.enum(['Launched', 'Development', 'Paused']).optional(),
  }),
})

export const collections = { blog, projects }
