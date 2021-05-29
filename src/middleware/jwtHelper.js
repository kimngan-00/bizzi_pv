const jwt = require("jsonwebtoken");

const TOKEN_SECRET = "TOKEN_SECRET";

const generateToken = async (data) => {
  try {
    const userData = {
      _id: data._id,
    };

    const token = await jwt.sign(userData, TOKEN_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (error) {
    console.error(error);
  }
};

const verifyToken = async (token) => {
  try {
    const decode = await jwt.verify(token, TOKEN_SECRET);
    return decode;
  } catch (error) {
    console.error(error);
  }
};

const isAuth = async (req, res, next) => {
  try {
    const REQ_TOKEN = req.headers["authorization"];

    

  } catch (error) {
    next(error);
  }
};
