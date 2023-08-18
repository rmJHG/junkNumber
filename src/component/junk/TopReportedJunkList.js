import React from "react";
import classes from "./style/TopReportedJunkList.module.css";

const TopReportedJunkList = (props) => {
  const countDuplicates = (arr, prop) => {
    const countMap = new Map();
    arr.forEach((item) => {
      const key = item[prop];
      countMap.set(key, (countMap.get(key) || 0) + 1);
    });
    return countMap;
  };

  const data = countDuplicates(props.junk, "number");

  const sortedData = Array.from(data)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <ul className={classes.topReportJunkList}>
      <div className={classes.title}>
        <p>많은 신고</p>
      </div>
      <div className={classes.header}>
        <p>번호</p>
        <p>신고된 수</p>
      </div>
      {sortedData.map(([number, count]) => (
        <li className={classes.junk} key={number}>
          <p>{number}</p>
          <p>{count}</p>
        </li>
      ))}
    </ul>
  );
};

export default TopReportedJunkList;
