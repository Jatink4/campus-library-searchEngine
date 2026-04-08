import React from 'react'
import './BookDetails.css'

function BookDetails({ book, isLoading }) {
  if (isLoading) {
    return (
      <div className="book-details">
        <div className="loading">Loading book details...</div>
      </div>
    )
  }

  return (
    <div className="book-details">
      <div className="book-details-container">
        <div className="book-details-left">
          <div className="book-cover">
            <svg viewBox="0 0 200 280" width="160" height="224" fill="currentColor">
              <rect x="20" y="20" width="160" height="240" rx="8" fill="#1a73e8"></rect>
              <path d="M40 60h120M40 90h100M40 120h120M40 150h110M40 180h120M40 210h90" stroke="rgba(255,255,255,0.2)" strokeWidth="2"></path>
            </svg>
          </div>
        </div>

        <div className="book-details-right">
          <div className="book-header">
            <h1 className="book-title">{book.title}</h1>
          </div>

          <div className="book-info">
            <div className="info-section">
              <label className="info-label">Authors</label>
              <p className="info-value">
                {Array.isArray(book.authors) ? book.authors.join(', ') : book.authors}
              </p>
            </div>

            <div className="info-section">
              <label className="info-label">Publisher</label>
              <p className="info-value">{book.publisher}</p>
            </div>

            <div className="info-row">
              <div className="info-section half">
                <label className="info-label">Edition</label>
                <p className="info-value">{book.edition}</p>
              </div>
              <div className="info-section half">
                <label className="info-label">Publication Year</label>
                <p className="info-value">{book.publication_year}</p>
              </div>
            </div>

            <div className="info-row">
              <div className="info-section half">
                <label className="info-label">Language</label>
                <p className="info-value">{book.language}</p>
              </div>
              <div className="info-section half">
                <label className="info-label">Pages</label>
                <p className="info-value">{book.pages}</p>
              </div>
            </div>

            <div className="info-section">
              <label className="info-label">ISBN</label>
              <p className="info-value mono">{book.isbn}</p>
            </div>

            <div className="info-section">
              <label className="info-label">Description</label>
              <p className="info-value description">{book.description}</p>
            </div>

            <div className="info-section">
              <label className="info-label">Categories</label>
              <div className="tags-container">
                {Array.isArray(book.categories) ? (
                  book.categories.map((cat, idx) => (
                    <span key={idx} className="tag category-tag">{cat}</span>
                  ))
                ) : (
                  <span className="tag category-tag">{book.categories}</span>
                )}
              </div>
            </div>

            <div className="info-section">
              <label className="info-label">Tags</label>
              <div className="tags-container">
                {Array.isArray(book.tags) ? (
                  book.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))
                ) : (
                  <span className="tag">{book.tags}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails
