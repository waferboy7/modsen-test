import "./BookList.css";

import React from "react";
import { v4 as uuidv4 } from "uuid";

import ItemBook from "../ItemBook/ItemBook";

function BookList({ load, count, books, isLoad }) {
  const loadMore = () => {
    load();
  };

  return (
    <main className="book-list">
      {isLoad && <h1 className="book-list-found">Loading...</h1>}
      {count === 0 && !isLoad && (
        <h1 className="book-list-found">Books not founded</h1>
      )}
      {count > 0 && <h1 className="book-list-found">Found {count} results</h1>}
      <div className="books">
        {books.length > 0 &&
          books.map((book) => <ItemBook key={uuidv4()} book={book} />)}
      </div>
      {count > 0 && count > books.length && (
        <button
          disabled={isLoad}
          type="submit"
          className="load-more-button"
          onClick={loadMore}
        >
          {isLoad ? "Loading..." : "Load more"}
        </button>
      )}
    </main>
  );
}

export default BookList;
