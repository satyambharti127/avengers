import "dotenv/config"
import express from 'express'
import mongoose from 'mongoose'
const app = express()
const port = process.env.PORT || 8000



app.get('/', (req, res) => {
  res.send('test!')
})

await mongoose.connect(process.env.MONGOURL);

app.listen(port, () => {

})