// Single source of truth for everything about Monica that is NOT a project.
// The UI renders from this file AND the AI chatbot's knowledge base is built
// from it (see src/ai/knowledge.js). Edit here and both stay in sync.
//
// Rule: every fact here must be traceable to the resume or to Monica herself.
// See .claude/rules/content-accuracy.md

export const profile = {
  name: 'Monica Narendra Choudhari',
  shortName: 'Monica',
  title: 'Software Data Engineer',
  location: 'Bellevue, WA',
  email: 'monicachoudhari94@gmail.com',
  github: 'https://github.com/MonicaChoudhari',
  linkedin: '', // TODO(Monica): paste your LinkedIn URL. The link stays hidden while this is empty.
  tagline:
    'I build reliable, petabyte-scale data platforms on AWS: medallion warehouses, self-healing Spark pipelines, and ML/GenAI workflows.',
  summary:
    'Software Data Engineer with solid experience designing and operating scalable ETL pipelines and data-warehouse solutions on AWS. Led migration of 22+ datasets to a medallion-architecture warehouse, implementing CI/CD, monitoring, and data-quality checks that improved reliability and reduced processing time. Skilled in SQL, Python (pandas, FastAPI), Spark, and Airflow to build reliable infrastructure and automated dashboards. Aiming to leverage data-engineering expertise to enable efficient, data-driven decision making.',
  heroStats: [
    { value: '17 PB', label: 'S3 data cleaned up' },
    { value: '9B', label: 'DynamoDB records processed' },
    { value: '22+', label: 'datasets migrated' },
    { value: '24M+', label: 'records scored by ML' },
  ],
}

export const education = [
  {
    school: 'Northeastern University',
    degree: 'Master of Science, Engineering Management',
    location: 'Boston, MA',
    coursework: [
      'Data Management & Database Design',
      'Data Warehousing & Business Intelligence',
      'Data Mining',
    ],
  },
]

export const skills = [
  {
    category: 'Programming Languages & Libraries',
    items: ['Python', 'SQL', 'Spark', 'Pandas', 'NumPy', 'SciPy', 'Matplotlib'],
  },
  {
    category: 'Data Engineering & Frameworks',
    items: ['Airflow', 'dbt', 'FastAPI', 'Data Pipeline Development', 'Kafka', 'REST APIs', 'gRPC', 'Data Modeling'],
  },
  {
    category: 'Cloud Services',
    items: ['Redshift', 'EMR', 'Glue', 'S3', 'Athena', 'DynamoDB', 'SQS', 'CloudWatch'],
  },
  {
    category: 'Tools & Platforms',
    items: ['MySQL Workbench', 'Eclipse IDE', 'MS SQL Server', 'IntelliJ', 'Power BI', 'Tableau', 'Jupyter', 'Git', 'CI/CD'],
  },
  {
    category: 'ML & AI',
    items: ['Random Forest', 'Agentic AI Systems', 'Model Evaluation', 'Feature Engineering', 'RAG', 'LLMs (Amazon Bedrock)'],
  },
]

