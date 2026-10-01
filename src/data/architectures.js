/**
 * System Architecture Diagrams for all Projects
 * Each diagram contains nodes (components) and connections (data flow)
 */

export const architectures = {
  'scrutinizer-migration': {
    title: 'Tier-1 Malware Scanning Migration',
    width: 1200,
    height: 400,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'Legacy SWF', color: '#8B5A3C', icon: '📦', description: 'Old scanning\nworkflow' },
      { x: 200, y: 50, width: 100, height: 80, label: 'ORCA', color: '#3B82F6', icon: '🎼', description: 'New orchestrator\nlayer' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Scrutinizer', color: '#10B981', icon: '🔍', description: 'Centralized\nscanning' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Multiple\nScanners', color: '#F59E0B', icon: '🛡️', description: '5+ scanning\nengines' },
      { x: 200, y: 200, width: 120, height: 80, label: 'Shadow Mode', color: '#8B5CF6', icon: '👻', description: 'Parallel\nvalidation' },
      { x: 450, y: 200, width: 120, height: 80, label: 'Gradual\nRollout', color: '#EC4899', icon: '📊', description: 'Traffic shift\ncontrol' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: '35% faster' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Replaces' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Uses all' },
      { x1: 250, y1: 130, x2: 250, y2: 200, label: 'Validate', dashed: true },
      { x1: 510, y1: 130, x2: 510, y2: 200, label: 'Control', dashed: true },
    ],
    legend: [
      { color: '#8B5A3C', label: 'Legacy Systems' },
      { color: '#3B82F6', label: 'New Components' },
      { color: '#10B981', label: 'Platform Services' },
      { color: '#F59E0B', label: 'External Services' },
    ],
  },

  'smartscanner': {
    title: 'SmartScanner - AI/ML Architecture',
    width: 1200,
    height: 500,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'File Upload', color: '#3B82F6', icon: '📤', description: 'Customer\nupload' },
      { x: 200, y: 50, width: 100, height: 80, label: 'Feature\nExtraction', color: '#8B5CF6', icon: '🔧', description: 'Size, MIME,\ntype, etc' },
      { x: 350, y: 50, width: 100, height: 80, label: 'ML Model', color: '#EC4899', icon: '🧠', description: '78.5%\naccuracy' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Decision\nEngine', color: '#F59E0B', icon: '⚙️', description: 'Route to\nscanner' },
      { x: 650, y: 50, width: 100, height: 80, label: 'Scanner\nExecution', color: '#10B981', icon: '🛡️', description: 'CLAMAV\nCLOUDONE' },
      { x: 350, y: 200, width: 120, height: 80, label: 'Feedback\nLoop', color: '#06B6D4', icon: '🔄', description: 'Real-time\nlearning' },
      { x: 200, y: 320, width: 120, height: 80, label: 'Model\nTraining', color: '#6366F1', icon: '📈', description: 'Continuous\nimprovement' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Extract' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Predict' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Route' },
      { x1: 600, y1: 90, x2: 650, y2: 90, label: 'Scan' },
      { x1: 410, y1: 130, x2: 410, y2: 200, label: 'Capture', dashed: true },
      { x1: 350, y1: 280, x2: 350, y2: 320, label: 'Retrain', dashed: true },
    ],
    legend: [
      { color: '#3B82F6', label: 'Input' },
      { color: '#8B5CF6', label: 'Processing' },
      { color: '#EC4899', label: 'ML' },
      { color: '#10B981', label: 'Execution' },
      { color: '#06B6D4', label: 'Feedback' },
    ],
  },

  'deletion-handler': {
    title: 'Large-Scale Data Deletion Pipeline',
    width: 1200,
    height: 400,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'DynamoDB\nExport', color: '#3B82F6', icon: '💾', description: '9B records\nexport' },
      { x: 200, y: 50, width: 100, height: 80, label: 'Filter &\nValidate', color: '#8B5CF6', icon: '🔍', description: 'Decommissioned\nassets' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Deletion\nManifest', color: '#EC4899', icon: '📋', description: 'Approved\nrecords' },
      { x: 500, y: 50, width: 100, height: 80, label: 'SQS\nQueue', color: '#F59E0B', icon: '📦', description: 'Async\nprocessing' },
      { x: 650, y: 50, width: 100, height: 80, label: 'Lambda\nWorkers', color: '#10B981', icon: '⚡', description: 'Bounded\nconcurrency' },
      { x: 800, y: 50, width: 100, height: 80, label: 'Deletion\nAPI', color: '#06B6D4', icon: '🗑️', description: 'Trusted\nlogic' },
      { x: 350, y: 200, width: 120, height: 80, label: 'Glacier\nRetention', color: '#8B5CF6', icon: '❄️', description: '18 months\nrecovery' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Filter' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Manifest' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Queue' },
      { x1: 600, y1: 90, x2: 650, y2: 90, label: 'Invoke' },
      { x1: 750, y1: 90, x2: 800, y2: 90, label: 'Delete' },
      { x1: 410, y1: 130, x2: 410, y2: 200, label: 'Archive', dashed: true },
    ],
    legend: [
      { color: '#3B82F6', label: 'Data Source' },
      { color: '#EC4899', label: 'Processing' },
      { color: '#F59E0B', label: 'Queue' },
      { color: '#10B981', label: 'Compute' },
      { color: '#8B5CF6', label: 'Storage' },
    ],
  },

  'sftp-modernization': {
    title: 'SFTP Identity Modernization',
    width: 1200,
    height: 450,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'Partner\nUser', color: '#3B82F6', icon: '👤', description: '2,784 users\nmigrated' },
      { x: 200, y: 50, width: 100, height: 80, label: 'AWS Transfer\nFamily', color: '#F59E0B', icon: '📤', description: 'SFTP\nendpoint' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Cognito\nAuth', color: '#EC4899', icon: '🔐', description: 'Federation\nflow' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Lambda\nValidator', color: '#10B981', icon: '⚙️', description: 'Auth\nlogic' },
      { x: 200, y: 200, width: 100, height: 80, label: 'Route53\nWeighted', color: '#8B5CF6', icon: '🎯', description: 'Gradual\nshift' },
      { x: 450, y: 200, width: 100, height: 80, label: 'DynamoDB\nMapping', color: '#06B6D4', icon: '🗂️', description: 'User access\nmapping' },
      { x: 650, y: 50, width: 100, height: 80, label: 'S3\nStorage', color: '#10B981', icon: '💾', description: 'User\ndata' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Connect' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Auth' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Validate' },
      { x1: 250, y1: 130, x2: 250, y2: 200, label: 'Gradual\nrollout', dashed: true },
      { x1: 550, y1: 130, x2: 550, y2: 200, label: 'Access\ncontrol', dashed: true },
      { x1: 600, y1: 90, x2: 650, y2: 90, label: 'File ops' },
    ],
    legend: [
      { color: '#3B82F6', label: 'Users' },
      { color: '#F59E0B', label: 'Entry Point' },
      { color: '#EC4899', label: 'Auth' },
      { color: '#10B981', label: 'Processing' },
      { color: '#06B6D4', label: 'Storage' },
    ],
  },

  'ai-onboarding-agent': {
    title: 'AI-Assisted Onboarding Agent',
    width: 1200,
    height: 400,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'Ticket\nSystem', color: '#3B82F6', icon: '🎫', description: 'Customer\ntickets' },
      { x: 200, y: 50, width: 100, height: 80, label: 'RAG\nRetrieval', color: '#8B5CF6', icon: '📚', description: 'Historical\ntickets' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Bedrock\nLLM', color: '#EC4899', icon: '🧠', description: 'AI\nreasoning' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Deterministic\nValidation', color: '#F59E0B', icon: '✓', description: 'Schema\ncheck' },
      { x: 650, y: 50, width: 100, height: 80, label: 'Onboarding\nWorkflow', color: '#10B981', icon: '⚙️', description: 'Trusted\npath' },
      { x: 200, y: 200, width: 120, height: 80, label: 'Human\nOversight', color: '#06B6D4', icon: '👀', description: 'Edge cases\nreview' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Search' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Context' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Interpret' },
      { x1: 550, y1: 90, x2: 650, y2: 90, label: 'Execute' },
      { x1: 250, y1: 130, x2: 250, y2: 200, label: 'Ambiguous', dashed: true },
    ],
    legend: [
      { color: '#3B82F6', label: 'Input' },
      { color: '#8B5CF6', label: 'RAG' },
      { color: '#EC4899', label: 'LLM' },
      { color: '#F59E0B', label: 'Validation' },
      { color: '#10B981', label: 'Execution' },
    ],
  },

  'website-modernization': {
    title: 'Website Modernization - Full Stack',
    width: 1200,
    height: 380,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'React\nUI', color: '#3B82F6', icon: '⚛️', description: 'Modern\nfrontend' },
      { x: 200, y: 50, width: 100, height: 80, label: 'REST\nAPI', color: '#8B5CF6', icon: '🔗', description: 'Backend\nendpoints' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Spring\nBoot', color: '#EC4899', icon: '🌱', description: 'Service\nlayer' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Business\nLogic', color: '#F59E0B', icon: '📊', description: 'Validation\nrules' },
      { x: 650, y: 50, width: 100, height: 80, label: 'DynamoDB', color: '#10B981', icon: '💾', description: 'Data\npersistence' },
      { x: 200, y: 200, width: 120, height: 80, label: 'Component\nLibrary', color: '#06B6D4', icon: '🧩', description: 'Reusable\ncomponents' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Calls' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'HTTP' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Process' },
      { x1: 600, y1: 90, x2: 650, y2: 90, label: 'Query' },
      { x1: 250, y1: 130, x2: 250, y2: 200, label: 'Exports', dashed: true },
    ],
    legend: [
      { color: '#3B82F6', label: 'Frontend' },
      { color: '#8B5CF6', label: 'API Layer' },
      { color: '#EC4899', label: 'Backend' },
      { color: '#F59E0B', label: 'Business' },
      { color: '#10B981', label: 'Database' },
    ],
  },

  'synthetic-canary': {
    title: 'Synthetic Canary Monitoring',
    width: 1200,
    height: 380,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'CloudWatch\nSchedule', color: '#3B82F6', icon: '⏰', description: 'Every 5\nminutes' },
      { x: 200, y: 50, width: 100, height: 80, label: 'Synthetic\nTest', color: '#8B5CF6', icon: '🧪', description: 'Upload &\ndownload' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Measure\nMetrics', color: '#EC4899', icon: '📊', description: 'Latency,\nerrors' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Alert\nSystem', color: '#F59E0B', icon: '🚨', description: 'PagerDuty\nSNS' },
      { x: 200, y: 200, width: 120, height: 80, label: 'Dashboard', color: '#10B981', icon: '📈', description: 'Real-time\nvisibility' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Trigger' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Execute' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Anomaly' },
      { x1: 250, y1: 130, x2: 250, y2: 200, label: 'Store', dashed: true },
    ],
    legend: [
      { color: '#3B82F6', label: 'Scheduling' },
      { color: '#8B5CF6', label: 'Testing' },
      { color: '#EC4899', label: 'Metrics' },
      { color: '#F59E0B', label: 'Alerting' },
      { color: '#10B981', label: 'Monitoring' },
    ],
  },

  'das-cas-compatibility': {
    title: 'DAS → CAS Compatibility Layer',
    width: 1200,
    height: 380,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'Client\nRequest', color: '#3B82F6', icon: '📨', description: 'Asset\nread' },
      { x: 200, y: 50, width: 100, height: 80, label: 'Detect\nSource', color: '#8B5CF6', icon: '🔍', description: 'CAS or\nDAS?' },
      { x: 350, y: 50, width: 100, height: 80, label: 'CAS Native\nPath', color: '#10B981', icon: '✓', description: 'Normal\nretrieval' },
      { x: 500, y: 50, width: 100, height: 80, label: 'DAS Legacy\nPath', color: '#F59E0B', icon: '⚠️', description: 'Compat\nlayer' },
      { x: 350, y: 200, width: 100, height: 80, label: 'Response', color: '#EC4899', icon: '📦', description: 'Same\ninterface' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Check' },
      { x1: 250, y1: 70, x2: 350, y2: 70, label: 'CAS' },
      { x1: 250, y1: 110, x2: 500, y2: 110, label: 'DAS' },
      { x1: 400, y1: 90, x2: 400, y2: 200, label: 'Both' },
      { x1: 350, y1: 130, x2: 350, y2: 200, label: 'Return' },
    ],
    legend: [
      { color: '#3B82F6', label: 'Client' },
      { color: '#8B5CF6', label: 'Detection' },
      { color: '#10B981', label: 'New Path' },
      { color: '#F59E0B', label: 'Legacy Path' },
      { color: '#EC4899', label: 'Response' },
    ],
  },

  'newsstand-onboarding': {
    title: 'Newsstand Integration with CAS',
    width: 1200,
    height: 380,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'Newsstand\nTeam', color: '#3B82F6', icon: '📰', description: 'Content\nupload' },
      { x: 200, y: 50, width: 100, height: 80, label: 'CAS\nAPI', color: '#8B5CF6', icon: '🔗', description: 'Unified\nplatform' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Asset\nConfig', color: '#EC4899', icon: '⚙️', description: 'Image\nderivatives' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Transform', color: '#F59E0B', icon: '🖼️', description: 'Generate\nvariants' },
      { x: 650, y: 50, width: 100, height: 80, label: 'Kindle\nDevices', color: '#10B981', icon: '📱', description: 'Device\nrendering' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Upload' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Store' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Config' },
      { x1: 600, y1: 90, x2: 650, y2: 90, label: 'Serve' },
    ],
    legend: [
      { color: '#3B82F6', label: 'Client' },
      { color: '#8B5CF6', label: 'Platform' },
      { color: '#EC4899', label: 'Config' },
      { color: '#F59E0B', label: 'Processing' },
      { color: '#10B981', label: 'Delivery' },
    ],
  },

  'risk-analytics': {
    title: 'Risk/Return Analytics Platform',
    width: 1200,
    height: 380,
    nodes: [
      { x: 50, y: 50, width: 100, height: 80, label: 'Financial\nData', color: '#3B82F6', icon: '📊', description: '7,650+\nassets' },
      { x: 200, y: 50, width: 100, height: 80, label: 'PostgreSQL', color: '#8B5CF6', icon: '🐘', description: 'Main DB' },
      { x: 350, y: 50, width: 100, height: 80, label: 'Aerospike\nCache', color: '#EC4899', icon: '⚡', description: '25%\nspeedup' },
      { x: 500, y: 50, width: 100, height: 80, label: 'Spring\nBoot API', color: '#F59E0B', icon: '🔗', description: 'Endpoints' },
      { x: 650, y: 50, width: 100, height: 80, label: 'React\nDashboard', color: '#10B981', icon: '📈', description: 'Real-time\ncharts' },
    ],
    connections: [
      { x1: 150, y1: 90, x2: 200, y2: 90, label: 'Store' },
      { x1: 300, y1: 90, x2: 350, y2: 90, label: 'Query' },
      { x1: 450, y1: 90, x2: 500, y2: 90, label: 'Cache' },
      { x1: 600, y1: 90, x2: 650, y2: 90, label: 'Fetch' },
    ],
    legend: [
      { color: '#3B82F6', label: 'Data' },
      { color: '#8B5CF6', label: 'Persistence' },
      { color: '#EC4899', label: 'Cache' },
      { color: '#F59E0B', label: 'Backend' },
      { color: '#10B981', label: 'Frontend' },
    ],
  },
}

export default architectures
