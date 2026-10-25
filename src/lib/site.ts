/** The one essay the home page introduces. Falls back to the newest post. */
export const FEATURED_POST_SLUG = 'how-i-built-an-ai-that-dreams-for-me'

/**
 * Draft "Now" copy, drawn from the About page and the Moss AI Studio origin
 * story. These are the lines to edit first when the season changes.
 */
export const NOW = {
  label: 'October 2026',
  building: 'Marimo Bot + Moss Toolbox',
  practicing: 'Awareness, patience, getting outside',
  home: 'Portland, Oregon',
  openTo: 'New builds + good conversations',
} as const

export const PORTLAND = {
  coordinates: '45.52° N / 122.68° W',
  label: 'Portland, Oregon',
} as const
