import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Header = () => {


  return (
    <header className={classes.header}>
      <div className={classes.headerContent}>
        <div>제목</div>
       
        <Link to="/Login">로그인</Link>
      </div>

      <div className={classes.navContainer}>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
