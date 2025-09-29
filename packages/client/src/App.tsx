import React from "react";
import Chatbot from "./components/chat/Chatbot";

const App = () => {
   return (
      <div className="font-body max-w-7xl mx-auto h-screen py-2">
         <h1 className="text-center text-3xl font-bold">AI CHATBOT POWERED BY OPENAI </h1>
         <div className="flex justify-center items-center py-6 w-[45rem] mx-auto h-full">
            <Chatbot />
         </div>
      </div>
   );
};

export default App;
