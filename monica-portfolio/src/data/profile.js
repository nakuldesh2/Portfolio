// Single source of truth for everything about Monica that is NOT a project.
// The UI renders from this file AND the AI chatbot's knowledge base is built
// from it (see src/ai/knowledge.js). Edit here and both stay in sync.
//
// Rule: every fact here must be traceable to the resume or to Monica herself.
// See .claude/rules/content-accuracy.md

export const profile = {
  name: 'Monica Narendra Choudhari',
  shortName: 'Monica',
  title: 'Software Engineer',
  location: 'Redmond, WA',
  email: 'monicachoudhari94@gmail.com',
  github: 'https://github.com/MonicaChoudhari',
  linkedin: '',
  photo: 'profile.jpg', // file in public/; set to '' to hide the photo // TODO(Monica): paste your LinkedIn URL. The link stays hidden while this is empty.
  headline: 'I build backend, data & AI systems that scale.',
  tagline:
    'Backend services, event-driven systems, cloud data platforms, secure identity, and agentic AI: from an end-to-end 24-dataset Medallion migration to a controlled pipeline that removed 17 PB of obsolete data.',
  summary:
    'Software Engineer with mid-senior expertise building scalable backend services, event-driven systems, and cloud data platforms. Led the end-to-end migration of 24 datasets to a medallion-architecture warehouse, removed 17 PB of obsolete data with a controlled deletion pipeline, and built AI features including ML-driven scanner selection, an onboarding assistant and an agentic design-review platform. Experience includes C#/.NET, Python, Kafka, REST APIs, AWS, and observability tooling, with contributions to automated recovery, anomaly alerting, platform reliability, and secure identity integration.',
  heroStats: [
    { value: '24', label: 'datasets migrated end to end' },
    { value: '17 PB', label: 'obsolete S3 data removed' },
    { value: '~9B', label: 'DynamoDB records cleaned up' },
    { value: 'C++ → AI', label: 'network systems to agentic AI' },
  ],
}

export const education = [
  {
    school: 'Northeastern University',
    degree: 'Master of Science, Engineering Management',
    period: 'Jan 2022 – Dec 2023',
    location: 'Boston, MA',
    coursework: [
      'Data Management & Database Design',
      'Data Warehousing & Business Intelligence',
      'Data Mining',
      'Object Oriented Principles',
    ],
  },
]

export const skills = [
  {
    category: 'Languages & Frameworks',
    items: ['Python', 'C#', '.NET', 'Core Java', 'SQL', 'JavaScript', 'TypeScript', 'NodeJS', 'React', 'Angular', 'Spring Boot', 'Spring MVC', 'Hibernate', 'CSS3', 'Bootstrap'],
  },
  {
    category: 'Backend & Architecture',
    items: ['Microservice Architecture', 'RESTful APIs', 'Kafka', 'Distributed Systems', 'Large-Scale Production Services', 'Reliability Engineering'],
  },
  {
    category: 'Identity & Security',
    items: ['OAuth', 'OpenID Connect (OIDC)', 'JWT', 'AWS Cognito', 'SSO / MFA', 'Security'],
  },
  {
    category: 'Cloud Services',
    items: ['Lambda', 'S3', 'DynamoDB', 'SQS', 'CloudWatch', 'Route 53', 'EC2', 'AWS CDK', 'CloudFormation', 'Cloud-Native Infrastructure'],
  },
  {
    category: 'Data Engineering',
    items: ['Apache Spark / PySpark', 'Spark SQL', 'Apache Airflow (MWAA)', 'AWS Glue', 'Amazon EMR / EMR Serverless', 'Athena', 'Redshift', 'Lake Formation', 'Boto3', 'Pandas', 'Hadoop'],
  },
  {
    category: 'AI & Tools',
    items: ['Agentic AI', 'Model Context Protocol (MCP)', 'Multimodal LLMs', 'ML Model Versioning & Retraining', 'Conversational AI', 'AI-Assisted Development', 'Claude Code', 'Codex', 'Git', 'Docker', 'Kubernetes', 'SonarQube', 'Observability Tooling', 'Jira', 'Confluence'],
  },
]

