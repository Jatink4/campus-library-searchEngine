import React from 'react'
import './SearchResultsList.css'

function SearchResultsList({ results, isLoading, onSelectBook }) {
  if (isLoading) {
    return (
      <div className="search-results-list">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Searching...</p>
        </div>
      </div>
    )
  }

  if (!results || results.length === 0) {
    return (
      <div className="search-results-list">
        <div className="no-results">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <p>No books found. Try a different search.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="search-results-list">
      <div className="results-header">
        <h3>Search Results ({results.length})</h3>
      </div>
      <div className="results-grid">
        {results.map((book) => (
          <div
            key={book.id || book._id}
            className="result-card"
            onClick={() => onSelectBook(book.id || book._id)}
          >
            <div className="result-cover">
              <svg viewBox="0 0 100 150" width="80" height="120">
                <defs>
                  <linearGradient id={`grad-${book.id || book._id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1a73e8" />
                    <stop offset="100%" stopColor="#00bcd4" />
                  </linearGradient>
                </defs>
                <rect width="100" height="150" fill={`url(#grad-${book.id || book._id})`} rx="4" />
                <text x="50" y="80" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" textLength="90">
                  {book.title ? book.title.substring(0, 15) : 'Title'}
                </text>
              </svg>
            </div>
            <div className="result-info">
              <h4>{book.title}</h4>
              <p className="author">{book.authors && book.authors.length > 0 ? book.authors[0] : 'Unknown'}</p>
              <p className="publisher">{book.publisher}</p>
              <div className="result-meta">
                <span className="year">{book.publication_year}</span>
                <span className="edition">{book.edition}</span>
              </div>
              {book.description && (
                <p className="description">{book.description.substring(0, 100)}...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResultsList
