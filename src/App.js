import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import ItemBook from "./components/ItemBook";

function App() {
  const [count, setCount] = useState("");
  const [book, setBook] = useState({
    title: "",
    authors: [""],
    categories: "",
    logo: "",
  });

  const loadBooks = function () {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=js:keyes&key=AIzaSyDaPmn0zO5pzRm65fdeFmSOIsPTaV4dY7M"
      )
      .then(function (responce) {
        setCount(responce.data.totalItems);
        const book = responce.data.items[0];

        const firstBook = {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          categories: book.volumeInfo?.categories?.at(0),
          logo: book.volumeInfo.imageLinks.thumbnail,
        };

        setBook(firstBook);
      })

      .catch((e) => console.log(e));
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Search for book</h1>
        <div className="search">
          <input type="search" placeholder="search"></input>
          <button>Search</button>
        </div>
        <div className="filters">
          <div className="filter">
            <p>Categories</p>
            <select>
              <option value="">
                All
              </option>
              <option value="art">Art</option>
              <option value="biography">Biography</option>
              <option value="computers">Computers</option>
              <option value="history">History</option>
              <option value="medical">Medical</option>
              <option value="poetry">Poetry</option>
            </select>
          </div>
          <div className="filter">
            <p>Sorting by</p>
            <select>
              <option value="">
                Relevance
              </option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </header>
      <main className="book-list">
        <button onClick={loadBooks}>Press ME</button>
        <ItemBook book={book}></ItemBook>
        {count !== "" ? <h1>Found {count} results</h1> : <></>}
      </main>
    </div>
  );
}

export default App;
