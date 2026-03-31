# 📚 Library Management API

A fully functional **Library Management System API** built with **Node.js, Express, and MongoDB**.
This project was developed as part of an assignment and focuses on building a robust, real-world backend system with proper data relationships and error handling.

Features

 📘 Create books (single & batch upload)
 🔍 Get all books and a single book by ID
 ✏️ Update book details
 ❌ Delete books
 🔄 Borrow and return book system
 🔗 Data relationships using MongoDB (Authors, Students, Library Attendants)
 📡 Populate referenced data (Mongoose populate)
 ⚠️ Proper error handling and validation

Borrowing System

The API supports a real-world borrowing lifecycle:

* A book can only be borrowed if it is available (`status: IN`)
* When borrowed:

  * Status changes to `OUT`
  * `borrowedBy` (Student) is recorded
  * `issuedBy` (Library Attendant) is recorded
* When returned:

  * Status resets to `IN`
  * All borrow-related fields are cleared

🛠️ Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* Postman (for API testing)

📂 Project Structure

Library-Management-API/
│
├── config/
│   └── db.js
|
├── controllers/
│   └── authorController.js
│   ├── bookController.js
│   ├── libarianController.js
│   └── studentController.js
│
├── models/
│   ├── authors.js
│   ├── book.js
│   ├── libarian.js
│   └── student.js
│
├── routes/
│   ├── authorRoutes.js
│   ├── bookRoutes.js
│   ├── libarianRoutes.js
│   └── studentRoutes.js
│
├── .env
├── .gitignore
├── index.js
└── package.json


## ⚙️ Installation & Setup

1. Clone the repository

```
git clone https://github.com/oluwadunsindavid/library-management-api.git
```

2. Navigate into the project

```
cd library-management-api
```

3. Install dependencies

```
npm install
```

4. Create a `.env` file

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Start the server

```
npm run dev
```

---

📡 API Endpoints

### 📘 Books

* `POST /books` → Create a book
* `POST /books/batch` → Create multiple books
* `GET /books/:id` → Get a book (with populated data)
* `PUT /books/:id` → Update a book
* `DELETE /books/:id` → Delete a book

---

### 🔄 Borrow & Return

* `POST /books/:id/borrow` → Borrow a book
* `POST /books/:id/return` → Return a book

---

## ⚠️ Challenges & Lessons Learned

During development, several real-world issues were encountered:

* ❌ **ObjectId Casting Errors**
  Fixed by ensuring only valid MongoDB ObjectIds are stored in referenced fields.

* ❌ **req.body Undefined**
  Resolved by adding `express.json()` middleware.

* ❌ **Incorrect HTTP Status Codes**
  Initially returned non-standard codes (e.g., 420), later corrected to proper REST standards.

* ❌ **MongoDB Service Issues**
  Fixed by restarting the MongoDB service and verifying connection setup.

These challenges significantly improved debugging and backend development skills.


## 🔐 Upcoming Improvements

* Authentication & Authorization (JWT)
* Borrow history tracking
* Role-based access control
* Deployment

---

## 👨‍💻 Author

Developed by **Akinmuboni Oluwadunsin** as part of a backend engineering learning journey at TA Academy.

---

## ⭐️ Show Your Support

If you found this project useful, feel free to ⭐️ the repo and share your feedback!
