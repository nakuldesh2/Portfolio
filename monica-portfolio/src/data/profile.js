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
  linkedin: '', // TODO(Monica): paste your LinkedIn URL. The link stays hidden while this is empty.
  headline: 'I build backend, data & AI systems that scale.',
  tagline:
    'Backend services, event-driven systems, cloud data platforms, and agentic AI: from a 22+ dataset medallion lakehouse to an AI platform that cut engineering reviews from weeks to minutes.',
  summary:
    'Software Engineer with mid-senior level expertise delivering scalable backend services, event-driven systems, and cloud data platforms. Engineered reusable data pipelines that migrated 22+ datasets to a medallion-architecture warehouse and built an agentic AI platform that automated design reviews, cutting manual effort from weeks to minutes. Collaborates across cross-functional teams to boost platform reliability, performance, and delivery speed. Seeking to apply deep backend and AI integration experience to drive innovative, high-impact solutions.',
  heroStats: [
    { value: '22+', label: 'datasets migrated to medallion' },
    { value: '98%+', label: 'graph-RAG retrieval accuracy' },
    { value: 'Weeks → min', label: 'engineering analysis time' },
    { value: '−90%', label: 'manual Spark recovery work' },
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
    items: ['Python', 'Core Java', 'SQL', 'JavaScript', 'TypeScript', 'NodeJS', 'React', 'Angular', 'Spring Boot', 'Spring MVC', 'Hibernate', 'CSS3', 'Bootstrap'],
  },
  {
    category: 'Backend & Architecture',
    items: ['Microservice Architecture', 'RESTful APIs', 'Kafka', 'Distributed Systems', 'OAuth', 'OIDC', 'JWT'],
  },
  {
    category: 'Cloud Services',
    items: ['Lambda', 'S3', 'DynamoDB', 'SQS', 'CloudWatch', 'Route 53', 'EC2', 'AWS CDK', 'CloudFormation', 'AWS Cognito'],
  },
  {
    category: 'Data Engineering',
    items: ['Apache Spark / PySpark', 'Apache Airflow', 'AWS Glue', 'Amazon EMR', 'Athena', 'Redshift', 'Lake Formation', 'Pandas'],
  },
  {
    category: 'AI & LLMs',
    items: ['Agentic AI', 'Model Context Protocol (MCP)', 'Multimodal LLMs', 'Graph RAG', 'Fine-tuning (DeepSeek R1)', 'Domain Embeddings', 'Claude Code', 'Codex'],
  },
  {
    category: 'Tools & Practices',
    items: ['Git', 'Docker', 'Kubernetes', 'SonarQube', 'IntelliJ', 'VS Code', 'MS SQL Server', 'MySQL Workbench', 'Automated Testing', 'Continuous Delivery', 'Observability Tooling', 'Jira', 'Confluence'],
  },
]

