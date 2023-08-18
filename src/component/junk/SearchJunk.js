import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style/SearchJunk.module.css";

const SearchJunk = () => {
  const [enterNumber, setEnterNumber] = useState();
  const nav = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setEnterNumber(e.target.value);
  };
  const searchNumber = (e) => {
    e.preventDefault();
    nav(`/num/${enterNumber}`);
  };
  return (
    <div className={classes.container}>
      <form onSubmit={searchNumber}>
        <div className={classes.searchBox}>
          <input
            type="text"
            placeholder="전화번호"
            onChange={handleChange}
            required
          />
          <button>검색</button>
        </div>
      </form>
    </div>
  );
};

export default SearchJunk;
