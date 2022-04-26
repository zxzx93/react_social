import React from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Topbar() {
  const { user } = useSelector((state) => state.auth);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="logo">Social</div>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            className="searchInput"
            placeholder="친구의 게시글이나 영상을 검색하세요."
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">HomePage</span>
          <span className="topbarLink">timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">3</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/profile/${user?.username}`}>
            <img
              src={
                !user?.profilePicture
                  ? PF + "person/noAvatar.png"
                  : PF + user.profilePicture
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
