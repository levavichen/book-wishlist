
export function BookWishlist({ wishlistBooks, onUpdateBook }) {

    if (!wishlistBooks || wishlistBooks.length === 0) return <p>No books to show</p>


    return (
        <div className="book-wishlist">
            <ul className="list">
                {wishlistBooks
                    .map((book) => (
                        <li key={book._id}>
                            <p>{book.title}</p>
                            <button className="remove-btn"
                                onClick={() => onUpdateBook(book, !book.onWishlist)}
                            >X</button>
                        </li>
                    ))}
            </ul>
        </div>
    )
}