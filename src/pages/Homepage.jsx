import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import SideNav from "../components/SideNav";
import Chat from "../components/Chat";
import Welcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";
import { getReq } from "../helper/httpReq";

function Homepage() {
  const [activeInbox, setActiveInbox] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const [socket, setSocket] = useState(null);
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  const sentWebsocketMessages = (data) => {
    if (!data) return;
    socket.send(data);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
    (async () => {
      const response = await getReq("inbox");
      if (response.error) {
        return;
      }
      setInbox(response.data);
    })();

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/socket-server/`);

    setSocket(socket);

    socket.onopen = () => {
      console.log("Websocket Connection successfull");
      const data = JSON.stringify({
        type: "auth",
        token,
      });
      socket.send(data);
    };
    socket.onmessage = (msg) => {
      msg = JSON.parse(msg.data);
      if (msg.type == "notification") {
        console.log(msg);
        return;
      }
      setMessageList((prev) => [
        ...prev,
        { sender: msg.sender, message: msg.message },
      ]);
    };

    socket.onclose = (msg) => {
      console.log("connection closed ......");
    };
    return () => {
      console.log("Closing websocket connection");
      setMessageList([]);
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (!activeInbox) return;
    const message = JSON.stringify({
      type: "join_room",
      room: `${activeInbox}`,
    });
    socket.send(message);
  }, [activeInbox]);

  let sidePage = activeInbox ? (
    <Chat
      id={activeInbox}
      user={activeUser}
      sendMessageFunc={sentWebsocketMessages}
      messageList={messageList}
      setMessageList={setMessageList}
    />
  ) : (
    <Welcome />
  );
  return (
    <main className="flex h-screen">
      <div className="min-w-[350px] w-[400px] lg:w-[500px] bg-[#121b22]">
        <SideNav />
        <div className="">
          {inbox.map((item) => (
            <UserCard
              key={item.id}
              id={item.id}
              setActive={setActiveInbox}
              lastMessage={item.last_message}
              user={item.user}
              setActiveUser={setActiveUser}
            />
          ))}
        </div>
      </div>
      <div className="w-full bg-[#0b141b]">{sidePage}</div>
    </main>
  );
}

export default Homepage;
