import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Backdrop from "../../Components/topbar/Backdrop";
import blogContext from "../../Context/Context-context";
import Modal from "../../Util/model/Modal";

import "./Setting.css";

const Setting = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState([]);
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const { user, updateUser } = useContext(blogContext);

  useEffect(() => {
    setEmail(user.others.email);
    setUsername(user.others.username);
    setDesc(user.others.desc);
    setImage(user.others.profilepic);
    setFacebook(user.others.facebook);
    setInstagram(user.others.instagram);
    setTwitter(user.others.twitter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const settingHandler = async (e) => {
    e.preventDefault();
    try {
      let imageURL = "";
      if (!image) {
        if (file.length !== 0) {
          const urlRes = await axios.get("/s3url");
          const uploadUrl = urlRes.data.url;
          imageURL = uploadUrl.split("?")[0]; //getting the uploaded image in s3 link to store in the databasae
          try {
            await fetch(uploadUrl, {
              method: "PUT",
              headers: {
                "Content-Type": "multipart/form-data",
              },
              body: file,
            });
          } catch (error) {
            setError("Not Able To Upload IMAGE to AWS");
            setTimeout(() => {
              setError("");
            }, 6000);
          }
        }
      }

      if (email.length !== 0 && desc.length !== 0) {
        try {
          const res = await axios.put(`/user/${user.others._id}`, {
            email,
            desc,
            profilepic: file.length !== 0 ? imageURL : image,
            username,
            userId: user.others._id,
            twitter,
            facebook,
            instagram,
          });
          updateUser(res.data);
          res && window.location.replace("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 6000);
        }
      } else setError("Title and Discription Should not be EMPTY");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/s3del/user/${user.others._id}`, { method: "delete" });
    } catch (error) {
      setError("not able to delete image from aws");
    }
    const data = { username, userId: user.others._id };
    try {
      const res = await axios.delete(`/user/${user.others._id}`, {
        data,
      });
      res && window.location.replace("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };
  const closeModalHandler = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <React.Fragment>
      {showModal && <Backdrop onClick={closeModalHandler} />}
      {showModal && (
        <Modal
          footer={
            <React.Fragment>
              <button onClick={closeModalHandler} className="modal_button">
                Close
              </button>
              <button onClick={deleteHandler} className="modal_button">
                Delete
              </button>
            </React.Fragment>
          }
        >
          Are you sure u want to Delete this Account and all articles
        </Modal>
      )}
      <div className="settings">
        <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">ACCOUNT INFO</span>
            <span
              className="settingsDeleteTitle"
              onClick={(e) => setShowModal(true)}
            >
              Delete Account
            </span>
          </div>
          <form className="settingsForm" onSubmit={settingHandler}>
            <div className="settingsPP">
              <label>Profile Picture :</label>
              {file.length !== 0 ? (
                <img
                  className="writeImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
              ) : (
                <img src={image} alt="" />
              )}

              <label htmlFor="fileInput">
                <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
              />
            </div>
            <div className="settingsPP">
              <label>Username :</label>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
            </div>
            <div className="settingsPP">
              <label>Email :</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <label>Your Story:</label>
            <textarea
              type="description"
              value={desc ? desc : ""}
              placeholder="Tell us about You"
              className="settings_desc"
              required
              onChange={(e) => setDesc(e.target.value)}
            />
            <label className="socialLink">Add Your Social Links -</label>
            <span className="settingsPP2">
              <label>Facebook :</label>
              <input
                type="text"
                value={facebook ? facebook : ""}
                placeholder="add ur facebook link"
                onChange={(e) => setFacebook(e.target.value)}
              ></input>
            </span>
            <span className="settingsPP2">
              <label>Twitter :</label>
              <input
                type="text"
                value={twitter ? twitter : ""}
                placeholder="add ur twitter link"
                onChange={(e) => setTwitter(e.target.value)}
              ></input>
            </span>
            <span className="settingsPP2">
              <label>Instagram :</label>
              <input
                type="text"
                value={instagram ? instagram : ""}
                placeholder="add ur instagram link"
                required
                onChange={(e) => setInstagram(e.target.value)}
              ></input>
            </span>
            {error && <div className="error_setting">{error}</div>}
            <button className="settingsSubmit" type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Setting;
