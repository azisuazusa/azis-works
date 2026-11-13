// Content for each social preview image. Keys are slugs; build.sh renders each one.
// "home" goes to public/og.png, every other slug to public/og/<slug>.png.
window.OG_PAGES = {
  home: {
    eyebrow: 'Backend engineer · Go · Jakarta',
    title: 'Azis Abdul Bachar',
    lead: 'Built FLIK Shipping from an empty repository, rebuilt a financial ledger, and shipped an AI ops agent to production.',
    stats: [['~50k', 'shipping orders a month'], ['200+', 'merchants on the platform'], ['10+ yrs', 'building software']],
  },
  'ops-agent': {
    eyebrow: 'Azis Abdul Bachar · FLIK',
    title: 'An AI ops agent in Slack',
    lead: 'Investigates orders and runs routine fixes on masked, read-only data. A person confirms every change.',
    stats: [['<$1', 'model cost per request on average'], ['2 weeks', 'to take over the old bot’s order actions'], ['0', 'raw credentials or personal data held']],
  },
  ledger: {
    eyebrow: 'Azis Abdul Bachar · FLIK',
    title: 'Rebuilding FLIK’s ledger',
    lead: 'From a dual-write experiment on Blnk to an in-house ledger with a Finance back office, migrated in production.',
    stats: [['120', 'merged pull requests'], ['~22k', 'lines of legacy Spanner code removed'], ['~11k', 'lines of migration docs before code']],
  },
  shipping: {
    eyebrow: 'Azis Abdul Bachar · FLIK',
    title: 'FLIK Shipping, from PR #1',
    lead: 'A logistics platform I founded from an empty repository in February 2024.',
    stats: [['~50k', 'orders a month'], ['200+', 'merchants'], ['8', 'direct courier integrations']],
  },
  yourspace: {
    eyebrow: 'Azis Abdul Bachar · Independent project',
    title: 'YourSpace',
    lead: 'A booking platform for a single-provider practice, live at yourspace.co.id. Go backend and Next.js site.',
    stats: [['375', 'bookings since mid-July'], ['17', 'events scheduled'], ['17k+', 'first-party analytics events']],
  },
  reward: {
    eyebrow: 'Azis Abdul Bachar · FLIK',
    title: 'Reward service',
    lead: 'A loyalty system built from nothing in 2023, with a rule engine so rewards change without code changes.',
    stats: [['210k+', 'reward transactions'], ['70k+', 'shoppers'], ['~200', 'reward programmes']],
  },
};
