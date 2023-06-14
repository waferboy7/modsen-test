import React, { useState } from "react";
import ItemBook from "./ItemBook";

const BookList = (props) => {
  return (
    <main className="book-list">
      {props.count !== "" ? (
        <h1 className="book-list-found">Found {props.count} results</h1>
      ) : (
        <></>
      )}
      <div className="books">
        {props.books.map((book) => (
          <ItemBook key={book.id} book={book}></ItemBook>
        ))}
      </div>
      <button className="load-more-button">Load more</button>
    </main>
  );
};

export default BookList;
