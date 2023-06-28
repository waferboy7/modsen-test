import "./Dropdown.css";

import React from "react";

function Dropdown({ onChange, options }) {
  return (
    <select onChange={onChange}>
      {options.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
