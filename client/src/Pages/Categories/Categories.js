import React, { useContext } from "react";
import { Link } from "react-router-dom";
import blogContext from "../../Context/Context-context";

import "./categories.css";

const Categories = () => {
  const { categories } = useContext(blogContext);

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
