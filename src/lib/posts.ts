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

export function getRelatedPosts(
  current: CollectionEntry<'blog'>,
  all: CollectionEntry<'blog'>[],
  limit = 3
): CollectionEntry<'blog'>[] {
  const currentTags = new Set(current.data.tags ?? [])
  if (currentTags.size === 0) return []

  const scored = all
    .filter((p) => p.id !== current.id)
    .map((p) => {
      const overlap = (p.data.tags ?? []).filter((t) => currentTags.has(t)).length
      return { post: p, score: overlap }
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      return b.post.data.pubDate.getTime() - a.post.data.pubDate.getTime()
    })

  return scored.slice(0, limit).map((p) => p.post)
}
