const pool = require("../config/db");
const queries = require("../utils/queries/borrowers_queries");
const { validateBorrower } = require("../utils/checkers");
const AppError = require("../utils/appError");

// Register a new borrower
const registerBorrower = (request, response, next) => {
  const { name, email } = request.body;
  const borrower = { name, email };
  validateBorrower(borrower);
  pool.query(queries.registerBorrower, [name, email], (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    response
      .status(201)
      .json({ message: "Borrower registered successfully" });
  });
};

// Update borrower details by ID
const updateBorrower = (request, response, next) => {
  let { name, email } = request.body;
  const borrower = { name, email };
  validateBorrower(borrower);
  const id = request.params.id;
  pool.query(queries.getBorrowerById, [id], (error, results) => {
    if (error) {
      return next(new AppError(error.message, 500));
    }
    if (!results.rows.length) {
      return next(new AppError("index not found", 404));
    }
    name = name || results.rows[0].name;
    email = email || results.rows[0].email;
    pool.query(queries.updateBorrower, [name, email, id], (error, results) => {
      if (error) {
        throw error;
      }
      return response
        .status(200)
        .json({ message: "Borrower is updated successfully" });
    });
  });
};

// Delete a borrower by ID
const deleteBorrower = (request, response, next) => {
  const id = request.params.id;
  pool.query(queries.deleteBorrower, [id], (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    response.status(200).json({ message: "Borrower deleted successfully" });
  });
};

// Get all borrowers
const getBorrowers = (request, response, next) => {
  pool.query(queries.getBorrowers, (error, results) => {
    if (error) return next(new AppError(error.message, 500));

    response.status(200).json({ data: results.rows });
  });
};

// Get a borrower by ID
const getBorrowerById = (request, response, next) => {
  const id = request.params.id;
  pool.query(queries.getBorrowerById, [id], (error, results) => {
    if (error) return next(new AppError(error.message, 500));
    if (results.rows.length === 0) {
      return next(new AppError("Id not found", 404));
    }
    response.status(200).json({ data: results.rows });
  });
};

module.exports = {
  registerBorrower,
  updateBorrower,
  deleteBorrower,
  getBorrowers,
  getBorrowerById,
};
