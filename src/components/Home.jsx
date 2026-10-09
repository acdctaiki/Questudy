import { expNeeded, rewardPower } from '../utils/game.js'

export default function Home({ data, streak, onStart, navigate }) {
  const quest = data.quests[0]
  const needed = expNeeded(data.player.level)
  const progress = Math.min(100, data.player.exp / needed * 100)
  return <div className="page fade-in"><section className="hero"><div><span className="eyebrow">CHAPTER {String(data.enemy.id).padStart(2,'0')}　{data.enemy.name}</span><h1>{data.cleared ? '今日も冒険を、' : '最初の一歩を、'}<br/><em>始めよう。</em></h1><p>積み重ねた時間が、君の力になる。</p></div><div className="hero-orb"><span>✦</span></div></section>
    <section className="level-card"><div className="level-badge"><small>LEVEL</small><strong>{data.player.level}</strong></div><div className="level-info"><div><strong>{data.player.name}</strong><span>{data.player.exp} / {needed} EXP</span></div><div className="progress"><i style={{width:`${progress}%`}}/></div><small>次のレベルまで あと {needed-data.player.exp} EXP　｜　連続 {streak}日</small></div></section>
    <div className="section-title"><div><span className="eyebrow">NEXT ACTION</span><h2>{quest ? '次のクエスト' : '準備完了'}</h2></div><button className="text-button" onClick={() => navigate('quests')}>一覧を見る →</button></div>
    {quest ? <section className="quest-featured"><div className="quest-icon">✎</div><div className="quest-copy"><span className="category">{quest.category}</span><h3>{quest.title}</h3><div className="reward"><span>◷ {quest.minutes}分</span><span>✦ +{quest.exp} EXP　⚡ +{rewardPower(quest.minutes)}</span></div></div><button className="primary" onClick={() => onStart(quest)}>開始する →</button></section> : <section className="empty"><span>＋</span><h3>次の学習目標を登録しよう</h3><button className="primary" onClick={() => navigate('questForm')}>クエストを作る</button></section>}
    <div className="quick-grid"><button onClick={() => navigate('questForm')}><b>＋</b><span>クエスト作成<small>新しい学習目標</small></span></button><button onClick={() => navigate('battle')}><b>⚔</b><span>バトル<small>現在の力：{data.player.power}</small></span></button><button onClick={() => navigate('status')}><b>▥</b><span>学習記録<small>累計 {data.player.totalMinutes}分</small></span></button></div>
  </div>
}
