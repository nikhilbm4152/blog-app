import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./categories.css";

const Categories = () => {
  const [catgy, setCatgy] = useState([]);

  useEffect(() => {
    const fetchCatgy = async () => {
      const res = await axios.get("/catgy");
      setCatgy(res.data);
    };
    fetchCatgy();
  }, []);
  return (
    <div className="category">
      <ul className="category_list">
        {catgy.map((c) => (
          <Link
            to={`/?catgy=${c.name}`}
            className="Link category_list_Item type"
            key={c._id}
          >
            <li className="category_Item">{c.name}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
