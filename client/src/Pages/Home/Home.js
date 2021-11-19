import React, { useEffect, useState } from "react";
import Header from "../../Components/header/Header";
import Posts from "../../Components/Posts/Posts";
import SideBar from "../../Components/SideBar/SideBar";
import axios from "axios";
import "./home.css";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const userPath = location.search;
  //used to find the query (?) inside the url, which is passed to the home page as "?user=johnlll"from the singlepost link tag

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get("/post" + userPath);
      // in get method we just validate how we r passing the end URL
      // ie. it might be http://localhost:3000/api/post?user=johnlll or http://localhost:3000/api/post
      setPost(res.data);
    };
    fetchPost();
  }, [userPath]);

  console.log(post);

  return (
    <>
      <Header />
      <div className="home">
        {post.length === 0 ? (
          <p className="no_posts">
            "Sorry There are no article under this Catageory or User"
          </p>
        ) : (
          <Posts post={post} />
        )}

        {/* <SideBar /> */}
      </div>
    </>
  );
};

export default Home;
