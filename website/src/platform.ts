export type Platform = 'mac' | 'windows' | 'linux' | 'unknown'

export function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('mac') && !ua.includes('iphone') && !ua.includes('ipad')) return 'mac'
  if (ua.includes('win')) return 'windows'
  if (ua.includes('linux')) return 'linux'
  return 'unknown'
}

function getArch(): string {
  if (typeof window === 'undefined') return 'x64'
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('arm64') || ua.includes('aarch64')) return 'arm64'
  return 'x64'
}

const BASE = 'https://github.com/dalamcode/dalam/releases/latest/download'

export function getDesktopDownloadUrl(platform: Platform): string {
  const arch = getArch()
  switch (platform) {
    case 'mac':
      return `${BASE}/dalam-mac-${arch}.dmg`
    case 'windows':
      return `${BASE}/dalam-win-${arch}.exe`
    case 'linux':
      return `${BASE}/dalam-linux-${arch}.AppImage`
    default:
      return 'https://github.com/dalamcode/dalam/releases'
  }
}

export function getDesktopLabel(platform: Platform): string {
  switch (platform) {
    case 'mac': return 'Download for macOS'
    case 'windows': return 'Download for Windows'
    case 'linux': return 'Download for Linux'
    default: return 'Download'
  }
}
