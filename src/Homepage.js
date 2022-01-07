import React from "react";
import "./Homepage.css";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Dashboard/Dashboard";

function Player({ spotify }) {
  return (
    <div className="player">
      <div className="player__body">
        <Sidebar />
        <Dashboard spotify={spotify} />
      </div> 
    </div>
  );
}

export default Player;
