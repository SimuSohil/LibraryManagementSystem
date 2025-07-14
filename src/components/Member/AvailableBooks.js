import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../../styles/Table.css'

const AvailableBooks = () => {
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3500/books")
            .then(response => {
                setBooksData(response.data);
            })
            .catch(() => {
                alert("There are no books in the library!");
            });
    }, []);

    const handleClick = (bookId, bookTitle) => {
        const book = booksData.find((bk) => bookId === bk.id);

        if (!book || book.available_copies <= 0) {
            alert("Book is not available for borrowing");
            return;
        }

        axios.patch(`http://localhost:3500/books/${bookId}`, { available_copies: book.available_copies - 1 })
            .then(() => {
                const borrowedBook = {
                    id: bookId,
                    title: bookTitle,
                    author: book.author,
                    genre: book.genre,
                };
                return axios.post('http://localhost:3500/issued_books', borrowedBook);
            })
        .then(() => {
            alert(`Book "${bookTitle}" borrowed successfully!`);
        })
        .catch(error => {
            console.error('Error borrowing book:', error);
            alert('Error borrowing book. Please try again.');
        });
    };

    return (
        <div className='available-books'>
            {booksData.length === 0 ? (
                <p>No books available in the library.</p>
            ) : (
                <div className='available-books-table'>
                    <table className='books-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Available Copies</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booksData.map((book, key) => (
                                <tr key={key}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>
                                        {book.available_copies}
                                    </td>
                                    <td>
                                        {book.available_copies > 0 ? (
                                            <button onClick={() => handleClick(book.id, book.title)}>Request Book</button>
                                        ) : 'Unavailable'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AvailableBooks;