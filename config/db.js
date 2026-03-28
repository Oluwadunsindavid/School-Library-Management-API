// Bring in your mongoose. Mongose helps you struture your mongodb schemas
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
    // If the connection does not succedd, catch the error
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
