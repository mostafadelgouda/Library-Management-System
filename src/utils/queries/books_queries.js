const getBooks = "SELECT * FROM books"
const getBookById = "SELECT * FROM books  WHERE id = $1"
const addBook = "INSERT INTO books (title, author, ISBN, quantity_available, shelf_location) VALUES ($1, $2, $3, $4, $5) RETURNING *";
const checkBookExist = "SELECT COUNT(*) FROM books WHERE title = $1";
const clearBooks = "DELETE FROM books";
const removeBookById = "DELETE FROM books WHERE id = $1";
const updateBookById = "UPDATE books SET title = $1, author = $2, ISBN = $3, quantity_available = $4, shelf_location = $5 WHERE id = $6";
const searchBooks = "SELECT * FROM books WHERE title LIKE '%' || $1 || '%' OR author LIKE '%' || $1 || '%' OR ISBN LIKE '%' || $1 || '%'";


module.exports = {
    getBooks,
    getBookById,
    addBook,
    checkBookExist,
    clearBooks,
    removeBookById,
    updateBookById,
    searchBooks,
};