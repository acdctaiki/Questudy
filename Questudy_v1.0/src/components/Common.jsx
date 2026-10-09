export function Logo({ onClick }) {
  return <button className="brand" onClick={onClick}><span className="brand-mark">Q</span><span>QUESTUDY<small>STUDY ADVENTURE</small></span></button>
}
export function NavButton({ active, icon, label, onClick }) {
  return <button className={active ? 'nav-active' : ''} onClick={onClick}><span>{icon}</span>{label}</button>
}
export function PageHead({ eyebrow, title, copy }) {
  return <div className="page-head"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>
}
