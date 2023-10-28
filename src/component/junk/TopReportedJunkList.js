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
    <div className={classes.container}>
      <section>
        <header className={classes.headerContainer}>
          <div>
            <span>많이 신고된 순위</span>
          </div>
        </header>

        <table className={classes.tableContainer}>
          <tr align="center">
            <td></td>
            <td>번호</td>
            <td>신고된 수</td>
          </tr>

          {sortedData.map(([number, count], index) => (
            <tr align="center" key={number}>
              <td>{index + 1}</td>
              <td>{number}</td>
              <td>{count}</td>
            </tr>
          ))}
        </table>
      </section>
    </div>
  );
};

export default TopReportedJunkList;
