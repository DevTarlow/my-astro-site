import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

export interface ImageVariant {
  w: number
  h: number
  url: string
}

export interface ImageEntry {
  width: number
  height: number
  variants: ImageVariant[]
}

type Manifest = Record<string, ImageEntry>

let cache: Manifest | null = null

/** Reads the build-time image manifest once per process. */
export function getImageManifest (): Manifest {
  if (cache) return cache
  const file = path.join(process.cwd(), 'public', 'images', '_opt', 'manifest.json')
  if (!existsSync(file)) {
    cache = {}
    return cache
  }
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as { images?: Manifest }
    cache = parsed.images ?? {}
  } catch {
    cache = {}
  }
  return cache
}

export function getImageEntry (src: string): ImageEntry | undefined {
  return getImageManifest()[src]
}

export function srcsetFor (entry: ImageEntry): string {
  return entry.variants.map((variant) => `${variant.url} ${variant.w}w`).join(', ')
}
