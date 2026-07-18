import { expect, test } from "bun:test"
import type { Configuration } from "electron-builder"

const legacyDesktopEntry = "resources/linux/dalam-desktop.desktop"

const channels = [
  { channel: "dev", appId: "in.uthakkan.dalam.dev" },
  { channel: "beta", appId: "in.uthakkan.dalam.beta" },
  { channel: "prod", appId: "in.uthakkan.dalam" },
] as const

for (const channel of channels) {
  test(`uses one Linux desktop identity for ${channel.channel}`, async () => {
    const previous = process.env.DALAM_CHANNEL
    process.env.DALAM_CHANNEL = channel.channel

    const module = await import(`./electron-builder.config.ts?channel=${channel.channel}`)
    const config = module.default as Configuration

    if (previous === undefined) delete process.env.DALAM_CHANNEL
    else process.env.DALAM_CHANNEL = previous

    expect(config.appId).toBe(channel.appId)
    expect(config.extraMetadata?.desktopName).toBe(`${channel.appId}.desktop`)
    expect(config.linux?.executableName).toBe(channel.appId)
    expect(config.linux?.desktop?.entry?.StartupWMClass).toBe(channel.appId)
  })
}

test("keeps a hidden prod launcher for old Linux pins", async () => {
  const previous = process.env.DALAM_CHANNEL
  process.env.DALAM_CHANNEL = "prod"

  const module = await import("./electron-builder.config.ts?compat=prod")
  const config = module.default as Configuration

  if (previous === undefined) delete process.env.DALAM_CHANNEL
  else process.env.DALAM_CHANNEL = previous

  expect(config.deb?.fpm?.[0]).toEndWith(`${legacyDesktopEntry}=/usr/share/applications/dalam-desktop.desktop`)
  expect(config.rpm?.fpm?.[0]).toEndWith(`${legacyDesktopEntry}=/usr/share/applications/dalam-desktop.desktop`)

  const desktop = await Bun.file(legacyDesktopEntry).text()
  expect(desktop).toContain("Exec=/opt/Dalam/in.uthakkan.dalam %U")
  expect(desktop).toContain("Icon=in.uthakkan.dalam")
  expect(desktop).toContain("StartupWMClass=in.uthakkan.dalam")
  expect(desktop).toContain("NoDisplay=true")
})
