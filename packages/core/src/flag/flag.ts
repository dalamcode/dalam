import { Config } from "effect"

// Backward compatibility: copy any OPENCODE_* env vars to DALAM_* equivalents
// if the DALAM_* version is not already set. DALAM_* always takes priority.
function migrateEnvVars() {
  const env = process.env
  for (const key of Object.keys(env)) {
    if (key.startsWith("OPENCODE_")) {
      const dalamKey = `DALAM_${key.slice(8)}`
      if (!(dalamKey in env)) {
        env[dalamKey] = env[key]
      }
    }
  }
}
migrateEnvVars()

export function truthy(key: string) {
  const value = process.env[key]?.toLowerCase()
  return value === "true" || value === "1"
}

const copy = process.env["DALAM_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"]
const fff = process.env["DALAM_DISABLE_FFF"]

function enabledByExperimental(key: string) {
  return process.env[key] === undefined ? truthy("DALAM_EXPERIMENTAL") : truthy(key)
}

export const Flag = {
  OTEL_EXPORTER_OTLP_ENDPOINT: process.env["OTEL_EXPORTER_OTLP_ENDPOINT"],
  OTEL_EXPORTER_OTLP_HEADERS: process.env["OTEL_EXPORTER_OTLP_HEADERS"],

  DALAM_AUTO_HEAP_SNAPSHOT: truthy("DALAM_AUTO_HEAP_SNAPSHOT"),
  DALAM_GIT_BASH_PATH: process.env["DALAM_GIT_BASH_PATH"],
  DALAM_CONFIG: process.env["DALAM_CONFIG"],
  DALAM_CONFIG_CONTENT: process.env["DALAM_CONFIG_CONTENT"],
  DALAM_DISABLE_AUTOUPDATE: truthy("DALAM_DISABLE_AUTOUPDATE"),
  DALAM_ALWAYS_NOTIFY_UPDATE: truthy("DALAM_ALWAYS_NOTIFY_UPDATE"),
  DALAM_DISABLE_PRUNE: truthy("DALAM_DISABLE_PRUNE"),
  DALAM_DISABLE_TERMINAL_TITLE: truthy("DALAM_DISABLE_TERMINAL_TITLE"),
  DALAM_SHOW_TTFD: truthy("DALAM_SHOW_TTFD"),
  DALAM_DISABLE_AUTOCOMPACT: truthy("DALAM_DISABLE_AUTOCOMPACT"),
  DALAM_DISABLE_MODELS_FETCH: truthy("DALAM_DISABLE_MODELS_FETCH"),
  DALAM_DISABLE_MOUSE: truthy("DALAM_DISABLE_MOUSE"),
  DALAM_FAKE_VCS: process.env["DALAM_FAKE_VCS"],
  DALAM_SERVER_PASSWORD: process.env["DALAM_SERVER_PASSWORD"],
  DALAM_SERVER_USERNAME: process.env["DALAM_SERVER_USERNAME"],
  DALAM_DISABLE_FFF: fff === undefined ? process.platform === "win32" : truthy("DALAM_DISABLE_FFF"),

  // Experimental
  DALAM_EXPERIMENTAL_FILEWATCHER: Config.boolean("DALAM_EXPERIMENTAL_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  DALAM_EXPERIMENTAL_DISABLE_FILEWATCHER: Config.boolean("DALAM_EXPERIMENTAL_DISABLE_FILEWATCHER").pipe(
    Config.withDefault(false),
  ),
  DALAM_EXPERIMENTAL_DISABLE_COPY_ON_SELECT:
    copy === undefined ? process.platform === "win32" : truthy("DALAM_EXPERIMENTAL_DISABLE_COPY_ON_SELECT"),
  DALAM_MODELS_URL: process.env["DALAM_MODELS_URL"],
  DALAM_MODELS_PATH: process.env["DALAM_MODELS_PATH"],
  get DALAM_DB() {
    return process.env["DALAM_DB"]
  },
  set DALAM_DB(value: string | undefined) {
    if (value === undefined) delete process.env["DALAM_DB"]
    else process.env["DALAM_DB"] = value
  },

  DALAM_WORKSPACE_ID: process.env["DALAM_WORKSPACE_ID"],
  DALAM_EXPERIMENTAL_WORKSPACES: enabledByExperimental("DALAM_EXPERIMENTAL_WORKSPACES"),

  // Evaluated at access time (not module load) because tests, the CLI, and
  // external tooling set these env vars at runtime.
  get DALAM_DISABLE_PROJECT_CONFIG() {
    return truthy("DALAM_DISABLE_PROJECT_CONFIG")
  },
  get DALAM_EXPERIMENTAL_REFERENCES() {
    return enabledByExperimental("DALAM_EXPERIMENTAL_REFERENCES")
  },
  get DALAM_TUI_CONFIG() {
    return process.env["DALAM_TUI_CONFIG"]
  },
  get DALAM_CONFIG_DIR() {
    return process.env["DALAM_CONFIG_DIR"]
  },
  get DALAM_PURE() {
    return truthy("DALAM_PURE")
  },
  get DALAM_PERMISSION() {
    return process.env["DALAM_PERMISSION"]
  },
  get DALAM_PLUGIN_META_FILE() {
    return process.env["DALAM_PLUGIN_META_FILE"]
  },
  get DALAM_CLIENT() {
    return process.env["DALAM_CLIENT"] ?? "cli"
  },
}
