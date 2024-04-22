import React from "react";

function ChatMessage({ side, text }) {
  return (
    <div className={`${side} flex mb-4`}>
      <div
        className={`px-8 py-2 rounded-xl ${
          side == "left-chat" ? "bg-gray-800" : "bg-green-700"
        } text-white font-medium`}
      >
        {text}
      </div>
    </div>
  );
}

export default ChatMessage;
