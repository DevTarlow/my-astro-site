/**
 * Generates the default social share card and the Apple touch icon.
 *
 * Every page that does not have its own image falls back to this card. It used
 * to fall back to a 527x586 portrait JPEG while the markup declared
 * `twitter:card=summary_large_image`, so most shares were a cropped portrait.
 *
 * Run with `npm run og:image` after changing the headshot or the copy below.
 * The output is committed, so this does not run during dev or build.
 */
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const IMAGES = 'public/images'
const HEADSHOT = `${IMAGES}/tarlow-cropped-headshot-small.jpg`
const PAPER = '#F9F9F8'
const INK = '#1A1A1A'
const MUTED = '#6F6F6F'
const TERRACOTTA = '#A8483A'

mkdirSync(IMAGES, { recursive: true })

// Inter ships as woff2 for the browser, which librsvg cannot read, so the card
// is rasterised with the system Lato instead.
const FONT = 'Lato, DejaVu Sans, sans-serif'

const W = 1200
const H = 630
const PAD = 96
const AVATAR = 200
const AVATAR_TOP = Math.round((H - AVATAR) / 2)
const TEXT_X = PAD + AVATAR + 64

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  <rect x="0" y="0" width="${W}" height="8" fill="${TERRACOTTA}"/>
  <text x="${TEXT_X}" y="268" font-family="${FONT}" font-size="76" font-weight="600" fill="${INK}">Tarlow</text>
  <rect x="${TEXT_X}" y="300" width="72" height="4" rx="2" fill="${TERRACOTTA}"/>
  <text x="${TEXT_X}" y="366" font-family="${FONT}" font-size="31" fill="${MUTED}">Developer in the Pacific Northwest</text>
  <text x="${TEXT_X}" y="410" font-family="${FONT}" font-size="31" fill="${MUTED}">Local-first tools and AI experiments</text>
  <text x="${TEXT_X}" y="536" font-family="${FONT}" font-size="26" font-weight="600" fill="${TERRACOTTA}">tarlow.space</text>
</svg>`

const avatarMasked = await sharp(HEADSHOT)
  .resize(AVATAR * 2, AVATAR * 2, { fit: 'cover', position: 'top' })
  .composite([{
    input: Buffer.from(
      `<svg width="${AVATAR * 2}" height="${AVATAR * 2}"><circle cx="${AVATAR}" cy="${AVATAR}" r="${AVATAR}" fill="#fff"/></svg>`
    ),
    blend: 'dest-in',
  }])
  .png()
  .toBuffer()

// Masked at 2x for a clean circle edge, then placed at its real size.
const avatar = await sharp(avatarMasked).resize(AVATAR, AVATAR).png().toBuffer()

await sharp({ create: { width: W, height: H, channels: 3, background: PAPER } })
  .composite([
    { input: Buffer.from(card) },
    { input: avatar, top: AVATAR_TOP, left: PAD },
  ])
  .png({ compressionLevel: 9, palette: true, quality: 92 })
  .toFile(`${IMAGES}/og-default.png`)

const ogMeta = await sharp(`${IMAGES}/og-default.png`).metadata()
console.log(`og-default.png ${ogMeta.width}x${ogMeta.height}`)

// Apple touch icons are opaque and square, so no transparency and no rounding.
await sharp(`${IMAGES}/../favicon.svg`)
  .resize(180, 180, { fit: 'contain', background: PAPER })
  .flatten({ background: PAPER })
  .png()
  .toFile(`${IMAGES}/apple-touch-icon.png`)

const iconMeta = await sharp(`${IMAGES}/apple-touch-icon.png`).metadata()
console.log(`apple-touch-icon.png ${iconMeta.width}x${iconMeta.height}`)
