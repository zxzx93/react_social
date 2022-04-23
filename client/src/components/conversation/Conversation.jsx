import Axios from "axios";
import { useState, useEffect } from "react";
import "./conversation.css";

const Conversation = ({ currentUser, conversation }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    //메세지 보낼 친구 리스트 가져오기
    const getUser = async () => {
      try {
        const res = await Axios.get("/api/users?userId=" + friendId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : `${PF}/person/noAvatar.png`
        }
        alt=""
        className="conversationImg"
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
