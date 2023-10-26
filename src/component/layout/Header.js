import React, { useEffect, useState } from "react";
import classes from "./style/Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import { firebaseAuth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [name, setName] = useState();
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const titleCLickEvent = () => {
    nav("/");
  };
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  const logOutBtnClick = () => {
    signOut(firebaseAuth);
    setIsOpen(!isOpen);
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
      {isOpen && (
       
          <ul className={classes.menu} onClick={modalHandler}>
            <li>
              <p onClick={logOutBtnClick}>로그아웃</p>
            </li>
          </ul>
   
      )}
      <div className={classes.headerContent}>
        <p className={classes.title} onClick={titleCLickEvent}>
          JunkNumber
        </p>
        {loading ? (
          <p>LOADING</p>
        ) : name ? (
          <div className={classes.loginInfoContainer}>
            <p onClick={modalHandler}>{name}  </p>
           <div className={classes.modalState}>
           {isOpen ? <p>▼</p> : <p>▽</p> }
           </div>
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
