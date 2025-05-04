import express from 'express'
import User from '../models/User.js'

const router = express.Router()

// Fetches users profile
router.get('/', async (req, res) => {
  try {
    // looksup user by session ID (excludes password)
    const user = await User.findById(req.session.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).send('Error loading profile') 
  }
})

// Updates users profile info 
router.post('/update', async (req, res) => {

  const { email, fullName, bio } = req.body // extract fields from request

  try {
    // Updates user doc in DB and returns updated user
    const updated = await User.findByIdAndUpdate(
      req.session.user.id,             
      { $set: { email, fullName, bio } }, 
      { new: true }                    
    ).select('-password')              

    res.json(updated) 
  } catch (error) {
    console.error(error) 
    res.status(500).send('Update failed') 
  }
})

export default router