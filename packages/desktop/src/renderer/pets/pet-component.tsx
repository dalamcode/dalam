import { createSignal, createEffect, Show, For, onCleanup, createMemo } from "solid-js"
import { createPetManager, mapAgentStateToPetState } from "./pet-manager"
import { PETS, ALL_PET_NAMES, type PetName } from "./pets"

export interface PetComponentProps {
  readonly agentState?: string
}

export function PetComponent(props: PetComponentProps) {
  const manager = createPetManager()
  const [showSelector, setShowSelector] = createSignal(false)
  const [isDragging, setIsDragging] = createSignal(false)
  const [isHovering, setIsHovering] = createSignal(false)
  const [imageError, setImageError] = createSignal(false)
  const [isWalking, setIsWalking] = createSignal(false)
  const [walkDirection, setWalkDirection] = createSignal<"left" | "right">("right")

  let dragStartPos = { x: 0, y: 0 }
  let hasMoved = false
  let walkInterval: ReturnType<typeof setInterval> | null = null
  let walkTimeout: ReturnType<typeof setTimeout> | null = null

  createEffect(() => {
    if (props.agentState) {
      manager.setState(mapAgentStateToPetState(props.agentState))
    }
  })

  // Idle wandering — pet moves around randomly when idle
  const startWalking = () => {
    if (!manager.enabled() || isDragging()) return
    const dir = Math.random() > 0.5 ? "right" : "left"
    setWalkDirection(dir)
    setIsWalking(true)
    manager.setState(dir === "right" ? "running-right" : "running-left")

    const distance = 40 + Math.random() * 80
    const step = dir === "right" ? 2 : -2
    let moved = 0

    walkInterval = setInterval(() => {
      if (moved >= distance || isDragging()) {
        stopWalking()
        return
      }
      const pos = manager.position()
      const newX = pos.x + step
      const clamped = Math.max(0, Math.min(window.innerWidth - 128, newX))
      manager.setPosition({ x: clamped, y: pos.y })
      moved += Math.abs(step)
    }, 30)

    walkTimeout = setTimeout(() => {
      stopWalking()
    }, 5000)
  }

  const stopWalking = () => {
    if (walkInterval) { clearInterval(walkInterval); walkInterval = null }
    if (walkTimeout) { clearTimeout(walkTimeout); walkTimeout = null }
    setIsWalking(false)
    if (manager.state() === "running-left" || manager.state() === "running-right") {
      manager.setState("idle")
    }
  }

  // Start idle wandering when enabled and idle
  createEffect(() => {
    if (!manager.enabled() || isDragging() || showSelector()) {
      stopWalking()
      return
    }
    const s = manager.state()
    if (s !== "idle" && s !== "waiting") return

    const delay = 3000 + Math.random() * 7000
    const timeout = setTimeout(startWalking, delay)
    onCleanup(() => {
      clearTimeout(timeout)
      stopWalking()
    })
  })

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    dragStartPos = { x: e.clientX, y: e.clientY }
    hasMoved = false
    setIsDragging(true)
    stopWalking()

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartPos.x
      const dy = e.clientY - dragStartPos.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true
      if (hasMoved) {
        const pos = manager.position()
        manager.setPosition({ x: pos.x + dx, y: pos.y + dy })
        dragStartPos = { x: e.clientX, y: e.clientY }
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
  }

  const handleClick = () => {
    if (hasMoved) return
    if (!manager.enabled()) return
    manager.setState("jumping")
  }

  const handleDoubleClick = () => {
    if (hasMoved) return
    if (!manager.enabled()) return
    manager.setState("waving")
  }

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowSelector(!showSelector())
  }

  const handlePetSelect = (name: PetName) => {
    manager.setPet(name)
    if (!manager.enabled()) {
      manager.setEnabled(true)
    }
  }

  const handleToggleEnabled = () => {
    manager.setEnabled(!manager.enabled())
  }

  const closeSelector = () => setShowSelector(false)

  createEffect(() => {
    if (showSelector()) {
      document.addEventListener("click", closeSelector)
      onCleanup(() => document.removeEventListener("click", closeSelector))
    }
  })

  const handleImageError = () => {
    setImageError(true)
  }

  const handleImageLoad = () => {
    setImageError(false)
  }

  const petName = createMemo(() => manager.pet())
  const currentState = createMemo(() => manager.state())
  const petConfig = createMemo(() => PETS[petName()])
  const currentUrl = createMemo(() => {
    if (imageError()) return `/pets/${petName()}/idle.webp`
    return manager.animationUrl()
  })

  onCleanup(() => {
    stopWalking()
  })

  return (
    <Show when={manager.enabled()}>
      <div
        class="pet-container"
        classList={{
          "pet-dragging": isDragging(),
          "pet-hovering": isHovering(),
        }}
        style={{
          position: "fixed",
          left: `${manager.position().x}px`,
          top: `${manager.position().y}px`,
          "transform": walkDirection() === "left" && isWalking() ? "scaleX(-1)" : undefined,
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onDblClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        role="img"
        aria-label={petConfig().displayName}
        aria-description={`Pet is ${currentState()}`}
      >
        <img
          src={currentUrl()}
          alt={petConfig().displayName}
          class="pet-animation"
          draggable="false"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />

        <Show when={isHovering() && !isDragging()}>
          <div class="pet-tooltip" role="tooltip">{petConfig().displayName}</div>
        </Show>

        <Show when={showSelector()}>
          <div class="pet-selector" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Pet selector">
            <div class="pet-selector-header">
              <span class="pet-selector-title">Pet</span>
              <button class="pet-selector-close" onClick={() => setShowSelector(false)} aria-label="Close pet selector">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </button>
            </div>

            <div class="pet-toggle-row">
              <span class="pet-toggle-label">Enable pet companion</span>
              <button
                class="pet-toggle-switch"
                classList={{ "pet-toggle-on": manager.enabled() }}
                onClick={handleToggleEnabled}
                role="switch"
                aria-checked={manager.enabled()}
                aria-label={manager.enabled() ? "Disable pet" : "Enable pet"}
              >
                <span class="pet-toggle-knob" />
              </button>
            </div>

            <div class="pet-selector-divider" />
            <div class="pet-selector-list" role="listbox" aria-label="Select a pet">
              <For each={ALL_PET_NAMES}>
                {(name) => (
                  <div
                    class="pet-option"
                    classList={{ "pet-option-active": petName() === name }}
                    onClick={() => handlePetSelect(name)}
                    role="option"
                    aria-selected={petName() === name}
                    tabindex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handlePetSelect(name)
                    }}
                  >
                    <img
                      src={`/pets/${name}/idle.webp`}
                      alt={PETS[name].displayName}
                      class="pet-option-icon"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `/pets/${name}/idle.webp`
                      }}
                    />
                    <div class="pet-option-info">
                      <span class="pet-option-name">{PETS[name].displayName}</span>
                      <span class="pet-option-desc">{PETS[name].description}</span>
                    </div>
                    <Show when={petName() === name}>
                      <svg class="pet-option-check" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                        <path d="M13.3 4.7L6.0 12.0L2.7 8.7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>
    </Show>
  )
}
