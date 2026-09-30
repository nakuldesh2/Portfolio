/**
 * Knowledge Base for RAG (Retrieval-Augmented Generation)
 *
 * This file contains Nakul's comprehensive experience data.
 * When the AI chatbot answers questions, it searches this knowledge base
 * to find relevant context before generating responses.
 *
 * Why JSON instead of a database?
 * - Simplicity: No backend needed, works on static GitHub Pages
 * - Performance: Fast searches with built-in array methods
 * - Transparency: Hiring managers can see exact sources
 * - Maintainability: Easy to update and version control
 */

export const knowledgeBase = {
  // Professional Summary
  professional: {
    title: "Software Engineer - Distributed Systems & AI/ML",
    summary: "Production software engineer with 6+ years of experience building Tier-1 distributed systems at Amazon, financial platforms at Ostrich Software Solutions, and enterprise applications at SM Enterprises. Specialization in backend architecture, AWS cloud systems, AI/ML integration, and production reliability.",
    email: "nakuldeshpande92@gmail.com",
    location: "India",
  },

  // Work Experience
  experience: [
    {
      id: "amazon",
      company: "Amazon",
      role: "Software Development Engineer II",
      duration: "2+ years",
      focus: "Tier-1 Production Systems, Content Asset Service (CAS)",
      keyResponsibilities: [
        "Full-stack ownership of distributed content processing platform",
        "Design and implement malware scanning architecture migration",
        "Build AI/ML systems for intelligent scanner selection",
        "Lead large-scale data cleanup initiatives (9B records, 17PB)",
        "On-call ownership for production incidents",
      ],
      impact: "Migrated 2,500+ tenants with zero downtime, improved scan latency by 35%",
    },
    {
      id: "ostrich",
      company: "Ostrich Software Solutions",
      role: "Senior Backend Engineer",
      duration: "2+ years",
      focus: "Financial Technology, Microservices",
      keyResponsibilities: [
        "Built high-throughput financial transaction processing systems",
        "Designed Spring Boot microservices architecture",
        "Implemented caching strategies with Aerospike",
        "Led cloud infrastructure modernization with AWS CDK",
      ],
      impact: "Reduced API latency by 25%, served 7,650+ financial assets",
    },
    {
      id: "sm_enterprises",
      company: "SM Enterprises",
      role: "Full-Stack Engineer",
      duration: "2+ years",
      focus: "Enterprise Insurance Software",
      keyResponsibilities: [
        "Developed Java/Spring backend services for policy administration",
        "Built React dashboards for claims processing",
        "Modernized legacy applications with Spring Cloud",
        "Implemented CI/CD pipelines",
      ],
      impact: "Improved system performance, reduced technical debt",
    },
  ],

  // Technical Skills
  skills: {
    backend: {
      category: "Backend Development",
      languages: ["Java", "Python", "JavaScript/Node.js"],
      frameworks: ["Spring Boot", "Spring MVC", "Spring Cloud"],
      patterns: ["Microservices", "Event-Driven Architecture", "Async/Await"],
      why: "Used to build production systems at scale that handle high throughput and reliability requirements",
    },
    cloud: {
      category: "Cloud & Infrastructure",
      platforms: ["AWS"],
      services: ["Lambda", "DynamoDB", "S3", "SQS", "SNS", "EC2", "RDS", "CloudWatch"],
      iac: ["AWS CDK (TypeScript)", "CloudFormation"],
      why: "Deep expertise in building serverless and containerized systems on AWS",
    },
    databases: {
      category: "Data & Persistence",
      sql: ["PostgreSQL", "MySQL"],
      nosql: ["DynamoDB", "MongoDB", "Redis"],
      specialized: ["Aerospike (in-memory cache)"],
      why: "Chosen based on access patterns - DynamoDB for scale, PostgreSQL for ACID requirements",
    },
    ai_ml: {
      category: "AI/ML & LLMs",
      tools: ["Amazon SageMaker", "Amazon Bedrock", "Groq API", "Hugging Face"],
      techniques: ["Retrieval-Augmented Generation (RAG)", "Feature Engineering", "Model Training"],
      models: ["LLMs", "Random Forest", "Ensemble Methods"],
      why: "Built AI-assisted systems that optimize decisions while keeping deterministic validation as the safety layer",
    },
    frontend: {
      category: "Frontend Development",
      frameworks: ["React 18", "Redux"],
      styling: ["Tailwind CSS", "CSS3"],
      concepts: ["Hooks (useState, useEffect)", "Component Composition", "State Management"],
      why: "Used to build internal tools and dashboards that support backend services",
    },
    devops: {
      category: "DevOps & Reliability",
      tools: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions"],
      practices: ["CI/CD", "Automated Testing", "Monitoring & Observability"],
      why: "Ensures code quality and reliable deployments to production",
    },
  },

  // Education
  education: [
    {
      institution: "University Education",
      field: "Computer Science/Engineering",
      focus: "Software Development, Data Structures, Algorithms",
      achievements: [
        "Strong foundation in distributed systems",
        "Data structures and algorithm optimization",
        "Software engineering principles",
      ],
    },
  ],

  // Key Achievements
  achievements: [
    {
      title: "Tier-1 Malware Scanning Migration",
      impact: "Migrated 2,500+ customers from legacy SWF-based scanning to Scrutinizer platform with zero downtime",
      metrics: ["35% latency improvement (1.4s → 900ms)", "Zero customer-facing incidents"],
      skills: ["Distributed systems", "Safety-first migration", "Traffic shadowing"],
    },
    {
      title: "Large-Scale Data Cleanup",
      impact: "Safely deleted 9 billion DynamoDB records and 17 petabytes of S3 data within 5-day SLA",
      metrics: ["100% accuracy", "Zero unintended deletions", "Sustained cost reduction"],
      skills: ["Large-scale data processing", "Bounded concurrency", "Production safety"],
    },
    {
      title: "AI-Powered Onboarding Automation",
      impact: "Built AI-assisted ticket processing that intelligently handled 20-30 onboarding requests per day",
      metrics: ["Automation of repetitive tasks", "Deterministic validation layers", "Human oversight"],
      skills: ["LLM integration", "RAG", "Production AI safety"],
    },
    {
      title: "SmartScanner ML System",
      impact: "Built ML system for intelligent malware scanner selection achieving 78.5% accuracy",
      metrics: ["23.4% performance improvement", "Continuous feedback loop"],
      skills: ["Feature engineering", "ML modeling", "Production ML"],
    },
    {
      title: "Identity Modernization (SFTP)",
      impact: "Migrated 2,784 legacy SFTP users from host-based credentials to Cognito/OIDC federation",
      metrics: ["Zero downtime", "Enhanced security posture", "2,784 users migrated"],
      skills: ["Security architecture", "Authentication/Authorization", "Gradual migration"],
    },
  ],

  // Projects (detailed info for chatbot context)
  projects: [
    {
      id: "scrutinizer-migration",
      name: "Tier-1 Malware Scanning Migration to Scrutinizer",
      company: "Amazon",
      type: "Distributed Systems / Production Engineering",
      summary: "Migrated Content Asset Service (CAS) from legacy SWF-based scanning to centralized Scrutinizer platform",
      challenge: "Migrate 2,500 enterprise customers without downtime while maintaining security guarantees",
      solution: {
        approach: "Built ORCA orchestration layer, used shadow mode, gradual traffic shift",
        phases: [
          "Build new async path with ORCA orchestration",
          "Run in shadow mode to validate behavior",
          "Compare metrics (latency, error rates, scan accuracy)",
          "Gradual traffic shift using weighted routing",
          "Monitor and rollback capability maintained",
        ],
      },
      technologies: ["AWS SQS", "Lambda", "DynamoDB", "SNS", "Evidently"],
      metrics: {
        "Scan Latency": "1.4s → 900ms (35% improvement)",
        "Tenants Migrated": "2,500+",
        "Downtime": "Zero",
        "Incidents": "Zero",
      },
      keyLearnings: [
        "Safety-first migration strategy > speed",
        "Shadow mode validates in production",
        "Gradual rollout reduces blast radius",
        "Maintain rollback at every stage",
      ],
    },
    {
      id: "orca-orchestrator",
      name: "ORCA - Async Orchestration Layer",
      company: "Amazon",
      type: "Distributed Systems",
      summary: "Custom async orchestration layer replacing legacy SWF workflow",
      details: {
        purpose: "Coordinate malware scanning workflow with retry logic, failure handling, and idempotency",
        architecture: "Lambda-based workers, SQS for messaging, DLQ for failures",
        failureHandling: [
          "Transient failures → SQS retry with exponential backoff",
          "Duplicate messages → Idempotent operations via state checks",
          "Partial completion → Resume safely from last known state",
          "Persistent failures → Route to DLQ for manual intervention",
        ],
      },
      technologies: ["Python", "Lambda", "SQS", "DynamoDB"],
      keyLearnings: [
        "Design for failures from day one",
        "Idempotency is critical in distributed systems",
        "Separate concerns: scanning vs. notification",
        "Dead-letter queues are essential safety valves",
      ],
    },
    {
      id: "smartscanner",
      name: "SmartScanner - ML-Powered Scanner Selection",
      company: "Amazon",
      type: "AI/ML / Production Systems",
      summary: "ML system that intelligently selects malware scanners based on file characteristics",
      challenge: "Multiple scanners, different performance profiles. Optimize routing without compromising security.",
      solution: {
        mlApproach: "Random Forest model trained on 24M+ historical scan events",
        features: ["File size", "MIME type", "Asset type", "Scanner performance history"],
        feedback: "Continuous loop: predictions → actual outcomes → model retraining",
      },
      aiSafety: "ML is optimization layer only. Final malware detection decision remains with security scanners.",
      metrics: {
        "Prediction Accuracy": "78.5%",
        "Performance Improvement": "23.4%",
      },
      technologies: ["Python", "Pandas", "scikit-learn", "SageMaker"],
      keyLearnings: [
        "AI should optimize, not replace security boundaries",
        "Feedback loops prevent model drift",
        "Production ML requires continuous monitoring",
        "Low-confidence cases should use safe defaults",
      ],
    },
    {
      id: "ai-onboarding-agent",
      name: "AI-Assisted Scrutinizer Onboarding Agent",
      company: "Amazon",
      type: "Generative AI / Automation",
      summary: "LLM-powered system that automatically processes customer onboarding tickets",
      challenge: "Support engineers manually processing 20-30 tickets/day. Need intelligent automation.",
      solution: {
        architecture: "RAG-based agent with Amazon Bedrock",
        workflow: [
          "1. Retrieve similar historical tickets for context",
          "2. LLM interprets ticket and extracts requirements",
          "3. Deterministic validation checks required fields",
          "4. Invoke approved onboarding workflow if valid",
          "5. Human oversight for edge cases",
        ],
      },
      safetyMeasures: [
        "AI does interpretation only",
        "Deterministic validation is authoritative",
        "Scoped IAM permissions for tool access",
        "Human approval for high-risk cases",
        "Monitoring and alerting for anomalies",
      ],
      technologies: ["Amazon Bedrock", "RAG", "Lambda", "DynamoDB", "Slack"],
      keyLearnings: [
        "AI should never be the final security boundary",
        "Deterministic validation protects production",
        "RAG prevents hallucinations via grounding",
        "Human oversight remains essential",
        "Staged rollout catches edge cases early",
      ],
      incident: "One high-priority customer sent 10K files post-onboarding. Missing TPS validation caused brief throttling. Fixed by adding volume safeguards.",
    },
    {
      id: "deletion-handler",
      name: "Large-Scale Deletion Handler",
      company: "Amazon",
      type: "Distributed Systems / Big Data",
      summary: "Safely deleted 9B DynamoDB records and 17PB of S3 data in 5-day SLA",
      challenge: "Remove stale data associated with decommissioned asset types at massive scale without impacting production",
      solution: {
        approach: "Controlled deletion pipeline with safeguards",
        pipeline: [
          "1. DynamoDB export to S3",
          "2. Filter records by decommissioned assetType",
          "3. Create deletion manifest",
          "4. SQS-based worker queue",
          "5. Invoke existing deletion API (reuse trusted logic)",
          "6. Bounded concurrency (protect production traffic)",
        ],
        rejected: "S3 Lifecycle policies - lack control, async behavior, blast radius concerns",
      },
      safetyLayers: [
        "Filtered by decommissioned asset types only",
        "Reused existing deletion API (trusted business logic)",
        "Bounded concurrency (protect production)",
        "18-month Glacier retention for recovery",
        "Comprehensive monitoring and alerts",
      ],
      metrics: {
        "Records Deleted": "9 billion",
        "Data Cleaned": "17 petabytes",
        "Errors": "Zero",
        "Unintended Deletions": "Zero",
        "Timeline": "Within 5-day SLA",
      },
      technologies: ["DynamoDB Export", "Lambda", "SQS", "S3", "Python"],
      keyLearnings: [
        "First design doesn't always work (S3 Lifecycle)",
        "Reusing trusted patterns reduces risk",
        "Bounded concurrency protects production",
        "Retention policies enable recovery",
        "Comprehensive testing essential for high-blast-radius work",
      ],
    },
    {
      id: "sftp-modernization",
      name: "SFTP Identity Modernization",
      company: "Amazon",
      type: "Security / Authentication",
      summary: "Migrated 2,784 legacy SFTP users from host-based credentials to Cognito/OIDC federation",
      challenge: "Security requires moving away from username/password. 2,784 users, 10 vendor groups. Zero downtime.",
      solution: {
        architecture: [
          "AWS Transfer Family (managed SFTP endpoint)",
          "Amazon Cognito for identity",
          "OpenID Connect for federation",
          "Lambda for auth validation",
          "DynamoDB for user mapping",
        ],
        migration: [
          "Parallel operation (both old and new systems)",
          "Route53 weighted routing (gradual shift)",
          "Reduced TTLs for fast rollback",
          "Progressive user migration",
        ],
      },
      authModel: {
        authentication: "Who are you? (Cognito/OIDC)",
        authorization: "What can you access? (S3 path mapping)",
        principle: "Never assume auth => unrestricted access",
      },
      technologies: ["AWS Transfer Family", "Cognito", "OIDC", "Lambda", "DynamoDB", "Route53"],
      metrics: {
        "Users Migrated": "2,784",
        "Downtime": "Zero",
        "Security Improvement": "MFA, federation, modern identity",
      },
      keyLearnings: [
        "Separate authentication from authorization",
        "Parallel operations enable safe migration",
        "Weighted routing provides controlled rollout",
        "Internal callers also need authorization",
      ],
    },
    {
      id: "synthetic-canary",
      name: "Synthetic Canary - End-to-End Monitoring",
      company: "Amazon",
      type: "Production Engineering / Observability",
      summary: "Proactive synthetic monitoring system that catches workflow issues before customers do",
      challenge: "Component health != customer workflow health. Need end-to-end monitoring.",
      solution: {
        approach: "Run synthetic customer workflows periodically",
        workflow: [
          "Upload test asset",
          "Process through platform",
          "Download result",
          "Measure latency, errors, success rates",
        ],
        testing: [
          "Multiple file sizes",
          "Multiple file types",
          "Upload and download endpoints",
          "Aggregated health signal",
        ],
      },
      impact: "Caught performance regressions and workflow issues before production impact",
      technologies: ["CloudWatch", "Lambda", "Metrics"],
      keyLearnings: [
        "Infrastructure monitoring ≠ customer workflow monitoring",
        "Synthetic tests are early warning system",
        "Design monitoring from customer perspective",
      ],
    },
    {
      id: "newsstand-onboarding",
      name: "Newsstand Onboarding to CAS",
      company: "Amazon",
      type: "Cross-Team Integration / Distributed Systems",
      summary: "Integrated Newsstand content workflows into CAS platform",
      challenge: "Integrate another team's requirements without building custom solutions",
      approach: [
        "Requirements gathering with Newsstand team",
        "Understanding content types and device needs",
        "Leveraging CAS configuration-driven capabilities",
        "Phased rollout to Kindle devices",
      ],
      outcome: "Newsstand images served through CAS with device-specific derivations",
      keyLearnings: [
        "Understand partner requirements before designing",
        "Leverage platform capabilities (derivations, dimensions)",
        "End-to-end ownership through device validation",
        "Cross-team collaboration requires clear communication",
      ],
    },
    {
      id: "website-modernization",
      name: "Website Service Modernization",
      company: "Amazon",
      type: "Full-Stack / Mentoring",
      summary: "Modernized internal Website Service with React frontend and Spring Boot backend",
      challenges: [
        "UX wants fewer steps",
        "Security wants stronger checks",
        "Need consistent behavior",
      ],
      resolution: [
        "Simple UI flow",
        "Backend enforces all validation",
        "Clear error messages",
        "Security requirements independent of UI",
      ],
      mentoring: [
        "Explained architecture and business context",
        "Decomposed work into owned modules",
        "Weekly design reviews",
        "Included juniors in stakeholder discussions",
      ],
      technologies: ["React", "Spring Boot", "REST APIs", "DynamoDB"],
      philosophy: "Goal is not to become the bottleneck. Goal is to make others capable of making good decisions independently.",
    },
    {
      id: "das-cas-compatibility",
      name: "DAS → CAS Compatibility Migration",
      company: "Amazon",
      type: "Legacy Migration / Distributed Systems",
      summary: "Enabled CAS to read legacy Digital Asset System (DAS) content during migration",
      challenge: "Retire DAS, but customers still have historical content there",
      solution: [
        "New writes go to CAS",
        "Reads check asset source",
        "CAS-native: use normal path",
        "Legacy DAS: parse instruction file and serve",
      ],
      principle: "Platform should absorb compatibility complexity, not force clients to change",
      keyLearnings: [
        "Migration doesn't always mean big-bang",
        "Absorbing complexity inside platform reduces client work",
        "Read vs. write paths can diverge temporarily",
      ],
    },
  ],

  // Behavioral & Soft Skills
  softSkills: {
    leadership: {
      mentoring: "Mentored junior engineers, explained architecture and business context",
      collaboration: "Worked across teams (Newsstand, Security, Product) with different priorities",
      communication: "Communicated deadline risks early (CloudOne dependency), updated timelines",
    },
    problemSolving: {
      redesign: "First S3 Lifecycle approach didn't work for deletion. Redesigned with controlled pipeline.",
      resilience: "Handled AWS/DynamoDB outages. Identified recovery gaps, created reliability improvements.",
      productThinking: "Understood customer workflows before building. Validated on real devices.",
    },
    decisionMaking: {
      tradeoffs: "Chose Lambda over Fargate for scanning migration (less risk, less complexity despite less modern)",
      timing: "Prioritized security guarantees (CloudOne) over schedule",
      judgment: "Recognized S3 Lifecycle wasn't suitable, proposed better approach",
    },
  },

  // System Design Knowledge
  systemDesigns: [
    {
      name: "Content Asset Service (CAS)",
      tier: "Tier-1",
      components: ["Locator Service", "Processor Service", "Workflow Service", "Commons Service"],
      dataModel: ["S3 for file storage", "DynamoDB Version table", "DynamoDB Scan table"],
      apis: ["UploadActivity", "DownloadActivity", "ListActivity", "DeleteActivity"],
      throughput: "Configurable TPS, availability levers for Tier-1/Tier-2 services",
    },
    {
      name: "Scrutinizer Platform",
      description: "Centralized malware scanning",
      scanners: "5+ scanning engines",
      clients: "CAS, other content platforms",
      features: "Scalable, multi-tenant, comprehensive scanner ecosystem",
    },
  ],

  // Why Different Skills
  whySkillsUsed: {
    java_spring: "Used for production-scale backend services at Amazon and Ostrich. Strong foundation for microservices and distributed systems.",
    python: "Used for ML/data processing (SmartScanner), data pipelines (FreshPaws), and Lambda functions.",
    react: "Built internal dashboards, website modernization, and now this portfolio to demonstrate modern frontend skills.",
    aws: "Core platform at Amazon and Ostrich. Expertise in Lambda, DynamoDB, S3, SQS, SNS, CloudWatch for serverless architecture.",
    ml: "SmartScanner project demonstrates understanding of ML in production - feature engineering, continuous learning, safety boundaries.",
  },
}

export default knowledgeBase
