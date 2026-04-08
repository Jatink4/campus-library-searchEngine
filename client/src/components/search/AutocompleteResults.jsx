import React from 'react'
import './AutocompleteResults.css'

function AutocompleteResults({ results, isLoading, onSelectBook }) {
  if (isLoading) {
    return (
      <div className="autocomplete-results">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="autocomplete-results">
        <div className="no-results">No books found</div>
      </div>
    )
  }

  return (
    <div className="autocomplete-results">
      <div className="results-list">
        {results.map((result) => {
          const book = result._source
          return (
            <div
              key={book.id}
              className="result-item"
              onClick={() => onSelectBook(book.id)}
            >
              <div className="result-icon">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                  <path d="M4 2h14a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
                  <path d="M8 8h6M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.5" fill="none"></path>
                </svg>
              </div>
              <div className="result-content">
                <h3 className="result-title">{book.title}</h3>
                <p className="result-author">by {book.authors.join(', ')}</p>
                <div className="result-meta">
                  <span className="result-publisher">{book.publisher}</span>
                  <span className="result-edition">{book.edition}</span>
                  <span className="result-year">{book.publication_year}</span>
                </div>
              </div>
              <div className="result-arrow">›</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AutocompleteResults
