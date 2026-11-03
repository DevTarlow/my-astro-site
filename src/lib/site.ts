/**
 * The current month in Portland, e.g. "November 2026". The "Now" band shows
 * this instead of a hand-written label, so it never goes stale: it is correct
 * in the prerendered HTML for the build date, and SiteScripts re-checks it in
 * the browser so a tab or a deploy that outlives the month still reads right.
 */
export function nowMonth(date: Date = new Date()): string {
  return date.toLocaleDateString('en-US', {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: 'long',
  })
}

/**
 * Draft "Now" copy, drawn from the About page and the Moss AI Studio origin
 * story. These are the lines to edit first when the season changes. The month
 * label is not here on purpose - it comes from `nowMonth()`.
 */
export const NOW = {
  building: [
    { label: 'Marimo Bot', href: 'https://marimobot.com/' },
    { label: 'Moss Toolbox', href: 'https://mossaistudio.com/' },
  ],
  practicing: 'Awareness, patience, getting outside',
  home: 'Portland, Oregon',
  openTo: 'New builds + good conversations',
} as const

export const PORTLAND = {
  coordinates: '45.52° N / 122.68° W',
  label: 'Portland, Oregon',
} as const
