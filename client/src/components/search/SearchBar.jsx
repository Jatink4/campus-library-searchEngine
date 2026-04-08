import React, { useState, useEffect } from 'react'
import AutocompleteResults from './AutocompleteResults'
import './SearchBar.css'

function SearchBar({ onSelectBook, onSearch }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Debounced autocomplete search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performAutocomplete(query)
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timer)
  }, [query])

  const performAutocomplete = async (searchQuery) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/search/auto-complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: searchQuery }),
      })
      const data = await response.json()
      setResults(data || [])
      setShowResults(true)
    } catch (error) {
      console.error('Error fetching autocomplete:', error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectResult = (bookId) => {
    onSelectBook(bookId)
    setShowResults(false)
    setQuery('')
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (query.trim()) {
        onSearch(query)
        setShowResults(false)
      }
    }
  }

  const handleSearchClick = () => {
    if (query.trim()) {
      onSearch(query)
      setShowResults(false)
    }
  }

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search for books, authors, topics..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleEnter}
          onFocus={() => query && setShowResults(true)}
        />
        {query && (
          <button className="clear-btn" onClick={() => { setQuery(''); setShowResults(false); }} title="Clear search">
            ✕
          </button>
        )}
        <button className="search-btn" onClick={handleSearchClick} title="Search all books">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M5 12h14M12 5v14"></path>
          </svg>
          <span>Enter</span>
        </button>
      </div>

      {showResults && (
        <AutocompleteResults
          results={results}
          isLoading={isLoading}
          onSelectBook={handleSelectResult}
        />
      )}
    </div>
  )
}

export default SearchBar
