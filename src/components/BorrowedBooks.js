import axios from 'axios';
import React, { Component } from 'react'

export class BorrowedBooks extends Component {
    constructor() {
        super();

        this.state = {
            borrowedBooks: [],
            books: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3500/borrowed_books").then(response => {
            this.setState({
                borrowedBooks: response.data
            })
        }).catch("");

        axios.get("http://localhost:3500/books").then(
            response => {
                this.setState({
                    books: response.data
                })
            }
        ).catch("There are no books in the library!");
    }

    returnBook = (bookId) => {
        const book = this.state.books.find((bk) => bookId === bk.id);

        axios.patch(`http://localhost:3500/books/${bookId}`, { available_copies: book.available_copies + 1 }).then(() => {
        });

        axios.delete(`http://localhost:3500/borrowed_books/${bookId}`);

        // this.setState({
        //     borrowedBooks: this.state.borrowedBooks.filter(book => book.id !== bookId)
        // });

        alert('Book returned successfully!');
    }

    render() {
        const borrowedBooks = this.state.borrowedBooks;

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
                                            <button onClick={() => this.returnBook(book.id)}>
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
        )
    }
}

export default BorrowedBooks