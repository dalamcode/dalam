import { Tray, Menu, nativeImage, app, BrowserWindow } from "electron"
import * as path from "node:path"

let tray: Tray | null = null

export function createTray(mainWindow: BrowserWindow) {
  if (tray) return tray

  const iconPath = path.join(__dirname, "../../resources/icon.png")
  const icon = nativeImage.createFromPath(iconPath)

  tray = new Tray(icon)
  tray.setToolTip("Dalam")

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Show Dalam",
      click: () => {
        if (mainWindow) {
          if (mainWindow.isMinimized()) mainWindow.restore()
          mainWindow.show()
          mainWindow.focus()
        }
      },
    },
    { type: "separator" },
    {
      label: "New Session",
      click: () => {
        if (mainWindow) {
          mainWindow.show()
          mainWindow.webContents.send("new-session")
        }
      },
    },
    { type: "separator" },
    {
      label: "Quit",
      click: () => {
        app.quit()
      },
    },
  ])

  tray.setContextMenu(contextMenu)

  tray.on("double-click", () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.show()
      mainWindow.focus()
    }
  })

  return tray
}

export function destroyTray() {
  if (tray) {
    tray.destroy()
    tray = null
  }
}

export function updateTrayBadge(count: number) {
  if (!tray) return

  if (count > 0) {
    tray.setToolTip(`Dalam (${count} new)`)
  } else {
    tray.setToolTip("Dalam")
  }
}
