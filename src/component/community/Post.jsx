import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Post = ({ index, writer, title, postDate, postMS }) => {
  const nav = useNavigate();
  const titleClickEvent = () => {
    nav(`/community/post/${index}`);
  };

  const [postedDate, setPostedDate] = useState();
  const today = new Date().getTime();

  let postTimeRef = useRef();

  useEffect(() => {
    //현재의 ms와 업로드를 했던 시점의 ms를 빼서 24시간이 넘어가면 날짜를 출력하고 이하일 경우 계산된 ms를 저장
    if (86400000 >= today - postMS) {
      postTimeRef.current = Math.floor((today - postMS) / 1000) / 60;
    } else {
      setPostedDate(postDate);
    }

    //계산된 ms로 60분이하는 @분으로 60분초과는 시간으로 표현한다.
    if (postTimeRef.current <= 1) {
      setPostedDate("1분 전");
    } else if (postTimeRef.current <= 59) {
      setPostedDate(`${Math.floor(postTimeRef.current)}분 전`);
    } else if (60 <= postTimeRef.current && postTimeRef.current <= 1440) {
      setPostedDate(`${Math.floor(postTimeRef.current / 60)}시간 전`);
    }
  }, [postMS, postDate, today]);

  return (
    <tr>
      <td align="center">{index}</td>
      <td onClick={titleClickEvent}>{title}</td>
      <td align="center">{writer}</td>
      <td align="center">{postedDate}</td>
    </tr>
  );
};

export default Post;
