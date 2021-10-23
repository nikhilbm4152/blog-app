import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./SinglePost.css";
import { Context } from "../../Context/context";

function SinglePost() {
  const [post, setPost] = useState({});
  const [upTitle, setUpTitle] = useState("");
  const [upDesc, setUpDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(Context);

  useEffect(() => {
    const getPost = async () => {
      const resPost = await axios.get("/post/" + path);
      setPost(resPost.data);
      setUpDesc(resPost.data.desc);
      setUpTitle(resPost.data.title);
    };
    getPost();
  }, [path]);

  const deleteHandler = async () => {
    try {
      await fetch(`/s3del/${post._id}`, { method: "delete" });
    } catch (error) {
      console.log(error);
    }
    try {
      const res = await axios.delete(`/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async () => {
    console.log("hi");
    try {
      await axios.put(`/post/${post._id}`, {
        username: user.username,
        title: upTitle,
        desc: upDesc,
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWraper">
        {post.photo && (
          <img className="singlePostImg" src={post.photo} alt=""></img>
        )}
        {/* if loop for updating the title and desc */}
        {updateMode ? (
          <input
            type="text"
            value={upTitle}
            className="singlePostTitleUpdate"
            onChange={(e) => {
              setUpTitle(e.target.value);
            }}
          ></input>
        ) : (
          <h1 className="singlePostTitle">
            {upTitle}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlePostIcon fas fa-trash-alt"
                  onClick={deleteHandler}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            <Link to={`/?user=${post.username}`} className="Link">
              Author : <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.updatedAt).toDateString()}
          </span>
        </div>

        {updateMode ? (
          <textarea
            type="text"
            value={upDesc}
            className="singlePostDescUpdate"
            onChange={(e) => {
              setUpDesc(e.target.value);
            }}
          />
        ) : (
          <p className="singlePostDesc">{upDesc}</p>
        )}

        {updateMode ? (
          <button
            type="button"
            onClick={updateHandler}
            className="updateButton"
          >
            Update
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SinglePost;
