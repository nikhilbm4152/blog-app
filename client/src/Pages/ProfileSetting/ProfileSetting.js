import React from "react";
import SideBar from "../../Components/SideBar/SideBar";
import "./ProfileSetting.css";

const ProfileSetting = () => {
  return (
    <div className="settings">
      <div className="SettingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update your account</span>
          <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingsForm">
          <label>Prolile Image</label>
          <div className="settingsPP">
            <img
              className="SettingsImg"
              src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
            ></img>
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
            ></input>
          </div>
          <label> User Name</label>
          <input type="text" placeholder="Safak" />
          <label> Email</label>
          <input type="email" placeholder="safak@test.com" />
          <label> Password</label>
          <input type="password" placeholder="password" />
          <button className="settingButton">Update</button>
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default ProfileSetting;
