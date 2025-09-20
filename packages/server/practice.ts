import dotenv from 'dotenv'
import OpenAI from "openai";

dotenv.config()

const client = new OpenAI({
'apiKey': process.env.OPENAI_API_KEY
})


const response = await client.responses.create({
    model: 'gpt-4.1',
    max_output_tokens: 100,
    input: "In 100 tokens, write a motivational message for someone pursing a career path in cybersecurity and software development"
})

console.log(response.output_text)