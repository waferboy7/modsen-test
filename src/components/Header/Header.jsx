import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MySelect from "../MySelect/MySelect";

const Header = ({ title, setTitle, setCategory, setOrderBy, search }) => {
  const navigate = useNavigate();

  const pressButtonSearch = () => {
    search();

    navigate("/");
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") search();
  };

  const changeTitle = (searchValue) => {
    setTitle(searchValue.target.value);
  };

  const changeCategory = (category) => {
    setCategory(category.target.value);
  };

  const changeOrderBy = (order) => {
    setOrderBy(order.target.value);
  };

  return (
    <header className="header">
      <h1>Search for book</h1>
      <div className="search">
        <input
          type="search"
          placeholder="search..."
          value={title}
          onChange={changeTitle}
          onKeyDown={pressEnter}
        />
        <button onClick={pressButtonSearch}>Search</button>
      </div>
      <div className="filters">
        <div className="filter">
          <p>Categories</p>
          <MySelect
            options={[
              { value: "", name: "All" },
              { value: "art", name: "Art" },
              { value: "biography", name: "Biography" },
              { value: "computers", name: "Computers" },
              { value: "history", name: "History" },
              { value: "medical", name: "Medical" },
              { value: "poetry", name: "Poetry" },
            ]}
            onChange={changeCategory}
          />
        </div>
        <div className="filter">
          <p>Sorting by</p>
          <MySelect
            options={[
              { value: "relevance", name: "Relevance" },
              { value: "newest", name: "Newest" },
            ]}
            onChange={changeOrderBy}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
