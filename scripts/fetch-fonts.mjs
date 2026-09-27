/**
 * Downloads the self-hosted Inter subsets into public/fonts/.
 *
 * The site used to load Inter from fonts.googleapis.com, which put a
 * render-blocking third-party stylesheet and two extra connections in front of
 * first paint. These are the latin and latin-ext subsets of the variable font
 * (one file covers weights 400 to 700), so a page only ever fetches what it
 * renders. Run with `npm run fonts`; the output is committed.
 *
 * The matching @font-face rules live in src/styles/global.css. If you re-run
 * this and the unicode ranges change, update them there too.
 */
import { mkdirSync, writeFileSync } from 'node:fs'

const CSS_URL = 'https://fonts.googleapis.com/css2?family=Inter:wght@400..700&display=swap'
// Google serves woff2 only to browsers it recognises as modern.
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

const SUBSETS = { latin: 'inter-latin-var.woff2', 'latin-ext': 'inter-latin-ext-var.woff2' }

const res = await fetch(CSS_URL, { headers: { 'User-Agent': UA } })
if (!res.ok) throw new Error(`font CSS request failed: ${res.status}`)
const css = await res.text()

mkdirSync('public/fonts', { recursive: true })

for (const [subset, filename] of Object.entries(SUBSETS)) {
  const block = css.match(new RegExp(`/\\* ${subset} \\*/([\\s\\S]*?)\\n}`))
  if (!block) throw new Error(`no @font-face block for ${subset}`)
  const url = block[1].match(/url\((https:[^)]+\.woff2)\)/)
  if (!url) throw new Error(`no woff2 url for ${subset}`)

  const font = await fetch(url[1], { headers: { 'User-Agent': UA } })
  if (!font.ok) throw new Error(`font download failed for ${subset}: ${font.status}`)
  const bytes = Buffer.from(await font.arrayBuffer())
  writeFileSync(`public/fonts/${filename}`, bytes)
  console.log(`${filename} ${Math.round(bytes.length / 1024)}KB`)
}
