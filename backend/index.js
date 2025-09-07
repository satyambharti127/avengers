import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import indexRoutes from './routes/index.js'
import itemRoutes from "./routes/crud.js"
import { fileURLToPath } from 'url'
import path from 'path'

// Initialize Express app
const app = express()

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => { console.log('MongoDB connection established') })

// Middleware: Enable CORS, JSON parsing, and cookie parsing
app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Middleware: Handle session management with JWT in cookies
app.use((req, res, next) => {
  const token = req.cookies.session
  if (!token) {
    // No session cookie, create a new session
    const sessionId = new mongoose.Types.ObjectId().toString()
    const newToken = jwt.sign({ sessionId }, process.env.JWT)
    res.cookie('session', newToken, { httpOnly: true })
    req.sessionId = sessionId
  } else {
    try {
      // Verify existing session token
      const decoded = jwt.verify(token, process.env.JWT)
      req.sessionId = decoded.sessionId
    } catch {
      // Invalid token, create a new session
      const sessionId = new mongoose.Types.ObjectId().toString()
      const newToken = jwt.sign({ sessionId }, process.env.JWT)
      res.cookie('session', newToken, { httpOnly: true })
      req.sessionId = sessionId
    }
  }
  next()
})

// Middleware: Attach session filter for database queries
app.use((req, res, next) => {
  req.sessionFilter = { sessionId: req.sessionId }
  next()
})

// Register API routes
app.use('/', indexRoutes)
app.use(itemRoutes)

// Serve static files
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const staticPath = path.join(__dirname, 'static')
app.use(express.static(staticPath))

// Fallback route: Serve index.html for any unmatched route (SPA support)
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

// Start server
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})