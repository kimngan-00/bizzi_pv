const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    return res.send("pass admin autho");
  } catch (error) {
    res.send(error.message);

    // next(error);
  }
});

module.exports = router;
