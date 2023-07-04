import "./App.css";

import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BookList from "../../components/BookList/BookList";
import BookPage from "../../components/BookPage/BookPage";
import Header from "../../components/Header/Header";
import { dotEnv, MAX_RESULT } from "../../constants";
import getBooks from "../../utils/api/api";

function App() {
  const { API_KEY, URL_SITE } = dotEnv;

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState();

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
