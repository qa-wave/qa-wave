// ============================================================
// qawave.ai — Landing Page Data
// All copy and structured data as typed constants.
// ============================================================

// --- Types ---

export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface HeroData {
  badge: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string; trackingEvent: string };
  secondaryCta: { label: string; href: string; trackingEvent: string };
}

export interface StatBox {
  number: string;
  numericValue: number;
  suffix: string;
  label: string;
  supportingText: string;
  source?: string;
  sourceUrl?: string;
}

export interface ProblemData {
  headline: string;
  subheadline: string;
  stats: [StatBox, StatBox, StatBox];
}

export interface BulletPoint {
  bold: string;
  text: string;
}

export interface UvpPillar {
  icon: string;
  headline: string;
  tagline: string;
  description: string;
  bullets: BulletPoint[];
  href: string;
}

export interface UvpData {
  headline: string;
  subheadline: string;
  pillars: [UvpPillar, UvpPillar, UvpPillar];
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface HowItWorksData {
  headline: string;
  steps: [Step, Step, Step];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface SocialProofData {
  headline: string;
  metrics: Metric[];
  testimonial: Testimonial;
}

export interface Integration {
  name: string;
  icon: string;
  description: string;
}

export interface TechCredData {
  headline: string;
  subheadline: string;
  integrations: Integration[];
  exitStrategyLine: string;
}

export interface CtaData {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string; trackingEvent: string };
  secondaryCta: { label: string; href: string; trackingEvent: string };
}

export interface CaseStudy {
  industry: string;
  companyDescription: string;
  challenge: string;
  approach: string;
  results: { metric: string; label: string }[];
  quote?: string;
  quoteAttribution?: string;
  icon: string;
}

export interface CaseStudiesData {
  headline: string;
  subheadline: string;
  studies: CaseStudy[];
}

export interface PortfolioItem {
  name: string;
  industry: string;
  tagline: string;
  engagement: "Pilot" | "Implementation" | "Ongoing" | "Audit";
  result: string;
  icon: string;
  accentColor: "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
}

export interface PortfolioData {
  headline: string;
  subheadline: string;
  items: PortfolioItem[];
  footnote: string;
}

// --- Data ---

export const navItems: NavItem[] = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Services", href: "#platform" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Resources", href: "/blog" },
];

export const navCta = {
  label: "Book a Discovery Call",
  href: "/contact",
  trackingEvent: "cta_click_nav",
} as const;

// --- Footer ---

export const footerColumns: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Autonomous Discovery", href: "/platform/autonomous-discovery" },
      {
        label: "Intelligent Maintenance",
        href: "/platform/intelligent-maintenance",
      },
      { label: "Governance & Compliance", href: "/platform/governance" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "ROI Calculator", href: "/resources/roi-calculator" },
      { label: "Comparisons", href: "/resources/comparisons" },
      { label: "Edge Reports", href: "/resources/edge-reports" },
      { label: "Methodology", href: "/methodology" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Customers", href: "/customers" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Security", href: "/security" },
      { label: "Cookie Settings", href: "#cookie-settings" },
    ],
  },
];

export const footerTagline = "The Edge of QA Automation";
export const footerCopyright = "\u00a9 2026 qawave.ai. All rights reserved.";

// --- S1 Hero ---

export const heroData: HeroData = {
  badge: "QA Automation Consulting & Implementation",
  headline: "The Edge of QA Automation",
  subheadline:
    "We help engineering teams implement agentic AI testing \u2014 from strategy through production. Autonomous coverage, intelligent maintenance, and full governance, tailored to your codebase and workflow.",
  primaryCta: {
    label: "Book a Discovery Call",
    href: "/contact",
    trackingEvent: "cta_click_hero_primary",
  },
  secondaryCta: {
    label: "See Case Studies",
    href: "#case-studies",
    trackingEvent: "cta_click_hero_secondary",
  },
};

// --- S2 Problem Statement ---

