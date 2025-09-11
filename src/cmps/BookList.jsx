

export function BookList({ books }) {
    if (!books || books.length === 0) return <p>No books to show</p>

    return (
        <div className="book-list">
            <ul>
                {books
                .filter(book=> book.onWishlist)
                .map((book) => (
                    <li key={book._id}>
                        <p>{book.title}</p>
                        <button>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}