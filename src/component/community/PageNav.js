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
      ? setPreviousPageAdressState(
          Math.floor((params.commuQuery - 1) / 10) * 10
        )
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
  //페이지 네이게이션
  const links = Array.from(
    chunkedData.slice(
      Math.floor((params.commuQuery - 1) / 10) * 10,
      Math.floor((params.commuQuery - 1) / 10) * 10 + 10
    ),
    (_, i) => (
      <td key={i} align="center" className={classes.pageNav}>
        <Link
          to={`/community/${
            i + Math.floor((params.commuQuery - 1) / 10) * 10 + 1
          }`}
        >
          <p>{i + Math.floor((params.commuQuery - 1) / 10) * 10 + 1}</p>
        </Link>
      </td>
    )
  );

  return (
    <div className={classes.pageNavContainer}>
      <table>
        <tbody>
          <tr align="center" width="5%">
            <td className={classes.btnTd}>
              {previusPageBtnState ? (
                <Link to={`/community/${previousPageAdressState}`}>
                  <p className={classes.btnText}>&lt;이전</p>
                </Link>
              ) : (
                <p className={classes.disableBtnText}>&lt;이전</p>
              )}
            </td>

            {links}

            <td className={classes.btnTd}>
              {nextPageBtnState ? (
                <Link to={`/community/${nextPageAdressState}`}>
                  <p className={classes.btnText}>다음&gt;</p>
                </Link>
              ) : (
                <p className={classes.disableBtnText}>다음&gt;</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PageNav;
