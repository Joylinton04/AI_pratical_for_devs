import express from 'express'
import type { Request, Response } from 'express'
import { chatController } from '../controller/chat.controller'

const chatRoute = express.Router()

chatRoute.get('/', (req: Request, res: Response) => {
    res.send("Hello")
})

chatRoute.post('/api/chat', chatController.sendMessage)

export default chatRoute;