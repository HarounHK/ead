import express from "express"
import bcrypt from "bcrypt"
import User from "../models/User.js"

const router = express.Router()

// Handles user signup and creates session
router.post("/signup", async (req, res) => {
  const {username, email, fullName, bio, password} = req.body     

  try {

    // Validates Fierlds
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).send("All fields are required")
    }

    // Makes sure password and confirmation match
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match")
    }

    // Prevents duplicate usernames
    const existing = await User.findOne({ username })
    if (existing) {
      return res.status(400).send("Username already taken")
    }

    // Hashes the password before saving
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create and stores user in DB
    const user = new User({username, email, fullName, bio, password: hashedPassword})
    await user.save()  

    // Saves user info to session
    req.session.user = { id: user._id, username: user.username }

    // Makes sure session is saved before redirecting
    req.session.save(() => {
      res.redirect("/") // go to homepage after signup
    })
  } catch (error) {
    res.status(500).send("Signup failed")
  }
})

// Handles user Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body

  try {
    
    // Finds user by username
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(400).send("Invalid credentials") 
    }

    // Checks pasword
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).send("Invalid credentials") 
    }

    req.session.user = { id: user._id, username: user.username }

    req.session.save(() => {
      res.redirect("/") 
    })
  } catch (error) {
    res.status(500).send("Login failed")
  }
})

// Handles logout and clears session
router.get("/logout", (req, res) => {
  req.session.destroy(error => {
    if (error) return res.status(500).send("Logout error") 
    res.redirect("/login.html") 
  })
})

export default router
