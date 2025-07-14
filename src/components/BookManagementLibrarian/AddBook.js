import React, { useState } from 'react';
import './AddBook.js';
import '../../styles/AddBook.css';
import axios from 'axios';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    id: '',
    title: '',
    author: '',
    genre: '',
    available_copies: 1
  });

  const handleChange = (event) => {
    setBookData({ 
      ...bookData, 
      [event.target.name]: event.target.value 
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBook = {
      id: bookData.id,
      title: bookData.title,
      author: bookData.author,
      genre: bookData.genre,
      available_copies: bookData.available_copies
    };

    axios.post("http://localhost:3500/books", newBook).then(() => {
      setBookData({
        id: '',
        title: '',
        author: '',
        genre: '',
        available_copies: 1
      });
      
      alert("Book added successfully to library");
    }).catch(() => {
      alert("Error adding book to library!");
    })
  }

  return (
    <form onSubmit={handleSubmit} id='addBookForm'>
        <input name="id" value={bookData.id} onChange={handleChange} placeholder="ID" required />
        <input name="title" value={bookData.title} onChange={handleChange} placeholder="Title" required />
        <input name="author" value={bookData.author} onChange={handleChange} placeholder="Author" required />
        <input name="genre" value={bookData.genre} onChange={handleChange} placeholder="Genre" required />
        <input name="available_copies" type="number" value={bookData.available_copies} onChange={handleChange} placeholder="Copies" required/>
      <button type="submit" onClick={handleSubmit}>Add Book</button>
    </form>
  );
};

export default AddBook;
