import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import SinglePost from "../../Components/SinglePost/SinglePost";
import "./Single.css";

const Single = () => {
  return (
    <div className="single">
      <SinglePost />
      <SideBar />
    </div>
  );
};

export default Single;
