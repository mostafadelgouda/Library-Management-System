const dotenv = require("dotenv");
const morgan = require("morgan");
dotenv.config({ path: ".env" });

const express = require("express");
const globalErrorHandling = require("./src/utils/middleware.js");

const bookRoutes = require("./src/routes/books.routes.js");
const borrowersRoutes = require("./src/routes/borrowers.routes.js");
const borrowingOperationsRoutes = require("./src/routes/borrowing_operations.routes.js");
const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use("/api/books", bookRoutes);
app.use("/api/borrowers", borrowersRoutes);
app.use("/api/borrowing_operations", borrowingOperationsRoutes);

app.use(globalErrorHandling);

module.exports = app;