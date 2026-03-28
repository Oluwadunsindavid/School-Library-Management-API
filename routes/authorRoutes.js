const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");


/* import { Router } from "express";
const router = Router();
import { createAuthor, getAuthors, getAuthorById, updateAuthor, deleteAuthor } from "../controllers/authorController";
 */ 
// CRUD routes
router.post("/", AuthorController.createAuthor);
router.get("/", AuthorController.getAuthors);
router.get("/:id", AuthorController.getAuthorById);
router.put("/:id", AuthorController.updateAuthor);
router.delete("/:id", AuthorController.deleteAuthor);

module.exports = router;
