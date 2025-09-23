const conversations = new Map<string, string>()

export const conversationRepositories = {
    getLastResponseId(conversationId: string) {
        return conversations.get(conversationId)
    },
    setLastResponseId(conversationId: string, responseId: string) {
        return conversations.set(conversationId, responseId)
    }
}