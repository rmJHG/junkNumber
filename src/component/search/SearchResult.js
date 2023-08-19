import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JunkNumContext from "../context/JunkDataContext";
import SearchedJunk from "./SearchedJunk";
import classes from "./style/SearchResult.module.css";

const SearchResult = () => {
  const params = useParams();
  const context = useContext(JunkNumContext);
  const data = context.junkData;
  const [hasData, setHasData] = useState(false);

  const filteredData = data.filter(
    (data) => data.number === params.searchQuery
  );

  useEffect(() => {
    if (filteredData.length >= 1) {
      setHasData(true);
    }
  }, [filteredData.length]);

  return (
    <>
      <div className={classes.searchQuery}>
        <p>{params.searchQuery}</p>
      </div>
      <ol className={classes.reportListBox}>
        {hasData ? (
          filteredData.map((res) => {
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
          })
        ) : (
          <p>신고된 내역이 없습니다.</p>
        )}
      </ol>
    </>
  );
};

export default SearchResult;
