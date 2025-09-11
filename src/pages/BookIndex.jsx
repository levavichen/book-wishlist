import { BookItem } from '../cmps/BookItem'
import { BookList } from '../cmps/BookList'
import { bookService } from '../services/book.service'
import { useEffect, useState } from 'react'

export function BookIndex() {
  const [books, setBooks] = useState([])
  const [currPage, setCurrPage] = useState(0)


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

  function onSetPage(diff) {
    setCurrPage(prevPage => {
      const nextPage = prevPage + diff
      return nextPage
     })
  }

  return (
    <main className='book-index'>
      <section className='main-content'>
        {currPage>0 &&
              <i 
              className="fa-solid fa-chevron-left"
              onClick={()=>onSetPage(-1)}
              ></i>
        }
        <BookItem
          books={books}
          currPage={currPage}
          onUpdateBook={onUpdateBook}
        />
        {currPage<books.length-1 &&
                <i 
                className="fa-solid fa-chevron-right"
                onClick={()=>onSetPage(1)}
                />
        }
        <BookList
          books={books}
        />
      </section>
    </main>
  )
}
