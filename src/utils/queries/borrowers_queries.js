const getBorrowers = "SELECT * FROM borrowers";
const getBorrowerById = "SELECT * FROM borrowers WHERE id = $1";
const registerBorrower = "INSERT INTO borrowers (name, email, registered_date) VALUES ($1, $2, CURRENT_DATE) RETURNING *";
const updateBorrower = "UPDATE borrowers SET name = $1, email = $2 WHERE id = $3";
const deleteBorrower = "DELETE FROM borrowers WHERE id = $1";


module.exports = {
    getBorrowers,
    getBorrowerById,
    registerBorrower,
    updateBorrower,
    deleteBorrower,
};