import "./App.css";

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { MAX_RESULT } from "../../constants/constants";
import getBooks from "../../utils/api/api";
import BookList from "../BookList/BookList";
import BookPage from "../BookPage/BookPage";
import Header from "../Header/Header";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const URL_SITE = process.env.REACT_APP_URL;

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  const [isLoad, setIsLoad] = useState(false);

  const search = async () => {
    setIsLoad(true);
    const startIndex = 0;

    const newBooks = await getBooks(
      URL_SITE,
      title,
      category,
      startIndex,
      MAX_RESULT,
      orderBy,
      API_KEY
    );

    setBooks(newBooks.data);
    setCount(newBooks.count);
    setIsLoad(false);
  };

  const loadMore = async () => {
    setIsLoad(true);
    const startIndex = books.length + 1;

    const newBooks = await getBooks(
      URL_SITE,
      title,
      category,
      startIndex,
      MAX_RESULT,
      orderBy,
      API_KEY
    );

    setBooks((prevBooks) => [...prevBooks, ...newBooks.data]);
    setCount(newBooks.count);

    setIsLoad(false);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          title={title}
          setTitle={setTitle}
          setCategory={setCategory}
          setOrderBy={setOrderBy}
          isLoad={isLoad}
          search={search}
        />
        <Routes>
          <Route
            path="/"
            element={
              <BookList
                books={books}
                count={count}
                load={loadMore}
                isLoad={isLoad}
              />
            }
          />
          <Route path="/:bookId" element={<BookPage books={books} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