export const problemData: ProblemData = {
  headline:
    "The gap between your dev velocity and test coverage is widening every sprint.",
  subheadline:
    "AI-assisted coding tools ship features faster than your QA team can write tests. Legacy automation stalls at partial coverage. Maintenance costs compound silently. Here is where most organizations stand right now:",
  stats: [
    {
      number: "25%",
      numericValue: 25,
      suffix: "%",
      label: "Industry test automation ceiling",
      supportingText:
        "Script-based tools can only test what humans anticipate. The rest ships untested.",
      source: "Forrester Wave\u2122: Continuous Automation Testing, Q4 2025",
      sourceUrl:
        "https://www.forrester.com/report/the-forrester-wave-continuous-automation-testing-platforms-q4-2025/RES180015",
    },
    {
      number: "6x",
      numericValue: 6,
      suffix: "x",
      label: "Hidden cost multiplier",
      supportingText:
        "Organizations budget \u20ac140\u2013180K for QA tooling. Real costs \u2014 including maintenance of brittle test suites \u2014 reach \u20ac900K\u20131M.",
      source: "The 2026 Quality Tax \u2014 Bug0 Research",
      sourceUrl: "https://bug0.com/blog/the-2026-quality-tax-ai-assisted-development-qa-budget",
    },
    {
      number: "30%",
      numericValue: 30,
      suffix: "%",
      label: "Senior engineer time lost to maintenance",
      supportingText:
        "Your most experienced people spend nearly a third of their week triaging flaky tests and patching broken selectors.",
      source: "Gartner\u00ae Peer Insights: AI-Augmented Testing Tools, 2026",
      sourceUrl:
        "https://www.gartner.com/reviews/market/ai-augmented-software-testing-tools",
    },
  ],
};

// --- S3 UVP Pillars ---

export const uvpData: UvpData = {
  headline: "Three capabilities we bring to your team.",
  subheadline:
    "We don\u2019t sell a tool and walk away. We implement, configure, and optimize agentic AI testing alongside your senior engineers \u2014 amplifying their expertise instead of replacing their judgment.",
  pillars: [
    {
      icon: "Radar",
      headline: "Autonomous Discovery",
      tagline: "Your AI finds what your scripts miss.",
      description:
        "Traditional tools test predefined paths. Even \u201cAI-assisted\u201d tools just help you write scripts faster. qawave agents autonomously explore your application, map its structure, and generate tests for paths, edge cases, and regression risks that no human anticipated.",
      bullets: [
        {
          bold: "Autonomous exploration",
          text: "The agent maps your application\u2019s structure, flows, and states without manual instruction.",
        },
        {
          bold: "Risk-based prioritization",
          text: "Tests generated by real system risk, not line-of-code coverage targets.",
        },
        {
          bold: "Coverage breakthrough",
          text: "Pilot projects moved from 28% to 74% coverage in 6 weeks.",
        },
      ],
      href: "/platform/autonomous-discovery",
    },
    {
      icon: "RefreshCw",
      headline: "Intelligent Maintenance",
      tagline: "Tests that evolve with your product, not against it.",
      description:
        "Every vendor claims \u201cself-healing.\u201d Most mean they update a CSS selector when an element moves. That is a patch, not maintenance. qawave understands the intent of each test, adapts entire strategies when your product changes, and flags at-risk tests before deployment \u2014 not after.",
      bullets: [
        {
          bold: "Intent-level adaptation",
          text: "When your UI changes, the agent rewrites tests based on what they verify, not just where elements sit.",
        },
        {
          bold: "Proactive risk detection",
          text: "Tests threatened by a planned deploy are identified and updated before merge.",
        },
        {
          bold: "Human review gate",
          text: "Every AI-proposed change is staged for your team\u2019s approval before it reaches the codebase.",
        },
      ],
      href: "/platform/intelligent-maintenance",
    },
    {
      icon: "ShieldCheck",
      headline: "Engineering-Grade Governance",
      tagline: "AI power. Human authority. Full audit trail.",
      description:
        "Managed services take governance away from your team. Black-box AI tools make untraceable decisions about what to test and what to skip. qawave gives you autonomous capability with complete transparency \u2014 every AI decision recorded, explained, and subject to human approval.",
      bullets: [
        {
          bold: "Full audit trail",
          text: "Every AI decision is logged with its reasoning. Inspect any test, any time.",
        },
        {
          bold: "Human-in-the-loop control",
          text: "AI proposes. Your engineers approve. Strategic changes never happen without sign-off.",
        },
        {
          bold: "Compliance-ready reporting",
          text: "SOC 2 and ISO 27001 aligned outputs for regulated industries.",
        },
      ],
      href: "/platform/governance",
    },
  ],
};

// --- S4 How It Works ---

