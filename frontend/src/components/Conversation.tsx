import React from "react";
type Message = { text: string; sender: "user" | "llm" };
export default function Conversation({
  conversation,
  endRef,
}: {
  conversation: Message[];
  endRef: React.RefObject<HTMLDivElement|null>;
}) {
  return (
    <div className="py-9 px-3 space-y-6 h-full w-full overflow-scroll flex flex-col">
      {conversation.map((msg, index) => (
        <div
          key={index}
          className={`${
            msg.sender === "user"
              ? "bg-slate-700 rounded-lg p-3 w-5/6 self-end"
              : "bg-gray-800 whitespace-pre-wrap rounded-lg p-3 w-5/6"
          }`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}