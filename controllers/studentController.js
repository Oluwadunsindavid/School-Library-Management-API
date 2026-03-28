const Student = require("../models/student");

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const student = await Student.create({ name, email });
    res.status(201).json({ message: "Student created successfully", student });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all Students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      message: "All the Students in the Database listed successfully",
      students,
    });
  } catch (err) {
    res.status(500).json({ error: err.messge });
  }
};

// Get student by id
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.status(200).json({ message: "Successfully called a student", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true },
    );
    if (!updatedStudent)
      return res.status(404).json({ error: "Student not found" });
    res
      .status(200)
      .json({ message: "Student updated successfully", updatedStudent });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ error: "Student not found" });
    res
      .status(200)
      .json({ message: "Student deleted successfully", deletedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
