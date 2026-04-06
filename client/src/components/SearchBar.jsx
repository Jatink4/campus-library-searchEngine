import React, { useState, useRef, useEffect } from 'react'

function debounce(fn, delay) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(false)
  const containerRef = useRef(null)

  const fetchSuggestions = async (q) => {
    const trimmed = q.trim()
    if (trimmed.length <= 2) {
      setSuggestions([])
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`/search/auto-complete`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: trimmed })
      })
      if (res.ok) {
        const data = await res.json()
        setSuggestions(Array.isArray(data) ? data : data.hits || [])
      } else {
        setSuggestions([])
      }
    } catch (e) {
      setSuggestions([])
    }
    setLoading(false)
  }

  // debounced version
  const debouncedFetch = useRef(debounce(fetchSuggestions, 300)).current

  useEffect(() => {
    debouncedFetch(query)
  }, [query, debouncedFetch])

  const handleSubmit = (e) => {
    e && e.preventDefault()
    const trimmed = query.trim()
    if (trimmed.length > 2) {
      fetchSuggestions(trimmed)
    }
  }

  return (
    <div className="search-container" ref={containerRef}>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          placeholder="Search books, authors, tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="search"
        />
        <button className="search-button" type="submit">Enter</button>
      </form>

      <div className={`suggestions ${suggestions.length ? 'visible' : ''}`}>
        {loading && <div className="suggestion-item">Loading...</div>}
        {!loading && suggestions.length === 0 && query.trim().length > 2 && (
          <div className="suggestion-item">No results</div>
        )}
        {!loading && suggestions.map((s, i) => (
          <div className="suggestion-item" key={i}>{typeof s === 'string' ? s : s.title || s._source?.title || JSON.stringify(s)}</div>
        ))}
      </div>
    </div>
  )
}
