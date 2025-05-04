import mongoose from 'mongoose'
import fs from 'fs/promises'
import path from 'path'
import dotenv from 'dotenv'
import Artwork from './models/Artwork.js'

dotenv.config()

const seedArtworks = async () => {
  try {

    // connect to MongoDB using URI from environment
    await mongoose.connect(process.env.MONGODB_URI)

    // construct full path to the local JSON file
    const dataPath = path.join(process.cwd(), 'Artworks.json')

    // read file contents and parse into JS object
    const rawData = await fs.readFile(dataPath, 'utf-8')
    const artworks = JSON.parse(rawData)

    // prepare the first 10 artworks with fallback defaults + random price
    const seedData = artworks.slice(0, 10).map((item, index) => ({
      title: item.Title || `Untitled ${index + 1}`, // use title or fallback
      artist: Array.isArray(item.Artist)
        ? item.Artist.join(', ')                    // join multiple artists
        : item.Artist || "Unknown",                 // fallback if empty
      year: parseInt(item.Date) || 1900,            // ensure year is a number
      department: item.Department || "Uncategorized", // fallback department
      image: item.ImageURL?.startsWith("http")
        ? item.ImageURL                             // use given image URL
        : `https://picsum.photos/seed/artwork${index}/600/400`, // fallback image
      price: Math.floor(Math.random() * 1000000 + 10000), // random price between 10k–1mil
    }))

    // insert prepared data into the DB
    await Artwork.insertMany(seedData)

    process.exit(0) // success: exit with code 0
  } catch (err) {
    process.exit(1) // fail: exit with error code
  }
}

seedArtworks() // run the function
