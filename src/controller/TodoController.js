const Todolist = require("../model/Todolist");

const createTodo = async (req, res, next) => {
  try {
    const user = req.user;

    const newTodo = new Todolist({
      ...req.body,
      user: user._id,
    });
    await newTodo.save();
    const todoList = await Todolist.find({ user: user._id });
    return res.status(200).send(todoList);
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  try {
    const { idTodo } = req.params;
    const user = req.user;
    const todoFound = await Todolist.findById(idTodo);
    if (todoFound) {
      await Todolist.findByIdAndDelete(idTodo);
      const todoList = await Todolist.find({ user: user._id });
      return res.status(200).send(todoList);
    }

    return res.status(201).send("Todo khong ton tai hoac da bi xoa");
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  try {
    const idTodo = req.body.id;
    const user = req.user;
    const todoFound = await Todolist.findById(idTodo);

    if (todoFound) {
      const newTodo = {
        ...req.body,
      };

      await Todolist.findByIdAndUpdate(idTodo, newTodo);
      const todoList = await Todolist.find({ user: user._id });
      return res.status(200).send(todoList);
    }

    return res.status(201).send("Todo khong ton tai");
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const user = req.user;
    const todoList = await Todolist.find({ user: user._id });
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
  updateTodo,
};
