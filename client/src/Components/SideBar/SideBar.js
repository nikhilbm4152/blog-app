import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = () => {
  const [catgy, setCatgy] = useState([]);

  useEffect(() => {
    const fetchCatgy = async () => {
      const res = await axios.get("/catgy");
      setCatgy(res.data);
    };
    fetchCatgy();
  }, []);

  return (
    <div className="sideBar">
      <div className="sideBarItems">
        <span className="sideBarTitle">About Me</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sideBarItems">
        <span className="sideBarTitle">Catogories</span>
        <ul className="sideBarList">
          {catgy.map((c) => (
            <Link to={`/?catgy=${c.name}`} className="Link" key={c._id}>
              <li className="sideBarListItem">{c.name}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sideBarItems">
        <span className="sideBarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
