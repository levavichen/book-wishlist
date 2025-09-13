
import { storageService } from './async-storage.service'
import { makeId } from './util.service'

const STORAGE_KEY = 'bookDB'

_createBooks()

export const bookService = {
    query,
    getById,
    saveBook,
    remove,
}

async function query(sortBy = { sortField: '', sortDir: 1 }) {
    var books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    const {sortField, sortDir } = sortBy
    if (sortField === 'title') {
        books.sort((book1, book2) =>
            book1[sortField].localeCompare(book2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'rating') {
        books.sort((book1, book2) =>
            (book1[sortField] - book2[sortField]) * +sortDir)
    }
    return books
}

function getById(bookId) {
    return storageService.get(STORAGE_KEY, bookId)
}

async function remove(bookId) {
    await storageService.remove(STORAGE_KEY, bookId)
}

async function saveBook(book) {
    console.log('book:', book)
    try {
        var savedBook
        if (book._id) {
            const bookToSave = { ...book }
            savedBook = await storageService.put(STORAGE_KEY, bookToSave)
        } else {
            const bookToSave = {
                _id: book._id,
                title: book.title,
                author: book.author,
                onWishlist: book.onWishlist,
                description: book.description,
                rating: book.rating,
                price: book.price,
            }
            savedBook = await storageService.post(STORAGE_KEY, bookToSave)
        }
        return savedBook
    } catch (err) {
        console.error('Error in saveBook:', err)
    }
    console.log('savedbook:', savedBook)
}

async function _createBooks() {
    let books = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []

    if (!books.length) {
        const res = await fetch('/data/listOfBooks.json')
        const data = await res.json()
        books = data.listOfBooks || []

        localStorage.setItem(STORAGE_KEY, JSON.stringify(books))
    }
}