export const experience = [
  {
    company: 'Amazon Web Services',
    role: 'Software Engineer',
    period: 'Aug 2024 – Mar 2026',
    projectIds: ['medallion-lakehouse', 'controlled-deletion', 'partner-onboarding', 'smart-scanner', 'onboarding-assistant', 'agentic-design-review'],
    bullets: [
      'Led the end-to-end migration of 24 Web Engagements datasets from a legacy marketing data platform to a medallion-architecture warehouse: adapted PySpark workflows to EMR Serverless, built a configuration-driven Airflow (MWAA) DAG generator and a reusable legacy-vs-new validation utility, and completed historical backfill, production cutover and retirement of the legacy scheduler workflows.',
      'Engineered a controlled deletion pipeline (DynamoDB export, eligibility filtering, batch manifests, SQS-buffered Lambda processing and an existing deletion API) that removed approximately 9 billion obsolete DynamoDB records and 17 PB of corresponding S3 data, reducing storage costs.',
      'Modernized partner access to a third-party marketing reporting and analytics platform, replacing a legacy SFTP-based workflow with an Amazon onboarding flow that centralizes authentication through AWS Cognito, single sign-on and OpenID Connect with two-factor verification.',
      'Adapted reporting and analytics integrations to the authenticated onboarding flow, keeping downstream data ingestion and processing compatible, and integrated automated testing and QA validation into CI/CD pipelines.',
      'Built ML-driven scanner selection (Smart Scanner) that routes files to the better-suited malware scanner using file metadata, with a feedback table of predicted vs. actual outcomes for periodic retraining, model versioning and rollback.',
      'Built an AI onboarding assistant that replaced ticket-driven onboarding to a scanning service, collecting and validating required details such as AWS account IDs and SNS topics, generating configuration and invoking onboarding APIs.',
      'Architected an agentic AI platform using multimodal LLMs and Model Context Protocol to integrate CAD, PLM, and manufacturing systems, automating drawing reviews and design-rule validation to accelerate review cycles and improve design-rule compliance.',
      'Built Python, Pandas, and Amazon S3 ingestion and transformation workflows with Apache Airflow, improving raw-log processing efficiency and accelerating data availability for reporting dashboards.',
      'Diagnosed production integration and data-processing issues through AWS Glue and Amazon S3 log analysis, collaborating with Support and Operations to reduce issue-resolution time by 20%.',
      'Participated in on-call rotations, investigating operational incidents and maintaining reliability across critical data workflows.',
      'Translated customer requirements and operational findings into engineering priorities, coordinated cross-functional dependencies, and delivered five data-platform features on schedule.',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Software Engineer Intern',
    period: 'May 2023 – Jul 2023',
    projectIds: ['spark-auto-recovery', 'emr-scaling-monitoring'],
    bullets: [
      'Built a Python (Boto3) Lambda utility that automates recovery of recurring AWS Glue Spark failures (OOM, broadcast and RPC errors) by measuring job input size with Athena and S3, revising Spark settings and rerunning the job; deployed beyond proof of concept, it reduced manual on-call recovery work.',
      'Implemented dynamic resource-scaling scripts for Amazon EMR workloads, improving cloud resource utilization, mitigating resource-related failures, and increasing distributed job throughput.',
      'Built recursive error-detection logic and automated Spark job reruns through MCM workflows, reducing failed jobs and manual troubleshooting.',
      'Integrated recovery automation into Spark data pipelines and created Amazon CloudWatch dashboards with anomaly alerts and Matplotlib visualizations, enabling faster detection of reliability issues and improving overall system uptime.',
    ],
  },
  {
    company: 'Wavteq',
    role: 'Software Engineer',
    period: 'Oct 2018 – Oct 2021',
    projectIds: ['kafka-feed-platform', 'dns-data-collection'],
    bullets: [
      'Co-developed a real-time, event-driven feed-processing platform with Apache Kafka, replacing a batch Python daemon architecture to reduce data-delivery latency while using Git and CI/CD to support development and releases.',
      'Designed and implemented C# and .NET replication orchestration services with REST APIs and MySQL persistence, integrating them with the Kafka-based streaming platform to improve synchronization reliability and reduce replication errors.',
      'Built Python command-line tools and Flask REST APIs that enabled Data Science teams to submit security-feed entries with configurable expiration.',
      'Developed a data-collection engine with Pandas and Amazon CloudWatch monitoring to ingest anonymized DNS query streams into Hadoop; co-developed the data emitter to increase ingestion capacity and improve downstream data availability.',
      'Analyzed and optimized data-retention software to improve processing efficiency across the data platform.',
    ],
  },
  {
    company: 'Bosch',
    role: 'Backend Engineer',
    period: 'Aug 2016 – Aug 2017',
    projectIds: ['cryptopan-anonymization', 'diagnostics-tool'],
    bullets: [
      'Implemented a C++ IP-anonymization engine based on the Lucent variant of CryptoPAN, integrating it across multiple products and tools to support a multimillion-dollar customer deal.',
      'Developed C++ DNS services and a DHCP/DHCPv6 server, integrating automated CI/CD workflows to improve release reliability and reduce configuration errors.',
      'Built an extensible diagnostics tool with a Python plugin framework to automate collection of system configuration and runtime state, accelerating troubleshooting and reducing support-resolution time.',
      'Investigated critical customer incidents with Support using Amazon S3 for log storage, providing on-site technical guidance alongside Sales and Operations to accelerate resolution.',
    ],
  },
]

// Headline achievements, each backed by a resume bullet or Monica's project notes.
export const achievements = [
  { metric: '24', title: 'Datasets migrated end to end', detail: 'Owned the Web Engagements migration through historical backfill, production cutover and legacy-scheduler retirement.', color: 'accent' },
  { metric: '17 PB + ~9B', title: 'Obsolete data removed safely', detail: 'Controlled pipeline with eligibility checks, rate-controlled batches and a shared deletion API across DynamoDB and S3.', color: 'mint' },
  { metric: '1 generator', title: 'Config-driven Airflow DAGs', detail: 'One shared DAG generator replaced per-pipeline workflow code, so a fix reaches every pipeline at once.', color: 'mint' },
  { metric: 'Reusable', title: 'Migration validation utility', detail: 'Schema, per-partition count and distribution checks that later subject areas reused.', color: 'accent' },
  { metric: 'SSO + MFA', title: 'Secure partner sign-in', detail: 'AWS Cognito, single sign-on and OpenID Connect with two-factor verification replaced a legacy SFTP-based workflow.', color: 'violet' },
  { metric: '3 AI', title: 'AI features shipped', detail: 'ML scanner selection with a retraining loop, an AI onboarding assistant, and an agentic CAD/PLM design-review platform.', color: 'violet' },
  { metric: 'Auto-rerun', title: 'Self-healing Spark jobs', detail: 'Lambda utility deployed beyond proof of concept that reduced manual on-call recovery work.', color: 'amber' },
  { metric: '$M deal', title: 'Enabled by IP anonymization', detail: 'C++ CryptoPAN engine integrated across products to support a multimillion-dollar customer deal at Bosch.', color: 'mint' },
]

// Behavioral-interview map: which project best answers which kind of question.
// Indexed by the AI assistant so "tell me about a time you…" finds a real story.
export const stories = [
  { topic: 'End-to-end ownership', project: 'Web Engagements Medallion Migration', why: 'Owned 24 datasets from dependency mapping through validation, backfill, production cutover and legacy shutdown.' },
  { topic: 'Reusable engineering / building for others', project: 'Web Engagements Medallion Migration', why: 'Built the config-driven DAG generator and the shared validation utility that later subject areas reused.' },
  { topic: 'Working across team dependencies', project: 'Web Engagements Medallion Migration', why: 'Used temporary Lake Formation shares so development was not blocked by other teams’ unmigrated sources, then switched and re-validated.' },
  { topic: 'Data correctness', project: 'Web Engagements Medallion Migration', why: 'Compared legacy and new outputs on schema, per-partition counts and distributions before cutover.' },
  { topic: 'Automation / reducing toil', project: 'Self-Healing Spark Job Recovery', why: 'Automated the repetitive month-end recovery that on-call engineers did by hand.' },
  { topic: 'Security and customer trust', project: 'Secure Partner Access and Controlled Deletion Pipeline', why: 'Centralized partner authentication with MFA; protected active data with eligibility checks before deleting anything.' },
  { topic: 'Operational discipline at scale', project: 'Controlled Deletion Pipeline', why: 'Removed 17 PB with snapshots, reviewable batches, rate control and monitoring to protect production.' },
  { topic: 'Learning from feedback / ML', project: 'Smart Scanner', why: 'Built a feedback loop of predicted vs. actual outcomes driving versioned retraining with rollback.' },
  { topic: 'Customer self-service', project: 'AI Client Onboarding Assistant', why: 'Replaced ticket-driven onboarding with an assistant backed by deterministic validation.' },
  { topic: 'Earlier backend experience', project: 'Wavteq Kafka platform and Bosch C++ services', why: 'Kafka streaming, C#/.NET replication services, C++ IP anonymization, DNS and DHCP services.' },
]
