import React, { useEffect, useState, useContext } from "react";
import RealTimeJunkList from "../junk/RealTimeJunkList";
import TopReportedJunkList from "../junk/TopReportedJunkList";
import JunkNumContext from "../context/JunkDataContext";
import SearchBar from "../search/SearchBar";
import classes from "./style/MainPage.module.css";

const MainPage = () => {
  const [junk, setJunk] = useState([]);

  const context = useContext(JunkNumContext);

  useEffect(() => {
    if (context.junkData !== undefined) {
      setJunk(context.junkData);
    }
  }, [context.junkData]);

  return (
    <div className={classes.container}>
      <SearchBar />
      <RealTimeJunkList junk={junk} />
      <TopReportedJunkList junk={junk} />
    </div>
  );
};

export default MainPage;
