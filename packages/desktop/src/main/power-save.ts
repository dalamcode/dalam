import { powerSaveBlocker } from "electron"

let blockerId: number | null = null

export function startPowerSaveBlocker() {
  if (blockerId !== null) return

  try {
    blockerId = powerSaveBlocker.start("prevent-app-suspension")
    console.log("Power save blocker started")
  } catch (error) {
    console.error("Failed to start power save blocker:", error)
  }
}

export function stopPowerSaveBlocker() {
  if (blockerId === null) return

  try {
    powerSaveBlocker.stop(blockerId)
    blockerId = null
    console.log("Power save blocker stopped")
  } catch (error) {
    console.error("Failed to stop power save blocker:", error)
  }
}

export function isPowerSaveBlockerActive(): boolean {
  return blockerId !== null && powerSaveBlocker.isStarted(blockerId)
}
