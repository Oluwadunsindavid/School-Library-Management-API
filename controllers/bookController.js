// All the logics to speak to my book are written here
// When writing book logic, you are talking to book model and book model is talking to the database
const Book = require("../models/book");
const Author = require("../models/authors");

// Logic so that we can have the ability to borrow book

exports.borrowBook = async (req, res) => {
  try {
    // What is coming in? You manipulate what is scoming in anad use it to get what is going out
    const { studentId, staffId, returnDate } = req.body;

    // Check if the book is available
    const searchBook = await Book.findById(req.params.id);

    if (!searchBook) {
      return res.status(404).json({ message: "Book not found " });
    }

    // If book is out, tell students it is not available
    if (searchBook.status === "OUT") {
      return res.status(400).json({ message: "Book is already borrowed" });
    }

    //  If both above are correct, insert in out db
    searchBook.status = "OUT";
    searchBook.borrowedBy = studentId;
    searchBook.issuedBy = staffId;
    searchBook.returnDate = returnDate;

    await searchBook.save();

    return res
      .status(200)
      .json({ message: "Book borrowed successfully", book: searchBook });
  } catch (err) {
    // message from the system is shown directly
    return res.status(500).json({ message: err.message });
    // return res.status(400).json({ message: "Error occured" });
  }
};

// RETURN BOOK
exports.returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    // check if book exists
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // check if book is already returned
    if (book.status === "IN") {
      return res.status(400).json({ message: "Book is already in library" });
    }

    // reset fields
    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();

    res.status(200).json({
      message: "Book returned successfully",
      book,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.createBook = async (req, res) => {
//   try {
//     // status was not added below because "status already has a default ("IN")"
//     const { title, isbn, authors } = req.body;
//     // Book validation
//     if (!title || !authors) {
//       return res
//         .status(400)
//         .json({ message: "Title and authors are required" });
//     }
//     const book = await Book.create({ title, isbn, authors });

//     res.status(201).json(book);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// WORKING create book for a single upload of book at once

// Create a new Book
exports.createBook = async (req, res) => {
  try {
    // status was not added below because "status already has a default ("IN")"
    const { title, isbn, authors } = req.body;

    // Book validation
    if (!title || !isbn || !authors) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const book = await Book.create({
      title,
      isbn, // map correctly here
      authors,
      // DO NOT include borrowedBy or issuedBy
    });

    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// FOR MULTIPLE UPLOADS AT ONCE
exports.createBooks = async (req, res) => {
  try {
    const books = req.body; // now expecting an array
    if (!Array.isArray(books) || books.length === 0) {
      return res
        .status(400)
        .json({ message: "Request body must be a non-empty array" });
    }

    const createdBooks = await Book.insertMany(
      books.map((b) => {
        const { title, isbn, authors } = b;
        if (!title || !isbn || !authors)
          throw new Error("All fields are required for each book");
        return { title, isbn, authors };
      }),
    );

    res.status(201).json(createdBooks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// get all books
// exports.getBooks = async (req, res) => {
//   try {
//     const book = await Book.find();
//     res.status(200).json(book);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// GET ALL BOOKS BUT WITH PAGINATION THIS TIME AROUND
// exports.getBooks = async (req, res) => {
//   try {
//     // get query params
//     let { page = 1, limit = 10 } = req.query;

//     // convert to numbers
//     page = parseInt(page);
//     limit = parseInt(limit);

//     const skip = (page - 1) * limit;

//     // total books count
//     const total = await Book.countDocuments();

//     // fetch paginated books
//     const books = await Book.find()
//       .populate("authors")
//       .populate("issuedBy")
//       .populate("borrowedBy")
//       .skip(skip)
//       .limit(limit);

//     res.status(200).json({
//       total,
//       page,
//       limit,
//       totalPages: Math.ceil(total / limit),
//       books,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// GET ALL BOOKS BUT WITH PAGINATION, SEARCH AND FILTER THIS TIME AROUND
exports.getBooks = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = "" } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const skip = (page - 1) * limit;

    let query = {};

    // 🔥 SEARCH LOGIC (TITLE + AUTHOR NAME)
    if (search) {
      // find authors that match search
      const authors = await Author.find({
        name: { $regex: search, $options: "i" },
      });

      const authorIds = authors.map((a) => a._id);

      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { authors: { $in: authorIds } },
      ];
    }

    const total = await Book.countDocuments(query);

    const books = await Book.find(query)
      .populate("authors")
      .populate("issuedBy")
      .populate("borrowedBy")
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      books,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  Get one book (populate authors)
exports.getBookById = async (req, res) => {
  try {
    // step 1: get id from params
    const { id } = req.params;

    //   // step 2: find book + populate authors
    //   const book = await Book.findById(id)
    //   .populate("authors");
    //   .populate("issuedBy");   // 🔥 add this
    // .populate("borrowedBy");
    const book = await Book.findById(id)
      .populate("authors", "name")
      .populate("issuedBy", "name email")
      .populate("borrowedBy", "name matricNumber");

    // step 3: check if not found
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // step 4: return result
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a book
exports.updateBookById = async (req, res) => {
  try {
    const updateBookById = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updateBookById)
      return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ updateBookById });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
