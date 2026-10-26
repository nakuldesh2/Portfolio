// Projects + their animated simulations.
//
// Each project has a `simulation` that the <Simulation> component animates:
//   nodes: boxes on a 1000 x 480 canvas, positioned by their CENTER (x, y)
//          kind: source | compute | storage | ml | gate | alert | consumer
//   edges: [fromId, toId, optionalLabel]; an edge's id is `${from}->${to}`
//   steps: the story, played in order. Each step lights up `nodes` and
//          animates data particles along `edges`. `status` marks nodes as
//          'error' | 'warn' | 'ok' for that step. `metrics` show on the side.
//
// `reviewed: false` means Monica still needs to confirm the details.
// `npm run check` lists those projects.
// Internal codenames from Monica's notes are deliberately replaced with
// generic/public terms (see .claude/rules/content-accuracy.md).
// See .claude/skills/add-project and .claude/skills/design-simulation.

export const projects = [
  // ─────────────────────────── AWS · Software Engineer ───────────────────────────
  {
    id: 'medallion-lakehouse',
    title: 'Medallion Lakehouse Modernization',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Data Platform',
    reviewed: false,
    summary:
      'Engineered reusable cloud-native data pipelines (CloudFormation, Step Functions) that migrated 22+ marketing and business datasets from a legacy single-account lakehouse into a medallion (Bronze → Silver → Gold) warehouse, with automated deployments, monitoring and data-quality checks that cut data onboarding time in half and improved data freshness for analysts.',
    challenge:
      'The 2022 lakehouse had hit its limits: ingestion, processing and customer queries shared one AWS account (large blast radius, resource contention), ETL ran on a fixed-capacity EMR cluster that sat idle at night and choked at month-end, infrastructure was changed by hand in the console, and data quality was handled ad hoc in each job, so analysts found duplicates and nulls weeks later in dashboards.',
    approach: [
      'Bronze: land data exactly as received (immutable, schema-on-read) and profile it immediately: null counts, row counts per partition, unexpected distributions.',
      'Silver: PySpark on EMR Serverless enforces schema, deduplicates with a standard ROW_NUMBER() pattern on natural keys, applies explicit null policies, and standardizes values. Bad rows go to a quarantine table with a reason code and an automated ticket.',
      'Gold: business-ready, denormalized aggregates in a separate account so heavy analyst queries never slow ingestion, plus business-logic checks (roll-ups match, rates ≤ 100%).',
      'Built a YAML-driven Airflow DAG generator: a 7-line config replaced 100+ lines of copy-pasted DAG code per pipeline.',
      'Built a reusable PySpark validation utility comparing legacy vs. new on schema, row counts per partition, value distributions and full row-level equality, logging every discrepancy to a queryable table.',
      'Migrated in stages, upgrading Spark 2.x → 3.x along the way, with 30+ consecutive clean runs, runtime parity and a 3× volume stress test before cutover.',
    ],
    impact: [
      { value: '22+', label: 'datasets migrated' },
      { value: '−50%', label: 'data onboarding time' },
      { value: '100+ → 7', label: 'lines of code per pipeline' },
      { value: '30+', label: 'consecutive clean runs before cutover' },
    ],
    tech: ['PySpark', 'EMR Serverless', 'AWS Glue', 'Amazon S3', 'Lake Formation', 'Redshift', 'Step Functions', 'CloudFormation', 'Apache Airflow (MWAA)', 'CI/CD'],
    simulation: {
      nodes: [
        { id: 'src', label: 'Data Sources', sub: 'internal + vendor', kind: 'source', x: 95, y: 220 },
        { id: 'bronze', label: 'Bronze', sub: 'raw · schema-on-read', kind: 'storage', x: 290, y: 220 },
        { id: 'silver', label: 'Silver', sub: 'clean · dedup · typed', kind: 'storage', x: 490, y: 220 },
        { id: 'quar', label: 'Quarantine', sub: 'bad rows + reason', kind: 'alert', x: 490, y: 400 },
        { id: 'gold', label: 'Gold', sub: 'business aggregates', kind: 'storage', x: 700, y: 220 },
        { id: 'share', label: 'Governed Sharing', sub: 'row/column security', kind: 'gate', x: 905, y: 110 },
        { id: 'users', label: 'Analysts · BI · ML', sub: 'subscribers', kind: 'consumer', x: 905, y: 330 },
        { id: 'dag', label: 'DAG Generator', sub: 'Airflow · YAML config', kind: 'compute', x: 290, y: 70 },
        { id: 'val', label: 'Validation Utility', sub: 'legacy vs new parity', kind: 'gate', x: 700, y: 70 },
      ],
      edges: [
        ['src', 'bronze', 'land'],
        ['bronze', 'silver', 'PySpark'],
        ['silver', 'quar', 'reject'],
        ['silver', 'gold', 'aggregate'],
        ['gold', 'share', 'publish'],
        ['share', 'users', 'subscribe'],
        ['dag', 'bronze', 'orchestrate'],
        ['val', 'gold', 'compare'],
      ],
      steps: [
        {
          title: 'Land everything in Bronze',
          text: 'Data lands exactly as the source sent it, as an immutable copy you can always replay. It is profiled on arrival, so a jump in nulls is caught before any transformation.',
          nodes: ['src', 'bronze'],
          edges: ['src->bronze'],
          metrics: [{ label: 'Datasets', value: '22+' }],
        },
        {
          title: 'Clean in Silver, quarantine the rest',
          text: 'PySpark on serverless EMR enforces schema, deduplicates and standardizes values. Rows that break the rules go to a quarantine table with a reason code instead of silently flowing downstream.',
          nodes: ['bronze', 'silver', 'quar'],
          edges: ['bronze->silver', 'silver->quar'],
          status: { quar: 'warn' },
        },
        {
          title: 'Build business-ready Gold',
          text: 'Gold holds pre-joined, pre-aggregated tables in its own account, so analyst queries never compete with ingestion. Business-logic checks run here too.',
          nodes: ['silver', 'gold'],
          edges: ['silver->gold'],
        },
        {
          title: 'Prove parity with the legacy system',
          text: 'A reusable validation utility compares old vs new on schema, per-partition row counts, value distributions and row-level equality. Other teams reused it for their own migrations.',
          nodes: ['val', 'gold'],
          edges: ['val->gold'],
          status: { val: 'ok' },
          metrics: [{ label: 'Checks', value: '4 types' }],
        },
        {
          title: 'Orchestrate from config',
          text: 'A YAML-driven generator builds each Airflow DAG automatically. Onboarding a pipeline became a 7-line config instead of 100+ lines of boilerplate.',
          nodes: ['dag', 'bronze'],
          edges: ['dag->bronze'],
          metrics: [
            { label: 'Lines / pipeline', value: '100+ → 7' },
            { label: 'Clean runs', value: '30+' },
          ],
        },
        {
          title: 'Share through governed contracts',
          text: 'Gold is published with row- and column-level security. Consumers subscribe to what they are entitled to, and every access is audited.',
          nodes: ['gold', 'share', 'users'],
          edges: ['gold->share', 'share->users'],
          status: { share: 'ok' },
          metrics: [
            { label: 'Datasets migrated', value: '22+' },
            { label: 'Onboarding time', value: '−50%' },
          ],
        },
      ],
    },
  },

  {
    id: 'agentic-design-review',
    title: 'Agentic AI Design-Review Platform',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'AI / LLM',
    reviewed: false,
    summary:
      'Architected an agentic AI platform using multimodal LLMs and the Model Context Protocol (MCP) to integrate CAD, PLM and manufacturing systems, automating drawing reviews and design-rule validation to accelerate review cycles and improve design-rule compliance.',
    challenge:
      'Engineering drawing reviews were manual: reviewers had to pull context from several separate systems and check design rules by hand, which took weeks and left room for missed compliance issues.',
    approach: [
      'A multimodal LLM agent reads engineering drawings directly.',
      'MCP servers give the agent standard tool access to CAD, PLM and manufacturing systems.',
      'The agent runs design-rule checks and manufacturability validation against that context.',
      'Findings are compiled into a review report for engineers.',
    ],
    impact: [
      { value: 'Weeks → min', label: 'manual review effort' },
      { value: '↑', label: 'design compliance' },
    ],
    tech: ['Agentic AI', 'Multimodal LLMs', 'Model Context Protocol (MCP)', 'Python'],
    simulation: {
      nodes: [
        { id: 'eng', label: 'Engineer', sub: 'submits drawing', kind: 'source', x: 95, y: 220 },
        { id: 'agent', label: 'Review Agent', sub: 'multimodal LLM', kind: 'ml', x: 300, y: 220 },
        { id: 'mcp', label: 'MCP Servers', sub: 'tool connectors', kind: 'compute', x: 510, y: 220 },
        { id: 'cad', label: 'CAD', sub: 'geometry · drawings', kind: 'storage', x: 740, y: 90 },
        { id: 'plm', label: 'PLM', sub: 'parts · revisions', kind: 'storage', x: 740, y: 220 },
        { id: 'mfg', label: 'Manufacturing', sub: 'process constraints', kind: 'storage', x: 740, y: 350 },
        { id: 'checks', label: 'Rule Checks', sub: 'design + manufacturability', kind: 'gate', x: 300, y: 400 },
        { id: 'report', label: 'Review Report', sub: 'issues + fixes', kind: 'consumer', x: 510, y: 400 },
      ],
      edges: [
        ['eng', 'agent', 'drawing'],
        ['agent', 'mcp', 'MCP'],
        ['mcp', 'cad'],
        ['mcp', 'plm'],
        ['mcp', 'mfg'],
        ['agent', 'checks'],
        ['checks', 'report'],
      ],
      steps: [
        { title: 'A drawing is submitted', text: 'An engineer submits a drawing for review.', nodes: ['eng', 'agent'], edges: ['eng->agent'] },
        {
          title: 'The agent reads it',
          text: 'A multimodal LLM interprets the drawing itself (views, dimensions, annotations), not just its text.',
          nodes: ['agent'],
          edges: [],
          status: { agent: 'ok' },
        },
        {
          title: 'Gather context through MCP',
          text: 'Through Model Context Protocol servers, the agent queries CAD, PLM and manufacturing systems with one standard tool interface.',
          nodes: ['agent', 'mcp', 'cad', 'plm', 'mfg'],
          edges: ['agent->mcp', 'mcp->cad', 'mcp->plm', 'mcp->mfg'],
        },
        {
          title: 'Run the checks',
          text: 'Design rules and manufacturability are validated automatically against the gathered context.',
          nodes: ['agent', 'checks'],
          edges: ['agent->checks'],
          status: { checks: 'ok' },
        },
        {
          title: 'Report in minutes',
          text: 'Engineers receive a review report, cutting manual review effort from weeks to minutes.',
          nodes: ['checks', 'report'],
          edges: ['checks->report'],
          metrics: [{ label: 'Review effort', value: 'Weeks → min' }],
        },
      ],
    },
  },

  {
    id: 'partner-onboarding',
    title: 'Secure Partner Onboarding (SFTP → SSO)',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Identity & Security',
    reviewed: false,
    summary:
      'Modernized how external partners access a third-party marketing reporting and analytics platform: replaced a legacy SFTP workflow with an Amazon onboarding flow using single sign-on, OpenID Connect and two-factor authentication on AWS Cognito, while keeping downstream data ingestion working.',
    challenge:
      'Partners reached the reporting platform through a legacy SFTP workflow with weak sign-in security, which caused login problems and support tickets.',
    approach: [
      'Migrated partner access from the legacy SFTP workflow to an Amazon onboarding flow with two-factor authentication.',
      'Integrated single sign-on and OpenID Connect through AWS Cognito, centralizing identity authentication and MFA.',
      'Adapted the reporting and analytics integrations to the authenticated flow, keeping downstream ingestion and processing compatible.',
      'Added automated testing and QA validation to the CI/CD pipelines.',
    ],
    impact: [
      { value: '−25%', label: 'partner login issues' },
      { value: '−30%', label: 'post-deployment defects' },
      { value: 'MFA', label: 'for every external partner' },
    ],
    tech: ['AWS Cognito', 'OpenID Connect', 'SSO', 'OAuth', 'MFA', 'CI/CD'],
    simulation: {
      nodes: [
        { id: 'partner', label: 'External Partners', sub: 'agencies · vendors', kind: 'source', x: 95, y: 220 },
        { id: 'sftp', label: 'Legacy SFTP', sub: 'weak sign-in', kind: 'compute', x: 300, y: 80 },
        { id: 'flow', label: 'Onboarding Flow', sub: 'Amazon sign-in', kind: 'compute', x: 300, y: 220 },
        { id: 'cognito', label: 'AWS Cognito', sub: 'SSO · OIDC · MFA', kind: 'gate', x: 510, y: 220 },
        { id: 'report', label: 'Reporting Platform', sub: 'analytics access', kind: 'storage', x: 720, y: 220 },
        { id: 'ingest', label: 'Data Ingestion', sub: 'downstream workflows', kind: 'consumer', x: 905, y: 360 },
        { id: 'cicd', label: 'CI/CD + QA', sub: 'automated tests', kind: 'compute', x: 510, y: 400 },
      ],
      edges: [
        ['partner', 'sftp'],
        ['partner', 'flow'],
        ['flow', 'cognito', 'sign in'],
        ['cognito', 'report', 'token'],
        ['report', 'ingest'],
        ['cicd', 'cognito', 'deploy'],
      ],
      steps: [
        {
          title: 'Before: legacy SFTP',
          text: 'Partners reached the reporting platform through an SFTP workflow with weak sign-in security.',
          nodes: ['partner', 'sftp'],
          edges: ['partner->sftp'],
          status: { sftp: 'warn' },
        },
        {
          title: 'A real onboarding flow',
          text: 'Partners now come in through an Amazon onboarding flow with two-factor authentication.',
          nodes: ['partner', 'flow'],
          edges: ['partner->flow'],
        },
        {
          title: 'Centralized identity',
          text: 'AWS Cognito handles single sign-on, OpenID Connect and MFA in one place, so login problems drop.',
          nodes: ['flow', 'cognito'],
          edges: ['flow->cognito'],
          status: { cognito: 'ok' },
          metrics: [{ label: 'Login issues', value: '−25%' }],
        },
        {
          title: 'Data keeps flowing',
          text: 'Reporting and analytics integrations were adapted to the authenticated flow, so downstream ingestion kept working.',
          nodes: ['cognito', 'report', 'ingest'],
          edges: ['cognito->report', 'report->ingest'],
        },
        {
          title: 'Ship it safely',
          text: 'Automated testing and QA validation in CI/CD catch problems before they reach partners.',
          nodes: ['cicd', 'cognito'],
          edges: ['cicd->cognito'],
          metrics: [
            { label: 'Login issues', value: '−25%' },
            { label: 'Post-deploy defects', value: '−30%' },
          ],
        },
      ],
    },
  },

  {
    id: 'controlled-deletion',
    title: 'Controlled Deletion Pipeline (19 PB)',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Cost Optimization',
    reviewed: false,
    summary:
      'Engineered a controlled deletion pipeline that removed over 44 billion Amazon DynamoDB records and 19 petabytes of corresponding Amazon S3 data, saving $124K in IMR costs.',
    challenge:
      'Unused data was driving storage cost, but deleting at petabyte scale is risky: one mistake destroys data that cannot be recovered.',
    approach: [
      'Worked from DynamoDB exports in S3 instead of scanning live tables, so production traffic is unaffected.',
      'Fanned the work out across parallel Python Lambda workers.',
      'Validated every candidate against an allowlist so protected data is never touched.',
      'Deleted S3 objects and DynamoDB records in controlled batches.',
    ],
    impact: [
      { value: '44B+', label: 'DynamoDB records removed' },
      { value: '19 PB', label: 'S3 data removed' },
      { value: '$124K', label: 'IMR costs saved' },
    ],
    tech: ['Python', 'AWS Lambda', 'Amazon DynamoDB', 'Amazon S3'],
    simulation: {
      nodes: [
        { id: 'ddb', label: 'DynamoDB Tables', sub: '44B+ records', kind: 'storage', x: 95, y: 220 },
        { id: 'exp', label: 'Export to S3', sub: 'offline snapshot', kind: 'storage', x: 285, y: 220 },
        { id: 'lam', label: 'Lambda Workers', sub: 'parallel Python', kind: 'compute', x: 480, y: 220 },
        { id: 'allow', label: 'Allowlist Check', sub: 'protected = skip', kind: 'gate', x: 480, y: 70 },
        { id: 's3', label: 'S3 Deletions', sub: '19 PB · batched', kind: 'storage', x: 700, y: 120 },
        { id: 'upd', label: 'DynamoDB Deletes', sub: 'batched', kind: 'storage', x: 700, y: 330 },
        { id: 'save', label: 'Cost Savings', sub: '$124K IMR', kind: 'consumer', x: 905, y: 220 },
      ],
      edges: [
        ['ddb', 'exp', 'export'],
        ['exp', 'lam', 'shards'],
        ['lam', 'allow', 'validate'],
        ['lam', 's3', 'delete'],
        ['lam', 'upd', 'delete'],
        ['s3', 'save'],
        ['upd', 'save'],
      ],
      steps: [
        {
          title: 'Snapshot, don’t scan',
          text: 'DynamoDB tables are exported to S3, so the pipeline works on an offline snapshot and never adds load to production tables.',
          nodes: ['ddb', 'exp'],
          edges: ['ddb->exp'],
          metrics: [{ label: 'Records', value: '44B+' }],
        },
        { title: 'Fan out', text: 'Export files are split across parallel Python Lambda workers.', nodes: ['exp', 'lam'], edges: ['exp->lam'] },
        {
          title: 'Safety gate',
          text: 'Every candidate is checked against an allowlist. Protected data is skipped, so the pipeline is safe by default.',
          nodes: ['lam', 'allow'],
          edges: ['lam->allow'],
          status: { allow: 'ok' },
        },
        {
          title: 'Delete in controlled batches',
          text: 'Approved S3 objects and DynamoDB records are removed in batches: high throughput with a controlled blast radius.',
          nodes: ['lam', 's3', 'upd'],
          edges: ['lam->s3', 'lam->upd'],
          metrics: [{ label: 'S3 removed', value: '19 PB' }],
        },
        {
          title: 'Realize the savings',
          text: 'Petabytes of unused data disappear, and so does their cost.',
          nodes: ['s3', 'upd', 'save'],
          edges: ['s3->save', 'upd->save'],
          status: { save: 'ok' },
          metrics: [
            { label: 'Records removed', value: '44B+' },
            { label: 'Saved', value: '$124K' },
          ],
        },
      ],
    },
  },

  // ─────────────────────────── AWS · Internship ───────────────────────────
  {
    id: 'spark-auto-recovery',
    title: 'Self-Healing Spark Job Recovery',
    company: 'Amazon Web Services (Internship)',
    period: 'May – Jul 2023',
    category: 'Automation',
    reviewed: false,
    summary:
      'Automated the recovery of failing Spark ETL jobs: a Lambda function finds failed runs, measures the input data with Athena, calculates the right job size (workers, memory) and restarts the job with the new configuration, reducing manual intervention by 90%.',
    challenge:
      'At every month-end close, metadata pipelines failed on Spark configuration limits: out-of-memory errors, broadcast failures, or "RPC client disassociated". When data volume grew the job could not keep up, and an engineer had to read the Spark UI logs and re-tune resources by hand.',
    approach: [
      'A Lambda function checks for recent failed Glue job runs.',
      'For each failure it reads the job configuration and runs an Athena query to find the latest input files in S3.',
      'From the dataset size and file count it calculates the optimal configuration: number of workers, worker type and memory.',
      'It updates the Glue job with the new settings and restarts it.',
    ],
    impact: [
      { value: '−90%', label: 'manual intervention' },
      { value: '↓', label: 'month-end job failures' },
    ],
    tech: ['Apache Spark', 'AWS Glue', 'AWS Lambda', 'Amazon Athena', 'Amazon S3', 'Python'],
    simulation: {
      nodes: [
        { id: 'job', label: 'Glue Spark Job', sub: 'month-end ETL', kind: 'compute', x: 110, y: 220 },
        { id: 'lam', label: 'Recovery Lambda', sub: 'finds failed runs', kind: 'compute', x: 330, y: 100 },
        { id: 'athena', label: 'Athena', sub: 'query input metadata', kind: 'compute', x: 580, y: 100 },
        { id: 's3', label: 'S3 Input Files', sub: 'size · file count', kind: 'storage', x: 840, y: 100 },
        { id: 'calc', label: 'Sizing Logic', sub: 'workers · memory', kind: 'gate', x: 580, y: 350 },
        { id: 'restart', label: 'Update & Restart', sub: 'new job config', kind: 'compute', x: 330, y: 350 },
      ],
      edges: [
        ['job', 'lam', 'failed'],
        ['lam', 'athena'],
        ['athena', 's3', 'scan'],
        ['athena', 'calc', 'size'],
        ['calc', 'restart'],
        ['restart', 'job', 'rerun'],
      ],
      steps: [
        {
          title: 'Month-end job fails',
          text: 'Data volume spikes and the Spark job dies: out of memory, a broadcast failure, or an RPC disassociation.',
          nodes: ['job'],
          edges: [],
          status: { job: 'error' },
        },
        {
          title: 'Detect the failure',
          text: 'A Lambda function checks for recent failed runs and reads the failed job’s configuration.',
          nodes: ['job', 'lam'],
          edges: ['job->lam'],
          status: { job: 'error' },
        },
        {
          title: 'Measure the input',
          text: 'An Athena query finds the latest input files in S3 and returns their total size and count.',
          nodes: ['lam', 'athena', 's3'],
          edges: ['lam->athena', 'athena->s3'],
        },
        {
          title: 'Right-size the job',
          text: 'From the data volume, the function calculates the number of workers, worker type and memory the job actually needs.',
          nodes: ['athena', 'calc'],
          edges: ['athena->calc'],
          status: { calc: 'ok' },
        },
        {
          title: 'Restart automatically',
          text: 'The job is updated with the new configuration and restarted, with no engineer digging through Spark UI logs.',
          nodes: ['calc', 'restart', 'job'],
          edges: ['calc->restart', 'restart->job'],
          status: { job: 'ok' },
          metrics: [{ label: 'Manual intervention', value: '−90%' }],
        },
      ],
    },
  },

  {
    id: 'emr-scaling-monitoring',
    title: 'EMR Dynamic Scaling & Anomaly Monitoring',
    company: 'Amazon Web Services (Internship)',
    period: 'May – Jul 2023',
    category: 'Observability',
    reviewed: false,
    summary:
      'Implemented dynamic resource-scaling scripts for Amazon EMR workloads and CloudWatch dashboards with anomaly alerts and Matplotlib visualizations, improving resource utilization, throughput and uptime.',
    challenge:
      'Resource-related failures on EMR caused failed jobs, and reliability issues were detected late.',
    approach: [
      'Published cluster resource metrics to CloudWatch.',
      'Built dashboards (CloudWatch + Matplotlib) and anomaly alerts.',
      'Wrote dynamic resource-scaling scripts for EMR workloads.',
      'Integrated the automation into existing Spark data pipelines.',
    ],
    impact: [
      { value: '↑', label: 'resource utilization' },
      { value: '↑', label: 'job throughput & uptime' },
      { value: 'Faster', label: 'issue detection' },
    ],
    tech: ['Amazon EMR', 'Apache Spark', 'CloudWatch', 'Matplotlib', 'Python'],
    simulation: {
      nodes: [
        { id: 'work', label: 'Spark Workloads', sub: 'pipelines', kind: 'source', x: 95, y: 220 },
        { id: 'emr', label: 'EMR Cluster', sub: 'compute', kind: 'compute', x: 300, y: 220 },
        { id: 'cw', label: 'CloudWatch', sub: 'utilization metrics', kind: 'storage', x: 520, y: 220 },
        { id: 'dash', label: 'Dashboards', sub: 'CloudWatch · Matplotlib', kind: 'consumer', x: 760, y: 90 },
        { id: 'alarm', label: 'Anomaly Alerts', sub: 'thresholds', kind: 'alert', x: 760, y: 340 },
        { id: 'scale', label: 'Dynamic Scaling', sub: 'scripts', kind: 'gate', x: 420, y: 410 },
      ],
      edges: [
        ['work', 'emr'],
        ['emr', 'cw', 'metrics'],
        ['cw', 'dash'],
        ['cw', 'alarm'],
        ['alarm', 'scale', 'trigger'],
        ['scale', 'emr', 'adjust'],
      ],
      steps: [
        { title: 'Workloads run', text: 'Spark workloads run on the EMR cluster.', nodes: ['work', 'emr'], edges: ['work->emr'] },
        { title: 'Measure everything', text: 'Resource utilization is published to CloudWatch.', nodes: ['emr', 'cw'], edges: ['emr->cw'] },
        { title: 'Visualize', text: 'Dashboards show cluster health at a glance.', nodes: ['cw', 'dash'], edges: ['cw->dash'] },
        {
          title: 'Anomaly detected',
          text: 'Utilization crosses a threshold and an alert fires before it becomes a failure.',
          nodes: ['emr', 'cw', 'alarm'],
          edges: ['emr->cw', 'cw->alarm'],
          status: { emr: 'warn', alarm: 'error' },
        },
        {
          title: 'Scale dynamically',
          text: 'Scaling scripts adjust resources, the cluster stabilizes, and throughput goes up.',
          nodes: ['alarm', 'scale', 'emr', 'work'],
          edges: ['alarm->scale', 'scale->emr', 'work->emr'],
          status: { emr: 'ok', scale: 'ok' },
          metrics: [
            { label: 'Utilization', value: '↑' },
            { label: 'Throughput', value: '↑' },
          ],
        },
      ],
    },
  },

  // ─────────────────────────── Wavteq ───────────────────────────
  {
    id: 'kafka-feed-platform',
    title: 'Real-Time Kafka Feed Platform',
    company: 'Wavteq',
    period: '2018 – 2021',
    category: 'Event-Driven Backend',
    reviewed: false,
    summary:
      'Co-developed a real-time, event-driven feed-processing platform on Apache Kafka that replaced a batch Python daemon, plus C#/.NET replication orchestration services with REST APIs and MySQL, and Flask APIs and CLI tools for Data Science teams.',
    challenge:
      'Security feeds were processed by a batch Python daemon, so data was delivered late, and replication between systems was error-prone.',
    approach: [
      'Replaced batch processing with Kafka topics and streaming consumers.',
      'Built replication orchestration services in C# and .NET with REST APIs and MySQL persistence.',
      'Gave Data Science teams Python CLI tools and Flask REST APIs to submit feed entries with configurable expiration.',
      'Shipped through Git and CI/CD.',
    ],
    impact: [
      { value: '↓', label: 'data-delivery latency' },
      { value: '↓', label: 'replication errors' },
      { value: 'Self-serve', label: 'feed submissions for Data Science' },
    ],
    tech: ['Apache Kafka', 'C#', '.NET', 'Python', 'Flask', 'REST APIs', 'MySQL', 'CI/CD'],
    simulation: {
      nodes: [
        { id: 'feeds', label: 'Security Feeds', sub: 'incoming entries', kind: 'source', x: 95, y: 160 },
        { id: 'ds', label: 'Data Science Teams', sub: 'CLI · Flask API', kind: 'source', x: 95, y: 380 },
        { id: 'old', label: 'Batch Daemon', sub: 'legacy Python', kind: 'compute', x: 300, y: 60 },
        { id: 'kafka', label: 'Apache Kafka', sub: 'event topics', kind: 'storage', x: 300, y: 270 },
        { id: 'proc', label: 'Feed Processors', sub: 'stream consumers', kind: 'compute', x: 510, y: 270 },
        { id: 'repl', label: 'Replication Service', sub: 'C# · .NET · REST', kind: 'compute', x: 700, y: 140 },
        { id: 'db', label: 'MySQL', sub: 'persistence', kind: 'storage', x: 905, y: 140 },
        { id: 'out', label: 'Downstream Systems', sub: 'real-time data', kind: 'consumer', x: 800, y: 400 },
      ],
      edges: [
        ['feeds', 'old'],
        ['feeds', 'kafka', 'publish'],
        ['ds', 'kafka', 'submit'],
        ['kafka', 'proc', 'stream'],
        ['proc', 'repl'],
        ['repl', 'db'],
        ['proc', 'out', 'deliver'],
      ],
      steps: [
        {
          title: 'Before: batch processing',
          text: 'Feeds were picked up by a batch Python daemon, so data arrived late.',
          nodes: ['feeds', 'old'],
          edges: ['feeds->old'],
          status: { old: 'warn' },
        },
        {
          title: 'Stream with Kafka',
          text: 'Feeds are published to Kafka topics and processed by streaming consumers the moment they arrive.',
          nodes: ['feeds', 'kafka', 'proc'],
          edges: ['feeds->kafka', 'kafka->proc'],
        },
        {
          title: 'Self-service submissions',
          text: 'Data Science teams submit feed entries with configurable expiration through CLI tools and Flask REST APIs.',
          nodes: ['ds', 'kafka'],
          edges: ['ds->kafka'],
        },
        {
          title: 'Replicate reliably',
          text: 'C#/.NET orchestration services keep systems in sync through REST APIs and MySQL.',
          nodes: ['proc', 'repl', 'db'],
          edges: ['proc->repl', 'repl->db'],
          status: { repl: 'ok' },
        },
        {
          title: 'Deliver in real time',
          text: 'Downstream systems receive data in real time instead of waiting for the next batch.',
          nodes: ['proc', 'out'],
          edges: ['proc->out'],
          metrics: [
            { label: 'Latency', value: '↓' },
            { label: 'Replication errors', value: '↓' },
          ],
        },
      ],
    },
  },

  {
    id: 'dns-data-collection',
    title: 'DNS Query Data Collection Engine',
    company: 'Wavteq',
    period: '2018 – 2021',
    category: 'Data Ingestion',
    reviewed: false,
    summary:
      'Developed a data collection engine using Pandas and Amazon CloudWatch monitoring that ingests anonymized DNS query streams into Hadoop, and co-developed the data emitter to increase ingestion capacity.',
    challenge:
      'High-volume DNS query streams needed to reach the data platform reliably, and ingestion capacity limited downstream data availability.',
    approach: [
      'Co-developed the data emitter that sends anonymized DNS query streams.',
      'Built a Pandas-based collection engine to ingest them into Hadoop.',
      'Monitored the pipeline with Amazon CloudWatch.',
      'Optimized data-retention software for processing efficiency.',
    ],
    impact: [
      { value: '↑', label: 'ingestion capacity' },
      { value: '↑', label: 'downstream data availability' },
    ],
    tech: ['Python', 'Pandas', 'Hadoop', 'Amazon CloudWatch'],
    simulation: {
      nodes: [
        { id: 'dns', label: 'DNS Query Streams', sub: 'anonymized', kind: 'source', x: 95, y: 220 },
        { id: 'emit', label: 'Data Emitter', sub: 'high throughput', kind: 'compute', x: 290, y: 220 },
        { id: 'coll', label: 'Collection Engine', sub: 'Pandas', kind: 'compute', x: 490, y: 220 },
        { id: 'hadoop', label: 'Hadoop', sub: 'data platform', kind: 'storage', x: 700, y: 220 },
        { id: 'cw', label: 'CloudWatch', sub: 'monitoring', kind: 'alert', x: 490, y: 400 },
        { id: 'users', label: 'Downstream Users', sub: 'analytics', kind: 'consumer', x: 905, y: 220 },
      ],
      edges: [
        ['dns', 'emit'],
        ['emit', 'coll', 'stream'],
        ['coll', 'hadoop', 'ingest'],
        ['coll', 'cw'],
        ['hadoop', 'users'],
      ],
      steps: [
        { title: 'Emit', text: 'Anonymized DNS query streams are sent out by the data emitter.', nodes: ['dns', 'emit'], edges: ['dns->emit'] },
        {
          title: 'Collect',
          text: 'A Pandas-based collection engine processes the stream.',
          nodes: ['emit', 'coll'],
          edges: ['emit->coll'],
          metrics: [{ label: 'Ingestion capacity', value: '↑' }],
        },
        { title: 'Monitor', text: 'CloudWatch tracks the pipeline’s health.', nodes: ['coll', 'cw'], edges: ['coll->cw'], status: { cw: 'ok' } },
        {
          title: 'Land in Hadoop',
          text: 'Data lands in Hadoop and is available sooner to downstream users.',
          nodes: ['coll', 'hadoop', 'users'],
          edges: ['coll->hadoop', 'hadoop->users'],
          metrics: [{ label: 'Data availability', value: '↑' }],
        },
      ],
    },
  },

  // ─────────────────────────── Bosch ───────────────────────────
  {
    id: 'cryptopan-anonymization',
    title: 'CryptoPAN IP Anonymization Engine',
    company: 'Bosch',
    period: '2016 – 2017',
    category: 'Systems / Security',
    reviewed: false,
    summary:
      'Implemented a C++ IP-address anonymization engine based on the Lucent variant of CryptoPAN and integrated it across multiple products and tools, supporting a multimillion-dollar customer deal.',
    challenge:
      'Network data containing real IP addresses had to be shared and analyzed without exposing them, while staying useful for analysis.',
    approach: [
      'Implemented CryptoPAN (Lucent variant) in C++: a keyed, prefix-preserving scheme, so addresses that share a network prefix still share an anonymized prefix.',
      'Kept the mapping consistent with a secret key, so the same IP always anonymizes the same way.',
      'Integrated the engine across multiple products and tools.',
    ],
    impact: [
      { value: '$M', label: 'customer deal supported' },
      { value: 'Multiple', label: 'products integrated' },
    ],
    tech: ['C++', 'CryptoPAN'],
    simulation: {
      nodes: [
        { id: 'raw', label: 'Network Data', sub: 'real IP addresses', kind: 'source', x: 95, y: 220 },
        { id: 'key', label: 'Secret Key', sub: 'consistent mapping', kind: 'gate', x: 320, y: 80 },
        { id: 'eng', label: 'CryptoPAN Engine', sub: 'C++ · Lucent variant', kind: 'compute', x: 320, y: 220 },
        { id: 'anon', label: 'Anonymized Data', sub: 'prefix-preserving', kind: 'storage', x: 560, y: 220 },
        { id: 'prod', label: 'Products & Tools', sub: 'integrated', kind: 'consumer', x: 800, y: 220 },
        { id: 'deal', label: 'Customer Deal', sub: 'multimillion-dollar', kind: 'consumer', x: 800, y: 400 },
      ],
      edges: [
        ['raw', 'eng'],
        ['key', 'eng'],
        ['eng', 'anon'],
        ['anon', 'prod'],
        ['prod', 'deal'],
      ],
      steps: [
        { title: 'Real IPs are sensitive', text: 'Network data contains real IP addresses that cannot be shared as-is.', nodes: ['raw'], edges: [], status: { raw: 'warn' } },
        {
          title: 'Keyed, prefix-preserving anonymization',
          text: 'The C++ engine maps every IP through CryptoPAN with a secret key. Addresses in the same subnet stay in the same anonymized subnet, so analysis still works.',
          nodes: ['raw', 'key', 'eng'],
          edges: ['raw->eng', 'key->eng'],
          status: { eng: 'ok' },
        },
        { title: 'Safe to share', text: 'The anonymized data keeps its network structure without revealing real addresses.', nodes: ['eng', 'anon'], edges: ['eng->anon'] },
        {
          title: 'Integrated everywhere',
          text: 'The engine was built into multiple products and tools, supporting a multimillion-dollar customer deal.',
          nodes: ['anon', 'prod', 'deal'],
          edges: ['anon->prod', 'prod->deal'],
          status: { deal: 'ok' },
          metrics: [{ label: 'Deal supported', value: '$M' }],
        },
      ],
    },
  },

  {
    id: 'diagnostics-tool',
    title: 'Plugin-Based Diagnostics Tool',
    company: 'Bosch',
    period: '2016 – 2017',
    category: 'Developer Tools',
    reviewed: false,
    summary:
      'Built an extensible diagnostics tool with a Python plugin framework that automates collection of system configuration and runtime state, accelerating troubleshooting and reducing support-resolution time.',
    challenge:
      'Troubleshooting customer issues meant manually gathering configuration and runtime details from systems, which slowed support.',
    approach: [
      'Designed a Python core with a plugin framework, so new collectors can be added without changing the core.',
      'Wrote plugins that collect system configuration and runtime state.',
      'Bundled the results for support engineers.',
    ],
    impact: [
      { value: '↓', label: 'support-resolution time' },
      { value: 'Extensible', label: 'plugin architecture' },
    ],
    tech: ['Python', 'Plugin Architecture'],
    simulation: {
      nodes: [
        { id: 'req', label: 'Support Case', sub: 'customer issue', kind: 'source', x: 95, y: 220 },
        { id: 'core', label: 'Diagnostics Core', sub: 'Python', kind: 'compute', x: 300, y: 220 },
        { id: 'cfg', label: 'Config Plugin', sub: 'system configuration', kind: 'compute', x: 510, y: 100 },
        { id: 'rt', label: 'Runtime Plugin', sub: 'runtime state', kind: 'compute', x: 510, y: 340 },
        { id: 'bundle', label: 'Diagnostics Bundle', sub: 'one package', kind: 'storage', x: 720, y: 220 },
        { id: 'fix', label: 'Faster Resolution', sub: 'support team', kind: 'consumer', x: 905, y: 400 },
      ],
      edges: [
        ['req', 'core'],
        ['core', 'cfg'],
        ['core', 'rt'],
        ['cfg', 'bundle'],
        ['rt', 'bundle'],
        ['bundle', 'fix'],
      ],
      steps: [
        { title: 'A case comes in', text: 'Support needs details from the customer’s system.', nodes: ['req', 'core'], edges: ['req->core'] },
        {
          title: 'Plugins collect',
          text: 'The core runs every registered plugin. New collectors plug in without touching the core.',
          nodes: ['core', 'cfg', 'rt'],
          edges: ['core->cfg', 'core->rt'],
        },
        { title: 'Bundle it', text: 'Configuration and runtime state are packaged together automatically.', nodes: ['cfg', 'rt', 'bundle'], edges: ['cfg->bundle', 'rt->bundle'] },
        {
          title: 'Resolve faster',
          text: 'Support starts with complete information instead of a back-and-forth.',
          nodes: ['bundle', 'fix'],
          edges: ['bundle->fix'],
          status: { fix: 'ok' },
          metrics: [{ label: 'Resolution time', value: '↓' }],
        },
      ],
    },
  },
]

export const getProject = (id) => projects.find((p) => p.id === id)