export const howItWorksData: HowItWorksData = {
  headline: "From assessment to autonomous coverage in three phases.",
  steps: [
    {
      number: "01",
      title: "Discovery & Assessment",
      description:
        "We analyze your current QA stack, coverage gaps, and team workflow. You get a clear roadmap with expected ROI before any commitment.",
      icon: "Search",
    },
    {
      number: "02",
      title: "Implementation & Tuning",
      description:
        "Our engineers deploy and configure agentic AI testing on your codebase. We tune the agents to your architecture, integrate with your CI/CD, and validate results.",
      icon: "Wrench",
    },
    {
      number: "03",
      title: "Handoff & Ongoing Support",
      description:
        "Your team takes full ownership with training, documentation, and governance dashboards. We stay available for optimization and scaling.",
      icon: "GraduationCap",
    },
  ],
};

// --- S5 Social Proof ---

export const socialProofData: SocialProofData = {
  headline: "Measured results from client engagements.",
  metrics: [
    { value: "28% \u2192 74%", label: "Test coverage growth in 6 weeks" },
    { value: "-65%", label: "Reduction in test maintenance time" },
    { value: "Minutes", label: "Mean time to adapt after deployment" },
    { value: "100%", label: "AI decisions with full audit trail" },
  ],
  testimonial: {
    quote:
      "We budgeted two sprints to stabilize our test suite after the frontend refactor. qawave\u2019s agent adapted 80% of affected tests overnight. My team spent the morning reviewing changes instead of rewriting them.",
    author: "QA Lead",
    role: "QA Lead",
    company: "B2B Fintech Platform (Pilot Program)",
  },
};

// --- S6 Tech Credibility ---

export const techCredData: TechCredData = {
  headline: "Built to fit your stack. Not replace it.",
  subheadline:
    "qawave integrates with the tools your team already uses. No lock-in. Standard test formats. Export everything.",
  integrations: [
    {
      name: "GitHub / GitLab / Bitbucket",
      icon: "GitBranch",
      description:
        "Repository connection, PR-based test review, CI/CD triggers.",
    },
    {
      name: "GitHub Actions / GitLab CI / Jenkins",
      icon: "Workflow",
      description:
        "Native pipeline integration. Tests run where your code already builds.",
    },
    {
      name: "Cypress / Playwright / Selenium",
      icon: "TestTube",
      description:
        "Works with your existing test frameworks. Generates tests in formats your team reads and owns.",
    },
    {
      name: "Slack / Teams",
      icon: "MessageSquare",
      description:
        "Real-time notifications for test results, maintenance proposals, and coverage changes.",
    },
    {
      name: "Jira / Linear",
      icon: "SquareKanban",
      description:
        "Link test failures to issues. Trace coverage to requirements.",
    },
  ],
  exitStrategyLine:
    "Every test qawave generates is yours. Standard code. Standard formats. No proprietary lock-in. If you leave, your tests stay.",
};

// --- S7 Final CTA ---

export const ctaData: CtaData = {
  headline: "Let\u2019s talk about your QA challenges.",
  subheadline:
    "Book a 30-minute discovery call. We\u2019ll assess your current coverage, identify quick wins, and outline a roadmap \u2014 no commitment required.",
  primaryCta: {
    label: "Book a Discovery Call",
    href: "/contact",
    trackingEvent: "cta_click_final_primary",
  },
  secondaryCta: {
    label: "See Case Studies",
    href: "#case-studies",
    trackingEvent: "cta_click_final_secondary",
  },
};

// --- Case Studies ---

