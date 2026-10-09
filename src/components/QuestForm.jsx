import { useEffect, useState } from 'react'
import { rewardPower } from '../utils/game.js'
import { PageHead } from './Common.jsx'

export default function QuestForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ title:'', category:'大学', minutes:25 })
  useEffect(() => setForm(initial || { title:'', category:'大学', minutes:25 }), [initial])
  function submit(e) { e.preventDefault(); if (!form.title.trim()) return; onSave(form) }
  return <div className="page narrow fade-in"><PageHead eyebrow={initial?'EDIT QUEST':'NEW QUEST'} title={initial?'クエストを編集':'クエストを作る'} copy="達成できる大きさに区切るのがコツ。"/><form className="form-card" onSubmit={submit}><label>クエスト名<input autoFocus required maxLength="40" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="例：SPIを15分解く"/></label><label>カテゴリ<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>大学</option><option>就活</option><option>語学</option><option>資格</option><option>その他</option></select></label><label>集中時間<div className="duration"><input type="range" min="5" max="120" step="5" value={form.minutes} onChange={e=>setForm({...form,minutes:Number(e.target.value)})}/><strong>{form.minutes}<small>分</small></strong></div></label><div className="reward-preview"><span>達成報酬</span><strong>✦ {form.minutes} EXP　⚡ {rewardPower(form.minutes)}</strong></div><div className="form-actions"><button type="button" className="secondary" onClick={onCancel}>戻る</button><button className="primary">{initial?'変更を保存':'登録する'} →</button></div></form></div>
}
