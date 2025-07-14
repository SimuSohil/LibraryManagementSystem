import React, { Component } from 'react'
import '../styles/Table.css'
import axios from 'axios';

export class AvailableLibraryBooks extends Component {
    constructor() {
        super();

        this.state = {
            booksData: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3500/books").then(response => {
            this.setState({
                booksData: response.data
            })
        }).catch("There are no books in the library!");
    }

    render() {
        const booksData = this.state.booksData;

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

export default AvailableLibraryBooks