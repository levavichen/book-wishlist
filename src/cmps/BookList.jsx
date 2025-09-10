

export function BookList({ books }) {
    if (!books || books.length === 0) return <p>No books to show</p>

    return (
        <div className="book-list">
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <p>{book.title}</p>
                        <button>X</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}