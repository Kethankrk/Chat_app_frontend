import React from "react";

function SideNav() {
  return (
    <div className="p-2 rounded-lg bg-[#1f2c34] flex items-center gap-4 m-2">
      <div>
        <div className="w-[40px] h-[40px] rounded-full bg-[#121b22]"></div>
      </div>
      <div className="px-5 py-1 rounded-lg bg-[#121b22] h-fit w-full">
        <input
          type="text"
          placeholder="Search"
          className="border-none outline-none bg-transparent text-slate-200"
        />
      </div>
    </div>
  );
}
export default SideNav;