export const experience = [
  {
    company: 'Amazon Web Services',
    role: 'Software Engineer',
    period: 'Aug 2024 – Mar 2026',
    projectIds: ['medallion-lakehouse', 'agentic-design-review', 'graph-rag', 'plm-modernization'],
    bullets: [
      'Engineered reusable cloud data pipelines and migrated 22+ datasets to a data warehouse using medallion architecture, automated CI/CD deployments, monitoring, and data quality validation, broadening adoption across multiple business domains and improving reliable access to analytics data.',
      'Architected an agentic AI platform with multimodal LLMs and Model Context Protocol (MCP) to integrate CAD, PLM, and manufacturing systems, automating drawing reviews, design-rule checks, and manufacturability validation, thereby reducing manual review effort and enhancing design compliance.',
      'Developed graph-based retrieval-augmented generation (RAG) workflows with fine-tuned DeepSeek R1 and domain-specific embeddings, achieving over 98% retrieval accuracy and reducing engineering analysis from weeks to minutes.',
      'Led modernization of Java rich-client PLM applications into AngularJS and React web applications on Active Workspace, overseeing technical reviews, automated 3D-to-2D rendering, analytics integration, and mobile PDM development to improve user experience and accelerate development cycles.',
      'Strengthened software release reliability by integrating automated testing and QA validation into CI/CD pipelines, reducing post-deployment defects by 30% and improving deployment quality.',
      'Built automated ingestion and transformation workflows using Apache Airflow, Python, Pandas, and Amazon S3, reducing raw-log processing time and accelerating data availability for analytics dashboards.',
      'Diagnosed customer issues through AWS Glue and Amazon S3 log analysis, partnering with Support, Sales, and Operations to deliver technical resolutions and reduce issue-resolution time by 20%.',
      'Translated customer requirements into a prioritized engineering backlog using Power BI dashboards and Jupyter analysis, securing stakeholder alignment across Marketing, Support, and Sales Engineering.',
      'Led Agile sprint planning and backlog refinement in Jira, coordinating scope and dependencies with product managers and engineering stakeholders to deliver five data-platform features on schedule.',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Software Engineer Intern',
    period: 'May 2023 – Jul 2023',
    projectIds: ['spark-auto-recovery', 'emr-scaling-monitoring'],
    bullets: [
      'Developed an automated recovery feature for Apache Spark pipelines, using Jupyter notebooks to extract runtime errors and initiate recovery workflows, reducing manual intervention by 90%.',
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
      'Co-developed a real-time, event-driven feed-processing platform using Apache Kafka, replacing a batch Python daemon architecture to reduce data-delivery latency, with Git and CI/CD supporting development and releases.',
      'Designed and implemented replication orchestration services in C# and .NET, integrating REST APIs and MySQL persistence with the Kafka-based streaming platform to improve synchronization reliability and reduce replication errors.',
      'Built Python command-line tools and Flask REST APIs that enabled Data Science teams to submit security-feed entries with configurable expiration.',
      'Developed a data collection engine using Pandas and Amazon CloudWatch monitoring to ingest anonymized DNS query streams into Hadoop; co-developed the data emitter to increase ingestion capacity and improve downstream data availability.',
      'Analyzed and optimized data-retention software to improve processing efficiency within the data platform.',
    ],
  },
  {
    company: 'Bosch',
    role: 'Backend Engineer',
    period: 'Aug 2016 – Aug 2017',
    projectIds: ['cryptopan-anonymization', 'diagnostics-tool'],
    bullets: [
      'Implemented a C++ IP anonymization engine based on the Lucent variant of CryptoPAN, integrating it across multiple products and tools to support a multimillion-dollar customer deal.',
      'Developed DNS services and a DHCP/DHCPv6 server in C++, integrating automated CI/CD workflows to improve release reliability and reduce configuration errors.',
      'Built an extensible diagnostics tool with a Python plugin framework to automate collection of system configuration and runtime state, accelerating troubleshooting and reducing support-resolution time.',
      'Investigated critical customer incidents with Support, using Amazon S3 for log storage and providing on-site technical guidance alongside Sales and Operations to accelerate resolution.',
    ],
  },
]

// Headline achievements, each backed by a resume bullet or Monica's project notes.
export const achievements = [
  { metric: '22+', title: 'Datasets on a medallion lakehouse', detail: 'Reusable pipelines, CI/CD, monitoring and data-quality validation, adopted across multiple business domains.', color: 'accent' },
  { metric: 'Weeks → min', title: 'Engineering analysis time', detail: 'Agentic AI + graph RAG platform automated drawing reviews and design-rule checks.', color: 'violet' },
  { metric: '98%+', title: 'Retrieval accuracy', detail: 'Graph-based RAG with fine-tuned DeepSeek R1 and domain-specific embeddings.', color: 'violet' },
  { metric: '100+ → 7', title: 'Lines per pipeline', detail: 'A YAML-driven Airflow DAG generator replaced 100+ lines of boilerplate per pipeline with a 7-line config.', color: 'mint' },
  { metric: '−90%', title: 'Manual Spark recovery', detail: 'Failed jobs are re-sized from input data volume and restarted automatically.', color: 'amber' },
  { metric: '−30%', title: 'Post-deployment defects', detail: 'Automated testing and QA validation built into CI/CD pipelines.', color: 'accent' },
  { metric: '−20%', title: 'Issue-resolution time', detail: 'Customer issues diagnosed through AWS Glue and S3 log analysis with Support, Sales and Ops.', color: 'rose' },
  { metric: '$M deal', title: 'Enabled by IP anonymization', detail: 'C++ CryptoPAN engine integrated across products to support a multimillion-dollar customer deal at Bosch.', color: 'mint' },
]
