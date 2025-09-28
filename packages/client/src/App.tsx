import React from "react";
import Chatbot from "./components/Chatbot";

const App = () => {
   return (
      <div className="font-body max-w-7xl mx-auto p-6">
         <h1 className="text-center text-3xl font-bold">AI CHATBOT POWERED BY OPENAI </h1>
         <div className="flex justify-center items-center">
            <Chatbot />
         </div>
      </div>
   );
};

export default App;
