import { expNeeded } from '../utils/game.js'
import { PageHead } from './Common.jsx'

export default function Status({ data, streak, week, onToggleDemo, onReset }) {
  const needed = expNeeded(data.player.level)
  const progress = Math.min(100, data.player.exp / needed * 100)
  const max = Math.max(30, ...week.map(d => d.minutes))
  function reset() { if (confirm('すべての学習記録を削除して最初から始めますか？')) onReset() }
  return <div className="page fade-in"><PageHead eyebrow="ADVENTURE LOG" title="学習記録" copy="積み上げた努力を振り返ろう。"/><section className="status-hero"><div className="big-avatar">⚔</div><div><span>LEVEL {data.player.level}</span><h2>{data.player.name}</h2><div className="progress"><i style={{width:`${progress}%`}}/></div><small>{data.player.exp} / {needed} EXP</small></div></section><div className="status-grid"><div><span>総学習時間</span><strong>{data.player.totalMinutes}<small>分</small></strong></div><div><span>達成クエスト</span><strong>{data.cleared}<small>件</small></strong></div><div><span>連続学習</span><strong>{streak}<small>日</small></strong></div></div>
    <section className="panel weekly-panel"><div className="section-title compact"><div><span className="eyebrow">THIS WEEK</span><h2>今週の学習時間</h2></div><strong>{week.reduce((s,d)=>s+d.minutes,0)}<small> MIN</small></strong></div><div className="bars">{week.map(d=><div key={d.key}><b>{d.minutes||''}</b><i className={d.today?'today':''} style={{height:`${Math.max(4,d.minutes/max*100)}%`}}/><span>{d.label}</span></div>)}</div></section>
    <section className="history"><h2>最近の学習</h2>{data.history.length?data.history.map(h=><div key={h.id}><span>{new Date(h.completedAt).toLocaleDateString('ja-JP')}</span><strong>{h.title}</strong><b>{h.minutes}分</b></div>):<p>クエストを完了すると、ここに記録されます。</p>}</section>
    <section className="settings-panel"><div><h2>発表デモモード</h2><p>タイマー画面に「今すぐ完了」を表示します。</p></div><button className={`switch ${data.settings.demoMode?'on':''}`} onClick={onToggleDemo}>{data.settings.demoMode?'ON':'OFF'}</button></section><button className="reset-button" onClick={reset}>データをリセット</button>
  </div>
}
