import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogContext from "../../Context/Context-context";

import "./categories.css";

const Categories = () => {
  // const [catgy, setCatgy] = useState([]);

  // useEffect(() => {
  //   const fetchCatgy = async () => {
  //     const res = await axios.get("/catgy");
  //     setCatgy(res.data);
  //   };
  //   fetchCatgy();
  // }, []);
  const { categories } = useContext(blogContext);
  console.log(categories);
  return (
    <div className="category">
      <ul className="category_list">
        {categories.map((c) => (
          <Link
            to={`/?catgy=${c}`}
            className="Link category_list_Item type"
            key={Math.random()}
          >
            <li className="category_Item">{c}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
