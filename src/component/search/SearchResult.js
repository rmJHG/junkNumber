import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JunkNumContext from "../context/DataContext";
import SearchedJunk from "./SearchedJunk";
import classes from "./style/SearchResult.module.css";

const SearchResult = () => {
  const params = useParams();
  const searchedNumber = params.searchQuery;
  const searchedReplaceNumber = searchedNumber.replace(
    /(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g,
    "$1-$2-$3"
  );
  const context = useContext(JunkNumContext);
  const data = context.junkData;
  const [hasData, setHasData] = useState(false);
  const filteredData = data.filter(
    (data) => data.number === searchedReplaceNumber
  );

  useEffect(() => {
    if (filteredData.length >= 1) {
      setHasData(true);
    }
  }, [filteredData.length]);

  return (
    <div className={classes.container}>
      <div className={classes.searchQuery}>
        <p>{searchedReplaceNumber}</p>
        <p>{searchedNumber}</p>
      </div>
      {hasData ? (
        <ol className={classes.reportListBox}>
          {filteredData.map((res) => {
            return (
              <SearchedJunk
                key={res.id}
                postDate={res.postDate}
                number={res.number}
                postName={res.postName}
                postType={res.type}
                coment={res.coment}
              />
            );
          })}
        </ol>
      ) : (
        <div className={classes.empty}>
          <p>신고된 내역이 없습니다.</p>
        </div>
      )}
    </div>
  );
};

export default SearchResult;
