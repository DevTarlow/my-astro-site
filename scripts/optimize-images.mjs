// Build-time responsive image pipeline.
//
// Astro cannot optimize images served from /public, so every screenshot in this
// repo was shipped at full resolution (one homepage thumbnail was 2.7 MB). This
// script pre-generates WebP variants at a small width ladder and writes a
// manifest that ContentImage.astro and the rehype plugin consume to emit
// <picture>/srcset markup. Originals stay in public/images as the fallback.
//
// Runs automatically via the predev/prebuild npm scripts. Output is idempotent:
// a variant is skipped when it is newer than its source.

import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, 'public', 'images')
const OUT_DIR = path.join(SRC_DIR, '_opt')
const MANIFEST_PATH = path.join(OUT_DIR, 'manifest.json')

const WIDTHS = [320, 640, 1280]
const WEBP_QUALITY = 78
const INPUT_RE = /\.(png|jpe?g|webp|avif)$/i

function listSources () {
  if (!existsSync(SRC_DIR)) return []
  return readdirSync(SRC_DIR)
    .filter((name) => INPUT_RE.test(name))
    .map((name) => path.join(SRC_DIR, name))
}

function publicUrl (file) {
  return '/images/' + path.relative(SRC_DIR, file).split(path.sep).join('/')
}

function variantPath (file, width) {
  const base = path.basename(file).replace(INPUT_RE, '')
  return path.join(OUT_DIR, `${base}.${width}.webp`)
}

function isFresh (out, src) {
  if (!existsSync(out)) return false
  try {
    return statSync(out).mtimeMs >= statSync(src).mtimeMs
  } catch {
    return false
  }
}

function readPreviousManifest () {
  try {
    const parsed = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
    return parsed.images ?? {}
  } catch {
    return {}
  }
}

async function optimize (file, previous) {
  const url = publicUrl(file)
  const meta = await sharp(file).metadata()
  if (!meta.width || !meta.height) return null

  const widths = WIDTHS.filter((w) => w < meta.width)
  widths.push(Math.min(meta.width, Math.max(...WIDTHS)))
  const uniqueWidths = [...new Set(widths)].sort((a, b) => a - b)

  const variants = []
  for (const width of uniqueWidths) {
    const out = variantPath(file, width)
    if (!isFresh(out, file)) {
      const info = await sharp(file)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY, effort: 4 })
        .toFile(out)
      variants.push({ w: info.width, h: info.height, url: '/images/_opt/' + path.basename(out) })
    } else {
      const cached = (previous[url]?.variants ?? []).find((v) => v.w === width)
      variants.push(cached ?? { w: width, h: Math.round((meta.height / meta.width) * width), url: '/images/_opt/' + path.basename(out) })
    }
  }

  return {
    width: meta.width,
    height: meta.height,
    variants: variants.sort((a, b) => a.w - b.w),
  }
}

async function main () {
  const started = Date.now()
  mkdirSync(OUT_DIR, { recursive: true })
  const previous = readPreviousManifest()
  const files = listSources()
  const manifest = {}
  let generated = 0

  for (const file of files) {
    const entry = await optimize(file, previous)
    if (!entry) continue
    manifest[publicUrl(file)] = entry
    generated += entry.variants.length
  }

  // A content hash lets consumers detect a stale manifest cheaply.
  const hash = createHash('sha1').update(JSON.stringify(manifest)).digest('hex').slice(0, 12)
  writeFileSync(MANIFEST_PATH, JSON.stringify({ hash, images: manifest }, null, 0) + '\n')

  const seconds = ((Date.now() - started) / 1000).toFixed(1)
  console.log(`[images] ${files.length} sources, ${generated} variants in ${seconds}s -> public/images/_opt`)
}

main().catch((error) => {
  console.error('[images] optimization failed:', error)
  process.exitCode = 1
})
