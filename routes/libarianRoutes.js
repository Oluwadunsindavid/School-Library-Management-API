const express = require("express");
const router = express.Router();
const LiberianController = require("../controllers/libarianController");

// CRUD routes
// Create a libarian
router.post("/", LiberianController.createLiberian);

// // to get all libarians
router.get("/", LiberianController.getLiberians)

// // to get all libarian
router.get("/:id", LiberianController.getLiberianById)

// // to update libarian
router.put("/:id", LiberianController.updateLiberian);

// // to delete book
router.delete("/:id", LiberianController.deleteLiberian);

module.exports = router;
