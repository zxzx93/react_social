import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './post.css';
import { MoreVert } from '@mui/icons-material';
import { format } from 'timeago.js';
import { AuthContext } from '../../context/AuthContext';

function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isliked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const { user : currentUser} = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log("포스트", post);
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes])

  useEffect(() => {
    const fetchUser = async () => {
      const res = await Axios.get(`/api/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchUser()
  }, [post.userId])

  const likeHandler = () => {
    try {
      Axios.put(`/api/posts/${post._id}/like`, {userId:currentUser._id})
    } catch (error) {
      
    }
    setLike(isliked ? like - 1 : like + 1);
    setIsLiked(!isliked);
  };
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img className="postProfileImg" src={user.profilePicture || PF + "person/noAvatar.png"} alt="" />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">
              {format(post.createdAt)}
              {/* {post.createdAt} */}
            </span>
          </div>
          <div className="postTopRight"><MoreVert /></div>
        </div>

        <div className="postCenter">
          <div className="postText">{post?.desc}</div>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>

        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}/like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}/heart.png`} alt="" />
            <span className="postLikeCounter">{like}   people like it</span>
          </div>
          <div className="postBottomRight">
            <div className="postCommentText">{post.comment} comments</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;