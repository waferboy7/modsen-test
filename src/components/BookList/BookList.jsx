import React, { useState } from "react";
import ItemBook from "../ItemBook/ItemBook";
import { v4 as uuidv4 } from "uuid";

const BookList = (props) => {
  const loadMore = () => {
    props.load();
  };

  return (
    <main className="book-list">
      {props.count !== "" ? (
        <h1 className="book-list-found">Found {props.count} results</h1>
      ) : null}
      <div className="books">
        {props.books.length > 0
          ? props.books.map((book) => (
              <ItemBook key={uuidv4()} book={book}></ItemBook>
            ))
          : null}
      </div>
      {props.count !== "" ? (
        <button className="load-more-button" onClick={loadMore}>
          Load more
        </button>
      ) : null}
    </main>
  );
};

export default BookList;
