import { enemyFor, localDateKey } from './game.js'

export const DATA_KEY = 'questudy-v3-state'
export const TIMER_KEY = 'questudy-v3-timer'

export const freshData = {
  onboarded: false,
  player: { name: '', level: 1, exp: 0, totalMinutes: 0, power: 0 },
  quests: [],
  cleared: 0,
  history: [],
  enemy: enemyFor(1),
  settings: { demoMode: true },
}

function migrateV2(old) {
  if (!old || typeof old !== 'object' || !old.player || typeof old.player !== 'object') return null
  const quests = Array.isArray(old.quests) ? old.quests : []
  const history = Array.isArray(old.history) ? old.history : []
  const enemyId = Math.max(1, Number(old.enemy?.id) || 1)
  return {
    ...freshData,
    ...old,
    player: { ...freshData.player, ...old.player },
    quests,
    enemy: { ...enemyFor(enemyId, Number(old.enemy?.defeated) || 0), ...(old.enemy || {}), id: enemyId },
    history: history.filter(Boolean).map(h => ({ ...h, completedAt: h.completedAt || new Date().toISOString(), dateKey: h.dateKey || localDateKey() })),
    settings: { ...freshData.settings, ...(old.settings || {}) },
  }
}

export function loadData() {
  try {
    const current = JSON.parse(localStorage.getItem(DATA_KEY))
    const normalizedCurrent = migrateV2(current)
    if (normalizedCurrent) return normalizedCurrent
    const previous = JSON.parse(localStorage.getItem('questudy-v2-state'))
    return migrateV2(previous) || freshData
  } catch { return freshData }
}

export function saveData(data) { try { localStorage.setItem(DATA_KEY, JSON.stringify(data)) } catch { /* 保存できない環境でも表示は続ける */ } }
export function loadTimer() {
  try {
    const timer = JSON.parse(localStorage.getItem(TIMER_KEY))
    return timer && typeof timer === 'object' && timer.quest && Number.isFinite(Number(timer.remaining)) ? timer : null
  } catch { return null }
}
export function saveTimer(timer) {
  try { timer ? localStorage.setItem(TIMER_KEY, JSON.stringify(timer)) : localStorage.removeItem(TIMER_KEY) } catch { /* 表示を優先 */ }
}
