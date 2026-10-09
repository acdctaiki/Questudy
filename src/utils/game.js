export const expNeeded = level => 50 + level * 25
export const rewardPower = minutes => Math.max(1, Math.ceil(minutes / 5))

export function applyExperience(level, exp, gained) {
  let nextLevel = level
  let nextExp = exp + gained
  while (nextExp >= expNeeded(nextLevel)) {
    nextExp -= expNeeded(nextLevel)
    nextLevel += 1
  }
  return { level: nextLevel, exp: nextExp, levelUp: nextLevel > level }
}

export function enemyFor(id, defeated = 0) {
  const enemies = [
    ['怠惰のスライム', '◉'],
    ['誘惑のゴーレム', '♜'],
    ['先延ばしの竜', '♞'],
    ['無気力の魔王', '♛'],
  ]
  const [name, symbol] = enemies[Math.min(id - 1, enemies.length - 1)]
  const maxHp = 45 + id * 25
  return { id, name, symbol, hp: maxHp, maxHp, defeated }
}

export function localDateKey(value = new Date()) {
  const d = new Date(value)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function calculateStreak(history) {
  const dates = new Set(history.map(h => h.dateKey || localDateKey(h.completedAt)))
  let cursor = new Date()
  if (!dates.has(localDateKey(cursor))) cursor.setDate(cursor.getDate() - 1)
  let streak = 0
  while (dates.has(localDateKey(cursor))) {
    streak += 1
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

export function weeklyStats(history) {
  const today = new Date()
  const monday = new Date(today)
  const day = (today.getDay() + 6) % 7
  monday.setHours(0, 0, 0, 0)
  monday.setDate(today.getDate() - day)
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + index)
    const key = localDateKey(date)
    const minutes = history.filter(h => (h.dateKey || localDateKey(h.completedAt)) === key).reduce((sum, h) => sum + h.minutes, 0)
    return { label: ['月','火','水','木','金','土','日'][index], key, minutes, today: key === localDateKey() }
  })
}
