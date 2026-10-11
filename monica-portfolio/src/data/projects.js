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
// `reviewed: false` means the project was drafted from resume bullets only and
// still needs Monica's confirmation. `npm run check` lists those projects.
// See .claude/skills/add-project and .claude/skills/design-simulation.

export const projects = [
  {
    id: 'medallion-warehouse',
    title: 'Medallion-Architecture Data Warehouse Migration',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Data Platform',
    reviewed: false,
    summary:
      'Led end-to-end migration of 22+ datasets into a cloud data warehouse built on medallion architecture (raw → curated → analytics-ready), with automated CI/CD, monitoring, and data-quality checks.',
    challenge:
      'Datasets lived in ad-hoc pipelines with inconsistent quality and manual deployments, which made the warehouse hard to trust and slow to change.',
    approach: [
      'Layered every dataset into raw, curated, and analytics-ready zones so each layer has a single responsibility and can be replayed.',
      'Added data-quality checks between layers so bad data is stopped before it reaches consumers.',
      'Automated deployment through CI/CD with test coverage and QA gates.',
      'Packaged reusable utilities that other subject-area migrations adopted.',
    ],
    impact: [
      { value: '22+', label: 'datasets migrated' },
      { value: '30%', label: 'fewer post-deploy bugs' },
      { value: 'Reused', label: 'utilities adopted by other teams' },
    ],
    tech: ['Python', 'SQL', 'Spark', 'Airflow', 'Redshift', 'S3', 'Glue', 'CloudWatch', 'CI/CD'],
    simulation: {
      nodes: [
        { id: 'src', label: 'Source Systems', sub: '22+ datasets', kind: 'source', x: 95, y: 220 },
        { id: 'raw', label: 'Raw Layer', sub: 'immutable landing', kind: 'storage', x: 290, y: 220 },
        { id: 'dq', label: 'Data Quality Checks', sub: 'schema · nulls · dupes', kind: 'gate', x: 490, y: 90 },
        { id: 'curated', label: 'Curated Layer', sub: 'cleaned · conformed', kind: 'storage', x: 490, y: 220 },
        { id: 'gold', label: 'Analytics-ready', sub: 'Redshift', kind: 'storage', x: 700, y: 220 },
        { id: 'bi', label: 'Dashboards', sub: 'analysts · BI', kind: 'consumer', x: 905, y: 220 },
        { id: 'cicd', label: 'CI/CD + Tests', sub: 'QA gates', kind: 'compute', x: 290, y: 395 },
        { id: 'utils', label: 'Reusable Utilities', sub: 'shared across teams', kind: 'compute', x: 490, y: 395 },
        { id: 'mon', label: 'Monitoring', sub: 'CloudWatch alarms', kind: 'alert', x: 700, y: 395 },
      ],
      edges: [
        ['src', 'raw', 'ingest'],
        ['raw', 'dq'],
        ['dq', 'curated', 'pass'],
        ['curated', 'gold', 'model'],
        ['gold', 'bi', 'serve'],
        ['cicd', 'curated', 'deploy'],
        ['utils', 'curated'],
        ['gold', 'mon'],
      ],
      steps: [
        {
          title: 'Ingest into the raw layer',
          text: 'Each dataset lands unchanged in the raw layer, an immutable copy that any downstream layer can be rebuilt from.',
          nodes: ['src', 'raw'],
          edges: ['src->raw'],
          metrics: [{ label: 'Datasets', value: '22+' }],
        },
        {
          title: 'Validate before promoting',
          text: 'Data-quality checks run on schema, nulls and duplicates. Only data that passes is promoted, so issues are caught at the edge.',
          nodes: ['raw', 'dq'],
          edges: ['raw->dq'],
          status: { dq: 'ok' },
        },
        {
          title: 'Curate',
          text: 'Validated data is cleaned and conformed into the curated layer: consistent types, keys and naming across datasets.',
          nodes: ['dq', 'curated'],
          edges: ['dq->curated'],
        },
        {
          title: 'Serve analytics-ready data',
          text: 'Business-level models are built for Redshift and power dashboards and analysts.',
          nodes: ['curated', 'gold', 'bi'],
          edges: ['curated->gold', 'gold->bi'],
        },
        {
          title: 'Ship changes safely',
          text: 'Pipelines deploy through CI/CD with test coverage and QA gates. Reusable utilities let other teams migrate their subject areas the same way.',
          nodes: ['cicd', 'utils', 'curated'],
          edges: ['cicd->curated', 'utils->curated'],
          metrics: [{ label: 'Post-deploy bugs', value: '−30%' }],
        },
        {
          title: 'Observe in production',
          text: 'Monitoring and alarms watch freshness and failures, so problems surface before consumers notice.',
          nodes: ['gold', 'mon', 'bi'],
          edges: ['gold->mon', 'gold->bi'],
          status: { mon: 'ok' },
          metrics: [
            { label: 'Datasets migrated', value: '22+' },
            { label: 'Post-deploy bugs', value: '−30%' },
          ],
        },
      ],
    },
  },

  {
    id: 'genai-malware-routing',
    title: 'GenAI-Driven Malware Scan Routing',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'ML / GenAI',
    reviewed: false,
    summary:
      'Built scalable ML pipelines and a Generative AI model that optimizes malware scanning by routing each request to the better-suited engine (CLOUDONE or CLAMAV).',
    challenge:
      'Every scan request went through scanning engines without considering which engine fits the workload best, which wasted compute and slowed scanning at scale.',
    approach: [
      'Built ML pipelines that turn scan requests into features at scale (24M+ records).',
      'Trained and evaluated a model that predicts the best scanner for each request.',
      'Routed traffic between CLOUDONE and CLAMAV based on the prediction.',
      'Fed results back into model evaluation to track accuracy.',
    ],
    impact: [
      { value: '24M+', label: 'records processed' },
      { value: '78.5%', label: 'prediction accuracy' },
      { value: '+23.4%', label: 'performance boost' },
    ],
    tech: ['Python', 'ML Pipelines', 'Generative AI', 'Model Evaluation'],
    simulation: {
      nodes: [
        { id: 'req', label: 'Scan Requests', sub: '24M+ records', kind: 'source', x: 95, y: 220 },
        { id: 'feat', label: 'Feature Pipeline', sub: 'feature engineering', kind: 'compute', x: 290, y: 220 },
        { id: 'model', label: 'ML + GenAI Router', sub: 'predicts best engine', kind: 'ml', x: 490, y: 220 },
        { id: 'c1', label: 'CLOUDONE', sub: 'scan engine', kind: 'compute', x: 700, y: 100 },
        { id: 'clam', label: 'CLAMAV', sub: 'scan engine', kind: 'compute', x: 700, y: 340 },
        { id: 'res', label: 'Scan Results', sub: 'verdicts', kind: 'storage', x: 905, y: 220 },
        { id: 'eval', label: 'Model Evaluation', sub: 'accuracy tracking', kind: 'gate', x: 905, y: 400 },
      ],
      edges: [
        ['req', 'feat'],
        ['feat', 'model', 'features'],
        ['model', 'c1', 'route'],
        ['model', 'clam', 'route'],
        ['c1', 'res'],
        ['clam', 'res'],
        ['res', 'eval', 'feedback'],
      ],
      steps: [
        {
          title: 'Requests arrive',
          text: 'Millions of scan requests flow into the ML pipeline.',
          nodes: ['req', 'feat'],
          edges: ['req->feat'],
          metrics: [{ label: 'Records', value: '24M+' }],
        },
        {
          title: 'Engineer features',
          text: 'Each request is turned into features the model can learn from.',
          nodes: ['feat', 'model'],
          edges: ['feat->model'],
        },
        {
          title: 'Predict and route',
          text: 'The model predicts which engine will handle each request best and routes it to CLOUDONE or CLAMAV.',
          nodes: ['model', 'c1', 'clam'],
          edges: ['model->c1', 'model->clam'],
        },
        {
          title: 'Scan',
          text: 'Each engine scans only the traffic it is best suited for, and verdicts are collected.',
          nodes: ['c1', 'clam', 'res'],
          edges: ['c1->res', 'clam->res'],
          metrics: [{ label: 'Performance', value: '+23.4%' }],
        },
        {
          title: 'Close the loop',
          text: 'Results feed model evaluation, which measures prediction accuracy and guides the next model iteration.',
          nodes: ['res', 'eval'],
          edges: ['res->eval'],
          status: { eval: 'ok' },
          metrics: [
            { label: 'Accuracy', value: '78.5%' },
            { label: 'Performance', value: '+23.4%' },
          ],
        },
      ],
    },
  },

  {
    id: 'asset-deletion',
    title: 'Petabyte-Scale Asset Deletion System',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Cost Optimization',
    reviewed: false,
    summary:
      'Designed a scalable Python Lambda-based system that processes DynamoDB exports from S3, validates every candidate against an allowlist, and deletes in batches. It cleaned up 17 PB of S3 data and 9 billion DynamoDB records.',
    challenge:
      'Unused assets were driving storage cost, but deleting at petabyte scale is risky: one mistake destroys data that cannot be recovered.',
    approach: [
      'Worked from DynamoDB exports in S3 instead of scanning live tables, so production traffic is unaffected.',
      'Fanned the work out across Python Lambda workers for horizontal scale.',
      'Validated every candidate against an allowlist so protected assets are never touched.',
      'Applied deletions and DynamoDB updates in batches for throughput and controlled blast radius.',
    ],
    impact: [
      { value: '17 PB', label: 'S3 data cleaned up' },
      { value: '9B', label: 'DynamoDB records processed' },
      { value: '↓ Cost', label: 'storage spend reduced' },
    ],
    tech: ['Python', 'AWS Lambda', 'DynamoDB', 'S3'],
    simulation: {
      nodes: [
        { id: 'ddb', label: 'DynamoDB Tables', sub: 'asset metadata', kind: 'storage', x: 95, y: 220 },
        { id: 'exp', label: 'Export to S3', sub: 'offline snapshot', kind: 'storage', x: 285, y: 220 },
        { id: 'lam', label: 'Lambda Workers', sub: 'parallel Python', kind: 'compute', x: 480, y: 220 },
        { id: 'allow', label: 'Allowlist Check', sub: 'protected = skip', kind: 'gate', x: 480, y: 70 },
        { id: 's3', label: 'S3 Deletions', sub: 'batched', kind: 'storage', x: 700, y: 120 },
        { id: 'upd', label: 'DynamoDB Updates', sub: 'batch writes', kind: 'storage', x: 700, y: 330 },
        { id: 'save', label: 'Cost Savings', sub: '17 PB · 9B records', kind: 'consumer', x: 905, y: 220 },
      ],
      edges: [
        ['ddb', 'exp', 'export'],
        ['exp', 'lam', 'shards'],
        ['lam', 'allow', 'validate'],
        ['lam', 's3', 'delete'],
        ['lam', 'upd', 'update'],
        ['s3', 'save'],
        ['upd', 'save'],
      ],
      steps: [
        {
          title: 'Snapshot, don’t scan',
          text: 'DynamoDB tables are exported to S3, so the system works on an offline snapshot and never adds load to production tables.',
          nodes: ['ddb', 'exp'],
          edges: ['ddb->exp'],
          metrics: [{ label: 'Records', value: '9B' }],
        },
        {
          title: 'Fan out',
          text: 'Export files are split across many Python Lambda workers that process in parallel.',
          nodes: ['exp', 'lam'],
          edges: ['exp->lam'],
        },
        {
          title: 'Safety gate',
          text: 'Every candidate is checked against an allowlist. Protected assets are skipped, so the system is safe by default.',
          nodes: ['lam', 'allow'],
          edges: ['lam->allow'],
          status: { allow: 'ok' },
        },
        {
          title: 'Delete in batches',
          text: 'Approved assets are removed from S3 and their DynamoDB records updated in batches, which gives high throughput with a controlled blast radius.',
          nodes: ['lam', 's3', 'upd'],
          edges: ['lam->s3', 'lam->upd'],
          metrics: [{ label: 'S3 cleaned', value: '17 PB' }],
        },
        {
          title: 'Realize the savings',
          text: 'Storage spend drops as petabytes of unused data disappear.',
          nodes: ['s3', 'upd', 'save'],
          edges: ['s3->save', 'upd->save'],
          status: { save: 'ok' },
          metrics: [
            { label: 'S3 cleaned', value: '17 PB' },
            { label: 'DynamoDB records', value: '9B' },
          ],
        },
      ],
    },
  },

  {
    id: 'image-tagging',
    title: 'Scalable Image Tagging Pipeline',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'ML Pipelines',
    reviewed: false,
    summary:
      'Built a scalable Python-backed image tagging pipeline that accelerated ML workflows, increasing processing speed by 35% and reducing labeling errors by 25%.',
    challenge:
      'Image labeling was slow and error-prone, which held back the ML workflows that depended on it.',
    approach: [
      'Preprocessed images into a consistent format before tagging.',
      'Parallelized tagging so throughput scales with volume.',
      'Validated labels before publishing the tagged dataset.',
    ],
    impact: [
      { value: '+35%', label: 'processing speed' },
      { value: '−25%', label: 'labeling errors' },
    ],
    tech: ['Python', 'ML Pipelines'],
    simulation: {
      nodes: [
        { id: 'img', label: 'Image Store', sub: 'raw images', kind: 'storage', x: 95, y: 220 },
        { id: 'pre', label: 'Preprocessing', sub: 'normalize · batch', kind: 'compute', x: 290, y: 220 },
        { id: 'tag', label: 'Parallel Taggers', sub: 'model inference', kind: 'ml', x: 490, y: 220 },
        { id: 'val', label: 'Label Validation', sub: 'catch bad labels', kind: 'gate', x: 690, y: 220 },
        { id: 'out', label: 'Tagged Dataset', sub: 'ready for training', kind: 'storage', x: 905, y: 120 },
        { id: 'ml', label: 'ML Workflows', sub: 'downstream', kind: 'consumer', x: 905, y: 340 },
      ],
      edges: [
        ['img', 'pre'],
        ['pre', 'tag', 'batches'],
        ['tag', 'val', 'labels'],
        ['val', 'out'],
        ['out', 'ml'],
      ],
      steps: [
        { title: 'Load images', text: 'Raw images are pulled from storage.', nodes: ['img', 'pre'], edges: ['img->pre'] },
        {
          title: 'Preprocess',
          text: 'Images are normalized and batched so taggers get consistent input.',
          nodes: ['pre', 'tag'],
          edges: ['pre->tag'],
        },
        {
          title: 'Tag in parallel',
          text: 'Batches are tagged in parallel, so throughput scales with volume.',
          nodes: ['tag', 'val'],
          edges: ['tag->val'],
          metrics: [{ label: 'Speed', value: '+35%' }],
        },
        {
          title: 'Validate labels',
          text: 'Labels are checked before publishing, so fewer errors reach training data.',
          nodes: ['val', 'out'],
          edges: ['val->out'],
          status: { val: 'ok' },
          metrics: [{ label: 'Labeling errors', value: '−25%' }],
        },
        {
          title: 'Feed ML workflows',
          text: 'Clean, tagged data accelerates the downstream ML workflows.',
          nodes: ['out', 'ml'],
          edges: ['out->ml'],
          metrics: [
            { label: 'Speed', value: '+35%' },
            { label: 'Labeling errors', value: '−25%' },
          ],
        },
      ],
    },
  },

  {
    id: 'lake-formation-migration',
    title: 'S3 → Glue + Lake Formation Access Migration',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Data Governance',
    reviewed: false,
    summary:
      'Led the migration from direct S3 access to Glue tables governed by Lake Formation permissions, and resolved complex EMR write failures across multiple EMR versions by enabling in-transit encryption and configuring EMR runtime roles.',
    challenge:
      'Direct S3 access gave coarse, hard-to-audit permissions. Moving to Lake Formation broke EMR write operations across several EMR versions.',
    approach: [
      'Moved consumers from raw S3 paths to Glue catalog tables.',
      'Enforced fine-grained access through Lake Formation permissions.',
      'Debugged EMR write failures across versions and fixed them with in-transit encryption and EMR runtime roles.',
    ],
    impact: [
      { value: 'Governed', label: 'table-level access via Lake Formation' },
      { value: 'Fixed', label: 'EMR writes across multiple versions' },
    ],
    tech: ['EMR', 'Spark', 'Glue', 'Lake Formation', 'S3', 'Encryption in transit'],
    simulation: {
      nodes: [
        { id: 'emr', label: 'EMR Spark Jobs', sub: 'multiple versions', kind: 'compute', x: 110, y: 220 },
        { id: 'legacy', label: 'Direct S3 Access', sub: 'legacy · coarse', kind: 'source', x: 480, y: 70 },
        { id: 'roles', label: 'EMR Runtime Roles', sub: 'per-job identity', kind: 'gate', x: 290, y: 400 },
        { id: 'lf', label: 'Lake Formation', sub: 'permission checks', kind: 'gate', x: 480, y: 290 },
        { id: 'glue', label: 'Glue Tables', sub: 'data catalog', kind: 'storage', x: 700, y: 290 },
        { id: 's3', label: 'S3 Data Lake', sub: 'storage', kind: 'storage', x: 905, y: 180 },
      ],
      edges: [
        ['emr', 'legacy'],
        ['legacy', 's3'],
        ['emr', 'lf', 'TLS'],
        ['roles', 'lf', 'assume'],
        ['lf', 'glue'],
        ['glue', 's3'],
      ],
      steps: [
        {
          title: 'Before: direct S3 access',
          text: 'Jobs read and write S3 paths directly. It works, but permissions are coarse and hard to audit.',
          nodes: ['emr', 'legacy', 's3'],
          edges: ['emr->legacy', 'legacy->s3'],
          status: { legacy: 'warn' },
        },
        {
          title: 'Migrate to governed tables',
          text: 'Access moves to Glue tables protected by Lake Formation, with table-level permissions instead of bucket paths.',
          nodes: ['emr', 'lf', 'glue', 's3'],
          edges: ['emr->lf', 'lf->glue', 'glue->s3'],
        },
        {
          title: 'Writes start failing',
          text: 'EMR write operations fail under Lake Formation across multiple EMR versions.',
          nodes: ['emr', 'lf'],
          edges: [],
          status: { emr: 'error', lf: 'error' },
        },
        {
          title: 'Fix: encryption + runtime roles',
          text: 'In-transit encryption is enabled and EMR runtime roles are configured, so each job presents an identity Lake Formation can authorize.',
          nodes: ['roles', 'lf', 'emr'],
          edges: ['roles->lf', 'emr->lf'],
          status: { roles: 'ok', lf: 'ok' },
        },
        {
          title: 'After: governed and working',
          text: 'Reads and writes flow through governed tables on every EMR version.',
          nodes: ['emr', 'lf', 'glue', 's3', 'roles'],
          edges: ['emr->lf', 'roles->lf', 'lf->glue', 'glue->s3'],
          status: { emr: 'ok', lf: 'ok' },
          metrics: [
            { label: 'EMR writes', value: 'Fixed' },
            { label: 'Access', value: 'Governed' },
          ],
        },
      ],
    },
  },

  {
    id: 'lse-incident-recovery',
    title: 'Large-Scale Event Recovery (4-day On-call)',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Reliability',
    reviewed: false,
    summary:
      'Managed on-call incident response during a 4-day Large-Scale Event involving DJS host failures, Redshift endpoint unavailability, and EMR job submission errors. Coordinated cross-team recovery, built temporary Spark ETL bypass scripts, and backfilled every impacted data flow.',
    challenge:
      'Several layers of the data platform failed at once: orchestration hosts, the warehouse endpoint, and job submission. Downstream applications were left without data.',
    approach: [
      'Coordinated cross-team recovery across the failing services.',
      'Wrote temporary Spark-based ETL bypass scripts to keep data moving around the broken orchestration path.',
      'Backfilled all impacted data flows once services recovered.',
    ],
    impact: [
      { value: '4 days', label: 'large-scale event' },
      { value: '5+', label: 'downstream apps fully recovered' },
      { value: '100%', label: 'impacted flows backfilled' },
    ],
    tech: ['Spark', 'EMR', 'Redshift', 'Incident Management'],
    simulation: {
      nodes: [
        { id: 'up', label: 'Upstream Data', sub: 'sources', kind: 'source', x: 95, y: 220 },
        { id: 'djs', label: 'DJS Hosts', sub: 'job scheduling', kind: 'compute', x: 290, y: 100 },
        { id: 'emr', label: 'EMR Jobs', sub: 'ETL', kind: 'compute', x: 490, y: 100 },
        { id: 'rs', label: 'Redshift', sub: 'warehouse endpoint', kind: 'storage', x: 700, y: 100 },
        { id: 'apps', label: 'Downstream Apps', sub: '5+ consumers', kind: 'consumer', x: 905, y: 220 },
        { id: 'bypass', label: 'Spark ETL Bypass', sub: 'temporary scripts', kind: 'ml', x: 400, y: 360 },
        { id: 'fill', label: 'Backfill', sub: 'replay missed windows', kind: 'gate', x: 650, y: 360 },
      ],
      edges: [
        ['up', 'djs'],
        ['djs', 'emr'],
        ['emr', 'rs'],
        ['rs', 'apps'],
        ['up', 'bypass', 'bypass'],
        ['bypass', 'fill'],
        ['fill', 'rs', 'backfill'],
      ],
      steps: [
        {
          title: 'Normal operation',
          text: 'Data flows from upstream through scheduled EMR jobs into Redshift and out to downstream apps.',
          nodes: ['up', 'djs', 'emr', 'rs', 'apps'],
          edges: ['up->djs', 'djs->emr', 'emr->rs', 'rs->apps'],
        },
        {
          title: 'Large-scale event',
          text: 'DJS hosts fail, the Redshift endpoint becomes unavailable, and EMR job submissions error out. Downstream apps stop getting data.',
          nodes: ['djs', 'emr', 'rs', 'apps'],
          edges: [],
          status: { djs: 'error', emr: 'error', rs: 'error', apps: 'warn' },
          metrics: [{ label: 'Duration', value: '4 days' }],
        },
        {
          title: 'Route around the failure',
          text: 'Temporary Spark-based ETL bypass scripts keep processing data while orchestration is down, coordinated with partner teams.',
          nodes: ['up', 'bypass', 'djs', 'emr'],
          edges: ['up->bypass'],
          status: { djs: 'error', emr: 'error', bypass: 'ok' },
        },
        {
          title: 'Backfill',
          text: 'As Redshift recovers, every missed window is backfilled.',
          nodes: ['bypass', 'fill', 'rs'],
          edges: ['bypass->fill', 'fill->rs'],
          status: { rs: 'ok', fill: 'ok' },
        },
        {
          title: 'Full recovery',
          text: 'All impacted data flows are restored and every downstream application has complete data.',
          nodes: ['up', 'djs', 'emr', 'rs', 'apps'],
          edges: ['up->djs', 'djs->emr', 'emr->rs', 'rs->apps'],
          status: { djs: 'ok', emr: 'ok', rs: 'ok', apps: 'ok' },
          metrics: [
            { label: 'Apps recovered', value: '5+' },
            { label: 'Data recovered', value: '100%' },
          ],
        },
      ],
    },
  },

  {
    id: 'spark-auto-recovery',
    title: 'Self-Healing Spark Error Recovery',
    company: 'Amazon Web Services (Internship)',
    period: 'May – Jul 2023',
    category: 'Automation',
    reviewed: false,
    summary:
      'Designed an automatic data recovery feature that extracts real-time Spark errors, detects failures with a recursive error-detection algorithm, and reruns jobs automatically, cutting manual intervention by 90%.',
    challenge:
      'Spark job failures needed an engineer to dig through logs, diagnose, and rerun by hand.',
    approach: [
      'Extracted real-time Spark errors using Jupyter notebooks.',
      'Implemented a recursive error-detection algorithm to find root failures.',
      'Automated job reruns with Spark scripts and MCM.',
      'Recovered affected data automatically.',
    ],
    impact: [
      { value: '−90%', label: 'manual intervention' },
      { value: '↓', label: 'job failures' },
    ],
    tech: ['Spark', 'Python', 'Jupyter', 'EMR'],
    simulation: {
      nodes: [
        { id: 'job', label: 'Spark Jobs', sub: 'production', kind: 'compute', x: 100, y: 220 },
        { id: 'ext', label: 'Error Extraction', sub: 'real-time · Jupyter', kind: 'compute', x: 300, y: 220 },
        { id: 'det', label: 'Recursive Detection', sub: 'find root cause', kind: 'ml', x: 500, y: 220 },
        { id: 'rerun', label: 'Automated Rerun', sub: 'Spark scripts + MCM', kind: 'gate', x: 710, y: 100 },
        { id: 'rec', label: 'Data Recovery', sub: 'restore outputs', kind: 'storage', x: 710, y: 340 },
        { id: 'ok', label: 'Healthy Pipeline', sub: 'no human needed', kind: 'consumer', x: 905, y: 220 },
      ],
      edges: [
        ['job', 'ext', 'errors'],
        ['ext', 'det'],
        ['det', 'rerun'],
        ['det', 'rec'],
        ['rerun', 'ok'],
        ['rec', 'ok'],
      ],
      steps: [
        { title: 'A job fails', text: 'A Spark job hits an error in production.', nodes: ['job'], edges: [], status: { job: 'error' } },
        {
          title: 'Extract errors in real time',
          text: 'Errors are pulled from the running jobs as they happen instead of after someone notices.',
          nodes: ['job', 'ext'],
          edges: ['job->ext'],
          status: { job: 'error' },
        },
        {
          title: 'Detect recursively',
          text: 'A recursive error-detection algorithm walks the failure chain to find what actually broke.',
          nodes: ['ext', 'det'],
          edges: ['ext->det'],
        },
        {
          title: 'Rerun and recover automatically',
          text: 'The job is rerun automatically and affected data is recovered with no manual troubleshooting.',
          nodes: ['det', 'rerun', 'rec'],
          edges: ['det->rerun', 'det->rec'],
          status: { rerun: 'ok', rec: 'ok' },
        },
        {
          title: 'Pipeline healthy',
          text: 'The pipeline returns to healthy on its own.',
          nodes: ['rerun', 'rec', 'ok', 'job'],
          edges: ['rerun->ok', 'rec->ok'],
          status: { ok: 'ok', job: 'ok' },
          metrics: [{ label: 'Manual intervention', value: '−90%' }],
        },
      ],
    },
  },

  {
    id: 'emr-autoscaling-monitoring',
    title: 'EMR Dynamic Scaling & Anomaly Monitoring',
    company: 'Amazon Web Services (Internship)',
    period: 'May – Jul 2023',
    category: 'Observability',
    reviewed: false,
    summary:
      'Implemented dynamic scaling scripts that adjust Spark workloads on EMR, plus CloudWatch dashboards and matplotlib visualizations that track resource utilization and alert on anomalies.',
    challenge:
      'EMR clusters ran into critical resource errors and issues were detected late, causing downtime and lower job throughput.',
    approach: [
      'Collected resource-utilization metrics into CloudWatch.',
      'Built dashboards (CloudWatch + matplotlib) and anomaly alerts.',
      'Wrote dynamic scaling scripts in Spark that adjust workloads before errors become outages.',
      'Integrated the solution into existing data pipelines.',
    ],
    impact: [
      { value: '↓', label: 'error-related downtime' },
      { value: '↑', label: 'overall job throughput' },
      { value: 'Faster', label: 'issue detection & response' },
    ],
    tech: ['EMR', 'Spark', 'CloudWatch', 'Matplotlib', 'Python'],
    simulation: {
      nodes: [
        { id: 'work', label: 'Spark Workloads', sub: 'pipelines', kind: 'source', x: 95, y: 220 },
        { id: 'emr', label: 'EMR Cluster', sub: 'compute', kind: 'compute', x: 300, y: 220 },
        { id: 'cw', label: 'CloudWatch Metrics', sub: 'utilization', kind: 'storage', x: 520, y: 220 },
        { id: 'dash', label: 'Dashboards', sub: 'CloudWatch · matplotlib', kind: 'consumer', x: 760, y: 90 },
        { id: 'alarm', label: 'Anomaly Alerts', sub: 'thresholds', kind: 'alert', x: 760, y: 340 },
        { id: 'scale', label: 'Dynamic Scaling', sub: 'Spark scripts', kind: 'gate', x: 420, y: 410 },
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
        {
          title: 'Measure everything',
          text: 'Resource utilization is published to CloudWatch.',
          nodes: ['emr', 'cw'],
          edges: ['emr->cw'],
        },
        {
          title: 'Visualize',
          text: 'Dashboards show cluster health at a glance.',
          nodes: ['cw', 'dash'],
          edges: ['cw->dash'],
        },
        {
          title: 'Anomaly detected',
          text: 'Utilization spikes past a threshold and an alert fires before it turns into a critical error.',
          nodes: ['emr', 'cw', 'alarm'],
          edges: ['emr->cw', 'cw->alarm'],
          status: { emr: 'warn', alarm: 'error' },
        },
        {
          title: 'Scale dynamically',
          text: 'Scaling scripts adjust the workload, the cluster stabilizes, and throughput goes up.',
          nodes: ['alarm', 'scale', 'emr', 'work'],
          edges: ['alarm->scale', 'scale->emr', 'work->emr'],
          status: { emr: 'ok', scale: 'ok' },
          metrics: [
            { label: 'Downtime', value: '↓' },
            { label: 'Throughput', value: '↑' },
          ],
        },
      ],
    },
  },

  {
    id: 'wavteq-pipelines',
    title: 'Optimized Pipelines & Dimensional Model',
    company: 'Wavteq',
    period: '2018 – 2021',
    category: 'Analytics Engineering',
    reviewed: false,
    summary:
      'Designed optimized data pipelines and a dimensional data model over 1 GB+ of raw data, cutting processing time by 50% and increasing data accuracy by 95%. Reporting on top of it drove a 25% cost reduction.',
    challenge:
      'Raw business data was messy and slow to process, and reporting relied on repetitive manual work.',
    approach: [
      'Cleaned and explored 1 GB+ of raw data with Pandas and SciPy.',
      'Modeled it into a dimensional (fact/dimension) model for fast, consistent queries.',
      'Built reports that improved decision-making.',
      'Automated repetitive Excel work with VBA macros.',
    ],
    impact: [
      { value: '−50%', label: 'processing time' },
      { value: '+95%', label: 'data accuracy' },
      { value: '−25%', label: 'costs' },
      { value: '½', label: 'manual processing time' },
    ],
    tech: ['Python', 'Pandas', 'SciPy', 'Data Modeling', 'Excel VBA'],
    simulation: {
      nodes: [
        { id: 'raw', label: 'Raw Business Data', sub: '1 GB+', kind: 'source', x: 95, y: 220 },
        { id: 'clean', label: 'Cleaning & EDA', sub: 'Pandas · SciPy', kind: 'compute', x: 300, y: 220 },
        { id: 'dim', label: 'Dimensional Model', sub: 'facts + dimensions', kind: 'storage', x: 510, y: 220 },
        { id: 'rep', label: 'Reports', sub: 'decision support', kind: 'consumer', x: 715, y: 220 },
        { id: 'vba', label: 'VBA Automation', sub: 'Excel macros', kind: 'compute', x: 510, y: 400 },
        { id: 'biz', label: 'Decision Makers', sub: 'cost savings', kind: 'consumer', x: 905, y: 220 },
      ],
      edges: [
        ['raw', 'clean'],
        ['clean', 'dim', 'load'],
        ['dim', 'rep', 'query'],
        ['vba', 'rep', 'automate'],
        ['rep', 'biz'],
      ],
      steps: [
        { title: 'Raw data in', text: 'Over 1 GB of raw business data arrives.', nodes: ['raw', 'clean'], edges: ['raw->clean'] },
        {
          title: 'Clean and explore',
          text: 'Pandas and SciPy clean and profile the data so accuracy problems are fixed at the source.',
          nodes: ['clean', 'dim'],
          edges: ['clean->dim'],
          metrics: [{ label: 'Accuracy', value: '+95%' }],
        },
        {
          title: 'Dimensional model',
          text: 'A fact/dimension model makes queries faster and numbers consistent.',
          nodes: ['dim', 'rep'],
          edges: ['dim->rep'],
          metrics: [{ label: 'Processing time', value: '−50%' }],
        },
        {
          title: 'Automate the busywork',
          text: 'VBA macros take over repetitive Excel tasks.',
          nodes: ['vba', 'rep'],
          edges: ['vba->rep'],
          metrics: [{ label: 'Manual time', value: '½' }],
        },
        {
          title: 'Better decisions',
          text: 'Reports give decision makers the insights that drove a 25% cost reduction.',
          nodes: ['rep', 'biz'],
          edges: ['rep->biz'],
          status: { biz: 'ok' },
          metrics: [
            { label: 'Processing time', value: '−50%' },
            { label: 'Costs', value: '−25%' },
          ],
        },
      ],
    },
  },

  {
    id: 'bosch-supply-chain',
    title: 'Supply-Chain Metrics & Forecasting',
    company: 'Bosch',
    period: '2016 – 2017',
    category: 'Analytics',
    reviewed: false,
    summary:
      'Developed supply-chain metrics with Python and Tableau in Jupyter, backed by MS SQL Server, plus statistical forecasting models. Material stayed available without line stoppage, and the work drove a 15% increase in revenue.',
    challenge:
      'Material availability was hard to see in advance, which put production lines at risk of stopping.',
    approach: [
      'Computed supply-chain metrics in Python (Jupyter) and stored them in MS SQL Server.',
      'Built Tableau dashboards for process visibility.',
      'Applied statistical models to forecast trends.',
      'Documented requirements and data processes to keep pipelines compliant.',
    ],
    impact: [
      { value: '+15%', label: 'revenue' },
      { value: '0', label: 'line stoppages from material shortages' },
    ],
    tech: ['Python', 'Jupyter', 'Tableau', 'MS SQL Server', 'Statistics', 'AWS Glue'],
    simulation: {
      nodes: [
        { id: 'plant', label: 'Plant & Suppliers', sub: 'inventory · orders data', kind: 'source', x: 100, y: 220 },
        { id: 'py', label: 'Python Metrics', sub: 'Jupyter', kind: 'compute', x: 300, y: 220 },
        { id: 'sql', label: 'MS SQL Server', sub: 'metrics store', kind: 'storage', x: 500, y: 220 },
        { id: 'fc', label: 'Forecasting', sub: 'statistical models', kind: 'ml', x: 710, y: 100 },
        { id: 'tab', label: 'Tableau Dashboards', sub: 'visibility', kind: 'consumer', x: 710, y: 340 },
        { id: 'line', label: 'Production Line', sub: 'material available', kind: 'consumer', x: 905, y: 220 },
      ],
      edges: [
        ['plant', 'py'],
        ['py', 'sql', 'store'],
        ['sql', 'fc'],
        ['sql', 'tab'],
        ['fc', 'line', 'plan'],
        ['tab', 'line', 'monitor'],
      ],
      steps: [
        { title: 'Collect', text: 'Plant and supplier data is gathered.', nodes: ['plant', 'py'], edges: ['plant->py'] },
        {
          title: 'Compute metrics',
          text: 'Python notebooks compute supply-chain metrics and store them in MS SQL Server.',
          nodes: ['py', 'sql'],
          edges: ['py->sql'],
        },
        {
          title: 'Forecast and visualize',
          text: 'Statistical models forecast trends while Tableau dashboards make the process visible.',
          nodes: ['sql', 'fc', 'tab'],
          edges: ['sql->fc', 'sql->tab'],
        },
        {
          title: 'Keep the line running',
          text: 'Planners act ahead of shortages: material stays available with no line stoppage.',
          nodes: ['fc', 'tab', 'line'],
          edges: ['fc->line', 'tab->line'],
          status: { line: 'ok' },
          metrics: [
            { label: 'Revenue', value: '+15%' },
            { label: 'Line stoppages', value: '0' },
          ],
        },
      ],
    },
  },
]

export const getProject = (id) => projects.find((p) => p.id === id)
