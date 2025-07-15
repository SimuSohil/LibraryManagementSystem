import { useEffect, useState } from 'react'
import '../../styles/Table.css'
import axios from 'axios';

const AvailableLibraryBooks = () => {
    const [booksData, setBooksData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3500/books")
            .then(response => {
                setBooksData(response.data); 
            })
            .catch(() => {
                alert("There are no books in the library!");
            });
    }, [booksData]); // The dependancy looks for changes. Here, the useEffect() hook will look for changes in the booksData.

    /**Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
        1. You might have mismatching versions of React and the renderer (such as React DOM)
        2. You might be breaking the Rules of Hooks
        3. You might have more than one copy of React in the same app

        This is the error that I got when I called a hook inside of a function.

        const DeleteBook = (bookId) => {
            useEffect(() => {
                axios.delete(`http://localhost:3500/books/${bookId}`).then(() => {
                    alert("Book has been Deleted Successfully");
                }).catch(() => {
                    alert("Error while deleting the book.")
                }, []);
            })
        };
    */

    // method to delete the book
    const DeleteBook = (bookId) => {
        axios.delete(`http://localhost:3500/books/${bookId}`).then(() => {
            alert("Book has been Deleted Successfully");
        }).catch(() => {
            alert("Error while deleting the book.")
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
                            </tr>
                        </thead>
                        <tbody>
                            {booksData.map((book, key) => (
                                <tr key={key}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>{book.available_copies}</td>
                                    <td>
                                        <button onClick={() => DeleteBook(book.id)}>
                                            Delete
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

export default AvailableLibraryBooks;