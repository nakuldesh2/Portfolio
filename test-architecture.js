import { architectures } from './src/data/architectures.js'
import { projects } from './src/data/projects.js'

// Test that architectures and projects are linked correctly
console.log('\n=== ARCHITECTURE DIAGRAM TEST ===\n')

projects.forEach(project => {
  const arch = architectures[project.id]
  if (arch) {
    console.log(`✓ ${project.title}`)
    console.log(`  - Nodes: ${arch.nodes.length}`)

    // Check if all nodes have colors
    arch.nodes.forEach((node, idx) => {
      if (!node.color) {
        console.log(`  ⚠️  Node ${idx} (${node.label}) has NO COLOR!`)
      }
    })

    // Show first node colors
    if (arch.nodes.length > 0) {
      console.log(`  - First node color: ${arch.nodes[0].color}`)
      console.log(`  - First node fill: ${arch.nodes[0].color || '#3B82F6'}`)
    }
  } else {
    console.log(`✗ ${project.title} - NO ARCHITECTURE FOUND`)
  }
})

console.log('\n=== KEY FINDINGS ===')
console.log('If you see NO COLOR warnings, the architecture data is missing colors.')
console.log('If colors are shown above, the issue is in React rendering, not data.\n')
