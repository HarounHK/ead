import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  fullName: { type: String },
  bio: { type: String }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
