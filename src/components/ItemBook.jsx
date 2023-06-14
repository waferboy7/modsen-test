import React from "react";

const ItemBook = ({ book }) => {
  return (
    <div className="item-book">
      <div className="item-book-img">
        <img src={book.logo} alt="" />
      </div>
      <div className="item-book-text">
        <h1>{book.title}</h1>
        {book.authors ? <p>{book.authors.join(", ")}</p> : <></>}
        <p className="category">{book.categories}</p>
      </div>
    </div>
  );
};

export default ItemBook;
