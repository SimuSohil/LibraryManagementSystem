import React, { useState } from 'react';
import '../BookManagerLibrarian/AddBook.js';

const AddBook = ({ onAdd }) => {
  const [formData, setFormData] = useState({ title: '', author: '', genre: '', copies: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { ...formData, available_copies: parseInt(formData.copies) };
    onAdd(newBook);
    setFormData({ title: '', author: '', genre: '', available_copies: '' });
  };

  return (
    <form onSubmit={handleSubmit} id='addBookForm'>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
      <input name="author" value={formData.author} onChange={handleChange} placeholder="Author" required />
      <input name="genre" value={formData.genre} onChange={handleChange} placeholder="Genre" required />
      <input name="copies" type="number" value={formData.copies} onChange={handleChange} placeholder="Copies" required min={1}/>
      <button type="submit" onClick={handleSubmit}>Add Book</button>
    </form>
  );
};

export default AddBook;
