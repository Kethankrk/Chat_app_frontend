import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import axios from "axios";

function Chat({ id, user, sendMessageFunc, setMessageList, messageList }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState("");
  const userId = localStorage.getItem("id");

  const sendMessage = () => {
    if (!currentMessage) return;
    const data = JSON.stringify({
      type: "message",
      message: currentMessage,
      sender: userId,
      receiver: `${user.id}`,
    });
    sendMessageFunc(data);
    setCurrentMessage("");
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/chat/?inbox_id=${id}`
        );
        setMessageList(response.data.chat);
        setIsLoading(false);
      } catch (e) {
        console.log(e.response);
        setIsLoading(false);
      }
    })();
  }, [id]);
  const messageJsx = messageList.map((msg) => (
    <ChatMessage
      side={msg.sender != userId ? "left-chat" : "right-chat"}
      text={msg.message}
      seen={msg.seen}
    />
  ));
  return (
    <div className="flex flex-col justify-between h-full">
      <nav className="h-[80px] bg-[#121b22] border-l border-gray-700 px-10 flex items-center gap-5">
        <div className="w-[30px] h-[30px] rounded-full">
          <img
            src={user.profile}
            alt="profile pic"
            className="h-full rounded-full w-full text-sm"
          />
        </div>
        <p className="text-white">{user.username}</p>
      </nav>
      <div className="chat-view overflow-scroll px-5 py-10 h-full">
        {isLoading ? <p>Loading</p> : messageJsx}
      </div>
      <form
        className="bg-[#121b22] py-5 px-10 flex gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
      >
        <input
          type="text"
          className="bg-[#0b141b] rounded-lg w-full py-1 px-5 outline-none text-slate-200"
          autoFocus
          placeholder="Message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button
          className="py-1 px-4 bg-green-500 text-white rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
