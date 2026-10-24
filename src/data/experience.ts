// Source: LinkedIn profile PDF. Wording is condensed from it; dates are as listed there.
export interface Role {
  company: string;
  role: string;
  period: string;
  place?: string;
  points: string[];
  /** Measured evidence from my repositories; see the data scripts in scripts/. */
  outcomes?: string[];
  links?: { label: string; href: string; external?: boolean }[];
}

export const experience: Role[] = [
  {
    company: 'Independent projects',
    role: 'Software Engineer, own projects',
    period: 'Jul 2026 – present',
    points: [
      'YourSpace: a booking platform for a single-provider practice, with a Go backend and a Next.js marketing site. Live at yourspace.co.id.',
      'Bejo POS: a point-of-sale system for a single-outlet food business, with web ordering, a backoffice and an Android POS app in Jetpack Compose.',
    ],
    outcomes: [
      'YourSpace: 375 bookings created since mid-July, across 3 parts and 56 migrations.',
      'Bejo POS: 27 PRDs and 86 commits in four weeks, across a Go backend and an Android app.',
    ],
    links: [
      { label: 'YourSpace', href: '/yourspace/' },
      { label: 'Bejo POS', href: '/bejopos/' },
    ],
  },
  {
    company: 'FLIK',
    role: 'Software Engineer',
    period: 'Aug 2023 – present',
    place: 'South Jakarta',
    points: [
      'Turn business requirements and PRDs into technical specifications; lead design and development of scalable systems with cross-functional teams.',
      'Designed and built a customizable reward/loyalty system from the ground up, using a rule engine to manage reward rules.',
      'Built a shipping aggregator platform with clean architecture, integrating multiple third-party logistics providers.',
    ],
    outcomes: [
      '799 merged pull requests across 12 repositories, Sep 2023 to Oct 2026.',
      'Founded FLIK Shipping from an empty repository: about 50,000 orders a month, with more than 99% routed through eight direct courier integrations I wrote.',
      'Rebuilt the financial ledger, from a dual-write experiment on Blnk to an in-house ledger with a Finance back office: 74 pull requests.',
      'Built the Reward service in 2023: over 210,000 reward transactions.',
    ],
    links: [
      { label: 'FLIK overview', href: '/flik/' },
      { label: 'Shipping', href: '/flik/shipping/' },
      { label: 'Shipping product page', href: 'https://flik.co.id/en/pengiriman-kilat', external: true },
      { label: 'Courier integrations', href: '/flik/courier-integrations/' },
      { label: 'Ledger', href: '/flik/ledger/' },
    ],
  },
  {
    company: 'Kitabisa.com',
    role: 'Backend Engineer (part-time / freelance)',
    period: 'Aug 2023 – Jun 2025',
    points: ['Continued backend work on the platform alongside other work.'],
    outcomes: ['384 commits across 10 repositories in this period.'],
    links: [{ label: 'Kitabisa work', href: '/kitabisa/' }],
  },
  {
    company: 'Kitabisa.com',
    role: 'Senior Software Engineer, Backend',
    period: 'Mar 2022 – Jul 2023',
    place: 'South Jakarta',
    points: [
      'Turned PRDs into technical documentation, designed new systems, broke down tasks for the team and led backend discussions in sprint grooming.',
      'Designed a notification service integrating multiple providers, with retries and logging for reliability.',
      'Built an automatic donation system (daily, weekly or monthly schedules, including the 5 AM "sedekah subuh" slot) and scaled it through major user growth: processing 30k donations first took 2 hours; asynchronous processing with RabbitMQ handled 80k in 1.5 hours; early execution of steps plus batching with goroutines brought the run down to 1 hour.',
    ],
    outcomes: ['689 commits between Mar 2022 and Jul 2023.'],
  },
  {
    company: 'Kitabisa.com',
    role: 'Software Engineer, Backend',
    period: 'Oct 2019 – Apr 2022',
    place: 'South Jakarta',
    points: [
      'Developed Kitabisa Saling Jaga, a Sharia insurance platform where users contribute to a pool that helps others in times of need.',
      'Built a centralized key-value configuration system with a dashboard, allowing real-time config changes without deployments.',
      'Created a Slackbot for the operations team to update user data and status.',
    ],
    outcomes: ['713 commits between Oct 2019 and Feb 2022, almost all in Go services.'],
  },
  {
    company: 'Kitabisa.com',
    role: 'Software Engineer, Android',
    period: 'Mar 2019 – Oct 2019',
    place: 'South Jakarta',
    points: [
      'Developed the Kitabisa.com Android app in Kotlin, moving it off a previous React Native build.',
      'Set up the CI/CD pipeline for the Android app on CircleCI.',
    ],
  },
  {
    company: 'MatahariMall.com',
    role: 'Software Engineer, Android',
    period: 'Aug 2018 – Mar 2019',
    place: 'Greater Jakarta',
    points: ['Developed and maintained the MatahariMall.com and Hypermart Android apps.'],
  },
  {
    company: 'Edulab Indonesia',
    role: 'Software Engineer',
    period: 'Aug 2017 – Aug 2018',
    place: 'Bandung',
    points: [
      'Built an educational app (reading material, videos, exams) for Android and iOS, a web CMS for its content, and the backend behind it.',
      'Extra role at Triplogic: added platform features, led frontend engineers on the mobile app and distributed tasks across the team.',
    ],
  },
  {
    company: 'PT. Bixbox Teknologi Perkasa',
    role: 'Software Engineer (intern, alongside Refactory bootcamp)',
    period: 'Apr 2017 – Aug 2017',
    place: 'Bandung',
    points: [
      'Built a social media app for hikers in React Native and a CRM bot with NLP (Laravel, API.AI, now Dialogflow).',
      'Refactored a React Native app into a native Android app in Java.',
    ],
  },
  {
    company: 'Pragma Informatika',
    role: 'Software Engineer, Web',
    period: 'Apr 2016 – Dec 2016',
    place: 'Bandung',
    points: [
      'Developed a web-based task management system (manage, delegate, monitor tasks) and wrote its system documentation and user guide.',
    ],
  },
];

export const education = [
  { name: 'Universitas Indraprasta PGRI (UNINDRA)', detail: 'Bachelor of Technology, Information Technology' },
  { name: 'Refactory', detail: 'Computer Programming, 2017 (Refactory Programming School certification)' },
  { name: 'SMK Negeri 2 Kota Bekasi', detail: 'Computer Software Engineering' },
];
