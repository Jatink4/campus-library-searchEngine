import React from 'react'
import SearchBar from './components/SearchBar'

export default function App() {
  return (
    <div className="app-root">
      <nav className="navbar">
        <div className="brand">
          <div className="logo">🔎</div>
          <div className="title">Inverto</div>
        </div>
      </nav>
      <main className="main">
        <SearchBar />
      </main>
    </div>
  )
}
