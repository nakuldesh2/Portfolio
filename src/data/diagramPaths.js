/**
 * Detailed architecture diagrams (shown under "Show detailed architecture diagram"
 * in a project's dialog). Projects without one rely on their simulation.
 */

const base = import.meta.env.BASE_URL

export const diagramPaths = {
  'scrutinizer-migration': `${base}diagrams/scrutinizer-migration.webp`,
  'smartscanner': `${base}diagrams/smartscanner.webp`,
  'deletion-handler': `${base}diagrams/deletion-handler.webp`,
  'sftp-modernization': `${base}diagrams/sftp-modernization.webp`,
}

export default diagramPaths
