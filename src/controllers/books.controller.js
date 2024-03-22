const pool = require("../config/db");
const queries = require("../utils/queries/books_queries");
const { validateBook } = require("../utils/checkers");
const AppError = require("../utils/appError");

const getBooks = (request, response, next) => {
  pool.query(queries.getBooks, (error, results) => {
    if (error) {
      return next(new AppError(error.message, 500));
    }

    response.status(200).json({ data: results.rows });
  });
};

const getBookById = (request, response, next) => {
  const id = parseInt(request.params.id);

  pool.query(queries.getBookById, [id], (error, results) => {
    if (error) {
      return next(new AppError(error.message, 500));
    }
    if (results.rows.length === 0) {
      return next(new AppError("Id not found", 404));
    }
    response.status(200).json({ data: results.rows });
  });
};

const searchBooks = (request, response, next) => {
  const { title, author, ISBN } = request.query;
  const searchParams = [];

  if (title) searchParams.push(title);
  if (author) searchParams.push(author);
  if (ISBN) searchParams.push(ISBN);

  pool.query(queries.searchBooks, searchParams, (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    response.status(200).json({ data: results.rows });
  });
};

const addBook = (request, response, next) => {
  const { title, author, ISBN, quantity_available, shelf_location } =
    request.body;

  const book = { title, author, ISBN, quantity_available, shelf_location };
  validateBook(book);
  pool.query(queries.checkBookExist, [title], (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    if (parseInt(results.rows[0].count)) {
      return response.json({ message: "Book already exists" });
    }
    pool.query(
      queries.addBook,
      [title, author, ISBN, quantity_available, shelf_location],
      (error, results) => {
        if (error) throw error;
        response.status(201).json({ message: "Book is added successfully" });
      }
    );
  });
};

const clearBooks = (request, response, next) => {
  pool.query(queries.clearBooks, (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    response.status(200).json({ message: "Books cleared successfully" });
  });
};

const removeBookById = (request, response, next) => {
  const id = request.params.id;
  pool.query(queries.removeBookById, [id], (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    response.status(200).json({ message: "Book deleted successfully" });
  });
};

const updateById = (request, response, next) => {
  let { title, author, ISBN, quantity_available, shelf_location } =
    request.body;
  const book = { title, author, ISBN, quantity_available, shelf_location };
  validateBook(book);
  const id = request.params.id;
  pool.query(queries.getBookById, [id], (error, results) => {
    if (error) {
      return next(new AppError(error.message, 500));
    }
    if (!results.rows.length) {
      return next(new AppError("index not found", 404));
    }
    title = title || results.rows[0].title;
    author = author || results.rows[0].author;
    ISBN = ISBN || results.rows[0].ISBN;
    quantity_available =
      quantity_available || results.rows[0].quantity_available;
    shelf_location = shelf_location || results.rows[0].shelf_location;
    pool.query(
      queries.updateBookById,
      [title, author, ISBN, quantity_available, shelf_location, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        return response
          .status(200)
          .json({ message: "Book updated successfully" });
      }
    );
  });
};

module.exports = {
  getBooks,
  getBookById,
  addBook,
  clearBooks,
  removeBookById,
  updateById,
  searchBooks,
};
