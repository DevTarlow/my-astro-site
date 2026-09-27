/**
 * Where the retired tag addresses point now.
 *
 * The blog tags were consolidated from 53 to 10 so that browsing by tag is
 * actually useful: every surviving tag has at least two posts, and there are no
 * more near-duplicates like `AI`, `AI automation`, `ai coding`, `ai-development`
 * and `generative ai`. That left the old tag pages 404ing, so astro.config.mjs
 * feeds this map to `redirects`, and Astro writes a small redirect page for
 * every entry.
 *
 * GitHub Pages cannot issue real 301s, so these are client-side redirects: a
 * human following an old link lands in the right place, and the page carries a
 * canonical pointing at the target.
 *
 * Adding a tag later? Nothing to do here. Renaming or dropping one? Add it to
 * `folded` or `dropped` so its address keeps working.
 */

const TAG_INDEX = '/blog/tags/'

/** Retired tag -> the surviving tag that covers the same ground. */
const folded = {
  'ai-agents': 'agents',
  'hermes-agent': 'agents',
  HermesAgent: 'agents',
  marimo: 'agents',
  dashboard: 'dashboards',
  'family-dashboard': 'dashboards',
  'local-app': 'dashboards',
  'local-first apps': 'local-first',
  LocalFirst: 'local-first',
  'local llm': 'local-llm',
  'local llms': 'local-llm',
  'on-device-ai': 'local-llm',
  'run-llm-locally': 'local-llm',
  'llm-privacy': 'local-llm',
  gemma4: 'local-llm',
  'LM Studio': 'local-llm',
  deepseek: 'models',
  gemini: 'models',
  openrouter: 'models',
  LLM: 'models',
  'vibe-coding': 'workflow',
  productivity: 'workflow',
  Automation: 'workflow',
  'Workflow Automation': 'workflow',
  N8N: 'workflow',
  'ai-development': 'workflow',
  'web development': 'web-development',
  astro: 'web-development',
  markdown: 'web-development',
  'theme design': 'web-development',
  ProductLaunch: 'launches',
  ChromeExtension: 'browser-extensions',
  Etsy: 'etsy',
}

/** Retired tags with no successor: the tag index beats a 404. */
const dropped = [
  'AI',
  'AI automation',
  'Bluesky',
  'CopySprout',
  'HandmadeChecker',
  'IndieGameScout',
  'IndieHacker',
  'ItchIo',
  'MossAIStudio',
  'MossToolbox',
  'ai coding',
  'developer journey',
  'generative ai',
  'new blog',
  'personal-project',
  'technology sharing',
  'tool',
]

/** @type {Record<string, string>} */
export const tagRedirects = {}

for (const [old, next] of Object.entries(folded)) {
  tagRedirects[`/blog/tags/${old}/`] = `/blog/tags/${next}/`
}

for (const old of dropped) {
  tagRedirects[`/blog/tags/${old}/`] = TAG_INDEX
}

// Note: the tag routes were case sensitive, so `AI` and `local llm` were the
// only spellings that ever worked, and those are the ones kept here. Astro
// treats two static routes that differ only by case as a collision, so a
// lower-case alias cannot sit alongside the original it aliases. The old
// spellings are what this site linked to and what search engines indexed, so
// they are the ones worth preserving.
