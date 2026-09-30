/**
 * Projects Data - Used to populate the Projects showcase section
 * Each project is clickable and can show detailed demos/architecture
 */

export const projects = [
  {
    id: "scrutinizer-migration",
    title: "Tier-1 Malware Scanning Migration",
    company: "Amazon",
    badge: "Distributed Systems",
    shortDescription: "Migrated 2,500+ tenants from legacy SWF to Scrutinizer with zero downtime",

    highlights: [
      "35% latency improvement (1.4s → 900ms)",
      "Zero customer-facing incidents",
      "2,500+ enterprises migrated",
    ],

    technologies: ["AWS Lambda", "SQS", "DynamoDB", "Evidently", "Python"],

    challenge: "Move 2,500 customers off legacy infrastructure without downtime while maintaining security guarantees",

    whatYouLearn: [
      "How to design safe migrations at scale",
      "Shadow mode validation technique",
      "Gradual traffic shifting with weighted routing",
      "Handling distributed system failures",
    ],

    impact: "Enabled centralized scanning platform. Improved performance. Reduced operational overhead.",
  },

  {
    id: "smartscanner",
    title: "SmartScanner - AI/ML Scanner Selection",
    company: "Amazon",
    badge: "AI/ML",
    shortDescription: "ML model that intelligently routes files to optimal malware scanners",

    highlights: [
      "78.5% prediction accuracy",
      "23.4% performance improvement",
      "Trained on 24M+ historical scans",
    ],

    technologies: ["Python", "Pandas", "scikit-learn", "SageMaker", "AWS"],

    challenge: "Multiple scanners with different characteristics. Optimize routing without compromising security.",

    whatYouLearn: [
      "Feature engineering for production ML",
      "Training models on historical data",
      "Feedback loops for continuous improvement",
      "AI safety: ML as optimization layer, not authority",
    ],

    impact: "Faster scan times while maintaining security guarantees",
  },

  {
    id: "ai-onboarding-agent",
    title: "AI-Assisted Onboarding Agent",
    company: "Amazon",
    badge: "Generative AI",
    shortDescription: "LLM-powered system automating customer onboarding tickets (20-30/day)",

    highlights: [
      "Automated repetitive ticket processing",
      "RAG for grounded context retrieval",
      "Deterministic validation layers",
    ],

    technologies: ["Amazon Bedrock", "RAG", "Lambda", "DynamoDB", "Slack"],

    challenge: "Support engineers manually processing 20-30 tickets per day. Need intelligent automation.",

    whatYouLearn: [
      "RAG (Retrieval-Augmented Generation) pattern",
      "LLM integration in production",
      "AI safety: deterministic validation as final boundary",
      "Human oversight in automated systems",
    ],

    impact: "Reduced manual work. Faster customer onboarding. Maintained safety guarantees.",
  },

  {
    id: "deletion-handler",
    title: "Large-Scale Data Deletion",
    company: "Amazon",
    badge: "Big Data",
    shortDescription: "Safely deleted 9B records and 17PB of data in 5-day SLA",

    highlights: [
      "9 billion DynamoDB records",
      "17 petabytes of S3 data",
      "Zero unintended deletions",
      "Zero customer impact",
    ],

    technologies: ["Lambda", "SQS", "DynamoDB", "S3", "Python"],

    challenge: "Remove stale data at massive scale without impacting production traffic",

    whatYouLearn: [
      "Large-scale data processing",
      "Bounded concurrency to protect production",
      "Design for failures and retries",
      "Idempotent operations",
    ],

    impact: "Cleaned 40% of Version table. Sustained infrastructure cost reduction.",
  },

  {
    id: "sftp-modernization",
    title: "Identity Modernization (SFTP)",
    company: "Amazon",
    badge: "Security",
    shortDescription: "Migrated 2,784 users from legacy credentials to Cognito/OIDC",

    highlights: [
      "2,784 users migrated",
      "Zero downtime",
      "Enhanced security posture",
      "Modern authentication system",
    ],

    technologies: ["AWS Transfer Family", "Cognito", "OIDC", "Lambda", "Route53"],

    challenge: "Upgrade security without breaking existing workflows for thousands of users",

    whatYouLearn: [
      "Authentication vs. Authorization separation",
      "Parallel operation for safe migration",
      "Gradual rollout techniques",
      "Federation and identity management",
    ],

    impact: "Improved security. Enabled MFA. Centralized identity management.",
  },

  {
    id: "synthetic-canary",
    title: "Synthetic Canary Monitoring",
    company: "Amazon",
    badge: "Observability",
    shortDescription: "End-to-end monitoring that catches issues before customers do",

    highlights: [
      "Proactive issue detection",
      "Customer workflow validation",
      "Performance regression detection",
    ],

    technologies: ["CloudWatch", "Lambda", "Metrics"],

    challenge: "Component health ≠ customer workflow health. Need end-to-end visibility.",

    whatYouLearn: [
      "Observability vs. monitoring",
      "Synthetic testing best practices",
      "Designing from customer perspective",
      "Actionable alerting",
    ],

    impact: "Caught issues early. Prevented customer impact. Improved reliability.",
  },

  {
    id: "website-modernization",
    title: "Website Modernization",
    company: "Amazon",
    badge: "Full-Stack",
    shortDescription: "Modernized internal tool with React frontend and Spring Boot backend",

    highlights: [
      "React component architecture",
      "Spring Boot microservices",
      "Mentored junior engineers",
    ],

    technologies: ["React", "Spring Boot", "DynamoDB", "REST APIs"],

    challenge: "Balance UX simplicity with security requirements",

    whatYouLearn: [
      "React hooks and state management",
      "Separating frontend UX from backend validation",
      "Mentoring and delegation",
      "Cross-functional collaboration",
    ],

    impact: "Improved user experience. Enhanced maintainability. Grew team capability.",
  },

  {
    id: "das-cas-compatibility",
    title: "DAS → CAS Compatibility",
    company: "Amazon",
    badge: "Legacy Migration",
    shortDescription: "Enabled reading legacy system data during retirement migration",

    highlights: [
      "Transparent migration",
      "Zero customer changes",
      "Gradual transition path",
    ],

    technologies: ["Java", "Spring Boot", "DynamoDB"],

    challenge: "Retire old system while supporting historical data without client changes",

    whatYouLearn: [
      "Migration strategy design",
      "Platform absorbing complexity",
      "Read vs. write path divergence",
      "Backward compatibility",
    ],

    impact: "Enabled system retirement. Reduced client friction.",
  },

  {
    id: "newsstand-onboarding",
    title: "Newsstand Integration",
    company: "Amazon",
    badge: "Cross-Team",
    shortDescription: "Integrated Newsstand content workflows into CAS platform",

    highlights: [
      "Cross-team collaboration",
      "Device validation",
      "Configuration-driven design",
    ],

    technologies: ["Java", "AWS", "DynamoDB", "S3"],

    challenge: "Support another team's workflow using platform capabilities",

    whatYouLearn: [
      "Requirements gathering",
      "Platform thinking",
      "Device-level considerations",
      "End-to-end ownership",
    ],

    impact: "Enabled Newsstand content delivery. Leveraged platform capabilities.",
  },

  {
    id: "risk-analytics",
    title: "Risk/Return Analytics Platform",
    company: "Ostrich Software Solutions",
    badge: "FinTech",
    shortDescription: "High-performance financial analytics serving 7,650+ assets",

    highlights: [
      "7,650+ financial assets",
      "25% latency improvement",
      "P90 latency < 5 seconds",
    ],

    technologies: ["Spring Boot", "PostgreSQL", "Aerospike", "React"],

    challenge: "Optimize analytics queries for financial datasets",

    whatYouLearn: [
      "Caching strategies (Aerospike)",
      "Query optimization",
      "Financial domain knowledge",
      "Performance tuning",
    ],

    impact: "Faster analytics. Better user experience.",
  },

  {
    id: "freshpaws",
    title: "FreshPaws (Learning Project)",
    company: "Personal Project",
    badge: "Full-Stack",
    shortDescription: "End-to-end dog-food subscription platform - learning project",

    highlights: [
      "Full architecture design",
      "Data pipeline (Bronze layer)",
      "Docker Compose infrastructure",
    ],

    technologies: ["Python", "PostgreSQL", "MinIO", "Pandas", "Docker"],

    challenge: "Build complete system from scratch to learn architecture patterns",

    whatYouLearn: [
      "End-to-end system design",
      "Data engineering (ETL/ELT)",
      "Infrastructure as code",
      "Incremental feature development",
    ],

    impact: "Practical learning. Applied real patterns.",
  },
]

export default projects
