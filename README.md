# Library Management System

This project is a Library Management System implemented in Node.js, Express.js, and PostgreSQL. It provides endpoints to manage books, borrowers, and borrowing operations in a library.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/yourusername/library-management-system.git
    ```

2. Navigate to the project directory:

    ```bash
    cd library-management-system
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Usage

1. Ensure you have PostgreSQL installed and running on your machine.

2. Create a PostgreSQL database for the project.

3. Set up the database connection by modifying the `config/db.js` file with your database credentials.

4. Create the necessary database tables by running the provided SQL scripts located in the `database` directory.

5. Start the server:

    ```bash
    npm start
    ```

6. The server should now be running on `http://localhost:3001`.

## Endpoints

### Books

- **GET /api/books**: Retrieve all books.
- **GET /api/books/:id**: Retrieve a specific book by ID.
- **POST /api/books**: Add a new book.
- **PUT /api/books/:id**: Update a book.
- **DELETE /api/books/:id**: Delete a book.
- **GET /api/books/getby?title=title**: Search books by title.

### Borrowers

- **GET /api/borrowers**: Retrieve all borrowers.
- **GET /api/borrowers/:id**: Retrieve a specific borrower by ID.
- **POST /api/borrowers**: Register a new borrower.
- **PUT /api/borrowers/:id**: Update a borrower.
- **DELETE /api/borrowers/:id**: Delete a borrower.

### Borrowing Operations

- **GET /api/borrowing_operations**: Retrieve all borrowing operations.
- **GET /api/borrowing_operations/getby?borrower_id=id**: Retrieve borrowing operations for a specific borrower.
- **GET /api/borrowing_operations/overdue**: Retrieve overdue borrowing operations.
- **POST /api/borrowing_operations**: Add a new borrowing operation.
- **GET /api/borrowing_operations/return/:id**: Return a borrowing operation.
