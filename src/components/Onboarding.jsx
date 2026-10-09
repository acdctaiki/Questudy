import { useState } from 'react'
export default function Onboarding({ onBegin }) {
  const [name, setName] = useState('')
  return <div className="onboarding"><div className="onboard-card fade-in"><div className="onboard-logo">Q</div><span className="eyebrow">WELCOME TO QUESTUDY</span><h1>学びを、<em>冒険</em>に。</h1><p>現実の学習時間が、あなたの力になる。<br/>クエストを達成し、敵を倒して成長しよう。</p><form onSubmit={e => { e.preventDefault(); onBegin(name) }}><label>冒険者の名前</label><input value={name} onChange={e => setName(e.target.value)} placeholder="名前を入力" maxLength="16" autoFocus/><button className="primary">冒険を始める →</button></form><small>記録はこのブラウザに自動保存されます</small></div></div>
}
