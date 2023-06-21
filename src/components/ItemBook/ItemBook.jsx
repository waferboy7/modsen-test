import React from "react";
import { Link } from "react-router-dom";

import "./ItemBook.css";

const ItemBook = ({ book }) => {
  return (
    <div className="item-book">
      <div className="item-book-img">
        <Link to={book.id}>
          <img src={book.logo} alt="" />
        </Link>
      </div>
      <div className="item-book-text">
        <h1>{book.title}</h1>
        {book.authors ? <p>{book.authors.join(", ")}</p> : null}
        <p className="category">{book.categories?.[0]}</p>
      </div>
    </div>
  );
};

export default ItemBook;
