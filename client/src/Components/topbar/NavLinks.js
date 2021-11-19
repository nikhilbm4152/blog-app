import React from "react";
import { Link } from "react-router-dom";

const NavLinks = (props) => {
  return (
    <nav className={props.active ? "side" : "topRight"}>
      <ul className="topList">
        <li className="topListItem">
          <Link className="Link" to="/">
            HOME
          </Link>
        </li>
        <li className="topListItem">
          <Link className="Link" to="/Categories">
            CATEGORIES <i class="fas fa-angle-down"></i>
          </Link>
        </li>
        <li className="topListItem">
          <Link className="Link" to="/write">
            WRITE
          </Link>
        </li>
        <li className="topListItem" onClick={props.logOut}>
          {props.user && "LOGOUT"}
        </li>
      </ul>
      {/* </div>
      <div className="topRight"> */}
      {props.user ? (
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
    </nav>
  );
};

export default NavLinks;
