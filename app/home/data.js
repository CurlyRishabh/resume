// Single source of truth for the site content. Mirrors the CV (rishabhBishtDev.pdf).

export const homeData = {
    name: "Rishabh Singh Bisht",
    headline: "Software Engineer",
    focus: "AI Automation and Distributed Systems",
    location: "Bangalore, India",
    phone: "+91 9354260456",
    email: "rishabh.bisht.dev@gmail.com",
    linkedin: "https://linkedin.com/in/rishabhsingh940",
    github: "https://github.com/CurlyRishabh",
    resume: "/rishabhBishtDev.pdf",
    experienceYears: "2.5+",
    summary: "Software Engineer with 2.5+ years of experience building highly-available systems and production-grade LLM agent platforms. End-to-end owner of a fault-tolerant LLM agent platform (TypeScript, React, Kubernetes), with a focus on backend infrastructure, high-concurrency workloads, and operational efficiency across enterprise workflows.",
    stats: [
        { value: "8+", label: "API-less vendor portals automated" },
        { value: "90%", label: "of eligible order volume automated" },
        { value: "1–3 days", label: "to onboard a vendor, down from 1–2 weeks" },
        { value: "~80%", label: "of eligible client emails auto-replied" }
    ]
}

// Work shown in the "What I've Built" section. All of it shipped at work,
// so descriptions stay at the level of the CV.
export const projectData = [
    {
        title: "LLM Browser Automation Platform",
        context: "RealPage (Rexera)",
        problem: "Vendor portals with no API meant analysts spent 10–20 minutes on every order by hand.",
        built: "A platform where LLM agents navigate each portal's pages, while deterministic Playwright scripts handle the steps that must never go wrong: payments and MFA.",
        result: "Automated 90% of eligible volume across 8+ portals.",
        techStack: ["TypeScript", "Node.js", "Playwright", "Stagehand", "Gemini", "OpenAI"]
    },
    {
        title: "Agent Job Queue on Kubernetes",
        context: "RealPage (Rexera)",
        problem: "Agent runs take minutes, which tied up API pods and crashed containers that ran out of memory.",
        built: "Moved agent runs onto a Bull/Redis queue with autoscaling workers, no retries on payment runs, 35-minute graceful drains during deploys, and CPU-aware process sizing.",
        result: "Stable autoscaling, an end to the out-of-memory crashes, and deploys that let running jobs finish.",
        techStack: ["Bull", "Redis", "Kubernetes (HPA)", "Node.js", "Docker"]
    },
    {
        title: "Mailbox Agent",
        context: "Rexera, via MountBlue",
        problem: "Client emails about orders arrived around the clock and waited for a person to answer.",
        built: "An agent that answers order questions, such as the HOA or property manager name, and flags payment details and sensitive queries for the operations team.",
        result: "Auto-replies to ~80% of eligible client emails, with a human in the loop for the rest.",
        techStack: ["Python", "LangChain", "Gemini", "OpenAI"]
    },
    {
        title: "Document Intelligence Workflow",
        context: "Rexera, via MountBlue",
        problem: "Legal and financial documents arrived unstructured and had to be checked by hand against client communications.",
        built: "A multi-agent LLM workflow that extracts the terms from each document and cross-references them against what the client was told.",
        result: "End-to-end extraction, QA and reconciliation in one automated flow.",
        techStack: ["Python", "LangChain", "LLM agents"]
    },
    {
        title: "CMS Generator and Operations Dashboard",
        context: "Swish Club, via MountBlue",
        problem: "Content changes needed manual data entry, database edits and a code deployment.",
        built: "A CMS-based generator and an internal dashboard to manage 500+ mobile app products and coupons without engineering involvement.",
        result: "Removed 90% of manual data entry, saving ~15 hours every week.",
        techStack: ["React", "Django", "Budibase", "n8n"]
    }
]

export const experienceData = [
    {
        company: "RealPage, Inc.",
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
