// Mirrors the resume JSON. Highlights carry an optional metric shown in the margin rail.
export const resume = {
    name: {
        full: "Rishabh Singh Bisht",
        first: "Rishabh",
        middle: "Singh",
        last: "Bisht",
    },
    headline: "Software Engineer - AI Automation and Distributed Systems",
    tagline: "I build LLM agents that work through vendor portals with no API, and the queues and Kubernetes setup that keep those runs alive through crashes and deploys.",
    contact: {
        location: "Bangalore, India",
        city: "Bangalore",
        country: "India",
        email: "rishabh.bisht.dev@gmail.com",
        linkedin: "https://linkedin.com/in/rishabhsingh940",
        github: "https://github.com/CurlyRishabh",
    },
    summary: "Software Engineer with 2.5+ years of experience building highly-available systems and production-grade LLM agent platforms.",
    total_experience_years: 2.5,
    primary_languages: "TypeScript and Python",
    experience: [
        {
            company: "RealPage",
            note: "Rexera, acquired by RealPage",
            title: "Software Development Engineer",
            location: "Bangalore",
            start_date: "Aug 2025",
            end_date: "Present",
            current: true,
            case_study: { href: "/work/browser-agents", label: "How the automation platform is built" },
            tech: ["TypeScript", "Node.js", "Playwright", "Stagehand", "Bull", "Redis", "Kubernetes", "Python", "Django", "Gemini", "OpenAI"],
            highlights: [
                {
                    metric: "90%",
                    label: "of eligible order volume automated",
                    text: "Architected an LLM-driven browser automation platform across 8+ vendor portals that have no API. LLM agents handle DOM navigation and deterministic Playwright handles payments and MFA. Runs at 80% accuracy and saves analysts 10–20 minutes per order.",
                },
                {
                    metric: "35 min",
                    label: "graceful drain on deploy",
                    text: "Moved multi-minute agent workflows off the API pods onto a Bull/Redis queue on Kubernetes, with a Node cluster autoscaling from 1 to 3 pods. Payment runs are never retried because they are not idempotent, workers drain on SIGTERM, and credentials are stripped from job payloads.",
                },
                {
                    metric: "640 MB",
                    label: "V8 heap cap per worker",
                    text: "Stopped out-of-memory crashes caused by cluster forks sizing themselves to the host's cores instead of the pod's limit. Patched CPU-aware process sizing, capped the heap, and unified requests and limits so HPA scaling stays stable.",
                },
                {
                    metric: "1–3 days",
                    label: "to onboard a vendor, down from 1–2 weeks",
                    text: "Re-architected portal integrations around declarative, database-driven configs and connection factories while migrating Stagehand v2 to v3. New vendors go live without a deployment.",
                },
            ],
        },
        {
            company: "MountBlue Technologies",
            title: "Software Development Engineer",
            note: "client engagements",
            start_date: "Mar 2024",
            end_date: "Jul 2025",
            current: false,
            tech: ["React", "Node.js", "Python", "Django", "LangChain", "n8n", "Budibase", "Gemini", "OpenAI"],
            clients: [
                {
                    client: "Rexera, now part of RealPage",
                    start_date: "Feb",
                    end_date: "Jul 2025",
                    highlights: [
                        {
                            metric: "~80%",
                            label: "of eligible client emails answered",
                            text: "Built the Mailbox Agent, which answers order questions around the clock, such as the HOA or property manager name. Payment details and sensitive questions are flagged for the operations team.",
                        },
                        {
                            metric: "Multi-agent",
                            label: "document intelligence",
                            text: "Built a multi-agent LLM workflow that extracts terms from unstructured legal and financial documents and cross-checks them against client emails for reconciliation and QA.",
                        },
                    ],
                },
                {
                    client: "Swish Club",
                    start_date: "Jul 2024",
                    end_date: "Jan 2025",
                    highlights: [
                        {
                            metric: "15 h",
                            label: "of admin work saved each week",
                            text: "Built a CMS-based generator in React and Django that removed 90% of manual data entry.",
                        },
                        {
                            metric: "500+",
                            label: "app products and coupons managed",
                            text: "Built an internal operations dashboard for the mobile app catalogue, so content changes no longer need database edits or code deploys.",
                        },
                    ],
                },
            ],
        },
    ],
    skills: {
        "Languages": ["TypeScript", "JavaScript", "Python", "C++"],
        "Backend & web": ["Node.js", "Express", "Django", "FastAPI", "REST APIs", "Bull", "Redis queues", "Celery", "React", "Next.js"],
        "AI & automation": ["LLM agents (Gemini, OpenAI)", "LangChain", "Playwright", "Stagehand", "Browserbase", "n8n"],
        "Infrastructure": ["PostgreSQL", "Redis", "Docker", "Kubernetes (HPA)", "Git", "CI/CD", "AWS", "Linux"],
    },
    education: [
        {
            degree: "B.Tech",
            field: "Computer Science and Engineering",
            institution: "Lovely Professional University",
            location: "Punjab",
            start_year: 2019,
            end_year: 2023,
        },
    ],
    updated: "Oct 2026",
};
