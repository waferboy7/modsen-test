import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import BookList from "./components/BookList";
import ItemBook from "./components/ItemBook";

function App() {
  const API_KEY = "AIzaSyDaPmn0zO5pzRm65fdeFmSOIsPTaV4dY7M";
  const SITE = "https://www.googleapis.com/books/v1/volumes";

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState("");

  const loadBooks = (query, categories, orderBy) => {
    const readyQuery = query.split(" ").join("+");
    const authors = "";
    const startIndex = 0;
    const maxResults = 30;

    axios
      .get(
        SITE +
          "?q=intitle:" +
          readyQuery +
          "+subject:" +
          categories +
          "&startIndex=" +
          startIndex +
          "&maxResults=" +
          maxResults +
          "&orderBy=" +
          orderBy +
          "&key=" +
          API_KEY
      )
      .then(function (responce) {
        setCount(responce.data.totalItems);

        const listBooks = responce.data.items;

        if (listBooks.length > 0) {
          setBooks(
            listBooks.map((item) => {
              const infoAboutBook = {
                title: item.volumeInfo.title,
                authors: item.volumeInfo.authors,
                categories: item.volumeInfo?.categories?.[0],
                logo: item.volumeInfo.imageLinks?.thumbnail,
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
  
  return (
    <div className="App">
      <Header load={loadBooks} />
      {books.length > 0 ? <BookList books={books} count={count} /> : <></>}
    </div>
  );
}

export default App;
