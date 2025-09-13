import { onUpdated } from "vue"


export function BookList({ books, onUpdateBook }) {
    if (!books || books.length === 0) return <p>No books to show</p>

    return (
        <div className="book-list">
            <ul>
                {books
                    .filter(book => book.onWishlist)
                    .map((book) => (
                        <li key={book._id}>
                            <p>{book.title}</p>
                            <button
                                onClick={() => onUpdateBook(book, !book.onWishlist)}
                            >X</button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}