import React from "react";
import Junk from "./Junk";
import classes from "./style/RealTimeJunkList.module.css";

const RealTimeJunkList = ({ junk }) => {
  const junkData = junk;
  const sliceAndReverseData = junkData.slice(0, 10);
  return (
    <ul className={classes.listBox}>
      <div className={classes.title}>
        <p>실시간 신고</p>
      </div>
      <div className={classes.listHeader}>
        <p>번호</p>
        <div className={classes.info}>
          <p>작성자</p>
          <p>등록일</p>
        </div>
      </div>
      {sliceAndReverseData.map((res) => (
        <Junk
          key={res.id}
          id={res.id}
          number={res.number}
          postName={res.postName}
          postDate={res.postDate}
          postMS={res.postMS}
        />
      ))}
    </ul>
  );
};

export default RealTimeJunkList;
