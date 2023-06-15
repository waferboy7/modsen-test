import React, { useState } from "react";

const Header = (props) => {
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState("");
  const [orderBy, setOrderBy] = useState("relevance");

  const search = () => {
    props.get(query, categories, orderBy);
  };

  return (
    <header className="header">
      <h1>Search for book</h1>
      <div className="search">
        <input
          type="search"
          placeholder="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></input>
        <button onClick={search}>Search</button>
      </div>
      <div className="filters">
        <div className="filter">
          <p>Categories</p>
          <select onChange={(e) => setCategories(e.target.value)}>
            <option value="">All</option>
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
          <select onChange={(e) => setOrderBy(e.target.value)}>
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
