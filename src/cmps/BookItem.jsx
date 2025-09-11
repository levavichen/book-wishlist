import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import '@fortawesome/fontawesome-free/css/all.min.css';

export function BookItem({ books, currPage, onUpdateBook }) {
    if (!books || books.length === 0) return <p>No books to show</p>
    const currBook = books[currPage]
    const totalStars = 5

    function handleWishlist(ev) {
        const isChecked = ev.target.checked
        onUpdateBook(currBook, isChecked)
    }

    return (
        <div className="book-item">
            <section className='header'>
                <h3>{currBook.title}</h3>
                <Checkbox
                    checked={currBook.onWishlist}
                    onChange={handleWishlist}
                />
            </section>
            <section className='book-main-content'>
                <h4>{currBook.author}</h4>
                <p className='book-desc'>{currBook.description}</p>
                <div className='star-rating'>Rating:
                    {[...Array(totalStars)].map((_, idx) => {
                        const starClass = idx < Math.floor(currBook.rating) ? 'full fa-solid fa-star' : 'empty fa-solid fa-star'
                        return (
                            <span key={idx} className={starClass}></span>
                        )
                    })}
                </div>
                <p>Price: ${currBook.price}</p>
            </section>
        </div>
    )
}