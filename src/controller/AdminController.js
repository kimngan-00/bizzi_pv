const User = require("../model/User");

const getAllUser = async (req, res, next) => {
  try {
    const listUser = await User.find();
    return res.status(200).send(listUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { idUser } = req.params;
    
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUser,
};
