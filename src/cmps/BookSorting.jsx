import { useState, useEffect } from 'react'

export function BookSorting({ sortBy, setSortBy }) {
    const [sortToEdit, setSortToEdit] = useState((sortBy))

    function handleChange(field, dir) {
        const newSort = { sortField: field, sortDir: dir }
        setSortToEdit(newSort)
        setSortBy(newSort)
    }

    function clearSort() {
        setSortToEdit({ ...sortToEdit, sortField: '', sortDir: '' })
    }

    return (
        <section className="book-sorting">
            {['title', 'price', 'rating'].map(field => (
                <div key={field} className="sort-row">
                    <span className="field-label">{field}</span>
                    <button
                        className={`fa-solid fa-arrow-up btn-sort ${sortToEdit.sortField === field && sortToEdit.sortDir === 1 ? 'active' : ''}`}
                        onClick={() => handleChange(field, 1)}
                    >
                    </button>
                    <button
                        className={`fa-solid fa-arrow-down btn-sort ${sortToEdit.sortField === field && sortToEdit.sortDir === -1 ? 'active' : ''}`}
                        onClick={() => handleChange(field, -1)}
                    >
                    </button>
                </div>
            ))}
        </section>
    )
}