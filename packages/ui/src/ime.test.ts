import { describe, expect, test } from "bun:test"
import { createIsImeComposing, isImeEvent } from "./ime"

function event(overrides?: Partial<{ isComposing: boolean; keyCode: number }>) {
  return { isComposing: false, keyCode: 0, ...overrides }
}

describe("isImeEvent", () => {
  test("returns true when isComposing is true", () => {
    expect(isImeEvent(event({ isComposing: true, keyCode: 13 }))).toBe(true)
  })

  test("returns true when keyCode is 229 (legacy fallback)", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 229 }))).toBe(true)
  })

  test("returns true when both isComposing and keyCode 229 are set", () => {
    expect(isImeEvent(event({ isComposing: true, keyCode: 229 }))).toBe(true)
  })

  test("returns false for normal Enter press", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 13 }))).toBe(false)
  })

  test("returns false for normal Escape press", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 27 }))).toBe(false)
  })

  test("returns false for normal ArrowUp press", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 38 }))).toBe(false)
  })

  test("returns false for normal ArrowDown press", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 40 }))).toBe(false)
  })

  test("returns false for normal Tab press", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 9 }))).toBe(false)
  })

  test("returns false for normal Space press", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 32 }))).toBe(false)
  })

  test("returns false for keyCode 0 (unknown key)", () => {
    expect(isImeEvent(event({ isComposing: false, keyCode: 0 }))).toBe(false)
  })
})

describe("createIsImeComposing", () => {
  test("returns true when composing signal is true regardless of event", () => {
    const isImeComposing = createIsImeComposing(() => true)
    expect(isImeComposing(event({ isComposing: false, keyCode: 13 }))).toBe(true)
    expect(isImeComposing(event({ isComposing: false, keyCode: 27 }))).toBe(true)
    expect(isImeComposing(event({ isComposing: true, keyCode: 13 }))).toBe(true)
  })

  test("returns true when event is IME event even if signal is false", () => {
    const isImeComposing = createIsImeComposing(() => false)
    expect(isImeComposing(event({ isComposing: true, keyCode: 13 }))).toBe(true)
    expect(isImeComposing(event({ isComposing: false, keyCode: 229 }))).toBe(true)
  })

  test("returns false for normal key events when not composing", () => {
    const isImeComposing = createIsImeComposing(() => false)
    expect(isImeComposing(event({ isComposing: false, keyCode: 13 }))).toBe(false)
    expect(isImeComposing(event({ isComposing: false, keyCode: 38 }))).toBe(false)
    expect(isImeComposing(event({ isComposing: false, keyCode: 9 }))).toBe(false)
  })

  test("isolates composing signal across instances", () => {
    const getA = () => true
    const getB = () => false
    const checkA = createIsImeComposing(getA)
    const checkB = createIsImeComposing(getB)

    const normalEnter = event({ isComposing: false, keyCode: 13 })
    expect(checkA(normalEnter)).toBe(true)
    expect(checkB(normalEnter)).toBe(false)
  })

  test("respects dynamic composing signal changes", () => {
    let composing = false
    const isImeComposing = createIsImeComposing(() => composing)
    const evt = event({ isComposing: false, keyCode: 13 })

    expect(isImeComposing(evt)).toBe(false)

    composing = true
    expect(isImeComposing(evt)).toBe(true)

    composing = false
    expect(isImeComposing(evt)).toBe(false)
  })
})
