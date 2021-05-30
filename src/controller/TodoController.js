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

const deleteTodo = async (req, res, next) => {
  try {
    const { idTodo } = req.params;
    const user = req.user;
    const todoFound = await Todo.findById(idTodo);
    if (todoFound) {
      await Todo.findByIdAndDelete(idTodo);
      const todoList = await Todo.find({ user: user._id });
      return res.status(200).send(todoList);
    }

    return res.status(201).send("Todo khong ton tai hoac da bi xoa");
  } catch (error) {
    next(error);
  }
};

const updateTodo = async(req,res,next)=>{
  try {
    console.log("object");
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const user = req.user;
    const todoList = await Todo.find({ user: user._id });
    if (todoList) {
      return res.status(200).send(todoList);
    }
    return res.status(201).send("Nguoi dung chua tao todolist");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTodo,
  deleteTodo,
  getAll,
  updateTodo
};
