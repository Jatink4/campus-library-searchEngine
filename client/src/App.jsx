import React, { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar.jsx'
import SearchBar from './components/search/SearchBar.jsx'
import SearchResultsList from './components/search/SearchResultsList.jsx'
import BookDetails from './components/book/BookDetails.jsx'

function App() {
  const [selectedBook, setSelectedBook] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showingSearchResults, setShowingSearchResults] = useState(false)

  useEffect(() => {
    // Page load animation
    document.body.classList.add('page-loaded')
  }, [])

  const handleSelectBook = async (bookId) => {
    setIsLoading(true)
    try {
      const response = await fetch(`http://localhost:8000/api/book/${bookId}`)
      const data = await response.json()
      setSelectedBook(data)
      setShowingSearchResults(false)
    } catch (error) {
      console.error('Error fetching book details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFullSearch = async (query) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/api/search/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      })
      const data = await response.json()
      setSearchResults(data.hits || [])
      setShowingSearchResults(true)
      setSelectedBook(null)
    } catch (error) {
      console.error('Error fetching search results:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <div className="search-section">
          <SearchBar onSelectBook={handleSelectBook} onSearch={handleFullSearch} />
        </div>
        
        {showingSearchResults && (
          <div className="results-section">
            <SearchResultsList results={searchResults} isLoading={isLoading} onSelectBook={handleSelectBook} />
          </div>
        )}
        
        {selectedBook && (
          <div className="details-section">
            <BookDetails book={selectedBook} isLoading={isLoading} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App
