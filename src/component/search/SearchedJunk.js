import React from "react";
import classes from "./style/SearchedJunk.module.css";

const SearchedJunk = ({ postName, postDate, postType, number, coment }) => {
  return (
    <li className={classes.reportList}>
      <div className={classes.postInfo}>
        <div>
          {postName} / {postType}
        </div>
        <div>{postDate}</div>
      </div>
      <div>{coment}</div>
    </li>
  );
};

export default SearchedJunk;
