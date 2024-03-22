const pool = require("../config/db");
const borrowing_operations_queries = require("../utils/queries/borrowing_operations_queries");
const books_queries = require("../utils/queries/books_queries");
const AppError = require("../utils/appError");

// Get all borrowing operations
const getBorrowingOperations = (request, response, next) => {
  pool.query(
    borrowing_operations_queries.getBorrowingOperations,
    (error, results) => {
      if (error) return next(new AppError(error.message, 500));
      response.status(200).json({ data: results.rows });
    }
  );
};

// Get borrowing operations for a specific borrower ID
const getBorrowingOperationsForBorrowerId = (request, response, next) => {
  const { borrower_id } = request.query;
  pool.query(
    borrowing_operations_queries.getBorrowingOperationsForBorrowerId,
    [borrower_id],
    (error, results) => {
      if (error) return next(new AppError(error.message, 500));
      if (!results.rows.length)
        return next(new AppError("Id not found", 404));
      response.status(200).json({ data: results.rows });
    }
  );
};

// Get overdue borrowing operations
const getOverdueBorrowingOperations = (request, response, next) => {
  pool.query(
    borrowing_operations_queries.getOverdueBorrowingOperations,
    (error, results) => {
      if (error) return next(new AppError(error.message, 500));
      response.status(200).json({ data: results.rows });
    }
  );
};

// Add a new borrowing operation
const addBorrowingOperation = (request, response, next) => {
  const borrower_id = request.body.borrower_id;
  const book_id = request.body.book_id;
  const due_date = request.body.due_date;
  pool.query(books_queries.getBookById, [book_id], (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    const book = results.rows[0];
    if (book.quantity_available === 0)
      return response.status(200).json({ message: "No Books available" });
    pool.query(
      books_queries.updateBookById,
      [
        book.title,
        book.author,
        book.ISBN,
        book.quantity_available - 1,
        book.shelf_location,
        book_id,
      ],
      (error, results) => {
        if (error) return next(new AppError(error.message, 500));
      }
    );
    pool.query(
      borrowing_operations_queries.addBorrowingOperation,
      [book_id, borrower_id, due_date],
      (error, results) => {
        if (error) return next(new AppError(error.message, 500));
        response
          .status(200)
          .json({ message: "Borrowing Operation is Added successfully" });
      }
    );
  });
};

// Return a borrowing operation
const returnBorrowingOperation = (request, response, next) => {
  const id = request.params.id;
  pool.query(
    borrowing_operations_queries.getBorrowingOperationById,
    [id],
    (error, results) => {
      if (error) return next(new AppError(error.message, 500));
      if (results.rows.length === 0)
        return next(new AppError("Id not found", 404));
      const borrowingOperation = results.rows[0];
      if (borrowingOperation.is_returned === true)
        return response
          .status(200)
          .json({ message: "Book is already returned" });
      const book_id = borrowingOperation.book_id;
      pool.query(books_queries.getBookById, [book_id], (error, results) => {
        if (error) return next(new AppError(error.message, 500));
        const book = results.rows[0];
        pool.query(
          books_queries.updateBookById,
          [
            book.title,
            book.author,
            book.ISBN,
            book.quantity_available + 1,
            book.shelf_location,
            book_id,
          ],
          (error, results) => {
            if (error) return next(new AppError(error.message, 500));
          }
        );
        pool.query(
          borrowing_operations_queries.returnBorrowingOperation,
          [id],
          (error, results) => {
            if (error) return next(new AppError(error.message, 500));
            response
              .status(200)
              .json({ message: "Borrowing Operation is Added successfully" });
          }
        );
      });
    }
  );
};

module.exports = {
  getBorrowingOperations,
  addBorrowingOperation,
  getBorrowingOperationsForBorrowerId,
  getOverdueBorrowingOperations,
  returnBorrowingOperation,
};
