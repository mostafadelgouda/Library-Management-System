const validateBook = (book) => {
  const { title, author, ISBN, quantity_available, shelf_location } = book;

  if (typeof title !== "string" || title.length < 1) {
    throw new Error("Invalid title");
  }

  if (typeof author !== "string" || author.length < 1) {
    throw new Error("Invalid author");
  }

  if (typeof ISBN !== "string" || ISBN.length !== 13 || !/^\d+$/.test(ISBN)) {
    throw new Error("Invalid ISBN");
  }

  if (!Number.isInteger(quantity_available) || quantity_available < 0) {
    throw new Error("Invalid quantity_available");
  }

  if (typeof shelf_location !== "string") {
    throw new Error("Invalid shelf_location");
  }
};

const validateBorrower = (borrower) => {
  const { name, email, registered_date } = borrower;

  if (typeof name !== "string" || name.length < 1) {
    throw new Error("Invalid name");
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    throw new Error("Invalid email");
  }
};

module.exports = {
  validateBook,
  validateBorrower,
};
