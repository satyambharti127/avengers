import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import indexRoutes from './routes/index.js'
import itemRoutes from "./routes/crud.js"
import { v4 as uuidv4 } from "uuid";
import { fileURLToPath } from 'url'
import path from 'path'

dotenv.config()

const app = express()

mongoose.connect(process.env.MONGO).then(()=>{console.log('mongo ready')})

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

app.use((req, res, next) => {
  const token = req.cookies.session
  if (!token) {
    const sessionId = new mongoose.Types.ObjectId().toString()
    const newToken = jwt.sign({ sessionId }, process.env.JWT)
    res.cookie('session', newToken, { httpOnly: true })
    req.sessionId = sessionId
  } else {
    try {
      const decoded = jwt.verify(token, process.env.JWT)
      req.sessionId = decoded.sessionId
    } catch {
      const sessionId = new mongoose.Types.ObjectId().toString()
      const newToken = jwt.sign({ sessionId }, process.env.JWT)
      res.cookie('session', newToken, { httpOnly: true })
      req.sessionId = sessionId
    }
  }
  next()
})

app.use((req, res, next) => {
  req.sessionFilter = { sessionId: req.sessionId }
  next()
})

app.use('/', indexRoutes)
app.use(itemRoutes)



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const staticPath = path.join(__dirname, 'static')

app.use(express.static(staticPath))

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})



const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log('ready')
})