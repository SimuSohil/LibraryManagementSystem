import axios from 'axios';
import { useEffect, useState } from 'react';

const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3500/borrowed_books")
            .then(response => {
                setBorrowedBooks(response.data);
            })
            .catch(() => {
                alert("Error in getting the borrowed books.");
            });

        axios.get("http://localhost:3500/books")
            .then(response => {
                setBooks(response.data);
            })
            .catch(() => {
                alert("There are no books in the library!");
            });
    }, []); // Dependancy array when empty, is mounted only once or rendered only once. When variables are given, when the value of the variable changes, the useEffect is called again.

    const returnBook = (bookId) => {
        const book = books.find((bk) => bookId === bk.id);

        axios.patch(`http://localhost:3500/books/${bookId}`, { available_copies: book.available_copies + 1 })
            .then(() => {});

        axios.delete(`http://localhost:3500/borrowed_books/${bookId}`)
            .then(() => {
                setBorrowedBooks(borrowedBooks.filter(book => book.id !== bookId)); // for my reference: filter() method is used to create a new array of elements that satisfy the condition mentioned.
                alert('Book returned successfully!');
            });
    };

    return (
        <div className='available-books'>
            {borrowedBooks.length === 0 ? (
                <p>No books has been asked for borrowing!</p>
            ) : (
                <div className='available-books-table'>
                    <table className='books-table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Return</th>
                            </tr>
                        </thead>
                        <tbody>
                            {borrowedBooks.map((book, key) => (
                                <tr key={key}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>
                                        <button onClick={() => returnBook(book.id)}>
                                            Return Book
                                        </button>
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

export default BorrowedBooks;