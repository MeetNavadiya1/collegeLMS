import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import studentRouter from './routes/studentRoutes.js'
import commonRouter from './routes/commonRoutes.js'

const PORT = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())
await connectDB()

app.use('/api/student', studentRouter)
app.use('/api/common', commonRouter)

app.get('/',(req, res)=>{
    res.send("API Working fine")
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})