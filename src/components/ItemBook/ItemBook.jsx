import "./ItemBook.css";

import React from "react";
import { Link } from "react-router-dom";

import noImage from "../../assets/image/noImage.svg";

function ItemBook({ book: { id, logo, title, authors, categories } }) {
  return (
    <Link to={id} className="item-book">
      <div className="item-book-image-container ">
        <img
          className="item-book-image-item"
          src={logo || noImage}
          alt="book"
        />
      </div>
      <div className="item-book-text">
        <h1>{title}</h1>
        {authors ? <p>{authors.join(", ")}</p> : null}
        <p className="category">{categories?.[0]}</p>
      </div>
    </Link>
  );
}

export default ItemBook;
