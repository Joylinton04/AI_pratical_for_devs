import { Copy } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export type Message = {
   content: string;
   role: "user" | "bot";
};

type Props = {
   messages: Message[];
};

const ChatMessages = ({ messages }: Props) => {
    const lastMessageRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const onCopy = (e: React.ClipboardEvent<HTMLSpanElement>) => {
      const selection = window.getSelection()?.toString().trim();
      if (selection) {
         e.preventDefault();
         e.clipboardData.setData("text/plain", selection);
      }
   };

   return (
      <>
         {messages.map((message, i) => (
            <span
               key={i}
               onCopy={onCopy}
               ref={lastMessageRef}
               className={`px-4 py-2 rounded-xl text-sm ${
                  message.role === "user"
                     ? "bg-blue-600 text-white self-end"
                     : "bg-gray-100 text-black self-start"
               }`}
            >
               <Markdown
                  children={message.content}
                  components={{
                     code({ children, className, ...rest }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const [copied, setCopied] = useState(false);

                        const handleCopy = async () => {
                           await navigator.clipboard.writeText(
                              String(children)
                           );
                           setCopied(true);
                           setTimeout(() => setCopied(false), 1500);
                        };

                        return match ? (
                           <div className="my-2 border rounded-lg overflow-hidden text-left bg-[#1e1e2f]">
                              {/* Toolbar */}
                              <div className="flex justify-between items-center px-3 py-2 bg-[#2d2d3a] text-gray-300 text-xs font-mono">
                                 <span>{match[1]}</span>
                                 <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-1 hover:text-white transition"
                                 >
                                    <Copy size={14} />
                                    {copied ? "Copied!" : "Copy"}
                                 </button>
                              </div>

                              {/* Code block */}
                              <SyntaxHighlighter
                                 {...rest}
                                 PreTag="div"
                                 language={match[1]}
                                 style={oneDark}
                                 customStyle={{
                                    margin: 0,
                                    padding: "12px",
                                    fontSize: "0.85rem",
                                    overflowX: "auto",
                                 }}
                              >
                                 {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                           </div>
                        ) : (
                           <code
                              {...rest}
                              className="px-1 py-0.5 rounded bg-gray-200 text-red-600 font-mono text-sm"
                           >
                              {children}
                           </code>
                        );
                     },
                  }}
               />
            </span>
         ))}
      </>
   );
};

export default ChatMessages;
