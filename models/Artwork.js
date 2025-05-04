import mongoose from "mongoose";

const ArtworkSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    year: Number,
    department: String,
    image: String,
    price: Number,

    sold: { type: Boolean, default: false },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

export default mongoose.model("Artwork", ArtworkSchema);
