import axios from 'axios';
import React, { Component } from 'react'

export class IssueBooks extends Component {
    constructor() {
        super();

        this.state = {
            issuedBooks: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3500/issued_books").then(response => {
            this.setState({
                issuedBooks: response.data
            })
        }).catch("No books to be issued!");
    }

    IssueBook = (bookId) => {
        const issuedBook = this.state.issuedBooks.find((bk) => bk.id === bookId);

        const borrowedBook = {
            id: issuedBook.id,
            title: issuedBook.title,
            author: issuedBook.author,
            genre: issuedBook.genre,
        };

        axios.post("http://localhost:3500/borrowed_books", borrowedBook).then(() => {
            return axios.delete(`http://localhost:3500/issued_books/${bookId}`)
        }).then(() => {
            alert("Book Issued to the member successfully");
        }).catch(
            alert("Error Issuing the Book to the member")
        )
    }

    render() {
        const issuedBooks = this.state.issuedBooks;

        return (
            <div className='available-books'>
                {issuedBooks.length === 0 ? (
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
                                    <th>Issue</th>
                                </tr>
                            </thead>
                            <tbody>
                                {issuedBooks.map((book, key) => (
                                    <tr key={key}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.genre}</td>
                                        <td>
                                            <button onClick={() => this.IssueBook(book.id)}>
                                                Issue Book
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

export default IssueBooks