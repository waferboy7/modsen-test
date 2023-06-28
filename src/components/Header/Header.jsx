import "./Header.css";

import React from "react";
import { useNavigate } from "react-router-dom";

import DropDown from "../Dropdown/Dropdown";

import { CATEGORY_OPTIONS, SORTING_OPTIONS } from "../../constants/constants";

function Header({ title, setTitle, setCategory, setOrderBy, search, isLoad }) {
  const navigate = useNavigate();

  const pressButtonSearch = () => {
    navigate("/");
    search();
  };

  const pressEnter = (e) => {
    if (e.key === "Enter") search();
  };

  const changeTitle = (e) => {
    setTitle(e.target.value);
  };

  const changeCategory = (e) => {
    setCategory(e.target.value);
  };

  const changeOrderBy = (e) => {
    setOrderBy(e.target.value);
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
        <button disabled={isLoad} type="button" onClick={pressButtonSearch}>
          Search
        </button>
      </div>
      <div className="filters">
        <div className="filter">
          <p>Categories</p>
          <DropDown options={CATEGORY_OPTIONS} onChange={changeCategory} />
        </div>
        <div className="filter">
          <p>Sorting by</p>
          <DropDown options={SORTING_OPTIONS} onChange={changeOrderBy} />
        </div>
      </div>
    </header>
  );
}

export default Header;
