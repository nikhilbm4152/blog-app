import React, { useContext, useState } from "react";
import axios from "axios";
import "./Write.css";
import blogContext from "../../Context/Context-context";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState([]);
  const [catgy, setCatgy] = useState([]);
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(false);

  const { user, categories } = useContext(blogContext);

  const categoryHandler = (e) => {
    e.preventDefault();
    setCatgy((catgy) => [...catgy, e.target.innerText]);
    setActive(false);
  };

  const categoryRemoveHandler = (e) => {
    e.preventDefault();
    let newselCatgy = catgy.filter((ct) => ct !== e.target.innerText);
    setCatgy(newselCatgy);
  };

  const handleDescSubmit = async (e) => {
    e.preventDefault();
    setloading(true);

    // Connecting to S3 bucket using the pre-signed URL from the Backend
    // And Uploding the object

    try {
      let imageURL = "";
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
        }
      }

      if (title.length !== 0 && desc.length !== 0) {
        try {
          const res = await axios.post("/post", {
            title,
            desc,
            categories: catgy,
            photo: imageURL,
            username: user.others.username,
          });
          window.location.replace("/post/" + res.data._id);
        } catch (error) {
          setError(error.response.data.error);
        }
      } else setError("Title and Discription Should not be EMPTY");
      setloading(false);
    } catch (error) {
      setError(error.response.data.error);
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
            required
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
          <div className="container">
            <h2> Select the Category</h2>
            <div className="select-box">
              <div className="selected" onClick={() => setActive(true)}>
                Categories
              </div>
              <div className={`options-container ${active ? "active" : ""} `}>
                {categories.map((c) => (
                  <div
                    className="option"
                    key={Math.random()}
                    onClick={categoryHandler}
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="selected_catgy">
                {catgy &&
                  catgy.map((c) => (
                    <span
                      className="selected_category"
                      onClick={categoryRemoveHandler}
                      key={Math.random()}
                    >
                      <i className="fas fa-times cross_catgy">
                        <h2 className="selected_catgy_name">{c}</h2>
                      </i>
                    </span>
                  ))}
              </div>
            </div>
          </div>
          {error && <div className="error_write">{error}</div>}
          <button className="writeSubmit" type="submit" disabled={loading}>
            Publish<i className="fas fa-cloud-upload-alt write_up"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
