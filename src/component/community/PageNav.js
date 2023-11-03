import React, { useContext, useEffect, useState } from "react";
import DataContext from "../context/DataContext";
import { Link, useParams } from "react-router-dom";
import classes from "./style/PageNav.module.css";

const PageNav = () => {
  const context = useContext(DataContext);
  const postData = context.postData;
  const params = useParams();
  const [previousPageAdressState, setPreviousPageAdressState] = useState();
  const [previusPageBtnState, setPreviousPageBtnState] = useState(true);
  const [nextPageAdressState, setNextPageAdressState] = useState();
  const [nextPageBtnState, setNextPageBtnState] = useState(true);
  const chunk = (data = [], size = 1) => {
    const arr = [];

    for (let i = 0; i < data.length; i += size) {
      arr.push(data.slice(i, i + size));
    }

    return arr;
  };

  const chunkedData = chunk(postData, 20);

  useEffect(() => {
    // 이전 페이지 이동 버튼
    params.commuQuery > 10 && setPreviousPageBtnState(true);
    params.commuQuery > 10
      ? setPreviousPageAdressState(Math.floor((params.commuQuery - 1) / 10)*10)
      : setPreviousPageBtnState(false);
    //다음 페이지 이동 버튼F
    Math.floor((params.commuQuery - 1) / 10) * 10 + 10 < chunkedData.length &&
      setNextPageBtnState(true);
    Math.floor((params.commuQuery - 1) / 10) * 10 + 10 < chunkedData.length
      ? setNextPageAdressState(
          Math.floor((params.commuQuery - 1) / 10) * 10 + 11
        )
      : setNextPageBtnState(false);
  }, [params.commuQuery, chunkedData.length]);

  const links = Array.from(
    chunkedData.slice(
      Math.floor((params.commuQuery - 1) / 10) * 10,
      Math.floor((params.commuQuery - 1) / 10) * 10 + 10
    ),
    (_, i) => (
      <Link
        key={i}
        to={`/community/${i + Math.floor((params.commuQuery - 1) / 10) * 10 + 1}`}
      >
        {i + (Math.floor((params.commuQuery - 1) / 10) * 10) +1}
      </Link>
    )
  );

  return (
    <div className={classes.pageContainer}>
      <ul>
        <div>
          {previusPageBtnState && (
            <Link to={`/community/${previousPageAdressState}`}>
              <p>◀</p>
            </Link>
          )}
        </div>

        {links}
        <div>
          {nextPageBtnState && (
            <Link to={`/community/${nextPageAdressState}`}>
              <p>▶</p>
            </Link>
          )}
        </div>
      </ul>
    </div>
  );
};

export default PageNav;
