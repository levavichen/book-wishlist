
import { storageService } from './async-storage.service'
import { makeId } from './util.service'

const STORAGE_KEY = 'book'

export const bookService = {
    loadBooks,
    query,
    getById,
    saveBook,
    remove,
    addBookMsg
}

async function loadBooks(url) {
    var books = await storageService.query(STORAGE_KEY)
    if (!books || books.length === 0) {
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Failed to load books`)
            }
            const result = await response.json()
            return result.listOfBooks || []
        } catch (error) {
            console.error('Error fetching books', error)
            return []
        }
    }
}

async function query(filterBy = { txt: '', price: 0 }) {
    var books = await storageService.query(STORAGE_KEY)
    console.log('books:', books)
    const { txt, minSpeed, maxPrice, sortField, sortDir } = filterBy

    if (txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        books = books.filter(book => regex.test(book.vendor) || regex.test(book.description))
    }
    if (minSpeed) {
        books = books.filter(book => book.speed <= minSpeed)
    }
    if (maxPrice) {
        books = books.filter(book => book.price <= maxPrice)
    }
    if (sortField === 'vendor' || sortField === 'owner') {
        books.sort((book1, book2) =>
            book1[sortField].localeCompare(book2[sortField]) * +sortDir)
    }
    if (sortField === 'price' || sortField === 'speed') {
        books.sort((book1, book2) =>
            (book1[sortField] - book2[sortField]) * +sortDir)
    }

    books = books.map(({ _id, vendor, price, speed, owner }) => ({ _id, vendor, price, speed, owner }))
    return books
}

function getById(bookId) {
    return storageService.get(STORAGE_KEY, bookId)
}

async function remove(bookId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, bookId)
}

async function saveBook(book) {
    var savedBook
    if (book._id) {
        const bookToSave = {
            id: book.id,
            title: book.title,
            author: book.author,
            onWishlist: book.onWishlist,
            description: book.description,
            rating: book.rating,
            price: book.price,
        }
        savedBook = await storageService.put(STORAGE_KEY, bookToSave)
    } else {
        const bookToSave = {
            id: book.id,
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
}

async function addBookMsg(bookId, txt) {
    // Later, this is all done by the backend
    const book = await getById(bookId)

    const msg = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    book.msgs.push(msg)
    await storageService.put(STORAGE_KEY, book)

    return msg
}