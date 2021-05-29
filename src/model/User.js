const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    email: {
      required: true,
      unique: true,
      type: String,
    },
    pass: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    displayName: {
      type: String,
    },
    imgUser: {
      type: String,
    },

    birthday: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["male", "female", "another"],
      default: "male",
    },
    todoList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todolist",
      },
    ],
  },
  { collection: "User" }
);

module.exports = mongoose.model("User", UserSchema);
