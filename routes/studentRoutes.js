const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/studentController")

// CRUD routes
// Create a student
router.post("/", StudentController.createStudent);

// to get all students
router.get("/", StudentController.getStudents)

// to get all students
router.get("/:id", StudentController.getStudentById)

// to update student
router.put("/:id", StudentController.updateStudent);

// to delete book
router.delete("/:id", StudentController.deleteStudent);


module.exports = router;