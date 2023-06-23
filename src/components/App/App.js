import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";

import "./App.css";

import Header from "../Header/Header";
import BookList from "../BookList/BookList";
import BookPage from "../BookPage/BookPage";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const SITE = "https://www.googleapis.com/books/v1/volumes";
  const MAX_RESULT = 30;

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState("");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");
  const [startIndex, setStartIndex] = useState(0);

  const getBooks = (responce) => {
    setCount(responce.data.totalItems);

    const listBooks = responce.data.items;

    if (listBooks?.length > 0) {
      const newBooks = listBooks.map((item) => {
        const infoAboutBook = {
          title: item.volumeInfo.title,
          description: item.volumeInfo.description || "",
          authors: item.volumeInfo.authors || [],
          categories: item.volumeInfo.categories || [],
          logo: item.volumeInfo.imageLinks?.thumbnail || "",
          id: item.id,
        };

        return infoAboutBook;
      });

      setBooks((prevBooks) => [...prevBooks, ...newBooks]);
    }

    console.log(listBooks);

  };

  const getResponce = () => {
    const titleForSearch = title.split(" ").join("+");

    return axios
      .get(
        SITE +
        "?q=intitle:" +
        titleForSearch +
        "+subject:" +
        category +
        "&startIndex=" +
        startIndex +
        "&maxResults=" +
        MAX_RESULT +
        "&orderBy=" +
        orderBy +
        "&key=" +
        API_KEY
      );
  };

  const search = () => {
    setStartIndex(0);
    setBooks([]);
    setCount("");

    getResponce().then((responce) => {
      getBooks(responce);
    }).catch((e) => console.error(e));

    setStartIndex(MAX_RESULT + 1);
  };

  const loadMore = () => {
    getResponce().then((responce) => {
      getBooks(responce);
    }).catch((e) => console.error(e));

    setStartIndex((prevIndex) => prevIndex + MAX_RESULT);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header
          title={title}
          setTitle={setTitle}
          setCategory={setCategory}
          setOrderBy={setOrderBy}
          search={search}
        />
        <Routes>
          <Route path="/" element={
            <BookList
              books={books}
              count={count}
              load={loadMore} />
          } />
          <Route path="/:bookId" element={<BookPage books={books} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
