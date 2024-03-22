CREATE TABLE borrowers(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "registered_date" DATE
);
CREATE TABLE books(
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR(255),
    "author" VARCHAR(255),
    "isbn" VARCHAR(255),
    "shelf_location" VARCHAR(255),
    "quantity_available" INT
);
CREATE TABLE borrowing_operations(
    "id" SERIAL PRIMARY KEY,
    "book_id" Int,
    "borrower_id" INT,
    "borrow_date" DATE,
    "due_date" DATE,
    "is_returned" BOOLEAN
);
ALTER TABLE
    "borrowing_operations" ADD CONSTRAINT "borrowing_operations_borrower_id_foreign" FOREIGN KEY("borrower_id") REFERENCES "borrowers"("id");
ALTER TABLE
    "borrowing_operations" ADD CONSTRAINT "borrowing_operations_book_id_foreign" FOREIGN KEY("book_id") REFERENCES "books"("id");