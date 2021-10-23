import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = (props) => {
  return (
    <div className="post">
      {props.posts.photo && (
        <img className="postImg" src={props.posts.photo} alt="" />
      )}
      <div className="postInfo">
        <div className="postCatagory">
          {props.posts.categories.map((cat) => (
            <span className="postCat" key={Math.random()}>
              {cat}
            </span>
          ))}
        </div>
        <Link to={`/post/${props.posts._id}`} className="Link">
          <span className="postTitle">{props.posts.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(props.posts.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDecs">{props.posts.desc}</p>
    </div>
  );
};

export default Post;
