/**
 * Downloads the self-hosted font files into public/fonts/.
 *
 * These used to come from fonts.googleapis.com, which put a render-blocking
 * third-party stylesheet and extra connections in front of first paint.
 * Inter is the variable body font (one file covers 400 to 700); Instrument
 * Serif is the display face, with separate roman and italic files.
 *
 * Run with `npm run fonts`; the output is committed. The matching @font-face
 * rules live in src/styles/global.css. If the unicode ranges change, update
 * them there too.
 */
import { mkdirSync, writeFileSync } from 'node:fs'

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'
const INTER_CSS = 'https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap'
const SERIF_CSS = 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap'

async function fetchCss (url) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`font CSS request failed: ${res.status}`)
  return res.text()
}

/**
 * @param {string} css
 * @param {{ family: string, subset: 'latin' | 'latin-ext', style?: 'normal' | 'italic' }} wanted
 */
function findFace (css, wanted) {
  const blocks = [...css.matchAll(/@font-face\s*\{([\s\S]*?)\}/g)].map((match) => match[1])
  const block = blocks.find((body) => {
    const family = body.match(/font-family:\s*'([^']+)'/)?.[1]
    const style = body.match(/font-style:\s*([^;]+);/)?.[1].trim() ?? 'normal'
    const range = body.match(/unicode-range:\s*([^;]+);/)?.[1] ?? ''
    const isLatin = range.includes('U+0000-00FF')
    const isLatinExt = range.includes('U+0100')
    const subsetMatches = wanted.subset === 'latin' ? isLatin : isLatinExt
    return family === wanted.family && style === (wanted.style ?? 'normal') && subsetMatches
  })
  if (!block) throw new Error(`no @font-face for ${wanted.family} (${wanted.subset}, ${wanted.style ?? 'normal'})`)
  const url = block.match(/url\((https:[^)]+\.woff2)\)/)?.[1]
  if (!url) throw new Error(`no woff2 url for ${wanted.family} (${wanted.subset})`)
  return url
}

async function download (url, filename) {
  const res = await fetch(url, { headers: { 'User-Agent': UA } })
  if (!res.ok) throw new Error(`font download failed for ${filename}: ${res.status}`)
  const bytes = Buffer.from(await res.arrayBuffer())
  writeFileSync(`public/fonts/${filename}`, bytes)
  console.log(`${filename} ${Math.round(bytes.length / 1024)}KB`)
}

mkdirSync('public/fonts', { recursive: true })

const interCss = await fetchCss(INTER_CSS)
await download(findFace(interCss, { family: 'Inter', subset: 'latin' }), 'inter-latin-var.woff2')
await download(findFace(interCss, { family: 'Inter', subset: 'latin-ext' }), 'inter-latin-ext-var.woff2')

const serifCss = await fetchCss(SERIF_CSS)
await download(findFace(serifCss, { family: 'Instrument Serif', subset: 'latin' }), 'instrument-serif-latin.woff2')
await download(findFace(serifCss, { family: 'Instrument Serif', subset: 'latin', style: 'italic' }), 'instrument-serif-latin-italic.woff2')
