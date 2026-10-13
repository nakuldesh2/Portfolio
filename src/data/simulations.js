/**
 * Project Simulations - step-by-step animated walkthroughs
 *
 * Rendered by src/components/Simulation.jsx on a 1000x520 canvas.
 * - nodes: { id, label, sub?, kind, x, y, rejected? }  (x/y = node centre)
 * - edges: { from, to, label?, dashed? }
 * - steps: { title, body, active?: [nodeId], flows?: [[from, to, tone?]], metric?: { value, label } }
 *   tone: 'normal' | 'warn' | 'bad'
 *
 * Every fact here comes from src/data/knowledgeBase.js / projects.js - keep them in sync.
 */

export const simulations = {
  'scrutinizer-migration': {
    nodes: [
      { id: 'tenants', label: 'CAS Tenants', sub: '2,500+ enterprises', kind: 'source', x: 100, y: 260 },
      { id: 'cas', label: 'CAS Upload', sub: 'Content Asset Service', kind: 'compute', x: 290, y: 260 },
      { id: 'router', label: 'Weighted Router', sub: 'Evidently experiment', kind: 'check', x: 490, y: 260 },
      { id: 'swf', label: 'Legacy SWF Scan', sub: 'old workflow', kind: 'compute', x: 700, y: 100 },
      { id: 'orca', label: 'ORCA Orchestrator', sub: 'Lambda · SQS', kind: 'compute', x: 700, y: 420 },
      { id: 'state', label: 'Scan State', sub: 'DynamoDB · idempotency', kind: 'storage', x: 490, y: 420 },
      { id: 'scrutinizer', label: 'Scrutinizer', sub: '5+ scan engines', kind: 'compute', x: 900, y: 420 },
      { id: 'sns', label: 'Scan Verdicts', sub: 'SNS', kind: 'queue', x: 900, y: 260 },
      { id: 'compare', label: 'Shadow Compare', sub: 'latency · errors · accuracy', kind: 'monitor', x: 900, y: 100 },
    ],
    edges: [
      { from: 'tenants', to: 'cas' },
      { from: 'cas', to: 'router' },
      { from: 'router', to: 'swf', label: 'control' },
      { from: 'router', to: 'orca', label: 'treatment' },
      { from: 'orca', to: 'state' },
      { from: 'orca', to: 'scrutinizer' },
      { from: 'scrutinizer', to: 'sns' },
      { from: 'sns', to: 'compare' },
      { from: 'swf', to: 'compare' },
    ],
    steps: [
      {
        title: 'Every upload scanned by a legacy workflow',
        body: 'All content uploaded to CAS, a Tier-1 service, was malware-scanned by a legacy SWF-based workflow. 2,500+ enterprise tenants depended on it, so the move to the central Scrutinizer platform had to be invisible to them.',
        flows: [['tenants', 'cas'], ['cas', 'router'], ['router', 'swf']],
        metric: { value: '2,500+', label: 'tenants on the legacy path' },
      },
      {
        title: 'Build a new async path with ORCA',
        body: 'ORCA is a Lambda + SQS orchestration layer built to replace SWF. State checks in DynamoDB make every step idempotent; transient failures retry with exponential backoff and persistent ones go to a dead-letter queue.',
        flows: [['router', 'orca'], ['orca', 'state'], ['orca', 'scrutinizer']],
      },
      {
        title: 'Run both paths in shadow mode',
        body: 'Real traffic flows through both paths. The legacy verdict stays authoritative while Scrutinizer verdicts are compared side by side on latency, error rate and scan accuracy, validating the new path in production with no customer risk.',
        flows: [['router', 'swf'], ['router', 'orca'], ['orca', 'scrutinizer'], ['scrutinizer', 'sns'], ['sns', 'compare'], ['swf', 'compare']],
      },
      {
        title: 'Shift traffic gradually',
        body: 'Weighted routing moves a growing share of tenants to the new path. Rollback is kept available at every stage: flipping the weight sends traffic back to SWF instantly, keeping the blast radius small.',
        flows: [['router', 'swf', 'warn'], ['router', 'orca'], ['orca', 'scrutinizer'], ['scrutinizer', 'sns']],
        metric: { value: 'Rollback', label: 'kept available at every stage' },
      },
      {
        title: 'Cut over: faster and safer',
        body: 'All 2,500+ tenants now scan through Scrutinizer with zero downtime and zero customer-facing incidents, and scan latency dropped from 1.4s to 900ms.',
        flows: [['tenants', 'cas'], ['cas', 'router'], ['router', 'orca'], ['orca', 'scrutinizer'], ['scrutinizer', 'sns']],
        metric: { value: '1.4s → 900ms', label: '35% lower scan latency' },
      },
    ],
  },

  smartscanner: {
    nodes: [
      { id: 'upload', label: 'File Upload', sub: 'incoming asset', kind: 'source', x: 100, y: 280 },
      { id: 'features', label: 'Feature Extractor', sub: 'size · MIME · asset type', kind: 'compute', x: 290, y: 280 },
      { id: 'model', label: 'Random Forest', sub: 'SageMaker', kind: 'compute', x: 490, y: 280 },
      { id: 'gate', label: 'Confidence Gate', sub: 'ML only optimises', kind: 'check', x: 690, y: 280 },
      { id: 'fallback', label: 'Safe Default Route', sub: 'low-confidence cases', kind: 'check', x: 690, y: 450 },
      { id: 'scanners', label: 'Scanner Pool', sub: 'final verdict', kind: 'compute', x: 900, y: 280 },
      { id: 'history', label: 'Scan History', sub: '24M+ events', kind: 'storage', x: 900, y: 90 },
      { id: 'train', label: 'Retraining', sub: 'feedback loop', kind: 'compute', x: 490, y: 90 },
    ],
    edges: [
      { from: 'upload', to: 'features' },
      { from: 'features', to: 'model' },
      { from: 'model', to: 'gate' },
      { from: 'gate', to: 'scanners' },
      { from: 'gate', to: 'fallback', label: 'unsure' },
      { from: 'fallback', to: 'scanners' },
      { from: 'scanners', to: 'history', label: 'outcomes' },
      { from: 'history', to: 'train' },
      { from: 'train', to: 'model', label: 'deploy' },
    ],
    steps: [
      {
        title: 'Learn from history',
        body: 'Several malware scanners each have different performance profiles. A Random Forest model is trained on 24M+ historical scan events to learn which scanner performs best for which kind of file.',
        flows: [['history', 'train'], ['train', 'model']],
        metric: { value: '24M+', label: 'historical scan events' },
      },
      {
        title: 'Extract features at upload time',
        body: 'When a file arrives, cheap features are extracted: file size, MIME type, asset type and recent scanner performance.',
        flows: [['upload', 'features'], ['features', 'model']],
      },
      {
        title: 'Predict the best scanner',
        body: 'The model predicts the optimal scanner for this file, routing work to the engine most likely to handle it fastest.',
        flows: [['features', 'model'], ['model', 'gate']],
        metric: { value: '78.5%', label: 'prediction accuracy' },
      },
      {
        title: 'Safety gate: AI optimises, never decides',
        body: 'Confident predictions are routed to the chosen scanner; low-confidence cases fall back to a safe default. The final malware verdict always comes from the security scanners, never from the model.',
        flows: [['gate', 'scanners'], ['gate', 'fallback', 'warn'], ['fallback', 'scanners', 'warn']],
      },
      {
        title: 'Close the feedback loop',
        body: 'Actual scan outcomes are fed back as training data and the model is retrained, which prevents drift as file mixes and scanner performance change.',
        flows: [['scanners', 'history'], ['history', 'train'], ['train', 'model']],
        metric: { value: '23.4%', label: 'performance improvement' },
      },
    ],
  },

  'ai-onboarding-agent': {
    nodes: [
      { id: 'ticket', label: 'Onboarding Ticket', sub: '20–30 per day', kind: 'source', x: 100, y: 260 },
      { id: 'kb', label: 'Past Tickets', sub: 'RAG retrieval', kind: 'storage', x: 300, y: 90 },
      { id: 'agent', label: 'Bedrock LLM', sub: 'interprets request', kind: 'compute', x: 300, y: 260 },
      { id: 'validator', label: 'Deterministic Checks', sub: 'authoritative', kind: 'check', x: 510, y: 260 },
      { id: 'human', label: 'Human Review', sub: 'high-risk / edge cases', kind: 'consumer', x: 510, y: 440 },
      { id: 'workflow', label: 'Onboarding Workflow', sub: 'scoped IAM', kind: 'compute', x: 720, y: 260 },
      { id: 'config', label: 'Tenant Config', sub: 'DynamoDB', kind: 'storage', x: 900, y: 400 },
      { id: 'slack', label: 'Slack Updates', sub: 'status to requester', kind: 'consumer', x: 900, y: 120 },
    ],
    edges: [
      { from: 'ticket', to: 'agent' },
      { from: 'kb', to: 'agent', label: 'similar tickets' },
      { from: 'agent', to: 'validator' },
      { from: 'validator', to: 'workflow' },
      { from: 'validator', to: 'human', label: 'needs review' },
      { from: 'human', to: 'workflow', dashed: true },
      { from: 'workflow', to: 'config' },
      { from: 'workflow', to: 'slack' },
    ],
    steps: [
      {
        title: 'Tickets piled up for support engineers',
        body: 'Support engineers were manually processing 20–30 Scrutinizer onboarding tickets a day: reading free-text requests, checking details and running the onboarding steps by hand.',
        flows: [['ticket', 'agent']],
        metric: { value: '20–30', label: 'tickets per day, manually' },
      },
      {
        title: 'Ground the LLM with similar tickets',
        body: 'Before interpreting a ticket, the agent retrieves similar historical tickets. RAG grounds the model in how real requests were handled and reduces hallucination.',
        flows: [['kb', 'agent'], ['ticket', 'agent']],
      },
      {
        title: 'LLM interprets, nothing more',
        body: 'Amazon Bedrock extracts structured requirements from the ticket. The AI only interprets; it has no authority to change anything on its own.',
        flows: [['agent', 'validator']],
      },
      {
        title: 'Deterministic validation decides',
        body: 'Rule-based checks verify every required field. Valid requests proceed to the approved workflow; anything missing or high-risk goes to a human for approval.',
        flows: [['validator', 'workflow'], ['validator', 'human', 'warn'], ['human', 'workflow', 'warn']],
        metric: { value: 'AI ≠ authority', label: 'validation is the security boundary' },
      },
      {
        title: 'Execute with scoped permissions',
        body: 'The approved workflow runs with narrowly scoped IAM, writes tenant config and posts status to Slack. After a new customer sent 10K files right after onboarding and briefly hit throttling, volume (TPS) safeguards were added to validation.',
        flows: [['workflow', 'config'], ['workflow', 'slack']],
      },
    ],
  },

  'deletion-handler': {
    nodes: [
      { id: 'table', label: 'DynamoDB Table', sub: 'production · 9B stale records', kind: 'storage', x: 100, y: 260 },
      { id: 'lifecycle', label: 'S3 Lifecycle Rules', sub: 'first idea, rejected', kind: 'check', x: 300, y: 90, rejected: true },
      { id: 'export', label: 'DynamoDB Export', sub: 'snapshot to S3', kind: 'compute', x: 300, y: 260 },
      { id: 'filter', label: 'Filter + Manifest', sub: 'decommissioned types only', kind: 'check', x: 500, y: 260 },
      { id: 'queue', label: 'SQS Work Queue', sub: 'deletion manifest', kind: 'queue', x: 700, y: 260 },
      { id: 'workers', label: 'Lambda Workers', sub: 'bounded concurrency', kind: 'compute', x: 900, y: 260 },
      { id: 'api', label: 'Existing Delete API', sub: 'trusted business logic', kind: 'compute', x: 700, y: 440 },
      { id: 'glacier', label: 'Glacier Retention', sub: '18-month recovery', kind: 'storage', x: 400, y: 440 },
      { id: 'alarms', label: 'Monitoring & Alarms', sub: 'CloudWatch', kind: 'monitor', x: 900, y: 90 },
    ],
    edges: [
      { from: 'table', to: 'export' },
      { from: 'export', to: 'filter' },
      { from: 'filter', to: 'queue' },
      { from: 'queue', to: 'workers' },
      { from: 'workers', to: 'api' },
      { from: 'api', to: 'glacier', label: 'retain' },
      { from: 'workers', to: 'alarms', label: 'metrics' },
    ],
    steps: [
      {
        title: 'Reject the easy answer',
        body: 'The first design used S3 Lifecycle policies. It was rejected: too little control, asynchronous behaviour that is hard to observe, and an unacceptable blast radius if a rule matched the wrong data.',
        active: ['lifecycle'],
      },
      {
        title: 'Export instead of scanning production',
        body: 'The table is exported to S3 with DynamoDB Export, so finding stale records happens on a snapshot rather than with read load against the live Tier-1 table.',
        flows: [['table', 'export'], ['export', 'filter']],
        metric: { value: '9B', label: 'records to evaluate' },
      },
      {
        title: 'Filter and build a manifest',
        body: 'Only records belonging to decommissioned asset types are selected, and an explicit deletion manifest is written to an SQS work queue, so every deletion is known up front.',
        flows: [['filter', 'queue']],
      },
      {
        title: 'Delete through the trusted API, slowly enough',
        body: 'Lambda workers drain the queue with bounded concurrency to protect production traffic, and call the existing deletion API so the same well-tested business logic is reused.',
        flows: [['queue', 'workers'], ['workers', 'api']],
      },
      {
        title: 'Safety nets: retention and monitoring',
        body: 'Deleted data is retained in Glacier for 18 months for recovery, and the pipeline is fully monitored. Result: 17 PB cleaned within the 5-day SLA with zero errors and zero unintended deletions.',
        flows: [['api', 'glacier'], ['workers', 'alarms']],
        metric: { value: '17 PB', label: 'cleaned in 5 days, zero errors' },
      },
    ],
  },

  'sftp-modernization': {
    nodes: [
      { id: 'users', label: 'Vendor Users', sub: '2,784 users · 10 groups', kind: 'source', x: 100, y: 260 },
      { id: 'dns', label: 'Route 53', sub: 'weighted · low TTL', kind: 'check', x: 290, y: 260 },
      { id: 'legacy', label: 'Legacy SFTP Host', sub: 'username / password', kind: 'compute', x: 500, y: 90 },
      { id: 'transfer', label: 'AWS Transfer Family', sub: 'managed SFTP', kind: 'compute', x: 500, y: 330 },
      { id: 'auth', label: 'Auth Lambda', sub: 'validates login', kind: 'compute', x: 710, y: 330 },
      { id: 'cognito', label: 'Cognito + OIDC', sub: 'who are you?', kind: 'check', x: 900, y: 200 },
      { id: 'mapping', label: 'User → Path Map', sub: 'what can you access?', kind: 'storage', x: 900, y: 450 },
      { id: 's3', label: 'S3 Storage', sub: 'scoped home dirs', kind: 'storage', x: 500, y: 470 },
    ],
    edges: [
      { from: 'users', to: 'dns' },
      { from: 'dns', to: 'legacy', label: 'old' },
      { from: 'dns', to: 'transfer', label: 'new' },
      { from: 'transfer', to: 'auth' },
      { from: 'auth', to: 'cognito', label: 'authenticate' },
      { from: 'auth', to: 'mapping', label: 'authorize' },
      { from: 'transfer', to: 's3' },
    ],
    steps: [
      {
        title: 'Host-based passwords had to go',
        body: '2,784 vendor users across 10 groups uploaded through a legacy SFTP host with username/password credentials. Security required moving to modern federated identity without breaking any vendor.',
        flows: [['users', 'dns'], ['dns', 'legacy', 'warn']],
        metric: { value: '2,784', label: 'users to migrate' },
      },
      {
        title: 'Stand up the new path in parallel',
        body: 'AWS Transfer Family provides a managed SFTP endpoint alongside the old host. Both systems run at once, so nothing is switched off until the new one is proven.',
        flows: [['dns', 'transfer'], ['transfer', 'auth']],
      },
      {
        title: 'Authentication: who are you?',
        body: 'A Lambda validates each login against Amazon Cognito federated over OpenID Connect, enabling MFA and modern identity instead of shared passwords.',
        flows: [['transfer', 'auth'], ['auth', 'cognito']],
      },
      {
        title: 'Authorization: what can you access?',
        body: 'Authentication is kept separate from authorization: a DynamoDB mapping scopes each user to their own S3 paths. Being logged in never implies unrestricted access.',
        flows: [['auth', 'mapping'], ['transfer', 's3']],
      },
      {
        title: 'Shift users with weighted DNS',
        body: 'Route 53 weighted routing moves users progressively to the new endpoint, with reduced TTLs so a rollback takes effect fast. All 2,784 users were migrated with zero downtime.',
        flows: [['users', 'dns'], ['dns', 'transfer'], ['dns', 'legacy', 'warn'], ['transfer', 'auth']],
        metric: { value: 'Zero', label: 'downtime during migration' },
      },
    ],
  },

  'synthetic-canary': {
    nodes: [
      { id: 'schedule', label: 'Scheduler', sub: 'periodic trigger', kind: 'source', x: 100, y: 260 },
      { id: 'canary', label: 'Canary Lambda', sub: 'acts like a customer', kind: 'compute', x: 290, y: 260 },
      { id: 'upload', label: 'Upload API', sub: 'many sizes & types', kind: 'compute', x: 500, y: 100 },
      { id: 'platform', label: 'CAS Processing', sub: 'the real pipeline', kind: 'compute', x: 720, y: 100 },
      { id: 'download', label: 'Download API', sub: 'fetch result', kind: 'compute', x: 500, y: 420 },
      { id: 'metrics', label: 'CloudWatch Metrics', sub: 'latency · errors · success', kind: 'monitor', x: 720, y: 420 },
      { id: 'alarm', label: 'Alarm → On-call', sub: 'before customers notice', kind: 'monitor', x: 910, y: 260 },
    ],
    edges: [
      { from: 'schedule', to: 'canary' },
      { from: 'canary', to: 'upload' },
      { from: 'upload', to: 'platform' },
      { from: 'platform', to: 'download' },
      { from: 'download', to: 'canary' },
      { from: 'canary', to: 'metrics', label: 'emit' },
      { from: 'metrics', to: 'alarm' },
    ],
    steps: [
      {
        title: 'Healthy components ≠ healthy workflows',
        body: 'Every service dashboard can be green while a real customer workflow is broken. The fix: continuously run the same workflow a customer would, end to end.',
        active: ['upload', 'platform', 'download'],
      },
      {
        title: 'Trigger a synthetic customer',
        body: 'On a schedule, a canary Lambda starts a synthetic run that behaves exactly like a customer of the platform.',
        flows: [['schedule', 'canary']],
      },
      {
        title: 'Upload real test assets',
        body: 'The canary uploads test assets of multiple file sizes and types through the public upload endpoint and they go through the real processing pipeline.',
        flows: [['canary', 'upload'], ['upload', 'platform']],
      },
      {
        title: 'Download and verify the result',
        body: 'It then downloads the processed result through the download endpoint, proving the full round trip works, not just individual components.',
        flows: [['platform', 'download'], ['download', 'canary']],
      },
      {
        title: 'Measure and alert early',
        body: 'Latency, errors and success rates are published as an aggregated health signal with alarms on it. The canary caught performance regressions and workflow issues before they reached production customers.',
        flows: [['canary', 'metrics'], ['metrics', 'alarm', 'warn']],
        metric: { value: 'Early warning', label: 'regressions caught before customers' },
      },
    ],
  },

  'website-modernization': {
    nodes: [
      { id: 'users', label: 'Internal Users', sub: 'want fewer steps', kind: 'source', x: 100, y: 260 },
      { id: 'ui', label: 'React UI', sub: 'simple flow', kind: 'consumer', x: 300, y: 260 },
      { id: 'api', label: 'Spring Boot API', sub: 'REST', kind: 'compute', x: 510, y: 260 },
      { id: 'validation', label: 'Server-side Rules', sub: 'all validation here', kind: 'check', x: 720, y: 120 },
      { id: 'db', label: 'DynamoDB', sub: 'records', kind: 'storage', x: 720, y: 400 },
      { id: 'team', label: 'Junior Engineers', sub: 'owned modules', kind: 'consumer', x: 910, y: 260 },
    ],
    edges: [
      { from: 'users', to: 'ui' },
      { from: 'ui', to: 'api' },
      { from: 'api', to: 'validation' },
      { from: 'api', to: 'db' },
      { from: 'team', to: 'validation', dashed: true },
      { from: 'team', to: 'db', dashed: true },
    ],
    steps: [
      {
        title: 'Conflicting goals',
        body: 'UX wanted fewer steps, security wanted stronger checks, and the service needed consistent behaviour regardless of which client called it.',
        active: ['ui', 'validation'],
      },
      {
        title: 'Keep the UI simple',
        body: 'The React frontend presents a short, simple flow and calls a Spring Boot REST API, with no security logic in the browser.',
        flows: [['users', 'ui'], ['ui', 'api']],
      },
      {
        title: 'Enforce everything on the backend',
        body: 'All validation lives server-side, so security requirements hold for every caller independent of the UI. Failures come back as clear, actionable error messages.',
        flows: [['api', 'validation'], ['api', 'ui', 'warn']],
        metric: { value: 'Backend', label: 'is the single source of truth' },
      },
      {
        title: 'Persist consistently',
        body: 'Only validated requests are written to DynamoDB, giving consistent behaviour no matter how the request arrived.',
        flows: [['api', 'db']],
      },
      {
        title: 'Grow the team, not a bottleneck',
        body: 'The work was split into modules owned by junior engineers, with architecture and business context explained up front, weekly design reviews, and juniors included in stakeholder discussions.',
        flows: [['team', 'validation'], ['team', 'db']],
      },
    ],
  },

  'das-cas-compatibility': {
    nodes: [
      { id: 'clients', label: 'Clients', sub: 'no changes required', kind: 'source', x: 100, y: 260 },
      { id: 'cas', label: 'CAS API', sub: 'reads & writes', kind: 'compute', x: 290, y: 260 },
      { id: 'check', label: 'Asset Source?', sub: 'checked on every read', kind: 'check', x: 500, y: 260 },
      { id: 'casStore', label: 'CAS Storage', sub: 'all new content', kind: 'storage', x: 720, y: 110 },
      { id: 'parser', label: 'Instruction Parser', sub: 'legacy format', kind: 'compute', x: 720, y: 410 },
      { id: 'das', label: 'DAS Content', sub: 'historical assets', kind: 'storage', x: 910, y: 410 },
    ],
    edges: [
      { from: 'clients', to: 'cas' },
      { from: 'cas', to: 'check', label: 'read' },
      { from: 'cas', to: 'casStore', label: 'write' },
      { from: 'check', to: 'casStore', label: 'CAS-native' },
      { from: 'check', to: 'parser', label: 'legacy' },
      { from: 'parser', to: 'das' },
    ],
    steps: [
      {
        title: 'Retire DAS without breaking reads',
        body: 'The legacy Digital Asset System (DAS) was being retired, but customers still had historical content stored there that had to stay readable.',
        active: ['clients', 'das'],
      },
      {
        title: 'All new writes go to CAS',
        body: 'From day one, every new write lands in CAS. DAS stops growing, so the migration surface only shrinks.',
        flows: [['clients', 'cas'], ['cas', 'casStore']],
      },
      {
        title: 'Every read checks the asset source',
        body: 'On read, CAS determines where the asset originally lives, so read and write paths can temporarily diverge without clients knowing.',
        flows: [['clients', 'cas'], ['cas', 'check']],
      },
      {
        title: 'CAS-native assets: normal path',
        body: 'Assets that live in CAS are served through the standard read path with no extra cost.',
        flows: [['check', 'casStore']],
      },
      {
        title: 'Legacy assets: translate and serve',
        body: 'For DAS assets, CAS parses the legacy instruction file and serves the content itself. The platform absorbs the compatibility complexity instead of forcing every client to change.',
        flows: [['check', 'parser', 'warn'], ['parser', 'das', 'warn']],
        metric: { value: '0', label: 'client changes required' },
      },
    ],
  },

  'newsstand-onboarding': {
    nodes: [
      { id: 'newsstand', label: 'Newsstand Team', sub: 'content + device needs', kind: 'source', x: 100, y: 260 },
      { id: 'config', label: 'CAS Configuration', sub: 'derivations · dimensions', kind: 'check', x: 300, y: 110 },
      { id: 'ingest', label: 'CAS Ingest', sub: 'Newsstand images', kind: 'compute', x: 300, y: 410 },
      { id: 'derive', label: 'Derivation Engine', sub: 'per-device variants', kind: 'compute', x: 520, y: 260 },
      { id: 'store', label: 'CAS Storage', sub: 'derived images', kind: 'storage', x: 720, y: 260 },
      { id: 'kindle', label: 'Kindle Devices', sub: 'phased rollout', kind: 'consumer', x: 910, y: 260 },
    ],
    edges: [
      { from: 'newsstand', to: 'config', label: 'requirements' },
      { from: 'newsstand', to: 'ingest', label: 'content' },
      { from: 'config', to: 'derive', label: 'rules' },
      { from: 'ingest', to: 'derive' },
      { from: 'derive', to: 'store' },
      { from: 'store', to: 'kindle' },
    ],
    steps: [
      {
        title: 'Understand the partner first',
        body: 'Requirements were gathered with the Newsstand team: which content types they publish and what each Kindle device needs to display it well.',
        active: ['newsstand'],
        flows: [['newsstand', 'config']],
      },
      {
        title: 'Configure, don’t custom-build',
        body: 'Instead of building a one-off integration, CAS’s configuration-driven capabilities, derivations and dimensions, were used to express Newsstand’s needs.',
        flows: [['config', 'derive']],
      },
      {
        title: 'Ingest Newsstand content',
        body: 'Newsstand images flow into CAS through the standard ingest path, the same one every other tenant uses.',
        flows: [['newsstand', 'ingest'], ['ingest', 'derive']],
      },
      {
        title: 'Derive per-device images',
        body: 'CAS generates device-specific derivations of each image and stores them, so each device gets an asset sized for it.',
        flows: [['config', 'derive'], ['ingest', 'derive'], ['derive', 'store']],
      },
      {
        title: 'Phased rollout, validated on devices',
        body: 'Newsstand images were rolled out to Kindle devices in phases, with end-to-end ownership through validation on real devices.',
        flows: [['store', 'kindle']],
        metric: { value: 'Config', label: 'not custom code' },
      },
    ],
  },

  'risk-analytics': {
    nodes: [
      { id: 'ui', label: 'React Dashboard', sub: 'analysts', kind: 'consumer', x: 100, y: 260 },
      { id: 'api', label: 'Spring Boot API', sub: 'analytics service', kind: 'compute', x: 300, y: 260 },
      { id: 'cache', label: 'Aerospike Cache', sub: 'hot results', kind: 'storage', x: 520, y: 100 },
      { id: 'engine', label: 'Risk/Return Engine', sub: 'optimised queries', kind: 'compute', x: 520, y: 420 },
      { id: 'db', label: 'PostgreSQL', sub: 'financial data', kind: 'storage', x: 740, y: 420 },
      { id: 'assets', label: 'Asset Data', sub: '7,650+ assets', kind: 'source', x: 900, y: 260 },
    ],
    edges: [
      { from: 'ui', to: 'api' },
      { from: 'api', to: 'cache', label: 'lookup' },
      { from: 'api', to: 'engine', label: 'miss' },
      { from: 'engine', to: 'db' },
      { from: 'engine', to: 'cache', label: 'populate' },
      { from: 'assets', to: 'db', label: 'ingest' },
    ],
    steps: [
      {
        title: 'Financial data for thousands of assets',
        body: 'The platform computes risk/return analytics over a large financial dataset stored in PostgreSQL.',
        flows: [['assets', 'db']],
        metric: { value: '7,650+', label: 'financial assets served' },
      },
      {
        title: 'An analyst asks a question',
        body: 'The React dashboard calls the Spring Boot analytics API for risk/return figures.',
        flows: [['ui', 'api']],
      },
      {
        title: 'Cache hit: the fast path',
        body: 'Frequently requested results are served straight from Aerospike, skipping the expensive computation entirely.',
        flows: [['api', 'cache'], ['api', 'ui']],
        metric: { value: '25%', label: 'lower API latency' },
      },
      {
        title: 'Cache miss: compute and populate',
        body: 'On a miss, the analytics engine runs optimised queries against PostgreSQL and writes the result back to the cache for the next request.',
        flows: [['api', 'engine'], ['engine', 'db'], ['engine', 'cache']],
      },
      {
        title: 'Fast answers at the tail',
        body: 'Caching plus query optimisation kept even slow requests fast for the people using the dashboard.',
        flows: [['ui', 'api'], ['api', 'cache'], ['api', 'ui']],
        metric: { value: 'P90 < 5s', label: 'analytics latency' },
      },
    ],
  },
}

export default simulations