export const experience = [
  {
    company: 'Amazon Web Services',
    role: 'Software Data Engineer',
    period: 'Aug 2024 – Mar 2026',
    location: '',
    projectIds: [
      'medallion-warehouse',
      'genai-malware-routing',
      'asset-deletion',
      'image-tagging',
      'lake-formation-migration',
      'lse-incident-recovery',
    ],
    bullets: [
      'Spearheaded end-to-end data pipeline development and migration to a cloud-based data warehouse, implementing medallion architecture (raw → curated → analytics-ready layers) for 22+ datasets with automated CI/CD deployment, monitoring, data quality checks, and reusable utilities adopted by multiple subject area migrations.',
      'Built scalable ML pipelines and a Generative AI model to optimize malware scanning and routing between CLOUDONE and CLAMAV, processing 24M+ records and achieving 78.5% prediction accuracy and a 23.4% performance boost.',
      'Designed and implemented a scalable Python Lambda-based asset deletion system for cost reduction, processing DynamoDB exports from S3 with allowlist validation and batch updates, successfully cleaning up 17 PB of S3 data and 9 billion DynamoDB records.',
      'Accelerated ML workflows by building a scalable image tagging Python-backed pipeline, increasing processing speed by 35% and reducing labeling errors by 25%.',
      'Led migration from direct S3 access to Glue tables with Lake Formation permissions, resolving complex EMR write operation failures across multiple versions by implementing in-transit encryption and configuring EMR runtime roles.',
      'Prevented production outages by integrating robust test coverage and QA coordination into CI/CD workflows, lowering post-deploy bugs by 30%.',
      'Managed on-call incident response during a 4-day Large-Scale Event (LSE) involving DJS host failures, Redshift endpoint unavailability, and EMR job submission errors; coordinated cross-team recovery, implemented temporary Spark-based ETL bypass scripts, and successfully backfilled all impacted data flows, ensuring complete data recovery across 5+ downstream applications.',
      'Led Agile sprint planning and backlog grooming sessions by collaborating with cross-functional stakeholders, product managers, and leadership to gather business requirements, define technical scope, prioritize deliverables, and delegate development tasks across the engineering team.',
    ],
  },
  {
    company: 'Amazon Web Services',
    role: 'Data Engineer Intern',
    period: 'May 2023 – Jul 2023',
    location: '',
    projectIds: ['spark-auto-recovery', 'emr-autoscaling-monitoring'],
    bullets: [
      'Designed an automatic data recovery feature using Jupyter notebooks to extract real-time Spark errors, reducing manual intervention by 90%.',
      'Optimized EMR cluster resource usage by implementing dynamic scaling scripts in Spark that adjusted workloads and mitigated critical system errors, reducing error-related downtime and increasing overall job throughput.',
      'Implemented a recursive error-detection algorithm and automated job reruns using Spark scripts and MCM, which reduced job failures and minimized manual troubleshooting.',
      'Integrated the solution into existing data pipelines, building monitoring dashboards in AWS CloudWatch and visualizing metrics with matplotlib to track resource utilization and trigger alerts on anomalies, enabling faster detection of issues and reduced response time.',
    ],
  },
  {
    company: 'Wavteq',
    role: 'Data Analyst',
    period: 'Oct 2018 – Oct 2021',
    location: '',
    projectIds: ['wavteq-pipelines'],
    bullets: [
      'Designed and implemented optimized data pipelines, reducing processing time by 50% and increasing data accuracy by 95%.',
      'Analyzed data and created reports that improved decision-making processes, leading to a 25% reduction in costs.',
      'Collaborated with cross-functional teams in an Agile setting to gather business requirements and translate them into technical specifications, enabling faster project delivery and improving stakeholder alignment.',
      'Performed data cleaning and exploration on over 1 GB of raw data using Pandas and SciPy, then integrated it into a dimensional data model, which improved query performance and data consistency.',
      'Collaborated with the development team to create and modify VBA macros in Microsoft Excel, automating repetitive tasks and cutting manual processing time by half.',
    ],
  },
  {
    company: 'Bosch',
    role: 'Data Analyst',
    period: 'Aug 2016 – Aug 2017',
    location: '',
    projectIds: ['bosch-supply-chain'],
    bullets: [
      'Developed and implemented supply-chain metrics using Python and Tableau in Jupyter notebooks, storing data in MS SQL Server, which improved process visibility and ensured material availability without line stoppage.',
      'Utilized statistical models to forecast trends and optimize business processes, leading to a 15% increase in revenue.',
      'Documented technical requirements and data processes in Eclipse IDE and AWS Glue, establishing clear data pipelines that maintained data integrity and met industry compliance standards.',
    ],
  },
]

// Headline achievements, each backed by a resume bullet.
export const achievements = [
  { metric: '17 PB + 9B', title: 'Storage cost cleanup', detail: 'Lambda-based deletion system removed 17 PB of S3 data and 9 billion DynamoDB records.', color: 'mint' },
  { metric: '22+', title: 'Datasets on medallion architecture', detail: 'Led warehouse migration with CI/CD, monitoring and data-quality checks; utilities reused by other teams.', color: 'accent' },
  { metric: '78.5%', title: 'GenAI scanner-routing accuracy', detail: 'ML + GenAI routing between CLOUDONE and CLAMAV over 24M+ records, with a 23.4% performance boost.', color: 'violet' },
  { metric: '90%', title: 'Less manual intervention', detail: 'Automatic Spark error recovery built during the AWS internship.', color: 'amber' },
  { metric: '5+ apps', title: 'Fully recovered during a 4-day LSE', detail: 'Ran on-call recovery with Spark ETL bypass scripts and complete backfills.', color: 'rose' },
  { metric: '30%', title: 'Fewer post-deploy bugs', detail: 'Test coverage and QA gates added to CI/CD workflows.', color: 'accent' },
  { metric: '35% / 25%', title: 'Faster image tagging, fewer errors', detail: '35% faster processing and 25% fewer labeling errors in the ML tagging pipeline.', color: 'violet' },
  { metric: '50%', title: 'Faster pipelines at Wavteq', detail: 'Optimized pipelines halved processing time; reporting drove a 25% cost reduction.', color: 'mint' },
]