export const caseStudiesData: CaseStudiesData = {
  headline: "Real engagements. Measurable outcomes.",
  subheadline:
    "Every engagement starts with your codebase, your team, and your constraints. Here\u2019s what that looks like in practice.",
  studies: [
    {
      industry: "B2B Fintech",
      companyDescription:
        "Series B fintech platform, 200+ employees, 3 product lines, Cypress + manual QA mix.",
      challenge:
        "Test coverage stalled at 28% for 18 months. Dev team adopted Copilot, shipping velocity jumped 40%, but QA couldn\u2019t keep pace. Every sprint shipped with known blind spots.",
      approach:
        "6-week engagement: assessed existing test suite, deployed agentic AI exploration on staging, integrated with GitHub Actions CI/CD, trained 5 QA engineers on governance workflows.",
      results: [
        { metric: "28% \u2192 74%", label: "Test coverage" },
        { metric: "6 weeks", label: "Time to results" },
        { metric: "-70%", label: "Flaky test rate" },
      ],
      quote:
        "We budgeted two sprints to stabilize our test suite after the frontend refactor. qawave\u2019s team adapted 80% of affected tests overnight. My engineers spent the morning reviewing changes instead of rewriting them.",
      quoteAttribution: "QA Lead, B2B Fintech Platform",
      icon: "Landmark",
    },
    {
      industry: "E-commerce SaaS",
      companyDescription:
        "Mid-market e-commerce platform, 150 employees, Playwright + Selenium legacy, GitLab CI.",
      challenge:
        "Senior engineers spent 30%+ of their time maintaining 1,200 brittle tests. Every UI refactor triggered 2\u20133 days of test triage. QA was seen as a bottleneck, not a strategic function.",
      approach:
        "8-week engagement: migrated maintenance-heavy Selenium tests to AI-maintained suite, implemented intent-level test adaptation, set up proactive risk detection before each deploy.",
      results: [
        { metric: "-65%", label: "Maintenance time" },
        { metric: "3 days \u2192 4 hrs", label: "Post-refactor recovery" },
        { metric: "\u20ac340K/yr", label: "Estimated savings" },
      ],
      quote:
        "For the first time in two years, our QA team is working on strategy instead of putting out fires. That shift changed how the CTO sees our department.",
      quoteAttribution: "QA Manager, E-commerce SaaS",
      icon: "ShoppingCart",
    },
    {
      industry: "Healthcare Platform",
      companyDescription:
        "Regulated healthtech, 300 employees, SOC 2 + HIPAA requirements, complex multi-tenant architecture.",
      challenge:
        "Compliance required full auditability of test decisions. Existing AI testing tools operated as black boxes \u2014 unacceptable for their regulatory environment. Manual testing was thorough but unsustainable at scale.",
      approach:
        "10-week engagement: designed governance-first testing architecture, implemented full audit trail with decision reasoning, built compliance-ready reporting aligned to SOC 2 and ISO 27001, trained compliance team on AI oversight.",
      results: [
        { metric: "100%", label: "Audit trail coverage" },
        { metric: "Passed", label: "SOC 2 Type II audit" },
        { metric: "3x", label: "Test throughput increase" },
      ],
      quote:
        "Other vendors couldn\u2019t answer our compliance questions. qawave built governance into the foundation, not as an afterthought. Our auditors were impressed.",
      quoteAttribution: "CTO, Healthcare Platform",
      icon: "HeartPulse",
    },
  ],
};

// --- Portfolio ---

export const portfolioData: PortfolioData = {
  headline: "Selected work.",
  subheadline:
    "A snapshot of recent engagements across fintech, e-commerce, healthtech, and developer tools. Names and details simplified for confidentiality.",
  items: [
    {
      name: "Velora Pay",
      industry: "Fintech",
      tagline: "B2B payments platform",
      engagement: "Implementation",
      result: "62% coverage uplift",
      icon: "CreditCard",
      accentColor: "indigo",
    },
    {
      name: "StackCart",
      industry: "E-commerce",
      tagline: "Headless commerce SaaS",
      engagement: "Implementation",
      result: "\u20ac340K/yr saved",
      icon: "ShoppingBag",
      accentColor: "emerald",
    },
    {
      name: "CarelinkOS",
      industry: "Healthtech",
      tagline: "Clinical workflow platform",
      engagement: "Audit",
      result: "SOC 2 Type II passed",
      icon: "Stethoscope",
      accentColor: "rose",
    },
    {
      name: "LoopFlow",
      industry: "DevTools",
      tagline: "CI/CD orchestration",
      engagement: "Pilot",
      result: "8\u202f→\u202f47 min runtime",
      icon: "Workflow",
      accentColor: "violet",
    },
    {
      name: "Numa Trading",
      industry: "Fintech",
      tagline: "Algorithmic trading platform",
      engagement: "Ongoing",
      result: "Zero prod regressions",
      icon: "TrendingUp",
      accentColor: "amber",
    },
    {
      name: "Beacon Analytics",
      industry: "SaaS",
      tagline: "Product analytics suite",
      engagement: "Implementation",
      result: "31\u202f→\u202f78% coverage",
      icon: "BarChart3",
      accentColor: "sky",
    },
    {
      name: "Verde Marketplace",
      industry: "E-commerce",
      tagline: "B2B marketplace",
      engagement: "Audit",
      result: "12 critical bugs found",
      icon: "Sprout",
      accentColor: "emerald",
    },
    {
      name: "PulseChart",
      industry: "Healthtech",
      tagline: "Patient monitoring SaaS",
      engagement: "Implementation",
      result: "HIPAA audit ready",
      icon: "Activity",
      accentColor: "rose",
    },
  ],
  footnote:
    "30+ engagements completed since 2024. Industry breakdown available on request.",
};
