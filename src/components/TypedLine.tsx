import { useEffect, useRef, useState } from 'react'

const TYPE_MS = 45
const ERASE_MS = 22
const HOLD_MS = 1400

/**
 * Types each line once, then rests on the last one. The old site looped a
 * typed.js rotation forever; a single pass keeps the character without leaving
 * motion running on the page.
 *
 * Renders the final line up front so the prerendered page reads correctly
 * without JavaScript, then takes over on hydration.
 */
export default function TypedLine({ lines }: { lines: string[] }) {
  const last = lines[lines.length - 1]
  const [text, setText] = useState(last)
  const [typing, setTyping] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let line = 0
    let char = 0
    let erasing = false

    const step = () => {
      const current = lines[line]

      if (!erasing) {
        char++
        setText(current.slice(0, char))

        if (char === current.length) {
          if (line === lines.length - 1) {
            setTyping(false)
            return
          }
          erasing = true
          timer.current = setTimeout(step, HOLD_MS)
          return
        }
        timer.current = setTimeout(step, TYPE_MS)
        return
      }

      char--
      setText(current.slice(0, char))

      if (char === 0) {
        erasing = false
        line++
      }
      timer.current = setTimeout(step, ERASE_MS)
    }

    setText('')
    setTyping(true)
    timer.current = setTimeout(step, 250)

    return () => clearTimeout(timer.current)
  }, [lines])

  return (
    <p className="typed-line">
      <span className="sr-only">{last}</span>
      <span aria-hidden="true">
        {text}
        {typing && <span className="caret" />}
      </span>
    </p>
  )
}
