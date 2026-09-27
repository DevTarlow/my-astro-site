import rss from '@astrojs/rss'
import { getPublishedBlog } from '../lib/posts'

export async function GET(context) {
  const posts = await getPublishedBlog()
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())

  // Feeds that omit a build date make readers re-check every item; the newest
  // post date is the honest signal here.
  const latest = posts[0]?.data.pubDate

  return rss({
    title: 'Tarlow.space',
    description: 'A corner of the web built with intention - projects, local-first tools, and AI exploration.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: [
      '<language>en-us</language>',
      latest ? `<lastBuildDate>${latest.toUTCString()}</lastBuildDate>` : '',
    ].filter(Boolean).join(''),
  })
}
