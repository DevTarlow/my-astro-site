/**
 * Generates the default social share card, the Apple touch icon and the favicon
 * fallbacks.
 *
 * Every page that does not have its own image falls back to this card, so it
 * needs to feel like the Observatory: a deep sky, warm bone type, and brass
 * orbit lines. Inter ships as woff2 for the browser, which librsvg cannot read,
 * so the card is rasterised with DejaVu Serif and Lato from the system.
 *
 * Run with `npm run og:image` after changing the headshot, the favicon, or the
 * copy below. The outputs are committed, so this does not run during dev/build.
 */
import sharp from 'sharp'
import { mkdirSync, writeFileSync } from 'node:fs'

const IMAGES = 'public/images'
const HEADSHOT = `${IMAGES}/tarlow-cropped-headshot-small.jpg`
const FAVICON = 'public/favicon.svg'
const NIGHT = '#05070C'
const DEEP = '#090C13'
const INK = '#EFE8DB'
const BODY = '#D3CCBF'
const MUTED = '#8C94A3'
const BRASS = '#CFAE7B'

mkdirSync(IMAGES, { recursive: true })

const SERIF = 'DejaVu Serif, Liberation Serif, serif'
const SANS = 'Lato, DejaVu Sans, sans-serif'

const W = 1200
const H = 630
const PAD = 84
const AVATAR = 280
const AVATAR_CX = 940
const AVATAR_CY = 315

// A deterministic star field keeps the committed card stable between runs.
let seed = 31
const random = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296
  return seed / 4294967296
}
const stars = Array.from({ length: 54 }, () => {
  const x = Math.round(random() * W)
  const y = Math.round(random() * H)
  const r = random() > 0.86 ? 1.5 : 0.65
  const opacity = (0.15 + random() * 0.4).toFixed(2)
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${INK}" opacity="${opacity}"/>`
}).join('')

const card = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${BRASS}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${BRASS}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${DEEP}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${NIGHT}" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${NIGHT}"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fade)"/>
  <circle cx="${AVATAR_CX}" cy="${AVATAR_CY}" r="315" fill="url(#glow)"/>
  <circle cx="${AVATAR_CX}" cy="${AVATAR_CY}" r="205" fill="none" stroke="${BRASS}" stroke-opacity="0.12"/>
  <circle cx="${AVATAR_CX}" cy="${AVATAR_CY}" r="151" fill="none" stroke="${BRASS}" stroke-opacity="0.4"/>
  <line x1="${AVATAR_CX - 285}" y1="${AVATAR_CY + 188}" x2="${AVATAR_CX + 240}" y2="${AVATAR_CY - 215}" stroke="${BRASS}" stroke-opacity="0.12"/>
  ${stars}
  <circle cx="1084" cy="170" r="3.6" fill="${BRASS}"/>
  <circle cx="1084" cy="170" r="10" fill="${BRASS}" opacity="0.08"/>
  <circle cx="158" cy="505" r="2.4" fill="${BODY}" opacity="0.65"/>

  <text x="${PAD}" y="94" font-family="${SANS}" font-size="16" font-weight="600" letter-spacing="6" fill="${BRASS}">TARLOW.SPACE / FIELD NOTES</text>
  <text x="${PAD - 5}" y="258" font-family="${SERIF}" font-size="126" letter-spacing="-5" fill="${INK}">Tarlow.</text>
  <rect x="${PAD}" y="304" width="76" height="2" fill="${BRASS}" opacity="0.75"/>
  <text x="${PAD}" y="384" font-family="${SERIF}" font-size="45" font-style="italic" letter-spacing="-1" fill="${BRASS}">Quiet tools, a slower life.</text>
  <text x="${PAD}" y="456" font-family="${SANS}" font-size="24" fill="${MUTED}">Local-first software, agents, and the long way back.</text>
  <line x1="${PAD}" y1="548" x2="${W - PAD}" y2="548" stroke="${INK}" stroke-opacity="0.12"/>
  <text x="${PAD}" y="584" font-family="${SANS}" font-size="18" font-weight="600" letter-spacing="2" fill="${BRASS}">tarlow.space</text>
  <text x="${W - PAD}" y="584" font-family="${SANS}" font-size="16" letter-spacing="2" fill="${MUTED}" text-anchor="end">PORTLAND, OREGON / 45.52 N</text>
</svg>`

const avatarMasked = await sharp(HEADSHOT)
  .resize(AVATAR * 2, AVATAR * 2, { fit: 'cover', position: 'top' })
  .modulate({ brightness: 0.82, saturation: 0.72 })
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

await sharp({ create: { width: W, height: H, channels: 3, background: NIGHT } })
  .composite([
    { input: Buffer.from(card) },
    { input: avatar, top: AVATAR_CY - AVATAR / 2, left: AVATAR_CX - AVATAR / 2 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(`${IMAGES}/og-default.png`)

const ogMeta = await sharp(`${IMAGES}/og-default.png`).metadata()
console.log(`og-default.png ${ogMeta.width}x${ogMeta.height}`)

// Apple touch icons are opaque and square, so no transparency and no rounding.
await sharp(FAVICON)
  .resize(180, 180, { fit: 'contain', background: NIGHT })
  .flatten({ background: NIGHT })
  .png()
  .toFile(`${IMAGES}/apple-touch-icon.png`)

const iconMeta = await sharp(`${IMAGES}/apple-touch-icon.png`).metadata()
console.log(`apple-touch-icon.png ${iconMeta.width}x${iconMeta.height}`)

// Modern browsers use favicon.svg. The PNG and ICO are fallbacks for older
// tabs and RSS readers; the ICO is a single 48px PNG wrapped in an ICONDIR.
const faviconPng = await sharp(FAVICON).resize(48, 48).png().toBuffer()
writeFileSync('public/favicon.png', faviconPng)

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(1, 4)
const entry = Buffer.alloc(16)
entry.writeUInt8(48, 0)
entry.writeUInt8(48, 1)
entry.writeUInt8(0, 2)
entry.writeUInt8(0, 3)
entry.writeUInt16LE(1, 4)
entry.writeUInt16LE(32, 6)
entry.writeUInt32LE(faviconPng.length, 8)
entry.writeUInt32LE(22, 12)
writeFileSync('public/favicon.ico', Buffer.concat([header, entry, faviconPng]))
console.log('favicon.ico + favicon.png written')
