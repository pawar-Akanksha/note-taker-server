const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NoteSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  {timestamps: true}
);

const UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;