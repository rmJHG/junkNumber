import React, { useEffect, useState, useContext } from "react";
import RealTimeJunkList from "../junk/RealTimeJunkList";
import TopReportedJunkList from "../junk/TopReportedJunkList";
import DataContext from "../context/DataContext";
import SearchBar from "../search/SearchBar";
import classes from "./style/MainPage.module.css";

const MainPage = () => {
  const [junk, setJunk] = useState([]);

  const context = useContext(DataContext);

  useEffect(() => {
    if (context.junkData !== undefined) {
      setJunk(context.junkData);
    }
  }, [context.junkData]);

  return (
    <div className={classes.container}>
      <SearchBar />
      <div className={classes.tableContainer}>
        <RealTimeJunkList junk={junk} />
        <TopReportedJunkList junk={junk} />
      </div>
    </div>
  );
};

export default MainPage;
