import express from 'express'
import mongoose from 'mongoose'

import indexRoutes from "./routes/index.js";
import dotenv from "dotenv";


import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())

app.use(express.json());

app.use("/", indexRoutes);


const port = process.env.PORT || 8000

app.listen(port, () => {
console.log('ready')
})