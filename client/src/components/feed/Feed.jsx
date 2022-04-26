import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import { useSelector } from "react-redux";

import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";

function Feed({ username }) {
  const { user } = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await Axios.get(`/api/posts/profile/` + username)
        : await Axios.get(`/api/posts/timeline/` + user._id);
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      ); // 최근 작성한 글 순서로 정렬
    };
    fetchPosts();
  }, [username, user]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {/*내 프로파일 페이지 일때만 쉐어박스 나옴 */}
        {(!username || username === user.username) && <Share />}
        {posts.map((p) => (
          <Post post={p} key={p._id} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
