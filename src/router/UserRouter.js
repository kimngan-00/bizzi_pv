const express = require("express");
const router = express.Router();
const multer = require("multer");

const userController = require("../controller/UserController");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "src/public/image/user");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//Get Method
router.get("/", (req, res, next) => {
  try {
    return res.send("user get");
  } catch (error) {
    next(error);
  }
});

//Post Method
router.post("/register", upload.single("image_user"), userController.register);
router.post("/login", userController.login);

module.exports = router;
