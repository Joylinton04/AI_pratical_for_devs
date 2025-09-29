import React from "react";
import { useForm } from "react-hook-form";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export type ChatFormData = {
   prompt: string;
};

type Prop = {
   onSubmit: ({ prompt }: ChatFormData) => Promise<void>;
};

const ChatInput = ({ onSubmit }: Prop) => {
   const { register, handleSubmit, formState, reset } = useForm<ChatFormData>();


   const submit = handleSubmit(data => {
      reset({ prompt: "" });
      onSubmit(data);
   });

   const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
         e.preventDefault();
         submit()
      }
   };
   
   return (
      <form
         onSubmit={submit}
         onKeyDown={onKeyDown}
         className="p-4 flex flex-col gap-2 items-end w-full border rounded-xl"
      >
         <textarea
            {...register("prompt", {
               required: true,
               validate: (data) => data.trim().length > 0,
            })}
            autoFocus
            className="p-2 w-full h-40 focus:outline-none resize-none"
            placeholder="Ask anything"
            maxLength={1000}
         />
         <Button disabled={!formState.isValid} className="rounded-full h-9 w-9">
            <ArrowUp />
         </Button>
      </form>
   );
};

export default ChatInput;
