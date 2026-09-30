/**
 * Resume Data - Skills, Education, and Experience summary
 * Used to populate the Resume section of the portfolio
 */

export const resume = {
  professional: {
    title: "Software Engineer",
    subtitle: "Distributed Systems & AI/ML",
    bio: "Production software engineer with 6+ years building Tier-1 systems at Amazon, financial platforms at Ostrich, and enterprise software at SM Enterprises. Expertise in backend architecture, cloud infrastructure, AI/ML integration, and production reliability.",
  },

  skills: [
    {
      category: "Languages",
      items: ["Java", "Python", "JavaScript/Node.js", "SQL"],
      proficiency: "Expert",
    },
    {
      category: "Backend",
      items: ["Spring Boot", "Spring Cloud", "Microservices", "REST APIs", "Event-Driven Architecture"],
      proficiency: "Expert",
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS (Lambda, DynamoDB, S3, SQS, SNS)", "Docker", "CI/CD", "Infrastructure as Code"],
      proficiency: "Expert",
    },
    {
      category: "Databases",
      items: ["DynamoDB", "PostgreSQL", "MongoDB", "Redis", "Aerospike"],
      proficiency: "Expert",
    },
    {
      category: "AI/ML",
      items: ["Retrieval-Augmented Generation (RAG)", "LLMs", "Feature Engineering", "SageMaker", "Bedrock"],
      proficiency: "Intermediate to Advanced",
    },
    {
      category: "Frontend",
      items: ["React 18", "Tailwind CSS", "JavaScript", "State Management"],
      proficiency: "Intermediate",
    },
  ],

  experience: [
    {
      role: "Software Development Engineer II",
      company: "Amazon",
      duration: "2+ years",
      highlights: [
        "Full-stack ownership of Tier-1 Content Asset Service (malware scanning, processing)",
        "Designed and led migration of 2,500+ customers to Scrutinizer (35% latency improvement)",
        "Built AI-powered scanner selection system (SmartScanner) with 78.5% accuracy",
        "Implemented LLM-assisted onboarding automation using RAG",
        "Owned large-scale deletion handler: 9B records, 17PB safely deleted",
        "Led SFTP identity modernization: migrated 2,784 users to Cognito/OIDC",
        "On-call ownership for production incidents and outages",
        "Mentored junior engineers on distributed systems and production practices",
      ],
    },
    {
      role: "Senior Backend Engineer",
      company: "Ostrich Software Solutions",
      duration: "2+ years",
      highlights: [
        "Built high-throughput financial transaction processing microservices",
        "Designed Risk/Return Analytics platform serving 7,650+ assets",
        "Implemented caching strategies with Aerospike (25% latency improvement)",
        "Led AWS CDK infrastructure modernization",
        "Designed scalable Spring Boot architecture for fintech domain",
      ],
    },
    {
      role: "Full-Stack Engineer",
      company: "SM Enterprises",
      duration: "2+ years",
      highlights: [
        "Developed enterprise insurance software with Java/Spring and React",
        "Built policy administration and claims processing backends",
        "Modernized legacy applications with Spring Cloud",
        "Implemented CI/CD pipelines and automated testing",
        "Cross-functional collaboration with product and security teams",
      ],
    },
  ],

  education: [
    {
      field: "Computer Science/Engineering",
      focus: "Software Development, Data Structures, Algorithms, Distributed Systems",
      achievements: [
        "Strong foundation in fundamentals",
        "Algorithm optimization expertise",
        "System design thinking",
      ],
    },
  ],

  keyMetrics: [
    { label: "Major Projects", value: "10+" },
    { label: "Tenants Migrated", value: "2,500+" },
    { label: "Records Processed", value: "9B+" },
    { label: "Data Cleaned", value: "17PB" },
    { label: "Users Migrated", value: "2,784" },
    { label: "Performance Improved", value: "35%" },
  ],

  achievements: [
    {
      title: "Tier-1 System Ownership",
      description: "Designed and operated production systems serving millions of requests",
    },
    {
      title: "Safe Large-Scale Migrations",
      description: "Migrated 2,500+ customers without downtime using shadow mode and gradual rollout",
    },
    {
      title: "AI/ML Integration",
      description: "Built production ML systems with safety-first approach and continuous learning",
    },
    {
      title: "Extreme-Scale Data Processing",
      description: "Safely deleted 9 billion records and 17 petabytes of data",
    },
    {
      title: "Security Leadership",
      description: "Modernized identity infrastructure affecting 2,784+ users",
    },
    {
      title: "Team Leadership",
      description: "Mentored junior engineers, built high-performing teams",
    },
  ],

  principles: [
    {
      title: "Safety First",
      description: "Shadow mode, gradual rollout, and rollback capability for all changes",
    },
    {
      title: "Production Thinking",
      description: "Design for failures, monitor end-to-end workflows, own reliability",
    },
    {
      title: "Security Conscious",
      description: "Least privilege, deterministic validation, AI as optimization not authority",
    },
    {
      title: "Customer Focus",
      description: "Understand workflows before coding, validate on real scenarios",
    },
  ],
}

export default resume
