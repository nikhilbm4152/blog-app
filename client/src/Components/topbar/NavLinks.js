import React, { useContext } from "react";
import { Link } from "react-router-dom";
import blogContext from "../../Context/Context-context";

const NavLinks = (props) => {
  const { categories } = useContext(blogContext);
  return (
    <nav className={props.active ? "side" : "topRight"}>
      <ul className="topList">
        <Link className="Link" to="/">
          <li className="topListItem">HOME</li>
        </Link>
        <li className="topListItem dropdown">
          <Link className="Link" to="/Categories">
            CATEGORIES <i className="fas fa-angle-down"></i>
          </Link>
          <div className="dropdown_content">
            {categories.slice(0, 3).map((c) => (
              <Link
                className="Link drop_link"
                to={`/?catgy=${c}`}
                key={Math.random()}
              >
                {c}
              </Link>
            ))}
            <Link className="Link drop_link" to="/Categories">
              More...
            </Link>
          </div>
        </li>
        <Link className="Link" to="/write">
          <li className="topListItem">WRITE</li>
        </Link>

        {props.user && (
          <li className="topListItem" onClick={props.logOut}>
            LOGOUT
          </li>
        )}
      </ul>

      {props.user ? (
        <Link to="/Setting">
          <img
            className="topImg"
            src="https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
        </Link>
      ) : (
        <ul className="topList">
          <Link className="Link" to="/Login">
            <li className="topListItem">LOGIN</li>
          </Link>
          <Link className="Link" to="/Register">
            <li className="topListItem">REGISTER</li>
          </Link>
        </ul>
      )}
      <i className=" topSearchIcon fas fa-search" onClick={props.onClick}></i>
    </nav>
  );
};

export default NavLinks;
