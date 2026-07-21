/**
 * Check whether a keyboard event is part of an active IME composition
 * session (e.g. Korean Hangul, Japanese Kana, Chinese Pinyin).
 *
 * Uses both the standard DOM `isComposing` property and the legacy
 * `keyCode === 229` fallback for older browsers or edge cases where
 * `isComposing` isn't reliably set during composition.
 */
export function isImeEvent(event: { isComposing: boolean; keyCode: number }): boolean {
  return event.isComposing || event.keyCode === 229
}

/**
 * Create an IME-checking function that combines the event-level check
 * (`isImeEvent`) with a manual `composing` signal for `contenteditable`
 * editors where the browser may not reliably set `isComposing` during
 * composition (e.g. Korean/Chinese IME in some browsers).
 *
 * The returned function should be called with each KeyboardEvent. The
 * signal should be set via `onCompositionStart` / `onCompositionEnd`
 * event handlers on the editor element.
 *
 * @example
 * const [composing, setComposing] = createSignal(false)
 * const isImeComposing = createIsImeComposing(() => composing())
 * // ...
 * <div contenteditable
 *   onCompositionStart={() => setComposing(true)}
 *   onCompositionEnd={() => setComposing(false)}
 *   onKeyDown={(e) => { if (isImeComposing(e)) return }} />
 */
export function createIsImeComposing(getComposing: () => boolean) {
  return (event: { isComposing: boolean; keyCode: number }): boolean => {
    return isImeEvent(event) || getComposing()
  }
}
