import type { ElectronAPI } from "../preload/types"

declare global {
  interface Window {
    api: ElectronAPI
    __DALAM__?: {
      deepLinks?: string[]
    }
  }
}
