import React, { useEffect, useRef, useState } from "react";

const Junk = (props) => {
  const [postedDate, setPostedDate] = useState();
  const today = new Date().getTime();

  let postTimeRef = useRef();

  useEffect(() => {
    if (86400000 >= today - props.postMS) {
      postTimeRef.current = Math.floor((today - props.postMS) / 1000) / 60;
    } else {
      setPostedDate(props.postDate);
    }
    if (postTimeRef.current <= 1) {
      setPostedDate("1분 전");
    } else if (postTimeRef.current <= 59) {
      setPostedDate(`${Math.floor(postTimeRef.current)}분 전`);
    } else if (60 <= postTimeRef.current && postTimeRef.current <= 1440) {
      setPostedDate(`${Math.floor(postTimeRef.current / 60)}시간 전`);
    }
  }, [props.postDate, props.postMS, today]);

  return (
    <tr align="center">
      <td>{props.postIndex}</td>
      <td>{props.number}</td>
      <td>{props.postName}</td>
      <td>{postedDate}</td>
    </tr>
  );
};

export default Junk;
