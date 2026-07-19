import * as vscode from "vscode"
import * as fs from "fs"
import * as path from "path"
import { execSync } from "child_process"

const TERMINAL_NAME = "dalam"
const DALAM_DIR = path.join(process.env.HOME || "~", ".dalam", "bin")
const DALAM_BIN = path.join(DALAM_DIR, "dalam")

function getPlatform(): string {
  const platform = process.platform
  if (platform === "darwin") return "darwin"
  if (platform === "win32") return "windows"
  return "linux"
}

function getArch(): string {
  const arch = process.arch
  if (arch === "arm64") return "arm64"
  return "x64"
}

function getBinaryName(): string {
  const platform = getPlatform()
  const arch = getArch()
  const ext = platform === "windows" ? ".exe" : ""
  return `dalam-${platform}-${arch}${ext}`
}

function getDownloadUrl(): string {
  return `https://github.com/dalamcode/dalam/releases/latest/download/${getBinaryName()}`
}

function isDalamInstalled(): boolean {
  try {
    // Check if dalam is in PATH
    execSync(process.platform === "win32" ? "where dalam" : "which dalam", { stdio: "ignore" })
    return true
  } catch {
    // Check if binary exists in ~/.dalam/bin
    return fs.existsSync(DALAM_BIN)
  }
}

async function installDalam(): Promise<boolean> {
  const choice = await vscode.window.showInformationMessage(
    "dalam CLI is not installed. Would you like to install it now?",
    "Install",
    "Cancel"
  )

  if (choice !== "Install") {
    return false
  }

  return await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: "Installing dalam CLI...",
      cancellable: false,
    },
    async (progress) => {
      try {
        progress.report({ message: "Downloading..." })

        // Create directory
        fs.mkdirSync(DALAM_DIR, { recursive: true })

        // Download binary
        const url = getDownloadUrl()
        const platform = getPlatform()

        if (platform === "windows") {
          // Windows: download zip and extract
          const zipPath = path.join(DALAM_DIR, "dalam.zip")
          execSync(`curl -L -o "${zipPath}" "${url}.zip"`, { stdio: "pipe" })
          execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${DALAM_DIR}' -Force"`, { stdio: "pipe" })
          execSync(`del "${zipPath}"`, { stdio: "pipe" })
        } else {
          // macOS/Linux: download and make executable
          execSync(`curl -L -o "${DALAM_BIN}" "${url}"`, { stdio: "pipe" })
          fs.chmodSync(DALAM_BIN, 0o755)
        }

        progress.report({ message: "Adding to PATH..." })

        // Add to PATH in shell profile
        const shell = process.env.SHELL || ""
        const home = process.env.HOME || "~"

        if (shell.includes("zsh")) {
          const zshrc = path.join(home, ".zshrc")
          const pathEntry = `export PATH="$HOME/.dalam/bin:$PATH"`
          if (!fs.readFileSync(zshrc, "utf8").includes(pathEntry)) {
            fs.appendFileSync(zshrc, `\n${pathEntry}\n`)
          }
        } else if (shell.includes("bash")) {
          const bashrc = path.join(home, ".bashrc")
          const pathEntry = `export PATH="$HOME/.dalam/bin:$PATH"`
          if (!fs.readFileSync(bashrc, "utf8").includes(pathEntry)) {
            fs.appendFileSync(bashrc, `\n${pathEntry}\n`)
          }
        }

        vscode.window.showInformationMessage("dalam CLI installed successfully! Restart VS Code to use it.")
        return true
      } catch (error) {
        vscode.window.showErrorMessage(`Failed to install dalam: ${error}`)
        return false
      }
    }
  )
}

export function activate(context: vscode.ExtensionContext) {
  // Check if dalam is installed on activation
  if (!isDalamInstalled()) {
    installDalam()
  }

  const openNewTerminalDisposable = vscode.commands.registerCommand("dalam.openNewTerminal", async () => {
    await openTerminal()
  })

  const openTerminalDisposable = vscode.commands.registerCommand("dalam.openTerminal", async () => {
    const existingTerminal = vscode.window.terminals.find((t) => t.name === TERMINAL_NAME)
    if (existingTerminal) {
      existingTerminal.show()
      return
    }
    await openTerminal()
  })

  let addFilepathDisposable = vscode.commands.registerCommand("dalam.addFilepathToTerminal", async () => {
    const fileRef = getActiveFile()
    if (!fileRef) return

    const terminal = vscode.window.activeTerminal
    if (!terminal) return

    if (terminal.name === TERMINAL_NAME) {
      // @ts-ignore
      const port = terminal.creationOptions.env?.["_EXTENSION_DALAM_PORT"]
      port ? await appendPrompt(parseInt(port), fileRef) : terminal.sendText(fileRef, false)
      terminal.show()
    }
  })

  context.subscriptions.push(openNewTerminalDisposable, openTerminalDisposable, addFilepathDisposable)

  async function openTerminal() {
    const port = Math.floor(Math.random() * (65535 - 16384 + 1)) + 16384
    const terminal = vscode.window.createTerminal({
      name: TERMINAL_NAME,
      iconPath: vscode.Uri.file(context.asAbsolutePath("images/icon.png")),
      location: {
        viewColumn: vscode.ViewColumn.Beside,
        preserveFocus: false,
      },
      env: {
        _EXTENSION_DALAM_PORT: port.toString(),
        DALAM_CALLER: "vscode",
        PATH: `${DALAM_DIR}:${process.env.PATH}`,
      },
    })

    terminal.show()
    terminal.sendText(`dalam --port ${port}`)

    const fileRef = getActiveFile()
    if (!fileRef) return

    let tries = 10
    let connected = false
    do {
      await new Promise((resolve) => setTimeout(resolve, 200))
      try {
        await fetch(`http://localhost:${port}/app`)
        connected = true
        break
      } catch {}
      tries--
    } while (tries > 0)

    if (connected) {
      await appendPrompt(port, `In ${fileRef}`)
      terminal.show()
    }
  }

  async function appendPrompt(port: number, text: string) {
    await fetch(`http://localhost:${port}/tui/append-prompt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
  }

  function getActiveFile() {
    const activeEditor = vscode.window.activeTextEditor
    if (!activeEditor) return

    const document = activeEditor.document
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri)
    if (!workspaceFolder) return

    const relativePath = vscode.workspace.asRelativePath(document.uri)
    let filepathWithAt = `@${relativePath}`

    const selection = activeEditor.selection
    if (!selection.isEmpty) {
      const startLine = selection.start.line + 1
      const endLine = selection.end.line + 1
      filepathWithAt += startLine === endLine ? `#L${startLine}` : `#L${startLine}-${endLine}`
    }

    return filepathWithAt
  }
}

export function deactivate() {}
