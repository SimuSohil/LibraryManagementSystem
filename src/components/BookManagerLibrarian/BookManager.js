import { getBooks, addBook, updateBook, deleteBook } from '../../services/bookServices';

const BookManager = () => {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        const res = await getBooks();
        setBooks(res.data);
    };

    const handleAddBook = async (book) => {
        try {
            const res = await addBook(book);
            setBooks([...books, res.data]);
        } catch (error) {
            console.error("Failed to add book:", error.message);
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);
    };

    const handleUpdateBook = async (updatedBook) => {
        const res = await updateBook(updatedBook.id, updatedBook);
        setBooks(books.map(book => book.id === updatedBook.id ? res.data : book));
        setEditingBook(null);
    };

    const handleDeleteBook = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this book?");
        if (!confirm) return;
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id));
    };

    return (
        <div>
            <h2 style={{textAlign:"center"}}>Book Management</h2>
            <AddBookForm onAdd={handleAddBook} />
            {editingBook && <EditBookForm book={editingBook} onUpdate={handleUpdateBook} />}
            {books.length ? <BookList books={books} onEdit={handleEditBook} onDelete={handleDeleteBook} /> :
             <p style={{textAlign : "center"}}>No Books available in the inventory</p>}
        </div>
    );
};

export default BookManager;