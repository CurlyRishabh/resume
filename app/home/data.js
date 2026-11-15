// Single source of truth for the site content. Mirrors the CV (rishabhBishtDev.pdf).

export const homeData = {
    name: "Rishabh Singh Bisht",
    headline: "Software Engineer",
    focus: "AI Automation and Distributed Systems",
    // One plain sentence a non-engineer can repeat. `taglineAccent` is the
    // part that gets the animated underline.
    tagline: "I build AI agents that do repetitive work",
    taglineAccent: "automatically",
    intro: "Software Engineer with 2.5+ years of experience, currently at RealPage. I take tasks that people used to do by hand and build the software that does them reliably, around the clock.",
    location: "Bangalore, India",
    phone: "+91 9354260456",
    email: "rishabh.bisht.dev@gmail.com",
    linkedin: "https://linkedin.com/in/rishabhsingh940",
    github: "https://github.com/CurlyRishabh",
    resume: "/rishabhBishtDev.pdf",
    experienceYears: "2.5+",
    // Drift slowly at the sides of the hero on wide screens.
    floatingChips: ["TypeScript", "Python", "Kubernetes", "Playwright", "LLM agents", "Redis", "Kotlin", "Next.js"]
}

// Personal projects: things anyone can download, run or read the code of.
// Facts come from each repository's README and source.
export const builtData = [
    {
        id: "voicetype",
        name: "VoiceType",
        kind: "Android and macOS app",
        line: "Free, private, offline voice typing. Talk in any app and get clean, punctuated text.",
        points: [
            "Your voice never leaves the device: the apps have no network permission at all",
            "Removes filler words and applies your self-corrections as you speak",
            "English, Hindi and Hinglish, with optional on-device AI polish"
        ],
        techStack: ["Kotlin", "Swift", "Whisper", "Moonshine", "sherpa-onnx", "Gemma (LiteRT-LM)"],
        links: [
            { label: "Download", href: "https://github.com/CurlyRishabh/VoiceType/releases/latest", primary: true },
            { label: "View code", href: "https://github.com/CurlyRishabh/VoiceType" }
        ],
        visual: "voice",
        caption: "Illustration of how it works"
    },
    {
        id: "shop",
        name: "Cool Store",
        kind: "Web app, live demo",
        line: "A complete online shoe shop: browse, filter, add to cart and check out, all in the browser.",
        points: [
            "Filter products by category, brand, colour and price",
            "Cart with quantities and live totals, saved between visits",
            "Full checkout flow with an order ID, plus dark and light themes"
        ],
        techStack: ["React", "React Router", "Tailwind CSS", "Framer Motion"],
        links: [
            { label: "Open live site", href: "https://curlyrishabh.github.io/E-commerce/", primary: true },
            { label: "View code", href: "https://github.com/CurlyRishabh/E-commerce" }
        ],
        visual: "shop",
        caption: "Screenshot of the live site"
    },
    {
        id: "repl",
        name: "Terminal REPL Portfolio",
        kind: "Web app",
        line: "A portfolio you use like a terminal: type a command, or run any JavaScript.",
        points: [
            "Commands such as help, skills, projects and contact",
            "Anything else runs as JavaScript inside a sandboxed Web Worker",
            "A 2-second timeout stops runaway code from freezing the page"
        ],
        techStack: ["Next.js", "TypeScript", "React", "Web Workers"],
        links: [
            { label: "View code", href: "https://github.com/CurlyRishabh/repl-portfolio", primary: true }
        ],
        visual: "terminal",
        caption: "Illustration of how it works"
    }
]

// "Before and After" stories. Each one has a plain sentence for any reader,
// the manual steps before, the automated steps after, and one technical line
// for engineers. Everything here is taken from the CV; nothing is invented.
// The last `after` step is the result and is drawn highlighted.
export const projectData = [
    {
        title: "Orders on vendor websites, handled by AI",
        context: "RealPage (Rexera)",
        plain: "Analysts used to work through every order by hand on vendor websites that have no API. AI agents now do that work for 90% of eligible orders.",
        before: ["Analyst opens a vendor portal", "Works through the order by hand", "10–20 minutes on every order"],
        after: ["Order comes in", "AI agent navigates the portal", "Fixed scripts handle payment and login codes", "90% of eligible orders automated"],
        tech: "LLM agents for DOM navigation, deterministic Playwright for payments and MFA, across 8+ API-less portals. TypeScript, Node.js, Stagehand, Gemini, OpenAI."
    },
    {
        title: "New vendors set up in days, not weeks",
        context: "RealPage (Rexera)",
        plain: "Adding a new vendor used to take one to two weeks and a software release. It now takes one to three days and no release.",
        before: ["New vendor requested", "Integration built and released", "1–2 weeks per vendor"],
        after: ["New vendor requested", "Vendor described in a configuration record", "No release needed", "1–3 days per vendor"],
        bars: {
            before: { label: "Before", value: "1–2 weeks", width: 100 },
            after: { label: "After", value: "1–3 days", width: 21 }
        },
        tech: "Declarative DB-driven configs and connection factories, with a migration from Stagehand v2 to v3."
    },
    {
        title: "Client emails answered automatically",
        context: "Rexera, via MountBlue",
        plain: "Clients email questions about their orders at all hours. An AI agent now answers about 80% of the eligible ones, and hands anything sensitive to a person.",
        before: ["Client emails a question about an order", "A team member looks it up and replies"],
        after: ["Email arrives, any time of day", "AI agent answers order questions", "Payment and sensitive topics go to a person", "~80% of eligible emails answered automatically"],
        tech: "The Mailbox Agent: an LLM agent with a human-in-the-loop escalation flag. Python, LangChain, Gemini, OpenAI."
    }
]

