import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import blogContext from "../../Context/Context-context";
import "./SideBar.css";

const SideBar = () => {
  const [isReadMore, setIsReadMore] = useState(true);
  const { user } = useContext(blogContext);

  const { profilepic, instagram, facebook, twitter, desc } = user.others;

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="sideBar">
      <span className="sideBarTitle">About Author</span>
      <div className="sideBarItems">
        {profilepic ? (
          <img src={profilepic} alt="" />
        ) : (
          <img
            src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
            alt=""
          />
        )}
        {desc ? (
          <p lassName="sas">
            {isReadMore ? desc.slice(0, 180) : desc}
            {desc.length > 150 && (
              <span onClick={toggleReadMore} className="readmore">
                {isReadMore ? "...read more" : " ...show less"}
              </span>
            )}
          </p>
        ) : (
          <p className="sas">
            ----Please Tell Us About You In The User Page----
            <br />
            <Link to="/Setting">click hear</Link>
          </p>
        )}
      </div>
      <span className="sideBarTitle">FOLLOW ME</span>
      <div className="sideBarItems">
        <div className="sidebarSocial">
          <a href={facebook} target="_blank" className="Link">
            <i className="sidebarIcon fab fa-facebook-square"></i>
          </a>
          <a href={instagram} target="_blank" className="Link">
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </a>
          <a href={twitter} target="_blank" className="Link">
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
