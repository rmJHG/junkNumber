import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={classes.loadingIndicator}>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
      <div className={classes.dot}></div>
    </div>
  );
};

export default Loading;
