import express from "express";
import type {Request, Response} from 'express'
import cors from 'cors'



const app = express()
app.use(cors({
    origin: "http://localhost:5173"
}))


const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
    res.send("Hello")
})

app.get('/api/data', (req: Request, res:Response) => {
    res.json({
        name: "Joylinton",
        age: 21
    })
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
