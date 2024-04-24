import React from "react";

function UserCard({
  id,
  setActive,
  lastMessage,
  user,
  setActiveUser,
  notification = null,
}) {
  return (
    <div
      className="flex items-center gap-4 hover:bg-[#1b2833] px-3"
      onClick={() => {
        setActive(id);
        setActiveUser(user);
      }}
    >
      <div className="py-4">
        <div className="w-[50px] h-[50px] rounded-full">
          <img
            src={user.profile}
            alt="profile pic"
            className="h-full rounded-full w-full"
          />
        </div>
      </div>
      <div className="border-b border-gray-800 w-full py-4">
        <div className="flex justify-between">
          <p className="text-white">{user.username}</p>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-[11px] text-gray-500">7:15 pm</p>
            {notification && (
              <p className="text-sm rounded-full bg-green-500 h-5 w-5 text-center">
                1
              </p>
            )}
          </div>
        </div>
        <p className="text-gray-400 text-sm">
          {lastMessage != null ? lastMessage : "last message"}
        </p>
      </div>
    </div>
  );
}

export default UserCard;
