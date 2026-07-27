import { Component, Show } from "solid-js"
import { Switch } from "@uthakkan/ui/v2/switch-v2"
import { SelectV2 } from "@uthakkan/ui/v2/select-v2"
import { useLanguage } from "@/context/language"
import { useSettings, type PetName } from "@/context/settings"
import { SettingsListV2 } from "./parts/list"
import { SettingsRowV2 } from "./parts/row"

const PET_OPTIONS: { id: PetName; label: string }[] = [
  { id: "codepix", label: "Codepix" },
  { id: "dewey", label: "Dewey" },
  { id: "fireball", label: "Fireball" },
  { id: "hoots", label: "Hoots" },
  { id: "null-signal", label: "Null Signal" },
  { id: "rocky", label: "Rocky" },
  { id: "seedy", label: "Seedy" },
  { id: "stacky", label: "Stacky" },
]

const PET_EVENT = "dalam.desktop.pet.change"

const syncToPetManager = {
  setPet(name: PetName) {
    try {
      localStorage.setItem("dalam.desktop.pet.name", name)
      window.dispatchEvent(new CustomEvent(PET_EVENT, { detail: { key: "name", value: name } }))
    } catch {}
  },
  setEnabled(value: boolean) {
    try {
      localStorage.setItem("dalam.desktop.pet.enabled", String(value))
      window.dispatchEvent(new CustomEvent(PET_EVENT, { detail: { key: "enabled", value: String(value) } }))
    } catch {}
  },
}

export const SettingsPetsV2: Component = () => {
  const language = useLanguage()
  const settings = useSettings()

  return (
    <>
      <div class="settings-v2-tab-header">
        <h2 class="settings-v2-tab-title">{language.t("settings.tab.pets")}</h2>
      </div>

      <div class="settings-v2-tab-body">
        <div class="settings-v2-section">
          <SettingsListV2>
            <SettingsRowV2
              title={language.t("settings.pets.row.enable.title")}
              description={language.t("settings.pets.row.enable.description")}
            >
              <div data-action="settings-pet-enable">
                <Switch
                  checked={settings.pets.enabled()}
                  onChange={(checked) => {
                    settings.pets.setEnabled(checked)
                    syncToPetManager.setEnabled(checked)
                  }}
                />
              </div>
            </SettingsRowV2>

            <Show when={settings.pets.enabled()}>
              <SettingsRowV2
                title={language.t("settings.pets.row.pet.title")}
                description={language.t("settings.pets.row.pet.description")}
              >
                <SelectV2
                  appearance="inline"
                  data-action="settings-pet-select"
                  options={PET_OPTIONS}
                  current={PET_OPTIONS.find((o) => o.id === settings.pets.name())}
                  placement="bottom-end"
                  gutter={6}
                  value={(o) => o.id}
                  label={(o) => o.label}
                  onSelect={(option) => {
                    if (!option) return
                    settings.pets.setName(option.id)
                    syncToPetManager.setPet(option.id)
                  }}
                />
              </SettingsRowV2>

              <SettingsRowV2
                title={language.t("settings.pets.row.showStatus.title")}
                description={language.t("settings.pets.row.showStatus.description")}
              >
                <div data-action="settings-pet-show-status">
                  <Switch
                    checked={settings.pets.showStatus()}
                    onChange={(checked) => settings.pets.setShowStatus(checked)}
                  />
                </div>
              </SettingsRowV2>
            </Show>
          </SettingsListV2>
        </div>
      </div>
    </>
  )
}
