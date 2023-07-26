import React from "react";
import Header from "./Header";
import classes from "./Layout.module.css";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <div className={classes.container}>
      <Header />
      <main className={classes.main}>{props.children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
