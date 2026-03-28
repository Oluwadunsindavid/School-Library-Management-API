const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");

// CRUD routes

// Borrow book endpoint
router.post("/:id/borrow", BookController.borrowBook);

// Return book endpoint
router.post("/:id/return", BookController.returnBook);

// Create a single book
router.post("/", BookController.createBook);

// for upload of multiple books at once
router.post("/batch", BookController.createBooks);

// to get all books
router.get("/", BookController.getBooks)

// to get one book
router.get("/:id", BookController.getBookById);

// to update book
router.put("/:id", BookController.updateBookById);

// to delete book
router.delete("/:id", BookController.deleteBook);


// Export the router
module.exports = router;


/* 
[
  {
    "title": "Introduction to Algorithms",
    "isbn": "9780262033848",
    "authors": ["69c41b8f04a6b30171ffd9b5", "69c428506228ddd3ddd944d4"]
  },
  {
    "title": "Design Patterns: Elements of Reusable Object-Oriented Software",
    "isbn": "9780201633610",
    "authors": ["69c4c93899a70da7b80cdbc5", "69c41b8f04a6b30171ffd9b5", "69c3f024bfd8062f0ca851ae"]
  },
  {
    "title": "Refactoring: Improving the Design of Existing Code",
    "isbn": "9780201485677",
    "authors": ["69c41a9d04a6b30171ffd9b0"]
  }
] */