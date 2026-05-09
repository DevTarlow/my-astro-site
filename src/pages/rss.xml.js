import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'

export async function GET(context) {
  const posts = await getCollection('blog')
  posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())

  return rss({
    title: 'Tarlow.space',
    description: 'A corner of the web built with intention — projects, local-first tools, and AI exploration.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
  })
}
