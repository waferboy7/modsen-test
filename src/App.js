import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import BookList from "./components/BookList";

function App() {
  const API_KEY = "AIzaSyDaPmn0zO5pzRm65fdeFmSOIsPTaV4dY7M";
  const SITE = "https://www.googleapis.com/books/v1/volumes";

  const [books, setBooks] = useState([]);
  const [count, setCount] = useState("");
  const [queryParams, setQueryParams] = useState({
    query: "",
    categories: "",
    orderBy: "",
    startIndex: 0,
  });

  const getFirstBooks = (query, categories, orderBy) => {
    const readyQuery = query.split(" ").join("+");
    const startIndex = 0;
    const maxResults = 30;

    setQueryParams({
      query: readyQuery,
      categories: categories,
      orderBy: orderBy,
      startIndex: maxResults + 1,
    });
    setBooks([]);
    setCount("");

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
      .then((responce) => {
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
                etag: item.etag,
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
          queryParams.query +
          "+subject:" +
          queryParams.categories +
          "&startIndex=" +
          queryParams.startIndex +
          "&maxResults=" +
          maxResults +
          "&orderBy=" +
          queryParams.orderBy +
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
              authors: item.volumeInfo.authors,
              categories: item.volumeInfo?.categories?.[0],
              logo: item.volumeInfo.imageLinks?.thumbnail,
              id: item.id,
            };

            return infoAboutBook;
          });

          setBooks([...books, ...newBooks]);

          setQueryParams({
            query: queryParams.query,
            categories: queryParams.categories,
            orderBy: queryParams.orderBy,
            startIndex: queryParams.startIndex + maxResults,
          });
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="App">
      <Header get={getFirstBooks} />
      <BookList books={books} count={count} load={loadMoreBooks} />
    </div>
  );
}

export default App;
