const express = require("express");
const router = express.Router();
const adminController = require("../controller/AdminController");

router.get("/", adminController.getAllUser);

router.delete("/:idUser", adminController.deleteUser);

module.exports = router;
