import { BookItem } from '../cmps/BookItem'
import { BookList } from '../cmps/BookList'
import { bookService } from '../services/book.service'
import { useEffect, useState } from 'react'

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [currPage, setcurrPage] = useState('0')


  useEffect(() => {
    loadBooks()
  }, [])

  async function loadBooks() {
    const url = '/data/listOfBooks.json'
    try {
      const books = await bookService.loadBooks(url)
      setBooks(books)
    } catch (error) {
      console.error('Error loading books', error)
    }
  }

  async function onUpdateBook(book, isChecked) {
    const bookToSave = { ...book, onWishlist: isChecked }
    try {
      const savedBook = await bookService.saveBook(bookToSave)
      setBooks(prevBooks =>
        prevBooks.map(book => (book.id === savedBook.id ? savedBook : book))
      )
      showSuccessMsg(`Book updated`)
    } catch (err) {
      showErrorMsg('Cannot update book')
    }
  }

  return (
    <main className='book-index'>
      <header>
        <h1>Book Wishlist</h1>
      </header>
      <section className='main-content'>
        <BookItem
          books={books}
          currPage={currPage}
          onUpdateBook={onUpdateBook}
        />
        <BookList
          books={books}
        />
      </section>
    </main>
  )
}
