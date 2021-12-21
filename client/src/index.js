import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import BlogState from "./Context/Context-State";
// import { ContextProvider } from "./Context/context";

ReactDOM.render(
  <React.StrictMode>
    {/* <ContextProvider>
    </ContextProvider> */}
    <BlogState>
      <App />
    </BlogState>
  </React.StrictMode>,
  document.getElementById("root")
);
