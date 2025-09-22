import express from "express";
import type { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import OpenAI from "openai";

dotenv.config()

const client = new OpenAI({
    'apiKey': process.env.OPENAI_API_KEY
})


const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173"
}))

const conversations = new Map<string, string>()

app.post('/api/chat', async (req: Request, res: Response) => {
    const { prompt, conversationId } = req.body;

    const response = await client.responses.create({
        model: 'gpt-4.1-nano',
        input: prompt,
        max_output_tokens: 100,
        temperature: 0.2,
        previous_response_id: conversations.get(conversationId)
    })
    conversations.set(conversationId, response.id)
    console.log(conversations)
    res.json({ message: response.output_text })
})


const port = process.env.PORT || 3000

app.get('/', (req: Request, res: Response) => {
    res.send("Hello")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
