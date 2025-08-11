export const homeData = {
    name: "Rishabh Singh Bisht",
    location: "Bangalore, India",
    phone: "+91 9354260456",
    email: "rissag906@gmail.com",
    linkedin: "https://linkedin.com/in/rishabhsingh940",
    github: "https://github.com/CurlyRishabh",
    typewriterTexts: [
        "Full Stack Developer",
        "AI/ML Engineer",
        "Solutions-Oriented Developer",
        "MERN Stack Specialist"
    ],
    summary: "Solutions-oriented Full Stack Developer with 1+ years of experience designing and implementing scalable applications using JavaScript, Python, and React.js. Specialized in artificial intelligence integration, workflow automation, and cloud infrastructure optimization, delivering 30%+ efficiency improvements across multiple projects."
}

export const projectData = [
    {
        title: "Generative AI Chat Platform",
        gitref: "https://github.com/CurlyRishabh/llmChatClone",
        liveref: "",
        image: "ai-chat",
        description: "Engineered a production-ready AI chatbot with DeepSeek models, supporting 100+ concurrent users with sub-second response times. Implemented context-aware conversation handling that improved response relevance by 40% compared to baseline models.",
        techStack: ["Ollama", "Flask", "React.js", "Docker"],
        highlights: ["100+ concurrent users", "Sub-second response times", "40% improved relevance"]
    },
    {
        title: "E-commerce Platform",
        gitref: "https://github.com/CurlyRishabh/E-commerce",
        liveref: "https://curlyrishabh.github.io/E-commerce",
        image: "ecommerce",
        description: "Developed a secure e-commerce platform with JWT authentication. Implemented advanced product filtering and search functionality that increased customer conversion rates by 35%. Designed user-friendly cart & checkout system for a seamless shopping experience.",
        techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
        highlights: ["35% increased conversion", "JWT authentication", "Advanced filtering"]
    },
    {
        title: "IMDB Clone",
        gitref: "https://github.com/CurlyRishabh/IMDB-clone",
        liveref: "",
        image: "imdb",
        description: "Created a high-performance movie database supporting 10,000+ movie entries with complex filtering capabilities. Implemented role-based access control system securing sensitive admin functions while allowing public access to reviews. Optimized database queries with Redis caching, reducing page load times by 65%.",
        techStack: ["Django", "PostgreSQL", "Django ORM", "Redis"],
        highlights: ["10,000+ movie entries", "65% faster load times", "Role-based access control"]
    }
]

export const experienceData = [
    {
        "company": {
            "name": "Rexera (formerly InspectHOA)",
            "logo_url": "https://media.licdn.com/dms/image/v2/D560BAQHcidrmQS12rA/company-logo_100_100/company-logo_100_100/0/1730891630815/swishclubhq_logo?e=1744848000&v=beta&t=EMXKM4qGESBxPraKjcBYnVccY4Un26gGBq_pH54Pdho",
            "link": "https://www.rexera.com"
        },
        "employment_period": {
            "start_date": "2025-02-01",
            "end_date": "",
        },
        "role": [
            {
                "title": "Software Engineer (Contract)",
            }
        ],
        "tasks": [
            "Engineered AI-driven solutions using Python, LangChain, and Large Language Model (LLM) APIs, increasing client satisfaction by 25% and reducing manual processing time by 40%",
            "Redesigned the Mailbox Agent application to predict client communications with 85% accuracy by implementing advanced Natural Language Processing (NLP) algorithms",
            "Collaborated with cross-functional teams to enhance the Document Ordering Bot, resulting in 30% reduction in document processing time and 20% fewer errors",
            "Streamlined integration between AI backend services and frontend React components, decreasing system response time by 35%"
        ]
    },
    {
        "company": {
            "name": "Swish Club",
            "logo_url": "https://media.licdn.com/dms/image/v2/D560BAQHcidrmQS12rA/company-logo_100_100/company-logo_100_100/0/1730891630815/swishclubhq_logo?e=1744848000&v=beta&t=EMXKM4qGESBxPraKjcBYnVccY4Un26gGBq_pH54Pdho",
            "link": "https://www.linkedin.com/company/98839840/"
        },
        "employment_period": {
            "start_date": "2024-06-01",
            "end_date": "2025-01-31",
        },
        "role": [
            {
                "title": "Software Engineer (Contract)",
            }
        ],
        "tasks": [
            "Architected and deployed 3 critical internal dashboards using React.js and Budibase, serving 50+ internal users and streamlining operations by 40%",
            "Implemented comprehensive Invoice Generator CMS with React & Django, processing 500+ monthly invoices and reducing manual effort by 80%",
            "Engineered automated workflows using N8n that eliminated 15+ hours of weekly manual tasks and improved data accuracy by 95%",
            "Optimized HomeStore Dashboard performance, reducing page load time by 60% and increasing user retention by 25%"
        ]
    },
    {
        "company": {
            "name": "MountBlue Technologies",
            "logo_url": "https://media.licdn.com/dms/image/v2/D560BAQHcidrmQS12rA/company-logo_100_100/company-logo_100_100/0/1730891630815/swishclubhq_logo?e=1744848000&v=beta&t=EMXKM4qGESBxPraKjcBYnVccY4Un26gGBq_pH54Pdho",
            "link": "https://mountblue.io"
        },
        "employment_period": {
            "start_date": "2024-03-01",
            "end_date": "",
        },
        "role": [
            {
                "title": "Software Development Engineer",
                "description": "Developed and maintained various web applications, ensuring high performance and responsiveness."
            }
        ],
        "tasks": [
            "Developed a responsive full-stack application using JavaScript and Django that handled 10,000+ concurrent users",
            "Optimized data processing algorithms for 500K+ dataset entries, improving query performance by 70%",
            "Refactored backend API architecture, reducing response time from 900ms to 250ms and enhancing overall system throughput by 45%"
        ]
    }
]

