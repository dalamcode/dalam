import { createSignal, createEffect, Show, For, onCleanup } from "solid-js"
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

  let dragStartPos = { x: 0, y: 0 }
  let hasMoved = false

  createEffect(() => {
    if (props.agentState) {
      manager.setState(mapAgentStateToPetState(props.agentState))
    }
  })

  const handleMouseDown = (e: MouseEvent) => {
    if (e.button !== 0) return
    e.preventDefault()
    dragStartPos = { x: e.clientX, y: e.clientY }
    hasMoved = false
    setIsDragging(true)

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStartPos.x
      const dy = e.clientY - dragStartPos.y
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) hasMoved = true
      if (hasMoved) {
        manager.setPosition({
          x: manager.position().x + dx,
          y: manager.position().y + dy,
        })
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
    manager.setState("jumping")
  }

  const handleDoubleClick = () => {
    if (hasMoved) return
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

  const pos = manager.position()

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
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        onDblClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={manager.animationUrl()}
          alt={PETS[manager.pet()].displayName}
          class="pet-animation"
          draggable="false"
        />

        <Show when={isHovering() && !isDragging()}>
          <div class="pet-tooltip">{PETS[manager.pet()].displayName}</div>
        </Show>

        <Show when={showSelector()}>
          <div class="pet-selector" onClick={(e) => e.stopPropagation()}>
            <div class="pet-selector-header">
              <span class="pet-selector-title">Pet</span>
              <button class="pet-selector-close" onClick={() => setShowSelector(false)}>
                x
              </button>
            </div>

            <div class="pet-toggle-row">
              <span class="pet-toggle-label">Enabled</span>
              <button
                class="pet-toggle-switch"
                classList={{ "pet-toggle-on": manager.enabled() }}
                onClick={handleToggleEnabled}
              >
                <span class="pet-toggle-knob" />
              </button>
            </div>

            <Show when={manager.enabled()}>
              <div class="pet-selector-divider" />
              <div class="pet-selector-list">
                <For each={ALL_PET_NAMES}>
                  {(name) => (
                    <div
                      class="pet-option"
                      classList={{ "pet-option-active": manager.pet() === name }}
                      onClick={() => handlePetSelect(name)}
                    >
                      <img
                        src={`/pets/${name}/idle.webp`}
                        alt={PETS[name].displayName}
                        class="pet-option-icon"
                      />
                      <div class="pet-option-info">
                        <span class="pet-option-name">{PETS[name].displayName}</span>
                        <span class="pet-option-desc">{PETS[name].description}</span>
                      </div>
                      <Show when={manager.pet() === name}>
                        <span class="pet-option-check">x</span>
                      </Show>
                    </div>
                  )}
                </For>
              </div>
            </Show>
          </div>
        </Show>
      </div>
    </Show>
  )
}
