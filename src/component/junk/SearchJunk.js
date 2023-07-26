import React from "react";
import classes from "./SearchJunk.module.css";

const SearchJunk = () => {
  return (
    <div className={classes.container}>
      <form>
        <div className={classes.searchBox}>
          <input type="text" />
          <button>검색아이콘</button>
        </div>
      </form>
    </div>
  );
};

export default SearchJunk;
