import React, { useEffect, useState } from 'react'
import Layout from './components/Layout.jsx'
import Onboarding from './components/Onboarding.jsx'
import Home from './components/Home.jsx'
import QuestList from './components/QuestList.jsx'
import QuestForm from './components/QuestForm.jsx'
import FocusTimer from './components/FocusTimer.jsx'
import Result from './components/Result.jsx'
import Battle from './components/Battle.jsx'
import Status from './components/Status.jsx'
import useQuestudyData from './hooks/useQuestudyData.js'
import usePersistentTimer from './hooks/usePersistentTimer.js'

export default function App() {
  const questudy = useQuestudyData()
  const { data, derived } = questudy
  const [view, setView] = useState('home')
  const [editing, setEditing] = useState(null)
  const [result, setResult] = useState(null)
  const timer = usePersistentTimer(quest => {
    const outcome = questudy.completeQuest(quest)
    setResult(outcome)
    setView('result')
  })

  useEffect(() => { if (timer.timer && view === 'home') setView('timer') }, [])

  function navigate(next) {
    if (timer.timer && next === 'quests') next = 'timer'
    if (timer.timer && next !== 'timer' && timer.timer.running) {
      if (!confirm('集中タイマーが動いています。別の画面へ移動しますか？タイマーは裏で継続します。')) return
    }
    setView(next)
  }
  function startQuest(quest) { timer.prepare(quest); setView('timer') }
  function createQuest() { setEditing(null); setView('questForm') }
  function editQuest(quest) { setEditing(quest); setView('questForm') }
  function saveQuest(quest) { questudy.saveQuest(quest); setEditing(null); setView('quests') }
  function cancelTimer() { timer.cancel(); setView('quests') }
  function reset() { timer.cancel(); questudy.reset(); setView('home') }

  if (!data.onboarded) return <Onboarding onBegin={questudy.onboard}/>
  return <Layout data={data} view={view} navigate={navigate}>
    {view === 'home' && <Home data={data} streak={derived.streak} onStart={startQuest} navigate={navigate}/>} 
    {view === 'quests' && <QuestList quests={data.quests} onStart={startQuest} onEdit={editQuest} onDelete={questudy.deleteQuest} onCreate={createQuest}/>} 
    {view === 'questForm' && <QuestForm initial={editing} onSave={saveQuest} onCancel={() => navigate('quests')}/>} 
    {view === 'timer' && timer.timer && <FocusTimer timer={timer.timer} onToggle={timer.toggle} onCancel={cancelTimer} onDemoFinish={timer.demoFinish} demoMode={data.settings.demoMode}/>} 
    {view === 'result' && result && <Result result={result} navigate={navigate}/>} 
    {view === 'battle' && <Battle data={data} onAttack={questudy.attack}/>} 
    {view === 'status' && <Status data={data} streak={derived.streak} week={derived.week} onToggleDemo={questudy.toggleDemoMode} onReset={reset}/>} 
  </Layout>
}
