import { Logo, NavButton } from './Common.jsx'

export default function Layout({ data, view, navigate, children }) {
  const questActive = ['quests', 'questForm', 'timer'].includes(view)
  return <div className="app-shell">
    <aside className="sidebar"><Logo onClick={() => navigate('home')} /><nav>
      <NavButton active={view === 'home'} icon="⌂" label="ホーム" onClick={() => navigate('home')} />
      <NavButton active={questActive} icon="◇" label="クエスト" onClick={() => navigate('quests')} />
      <NavButton active={view === 'battle'} icon="⚔" label="バトル" onClick={() => navigate('battle')} />
      <NavButton active={view === 'status'} icon="▥" label="記録" onClick={() => navigate('status')} />
    </nav><div className="sidebar-card"><span className="tiny-label">BATTLE POWER</span><strong>⚡ {data.player.power}</strong><p>学習5分ごとに1回復</p></div><div className="profile-mini"><div className="avatar">⚔</div><div><strong>{data.player.name}</strong><small>LEVEL {data.player.level}</small></div></div></aside>
    <main><header className="mobile-header"><Logo onClick={() => navigate('home')} /><span>Lv.{data.player.level}</span></header>{children}</main>
    <nav className="bottom-nav"><NavButton active={view === 'home'} icon="⌂" label="ホーム" onClick={() => navigate('home')} /><NavButton active={questActive} icon="◇" label="クエスト" onClick={() => navigate('quests')} /><NavButton active={view === 'battle'} icon="⚔" label="バトル" onClick={() => navigate('battle')} /><NavButton active={view === 'status'} icon="▥" label="記録" onClick={() => navigate('status')} /></nav>
  </div>
}
