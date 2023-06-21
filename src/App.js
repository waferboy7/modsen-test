import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import axios from "axios";

import "./App.css";

import Header from "./components/Header/Header";
import BookList from "./components/BookList/BookList";
import BookPage from "./components/BookPage/BookPage";

function App() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const SITE = "https://www.googleapis.com/books/v1/volumes";

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  const getFirstBooks = (query, categories, orderBy) => {
    const readyQuery = query.split(" ").join("+");
    const maxResults = 30;

    setTitle(readyQuery);
    setDescription("");
    setCategory(categories);
    setOrderBy(orderBy);

    setBooks([]);
    setCount("");

    axios
      .get(
        SITE +
        "?q=intitle:" +
        readyQuery +
        "+subject:" +
        category +
        "&startIndex=" +
        startIndex +
        "&maxResults=" +
        maxResults +
        "&orderBy=" +
        orderBy +
        "&key=" +
        API_KEY
      )
      .then((responce) => {
        setStartIndex(maxResults + 1);
        setCount(responce.data.totalItems);

        const listBooks = responce.data.items;

        if (listBooks.length > 0) {
          setBooks(
            listBooks.map((item) => {
              const infoAboutBook = {
                title: item.volumeInfo.title,
                description: item.volumeInfo.description || "",
                authors: item.volumeInfo.authors || [],
                categories: item.volumeInfo.categories || [],
                logo: item.volumeInfo.imageLinks?.thumbnail || "",
                id: item.id,
              };

              return infoAboutBook;
            })
          );
        }

        console.log(listBooks);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const loadMoreBooks = () => {
    const maxResults = 30;

    axios
      .get(
        SITE +
        "?q=intitle:" +
        title +
        "+subject:" +
        category +
        "&startIndex=" +
        startIndex +
        "&maxResults=" +
        maxResults +
        "&orderBy=" +
        orderBy +
        "&key=" +
        API_KEY
      )
      .then((responce) => {
        const listBooks = responce.data.items;
        console.log(listBooks);

        if (listBooks.length > 0) {
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

          setStartIndex((prevIndex) => prevIndex + maxResults);
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Header get={getFirstBooks} />
        <Routes>
          <Route path="/" element={<BookList books={books} count={count} load={loadMoreBooks} />} />
          <Route path="/:bookId" element={<BookPage books={books} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
