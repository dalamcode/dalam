declare global {
  const DALAM_VERSION: string
  const DALAM_CHANNEL: string
}

export const InstallationVersion = typeof DALAM_VERSION === "string" ? DALAM_VERSION : "local"
export const InstallationChannel = typeof DALAM_CHANNEL === "string" ? DALAM_CHANNEL : "local"
export const InstallationLocal = InstallationChannel === "local"
