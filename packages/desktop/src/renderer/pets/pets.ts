export type PetState =
  | "idle"
  | "running"
  | "running-left"
  | "running-right"
  | "jumping"
  | "failed"
  | "waiting"
  | "review"
  | "waving"

export type PetName =
  | "codepix"
  | "dewey"
  | "fireball"
  | "hoots"
  | "null-signal"
  | "rocky"
  | "seedy"
  | "stacky"

export interface PetConfig {
  readonly name: PetName
  readonly displayName: string
  readonly description: string
}

export interface PetStateInfo {
  readonly state: PetState
  readonly animation: string
  readonly loop: boolean
  readonly duration?: number
}

export const PET_STATES: Record<PetState, PetStateInfo> = {
  idle: { state: "idle", animation: "idle.webp", loop: true },
  running: { state: "running", animation: "running.webp", loop: true },
  "running-left": { state: "running-left", animation: "running-left.webp", loop: true },
  "running-right": { state: "running-right", animation: "running-right.webp", loop: true },
  jumping: { state: "jumping", animation: "jumping.webp", loop: false, duration: 500 },
  failed: { state: "failed", animation: "failed.webp", loop: false, duration: 1000 },
  waiting: { state: "waiting", animation: "waiting.webp", loop: true },
  review: { state: "review", animation: "review.webp", loop: true },
  waving: { state: "waving", animation: "waving.webp", loop: false, duration: 800 },
}

const PET_LIST: PetConfig[] = [
  { name: "codepix", displayName: "Codepix", description: "A friendly coding companion" },
  { name: "dewey", displayName: "Dewey", description: "A wise owl who loves to help" },
  { name: "fireball", displayName: "Fireball", description: "An energetic coding buddy" },
  { name: "hoots", displayName: "Hoots", description: "A cheerful owl companion" },
  { name: "null-signal", displayName: "Null Signal", description: "A mysterious digital entity" },
  { name: "rocky", displayName: "Rocky", description: "A dependable stone companion" },
  { name: "seedy", displayName: "Seedy", description: "A playful plant friend" },
  { name: "stacky", displayName: "Stacky", description: "A stack of helpful blocks" },
]

export const PETS: Record<PetName, PetConfig> = Object.fromEntries(
  PET_LIST.map((p) => [p.name, p])
) as Record<PetName, PetConfig>

export const getPetAnimationUrl = (pet: PetName, state: PetState): string =>
  `/pets/${pet}/${state}.webp`

export const ALL_PET_NAMES: PetName[] = PET_LIST.map((p) => p.name)

export const DEFAULT_PET: PetName = "codepix"
