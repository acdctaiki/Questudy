import { useEffect, useState } from 'react'
import { PageHead } from './Common.jsx'

export default function Battle({ data, onAttack }) {
  const [event, setEvent] = useState(null)
  const [hitting, setHitting] = useState(false)
  const enemy = data.enemy
  const hp = enemy.hp / enemy.maxHp * 100
  function attack() {
    if (!data.player.power) return
    setHitting(true)
    const next = onAttack()
    setEvent(next)
    setTimeout(() => setHitting(false), 350)
  }
  useEffect(() => { if (!event) return; const id=setTimeout(()=>setEvent(null),2200); return()=>clearTimeout(id) }, [event])
  return <div className="page battle-page fade-in"><PageHead eyebrow={`CHAPTER ${String(enemy.id).padStart(2,'0')}`} title="集中を阻む敵" copy="学習で蓄えた力を使い、先延ばしを打ち破れ。"/><div className={`battle-arena ${hitting?'is-hitting':''}`}><div className="enemy-name"><span>ENEMY</span><h2>{enemy.name}</h2><div className="enemy-hp"><i style={{width:`${hp}%`}}/></div><small>HP {enemy.hp} / {enemy.maxHp}</small></div><div className="enemy-art">{enemy.symbol || '◉'}</div>{event&&<div className={`damage-pop ${event.defeated?'defeat':''}`}>{event.defeated?`${event.name}を撃破！`:`-${event.damage} DAMAGE`}</div>}<div className="battle-power"><span>所持バトル力</span><strong>⚡ {data.player.power}</strong></div><button className="primary attack-button" disabled={!data.player.power} onClick={attack}>{data.player.power?'集中斬り（力を1消費）':'クエストを達成して力をためよう'}</button></div><p className="battle-note">撃破数：{enemy.defeated}体　｜　1回のダメージ：{10+data.player.level*2}</p></div>
}
