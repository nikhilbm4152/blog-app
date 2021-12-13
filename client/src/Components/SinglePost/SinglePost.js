import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./SinglePost.css";
import blogContext from "../../Context/Context-context";

function SinglePost() {
  const [post, setPost] = useState({});
  const [upTitle, setUpTitle] = useState("");
  const [upDesc, setUpDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user } = useContext(blogContext);

  useEffect(() => {
    const getPost = async () => {
      const resPost = await axios.get("/post/" + path);
      setPost(resPost.data);
      setUpDesc(resPost.data.desc);
      setUpTitle(resPost.data.title);
      setCategories(resPost.data.categories);
    };
    getPost();
  }, [path]);

  const deleteHandler = async () => {
    try {
      await fetch(`/s3del/${post._id}`, { method: "delete" });
    } catch (error) {
      setError("not able to delete image from aws");
    }
    try {
      const res = await axios.delete(`/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
      console.log(res);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const updateHandler = async () => {
    try {
      await axios.put(`/post/${post._id}`, {
        username: user.username,
        title: upTitle,
        desc: upDesc,
      });
      window.location.reload();
    } catch (error) {
      setError(error.response.data.error);
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
            {post.username === user?.others.username && (
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
        <div className="post_catgy">
          {categories &&
            categories.map((c) => (
              <span className="post_category" key={Math.random()}>
                <i className="fas fa-tag tag_catgy">
                  <h2 className="post_catgy_name">{c}</h2>
                </i>
              </span>
            ))}
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
        {error && <div className="error_post">{error}</div>}
      </div>
    </div>
  );
}

export default SinglePost;
