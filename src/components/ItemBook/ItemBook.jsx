import "./ItemBook.css";

import React from "react";
import { Link } from "react-router-dom";

function ItemBook({ book: { id, logo, title, authors, categories } }) {
  return (
    <div className="item-book">
      <div className="item-book-img">
        <Link to={id}>
          <img src={logo} alt="book" />
        </Link>
      </div>
      <div className="item-book-text">
        <h1>{title}</h1>
        {authors ? <p>{authors.join(", ")}</p> : null}
        <p className="category">{categories?.[0]}</p>
      </div>
    </div>
  );
}

export default ItemBook;
