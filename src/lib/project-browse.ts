import type { CollectionEntry } from 'astro:content'
import { getPublicProjects } from './posts'
import { dateParts } from './dates'

export type Project = CollectionEntry<'projects'>
export type Projects = Project[]

export interface ProjectDisplay {
  project: Project
  href: string
  /** Full title including the "- Type" descriptor. */
  title: string
  /** Title without the trailing descriptor, for dense rows. */
  shortTitle: string
  year: string
  /** e.g. "Aug" */
  month: string
  /** e.g. "Aug 2026" */
  monthYear: string
  category: string | undefined
}

/** Projects newest first, with the frontmatter dates pre-formatted for display. */
export async function getProjects(): Promise<Projects> {
  const projects = await getPublicProjects()
  return projects.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
}

export const projectHref = (p: Project) => `/projects/${p.id}/`

export function projectDisplay(p: Project): ProjectDisplay {
  const date = dateParts(p.data.pubDate)
  return {
    project: p,
    href: projectHref(p),
    title: p.data.title,
    shortTitle: p.data.title.split(' - ')[0],
    year: date.year,
    month: date.month,
    monthYear: date.monthYear,
    category: p.data.category,
  }
}

/** Maps a project list to display rows, preserving order. */
export const toDisplay = (projects: Projects) => projects.map(projectDisplay)

/** Groups display rows by publication year, newest year first. */
export function groupByYear(rows: ProjectDisplay[]) {
  const years = new Map<string, ProjectDisplay[]>()
  for (const row of rows) {
    const bucket = years.get(row.year)
    if (bucket) bucket.push(row)
    else years.set(row.year, [row])
  }
  return [...years.entries()].sort((a, b) => Number(b[0]) - Number(a[0]))
}

export const categoryClass = (category: string | undefined) =>
  category === 'Launched' ? 'bg-terracotta/10 text-terracotta' : 'bg-ink/5 text-muted'
