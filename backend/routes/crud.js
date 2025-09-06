import express from "express"
import mongoose from "mongoose"
import {v4 as uuidv4} from "uuid"

const router = express.Router()

const ItemSchema = new mongoose.Schema({
  id: { type: String, required: true }, // new uuid
  content: Object,
  sessionId: String
});

const Item = mongoose.model("Item", ItemSchema)

router.post("/items", async (req, res) => {
await Item.findOneAndUpdate(
    { id: req.body.id, sessionId: req.sessionId },
    { content: req.body.content },
    { new: true }
  );
res.send("saved!")
})


router.get("/create", async (req, res) => {
  const newId = uuidv4();
  const newItem = new Item({
    id: newId,
    content: {},
    sessionId: req.sessionId
  });
  await newItem.save();

  res.redirect(`/new/${newId}`);
});



router.get("/items", async (req, res) => {
  const items = await Item.find({ sessionId: req.sessionId })
  res.json(items)
})

router.get("/items/:id", async (req, res) => {
  const item = await Item.findOne({ id: req.params.id, sessionId: req.sessionId })
  res.json(item)
})



router.delete("/items/:id", async (req, res) => {
  await Item.findOneAndDelete({ id: req.params.id, sessionId: req.sessionId })
  res.json({ message: "Deleted" })
})

export default router