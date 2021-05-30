const express = require("express");
const router = express.Router();
const passport = require("passport");
const todoController = require("../controller/TodoController");

require("../middleware/passport");

//GET Method
router.get("/", todoController.getAll);

//POST Method
router.post("/", todoController.createTodo);

//Patch Method
router.patch("/", todoController.updateTodo);

//Delete Mothod
router.delete("/:idTodo", todoController.deleteTodo);

module.exports = router;
