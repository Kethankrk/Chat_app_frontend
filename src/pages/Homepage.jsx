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
  const userId = localStorage.getItem("id");

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
        if (msg.inbox == activeInbox) return;
        setInbox((prev) =>
          prev.map((item) => {
            if (item.id == msg.inbox) {
              return { ...item, notification: 1, last_message: msg.message };
            }
            return item;
          })
        );
        return;
      }
      if (msg.receiver == userId) {
        console.log("sending seen");
        socket.send(
          JSON.stringify({
            type: "msg_seen",
            id: msg.id,
          })
        );
      }
      setMessageList((prev) => [
        ...prev,
        { sender: msg.sender, message: msg.message, id: msg.id },
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
      <div className="w-[250px] md:w-[300px] lg:w-[500px] bg-[#121b22]">
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
              notification={item.notification}
            />
          ))}
        </div>
      </div>
      <div className="w-full bg-[#0b141b]">{sidePage}</div>
    </main>
  );
}

export default Homepage;
