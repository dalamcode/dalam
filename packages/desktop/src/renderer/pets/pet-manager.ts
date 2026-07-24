import { createSignal, createEffect, onCleanup } from "solid-js"
import { type PetName, type PetState, PET_STATES, DEFAULT_PET, getPetAnimationUrl } from "./pets"

const STORAGE_KEY_PET = "dalam.desktop.pet.name"
const STORAGE_KEY_POSITION = "dalam.desktop.pet.position"
const STORAGE_KEY_ENABLED = "dalam.desktop.pet.enabled"

function loadPetName(): PetName {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_PET)
    if (stored && isValidPetName(stored)) return stored
  } catch {}
  return DEFAULT_PET
}

function loadPosition(): { x: number; y: number } {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_POSITION)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (typeof parsed.x === "number" && typeof parsed.y === "number") return parsed
    }
  } catch {}
  return { x: window.innerWidth - 180, y: window.innerHeight - 180 }
}

function loadEnabled(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY_ENABLED)
    if (stored !== null) return stored === "true"
  } catch {}
  return true
}

function isValidPetName(value: string): value is PetName {
  return ["codepix", "dewey", "fireball", "hoots", "null-signal", "rocky", "seedy", "stacky"].includes(value)
}

export interface PetManager {
  readonly pet: () => PetName
  readonly state: () => PetState
  readonly animationUrl: () => string
  readonly isAnimating: () => boolean
  readonly position: () => { x: number; y: number }
  readonly enabled: () => boolean
  readonly setPet: (name: PetName) => void
  readonly setState: (state: PetState) => void
  readonly setPosition: (pos: { x: number; y: number }) => void
  readonly setEnabled: (value: boolean) => void
  readonly reset: () => void
}

export function createPetManager(): PetManager {
  const [pet, setPet] = createSignal<PetName>(loadPetName())
  const [state, setState] = createSignal<PetState>("idle")
  const [isAnimating, setIsAnimating] = createSignal(false)
  const [position, setPositionRaw] = createSignal(loadPosition())
  const [enabled, setEnabledRaw] = createSignal(loadEnabled())

  let animationTimeout: ReturnType<typeof setTimeout> | null = null

  const animationUrl = () => getPetAnimationUrl(pet(), state())

  const clearAnimationTimeout = () => {
    if (animationTimeout !== null) {
      clearTimeout(animationTimeout)
      animationTimeout = null
    }
  }

  const handleStateChange = (newState: PetState) => {
    clearAnimationTimeout()
    const stateInfo = PET_STATES[newState]

    if (!stateInfo.loop && stateInfo.duration) {
      setIsAnimating(true)
      animationTimeout = setTimeout(() => {
        setIsAnimating(false)
        setState("idle")
        animationTimeout = null
      }, stateInfo.duration)
    }
  }

  createEffect(() => {
    handleStateChange(state())
  })

  createEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PET, pet())
    } catch {}
  })

  createEffect(() => {
    const pos = position()
    try {
      localStorage.setItem(STORAGE_KEY_POSITION, JSON.stringify(pos))
    } catch {}
  })

  createEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ENABLED, String(enabled()))
    } catch {}
  })

  onCleanup(() => {
    clearAnimationTimeout()
  })

  return {
    pet,
    state,
    animationUrl,
    isAnimating,
    position,
    enabled,
    setPet: (name: PetName) => {
      setPet(name)
    },
    setState: (newState: PetState) => {
      setState(newState)
    },
    setPosition: (pos: { x: number; y: number }) => {
      setPositionRaw(pos)
    },
    setEnabled: (value: boolean) => {
      setEnabledRaw(value)
    },
    reset: () => {
      clearAnimationTimeout()
      setPet(DEFAULT_PET)
      setState("idle")
      setIsAnimating(false)
      setPositionRaw(loadPosition())
      setEnabledRaw(true)
    },
  }
}

export function mapAgentStateToPetState(agentState: string): PetState {
  switch (agentState) {
    case "idle":
    case "waiting":
      return "idle"
    case "running":
    case "processing":
    case "thinking":
      return "running"
    case "failed":
    case "error":
      return "failed"
    case "reviewing":
      return "review"
    case "completed":
    case "done":
      return "waving"
    default:
      return "idle"
  }
}
