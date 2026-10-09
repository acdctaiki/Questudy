import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles.css'

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (!this.state.error) return this.props.children
    return <div className="startup-error">
      <div>
        <h1>Questudyを起動できませんでした</h1>
        <p>保存データを初期化すると復旧できる可能性があります。</p>
        <button className="primary" onClick={() => {
          localStorage.removeItem('questudy-v3-state')
          localStorage.removeItem('questudy-v3-timer')
          location.reload()
        }}>保存データを初期化して再起動</button>
        <details><summary>エラー詳細</summary><pre>{String(this.state.error)}</pre></details>
      </div>
    </div>
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>,
)
