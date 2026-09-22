import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {type: String, required: true}, 
  email: {type: String, required: true, unique: true}, 
  password: String,
  createdAt: {type: Date, default: Date.now}
  // TODO: Define schema fields
});

const User = mongoose.model("User", userSchema);
export default User;