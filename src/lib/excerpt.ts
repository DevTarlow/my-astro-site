export function excerpt(body: string, max = 250): string {
  return body
    .replace(/^---[\s\S]*?---\n*/m, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#*_>`[\]()!-]{2,}/g, '')
    .replace(/^- /gm, '')
    .replace(/\n+/g, ' ')
    .trim()
    .slice(0, max)
    .replace(/\s+\S*$/, '') + '…'
}
