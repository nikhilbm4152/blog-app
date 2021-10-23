import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context/context";
import "./TopBar.css";

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i className=" topIcon fab fa-facebook-square"></i>
        <i className=" topIcon fab fa-instagram-square"></i>
        <i className=" topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="Link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="Link" to="/About">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="Link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="Link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogOut}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <img
            className="topImg"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="Link" to="/Login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="Link" to="/Register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <i className=" topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
};

export default TopBar;
