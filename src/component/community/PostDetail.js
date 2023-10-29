import React, { useContext } from "react";
import DataContext from "../context/DataContext";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const context = useContext(DataContext);
  const data = context.postData;
  const params = useParams();

  const { writer, title, content, date } = data[params.postQuery - 1];

  return (
    <div>
      <p>{writer}</p>
      <p>{title}</p>
      <p>{content}</p>
      <p>{date}</p>
    </div>
  );
};

export default PostDetail;
