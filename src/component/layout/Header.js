import React, { useEffect, useState } from "react";
import classes from "./style/Header.module.css";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import { firebaseAuth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import LogOut from "../authentication/LogOut";

const Header = () => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);

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
        <p className={classes.title}>JunkNumber</p>
        {loading ? (
          <p>LOADING</p>
        ) : name ? (
          <div className={classes.loginInfoContainer}>
            <p>{name}</p>
            <LogOut />
          </div>
        ) : (
          <Link to="/Login">로그인</Link>
        )}
      </div>

      <div className={classes.navContainer}>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
