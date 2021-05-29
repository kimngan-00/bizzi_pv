const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    jd: {
      type: String,
    },
    date: {
      type: Date,
    },
    note: {
      type: String,
    },
    isFinished: {
      type: Boolean,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { collection: "Todolist" }
);

module.exports = mongoose.model("Todolist", TodoSchema);
