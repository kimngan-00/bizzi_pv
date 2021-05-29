const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const TOKEN_SECRET = "TOKEN_SECRET";

const createUser = async (req, res, next) => {
  try {
    const user = new User({
      ...req.body,
    });

    await user.save();
    return res.send(user);
  } catch (error) {
    next(error);
  }
};
const register = async (req, res, next) => {
  try {
    const file = req.file;
    const { email, pass } = req.body;
    var imgUser = "avatar-default.png";
    if (file) {
      imgUser = file.filename;
    }

    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res.status(201).send("Nguoi dung da ton tai");
      // handleErr(201, "Nguoi dung da ton tai");
    }
    const salt = bcrypt.genSaltSync(10);
    const passHash = bcrypt.hashSync(pass, salt);

    const user = new User({
      ...req.body,
      imgUser,
      pass: passHash,
    });

    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, pass } = req.body;

    const userFound = await User.findOne({ email: email });

    if (!userFound) {
      return res.status(201).send("Tai khoan khong ton tai");
    }

    const match = await bcrypt.compare(pass, userFound.pass);

    if (!match) {
      return res.status(202).send("Mat khau khong chinh xac");
    }

    const token = jwt.sign({ data: userFound._id }, TOKEN_SECRET, {
      expiresIn: "1d",
    });
    console.log("token: ", token);
    return res.status(200).send("Bearer " + token);
  } catch (error) {
    // next(error);
    return res.send(error.message);
  }
};

// const handleErr = (status, msg) => {
//   const err = new Error();
//   err.status = status || 500;
//   err.message = msg;

//   console.log(err)
//   // throw err;
// };

module.exports = {
  createUser,
  register,
  login,
};
