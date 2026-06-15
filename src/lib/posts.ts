import { getCollection, type CollectionEntry } from 'astro:content'

export async function getPublicBlog(): Promise<CollectionEntry<'blog'>[]> {
  const entries = await getCollection('blog')
  if (import.meta.env.PROD) {
    return entries.filter((entry) => !entry.data.draft)
  }
  return entries
}

export async function getPublicProjects(): Promise<CollectionEntry<'projects'>[]> {
  const entries = await getCollection('projects')
  if (import.meta.env.PROD) {
    return entries.filter((entry) => !entry.data.draft)
  }
  return entries
}

export async function getPublishedBlog(): Promise<CollectionEntry<'blog'>[]> {
  const entries = await getCollection('blog')
  return entries.filter((entry) => !entry.data.draft)
}
