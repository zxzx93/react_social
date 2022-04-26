import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Add, Remove } from "@mui/icons-material";

import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { reset, logOut } from "../../features/auth/authSlice";

export default function Rightbar({ user }) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const history = useNavigate();
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // const { user: currentUser, dispatch } = useContext(AuthContext);

  const [friends, setFriends] = useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await Axios.get(`/api/users/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };

    getFriends();
  }, [user]);

  //currentUser : 로그인 사람, user : 친구
  //팔로워는 나를 친구로 등록한 사람, 팔로잉은 내가 친구로 등록한 사람
  const handleClick = async () => {
    console.log("fasdfasd", user._id, currentUser._id);

    // try {
    //   //팔로우 신청, 취소
    //   if (followed) {
    //     await Axios.put(`/api/users/${user._id}/unfollow`, {
    //       userId: currentUser._id,
    //     });
    //     dispatch({ type: "UNFOLLOW", payload: user._id });
    //   } else {
    //     await Axios.put(`/api/users/${user._id}/follow`, {
    //       userId: currentUser._id,
    //     });
    //     dispatch({ type: "FOLLOW", payload: user._id });
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    // setFollowed(!followed);
  };

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(reset());
    history("/login");
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img className="rightbarAd" src="/assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username ? (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollowed" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        ) : (
          <button className="rightbarLogOutButton" onClick={handleLogOut}>
            로그아웃
          </button>
        )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <div className="rightbarFollowing" key={friend._id}>
              <Link
                to={`/profile/${friend.username}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : `${PF}/person/noAvatar.png`
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
