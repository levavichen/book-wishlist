import { BookItem } from '../cmps/BookItem'
import { BookWishlist } from '../cmps/BookWishlist'
import { BookSorting } from '../cmps/BookSorting.jsx'
import { bookService } from '../services/book.service'
import { useEffect, useState } from 'react'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [wishlistBooks, setWishlistBooks] = useState([])
  const [currPage, setCurrPage] = useState(0)
  const [sortBy, setSortBy] = useState({ sortField: '', sirtDir: 1 })

  useEffect(() => {
    loadBooks()
  }, [])

  useEffect(() => {
    loadWishlistBooks()
  }, [sortBy, books])

  async function loadBooks() {
    try {
      const books = await bookService.query()
      setBooks(books)
    } catch (error) {
      console.error('Error loading books', error)
    }
  }

  async function loadWishlistBooks() {
    try {
      const books = await bookService.query(sortBy)
      setWishlistBooks(books.filter(book => book.onWishlist))
    } catch (error) {
      console.error('Error loading books', error)
    }
  }

  async function onUpdateBook(book, isChecked) {
    const bookToSave = { ...book, onWishlist: isChecked }
    try {
      const savedBook = await bookService.saveBook(bookToSave)
      setBooks(prevBooks =>
        prevBooks.map(book => (book._id === savedBook._id ? savedBook : book))
      )
      showSuccessMsg(`Book updated`)
    } catch (err) {
      showErrorMsg('Cannot update book')
    }
  }

  function onSetPage(diff) {
    setCurrPage(prevPage => {
      const nextPage = prevPage + diff
      if (nextPage <= 0) return 0
      if (nextPage >= books.length - 1) return books.length - 1
      return nextPage
    })
  }

  return (
    <main className='book-index'>
      <section className='left-side'>
        <i
          className={`fa-solid fa-chevron-left ${currPage <= 0 ? 'hidden' : ''}`}
          onClick={() => onSetPage(-1)}
        ></i>
        <BookItem
          books={books}
          currPage={currPage}
          onUpdateBook={onUpdateBook}
        />
        <i
          className={`fa-solid fa-chevron-right ${currPage >= books.length - 1 ? 'hidden' : ''}`}
          onClick={() => onSetPage(1)}
        />
      </section>
      <section className='right-side'>
        <BookSorting
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        <BookWishlist
          wishlistBooks={wishlistBooks}
          onUpdateBook={onUpdateBook}
        />
      </section>

    </main>
  )
}
