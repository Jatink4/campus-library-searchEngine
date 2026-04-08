import React from 'react'
import './SearchResults.css'

function SearchResults({ results, isLoading, onSelectBook, onClose }) {
  if (isLoading) {
    return (
      <div className="search-results">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Searching...</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <svg className="no-results-icon" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <p>No books found</p>
          <button className="close-search-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    )
  }

  return (
    <div className="search-results">
      <div className="results-header">
        <span className="results-count">Found {results.length} books</span>
        <button className="close-search-btn" onClick={onClose}>✕</button>
      </div>
      <div className="results-grid">
        {results.map((result) => {
          const book = result._source
          return (
            <div
              key={book.id}
              className="result-card"
              onClick={() => onSelectBook(book.id)}
            >
              <div className="result-card-icon">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="currentColor">
                  <path d="M4 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                  <path d="M8 8h6M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
                </svg>
              </div>
              <div className="result-card-content">
                <h3 className="result-card-title">{book.title}</h3>
                <p className="result-card-author">by {book.authors.join(', ')}</p>
                <p className="result-card-publisher">{book.publisher}</p>
                <div className="result-card-meta">
                  <span className="result-meta-badge">{book.edition}</span>
                  <span className="result-meta-badge">{book.publication_year}</span>
                </div>
              </div>
              <div className="result-card-arrow">→</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default SearchResults
