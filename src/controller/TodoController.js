const Todo = require("../model/Todolist");

const createTodo = async (req, res, next) => {
  try {
    const user = req.user;

    const newTodo = new Todo({
      ...req.body,
      user,
    });

    await newTodo.save();
    return res.status(200).send(newTodo);
  } catch (error) {
    // return res.send(error.message);
    next(error);
  }
};

module.exports = {
  createTodo,
};