// Shown above the experience cards: explains why four company names appear
// in 2.5 years.
export const careerNote = "Since Feb 2025 I have worked on the same product: first for Rexera as a MountBlue engineer, then directly from Aug 2025. Rexera is now part of RealPage."

export const experienceData = [
    {
        company: "RealPage, Inc.",
        about: "US real-estate software company",
        note: "Rexera, acquired by RealPage",
        link: "https://www.realpage.com",
        title: "Software Development Engineer",
        location: "Bangalore",
        period: "Aug 2025 - Present",
        tech: ["TypeScript", "Node.js", "Playwright", "Stagehand", "Bull", "Redis", "Kubernetes", "Python", "Django", "Gemini", "OpenAI"],
        highlights: [
            "Architected an LLM-driven browser automation platform on 8+ API-less vendor portals, pairing LLM agents for DOM navigation with deterministic Playwright for payments/MFA. Automated 90% of eligible volume at 80% accuracy, cutting 10–20 min of manual analyst processing per order.",
            "Decoupled multi-minute agent workflows from API pods using a Bull/Redis queue on Kubernetes (Node cluster, autoscaling 1–3 pods). Enforced zero-retry policies on non-idempotent payment runs, graceful 35-min SIGTERM drains during deploys, and payload credential stripping.",
            "Prevented out-of-memory crashes by resolving container over-subscription caused by cluster forks reading host cores over pod limits; patched CPU-aware process sizing, capped V8 heap at 640 MB, and unified requests/limits for stable HPA autoscaling.",
            "Re-architected portal integrations using declarative DB-driven configs and connection factories (migrating Stagehand v2 to v3), cutting new-vendor onboarding from 1–2 weeks to 1–3 days without requiring deployments."
        ]
    },
    {
        company: "MountBlue Technologies",
        about: "Software engineering services company",
        note: "Client engagements",
        link: "https://mountblue.io",
        title: "Software Development Engineer",
        location: "",
        period: "Mar 2024 - Jul 2025",
        tech: ["React", "Node.js", "Python", "Django", "Gemini", "OpenAI", "Budibase", "n8n", "LangChain"],
        clients: [
            {
                client: "Rexera (now part of RealPage)",
                period: "Feb 2025 - Jul 2025",
                highlights: [
                    "Developed the Mailbox Agent that auto-replies to ~80% of eligible client emails around the clock, answering order questions such as the HOA or property manager name and escalating payment details and sensitive queries to the operations team through a human-in-the-loop flag.",
                    "Developed a multi-agent LLM workflow for end-to-end document intelligence, automating the extraction of unstructured legal/financial data and proactively cross-referencing the extracted terms against client communications for zero-defect QA and reconciliation."
                ]
            },
            {
                client: "Swish Club",
                period: "Jul 2024 - Jan 2025",
                highlights: [
                    "Eliminated 90% of manual data entry by architecting a CMS-based generator (React, Django), saving ~15 hours of administrative overhead weekly.",
                    "Engineered an internal operations dashboard to manage 500+ mobile app products and coupons. Decoupled content updates from the engineering lifecycle, eliminating the need for manual database interventions and code deployments."
                ]
            }
        ]
    }
]

export const skillsData = [
    {
        category: "Programming Languages",
        skills: ["TypeScript", "JavaScript", "Python", "C++"]
    },
    {
        category: "Backend and Frontend",
        skills: ["Node.js", "Express", "Django", "FastAPI", "REST APIs", "Bull", "Redis queues", "Celery", "React", "Next.js"]
    },
    {
        category: "AI and Automation",
        skills: ["LLM agents (Gemini, OpenAI)", "LangChain", "Playwright", "Stagehand", "Browserbase", "n8n"]
    },
    {
        category: "Data and Infrastructure",
        skills: ["PostgreSQL", "Redis", "Docker", "Kubernetes (HPA)", "Git", "CI/CD", "AWS", "Linux"]
    }
]

export const contactData = {
    email: "rishabh.bisht.dev@gmail.com",
    phone: "+91 9354260456",
    location: "Bangalore, India",
    social: {
        linkedin: "https://linkedin.com/in/rishabhsingh940",
        github: "https://github.com/CurlyRishabh"
    }
}

export const educationData = {
    degree: "Bachelor of Technology, Computer Science and Engineering",
    institution: "Lovely Professional University, Punjab",
    period: "2019 - 2023"
}
