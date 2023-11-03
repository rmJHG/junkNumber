import React from "react";
import Junk from "./Junk";
import classes from "./style/RealTimeJunkList.module.css";

const RealTimeJunkList = ({ junk }) => {
  const junkData = junk;
  const sliceAndReverseData = junkData.slice(0, 10);

  return (
    <div className={classes.container}>
      <section>
        <header className={classes.headerContainer}>
          <div>
            <span>실시간 신고</span>
          </div>
        </header>

        <table className={classes.tableContainer}>
          <colgroup>
            <col width="40%" />
            <col width="20%" />
            <col width="20%" />
          </colgroup>
          <thead className={classes.tableInfoContainer}>
            <tr align="center">
              <td>번호</td>
              <td>작성자</td>
              <td>등록일</td>
            </tr>
          </thead>

          <tbody className={classes.tableDataContainer}>
            {sliceAndReverseData.map((res, index) => (
              <Junk
                key={res.id}
                id={res.id}
                number={res.number}
                postName={res.postName}
                postDate={res.postDate}
                postMS={res.postMS}
                postIndex={index + 1}
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default RealTimeJunkList;
