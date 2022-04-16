import React, { useContext, useState, useEffect } from 'react';
import Axios from 'axios';

import './feed.css';
import Share from '../share/Share';
import Post from '../post/Post';
import { AuthContext } from '../../context/AuthContext';

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");

  const { user } = useContext(AuthContext);
 
  useEffect(() => {
    const fetchPosts = async () => {
      const res = username ?
        await Axios.get(`/api/posts/profile/` + username) : await Axios.get(`/api/posts/timeline/` + user._id);
      setPosts(res.data.sort((p1,p2)=>{ return new Date(p2.createdAt) - new Date(p1.createdAt)}));
    }
    fetchPosts()
  }, [username, user._id])

  return (
    <div className="feed">
      {/* <input type="text" onChange={e => setText(e.target.value)} /> */}
      <div className="feedWrapper">
        <Share />
        {
          posts.map((p) =>
            <Post post={p} key={p._id} />
          )
        }
      </div>
    </div>
  )
}

export default Feed
