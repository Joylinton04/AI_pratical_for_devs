import { useRef, useState } from "react";
import axios from "axios";
import TypingIndicator from "./TypingIndicator";
import type { Message } from "./ChatMessages";
import ChatMessages from "./ChatMessages";
import ChatInput, { type ChatFormData } from "./ChatInput";


type chatResponse = {
   message: string;
};


const Chatbot = () => {
   const [messages, setMessages] = useState<Message[]>([]);
   const [isBotTyping, setIsBotTying] = useState(false);
   const [error, setError] = useState("");
   const conversationId = useRef(crypto.randomUUID());

   const onSubmit = async ({ prompt }: ChatFormData) => {
      try {
         setMessages((prev) => [...prev, { content: prompt, role: "user" }]);
         
         setIsBotTying(true);
         setError("");
         const { data } = await axios.post<chatResponse>("/api/chat", {
            prompt,
            conversationId: conversationId.current,
         });
         setMessages((prev) => [
            ...prev,
            { content: data.message, role: "bot" },
         ]);
      } catch (err) {
         console.log(err);
         setError("Something went wrong, try again");
      } finally {
         setIsBotTying(false);
      }
   };


   return (
      <div className="w-full h-full flex flex-col">
         <div className="flex flex-col gap-4 py-4 mb-4 flex-1 overflow-y-auto">
            <ChatMessages messages={messages}/>
            {isBotTyping && <TypingIndicator/>}
            {error && <p className="text-red-500">{error}</p>}
         </div>

         <ChatInput onSubmit={onSubmit}/>
      </div>
   );
};

export default Chatbot;
