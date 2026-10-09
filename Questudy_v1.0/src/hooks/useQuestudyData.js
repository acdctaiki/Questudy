import { useEffect, useMemo, useState } from 'react'
import { applyExperience, calculateStreak, enemyFor, localDateKey, rewardPower, weeklyStats } from '../utils/game.js'
import { DATA_KEY, freshData, loadData, saveData } from '../utils/storage.js'

export default function useQuestudyData() {
  const [data, setData] = useState(loadData)
  useEffect(() => saveData(data), [data])

  const derived = useMemo(() => ({ streak: calculateStreak(data.history), week: weeklyStats(data.history) }), [data.history])

  function onboard(name) {
    setData({ ...freshData, onboarded: true, player: { ...freshData.player, name: name.trim() || '駆け出しの学徒' }, quests: [{ id: crypto.randomUUID(), title: '最初の15分に集中する', category: 'チュートリアル', minutes: 15, exp: 15 }] })
  }
  function saveQuest(input) {
    const quest = { ...input, title: input.title.trim(), minutes: Number(input.minutes), exp: Number(input.minutes) }
    setData(d => quest.id ? { ...d, quests: d.quests.map(q => q.id === quest.id ? quest : q) } : { ...d, quests: [...d.quests, { ...quest, id: crypto.randomUUID() }] })
  }
  function deleteQuest(id) { setData(d => ({ ...d, quests: d.quests.filter(q => q.id !== id) })) }
  function completeQuest(quest) {
    const growth = applyExperience(data.player.level, data.player.exp, quest.exp)
    const power = rewardPower(quest.minutes)
    const outcome = { quest, power, ...growth }
    setData(d => {
      return { ...d,
        player: { ...d.player, level: growth.level, exp: growth.exp, totalMinutes: d.player.totalMinutes + quest.minutes, power: d.player.power + power },
        quests: d.quests.filter(q => q.id !== quest.id),
        cleared: d.cleared + 1,
        history: [{ id: crypto.randomUUID(), title: quest.title, category: quest.category, minutes: quest.minutes, completedAt: new Date().toISOString(), dateKey: localDateKey() }, ...d.history].slice(0, 100),
      }
    })
    return outcome
  }
  function attack() {
    if (data.player.power <= 0) return null
    const damage = 10 + data.player.level * 2
    const hp = Math.max(0, data.enemy.hp - damage)
    const event = hp > 0
      ? { damage, defeated: false, name: data.enemy.name }
      : { damage: data.enemy.hp, defeated: true, name: data.enemy.name }
    setData(d => {
      if (d.player.power <= 0) return d
      const nextHp = Math.max(0, d.enemy.hp - (10 + d.player.level * 2))
      if (nextHp > 0) {
        return { ...d, player: { ...d.player, power: d.player.power - 1 }, enemy: { ...d.enemy, hp: nextHp } }
      }
      return { ...d, player: { ...d.player, power: d.player.power - 1 }, enemy: enemyFor(d.enemy.id + 1, d.enemy.defeated + 1) }
    })
    return event
  }
  function toggleDemoMode() { setData(d => ({ ...d, settings: { ...d.settings, demoMode: !d.settings.demoMode } })) }
  function reset() { localStorage.removeItem(DATA_KEY); localStorage.removeItem('questudy-v2-state'); setData(freshData) }
  return { data, setData, derived, onboard, saveQuest, deleteQuest, completeQuest, attack, toggleDemoMode, reset }
}
