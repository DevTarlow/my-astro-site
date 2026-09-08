/**
 * Rehype plugin: upgrade markdown images that point at /images/... into
 * responsive <picture> markup using the variants produced by
 * scripts/optimize-images.mjs. Also stamps width/height and lazy loading so
 * body images no longer cause layout shift.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const SIZES = '(max-width: 768px) 100vw, 65ch'

function loadManifest () {
  const file = path.join(process.cwd(), 'public', 'images', '_opt', 'manifest.json')
  if (!existsSync(file)) return {}
  try {
    return JSON.parse(readFileSync(file, 'utf8')).images ?? {}
  } catch {
    return {}
  }
}

function toPicture (img, entry) {
  const srcset = entry.variants.map((v) => `${v.url} ${v.w}w`).join(', ')
  return {
    type: 'element',
    tagName: 'picture',
    properties: { className: ['contents'] },
    children: [
      {
        type: 'element',
        tagName: 'source',
        properties: { type: 'image/webp', srcSet: srcset, sizes: SIZES },
        children: [],
      },
      img,
    ],
  }
}

export default function rehypeOptimizeImages () {
  const images = loadManifest()

  return function (tree) {
    function walk (node) {
      if (!node || typeof node !== 'object' || !Array.isArray(node.children)) return
      node.children = node.children.map(function (child) {
        walk(child)
        if (child && child.type === 'element' && child.tagName === 'img') {
          const src = child.properties && child.properties.src
          if (typeof src === 'string' && src.startsWith('/images/')) {
            child.properties.loading = child.properties.loading ?? 'lazy'
            child.properties.decoding = 'async'
            const entry = images[src]
            if (entry && entry.variants && entry.variants.length > 0) {
              child.properties.width = child.properties.width ?? entry.width
              child.properties.height = child.properties.height ?? entry.height
              return toPicture(child, entry)
            }
          }
        }
        return child
      })
    }
    walk(tree)
    return tree
  }
}
