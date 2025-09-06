import { BookItem } from './cmps/BookItem'
import { BookList } from './cmps/BookList'
import { bookService } from './services/book.service'
import { useEffect, useState } from 'react'

export default function App() {
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
    <main>
      <h1>Book Wishlist</h1>
      <BookList
        books={books}
      />
      <BookItem
        books={books}
        currPage={currPage}
        onUpdateBook={onUpdateBook}
      />
    </main>
  )
}
