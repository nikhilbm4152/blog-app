import React, { useContext } from "react";
import { Link } from "react-router-dom";
import blogContext from "../../Context/Context-context";
import "./SideBar.css";

const SideBar = () => {
  return (
    <div className="sideBar">
      <span className="sideBarTitle">About Author</span>
      <div className="sideBarItems">
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p className="sas">
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident. Laboris sunt aute
          cupidatat velit magna velit ullamco dolore mollit amet ex esse.Sunt eu
          ut nostrud id quis proident. Laboris sunt aute cupidatat velit magna
          velit ullamco dolore mollit amet ex esse.Sunt eu ut nostrud id quis
          proident. Laboris sunt aute cupidatat velit magna velit ullamco dolore
          mollit amet ex esse.Sunt eu ut nostrud id quis proident.Laboris sunt
          aute cupidatat velit magna velit ullamco dolore mollit amet ex
          esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <span className="sideBarTitle">FOLLOW ME</span>
      <div className="sideBarItems">
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
