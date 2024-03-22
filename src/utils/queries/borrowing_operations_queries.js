const getBorrowingOperations = "SELECT * FROM borrowing_operations";
const getBorrowingOperationById = "SELECT * FROM borrowing_operations WHERE id = $1";
const getOverdueOperations = "SELECT * FROM borrowing_operations WHERE is_returned = false && due_date < CURRENT_DATE";
const returnBorrowingOperation = "UPDATE borrowing_operations SET is_returned = true WHERE id = $1";
const addBorrowingOperation = "INSERT INTO borrowing_operations (book_id, borrower_id, borrow_date, due_date, is_returned) values ($1, $2, CURRENT_DATE, $3, false)";
const getBorrowingOperationsForBorrowerId = `
        SELECT 
        bo.*,
        b.title AS book_title,
        b.author AS book_author,
        b.ISBN AS book_ISBN,
        b.quantity_available AS book_quantity_available,
        b.shelf_location AS book_shelf_location,
        br.name AS borrower_name,
        br.email AS borrower_email,
        br.registered_date AS borrower_registered_date
        FROM 
        borrowing_operations bo
        JOIN 
        books b ON bo.book_id = b.id
        JOIN 
        borrowers br ON bo.borrower_id = br.id
        WHERE 
        bo.borrower_id = $1;
`;
const getOverdueBorrowingOperations = `
        SELECT 
        bo.*,
        b.title AS book_title,
        b.author AS book_author,
        b.ISBN AS book_ISBN,
        b.quantity_available AS book_quantity_available,
        b.shelf_location AS book_shelf_location,
        br.name AS borrower_name,
        br.email AS borrower_email,
        br.registered_date AS borrower_registered_date
        FROM 
        borrowing_operations bo
        JOIN 
        books b ON bo.book_id = b.id
        JOIN 
        borrowers br ON bo.borrower_id = br.id
        WHERE 
        bo.due_date < CURRENT_DATE;
`;


module.exports = {
    getBorrowingOperations,
    getBorrowingOperationById,
    getOverdueOperations,
    getBorrowingOperationsForBorrowerId,
    returnBorrowingOperation,
    addBorrowingOperation,
    getOverdueBorrowingOperations,
};