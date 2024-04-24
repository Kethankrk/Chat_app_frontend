import React from "react";

function ChatMessage({ side, text, seen }) {
  return (
    <div className={`${side} flex mb-4`}>
      <div
        className={`px-8 py-2 rounded-xl relative ${
          side == "left-chat" ? "bg-gray-800" : "bg-green-700"
        } text-white font-medium`}
      >
        {text}
        {seen && (
          <p
            className={`text-[16px] absolute bottom-1 ${
              side == "left-chat" ? "left-2" : "right-2"
            } text-blue-400`}
          >
            ✓
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