export const skillsData = {
    "languages": [
        { "name": "JavaScript", "description": "ES6+ features for modern web development, both frontend and backend.", "icon": "javascript" },
        { "name": "TypeScript", "description": "Strongly typed programming language that builds on JavaScript.", "icon": "typescript" },
        { "name": "Python", "description": "Versatile language used in web development, data analysis, AI, and automation.", "icon": "python" },
        { "name": "C++", "description": "High-performance language for system programming and competitive coding.", "icon": "cpp" }
    ],
    "frontend": [
        { "name": "React.js", "description": "JavaScript library for building interactive user interfaces.", "icon": "react" },
        { "name": "Next.js", "description": "React framework with server-side rendering and static site generation.", "icon": "nextjs" },
        { "name": "Redux", "description": "Predictable state container for JavaScript applications.", "icon": "redux" },
        { "name": "HTML5", "description": "Latest version of markup language for structuring web content.", "icon": "html" },
        { "name": "CSS3", "description": "Stylesheet language with modern features for responsive design.", "icon": "css" },
        { "name": "Material UI", "description": "React components implementing Google's Material Design.", "icon": "materialui" },
        { "name": "Bootstrap", "description": "CSS framework for responsive, mobile-first web development.", "icon": "bootstrap" }
    ],
    "backend": [
        { "name": "Node.js", "description": "JavaScript runtime for building scalable server-side applications.", "icon": "nodejs" },
        { "name": "Express.js", "description": "Fast, unopinionated web framework for Node.js applications.", "icon": "express" },
        { "name": "Django", "description": "High-level Python web framework for rapid development.", "icon": "django" },
        { "name": "Flask", "description": "Lightweight Python web framework for building APIs and web apps.", "icon": "flask" },
        { "name": "REST APIs", "description": "Architectural style for designing networked applications.", "icon": "api" },
        { "name": "GraphQL", "description": "Query language and runtime for APIs with flexible data fetching.", "icon": "graphql" }
    ],
    "databases": [
        { "name": "MongoDB", "description": "NoSQL document database for modern applications.", "icon": "mongodb" },
        { "name": "PostgreSQL", "description": "Advanced open-source relational database system.", "icon": "postgresql" },
        { "name": "MySQL", "description": "Popular open-source relational database management system.", "icon": "mysql" },
        { "name": "Redis", "description": "In-memory data structure store for caching and real-time applications.", "icon": "redis" }
    ],
    "devops_tools": [
        { "name": "Docker", "description": "Platform for developing, shipping, and running applications in containers.", "icon": "docker" },
        { "name": "Kubernetes", "description": "Container orchestration platform for automating deployment and scaling.", "icon": "kubernetes" },
        { "name": "CI/CD", "description": "Continuous integration and deployment practices for automated workflows.", "icon": "cicd" },
        { "name": "Git", "description": "Distributed version control system for tracking code changes.", "icon": "git" },
        { "name": "Linux", "description": "Open-source operating system for development and server environments.", "icon": "linux" },
        { "name": "AWS", "description": "Cloud computing platform with comprehensive infrastructure services.", "icon": "aws" }
    ],
    "ai_ml": [
        { "name": "LangChain", "description": "Framework for developing applications with large language models.", "icon": "langchain" },
        { "name": "OpenAI API", "description": "API for integrating GPT models and AI capabilities into applications.", "icon": "openai" },
        { "name": "HuggingFace", "description": "Platform for machine learning models and natural language processing.", "icon": "huggingface" },
        { "name": "TensorFlow", "description": "Open-source machine learning framework for building AI models.", "icon": "tensorflow" },
        { "name": "PyTorch", "description": "Deep learning framework for research and production applications.", "icon": "pytorch" }
    ],
    "automation": [
        { "name": "Budibase", "description": "Low-code platform for building internal tools and business applications.", "icon": "budibase" },
        { "name": "N8n", "description": "Workflow automation tool for connecting different services and APIs.", "icon": "n8n" },
        { "name": "Celery", "description": "Distributed task queue for Python applications.", "icon": "celery" },
        { "name": "Apache Kafka", "description": "Distributed streaming platform for real-time data processing.", "icon": "kafka" }
    ]
}

export const contactData = {
    email: "rissag906@gmail.com",
    phone: "+91 9354260456",
    location: "Bangalore, India",
    social: {
        linkedin: "https://linkedin.com/in/rishabhsingh940",
        github: "https://github.com/CurlyRishabh",
        twitter: "",
        portfolio: ""
    }
}

export const educationData = {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Lovely Professional University, Punjab",
    period: "2019 - 2023",
    coursework: ["Data Structures", "Algorithms", "Database Management", "Web Development", "Machine Learning"]
}