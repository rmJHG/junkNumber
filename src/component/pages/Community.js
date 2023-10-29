import React, { useContext } from "react";
import DataContext from "../context/DataContext";
import Post from "../community/Post";
import classes from "./style/community.module.css";

const Community = () => {
  const context = useContext(DataContext);
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

  console.log(sortedPostData);
  return (
    <div className={classes.container}>
      <div>helloooo</div>

      <div className={classes.tableContainer}>
        <table>
          <colgroup>
            <col width="5%" />
            <col width="25%" />
            <col width="5%" />
            <col width="5%" />
          </colgroup>
          <thead className={classes.tableInfoContainer}>
            <tr>
              <td align="center"></td>
              <td>제목</td>
              <td align="center">작성자</td>
              <td align="center">작성일</td>
            </tr>
          </thead>
          <tbody>
            {sortedPostData.map((data) => {
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
    </div>
  );
};

export default Community;
