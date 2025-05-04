import express from "express"
import dotenv from "dotenv"
import path from "path"
import cors from "cors"
import session from "express-session"
import MongoStore from "connect-mongo"
import connectDB from "./database.js"
import artworkRoute from "./routes/artworks.js"
import authRoutes from "./routes/auth.js"
import profileRoutes from "./routes/profile.js"

dotenv.config()

const app = express()
const __dirname = path.resolve()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Enables session handling and store sessions in MongoDB
app.use(session({
  secret: "secret",
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  resave: false,
  saveUninitialized: false
}));

// Connects API route files
app.use("/api/artworks", artworkRoute)
app.use("/api/profile", profileRoutes)
app.use("/auth", authRoutes)

// Redirects paths to static HTML pages
app.get("/login", (_r, res) => res.redirect("/login.html"))
app.get("/signup", (_r, res) => res.redirect("/signup.html"))


// Securioty - user must be logged in
app.get("/index.html", (req, res) => {
  if (!req.session.user) return res.redirect("/login.html")
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.get("/", (req, res) => {
  if (!req.session.user) return res.redirect("/login.html")
  res.sendFile(path.join(__dirname, "public", "index.html"))
})

// Serves all other static files 
app.use(express.static(path.join(__dirname, "public")))

// Connects to DB and starts server
const PORT = 8080
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`)
  })
})