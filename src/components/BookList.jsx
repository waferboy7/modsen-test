import React, { useState } from "react";
import ItemBook from "./ItemBook";

const BookList = (props) => {
  return (
    <main className="book-list">
      {props.count !== "" ? <h1>Found {props.count} results</h1> : <></>}
      {props.books.map((book) => (
        <ItemBook key={book.id} book={book}></ItemBook>
      ))}
    </main>
  );
};

export default BookList;
