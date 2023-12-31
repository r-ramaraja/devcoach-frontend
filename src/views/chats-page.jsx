import React from "react";
import MainMenu from "../components/main-nav";
import ProjectMenu from "../components/project-menu";
import { Outlet } from "react-router-dom";
import Chats from "../components/chats";

function ChatsPage() {
  return (
    <React.Fragment>
      <MainMenu className="w-2/12 h-full"/>
      <div className="w-10/12 h-full">
        <Outlet />
      </div>
    </React.Fragment>
  );
}

export default ChatsPage;
