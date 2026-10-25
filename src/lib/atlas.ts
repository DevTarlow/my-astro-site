import type { CollectionEntry } from 'astro:content'
import { dateParts } from './dates'
import { readingMinutes } from './reading'

export type AtlasGroup = 'agents' | 'local-first' | 'workflow' | 'launches'

export interface AtlasGroupMeta {
  id: AtlasGroup
  label: string
  color: string
  labelX: number
  labelY: number
  /** Points in a 1000 x 600 stage, connecting into a constellation. */
  shape: Array<[number, number]>
}

export const ATLAS_GROUPS: AtlasGroupMeta[] = [
  {
    id: 'agents',
    label: 'Agents',
    color: '#d4b27b',
    labelX: 9,
    labelY: 9,
    shape: [
      [145, 170], [235, 112], [330, 142], [365, 238], [282, 300],
      [172, 268], [420, 195], [432, 305], [315, 360], [120, 220],
    ],
  },
  {
    id: 'local-first',
    label: 'Local-first',
    color: '#9db4ac',
    labelX: 9,
    labelY: 88,
    shape: [
      [205, 400], [308, 352], [398, 430], [332, 520], [450, 335],
      [178, 470], [472, 478], [260, 460], [410, 545], [520, 410],
    ],
  },
  {
    id: 'workflow',
    label: 'Workflow',
    color: '#b3a4c6',
    labelX: 54,
    labelY: 64,
    shape: [
      [565, 405], [650, 355], [738, 390], [835, 462], [760, 535],
      [648, 505], [575, 460], [690, 575], [890, 405], [500, 500],
    ],
  },
  {
    id: 'launches',
    label: 'Launches',
    color: '#cf9683',
    labelX: 67,
    labelY: 9,
    shape: [
      [645, 175], [742, 112], [825, 182], [790, 272], [686, 296],
      [875, 235], [590, 235], [860, 120], [720, 215], [905, 300],
    ],
  },
]

const GROUP_CENTERS: Record<AtlasGroup, [number, number]> = {
  agents: [275, 235],
  'local-first': [330, 445],
  workflow: [700, 455],
  launches: [760, 210],
}

export function atlasGroupFor(tags: string[]): AtlasGroup {
  if (tags.includes('agents')) return 'agents'
  if (tags.includes('launches')) return 'launches'
  if (tags.includes('local-first') || tags.includes('browser-extensions')) return 'local-first'
  return 'workflow'
}

function fallbackPoint(group: AtlasGroup, index: number): [number, number] {
  const [cx, cy] = GROUP_CENTERS[group]
  const angle = (index * 137.508 * Math.PI) / 180
  const radius = 44 + Math.max(0, index - 6) * 18
  return [
    Math.max(60, Math.min(940, cx + Math.cos(angle) * radius)),
    Math.max(50, Math.min(550, cy + Math.sin(angle) * radius)),
  ]
}

export interface AtlasEntry {
  post: CollectionEntry<'blog'>
  group: AtlasGroup
  x: number
  y: number
  href: string
  date: string
  tags: string
  readingTime: number
  excerpt: string
}

export interface AtlasGroupView extends AtlasGroupMeta {
  count: number
  points: string
  entries: AtlasEntry[]
}

export interface AtlasData {
  entries: AtlasEntry[]
  groups: AtlasGroupView[]
  featured: AtlasEntry
}

export function buildAtlas(
  posts: CollectionEntry<'blog'>[],
  featuredSlug?: string,
): AtlasData {
  const sorted = [...posts].sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime(),
  )

  const entries: AtlasEntry[] = sorted.map((post) => {
    const tags = post.data.tags ?? []
    const group = atlasGroupFor(tags)
    const groupMeta = ATLAS_GROUPS.find((meta) => meta.id === group)!
    const groupPosts = sorted.filter((candidate) => atlasGroupFor(candidate.data.tags ?? []) === group)
    const index = groupPosts.findIndex((candidate) => candidate.id === post.id)
    const point = groupMeta.shape[index] ?? fallbackPoint(group, index)

    return {
      post,
      group,
      x: Math.round(point[0]),
      y: Math.round(point[1]),
      href: `/blog/${post.id}/`,
      date: dateParts(post.data.pubDate).long,
      tags: tags.join(' / '),
      readingTime: readingMinutes(post.body),
      excerpt: post.data.description,
    }
  })

  const groups = ATLAS_GROUPS.map((meta) => {
    const groupEntries = entries.filter((entry) => entry.group === meta.id)
    return {
      ...meta,
      count: groupEntries.length,
      points: groupEntries.map((entry) => `${entry.x},${entry.y}`).join(' '),
      entries: groupEntries,
    }
  })

  const featured =
    entries.find((entry) => entry.post.id === featuredSlug) ??
    entries[0]

  return { entries, groups, featured }
}
