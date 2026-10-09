import { rewardPower } from '../utils/game.js'
import { PageHead } from './Common.jsx'

export default function QuestList({ quests, onStart, onEdit, onDelete, onCreate }) {
  function remove(quest) { if (confirm(`「${quest.title}」を削除しますか？`)) onDelete(quest.id) }
  return <div className="page fade-in"><PageHead eyebrow="QUEST BOARD" title="クエスト" copy="やることを、達成したくなる冒険へ。"/><button className="primary add-wide" onClick={onCreate}>＋ 新しいクエスト</button><div className="quest-list">{quests.map((q,i)=><article className="quest-row" key={q.id}><div className="number">{String(i+1).padStart(2,'0')}</div><div><span className="category">{q.category}</span><h3>{q.title}</h3><p>◷ {q.minutes}分　<b>✦ {q.exp} EXP　⚡ {rewardPower(q.minutes)}</b></p></div><button className="edit-button" onClick={() => onEdit(q)}>編集</button><button className="delete-button" onClick={() => remove(q)} aria-label="削除">×</button><button className="circle-button" onClick={() => onStart(q)} aria-label="開始">→</button></article>)}</div>{!quests.length&&<div className="empty"><span>◇</span><h3>クエストがありません</h3><p>まずは15分ほどの小さな目標がおすすめ。</p></div>}</div>
}
