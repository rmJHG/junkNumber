import React, { useEffect, useState } from "react";
import classes from "./style/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { firebaseAuth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import LogOut from "../authentication/LogOut";

const Header = () => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();
  const titleCLickEvent = () => {
    nav("/");
  };

  useEffect(() => {
    const unsubcribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setName(user.displayName);
        setLoading(false);
      } else {
        setName("");
        setLoading(false);
      }
    });

    return () => {
      unsubcribe();
    };
  }, []);

  return (
    <header className={classes.header}>
      <div className={classes.headerContent}>
        <p className={classes.title} onClick={titleCLickEvent}>
          JunkNumber
        </p>
        {loading ? (
          <p>LOADING</p>
        ) : name ? (
          <div className={classes.loginInfoContainer}>
            <p>{name}</p>
            <LogOut />
          </div>
        ) : (
          <Link to="/Login">
            <p className={classes.loginButton}>로그인</p>
          </Link>
        )}
      </div>

      <div className={classes.navContainer}>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
