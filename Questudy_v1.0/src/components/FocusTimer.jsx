export default function FocusTimer({ timer, onToggle, onCancel, onDemoFinish, demoMode }) {
  const total = timer.quest.minutes * 60
  const progress = Math.min(360, (total - timer.remaining) / total * 360)
  const format = n => `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`
  function cancel() { if (confirm('このクエストを中断しますか？経過時間は記録されません。')) onCancel() }
  return <div className="page timer-page fade-in"><span className="eyebrow">FOCUS QUEST</span><h2>{timer.quest.title}</h2><p>この時間だけ、ひとつのことに集中しよう。再読み込みしてもタイマーは続きます。</p><div className="timer-ring" style={{'--progress':`${progress}deg`}}><div><small>残り時間</small><strong>{format(timer.remaining)}</strong><span>{timer.running?'FOCUSING':'PAUSED'}</span></div></div><div className="timer-actions"><button className="secondary" onClick={cancel}>中断</button><button className="primary timer-toggle" onClick={onToggle}>{timer.running?'一時停止':timer.remaining===total?'開始する':'再開する'}</button></div>{demoMode&&<button className="demo-complete" onClick={onDemoFinish}>発表デモ用：完了にする</button>}</div>
}
