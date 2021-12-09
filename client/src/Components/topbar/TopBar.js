import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Context } from "../../Context/context";
import blogContext from "../../Context/Context-context";
import axios from "axios";
import Backdrop from "./Backdrop";
import NavLinks from "./NavLinks";
import SlideBar from "./SlideBar";
import "./TopBar.css";

const TopBar = () => {
  const { user, logout, category } = useContext(blogContext);
  const [slideActive, setSlideActive] = useState(false);

  useEffect(() => {
    const fetchCatgy = async () => {
      const res = await axios.get("/catgy");
      category(res.data.map((cat) => cat.name));
    };
    fetchCatgy();
  }, []);

  const handleLogOut = (e) => {
    e.preventDefault();
    // dispatch({ type: "LOGOUT" });
    logout();
  };

  const slideHandler = (e) => {
    e.preventDefault();
    setSlideActive(true);
  };

  const closeSlideHandler = (e) => {
    e.preventDefault();
    setSlideActive(false);
  };

  return (
    <React.Fragment>
      {slideActive && <Backdrop onClick={closeSlideHandler} />}
      {slideActive && (
        <SlideBar onClick={closeSlideHandler}>
          <NavLinks user={user} logOut={handleLogOut} active={slideActive} />
        </SlideBar>
      )}

      <div className="top">
        <div className="topLeft">
          <Link className="Link logo" to="/">
            EXPRESS IT OUT
          </Link>
        </div>
        <div className="topRight">
          <NavLinks user={user} logOut={handleLogOut} />
          <i className=" topSearchIcon fas fa-search"></i>
        </div>

        {!slideActive ? (
          <div className="burger" onClick={slideHandler}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        ) : (
          <div className="cross" onClick={closeSlideHandler}>
            <div className="line1"></div>
            <div className="line2"></div>
            <div className="line3"></div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default TopBar;
