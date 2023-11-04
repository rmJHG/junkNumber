import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import Post from "../community/Post";
import classes from "./style/community.module.css";
import { useParams } from "react-router-dom";
import Loading from "../loading/Loading";
import PageNav from "../community/PageNav";

const Community = () => {
  const [dataState, setDataState] = useState(false);

  const context = useContext(DataContext);
  const params = useParams();
  const postData = context.postData;
  const sortedPostData = postData
    .map((data, index) => {
      const newIndex = index + 1;
      return {
        index: newIndex,
        ...data,
      };
    })
    .sort((a, b) => {
      return b.index - a.index;
    });

  const chunk = (data = [], size = 1) => {
    const arr = [];

    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }

    return arr;
  };
  const chunkedData = chunk(sortedPostData, 20);

  //데이터가 있는지 확인
  useEffect(() => {
    chunkedData.length >= 1 ? setDataState(true) : setDataState(false);
  }, [chunkedData.length]);

  if (dataState) {
    return (
      <div className={classes.container}>
        <header className={classes.headerContainer}>
          <div>
            <p>hello world !</p>
          </div>
        </header>

        <div className={classes.tableContainer}>
          <table>
            <colgroup>
              <col width="8%" />
              <col width="50%" />
              <col width="17%" />
              <col width="20%" />
            </colgroup>
            <thead className={classes.tableInfoContainer}>
              <tr>
                <td align="center">No</td>
                <td>제목</td>
                <td align="center">작성자</td>
                <td align="center">작성일</td>
              </tr>
            </thead>
            <tbody className={classes.tableDataContainer}>
              {chunkedData[params.commuQuery - 1].map((data) => {
                return (
                  <Post
                    key={data.id}
                    id={data.id}
                    index={data.index}
                    title={data.title}
                    writer={data.writer}
                    postMS={data.postMS}
                    postDate={data.postDate}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
        <PageNav />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Community;
