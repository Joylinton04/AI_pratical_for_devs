import OpenAI from "openai"
import { conversationRepositories } from "../repositories/conversation.repositories"

const client = new OpenAI({
    'apiKey': process.env.OPENAI_API_KEY
})

interface ChatResponse {
    id: string
    message: string
}


// public interface
// Leaky abstraction --> hides the complexity of the openAI model and returns the model's response 
// use a chat response interface
export const chatService = {
    async sendMessage (prompt: string, conversationId: string): Promise<ChatResponse> {
        const response = await client.responses.create({
            model: 'gpt-4.1-nano',
            input: prompt,
            max_output_tokens: 200,
            temperature: 0.2,
            previous_response_id: conversationRepositories.getLastResponseId(conversationId)
        })

        conversationRepositories.setLastResponseId(conversationId, response.id)
        // return response
        return {
            id: response.id,
            message: response.output_text
        }
    }
}