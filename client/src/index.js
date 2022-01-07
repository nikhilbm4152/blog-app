import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BlogState from "./Context/Context-State";

ReactDOM.render(
  <React.StrictMode>
    <BlogState>
      <App />
    </BlogState>
  </React.StrictMode>,
  document.getElementById("root")
);
