import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogContext from "../../Context/Context-context";
import "./SideBar.css";

const SideBar = () => {
  const [user, setUser] = useState({});
  const [isReadMore, setIsReadMore] = useState(true);
  const { postUser } = useContext(blogContext);

  // const { profilepic, instagram, facebook, twitter, user.desc } = user;

  useEffect(() => {
    if (postUser.length !== 0) {
      const userRes = async () => {
        const res = await axios.get(`/user/?username=${postUser}`);
        setUser(res.data[0]);
      };
      userRes();
    }
  }, [postUser]);

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className="sideBar">
      <span className="sideBarTitle">About Author</span>
      <div className="sideBarItems">
        {user.profilepic ? (
          <img src={user.profilepic} alt="" />
        ) : (
          <img
            src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
            alt=""
          />
        )}
        {user.desc ? (
          <p className="sas">
            {isReadMore ? user.desc.slice(0, 180) : user.desc}
            {user.desc.length > 150 && (
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
          <a
            href={user.facebook}
            rel="noreferrer"
            target="_blank"
            className="Link"
          >
            <i className="sidebarIcon fab fa-facebook-square"></i>
          </a>
          <a
            href={user.instagram}
            rel="noreferrer"
            target="_blank"
            className="Link"
          >
            <i className="sidebarIcon fab fa-instagram-square"></i>
          </a>
          <a
            href={user.twitter}
            rel="noreferrer"
            target="_blank"
            className="Link"
          >
            <i className="sidebarIcon fab fa-twitter-square"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
