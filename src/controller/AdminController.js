const Todolist = require("../model/Todolist");
const User = require("../model/User");

const getAllUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role == "user") {
      return res.status(201).send("Ban khong phai admin");
    }

    const listUser = await User.find();
    return res.status(200).send(listUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role == "user") {
      return res.status(201).send("Ban khong phai admin");
    }

    const { idUser } = req.params;

    await User.findByIdAndDelete(idUser);
    await Todolist.deleteMany({ user: idUser});

    const userList = await User.find();
    return res.status(200).send(userList);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
  deleteUser,
};
