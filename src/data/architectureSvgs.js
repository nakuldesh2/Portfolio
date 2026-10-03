/**
 * Professional Architecture Diagrams as SVG strings
 * Each project gets a detailed, visually rich architecture diagram
 */

export const architectureSvgs = {
  'scrutinizer-migration': `
    <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="600" y="30" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">
        Tier-1 Malware Scanning Migration
      </text>
      <text x="600" y="55" font-size="14" text-anchor="middle" fill="#06B6D4">
        Moving 2,500+ Tenants from Legacy SWF to Scrutinizer with Zero Downtime
      </text>

      <!-- Step 1: Legacy System -->
      <g>
        <rect x="50" y="100" width="150" height="120" fill="#8B5A3C" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="125" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Legacy SWF</text>
        <text x="125" y="145" font-size="12" text-anchor="middle" fill="#ffffff">2,500 Tenants</text>
        <text x="125" y="165" font-size="12" text-anchor="middle" fill="#ffffff">Scanning Workflow</text>
        <text x="125" y="185" font-size="12" text-anchor="middle" fill="#ffffff">~1.4s latency</text>
      </g>

      <!-- Arrow 1 -->
      <path d="M 200 160 L 280 160" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
      <text x="240" y="150" font-size="12" fill="#06B6D4" font-weight="bold">35% faster</text>

      <!-- Step 2: ORCA Orchestrator -->
      <g>
        <rect x="280" y="100" width="150" height="120" fill="#3B82F6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="355" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">ORCA</text>
        <text x="355" y="145" font-size="12" text-anchor="middle" fill="#ffffff">Orchestrator</text>
        <text x="355" y="165" font-size="12" text-anchor="middle" fill="#ffffff">New Layer</text>
        <text x="355" y="185" font-size="12" text-anchor="middle" fill="#ffffff">900ms latency</text>
      </g>

      <!-- Arrow 2 -->
      <path d="M 430 160 L 510 160" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
      <text x="470" y="150" font-size="12" fill="#06B6D4" font-weight="bold">Replaces</text>

      <!-- Step 3: Scrutinizer -->
      <g>
        <rect x="510" y="100" width="150" height="120" fill="#10B981" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="585" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">Scrutinizer</text>
        <text x="585" y="145" font-size="12" text-anchor="middle" fill="#ffffff">Centralized</text>
        <text x="585" y="165" font-size="12" text-anchor="middle" fill="#ffffff">Scanning Platform</text>
        <text x="585" y="185" font-size="12" text-anchor="middle" fill="#ffffff">5+ Engines</text>
      </g>

      <!-- Arrow 3 -->
      <path d="M 660 160 L 740 160" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
      <text x="700" y="150" font-size="12" fill="#06B6D4" font-weight="bold">Routes to</text>

      <!-- Step 4: Multiple Scanners -->
      <g>
        <rect x="740" y="100" width="150" height="120" fill="#F59E0B" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="815" y="125" font-size="16" font-weight="bold" text-anchor="middle" fill="#ffffff">5+ Scanners</text>
        <text x="815" y="145" font-size="12" text-anchor="middle" fill="#ffffff">ClamAV</text>
        <text x="815" y="165" font-size="12" text-anchor="middle" fill="#ffffff">CloudOne</text>
        <text x="815" y="185" font-size="12" text-anchor="middle" fill="#ffffff">Trend Micro</text>
      </g>

      <!-- Shadow Mode (Bottom Left) -->
      <g>
        <rect x="50" y="300" width="180" height="100" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="140" y="325" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Shadow Mode</text>
        <text x="140" y="345" font-size="11" text-anchor="middle" fill="#ffffff">Parallel validation</text>
        <text x="140" y="365" font-size="11" text-anchor="middle" fill="#ffffff">without affecting users</text>
      </g>

      <!-- Arrow from ORCA to Shadow Mode -->
      <path d="M 355 220 L 140 300" stroke="#06B6D4" stroke-width="2" stroke-dasharray="5,5" fill="none" marker-end="url(#arrowhead)"/>
      <text x="220" y="255" font-size="11" fill="#06B6D4" font-weight="bold">Validate</text>

      <!-- Gradual Rollout (Bottom Right) -->
      <g>
        <rect x="520" y="300" width="180" height="100" fill="#EC4899" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="610" y="325" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Gradual Rollout</text>
        <text x="610" y="345" font-size="11" text-anchor="middle" fill="#ffffff">Traffic shifting</text>
        <text x="610" y="365" font-size="11" text-anchor="middle" fill="#ffffff">0% → 100%</text>
      </g>

      <!-- Arrow from Scrutinizer to Gradual Rollout -->
      <path d="M 585 220 L 610 300" stroke="#06B6D4" stroke-width="2" stroke-dasharray="5,5" fill="none" marker-end="url(#arrowhead)"/>
      <text x="630" y="255" font-size="11" fill="#06B6D4" font-weight="bold">Control</text>

      <!-- Key Metrics Box -->
      <g>
        <rect x="920" y="100" width="250" height="300" fill="#1F2937" stroke="#06B6D4" stroke-width="2" rx="8"/>
        <text x="1045" y="130" font-size="14" font-weight="bold" text-anchor="middle" fill="#06B6D4">Key Metrics</text>

        <text x="940" y="160" font-size="12" font-weight="bold" fill="#10B981">✓ Latency Improvement</text>
        <text x="950" y="180" font-size="11" fill="#ffffff">1.4s → 900ms (35% faster)</text>

        <text x="940" y="210" font-size="12" font-weight="bold" fill="#10B981">✓ Zero-Downtime Migration</text>
        <text x="950" y="230" font-size="11" fill="#ffffff">2,500+ enterprises migrated</text>
        <text x="950" y="248" font-size="11" fill="#ffffff">Zero customer incidents</text>

        <text x="940" y="278" font-size="12" font-weight="bold" fill="#10B981">✓ Operational Benefits</text>
        <text x="950" y="298" font-size="11" fill="#ffffff">Centralized management</text>
        <text x="950" y="316" font-size="11" fill="#ffffff">5+ scanning engines</text>
        <text x="950" y="334" font-size="11" fill="#ffffff">Better coverage</text>
      </g>

      <!-- Legend -->
      <g>
        <text x="50" y="480" font-size="12" font-weight="bold" fill="#06B6D4">Legend:</text>
        <rect x="50" y="495" width="15" height="15" fill="#8B5A3C"/>
        <text x="75" y="507" font-size="11" fill="#ffffff">Legacy Systems</text>

        <rect x="280" y="495" width="15" height="15" fill="#3B82F6"/>
        <text x="305" y="507" font-size="11" fill="#ffffff">New Components</text>

        <rect x="520" y="495" width="15" height="15" fill="#10B981"/>
        <text x="545" y="507" font-size="11" fill="#ffffff">Platform Services</text>

        <rect x="780" y="495" width="15" height="15" fill="#F59E0B"/>
        <text x="805" y="507" font-size="11" fill="#ffffff">External Services</text>
      </g>

      <defs>
        <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <polygon points="0 0, 12 6, 0 12" fill="#06B6D4"/>
        </marker>
      </defs>
    </svg>
  `,

  'smartscanner': `
    <svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="600" y="30" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">
        SmartScanner - AI/ML Intelligent Scanner Selection
      </text>
      <text x="600" y="55" font-size="14" text-anchor="middle" fill="#06B6D4">
        ML Model routes files to optimal scanners with 78.5% accuracy
      </text>

      <!-- Main Pipeline: File Upload → Feature Extraction → ML Model → Decision Engine → Scanner -->

      <!-- Step 1: File Upload -->
      <g>
        <rect x="30" y="100" width="140" height="100" fill="#3B82F6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="100" y="130" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">File Upload</text>
        <text x="100" y="150" font-size="11" text-anchor="middle" fill="#ffffff">Customer</text>
        <text x="100" y="168" font-size="11" text-anchor="middle" fill="#ffffff">Asset + Version</text>
      </g>

      <!-- Arrow -->
      <path d="M 170 150 L 230 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <!-- Step 2: Feature Extraction -->
      <g>
        <rect x="230" y="100" width="140" height="100" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="300" y="130" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Feature</text>
        <text x="300" y="150" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Extraction</text>
        <text x="300" y="170" font-size="10" text-anchor="middle" fill="#ffffff">Size, MIME, Type</text>
      </g>

      <!-- Arrow -->
      <path d="M 370 150 L 430 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <!-- Step 3: ML Model -->
      <g>
        <rect x="430" y="100" width="140" height="100" fill="#EC4899" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="500" y="130" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">ML Model</text>
        <text x="500" y="150" font-size="11" text-anchor="middle" fill="#ffffff">Random Forest</text>
        <text x="500" y="168" font-size="11" text-anchor="middle" fill="#ffffff">78.5% accuracy</text>
      </g>

      <!-- Arrow -->
      <path d="M 570 150 L 630 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <!-- Step 4: Decision Engine -->
      <g>
        <rect x="630" y="100" width="140" height="100" fill="#F59E0B" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="700" y="130" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Decision</text>
        <text x="700" y="150" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Engine</text>
        <text x="700" y="170" font-size="10" text-anchor="middle" fill="#ffffff">Route Decision</text>
      </g>

      <!-- Arrow -->
      <path d="M 770 150 L 830 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <!-- Step 5: Scanner Selection -->
      <g>
        <rect x="830" y="100" width="140" height="100" fill="#10B981" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="900" y="130" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Scanner</text>
        <text x="900" y="150" font-size="14" font-weight="bold" text-anchor="middle" fill="#ffffff">Execution</text>
        <text x="900" y="170" font-size="10" text-anchor="middle" fill="#ffffff">CLAMAV/CloudOne</text>
      </g>

      <!-- Feedback Loop Section -->
      <g>
        <rect x="30" y="280" width="940" height="200" fill="none" stroke="#06B6D4" stroke-width="2" stroke-dasharray="5,5" rx="8"/>
        <text x="500" y="305" font-size="13" font-weight="bold" text-anchor="middle" fill="#06B6D4">FEEDBACK LOOP (THE HEART OF AI SYSTEM)</text>
      </g>

      <!-- Feedback components -->
      <g>
        <rect x="50" y="320" width="120" height="130" fill="#06B6D4" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="110" y="345" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">Feedback</text>
        <text x="110" y="365" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">Capture</text>
        <text x="110" y="385" font-size="9" text-anchor="middle" fill="#ffffff">Decision outcome</text>
        <text x="110" y="401" font-size="9" text-anchor="middle" fill="#ffffff">Scan result</text>
        <text x="110" y="417" font-size="9" text-anchor="middle" fill="#ffffff">Actual scanner</text>
        <text x="110" y="433" font-size="9" text-anchor="middle" fill="#ffffff">performance</text>
      </g>

      <!-- Arrow to Data Lake -->
      <path d="M 170 385 L 230 385" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <!-- Data Lake -->
      <g>
        <rect x="230" y="320" width="120" height="130" fill="#6366F1" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="290" y="345" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">Data Lake</text>
        <text x="290" y="365" font-size="11" text-anchor="middle" fill="#ffffff">Amazon S3</text>
        <text x="290" y="385" font-size="10" text-anchor="middle" fill="#ffffff">24M+ historical</text>
        <text x="290" y="403" font-size="10" text-anchor="middle" fill="#ffffff">scan records</text>
        <text x="290" y="421" font-size="10" text-anchor="middle" fill="#ffffff">Decision feedback</text>
      </g>

      <!-- Arrow to Feature Engineering -->
      <path d="M 350 385 L 410 385" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <!-- Feature Engineering -->
      <g>
        <rect x="410" y="320" width="120" height="130" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="470" y="345" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">Feature</text>
        <text x="470" y="365" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">Engineering</text>
        <text x="470" y="385" font-size="10" text-anchor="middle" fill="#ffffff">Extract patterns</text>
        <text x="470" y="403" font-size="10" text-anchor="middle" fill="#ffffff">Join datasets</text>
        <text x="470" y="421" font-size="10" text-anchor="middle" fill="#ffffff">Label data</text>
      </g>

      <!-- Arrow to Model Training -->
      <path d="M 530 385 L 590 385" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <!-- Model Training -->
      <g>
        <rect x="590" y="320" width="120" height="130" fill="#EC4899" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="650" y="345" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">Model</text>
        <text x="650" y="365" font-size="12" font-weight="bold" text-anchor="middle" fill="#ffffff">Training</text>
        <text x="650" y="385" font-size="10" text-anchor="middle" fill="#ffffff">Random Forest</text>
        <text x="650" y="403" font-size="10" text-anchor="middle" fill="#ffffff">Cross validation</text>
        <text x="650" y="421" font-size="10" text-anchor="middle" fill="#ffffff">Performance test</text>
      </g>

      <!-- Arrow back to Decision Engine -->
      <path d="M 710 320 L 700 200" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>

      <!-- Business Impact -->
      <g>
        <rect x="770" y="320" width="200" height="130" fill="#1F2937" stroke="#10B981" stroke-width="2" rx="8"/>
        <text x="870" y="345" font-size="13" font-weight="bold" text-anchor="middle" fill="#10B981">Business Impact</text>

        <text x="785" y="370" font-size="11" font-weight="bold" fill="#10B981">✓ 23.4% Performance</text>
        <text x="795" y="388" font-size="10" fill="#ffffff">Improvement</text>

        <text x="785" y="410" font-size="11" font-weight="bold" fill="#10B981">✓ Faster Scan Times</text>
        <text x="795" y="428" font-size="10" fill="#ffffff">Route to optimal engine</text>
      </g>

      <!-- Key Learning Points -->
      <g>
        <rect x="30" y="560" width="940" height="120" fill="#1F2937" stroke="#06B6D4" stroke-width="2" rx="8"/>
        <text x="500" y="585" font-size="13" font-weight="bold" text-anchor="middle" fill="#06B6D4">Key Learning Points</text>

        <text x="50" y="610" font-size="11" font-weight="bold" fill="#06B6D4">→ Feature Engineering:</text>
        <text x="60" y="628" font-size="10" fill="#ffffff">Extract meaningful features from raw data (size, MIME type, extension)</text>

        <text x="50" y="650" font-size="11" font-weight="bold" fill="#06B6D4">→ Feedback Loop:</text>
        <text x="60" y="668" font-size="10" fill="#ffffff">Real decisions feed back into training data, continuously improving model accuracy</text>
      </g>

      <defs>
        <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <polygon points="0 0, 12 6, 0 12" fill="#06B6D4"/>
        </marker>
      </defs>
    </svg>
  `,

  'deletion-handler': `
    <svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="600" y="30" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">
        Large-Scale Data Deletion Pipeline
      </text>
      <text x="600" y="55" font-size="14" text-anchor="middle" fill="#06B6D4">
        Safely delete ~9 Billion records and ~17 PB of S3 data within 5 days
      </text>

      <!-- Main Flow -->
      <g>
        <rect x="30" y="100" width="130" height="100" fill="#3B82F6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="95" y="130" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">DynamoDB</text>
        <text x="95" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Export</text>
        <text x="95" y="170" font-size="10" text-anchor="middle" fill="#ffffff">9B records</text>
      </g>

      <path d="M 160 150 L 210 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <rect x="210" y="100" width="130" height="100" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="275" y="130" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Filter &</text>
        <text x="275" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Validate</text>
        <text x="275" y="170" font-size="10" text-anchor="middle" fill="#ffffff">Decom assets</text>
      </g>

      <path d="M 340 150 L 390 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <rect x="390" y="100" width="130" height="100" fill="#EC4899" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="455" y="130" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Deletion</text>
        <text x="455" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Manifest</text>
        <text x="455" y="170" font-size="10" text-anchor="middle" fill="#ffffff">Approved records</text>
      </g>

      <path d="M 520 150 L 570 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <rect x="570" y="100" width="130" height="100" fill="#F59E0B" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="635" y="130" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">SQS</text>
        <text x="635" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Queue</text>
        <text x="635" y="170" font-size="10" text-anchor="middle" fill="#ffffff">Async processing</text>
      </g>

      <path d="M 700 150 L 750 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <rect x="750" y="100" width="130" height="100" fill="#10B981" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="815" y="130" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Lambda</text>
        <text x="815" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Workers</text>
        <text x="815" y="170" font-size="10" text-anchor="middle" fill="#ffffff">50 concurrent</text>
      </g>

      <path d="M 880 150 L 930 150" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <rect x="930" y="100" width="130" height="100" fill="#06B6D4" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="995" y="130" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Deletion</text>
        <text x="995" y="150" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">API</text>
        <text x="995" y="170" font-size="10" text-anchor="middle" fill="#ffffff">Trusted logic</text>
      </g>

      <!-- Storage/Retention -->
      <g>
        <rect x="390" y="280" width="130" height="100" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="455" y="310" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Glacier</text>
        <text x="455" y="330" font-size="13" font-weight="bold" text-anchor="middle" fill="#ffffff">Retention</text>
        <text x="455" y="350" font-size="10" text-anchor="middle" fill="#ffffff">18 months recovery</text>
      </g>

      <!-- Arrow from Filter to Glacier -->
      <path d="M 275 200 L 455 280" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)" stroke-dasharray="5,5"/>
      <text x="350" y="235" font-size="11" fill="#06B6D4" font-weight="bold">Archive</text>

      <!-- Details Box -->
      <g>
        <rect x="30" y="280" width="320" height="280" fill="#1F2937" stroke="#06B6D4" stroke-width="2" rx="8"/>
        <text x="190" y="305" font-size="12" font-weight="bold" text-anchor="middle" fill="#06B6D4">Scale & Capacity</text>

        <text x="50" y="330" font-size="11" font-weight="bold" fill="#10B981">Throughput:</text>
        <text x="60" y="348" font-size="10" fill="#ffffff">9B records / 5 days =</text>
        <text x="60" y="363" font-size="10" fill="#ffffff">~20,833 records/second</text>

        <text x="50" y="390" font-size="11" font-weight="bold" fill="#10B981">DynamoDB Writes:</text>
        <text x="60" y="408" font-size="10" fill="#ffffff">Batch size: 25</text>
        <text x="60" y="423" font-size="10" fill="#ffffff">Requires: ~833 writes/sec</text>
        <text x="60" y="438" font-size="10" fill="#ffffff">Provisioned: ~134K WCU</text>

        <text x="50" y="465" font-size="11" font-weight="bold" fill="#10B981">Lambda Concurrency:</text>
        <text x="60" y="483" font-size="10" fill="#ffffff">Concurrency: 50 workers</text>

        <text x="50" y="510" font-size="11" font-weight="bold" fill="#10B981">S3 Data Deletion:</text>
        <text x="60" y="528" font-size="10" fill="#ffffff">17 PB to delete</text>
        <text x="60" y="543" font-size="10" fill="#ffffff">Controlled deletion</text>
      </g>

      <!-- Safety & Monitoring -->
      <g>
        <rect x="570" y="280" width="350" height="280" fill="#1F2937" stroke="#10B981" stroke-width="2" rx="8"/>
        <text x="745" y="305" font-size="12" font-weight="bold" text-anchor="middle" fill="#10B981">Governance & Safety</text>

        <text x="590" y="330" font-size="11" font-weight="bold" fill="#10B981">✓ Validations:</text>
        <text x="600" y="348" font-size="10" fill="#ffffff">Asset type verification</text>
        <text x="600" y="363" font-size="10" fill="#ffffff">Timestamp cutoff checks</text>
        <text x="600" y="378" font-size="10" fill="#ffffff">hardDeleted flag validation</text>

        <text x="590" y="405" font-size="11" font-weight="bold" fill="#10B981">✓ Safeguards:</text>
        <text x="600" y="423" font-size="10" fill="#ffffff">Allow-list assets only</text>
        <text x="600" y="438" font-size="10" fill="#ffffff">Decommissioned check</text>
        <text x="600" y="453" font-size="10" fill="#ffffff">Idempotent operations</text>

        <text x="590" y="480" font-size="11" font-weight="bold" fill="#10B981">✓ Monitoring:</text>
        <text x="600" y="498" font-size="10" fill="#ffffff">CloudWatch dashboards</text>
        <text x="600" y="513" font-size="10" fill="#ffffff">DLQ for failed messages</text>
        <text x="600" y="528" font-size="10" fill="#ffffff">Audit trail logging</text>
      </g>

      <defs>
        <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <polygon points="0 0, 12 6, 0 12" fill="#06B6D4"/>
        </marker>
      </defs>
    </svg>
  `,

  'sftp-modernization': `
    <svg viewBox="0 0 1200 650" xmlns="http://www.w3.org/2000/svg">
      <!-- Title -->
      <text x="600" y="30" font-size="24" font-weight="bold" text-anchor="middle" fill="#ffffff">
        SFTP Identity Modernization
      </text>
      <text x="600" y="55" font-size="14" text-anchor="middle" fill="#06B6D4">
        Zero-downtime migration of 2,784 users to modern identity providers
      </text>

      <!-- Authentication & Migration Flow -->
      <g>
        <text x="50" y="100" font-size="13" font-weight="bold" fill="#06B6D4">1. Partner Connection</text>
        <rect x="50" y="120" width="120" height="80" fill="#3B82F6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="110" y="155" font-size="11" text-anchor="middle" fill="#ffffff">SFTP</text>
        <text x="110" y="172" font-size="11" text-anchor="middle" fill="#ffffff">Endpoint</text>
      </g>

      <path d="M 170 160 L 220 160" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <text x="220" y="100" font-size="13" font-weight="bold" fill="#06B6D4">2. AWS Transfer Family</text>
        <rect x="220" y="120" width="120" height="80" fill="#F59E0B" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="280" y="155" font-size="11" text-anchor="middle" fill="#ffffff">AWS Transfer</text>
        <text x="280" y="172" font-size="11" text-anchor="middle" fill="#ffffff">Family</text>
      </g>

      <path d="M 340 160 L 390 160" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <text x="390" y="100" font-size="13" font-weight="bold" fill="#06B6D4">3. Identity Provider (Cognito)</text>
        <rect x="390" y="120" width="120" height="80" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="450" y="155" font-size="11" text-anchor="middle" fill="#ffffff">Amazon</text>
        <text x="450" y="172" font-size="11" text-anchor="middle" fill="#ffffff">Cognito</text>
      </g>

      <path d="M 510 160 L 560 160" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <text x="560" y="100" font-size="13" font-weight="bold" fill="#06B6D4">4. Authenticate User</text>
        <rect x="560" y="120" width="120" height="80" fill="#10B981" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="620" y="155" font-size="11" text-anchor="middle" fill="#ffffff">User Auth</text>
        <text x="620" y="172" font-size="11" text-anchor="middle" fill="#ffffff">Success</text>
      </g>

      <path d="M 680 160 L 730 160" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

      <g>
        <text x="730" y="100" font-size="13" font-weight="bold" fill="#06B6D4">5. Return Access</text>
        <rect x="730" y="120" width="120" height="80" fill="#06B6D4" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="790" y="155" font-size="11" text-anchor="middle" fill="#ffffff">Home Dir</text>
        <text x="790" y="172" font-size="11" text-anchor="middle" fill="#ffffff">Access</text>
      </g>

      <!-- User Journey Path -->
      <g>
        <text x="50" y="260" font-size="13" font-weight="bold" fill="#06B6D4">User Access & File Ingestion Pipeline</text>

        <rect x="50" y="280" width="100" height="80" fill="#3B82F6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="100" y="315" font-size="11" text-anchor="middle" fill="#ffffff">User Login</text>
        <text x="100" y="332" font-size="10" text-anchor="middle" fill="#ffffff">2,784 users</text>

        <path d="M 150 320 L 200 320" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <rect x="200" y="280" width="100" height="80" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="250" y="310" font-size="11" text-anchor="middle" fill="#ffffff">S3 Prefix</text>
        <text x="250" y="330" font-size="10" text-anchor="middle" fill="#ffffff">Isolated per user</text>

        <path d="M 300 320 L 350 320" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <rect x="350" y="280" width="100" height="80" fill="#EC4899" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="400" y="315" font-size="11" text-anchor="middle" fill="#ffffff">Upload Files</text>
        <text x="400" y="332" font-size="10" text-anchor="middle" fill="#ffffff">via SFTP</text>

        <path d="M 450 320 L 500 320" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <rect x="500" y="280" width="100" height="80" fill="#F59E0B" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="550" y="310" font-size="11" text-anchor="middle" fill="#ffffff">S3 Event</text>
        <text x="550" y="330" font-size="10" text-anchor="middle" fill="#ffffff">Triggered</text>

        <path d="M 600 320 L 650 320" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <rect x="650" y="280" width="100" height="80" fill="#10B981" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="700" y="310" font-size="11" text-anchor="middle" fill="#ffffff">Processing</text>
        <text x="700" y="330" font-size="10" text-anchor="middle" fill="#ffffff">Lambda</text>

        <path d="M 750 320 L 800 320" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <rect x="800" y="280" width="100" height="80" fill="#6366F1" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="850" y="310" font-size="11" text-anchor="middle" fill="#ffffff">Queue</text>
        <text x="850" y="330" font-size="10" text-anchor="middle" fill="#ffffff">SQS</text>

        <path d="M 900 320 L 950 320" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <rect x="950" y="280" width="100" height="80" fill="#8B5CF6" stroke="#4B5563" stroke-width="2" rx="8"/>
        <text x="1000" y="310" font-size="11" text-anchor="middle" fill="#ffffff">Downstream</text>
        <text x="1000" y="330" font-size="10" text-anchor="middle" fill="#ffffff">Systems</text>
      </g>

      <!-- OIDC Authentication -->
      <g>
        <rect x="50" y="430" width="900" height="180" fill="#1F2937" stroke="#06B6D4" stroke-width="2" rx="8"/>
        <text x="500" y="455" font-size="13" font-weight="bold" text-anchor="middle" fill="#06B6D4">OIDC Authentication with Federated Identity (Enterprise IdP)</text>

        <!-- Step 1 -->
        <g>
          <rect x="70" y="475" width="90" height="70" fill="#3B82F6" stroke="#4B5563" stroke-width="1" rx="5"/>
          <text x="115" y="505" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">User</text>
          <text x="115" y="520" font-size="9" text-anchor="middle" fill="#ffffff">Initiates</text>
        </g>

        <path d="M 160 510 L 200 510" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <!-- Step 2 -->
        <g>
          <rect x="200" y="475" width="90" height="70" fill="#8B5CF6" stroke="#4B5563" stroke-width="1" rx="5"/>
          <text x="245" y="505" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">Route 53</text>
          <text x="245" y="520" font-size="9" text-anchor="middle" fill="#ffffff">(DNS)</text>
        </g>

        <path d="M 290 510 L 330 510" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <!-- Step 3 -->
        <g>
          <rect x="330" y="475" width="90" height="70" fill="#EC4899" stroke="#4B5563" stroke-width="1" rx="5"/>
          <text x="375" y="505" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">Enterprise</text>
          <text x="375" y="520" font-size="9" text-anchor="middle" fill="#ffffff">OIDC</text>
        </g>

        <path d="M 420 510 L 460 510" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <!-- Step 4 -->
        <g>
          <rect x="460" y="475" width="90" height="70" fill="#10B981" stroke="#4B5563" stroke-width="1" rx="5"/>
          <text x="505" y="505" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">Cognito</text>
          <text x="505" y="520" font-size="9" text-anchor="middle" fill="#ffffff">Exchange</text>
        </g>

        <path d="M 550 510 L 590 510" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <!-- Step 5 -->
        <g>
          <rect x="590" y="475" width="90" height="70" fill="#F59E0B" stroke="#4B5563" stroke-width="1" rx="5"/>
          <text x="635" y="505" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">AWS</text>
          <text x="635" y="520" font-size="9" text-anchor="middle" fill="#ffffff">Transfer</text>
        </g>

        <path d="M 680 510 L 720 510" stroke="#06B6D4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>

        <!-- Step 6 -->
        <g>
          <rect x="720" y="475" width="90" height="70" fill="#06B6D4" stroke="#4B5563" stroke-width="1" rx="5"/>
          <text x="765" y="505" font-size="10" font-weight="bold" text-anchor="middle" fill="#ffffff">SFTP Home</text>
          <text x="765" y="520" font-size="9" text-anchor="middle" fill="#ffffff">Dir Access</text>
        </g>

        <!-- Features -->
        <text x="850" y="490" font-size="10" font-weight="bold" fill="#10B981">Key Features:</text>
        <text x="860" y="507" font-size="9" fill="#ffffff">✓ OIDC Authorization Code Flow</text>
        <text x="860" y="522" font-size="9" fill="#ffffff">✓ MFA enforced at IdP level</text>
        <text x="860" y="537" font-size="9" fill="#ffffff">✓ Automatic access revocation</text>
      </g>

      <defs>
        <marker id="arrowhead" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <polygon points="0 0, 12 6, 0 12" fill="#06B6D4"/>
        </marker>
      </defs>
    </svg>
  `,
}

// Add more projects as needed - these are the core detailed ones
// For remaining projects, you can create additional SVGs or use simplified versions
