import { globalShortcut, BrowserWindow } from "electron"

const registeredShortcuts: string[] = []

export function registerGlobalShortcuts(mainWindow: BrowserWindow) {
  const shortcuts: Array<{ accelerator: string; action: () => void }> = [
    {
      accelerator: "CommandOrControl+Shift+Space",
      action: () => {
        if (mainWindow) {
          if (mainWindow.isVisible()) {
            mainWindow.hide()
          } else {
            mainWindow.show()
            mainWindow.focus()
          }
        }
      },
    },
    {
      accelerator: "CommandOrControl+Shift+N",
      action: () => {
        if (mainWindow) {
          mainWindow.show()
          mainWindow.webContents.send("new-session")
        }
      },
    },
  ]

  for (const shortcut of shortcuts) {
    try {
      globalShortcut.register(shortcut.accelerator, shortcut.action)
      registeredShortcuts.push(shortcut.accelerator)
    } catch (error) {
      console.error(`Failed to register shortcut ${shortcut.accelerator}:`, error)
    }
  }
}

export function unregisterGlobalShortcuts() {
  for (const shortcut of registeredShortcuts) {
    try {
      globalShortcut.unregister(shortcut)
    } catch (error) {
      console.error(`Failed to unregister shortcut ${shortcut}:`, error)
    }
  }
  registeredShortcuts.length = 0
}
