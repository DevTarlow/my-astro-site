import type { APIRoute } from 'astro'
import { getPublicBlog } from '../lib/posts'
import { plainText } from '../lib/excerpt'

/**
 * Post bodies for the client-side search box, keyed by post id.
 *
 * The listing pages inline the titles, descriptions and tags so results are
 * instant, but inlining every body would add well over 100KB to each of them.
 * The search box fetches this on first interaction instead, which is why the
 * box can now find words that only appear in the text of a post.
 */
export const GET: APIRoute = async () => {
  const posts = await getPublicBlog()

  const index: Record<string, string> = {}
  for (const post of posts) {
    index[post.id] = plainText(post.body ?? '')
  }

  return new Response(JSON.stringify(index), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  })
}
