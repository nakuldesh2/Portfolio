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
// Optional `tradeoffs` (design decisions) and `faq` ({ q, a } interview
// follow-ups) are shown in the project modal and indexed by the AI assistant.
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
    title: 'Web Engagements Medallion Migration',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Data Platform',
    reviewed: false,
    summary:
      'Led the end-to-end migration of 24 Web Engagements datasets, one of the first subject areas to move, from a legacy internal marketing data platform to a managed data-warehouse platform organized in Medallion layers (Bronze → Silver → Gold). Adapted the PySpark workflows, built a configuration-driven Airflow DAG generator and a reusable validation utility, and completed historical backfill, production cutover and retirement of the legacy scheduler.',
    challenge:
      'The legacy platform ran PySpark on fixed-capacity EMR with an in-house scheduler. Fixed compute struggled with volume spikes and sat idle at quiet times; processing and customer workloads shared infrastructure, so failures had a wide impact; console changes made setup hard to repeat; workflow configuration and common task logic were copied for every dataset; quality checks varied between ETLs; some alerts fired only after repeated retries; and staging, cleaned and reporting data were not consistently separated.',
    approach: [
      'Mapped every dataset’s inputs, transformations and consumers, grouped them by dependency, and validated upstream groups first so downstream results did not have to be re-validated each time an input changed.',
      'Used temporary Lake Formation shares from the legacy platform for source datasets other teams had not migrated yet, so development could run in parallel; later switched to the new sources and re-ran validation.',
      'Migrated the PySpark and Spark SQL workflows, execution settings, S3 locations and database mappings to EMR Serverless, keeping business logic and output schemas unchanged at first so any discrepancy pointed to the platform change, not a logic change.',
      'Built a dynamic DAG generator: shared Python logic plus a small per-pipeline config (schedule, owner, inputs/outputs, dependencies, retries, timeouts, optional steps) that assembles each Airflow DAG from standard tasks: start logging, trigger the ETL, run data-quality validation, optional catalog update, optional Redshift copy, optional dataset publishing, completion logging and failure alerts.',
      'Built a reusable validation utility, run as an Airflow task after each transformation, that compares legacy and new outputs on schema and types, per-partition row counts and column distributions, and logs discrepancies to a cataloged table for analysis.',
      'Integrated dependency handling, retries, timeouts, monitoring, failure notifications and SLA-delay alerts; supported downstream teams’ testing; then backfilled history, switched production and retired the legacy scheduler workflows.',
    ],
    impact: [
      { value: '24', label: 'datasets migrated end to end' },
      { value: 'Full', label: 'historical data backfilled for analysts' },
      { value: 'Retired', label: 'legacy scheduler workflows' },
      { value: 'Reused', label: 'generator + validation by later subject areas' },
    ],
    tech: ['PySpark', 'Spark SQL', 'EMR Serverless', 'Apache Airflow (MWAA)', 'AWS Glue Data Catalog', 'Lake Formation', 'Amazon Redshift', 'Amazon S3', 'Python'],
    tradeoffs: [
      'Temporary shares from the legacy platform unblocked parallel development, at the cost of a second source switch and a second round of validation later.',
      'Keeping business logic unchanged during the platform move made discrepancies easy to diagnose; intentional business changes were handled separately afterwards.',
      'A shared DAG generator removes duplication and lets one fix reach every pipeline, but a change to it affects many workflows, so it needs careful testing.',
      'Matching schemas, counts and distributions is strong evidence but not proof of full equality: a complete comparison must also handle nulls, duplicates and any permitted nondeterminism.',
      'Medallion layering fixed how data is organized; the other wins came from serverless compute, managed orchestration, deployment automation and account separation, not from the three layers alone.',
    ],
    faq: [
      {
        q: 'Did she provision the infrastructure herself?',
        a: 'No. The platform team supplied the managed infrastructure (including managed Airflow); Monica owned the pipeline configuration and integration on top of it.',
      },
      {
        q: 'Why build a DAG generator instead of writing DAGs?',
        a: 'Every pipeline needed the same tasks (run the ETL, validate, retry, optionally publish, alert). Writing them per dataset duplicates logic, and a fix would have to be repeated across files. With a generator, engineers only supply dataset settings and business logic, while shared behavior is maintained centrally.',
      },
      {
        q: 'Why validate in dependency order?',
        a: 'If downstream datasets were validated while their inputs were still changing, they would need re-validating every time. Validating upstream groups first avoids that repeated work.',
      },
      {
        q: 'Why keep historical data during cutover?',
        a: 'Analysts needed continuous access to history after the migration, so historical data was backfilled before the old workflows were shut down.',
      },
    ],
    simulation: {
      nodes: [
        { id: 'src', label: 'Data Sources', sub: 'web · campaign data', kind: 'source', x: 95, y: 220 },
        { id: 'bronze', label: 'Bronze', sub: 'raw · staging', kind: 'storage', x: 290, y: 220 },
        { id: 'silver', label: 'Silver', sub: 'cleaned · validated', kind: 'storage', x: 490, y: 220 },
        { id: 'quar', label: 'Quality Checks', sub: 'flag discrepancies', kind: 'alert', x: 490, y: 400 },
        { id: 'gold', label: 'Gold', sub: 'business-ready', kind: 'storage', x: 700, y: 220 },
        { id: 'share', label: 'Governed Access', sub: 'Lake Formation', kind: 'gate', x: 905, y: 110 },
        { id: 'users', label: 'Analysts · BI', sub: 'Redshift reporting', kind: 'consumer', x: 905, y: 330 },
        { id: 'dag', label: 'DAG Generator', sub: 'Airflow · config', kind: 'compute', x: 290, y: 70 },
        { id: 'val', label: 'Validation Utility', sub: 'legacy vs new', kind: 'gate', x: 700, y: 70 },
      ],
      edges: [
        ['src', 'bronze', 'land'],
        ['bronze', 'silver', 'PySpark'],
        ['silver', 'quar', 'check'],
        ['silver', 'gold', 'aggregate'],
        ['gold', 'share', 'publish'],
        ['share', 'users', 'query'],
        ['dag', 'bronze', 'orchestrate'],
        ['val', 'gold', 'compare'],
      ],
      steps: [
        {
          title: 'Land raw data in Bronze',
          text: 'Source data lands in Bronze, preserving what the source sent. Datasets were grouped by dependency so upstream groups could be migrated and validated first.',
          nodes: ['src', 'bronze'],
          edges: ['src->bronze'],
          metrics: [{ label: 'Datasets', value: '24' }],
        },
        {
          title: 'Clean and validate in Silver',
          text: 'PySpark on EMR Serverless produces cleaned, validated facts and dimensions. Business logic stayed unchanged during the move, so any discrepancy pointed to the platform change.',
          nodes: ['bronze', 'silver', 'quar'],
          edges: ['bronze->silver', 'silver->quar'],
          status: { quar: 'warn' },
        },
        {
          title: 'Build business-ready Gold',
          text: 'Gold holds the reporting datasets analysts and BI tools query.',
          nodes: ['silver', 'gold'],
          edges: ['silver->gold'],
        },
        {
          title: 'Prove parity with the legacy platform',
          text: 'A reusable validation utility compares old and new outputs on schema, per-partition counts and column distributions, and logs every discrepancy for analysis.',
          nodes: ['val', 'gold'],
          edges: ['val->gold'],
          status: { val: 'ok' },
        },
        {
          title: 'Orchestrate from config',
          text: 'A config-driven generator assembles each Airflow DAG from shared tasks: run the ETL, validate, retry, optionally publish, and alert on failure.',
          nodes: ['dag', 'bronze'],
          edges: ['dag->bronze'],
        },
        {
          title: 'Cut over without losing history',
          text: 'After downstream testing and a historical backfill, production switched to the new platform and the legacy scheduler workflows were retired.',
          nodes: ['gold', 'share', 'users'],
          edges: ['gold->share', 'share->users'],
          status: { share: 'ok', users: 'ok' },
          metrics: [
            { label: 'Datasets migrated', value: '24' },
            { label: 'History', value: 'Backfilled' },
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
      'Reviewers had to gather information from several separate engineering systems and check drawings against design rules by hand.',
    approach: [
      'A multimodal model interprets engineering drawings together with their text.',
      'MCP exposes the connected CAD, PLM and manufacturing systems to the AI workflow as tools.',
      'An agentic workflow coordinates retrieval, analysis and tool use to check design rules.',
      'Findings are compiled for engineers to review.',
    ],
    impact: [
      { value: '↑', label: 'faster review cycles' },
      { value: '↑', label: 'design-rule compliance' },
    ],
    tech: ['Agentic AI', 'Multimodal LLMs', 'Model Context Protocol (MCP)'],
    tradeoffs: [
      'The diagram shows the roles each system plays (CAD for drawings, PLM for product and revision context, manufacturing systems for production constraints); detailed implementation specifics are not published here.',
    ],
    faq: [
      {
        q: 'Is this the same as the Smart Scanner or onboarding assistant?',
        a: 'No. Those are separate AI features in a scanning service. This platform is about engineering drawing review across CAD, PLM and manufacturing systems.',
      },
    ],
    simulation: {
      nodes: [
        { id: 'eng', label: 'Engineer', sub: 'submits drawing', kind: 'source', x: 95, y: 220 },
        { id: 'agent', label: 'Review Agent', sub: 'multimodal LLM', kind: 'ml', x: 300, y: 220 },
        { id: 'mcp', label: 'MCP Servers', sub: 'tool connectors', kind: 'compute', x: 510, y: 220 },
        { id: 'cad', label: 'CAD', sub: 'drawings', kind: 'storage', x: 740, y: 90 },
        { id: 'plm', label: 'PLM', sub: 'product · revisions', kind: 'storage', x: 740, y: 220 },
        { id: 'mfg', label: 'Manufacturing', sub: 'production constraints', kind: 'storage', x: 740, y: 350 },
        { id: 'checks', label: 'Rule Checks', sub: 'design rules', kind: 'gate', x: 300, y: 400 },
        { id: 'report', label: 'Review Findings', sub: 'for engineers', kind: 'consumer', x: 510, y: 400 },
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
          text: 'A multimodal model interprets the drawing’s visuals and text together.',
          nodes: ['agent'],
          edges: [],
          status: { agent: 'ok' },
        },
        {
          title: 'Gather context through MCP',
          text: 'Through MCP, the agent reaches CAD, PLM and manufacturing systems with one standard tool interface.',
          nodes: ['agent', 'mcp', 'cad', 'plm', 'mfg'],
          edges: ['agent->mcp', 'mcp->cad', 'mcp->plm', 'mcp->mfg'],
        },
        {
          title: 'Validate design rules',
          text: 'The agent checks the drawing against applicable design rules.',
          nodes: ['agent', 'checks'],
          edges: ['agent->checks'],
          status: { checks: 'ok' },
        },
        {
          title: 'Findings for engineers',
          text: 'Engineers review the findings, which speeds up review cycles and improves compliance.',
          nodes: ['checks', 'report'],
          edges: ['checks->report'],
        },
      ],
    },
  },

  {
    id: 'smart-scanner',
    title: 'Smart Scanner: ML Scanner Selection',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'AI / ML',
    reviewed: false,
    summary:
      'ML-driven selection between malware scanners in a scanning service: a model predicts the better-suited scanner from lightweight file metadata, and a feedback loop records predicted vs. actual outcomes for periodic retraining with model versioning and rollback.',
    challenge:
      'Scanner processing time varied with file characteristics, and a static prediction model could become less useful as workloads or scanner behavior changed.',
    approach: [
      'Used file size, MIME type and asset type as prediction inputs: lightweight features available before any scan runs.',
      'A selection model predicts the suitable, faster scanner within the service’s required security policy.',
      'A feedback table captures the predicted scanner, confidence, actual duration and outcome for every file.',
      'Periodic batch retraining on that feedback, with model versioning and rollback to control deployment risk.',
    ],
    impact: [
      { value: 'Adaptive', label: 'selection that learns from real outcomes' },
      { value: 'Versioned', label: 'models with rollback' },
    ],
    tech: ['Machine Learning', 'Feature Engineering', 'Model Versioning', 'Batch Retraining'],
    tradeoffs: [
      'Prediction and model maintenance add overhead, which has to be justified by the scanning performance gained.',
      'Batch retraining is easier to control and evaluate than continuous online learning, but adapts more slowly to change.',
      'Scanner choice must always respect required security coverage: optimizing for speed is never permission to skip mandated checks.',
    ],
    faq: [
      {
        q: 'Why use file metadata as features?',
        a: 'Size, MIME type and asset type are known before scanning starts and are cheap to read, so the model can decide without adding latency.',
      },
      {
        q: 'Why a feedback table?',
        a: 'Recording the prediction, confidence, actual duration and outcome shows how well the model is doing and provides training data, so selection keeps up as workloads and scanners change.',
      },
    ],
    simulation: {
      nodes: [
        { id: 'file', label: 'Incoming Files', sub: 'assets to scan', kind: 'source', x: 95, y: 220 },
        { id: 'feat', label: 'File Metadata', sub: 'size · MIME · type', kind: 'compute', x: 290, y: 220 },
        { id: 'model', label: 'Scanner Selector', sub: 'ML prediction', kind: 'ml', x: 490, y: 220 },
        { id: 'a', label: 'Scanner A', sub: 'malware engine', kind: 'compute', x: 700, y: 100 },
        { id: 'b', label: 'Scanner B', sub: 'malware engine', kind: 'compute', x: 700, y: 300 },
        { id: 'fb', label: 'Feedback Table', sub: 'predicted vs actual', kind: 'storage', x: 905, y: 220 },
        { id: 'train', label: 'Batch Retraining', sub: 'versioned · rollback', kind: 'ml', x: 700, y: 420 },
      ],
      edges: [
        ['file', 'feat'],
        ['feat', 'model', 'features'],
        ['model', 'a', 'route'],
        ['model', 'b', 'route'],
        ['a', 'fb'],
        ['b', 'fb'],
        ['fb', 'train'],
        ['train', 'model', 'deploy'],
      ],
      steps: [
        { title: 'A file arrives', text: 'A file needs a malware scan.', nodes: ['file', 'feat'], edges: ['file->feat'] },
        {
          title: 'Read cheap features',
          text: 'Size, MIME type and asset type are read before scanning starts.',
          nodes: ['feat', 'model'],
          edges: ['feat->model'],
        },
        {
          title: 'Pick the better scanner',
          text: 'The model predicts which scanner suits this file best, always within the required security policy.',
          nodes: ['model', 'a', 'b'],
          edges: ['model->a', 'model->b'],
        },
        {
          title: 'Record what really happened',
          text: 'The prediction, confidence, actual duration and outcome go into a feedback table.',
          nodes: ['a', 'b', 'fb'],
          edges: ['a->fb', 'b->fb'],
        },
        {
          title: 'Retrain safely',
          text: 'Feedback drives periodic retraining. New models are versioned, so a bad one can be rolled back.',
          nodes: ['fb', 'train', 'model'],
          edges: ['fb->train', 'train->model'],
          status: { train: 'ok' },
        },
      ],
    },
  },

  {
    id: 'onboarding-assistant',
    title: 'AI Client Onboarding Assistant',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'AI / LLM',
    reviewed: false,
    summary:
      'An internal AI assistant that replaced ticket-driven onboarding to a scanning service: it collects and validates the required details, generates the configuration, calls the onboarding APIs and tracks the outcome.',
    challenge:
      'Teams onboarded by filing tickets with details such as AWS account IDs and SNS topics. Gathering that information and configuring it by hand was repetitive and invited input mistakes.',
    approach: [
      'A conversational assistant collects the required onboarding details from the requesting team.',
      'Deterministic validators check required fields and formats, so the model never decides on its own what is valid.',
      'The assistant generates the service configuration and invokes the onboarding APIs.',
      'Each request’s outcome is tracked.',
    ],
    impact: [
      { value: 'Self-serve', label: 'onboarding instead of tickets' },
      { value: '↓', label: 'manual work and input mistakes' },
    ],
    tech: ['Conversational AI', 'Input Validation', 'REST APIs', 'Amazon SNS'],
    tradeoffs: [
      'Natural-language intake makes gathering requirements easier, but it adds evaluation work and ambiguity handling.',
      'Generated configuration and API calls need dependable validation: deterministic validators and the service’s own APIs enforce formats and permissions.',
    ],
    faq: [
      {
        q: 'Why not let the AI fill in the configuration directly?',
        a: 'The conversation is flexible, but correctness is not left to the model: deterministic validators and the onboarding APIs enforce the required formats and permissions.',
      },
    ],
    simulation: {
      nodes: [
        { id: 'team', label: 'Onboarding Team', sub: 'wants scanning', kind: 'source', x: 95, y: 220 },
        { id: 'ticket', label: 'Manual Tickets', sub: 'legacy path', kind: 'compute', x: 300, y: 80 },
        { id: 'asst', label: 'AI Assistant', sub: 'conversational intake', kind: 'ml', x: 300, y: 220 },
        { id: 'val', label: 'Validators', sub: 'account ID · SNS topic', kind: 'gate', x: 510, y: 220 },
        { id: 'cfg', label: 'Config Generator', sub: 'service settings', kind: 'compute', x: 720, y: 220 },
        { id: 'api', label: 'Onboarding APIs', sub: 'apply config', kind: 'compute', x: 905, y: 100 },
        { id: 'track', label: 'Outcome Tracking', sub: 'status per request', kind: 'storage', x: 905, y: 360 },
      ],
      edges: [
        ['team', 'ticket'],
        ['team', 'asst', 'chat'],
        ['asst', 'val', 'details'],
        ['val', 'cfg'],
        ['cfg', 'api'],
        ['api', 'track'],
      ],
      steps: [
        {
          title: 'Before: tickets',
          text: 'Teams filed tickets with details like AWS account IDs and SNS topics, and engineers configured them by hand.',
          nodes: ['team', 'ticket'],
          edges: ['team->ticket'],
          status: { ticket: 'warn' },
        },
        { title: 'Ask the assistant', text: 'The team describes what it needs in a conversation.', nodes: ['team', 'asst'], edges: ['team->asst'] },
        {
          title: 'Validate deterministically',
          text: 'Validators check every required field and format. The model gathers details; rules decide what is valid.',
          nodes: ['asst', 'val'],
          edges: ['asst->val'],
          status: { val: 'ok' },
        },
        {
          title: 'Generate and apply',
          text: 'The configuration is generated and applied through the onboarding APIs.',
          nodes: ['val', 'cfg', 'api'],
          edges: ['val->cfg', 'cfg->api'],
        },
        {
          title: 'Track the outcome',
          text: 'Each request’s result is recorded, with less manual work and fewer input mistakes.',
          nodes: ['api', 'track'],
          edges: ['api->track'],
          status: { track: 'ok' },
        },
      ],
    },
  },

  {
    id: 'partner-onboarding',
    title: 'Secure Partner Access (SFTP → SSO)',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Identity & Security',
    reviewed: false,
    summary:
      'Modernized how external partners access a third-party marketing reporting and analytics platform: a legacy SFTP-based workflow gave way to an Amazon onboarding flow with centralized authentication through AWS Cognito, SSO and OpenID Connect plus two-factor verification, while existing reporting and data integrations kept working.',
    challenge:
      'A legacy partner workflow needed stronger, centralized access management and sign-in security, without breaking the reporting and data-processing integrations that depended on it.',
    approach: [
      'Integrated AWS Cognito, single sign-on and OpenID Connect into the partner onboarding experience.',
      'Enforced a second authentication factor for partners.',
      'Adapted the affected reporting and analytics integrations and validated downstream compatibility.',
      'Added automated testing and QA validation to the delivery pipelines.',
    ],
    impact: [
      { value: 'MFA', label: 'for external partners' },
      { value: 'Centralized', label: 'identity and authentication' },
      { value: 'Compatible', label: 'downstream data integrations' },
    ],
    tech: ['AWS Cognito', 'OpenID Connect', 'SSO', 'MFA', 'CI/CD'],
    tradeoffs: [
      'Stronger authentication improves security but adds some friction for partners.',
      'A gradual migration is safer, but means temporarily maintaining two access paths.',
      'SFTP is an encrypted file-transfer protocol, not a browser identity protocol: SSO, OIDC and MFA apply to the onboarding and sign-in experience.',
    ],
    faq: [
      {
        q: 'Does SFTP use the OIDC tokens?',
        a: 'No. SFTP is encrypted file transfer and is not itself a browser identity protocol. The Cognito, SSO, OIDC and MFA work applies to the partner onboarding and sign-in experience.',
      },
    ],
    simulation: {
      nodes: [
        { id: 'partner', label: 'External Partners', sub: 'agencies · vendors', kind: 'source', x: 95, y: 220 },
        { id: 'sftp', label: 'Legacy SFTP Flow', sub: 'weak sign-in', kind: 'compute', x: 300, y: 80 },
        { id: 'flow', label: 'Onboarding Flow', sub: 'Amazon sign-in', kind: 'compute', x: 300, y: 220 },
        { id: 'cognito', label: 'AWS Cognito', sub: 'SSO · OIDC · MFA', kind: 'gate', x: 510, y: 220 },
        { id: 'report', label: 'Reporting Platform', sub: 'analytics access', kind: 'storage', x: 720, y: 220 },
        { id: 'ingest', label: 'Data Integrations', sub: 'downstream workflows', kind: 'consumer', x: 905, y: 360 },
        { id: 'cicd', label: 'CI/CD + QA', sub: 'automated tests', kind: 'compute', x: 510, y: 400 },
      ],
      edges: [
        ['partner', 'sftp'],
        ['partner', 'flow'],
        ['flow', 'cognito', 'sign in'],
        ['cognito', 'report', 'access'],
        ['report', 'ingest'],
        ['cicd', 'cognito', 'deploy'],
      ],
      steps: [
        {
          title: 'Before: legacy workflow',
          text: 'Partners reached the platform through a legacy SFTP-based workflow that needed stronger sign-in security.',
          nodes: ['partner', 'sftp'],
          edges: ['partner->sftp'],
          status: { sftp: 'warn' },
        },
        {
          title: 'A real onboarding flow',
          text: 'Partners now come in through an Amazon onboarding flow.',
          nodes: ['partner', 'flow'],
          edges: ['partner->flow'],
        },
        {
          title: 'Centralized identity',
          text: 'AWS Cognito handles single sign-on, OpenID Connect and the second factor in one place.',
          nodes: ['flow', 'cognito'],
          edges: ['flow->cognito'],
          status: { cognito: 'ok' },
        },
        {
          title: 'Integrations keep working',
          text: 'Reporting and analytics integrations were adapted and validated, so downstream data workflows were not disrupted.',
          nodes: ['cognito', 'report', 'ingest'],
          edges: ['cognito->report', 'report->ingest'],
        },
        {
          title: 'Ship it safely',
          text: 'Automated testing and QA validation in the delivery pipelines catch problems before they reach partners.',
          nodes: ['cicd', 'cognito'],
          edges: ['cicd->cognito'],
        },
      ],
    },
  },

  {
    id: 'controlled-deletion',
    title: 'Controlled Deletion Pipeline (17 PB)',
    company: 'Amazon Web Services',
    period: '2024 – 2026',
    category: 'Cost Optimization',
    reviewed: false,
    summary:
      'A controlled data-cleanup pipeline that removed obsolete metadata from DynamoDB and the corresponding content from S3: approximately 9 billion records and 17 PB of data, reducing storage and infrastructure costs.',
    challenge:
      'Obsolete data kept incurring storage costs, but it had to be removed at massive scale without touching active datasets or overloading production systems, and consistently across two stores.',
    approach: [
      'Built candidates from a DynamoDB export to S3 instead of a live full-table scan.',
      'Filtered to approved candidates with explicit eligibility checks.',
      'Wrote reviewable batch manifests to S3.',
      'Buffered work through SQS so Lambda processors run at a controlled rate.',
      'Applied deletions through the existing deletion API, so the same business rules apply across DynamoDB and S3.',
      'Monitored progress, failures and throttling in CloudWatch, with the scope and controls documented through change review.',
    ],
    impact: [
      { value: '~9B', label: 'DynamoDB records removed' },
      { value: '17 PB', label: 'S3 data removed' },
      { value: '↓', label: 'storage and infrastructure cost' },
    ],
    tech: ['Amazon DynamoDB', 'Amazon S3', 'Amazon SQS', 'AWS Lambda', 'Amazon CloudWatch'],
    tradeoffs: [
      'S3 lifecycle expiration is simpler for suitable data, but application-specific eligibility and keeping DynamoDB and S3 consistent called for a controlled pipeline.',
      'A snapshot gives a stable candidate list without a live scan, but a snapshot alone does not prove a candidate is still safe to delete at processing time.',
      'Reusing the existing deletion API preserves business rules, but it does not make deletion across S3 and DynamoDB a single atomic transaction.',
      'Rate control protects production capacity at the cost of a longer completion time.',
      'Pausing a deletion is not the same as restoring deleted content, so eligibility checks happen before anything is deleted.',
    ],
    faq: [
      {
        q: 'Why not just scan the table and delete?',
        a: 'A live full-table scan at this scale would load production. Exporting to S3 builds the candidate list from a snapshot instead.',
      },
      {
        q: 'Why SQS?',
        a: 'The queue buffers work and controls the processing rate, protecting production capacity even though the cleanup takes longer.',
      },
      {
        q: 'Why use the existing deletion API?',
        a: 'It already encodes the business rules for deleting this data, so DynamoDB and S3 are cleaned up consistently.',
      },
    ],
    simulation: {
      nodes: [
        { id: 'ddb', label: 'DynamoDB Table', sub: 'obsolete metadata', kind: 'storage', x: 95, y: 100 },
        { id: 'exp', label: 'Table Export', sub: 'snapshot in S3', kind: 'storage', x: 95, y: 320 },
        { id: 'filt', label: 'Eligibility Filter', sub: 'approved only', kind: 'gate', x: 290, y: 320 },
        { id: 'man', label: 'Batch Manifests', sub: 'reviewable batches', kind: 'storage', x: 490, y: 320 },
        { id: 'sqs', label: 'SQS Queue', sub: 'rate control', kind: 'compute', x: 490, y: 110 },
        { id: 'lam', label: 'Lambda Processors', sub: 'process batches', kind: 'compute', x: 700, y: 110 },
        { id: 'api', label: 'Deletion API', sub: 'shared business rules', kind: 'compute', x: 905, y: 110 },
        { id: 'targets', label: 'S3 + DynamoDB', sub: 'data removed', kind: 'storage', x: 905, y: 320 },
        { id: 'cw', label: 'CloudWatch', sub: 'progress · throttling', kind: 'alert', x: 700, y: 410 },
      ],
      edges: [
        ['ddb', 'exp', 'export'],
        ['exp', 'filt'],
        ['filt', 'man'],
        ['man', 'sqs', 'enqueue'],
        ['sqs', 'lam'],
        ['lam', 'api'],
        ['api', 'targets', 'delete'],
        ['lam', 'cw', 'metrics'],
      ],
      steps: [
        {
          title: 'Snapshot, don’t scan',
          text: 'The DynamoDB table is exported to S3, so candidates come from a snapshot instead of a live full-table scan.',
          nodes: ['ddb', 'exp'],
          edges: ['ddb->exp'],
          metrics: [{ label: 'Records', value: '~9B' }],
        },
        {
          title: 'Filter to approved candidates',
          text: 'Explicit eligibility checks keep only data that is approved for deletion. Active data is protected.',
          nodes: ['exp', 'filt'],
          edges: ['exp->filt'],
          status: { filt: 'ok' },
        },
        {
          title: 'Reviewable batches',
          text: 'Candidates are written as batch manifests that can be reviewed before processing.',
          nodes: ['filt', 'man'],
          edges: ['filt->man'],
        },
        {
          title: 'Controlled rate',
          text: 'Batches flow through SQS to Lambda processors at a controlled rate, protecting production capacity.',
          nodes: ['man', 'sqs', 'lam'],
          edges: ['man->sqs', 'sqs->lam'],
        },
        {
          title: 'Delete with shared rules',
          text: 'Deletions go through the existing deletion API, so DynamoDB and S3 are cleaned up by the same business rules.',
          nodes: ['lam', 'api', 'targets'],
          edges: ['lam->api', 'api->targets'],
          metrics: [
            { label: 'S3 removed', value: '17 PB' },
            { label: 'Records removed', value: '~9B' },
          ],
        },
        {
          title: 'Watch it run',
          text: 'CloudWatch tracks progress, failures and throttling throughout the cleanup.',
          nodes: ['lam', 'cw'],
          edges: ['lam->cw'],
          status: { cw: 'ok' },
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
      'A Python (Boto3) Lambda utility that automates recovery of recurring AWS Glue Spark failures: it finds the failed run, measures the job’s input data, calculates revised Spark settings and reruns the job. Deployed beyond proof of concept, it reduced manual on-call recovery work.',
    challenge:
      'During month-end processing, larger input volumes caused recurring Spark failures (out-of-memory errors, broadcast failures and RPC disconnections). On-call engineers manually inspected logs, adjusted job settings and reran jobs.',
    approach: [
      'Investigated Spark UI and log evidence and evaluated options with the mentor and team.',
      'A Glue job failure initiates recovery.',
      'The Lambda function uses the Glue APIs (get_job_runs, get_job) to find the failed run and read the job configuration.',
      'Athena identifies the job’s input S3 path; S3 object listing gives the total input size (with file count as a cross-check).',
      'It calculates revised Spark settings for that input size, updates the Glue job and starts a new run (start_job_run).',
    ],
    impact: [
      { value: '↓', label: 'manual on-call recovery work' },
      { value: 'Beyond POC', label: 'deployed and used by the team' },
    ],
    tech: ['Python', 'Boto3', 'AWS Lambda', 'AWS Glue', 'Amazon Athena', 'Amazon S3', 'Apache Spark'],
    tradeoffs: [
      'Lambda suits lightweight control logic and AWS API calls: it coordinates recovery rather than running the distributed ETL itself.',
      'Lambda execution limits, polling long-running queries, duplicate failure events and changes to shared job configuration all need attention.',
      'OOM, broadcast and RPC failures can have different causes, so resource adjustment is not a universal fix. The utility reruns jobs with settings better suited to the input size; it does not guarantee success.',
    ],
    faq: [
      {
        q: 'Does it fix every Spark failure?',
        a: 'No. It handles the recurring, size-related failure scenarios the team investigated by rerunning with settings better suited to the input size. Failures with other causes still need investigation.',
      },
      {
        q: 'Why Lambda instead of a long-running service?',
        a: 'The work is short control logic: read job state, measure input, update settings, start a run. Lambda is lightweight and integrates directly with the AWS APIs.',
      },
    ],
    simulation: {
      nodes: [
        { id: 'job', label: 'Glue Spark Job', sub: 'month-end ETL', kind: 'compute', x: 110, y: 220 },
        { id: 'lam', label: 'Recovery Lambda', sub: 'Python · Boto3', kind: 'compute', x: 330, y: 100 },
        { id: 'athena', label: 'Athena', sub: 'find input path', kind: 'compute', x: 580, y: 100 },
        { id: 's3', label: 'S3 Input Files', sub: 'total size · count', kind: 'storage', x: 840, y: 100 },
        { id: 'calc', label: 'Sizing Logic', sub: 'revised Spark settings', kind: 'gate', x: 580, y: 350 },
        { id: 'restart', label: 'Update & Rerun', sub: 'start_job_run', kind: 'compute', x: 330, y: 350 },
      ],
      edges: [
        ['job', 'lam', 'failed'],
        ['lam', 'athena'],
        ['athena', 's3', 'list'],
        ['athena', 'calc', 'size'],
        ['calc', 'restart'],
        ['restart', 'job', 'rerun'],
      ],
      steps: [
        {
          title: 'Month-end job fails',
          text: 'Input volume spikes and the Spark job fails: out of memory, a broadcast failure, or an RPC disconnection.',
          nodes: ['job'],
          edges: [],
          status: { job: 'error' },
        },
        {
          title: 'Find the failed run',
          text: 'The Lambda utility uses the Glue APIs to find the failed run and read the job’s configuration.',
          nodes: ['job', 'lam'],
          edges: ['job->lam'],
          status: { job: 'error' },
        },
        {
          title: 'Measure the input',
          text: 'Athena identifies the input location, and S3 object listing gives the total input size.',
          nodes: ['lam', 'athena', 's3'],
          edges: ['lam->athena', 'athena->s3'],
        },
        {
          title: 'Revise the settings',
          text: 'Revised Spark settings are calculated for that input size.',
          nodes: ['athena', 'calc'],
          edges: ['athena->calc'],
          status: { calc: 'ok' },
        },
        {
          title: 'Rerun automatically',
          text: 'The job is updated and rerun with settings better suited to the data, with no manual log digging needed.',
          nodes: ['calc', 'restart', 'job'],
          edges: ['calc->restart', 'restart->job'],
          status: { job: 'ok' },
          metrics: [{ label: 'Manual on-call work', value: '↓' }],
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
    tradeoffs: [
      'Scaling on observed utilization reacts to real load, but thresholds need tuning so the cluster does not scale on noise.',
    ],
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
      'Co-developed a real-time, event-driven security-feed processing platform on Apache Kafka that replaced a batch-oriented Python daemon, and built C#/.NET replication orchestration services that expose REST operations and persist replication state in MySQL.',
    challenge:
      'Security feeds were processed by a batch Python daemon, so data was delivered late, and replication between systems was error-prone.',
    approach: [
      'Replaced batch processing with Kafka topics and streaming consumers.',
      'Built replication orchestration services in C# and .NET with REST APIs and MySQL persistence.',
      'Shipped through Git and CI/CD.',
    ],
    impact: [
      { value: '↓', label: 'data-delivery latency' },
      { value: '↓', label: 'replication errors' },
    ],
    tech: ['Apache Kafka', 'C#', '.NET', 'Python', 'REST APIs', 'MySQL', 'Git', 'CI/CD'],
    tradeoffs: [
      'Kafka decouples producers and consumers and supports continuous delivery, but introduces consumer lag, ordering and duplicate-delivery considerations.',
      'A dedicated orchestration service centralizes replication logic, at the cost of one more deployable component.',
      'REST gives controlled operations but needs clear request and error contracts; MySQL makes state durable but adds schema and query maintenance.',
    ],
    simulation: {
      nodes: [
        { id: 'feeds', label: 'Security Feeds', sub: 'incoming entries', kind: 'source', x: 95, y: 160 },
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
    tradeoffs: [
      'Increasing ingestion capacity at the emitter improves downstream availability, and monitoring makes ingestion problems visible early.',
    ],
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
    tradeoffs: [
      'Prefix-preserving anonymization keeps network structure useful for analysis, but it is not complete protection against every inference attack.',
      'A consistent keyed mapping lets anonymized data be correlated across tools, which also means the key must be protected.',
    ],
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
    tradeoffs: [
      'A common collector with plugins supports new diagnostic sources without separate tools, but plugins need compatibility rules and failure handling so one broken plugin does not stop collection.',
    ],
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
