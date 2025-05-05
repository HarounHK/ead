import mongoose from "mongoose";

const myCollectionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  artwork: {
    title: String,
    artist: String,
    year: Number,
    department: String,
    image: String,
    price: Number
  }
}, { timestamps: true });

export default mongoose.model("MyCollection", myCollectionSchema);