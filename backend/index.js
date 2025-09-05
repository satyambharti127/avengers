import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose'
import connectDB from "./config/db.config.js"
const app = express()
const port = process.env.PORT || 8000


connectDB();
app.get('/', (req, res) => {
  res.send('test!')
})



app.listen(port, () => {

})