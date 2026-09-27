/**
 * Frontmatter dates are calendar dates (`pubDate: 2026-09-19`) that Zod parses
 * into a Date at UTC midnight. Formatting one with the default (local) timezone
 * shifts it back a day for everyone west of UTC, so every displayed date is
 * formatted in UTC and matches the frontmatter exactly.
 */
export interface DateParts {
  /** e.g. "September 19, 2026" */
  long: string
  /** e.g. "Sep 19, 2026" */
  short: string
  /** e.g. "Sep 2026" */
  monthYear: string
  /** e.g. "Sep" */
  month: string
  /** e.g. "2026" */
  year: string
}

export function dateParts(date: Date): DateParts {
  return {
    long: date.toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric' }),
    short: date.toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short', day: 'numeric' }),
    monthYear: date.toLocaleDateString('en-US', { timeZone: 'UTC', year: 'numeric', month: 'short' }),
    month: date.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short' }),
    year: String(date.getUTCFullYear()),
  }
}
