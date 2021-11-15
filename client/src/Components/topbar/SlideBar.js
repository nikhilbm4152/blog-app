import React from "react";
import ReactDOM from "react-dom";
import "./SlideBar.css";

const SlideBar = (props) => {
  const content = (
    <aside className="side_drawer" onClick={props.onClick}>
      {props.children}
    </aside>
  );

  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SlideBar;
