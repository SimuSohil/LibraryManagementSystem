import React, { useEffect, useState } from 'react';
import './UpdateBook.js';
import '../../styles/UpdateBook.css';
import axios from 'axios';

const UpdateBook = () => {
    const [bookId, setBookId] = useState();
    const [foundBook, setFoundBook] = useState(false);
    const [bookData, setBookData] = useState({
        id: '',
        title: '',
        author: '',
        genre: '',
        available_copies: 1
    });

    const handleChangeId = (event) => {
        setBookId(event.target.value);
    }

    const handleInputChange = (event) => {
        setBookData({
            ...bookData,
            [event.target.name]: [event.target.value]
        })
    }

    const findBook = () => {
        axios.get(`http://localhost:3500/books/${bookId}`).then(response => {
            setBookData({
                id: response.data.id,
                title: response.data.title,
                author: response.data.author,
                genre: response.data.genre,
                available_copies: response.data.available_copies
            });

            setFoundBook(true);
        }).catch(() => {
            alert("Error in finding the book with the ID");
            setFoundBook(false);
        })
    }

    const updateBook = (event) => {
        event.preventDefault();

        const updatedBook = {
            id: bookData.id,
            title: bookData.title,
            author: bookData.author,
            genre: bookData.genre,
            available_copies: bookData.available_copies
        };

        axios.put(`http://localhost:3500/books/${bookData.id}`, updatedBook).then(() => {
            alert("Book updated successfully!");
            setBookId('');
            setBookData({
                id: '',
                title: '',
                author: '',
                genre: '',
                available_copies: 1
            });
            setFoundBook(false);
            }).catch(() => {
                alert("Error updating book!");
        });
    }

    return (
        <div className='update-book-container'>
            <div className='find-book-section'>
                <input type='text' value={bookId} onChange={handleChangeId} placeholder='Enter the book ID' required/>
                <button onClick={findBook}>Find Book</button>
            </div>

            {foundBook && (
                <div className='edit-book-section'>
                    <h3>Book Found! Edit the details:</h3>
                    {/* <input name="id" value={bookData.id} onChange={handleChange} placeholder="ID" required readOnly /> */}
                    <input name="title" value={bookData.title} onChange={handleInputChange} placeholder="Title" required />
                    <input name="author" value={bookData.author} onChange={handleInputChange} placeholder="Author" required />
                    <input name="genre" value={bookData.genre} onChange={handleInputChange} placeholder="Genre" required />
                    <input name="available_copies" type="number" value={bookData.available_copies} onChange={handleInputChange} placeholder="Copies" required/>

                    <button type="submit" onClick={updateBook}>Update Book</button>
                </div>
            )}
        </div>
    )
};

export default UpdateBook;