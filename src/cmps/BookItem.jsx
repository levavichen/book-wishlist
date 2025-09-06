import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';

export function BookItem({ books, currPage, onUpdateBook }) {
    if (!books || books.length === 0) return <p>No books to show</p>
    const currBook = books[currPage]

    function handleWishlist(ev) {
        const isChecked = ev.target.checked
        onUpdateBook(currBook, isChecked)
    }

    return (
        <div className="book-item">
            <h3>{currBook.title}</h3>
            <Checkbox
                checked={currBook.onWishList}
                onChange={handleWishlist}
            />
            <p>{currBook.author}</p>
            <p>{currBook.description}</p>
            <p>{currBook.rating}</p>
            <p>${currBook.price}</p>
        </div>
    )
}
