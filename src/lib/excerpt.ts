/**
 * Plain-text excerpt for post cards.
 *
 * Strips markdown syntax (fences, links, images, headings, lists, blockquotes,
 * tables, emphasis) before truncating on a word boundary. Blockquote markers
 * used to leak through as literal `> "` artifacts, so they are removed per line.
 */
export function excerpt(body: string, max = 250): string {
  const text = body
    .replace(/^---[\s\S]*?---\n*/m, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/^\s{0,3}>\s?/gm, '')
    .replace(/^\s{0,3}#{1,6}\s+/gm, '')
    .replace(/^\s{0,3}(?:[-*+]|\d+\.)\s+/gm, '')
    .replace(/^\s*\|.*\|\s*$/gm, ' ')
    .replace(/[*_~]/g, '')
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, ' ')
    .trim()

  if (text.length <= max) return text

  const clipped = text.slice(0, max).replace(/\s+\S*$/, '')
  return `${clipped.replace(/[\s,;:.!?-]+$/, '')}\u2026`
}
