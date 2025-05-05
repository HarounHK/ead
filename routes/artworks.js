import express from "express"
import Artwork from "../models/Artwork.js"
import MyCollection from "../models/MyCollection.js";

const router = express.Router()

// Fetches all artworks with filters
router.get("/", async (req, res) => {
  const { year, department, artist } = req.query

  // Sets up a dynamic filter for Mongo queries
  const filter = {}
  if (year) filter.year = +year
  if (department) filter.department = department
  if (artist) filter.artist = { $regex: artist, $options: "i" } // Matches artist

  try {
    const artworks = await Artwork.find(filter) // fetch artworks based on filter
    res.json({ total: artworks.length, artworks }) // return total + results
  } catch (error) {
    res.status(500).json({ error }) 
  }

})

// Creates and saves a new artwork
router.post("/", async (req, res) => {
  try {
    const newArtwork = new Artwork(req.body) // Builds new doc from request body
    const saved = await newArtwork.save() // Saves to DB
    res.status(201).json(saved) // return the saved artwork
  } catch (error) {
    res.status(500).json({ error }) 
  }
})

// Updates an existing artwork using its ID
router.put("/:id", async (req, res) => {
  try {
    // Find artwork by ID and updateS it
    const updated = await Artwork.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (error) {
    res.status(500).json({ error }) 
  }
})

// deletes an artwork from the db usng its ID
router.delete("/:id", async (req, res) => {
  try {
    await Artwork.findByIdAndDelete(req.params.id) 
    res.json({ message: "Deleted" }) 
  } catch (error) {
    res.status(500).json({ error }) 
  }
})

// Adds purchased artworks to users collection in DB
router.post("/:id/purchase", async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).send("Artwork not found");

    // Creates new entry in  users collection
    const newEntry = new MyCollection({
      userId: req.session.user.id,
      artwork: {
        title: artwork.title,
        artist: artwork.artist,
        year: artwork.year,
        department: artwork.department,
        image: artwork.image,
        price: artwork.price
      }
    });

    await newEntry.save();

    res.json({ message: "Added to your collection", newEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Purchase failed" });
  }
});

// Returns all artworks in users collection
router.get("/my-collection", async (req, res) => {
  try {
    const collection = await MyCollection.find({ userId: req.session.user.id });
    res.json({ artworks: collection.map(entry => entry.artwork) });
  } catch (error) {
    res.status(500).json({ error: "Failed to load collection" });
  }
});

export default router