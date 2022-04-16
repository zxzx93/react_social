import React, { useContext, useRef, useState } from "react";
import "./share.css";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import { AuthContext } from "../../context/AuthContext";
import Axios from "axios";

function Share(props) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const { user } = useContext(AuthContext);
  const desc = useRef();

  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    const newPost = { userId: user._id, desc: desc.current.value };

    //이미지 업로드할 경우
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await Axios.post("/api/upload", data);
      } catch (err) {}
    }

    //글만 쓸 경우
    try {
      await Axios.post("/api/posts", newPost);
      window.location.reload();
    } catch (error) {}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            className="shareInput"
            type="text"
            placeholder={`what's in your mind ${user.username}`}
            ref={desc}
          />
        </div>

        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>

          <button className="shareButton" type="submit">
            공유
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
