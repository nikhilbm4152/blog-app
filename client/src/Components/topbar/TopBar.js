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
  const [searchInp, setSearchInp] = useState("");
  const [slideActive, setSlideActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  useEffect(() => {
    const fetchCatgy = async () => {
      const res = await axios.get("/catgy");
      category(res.data.map((cat) => cat.name));
    };
    fetchCatgy();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
  const serachHandler = (e) => {
    e.preventDefault();
    setSearchActive(true);
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    setSearchActive(false);
  };

  return (
    <React.Fragment>
      {slideActive && <Backdrop onClick={closeSlideHandler} />}
      {slideActive && (
        <SlideBar onClick={closeSlideHandler}>
          <NavLinks
            user={user}
            logOut={handleLogOut}
            active={slideActive}
            onClick={serachHandler}
          />
        </SlideBar>
      )}

      <div className="top">
        <div className="topLeft">
          <Link className="Link logo" to="/">
            EXPRESS IT OUT
          </Link>
        </div>
        <div className="topRight">
          <NavLinks user={user} logOut={handleLogOut} onClick={serachHandler} />
          {/* <i
            className=" topSearchIcon fas fa-search"
            onClick={serachHandler}
          ></i> */}
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
      {searchActive && (
        <div className="search">
          {/* <form> */}
          <input
            type="search"
            className="search_input"
            onChange={(e) => setSearchInp(e.target.value)}
          ></input>
          <div className="search_button" onClick={searchSubmitHandler}>
            <Link to={`/?search=${searchInp}`} className="Link search_button1">
              {/* <button type="submit" >
              </button> */}
              <i class="fas fa-long-arrow-alt-right seArrow"></i>
            </Link>
          </div>
          {/* </form> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default TopBar;
