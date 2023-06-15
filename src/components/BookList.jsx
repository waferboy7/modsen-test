import React, { useState } from "react";
import ItemBook from "./ItemBook";

const BookList = (props) => {
  const loadMore = () => {
    props.load();
  };
  try {
    return (
      <main className="book-list">
        {props.count !== "" ? (
          <h1 className="book-list-found">Found {props.count} results</h1>
        ) : (
          <></>
        )}
        <div className="books">
          {props.books.length > 0 ? (
            props.books.map((book, index) => (
              <ItemBook key={index} book={book}></ItemBook>
            ))
          ) : (
            <></>
          )}
        </div>
        {props.count !== "" ? (
          <button className="load-more-button" onClick={loadMore}>
            Load more
          </button>
        ) : (
          <></>
        )}
      </main>
    );
  } catch (e) {
    console.error(e);
  }
};

export default BookList;
