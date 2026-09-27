/**
 * Plain-text views of a markdown body.
 *
 * Strips markdown syntax (fences, links, images, headings, lists, blockquotes,
 * tables, emphasis) and collapses whitespace. Blockquote markers used to leak
 * through as literal `> "` artifacts, so they are removed per line.
 */
export function plainText(body: string): string {
  return body
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
}

/** Truncates the plain text on a word boundary, for post cards. */
export function excerpt(body: string, max = 250): string {
  const text = plainText(body)

  if (text.length <= max) return text

  const clipped = text.slice(0, max).replace(/\s+\S*$/, '')
  return `${clipped.replace(/[\s,;:.!?-]+$/, '')}\u2026`
}
