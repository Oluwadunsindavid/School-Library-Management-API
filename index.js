require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT;
const authorRoutes = require("./routes/authorRoutes");
const bookRoutes = require("./routes/bookRoutes");
const studentRoutes = require("./routes/studentRoutes");
const liberianRoutes = require("./routes/libarianRoutes");

// 🔥 Connect DB
connectDB();

app.use(express.json());

//integrate routes
app.use("/authors", authorRoutes);
app.use("/books", bookRoutes);
app.use("/students", studentRoutes);
app.use("/liberians", liberianRoutes);

app.get("/", (req, res) => {
  res.send("This awesome Library API is running!");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
