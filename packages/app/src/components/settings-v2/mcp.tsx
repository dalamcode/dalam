import type { McpStatus } from "@uthakkan/sdk/v2/client"
import { Component, createMemo, createResource, createSignal, For, Show } from "solid-js"
import { Switch } from "@uthakkan/ui/v2/switch-v2"
import { useLanguage } from "@/context/language"
import { useServerSDK } from "@/context/server-sdk"
import { showToast } from "@/utils/toast"
import { SettingsListV2 } from "./parts/list"
import { SettingsRowV2 } from "./parts/row"

const statusLabels: Partial<Record<McpStatus["status"], string>> = {
  connected: "mcp.status.connected",
  failed: "mcp.status.failed",
  needs_auth: "mcp.status.needs_auth",
  needs_client_registration: "mcp.status.needs_client_registration",
  disabled: "mcp.status.disabled",
}

export const SettingsMcpV2: Component = () => {
  const language = useLanguage()
  const sdk = useServerSDK()
  const [pendingName, setPendingName] = createSignal<string | null>(null)

  const [mcpData, { refetch }] = createResource(async () => {
    try {
      const res = await sdk().client.mcp.status()
      return (res.data ?? {}) as Record<string, McpStatus>
    } catch {
      return {} as Record<string, McpStatus>
    }
  })

  const items = createMemo(() =>
    Object.entries(mcpData() ?? {})
      .map(([name, status]) => ({ name, status: status.status }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  )

  const enabledCount = createMemo(() => items().filter((i) => i.status === "connected").length)
  const totalCount = createMemo(() => items().length)

  const toggleMcp = async (name: string) => {
    if (pendingName()) return
    const currentStatus = mcpData()?.[name]?.status
    if (!currentStatus) return

    setPendingName(name)
    try {
      const client = sdk().client
      const actions: Record<McpStatus["status"], () => Promise<unknown>> = {
        connected: () => client.mcp.disconnect({ name }),
        needs_auth: () => client.mcp.auth.authenticate({ name }),
        disabled: () => client.mcp.connect({ name }),
        failed: () => client.mcp.connect({ name }),
        needs_client_registration: () => client.mcp.connect({ name }),
      }

      await actions[currentStatus]()
      await refetch()
    } catch (error) {
      showToast({
        variant: "error",
        title: language.t("common.requestFailed"),
        description: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setPendingName(null)
    }
  }

  return (
    <>
      <div class="settings-v2-tab-header">
        <h2 class="settings-v2-tab-title">{language.t("settings.tab.mcp")}</h2>
      </div>

      <div class="settings-v2-tab-body">
        <div class="settings-v2-section">
          <h3 class="settings-v2-section-title">
            {language.t("settings.mcp.description", { enabled: enabledCount(), total: totalCount() })}
          </h3>

          <Show
            when={totalCount() > 0}
            fallback={
              <div class="text-13-regular text-text-weaker py-4">
                {language.t("dialog.mcp.empty")}
              </div>
            }
          >
            <SettingsListV2>
              <For each={items()}>
                {(item) => {
                  const statusLabel = () => {
                    const key = statusLabels[item.status as McpStatus["status"]]
                    if (!key) return
                    return language.t(key)
                  }
                  const error = () => {
                    const s = mcpData()?.[item.name]
                    if (s?.status === "failed" || s?.status === "needs_client_registration") return s.error
                  }
                  const enabled = () => item.status === "connected"

                  return (
                    <SettingsRowV2
                      title={item.name}
                      description={
                        <span class="flex items-center gap-2">
                          <Show when={statusLabel()}>
                            <span class="text-11-regular text-text-weaker">{statusLabel()}</span>
                          </Show>
                          <Show when={error()}>
                            <span class="text-11-regular text-text-weaker truncate">{error()}</span>
                          </Show>
                        </span>
                      }
                    >
                      <div data-action={`settings-mcp-${item.name}`}>
                        <Switch
                          checked={enabled()}
                          disabled={pendingName() === item.name}
                          onChange={() => toggleMcp(item.name)}
                        />
                      </div>
                    </SettingsRowV2>
                  )
                }}
              </For>
            </SettingsListV2>
          </Show>
        </div>
      </div>
    </>
  )
}
