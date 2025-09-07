import express from "express"
import mongoose from "mongoose"
import { v4 as uuidv4 } from "uuid"

const router = express.Router()

// Mongoose schema for storing items (posts)
const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Unique post ID (uuid)
  content: Object,                      // Post content (design, copy, etc.)
  sessionId: String                     // Session identifier for user isolation
})

const Item = mongoose.model("Item", ItemSchema)

// Save or update an item for the current session
router.post("/items", async (req, res) => {
  await Item.findOneAndUpdate(
    { id: req.body.id, sessionId: req.sessionId },
    { content: req.body.content },
    { new: true }
  )
  res.send("saved!")
})

// Create a new item and redirect to its editor page
router.get("/create", async (req, res) => {
  const newId = uuidv4()
  const newItem = new Item({
    id: newId,
    content: {},
    sessionId: req.sessionId
  })
  await newItem.save()
  res.redirect(`/new/${newId}`)
})

// Get all items for the current session
router.get("/items", async (req, res) => {
  const items = await Item.find({ sessionId: req.sessionId })
  res.json(items)
})

// Get a specific item by ID for the current session
router.get("/items/:id", async (req, res) => {
  const item = await Item.findOne({ id: req.params.id, sessionId: req.sessionId })
  res.json(item)
})

// Delete a specific item by ID for the current session
router.delete("/items/:id", async (req, res) => {
  await Item.findOneAndDelete({ id: req.params.id, sessionId: req.sessionId })
  res.json({ message: "Deleted" })
})

export default router