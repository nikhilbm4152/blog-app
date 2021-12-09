import React, { useContext, useState } from "react";
import { Context } from "../../Context/context";
import axios from "axios";
import "./Write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState([]);
  const { user } = useContext(Context);

  const handleDescSubmit = async (e) => {
    e.preventDefault();
    // Connecting to S3 bucket using the pre-signed URL from the Backend
    // And Uploding the object

    try {
      let imageURL = "";
      if (file.length !== 0) {
        const urlRes = await axios.get("/s3url");
        const uploadUrl = urlRes.data.url;
        imageURL = uploadUrl.split("?")[0]; //getting the uploaded image in s3 link to store in the databasa
        console.log(uploadUrl);
        try {
          await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "multipart/form-data",
            },
            body: file,
          });
        } catch (error) {
          console.log(error);
        }
      }
      console.log(imageURL);
      try {
        const res = await axios.post("/post", {
          title,
          desc,
          photo: imageURL,
          username: user.username,
        });
        window.location.replace("/post/" + res.data._id);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="write">
      {file.length !== 0 ? (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      ) : null}
      <form className="writeForm" onSubmit={handleDescSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="writeFormGroups">
          <textarea
            type="text"
            placeholder="Tell Your Story"
            className="writeInput writeText"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
          <button className="writeSubmit" type="submit">
            Publish<i className="fas fa-cloud-upload-alt write_up"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
