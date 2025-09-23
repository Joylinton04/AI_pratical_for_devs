import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { chatRoute } from "./route/route";
 
dotenv.config()


const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

app.use('/api/chat', chatRoute)


const port = process.env.PORT || 3000


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
