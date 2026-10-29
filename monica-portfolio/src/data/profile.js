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
    'Backend services, event-driven systems, cloud data platforms, secure identity, and agentic AI: from a 22+ dataset medallion warehouse to a pipeline that safely deleted 19 PB of data.',
  summary:
    'Software Engineer with mid-senior expertise building scalable backend services, event-driven systems, and cloud data platforms. Engineered reusable data pipelines that migrated 22+ datasets to a medallion-architecture warehouse and built an agentic AI platform that automated design reviews, reducing manual effort from weeks to minutes. Experience includes C#/.NET, Python, Kafka, REST APIs, AWS, and observability tooling, with contributions to automated recovery, anomaly alerting, platform reliability, and secure identity integration.',
  heroStats: [
    { value: '22+', label: 'datasets migrated to medallion' },
    { value: '19 PB', label: 'S3 data safely deleted' },
    { value: '$124K', label: 'cost savings' },
    { value: 'Weeks → min', label: 'AI-automated design reviews' },
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
    items: ['Lambda', 'S3', 'DynamoDB', 'SQS', 'CloudWatch', 'Route 53', 'EC2', 'AWS CDK', 'CloudFormation', 'Step Functions', 'Cloud-Native Infrastructure'],
  },
  {
    category: 'Data Engineering',
    items: ['Apache Spark / PySpark', 'Apache Airflow', 'AWS Glue', 'Amazon EMR', 'Athena', 'Redshift', 'Lake Formation', 'Pandas', 'Hadoop'],
  },
  {
    category: 'AI & Tools',
    items: ['Agentic AI', 'Model Context Protocol (MCP)', 'Multimodal LLMs', 'AI-Assisted Development', 'Claude Code', 'Codex', 'Git', 'Docker', 'Kubernetes', 'SonarQube', 'Observability Tooling', 'Jira', 'Confluence'],
  },
]

export const experience = [
  {
    company: 'Amazon Web Services',
    role: 'Software Engineer',
    period: 'Aug 2024 – Mar 2026',
    projectIds: ['medallion-lakehouse', 'partner-onboarding', 'controlled-deletion', 'agentic-design-review'],
    bullets: [
      'Modernized partner access to a third-party marketing reporting and analytics platform by migrating its legacy SFTP workflow to an Amazon onboarding flow with two-factor authentication, strengthening sign-in security for external partners.',
      'Integrated single sign-on and OpenID Connect into the partner onboarding experience with AWS Cognito, centralizing identity authentication and MFA while reducing partner login issues by 25% and support ticket volume.',
      'Adapted reporting and analytics integrations for the authenticated onboarding flow, maintaining compatibility with downstream data ingestion and processing workflows; integrated automated testing and QA validation into CI/CD pipelines, reducing post-deployment defects by 30%.',
      'Engineered reusable cloud-native data pipelines with CloudFormation and Step Functions to migrate 22+ marketing and business datasets into a medallion-architecture warehouse, adding automated deployments, monitoring, and data-quality checks that cut data onboarding time by half and improved data freshness for analysts.',
      'Built Python, Pandas, and Amazon S3 ingestion and transformation workflows with Apache Airflow, improving raw-log processing efficiency and accelerating data availability for reporting dashboards.',
      'Engineered a controlled deletion pipeline that removed over 44 billion Amazon DynamoDB records and 19 petabytes of corresponding Amazon S3 data, saving $124K in IMR costs.',
      'Diagnosed production integration and data-processing issues through AWS Glue and Amazon S3 log analysis, collaborating with Support and Operations to reduce issue-resolution time by 20%.',
      'Architected an agentic AI platform using multimodal LLMs and Model Context Protocol to integrate CAD, PLM, and manufacturing systems, automating drawing reviews and design-rule validation to accelerate review cycles and improve design-rule compliance.',
      'Translated customer requirements and operational findings into engineering priorities, coordinated cross-functional dependencies, and delivered five data-platform features on schedule.',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Software Engineer Intern',
    period: 'May 2023 – Jul 2023',
    projectIds: ['spark-auto-recovery', 'emr-scaling-monitoring'],
    bullets: [
      'Developed an automated recovery capability for Apache Spark pipelines by using Jupyter notebooks to extract runtime errors and initiate recovery workflows, reducing manual intervention by 90%.',
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
  { metric: '19 PB + 44B', title: 'Data safely deleted', detail: 'Controlled deletion pipeline removed 19 PB of S3 data and 44B+ DynamoDB records, saving $124K in IMR costs.', color: 'mint' },
  { metric: '22+', title: 'Datasets on a medallion warehouse', detail: 'Reusable cloud-native pipelines with automated deployments, monitoring and data-quality checks.', color: 'accent' },
  { metric: '−50%', title: 'Data onboarding time', detail: 'Medallion pipelines halved onboarding time and improved data freshness for analysts.', color: 'accent' },
  { metric: 'Weeks → min', title: 'Design-review effort', detail: 'Agentic AI platform with multimodal LLMs and MCP automated drawing reviews and design-rule validation.', color: 'violet' },
  { metric: '−25%', title: 'Partner login issues', detail: 'SSO, OpenID Connect and MFA on AWS Cognito replaced a legacy SFTP workflow.', color: 'violet' },
  { metric: '−30%', title: 'Post-deployment defects', detail: 'Automated testing and QA validation built into CI/CD pipelines.', color: 'rose' },
  { metric: '−90%', title: 'Manual Spark recovery', detail: 'Failed jobs are re-sized from input data volume and restarted automatically.', color: 'amber' },
  { metric: '$M deal', title: 'Enabled by IP anonymization', detail: 'C++ CryptoPAN engine integrated across products to support a multimillion-dollar customer deal at Bosch.', color: 'mint' },
]
