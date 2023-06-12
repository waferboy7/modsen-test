import React from "react";

const ItemBook = ({ book }) => {
  return (
    <div className="item-book">
      <img src={book.logo} alt="" />
      <div className="item-book-text">
        <h1>{book.title}</h1>
        {book.authors.map((author, index) => (
          <p key={index}>{author}</p>
        ))}
        <p>{book.categories}</p>
      </div>
    </div>
  );
};

export default ItemBook;
