const express = require("express");
const router = express.Router();
const passport = require("passport");
const todoController = require("../controller/TodoController");

require("../middleware/passport");

//GET Method
router.get("/", (req, res, next) => {
  try {
    return res.send("pass authen");
  } catch (error) {
    next(error);
  }
});

//POST Method
router.post("/", todoController.createTodo);

//Patch Method

module.exports = router;
