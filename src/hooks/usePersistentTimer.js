import { useEffect, useRef, useState } from 'react'
import { loadTimer, saveTimer } from '../utils/storage.js'

const remainingFrom = timer => timer?.running && timer.endAt ? Math.max(0, Math.ceil((timer.endAt - Date.now()) / 1000)) : (timer?.remaining || 0)

export default function usePersistentTimer(onComplete) {
  const [timer, setTimer] = useState(() => {
    const saved = loadTimer()
    return saved ? { ...saved, remaining: remainingFrom(saved) } : null
  })
  const completed = useRef(false)
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete
  useEffect(() => saveTimer(timer), [timer])
  useEffect(() => {
    if (!timer?.running) return
    const tick = () => {
      setTimer(current => current ? { ...current, remaining: remainingFrom(current) } : null)
    }
    tick()
    const id = setInterval(tick, 500)
    return () => clearInterval(id)
  }, [timer?.running, timer?.endAt])
  useEffect(() => {
    if (timer?.running && timer.remaining <= 0 && !completed.current) {
      completed.current = true
      const quest = timer.quest
      setTimer(null)
      completeRef.current(quest)
    }
  }, [timer?.remaining, timer?.running])

  function prepare(quest) { completed.current = false; setTimer({ quest, remaining: quest.minutes * 60, running: false, endAt: null }) }
  function toggle() {
    setTimer(current => {
      if (!current) return null
      if (current.running) return { ...current, running: false, remaining: remainingFrom(current), endAt: null }
      return { ...current, running: true, endAt: Date.now() + current.remaining * 1000 }
    })
  }
  function cancel() { setTimer(null); completed.current = false }
  function demoFinish() { if (!timer) return; const quest = timer.quest; setTimer(null); completeRef.current(quest) }
  return { timer, prepare, toggle, cancel, demoFinish }
}
