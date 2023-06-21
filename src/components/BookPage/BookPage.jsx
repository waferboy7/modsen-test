import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookPage = ({ books }) => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const book = books.find((book) => book.id === bookId);

  if (book) {
    return (
      <div className="book-page">
        <div className="book-page-image-container">
          <div className="book-page-image-item">
            <img src={book.logo} alt=""></img>
          </div>
        </div>
        <div className="book-page-info">
          <button className="go-back-button" onClick={() => navigate(-1)}>
            Go back
          </button>
          <p className="category">{book.categories.join(" / ")}</p>
          <h1 className="title">{book.title}</h1>
          <p className="authors">{book.authors.join(", ")}</p>
          <p className="description">{book.description}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>NOT FOUND BOOK</h1>
      </div>
    );
  }
};

export default BookPage;
