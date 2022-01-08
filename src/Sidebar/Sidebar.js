import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarPlaylists";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import { useStateValue } from "../StateProvider";

function Sidebar() {
  const [{playlists,token} , dispatch] = useStateValue();
  // console.log(playlists,token);

  return (
    <div className="sidebar">
      <img
        className="sidebar__logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt=""
      />
      <SidebarOption Icon={HomeIcon} option="Home" />
      <SidebarOption Icon={SearchIcon} option="Search" />
      <SidebarOption Icon={LibraryMusicIcon} option="Your Library" />
      <br />
      <strong className="sidebar__title"> MY PLAYLISTS</strong>
      <hr />
      {playlists?.body?.items?.map((playlist) => (
        <SidebarOption option={playlist.name} />
      ))}
    </div>
  );
}

export default Sidebar;
