import axios from "axios"

export const getBooks = () => {
    try {
        const books = axios.get("http://localhost:3500/books");
        return books;
    } catch (error) {
        console.log("Get Books failed: ", error.message);
    }
}

export const addBook = async (book) => {
    try {
        const res = await axios.post("http://localhost:3500/books", book);
        return res;
    } catch (error) {
        console.error("Add book failed:", error.message);
    }
};

export const updateBook = async (id, book) => {
    try {
        const res = await axios.put(`${BASE_URL}/${id}`, book);
        return res;
    } catch (error) {
        console.error("Update book failed:", error.message);
    }
};

export const deleteBook = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/${id}`);
        return res;
    } catch (error) {
        console.error("Delete book failed:", error.message);
    }
};