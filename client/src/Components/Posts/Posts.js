import React from "react";
import Post from "../Post/Post";
import "./Posts.css";

function Posts(props) {
  return (
    <div className="posts">
      {props.post.map((p) => (
        <Post key={p._id} posts={p} />
      ))}
    </div>
  );
}

export default Posts;
