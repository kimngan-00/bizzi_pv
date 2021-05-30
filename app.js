const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");

const userRoute = require("./src/router/UserRouter");
const todoRoute = require("./src/router/TodoRouter");
const adminRoute = require("./src/router/AdminRouter");

require("./src/middleware/passport");

const PORT = 5000;
const mongoString =
  "mongodb+srv://admin:xYLJLKIUUROSApRl@cluster0.jqsm5.mongodb.net/todolist?retryWrites=true&w=majority";
const optionMongoose = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
//connect database
mongoose
  .connect(mongoString, optionMongoose)
  .then(() => console.log("connect db successfully"))
  .catch((err) => console.error("connect db fail: ", err));
mongoose.connect(mongoString, optionMongoose);

//Router
app.use("/user", userRoute);
app.use("/todo", passport.authenticate("jwt", { session: false }), todoRoute);
app.use(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  adminRoute
);

//Handle error
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use(function (error, req, res, next) {
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

app.listen(PORT, console.log(`start server on port ${PORT}`));
