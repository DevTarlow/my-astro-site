/** Rough reading time from a Markdown body, at 220 words per minute. */
export function readingMinutes(body: string | undefined): number {
  if (!body) return 1
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (!text) return 1
  return Math.max(1, Math.ceil(text.split(' ').length / 220))
}
