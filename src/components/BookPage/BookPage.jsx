import "./BookPage.css";

import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import noImage from "../../assets/image/noImage.svg";

function BookPage({ books }) {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const book = books.find((bookInBooks) => bookInBooks.id === bookId);

  return book ? (
    <div className="book-page">
      <div className="book-page-image-container">
        <img
          className="book-page-image-item"
          src={book.logo || noImage}
          alt=""
        />
      </div>
      <div className="book-page-info">
        <button
          type="button"
          className="go-back-button"
          onClick={() => navigate(-1)}
        >
          Go back
        </button>
        <p className="category">{book.categories.join(" / ")}</p>
        <h1 className="title">{book.title}</h1>
        <p className="authors">{book.authors.join(", ")}</p>
        <p className="description">{book.description || "No description"}</p>
      </div>
    </div>
  ) : (
    <div className="book-page-not-found">
      <h1 className="not-found">NOT FOUND BOOK</h1>
    </div>
  );
}

export default BookPage;
