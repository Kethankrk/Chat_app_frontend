import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import SideNav from "../components/SideNav";
import Chat from "../components/Chat";
import Welcome from "../components/Welcome";
import { useNavigate } from "react-router-dom";
import { getReq } from "../helper/httpReq";

function Homepage() {
  const [activeMessage, setActiveMessage] = useState(null);
  const [inbox, setInbox] = useState([]);
  const [activeUser, setActiveUser] = useState({});
  const navigate = useNavigate();
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
  }, []);

  let sidePage = activeMessage ? (
    <Chat id={activeMessage} user={activeUser} />
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
              setActive={setActiveMessage}
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
